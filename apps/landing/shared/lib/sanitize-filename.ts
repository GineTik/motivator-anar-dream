const cyrillicToLatin: Record<string, string> = {
	а: "a",
	б: "b",
	в: "v",
	г: "g",
	д: "d",
	е: "e",
	ё: "yo",
	ж: "zh",
	з: "z",
	и: "i",
	й: "y",
	к: "k",
	л: "l",
	м: "m",
	н: "n",
	о: "o",
	п: "p",
	р: "r",
	с: "s",
	т: "t",
	у: "u",
	ф: "f",
	х: "kh",
	ц: "ts",
	ч: "ch",
	ш: "sh",
	щ: "shch",
	ъ: "",
	ы: "y",
	ь: "",
	э: "e",
	ю: "yu",
	я: "ya",
	є: "ye",
	і: "i",
	ї: "yi",
	ґ: "g",
};

function transliterate(text: string): string {
	return text
		.split("")
		.map((char) => {
			const lower = char.toLowerCase();
			const latin = cyrillicToLatin[lower];
			if (latin !== undefined) {
				return char === lower
					? latin
					: latin.charAt(0).toUpperCase() + latin.slice(1);
			}
			return char;
		})
		.join("");
}

export function sanitizeFilename(filename: string): string {
	const dotIndex = filename.lastIndexOf(".");
	const name = dotIndex !== -1 ? filename.slice(0, dotIndex) : filename;
	const ext = dotIndex !== -1 ? filename.slice(dotIndex) : "";

	const sanitized = transliterate(name)
		.replace(/[^a-zA-Z0-9._-]/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");

	return (sanitized || "file") + ext;
}
