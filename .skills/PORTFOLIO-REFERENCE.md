# Portfolio Wesley Alves - AI Skill Reference

## Stack & Tecnologias

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Astro | ^7.x (SSG) |
| Deploy | Netlify | Auto-deploy via GitHub |
| Linguagem | TypeScript | Astro built-in |
| Estilos | CSS Custom Properties | Dark/Light theme |
| Fontes | Inter + JetBrains Mono | Google Fonts |
| Ícones | SVG inline | Hand-crafted |
| API | GitHub REST API | v3 (repos) |

## Arquitetura do Projeto

```
Portifolio/
├── src/
│   ├── components/        # Componentes Astro (SSG)
│   │   ├── Header.astro      # Nav fixo + hamburger mobile + theme toggle
│   │   ├── Hero.astro        # Hero com typing effect, card perfil, stats
│   │   ├── Timeline.astro    # Trajetória cronológica, alternating layout
│   │   ├── MindMap.astro     # Canvas interativo pan/dzoom + cards mobile
│   │   ├── Projects.astro    # Projetos destaque + GitHub API repos
│   │   ├── Certifications.astro # Grid de certificações
│   │   ├── Contact.astro     # CTA, services grid, form mailto
│   │   └── Footer.astro      # Social links + copyright
│   ├── data/
│   │   └── resume.ts         # Todos os dados do currículo (single source of truth)
│   ├── layouts/
│   │   └── Layout.astro      # HTML base, CSS global, theme toggle, scroll reveal
│   └── pages/
│       └── index.astro       # Página principal (SSG)
├── public/
│   └── images/
│       ├── profile.png       # Foto do usuário
│       └── website.png       # Favicon
├── package.json
├── astro.config.mjs          # site: dominio para Netlify
└── .gitignore
```

## Design System

### Paleta de Cores

**Dark Mode (default):**
```css
--bg-primary: #0a0a0f;
--bg-secondary: #12121a;
--bg-card: rgba(255, 255, 255, 0.04);
--bg-card-hover: rgba(255, 255, 255, 0.08);
--bg-card-border: rgba(255, 255, 255, 0.06);
--text-primary: #e4e4e7;
--text-secondary: #a1a1aa;
--text-muted: #71717a;
--accent: #00d4aa;          /* Verde-azulado principal */
--accent-secondary: #7c3aed; /* Roxo secundário */
```

**Light Mode:**
```css
--bg-primary: #fafafa;
--accent: #059669;
--accent-secondary: #6d28d9;
```

### Tipografia
- **Sans:** Inter (300-800) — textos, títulos, botões
- **Mono:** JetBrains Mono (400, 500) — labels, badges, código
- **Clamp:** `clamp(1.8rem, 4vw, 2.5rem)` para títulos de seção

### Espaçamento
```css
--max-w: 1200px;         /* Container max */
--section-gap: 6rem;     /* 4rem no mobile */
--radius: 12px;
--radius-sm: 8px;
--radius-lg: 20px;
```

### Transições
```css
--transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## Padrões de Código

### Componentes Astro
- Cada componente é self-contained (HTML + CSS scoped + script inline)
- Dados vêm de `src/data/resume.ts` via import
- Scripts inline com `define:vars` quando precisam de dados do servidor
- CSS scoped com `<style>` — nunca global exceto no Layout

### Scroll Reveal Animation
```html
<div data-reveal>            <!-- Anima ao entrar no viewport -->
<div data-reveal="delay-1">  <!-- Delay 0.1s -->
<div data-reveal="delay-2">  <!-- Delay 0.2s -->
```
Implementado via IntersectionObserver no Layout.astro:
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
```

### Theme Toggle (Dark/Light)
- Salvo em `localStorage('theme')`
- Aplicado via `data-theme="dark|light"` no `<html>`
- CSS variables muda automaticamente por seletor `[data-theme='dark']`
- Toggle via botão no Header com ícones sol/lua

