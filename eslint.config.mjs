import eslintPluginAstro from "eslint-plugin-astro";
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

  // Ignore patterns
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**"],
  },
];
