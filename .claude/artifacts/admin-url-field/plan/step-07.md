# Step 7: Generate DB Migration — Drop Old Columns

## Action
Run Payload CLI command + verify generated migration

## File(s)
- `apps/landing/migrations/<timestamp>_smart_url_field.ts` (new, auto-generated) — Payload migration
- `apps/landing/migrations/index.ts` (existing) — auto-updated by Payload

## Details

### What Payload will auto-generate

After Steps 1-4 changed the field schema (3 fields → 1 field), Payload's migration generator will detect the diff and produce SQL to:

1. **Drop `link_type` columns** from all tables (pages_blocks_hero, pages_blocks_process_tabs, pages_blocks_cta, pages_blocks_footer_menu_groups_links, pages_blocks_footer, header_nav_links_children, header_nav_links, header) + their `_pages_v_` versioned counterparts
2. **Drop `section` columns** from the same tables + versioned counterparts
3. **Drop all `link_type` and `section` enum types** (24 enum types total)
4. **Keep `url` columns as-is** — they already exist, same name, same type

The `url` column values that currently store plain URLs (from `linkType: "custom"`) are already in the correct new format. Values that were set via `linkType: "section"` will have `url: null` — these become empty/null in the new schema, which is fine (user will re-enter them via the new UI).

### Steps to execute

```bash
# 1. Generate the migration (Payload detects schema diff)
cd apps/landing && pnpm payload migrate:create --name smart_url_field

# 2. Review the generated .ts file — verify it drops link_type/section columns and enums
#    but does NOT touch url columns

# 3. Set all existing url values to '#' where they are null (cleanup)
#    Add this to the generated migration's up() function, BEFORE the DROP statements:
```

### Manual addition to generated migration

After Payload generates the migration, manually add these UPDATE statements at the **beginning** of the `up()` function to set null/empty urls to `#`:

```sql
-- Set null urls to '#' so no broken links on frontend
UPDATE pages_blocks_hero SET cta_button_url = '#' WHERE cta_button_url IS NULL;
UPDATE pages_blocks_process_tabs SET url = '#' WHERE url IS NULL;
UPDATE pages_blocks_cta SET cta_button_url = '#' WHERE cta_button_url IS NULL;
UPDATE pages_blocks_footer_menu_groups_links SET url = '#' WHERE url IS NULL;
UPDATE pages_blocks_footer SET newsletter_url = '#' WHERE newsletter_url IS NULL;
UPDATE header_nav_links_children SET url = '#' WHERE url IS NULL;
UPDATE header_nav_links SET url = '#' WHERE url IS NULL;
UPDATE header SET url = '#' WHERE url IS NULL;
-- Same for versioned tables
UPDATE _pages_v_blocks_hero SET cta_button_url = '#' WHERE cta_button_url IS NULL;
UPDATE _pages_v_blocks_process_tabs SET url = '#' WHERE url IS NULL;
UPDATE _pages_v_blocks_cta SET cta_button_url = '#' WHERE cta_button_url IS NULL;
UPDATE _pages_v_blocks_footer_menu_groups_links SET url = '#' WHERE url IS NULL;
UPDATE _pages_v_blocks_footer SET newsletter_url = '#' WHERE newsletter_url IS NULL;
```

### Running the migration

```bash
# Run migration against the database
cd apps/landing && pnpm migrate
```

### Post-migration verification

1. Check that `link_type` and `section` columns are gone from all affected tables
2. Check that `url` columns still exist with correct data
3. Start the app and verify admin pages load without errors

## Documentation Reference
- Payload CLI: `pnpm payload migrate:create` generates migration from schema diff
- Existing migration pattern: `apps/landing/migrations/20260307_083011_smart_link_fields.ts` shows the schema with all affected tables/columns

## Rationale
- **Auto-generate + manual edit** — Payload handles the column drops and enum drops automatically. We only manually add the `UPDATE url = '#'` cleanup since Payload doesn't know about our data semantics.
- **`#` as fallback** — this is what `resolveHref()` returns for null values, so setting null urls to `#` makes the data consistent with the code.
- **No complex data migration** — user confirmed there are no/few prod users. Old `section` values would need complex mapping (`section: "hero"` → find page slug → build `/slug#hero`). Since this data can be re-entered via the new admin UI, destructive cleanup to `#` is acceptable.
- **Versioned tables included** — Payload uses `_pages_v_*` tables for draft/version history. These need the same cleanup.

## Spec Requirements Covered
- This step was originally out of scope in the spec, but added per user request. It ensures the DB schema matches the new single-field model and cleans up orphaned data.
