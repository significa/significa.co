# Session Context

## User Prompts

### Prompt 1

claude: Do a full audit of this repository. Read everything before reporting. Do not modify any file.

## What to map

### 1. Project structure
- Framework and version (Next.js? Astro? Remix? Vite?)
- Package manager (confirm pnpm)
- TypeScript config — strict mode, path aliases
- List every directory under src/ (or app/, pages/) with a one-line description of what lives there

### 2. Routing
- What router is in use?
- Where is the homepage rendered? (file path)
- What layout wraps it?

### 3....

### Prompt 2

Antes de escrever qualquer ficheiro, lê tudo o que está listado abaixo. Depois faz o audit, depois escreve.

---

## FASE 1 — Leitura (não toques em nada)

Lê estes ficheiros por esta ordem:

1. CLAUDE.md (raiz) — se existir
2. .claude/settings.json — se existir
3. .cursorrules / agent.md / .windsurfrules — qualquer ficheiro de agent config que encontres
4. src/styles/tokens.css
5. src/styles/global.css
6. src/styles/reset.css
7. astro.config.mjs
8. tsconfig.json
9. .prettierrc.mjs o...

### Prompt 3

Confirmo. Avança para a Fase 3.

## Decisões tomadas

**Tokens a adicionar em tokens.css** (breaking — referenciados mas indefinidos):
- --text-xs → clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)
- --leading-relaxed → 1.8
- --radius-sm → 0.5rem
- --radius-md → 0.75rem

Não tocas nos valores hardcoded existentes em index.astro — esses ficam para mais tarde.

---

## Fase 3 — O que fazer

### 1. Adiciona os 4 tokens em falta a tokens.css

Coloca-os na secção correta (typography sca...

