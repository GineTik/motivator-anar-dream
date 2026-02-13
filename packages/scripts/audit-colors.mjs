#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { resolve, relative, extname, join } from "path";

// ── CLI args ──────────────────────────────────────────────────────────────────
// Filter out "--" separator that pnpm passes through
const args = process.argv.slice(2).filter((a) => a !== "--");

function getArg(name) {
    const idx = args.indexOf(name);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

const hasFlag = (name) => args.includes(name);

const appDir = getArg("--app"); // e.g. apps/landing
const globalsPath = getArg("--globals"); // e.g. apps/landing/app/(frontend)/globals.css
const fix = hasFlag("--fix");

if (!appDir || !globalsPath) {
    console.error(
        "Usage: node audit-colors.mjs --app <app-dir> --globals <globals.css-path> [--fix]",
    );
    console.error(
        "  --app       Path to the app directory to scan (e.g. apps/landing)",
    );
    console.error(
        "  --globals   Path to globals.css with @theme tokens (e.g. apps/landing/app/(frontend)/globals.css)",
    );
    console.error(
        "  --fix       Auto-replace hardcoded colors that match existing tokens",
    );
    process.exit(1);
}

// Resolve to monorepo root (packages/scripts is 2 levels deep)
const SCRIPT_DIR = new URL(".", import.meta.url).pathname;
const ROOT = resolve(SCRIPT_DIR, "../..");
const APP_DIR = resolve(ROOT, appDir);
const GLOBALS_PATH = resolve(ROOT, globalsPath);

// ── Parse globals.css @theme tokens ───────────────────────────────────────────
function parseThemeTokens(cssContent) {
    const tokenMap = new Map(); // value -> tailwind class suffix

    const themeMatch = cssContent.match(/@theme\s*\{([\s\S]*?)\n\}/);
    if (!themeMatch) {
        console.warn("Warning: No @theme block found in globals.css");
        return tokenMap;
    }

    const themeBlock = themeMatch[1];
    const varRegex = /--color-([^:]+):\s*([^;]+);/g;
    let match;

    while ((match = varRegex.exec(themeBlock)) !== null) {
        const tokenName = match[1].trim(); // e.g. "brand-primary"
        const rawValue = match[2].trim(); // e.g. "#250a63"

        // Skip tokens that reference other CSS variables (not real color values)
        if (rawValue.startsWith("var(")) continue;

        const normalized = normalizeColor(rawValue);
        if (normalized) {
            tokenMap.set(normalized, tokenName);
        }
    }

    // Also parse --font-* tokens
    const fontMap = new Map();
    const fontRegex = /--font-([^:]+):\s*([^;]+);/g;
    while ((match = fontRegex.exec(themeBlock)) !== null) {
        fontMap.set(match[1].trim(), match[2].trim());
    }

    return { colorTokens: tokenMap, fontTokens: fontMap };
}

// ── Color normalization ───────────────────────────────────────────────────────
function normalizeColor(value) {
    const v = value.trim().toLowerCase();

    // Hex: #abc, #aabbcc, #aabbccdd
    if (v.startsWith("#")) {
        return normalizeHex(v);
    }

    // rgb(...) / rgba(...)
    const rgbaMatch = v.match(
        /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/,
    );
    if (rgbaMatch) {
        const r = Math.round(Number(rgbaMatch[1]));
        const g = Math.round(Number(rgbaMatch[2]));
        const b = Math.round(Number(rgbaMatch[3]));
        const a = rgbaMatch[4] !== undefined ? Number(rgbaMatch[4]) : 1;
        if (a === 1) {
            return `#${hex(r)}${hex(g)}${hex(b)}`;
        }
        const alpha = Math.round(a * 255);
        return `#${hex(r)}${hex(g)}${hex(b)}${hex(alpha)}`;
    }

    return null;
}

function normalizeHex(h) {
    let raw = h.replace("#", "").toLowerCase();
    // Expand shorthand: #abc -> #aabbcc
    if (raw.length === 3) {
        raw = raw[0] + raw[0] + raw[1] + raw[1] + raw[2] + raw[2];
    }
    // Expand shorthand with alpha: #abcd -> #aabbccdd
    if (raw.length === 4) {
        raw =
            raw[0] +
            raw[0] +
            raw[1] +
            raw[1] +
            raw[2] +
            raw[2] +
            raw[3] +
            raw[3];
    }
    return `#${raw}`;
}

function hex(n) {
    return n.toString(16).padStart(2, "0");
}

// ── Scan files ────────────────────────────────────────────────────────────────
function collectFiles(dir, extensions) {
    const results = [];

    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const stat = statSync(full);

        if (stat.isDirectory()) {
            // Skip node_modules and hidden dirs
            if (entry === "node_modules" || entry.startsWith(".")) continue;
            results.push(...collectFiles(full, extensions));
        } else if (extensions.includes(extname(full))) {
            results.push(full);
        }
    }

    return results;
}

