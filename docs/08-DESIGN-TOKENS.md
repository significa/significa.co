# Design Token System

All design values live in `src/styles/tokens.css` as CSS custom properties (imported by `global.css`). The token system covers **colors**, **typography**, **layout**, and **transitions**. Spacing uses raw values — no tokens.

## How the Token System Works

Tokens are defined in `tokens.css` and used everywhere via `var()`. The system grows with the design. When you need a color or typography value that doesn't exist as a token, add it to the system rather than hardcoding it.

## Spacing

No spacing tokens. Use raw values following a 4px grid as a guideline.

- **Vertical spacing:** prefer `rem` — scales with user font size preferences.
- **Horizontal spacing:** prefer `px` when appropriate — horizontal padding in `px` preserves line length regardless of browser font size, which helps legibility.

This is a guideline, not a law. Use your judgment.

## Typography

- Maximum 2–3 font sizes per view
- Hierarchy through weight and color, not size explosion
- Use `clamp()` for fluid sizing: `clamp(1rem, 0.5rem + 1.5vw, 1.5rem)`
- No arbitrary font sizes — use the `--text-*` tokens

## Colors

- OKLCH color space
- Semantic naming: `--color-text`, `--color-surface`, `--color-primary`, `--color-muted`
- Every color serves a purpose: primary action, feedback, hierarchy, decoration

## Breakpoints

Use consistently in media queries:

```css
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px */
```

## Rules

- **No hex colors.** Use OKLCH via custom properties.
- **No inline color values.** Always reference a token: `color: var(--color-text)`, never `color: #333`.
- **No arbitrary font sizes.** Use the `--text-*` scale.
- Whitespace is a feature. When in doubt, add more space.
- WCAG AA contrast minimum. Always.
- If a color or typography token doesn't exist for what you need, flag it rather than inventing a value.