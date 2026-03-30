import type { Field, TextField } from "payload";

type SmartUrlFieldOverrides = Partial<Pick<TextField, "name" | "label" | "required">>;

export function smartUrlField(overrides?: SmartUrlFieldOverrides): Field {
	return {
		name: "url",
		type: "text",
		label: "Посилання",
		admin: {
			components: {
				Field: "@/shared/collections/fields/smart-url-field/component#SmartUrlField",
			},
			description:
				"Введіть зовнішнє посилання або оберіть сторінку/секцію зі списку",
		},
		...overrides,
	};
}
