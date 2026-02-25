# Design Token System

All design values live in `src/styles/global.css` as CSS custom properties. The token system evolves as the design develops, but the principle is absolute: **no magic numbers, no magic colors**.

## How the Token System Works

Tokens are defined in `global.css` and used everywhere via `var()`. The system grows with the design. When you need a value that doesn't exist as a token, ask the designer to add it to the system rather than hardcoding it.

## Spacing Scale

Use rem values based on a 4px grid: `--space-1` (0.25rem / 4px) through `--space-16` (4rem / 64px).

```
4, 8, 12, 16, 24, 32, 48, 64
```

## Typography

- Maximum 2–3 font sizes per view
- Hierarchy through weight and color, not size explosion
- Use `clamp()` for fluid sizing: `clamp(1rem, 0.5rem + 1.5vw, 1.5rem)`
- No arbitrary font sizes

## Colors

- OKLCH color space
- Semantic naming: `--color-text`, `--color-surface`, `--color-primary`, `--color-muted`
- Every color serves a purpose: primary action, feedback, hierarchy, decoration

## Breakpoints

Define once in `global.css`, use consistently:

```css
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px */
```

## Rules (Non-Negotiable)

- **No hardcoded pixel values.** Use the spacing scale via custom properties.
- **No hex colors.** Use OKLCH via custom properties.
- **No arbitrary spacing.** Use the scale. `margin: 13px` is never acceptable.
- **No inline color values.** Always reference a token: `color: var(--color-text)`, never `color: #333`.
- Whitespace is a feature. When in doubt, add more space.
- WCAG AA contrast minimum. Always.
- If a design token doesn't exist for what you need, flag it rather than inventing a value.