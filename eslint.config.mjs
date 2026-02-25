import eslintPluginAstro from "eslint-plugin-astro";
import checkFile from "eslint-plugin-check-file";
import tseslint from "typescript-eslint";

export default [
  // TypeScript and JavaScript files
  ...tseslint.configs.recommended,

  // Astro files
  ...eslintPluginAstro.configs.recommended,

  // General configuration for all files
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,astro}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Allow triple-slash references in ambient declaration files
  {
    files: ["src/env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },

  // Enforce kebab-case filenames in src/
  {
    files: ["src/**/*"],
    ignores: ["src/pages/**/\\[*", "src/pages/404.astro"],
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{js,mjs,ts,tsx,astro,css,md,mdx,yaml}": "KEBAB_CASE",
        },
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": ["error", { "src/**/": "KEBAB_CASE" }],
    },
  },

  // Ignore patterns
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**"],
  },
];
