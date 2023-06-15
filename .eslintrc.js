// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
	},
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		camelcase: [2, { properties: "always" }],
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts"],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
				project: "./tsconfig.json",
			},
		},
	},
};