// ── Hardcoded color patterns ──────────────────────────────────────────────────
// Matches Tailwind arbitrary values with color-like content:
// bg-[#xxx], text-[rgba(...)], from-[#xxx], border-[rgb(...)], etc.
const COLOR_PREFIXES = [
    "bg",
    "text",
    "border",
    "from",
    "to",
    "via",
    "shadow",
    "divide",
    "ring",
    "outline",
    "decoration",
    "fill",
    "stroke",
    "accent",
    "caret",
    "placeholder",
];

const prefixGroup = COLOR_PREFIXES.join("|");

// Match: prefix-[#hex], prefix-[rgb(...)], prefix-[rgba(...)]
const HARDCODED_COLOR_RE = new RegExp(
    `(?:^|\\s|:)((?:${prefixGroup})(?:-[a-z]+)*)-\\[(#[\\da-fA-F]{3,8}|rgba?\\([^)]+\\))\\]`,
    "g",
);

// ── Main ──────────────────────────────────────────────────────────────────────
function main() {
    // Parse globals.css
    let globalsContent;
    try {
        globalsContent = readFileSync(GLOBALS_PATH, "utf-8");
    } catch {
        console.error(`Error: Cannot read globals.css at ${GLOBALS_PATH}`);
        process.exit(1);
    }

    const { colorTokens } = parseThemeTokens(globalsContent);

    console.log(`\nTokens loaded from globals.css: ${colorTokens.size}`);
    console.log(`Scanning: ${relative(ROOT, APP_DIR)}`);
    console.log(
        `Fix mode: ${fix ? "ON (will auto-replace matches)" : "OFF (report only)"}\n`,
    );

    const files = collectFiles(APP_DIR, [".tsx", ".ts", ".jsx", ".js"]);
    let totalIssues = 0;
    let totalFixed = 0;
    const unfixable = [];

    for (const filePath of files) {
        let content = readFileSync(filePath, "utf-8");
        const lines = content.split("\n");
        const relPath = relative(ROOT, filePath);
        const fileIssues = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            let match;
            HARDCODED_COLOR_RE.lastIndex = 0;

            while ((match = HARDCODED_COLOR_RE.exec(line)) !== null) {
                const fullMatch = match[0].trim(); // e.g. "bg-[#250a63]"
                const prefix = match[1]; // e.g. "bg"
                const rawColor = match[2]; // e.g. "#250a63"
                const normalized = normalizeColor(rawColor);

                fileIssues.push({
                    line: i + 1,
                    column: match.index + 1,
                    match: fullMatch,
                    prefix,
                    rawColor,
                    normalized,
                    tokenName: normalized ? colorTokens.get(normalized) : null,
                });
            }
        }

        if (fileIssues.length === 0) continue;

        console.log(`\n${"─".repeat(60)}`);
        console.log(`File: ${relPath}`);
        console.log(`${"─".repeat(60)}`);

        let fileContent = content;

        for (const issue of fileIssues) {
            totalIssues++;

            if (issue.tokenName) {
                const replacement = `${issue.prefix}-${issue.tokenName}`;
                const original = `${issue.prefix}-[${issue.rawColor}]`;

                if (fix) {
                    fileContent = fileContent.split(original).join(replacement);
                    totalFixed++;
                    console.log(
                        `  Line ${issue.line}: ${original}  -->  ${replacement}  [AUTO-FIXED]`,
                    );
                } else {
                    console.log(
                        `  Line ${issue.line}: ${original}  -->  ${replacement}  [FIXABLE]`,
                    );
                }
            } else {
                console.log(
                    `  Line ${issue.line}: ${issue.match}  (no matching token)`,
                );
                unfixable.push({
                    file: relPath,
                    line: issue.line,
                    match: issue.match,
                    rawColor: issue.rawColor,
                    normalized: issue.normalized,
                });
            }
        }

        if (fix && fileContent !== content) {
            writeFileSync(filePath, fileContent, "utf-8");
            console.log(`  --> File saved.`);
        }
    }

    // ── Summary ─────────────────────────────────────────────────────────────
    console.log(`\n${"═".repeat(60)}`);
    console.log("SUMMARY");
    console.log(`${"═".repeat(60)}`);
    console.log(`Total hardcoded colors found: ${totalIssues}`);
    if (fix) {
        console.log(`Auto-fixed: ${totalFixed}`);
    }
    console.log(`Without matching token: ${unfixable.length}`);

    if (unfixable.length > 0) {
        console.log(
            `\nColors without tokens (need manual review or new tokens):`,
        );
        const uniqueColors = [...new Set(unfixable.map((u) => u.rawColor))];
        for (const color of uniqueColors) {
            const count = unfixable.filter((u) => u.rawColor === color).length;
            console.log(
                `  ${color} (${count} occurrence${count > 1 ? "s" : ""})`,
            );
        }
    }

    console.log("");
    process.exit(unfixable.length > 0 ? 1 : 0);
}

main();
