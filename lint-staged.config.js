module.exports = {
  './src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
  './src/**/*.+(ts|tsx|js|jsx|json|yml|yaml|md|mdx)': [
    'prettier --write',
    'git add',
  ],
}