### Canvas MindMap (Padrão Completo)
```
Estrutura:
- Wrapper com aspect-ratio 16:9
- Canvas com DPR scaling (retina support)
- Estado: panX, panY, scale (zoom)
- Eventos: mousedown/move/up para pan, wheel para zoom
- Hit testing em world coordinates (screenToWorld)
- Draw pipeline: glow → curves center→branch → curves branch→leaf → pills → branches → center
- Mobile: canvas escondido, cards grid exibidos
- Touch support via touchstart/touchmove/touchend
```

### Contact Form (mailto:)
- Não usa backend — gera `mailto:` link com subject/body formatado
- Honeypot anti-spam: campo `website` hidden
- Notificação visual pós-envio (botão verde com check)
- Service selector + budget range selectors

### GitHub API
```js
fetch('https://api.github.com/users/WesleyAlvesDS/repos?sort=updated&per_page=12')
```
- Fetch client-side, renderiza cards com linguagem, stars, forks
- Fallback message se API falhar

## Responsividade

### Breakpoints
| Breakpoint | Comportamento |
|-----------|---------------|
| > 768px | Layout desktop completo |
| ≤ 768px | Grid 1 coluna, hamburger menu, canvas escondido |
| ≤ 480px | Padding reduzido, fontes menores, cards empilhados |

### Componentes Mobile
- **Header:** Nav escondida, hamburger com animação X, mobile menu full-screen
- **Hero:** Card perfil move para cima (order: -1), texto centralizado
- **Timeline:** Linha vertical à esquerda, todos os cards à direita
- **MindMap:** Canvas escondido, cards grid (2 colunas → 1 coluna)
- **Services:** Grid 1 coluna no mobile
- **Contact:** Form e channels empilhados

## Performance

- `content-visibility: auto` nas seções (skip rendering below fold)
- `scroll-padding-top: 80px` para header fixo
- `loading="eager"` para imagens above-the-fold
- `loading="lazy"` para imagens below-the-fold
- `prefers-reduced-motion: reduce` desativa todas as animações
- CSS variables para themes (sem JS extra)
- Canvas com DPR scaling (nitidez em telas retina)

## Convenções de Commit

```
feat: nova funcionalidade
fix: correção de bug
refactor: reestruturação sem mudança de comportamento
style: mudança visual/cosmética
```

## Deploy

1. Push para `main` no GitHub
2. Netlify detecta automaticamente
3. Build: `npx astro build` (output: `dist/`)
4. Variáveis de ambiente: nenhuma necessária

## Dados do Currículo (resume.ts)

### Campos Principais
- `name`, `title`, `summary`, `email`, `location`
- `socials.linkedin`, `socials.github`
- `experience[]` — com role, company, period, type (work), description
- `education[]` — com degree, institution, period, type (education)
- `projects[]` — com name, subtitle, context, description, tags[], url, wip, highlight
- `skills.technical[]`, `skills.tools[]`
- `certifications[]` — com name, issuer, year
- `mindmap.branches[]` — com label, color, items[]

### Ordennação da Timeline
- Cronológica (antigo → atual)
- Sort por ano extraído do campo `period`
- `Atual` recebe valor 100 (aparece por último)

### Projetos em Destaque
- `highlight: true` — borda gradiente + glow
- `wip: true` — badge "Em construção"
- `url` — botão "Conhecer →" visível no card

## Comandos Úteis

```bash
npx astro dev          # Desenvolvimento local
npx astro build        # Build de produção
npx astro preview      # Preview do build
git add . && git commit -m "msg" && git push  # Deploy
```

## Notas Importantes

- **npm install** precisa de `--ignore-scripts` no Windows com Node 24 (problema com esbuild)
- **PDF removido** — conteúdo embutido em resume.ts
- **Email:** wesleyprofissional2020@gmail.com (contato profissional)
- **GitHub API:** sem autenticação, rate limit 60 req/hora
- **Netlify:** deploy automático, sem server-side rendering
