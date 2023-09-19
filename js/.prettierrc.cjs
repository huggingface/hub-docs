const path = require("path");
const tailwindConfig = path.join(__dirname, "./tailwind.config.cjs");

module.exports = {
	arrowParens: "avoid",
	quoteProps: "consistent",
	trailingComma: "es5",
	useTabs: true,
	tabWidth: 2,
	printWidth: 120,
	overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
	tailwindConfig,
	plugins: [require("prettier-plugin-svelte"), require("prettier-plugin-tailwindcss")],
};
