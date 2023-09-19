module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		// "align-assignments",
		"github",
		"import",
		"unused-imports",
	],
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: "module",
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"],
		extraFileExtensions: [".svelte"],
	},
	env: {
		es6: true,
		browser: true,
	},
	ignorePatterns: [".eslintrc.cjs"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
	],
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
			extends: [
				"plugin:svelte/recommended",
				"plugin:svelte/prettier",
				"prettier", // Disable all eslint style-related rules for svelte files
			],
			rules: {
				"svelte/valid-compile": "off",
				"svelte/no-at-html-tags": "off",
				"svelte/no-unused-svelte-ignore": "off",
				"no-self-assign": "off",
				"@typescript-eslint/no-shadow": "off",
				"@typescript-eslint/no-floating-promises": "off",
				"@typescript-eslint/key-spacing": "off",
				"import/order": [
					"error",
					{
						"newlines-between": "always",
						"groups": ["type", "builtin", "external", "parent", "sibling", "index"],
					},
				],
			},
		},
	],
	rules: {
		/// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
		"@typescript-eslint/consistent-type-imports": ["error"],
		"@typescript-eslint/key-spacing": ["error", { align: "value" }],
		"@typescript-eslint/member-delimiter-style": ["error", { singleline: { requireLast: true } }],
		"@typescript-eslint/no-floating-promises": ["error", { ignoreIIFE: true, ignoreVoid: true }],
		"@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
		"@typescript-eslint/no-unused-vars": ["warn", { args: "none" }],
		"@typescript-eslint/restrict-template-expressions": [
			"error",
			{
				allowNullish: true,
				allowAny: true,
				allowNever: true,
				allowBoolean: true,
				allowNumber: true,
				allowRegExp: true,
			},
		],

		/// https://github.com/lucasefe/eslint-plugin-align-assignments
		// "align-assignments/align-assignments": ["error"],

		/// https://github.com/benmosher/eslint-plugin-import
		// "import/first": ["error"],
		"import/order": ["error"],

		"unused-imports/no-unused-imports": "error",

		"@typescript-eslint/no-invalid-this": ["error"],

		"@typescript-eslint/no-shadow": "error",

		/// https://eslint.org/docs/rules/
		"indent": ["error", "tab", { SwitchCase: 1 }],
		"no-constant-condition": ["error", { checkLoops: false }],
		"operator-linebreak": ["error", "before", { overrides: { "=": "after" } }],
		"no-mixed-spaces-and-tabs": "off",
		"@typescript-eslint/class-literal-property-style": ["error", "fields"],
		"@typescript-eslint/ban-types": ["warn"],
		"@typescript-eslint/consistent-type-assertions": [
			"warn",
			{
				assertionStyle: "as",
				objectLiteralTypeAssertions: "allow-as-parameter",
			},
		],
		"@typescript-eslint/consistent-type-definitions": ["error", "interface"],
		"@typescript-eslint/explicit-module-boundary-types": ["error"],
		"@typescript-eslint/method-signature-style": ["error"],
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "default",
				format: null,
				leadingUnderscore: "allowSingleOrDouble",
				trailingUnderscore: "allowSingleOrDouble",
			},

			{
				selector: "variable",
				format: ["camelCase", "UPPER_CASE"],
				leadingUnderscore: "allowSingleOrDouble",
				trailingUnderscore: "allowSingleOrDouble",
			},
			{
				selector: "typeLike",
				format: ["PascalCase"],
				leadingUnderscore: "allowSingleOrDouble",
				trailingUnderscore: "allowSingleOrDouble",
			},
			{
				selector: "enumMember",
				format: ["camelCase", "PascalCase", "UPPER_CASE"],
			},
		],
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/prefer-for-of": ["warn"],
		"@typescript-eslint/prefer-optional-chain": ["error"],
		"@typescript-eslint/prefer-ts-expect-error": ["warn"],
		"@typescript-eslint/unified-signatures": ["warn"],

		/// https://github.com/github/eslint-plugin-github
		"github/async-currenttarget": ["error"],
		"github/async-preventdefault": ["error"],
		"github/array-foreach": ["error"],
		"github/prefer-observers": ["error"],
		"github/no-dataset": ["off"],

		"eqeqeq": ["error"],
		"curly": ["error", "all"],
		"no-empty": ["warn"],
		"no-undef": "off",
		"no-unneeded-ternary": ["error", { defaultAssignment: false }],
		"no-useless-escape": ["warn"],
		"no-var": ["error"],
		"prefer-const": ["warn"],
	},
};
