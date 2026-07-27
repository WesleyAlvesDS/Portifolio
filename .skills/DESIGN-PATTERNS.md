# Design Patterns & Reusable Code Snippets

## CSS Custom Properties Theme System

```css
/* Layout.astro - Global */
:root { --accent: #00d4aa; }
[data-theme='dark'] { --bg-primary: #0a0a0f; --text-primary: #e4e4e7; }
[data-theme='light'] { --bg-primary: #fafafa; --text-primary: #18181b; }

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background var(--transition), color var(--transition);
}
```

## Scroll Reveal (IntersectionObserver)

```js
// Layout.astro - Funciona com qualquer elemento
// HTML: <div data-reveal> ou <div data-reveal="delay-1">
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('revealed');
  }),
  { threshold: 0.1, rootMargin: '0px 0px -50px 00px' }
);
document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
[data-reveal].revealed { opacity: 1; transform: translateY(0); }
[data-reveal='delay-1'] { transition-delay: 0.1s; }
[data-reveal='delay-2'] { transition-delay: 0.2s; }
```

## Canvas MindMap - Pan & Zoom

```js
// Estado
let panX = 0, panY = 0, scale = 1;
let isDragging = false, dragStartX = 0, dragStartY = 0;

// Screen to World conversion
function screenToWorld(sx, sy) {
  return { x: (sx - panX) / scale, y: (sy - panY) / scale };
}

// Draw with transform
function draw() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.translate(panX, panY);
  ctx.scale(scale, scale);
  // ... draw everything in world coords ...
  ctx.restore();
}

// Pan (mouse)
canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.clientX - canvas.getBoundingClientRect().left;
  dragStartY = e.clientY - canvas.getBoundingClientRect().top;
  panStartX = panX; panStartY = panY;
});
canvas.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  panX = panStartX + (e.clientX - canvas.getBoundingClientRect().left - dragStartX);
  panY = panStartY + (e.clientY - canvas.getBoundingClientRect().top - dragStartY);
  draw();
});
canvas.addEventListener('mouseup', () => { isDragging = false; });

// Zoom (wheel) - zoom toward cursor
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  const pos = getCanvasXY(e);
  const factor = e.deltaY < 0 ? 1.08 : 0.92;
  const newScale = Math.min(Math.max(scale * factor, 0.4), 3);
  panX = pos.x - (pos.x - panX) * (newScale / scale);
  panY = pos.y - (pos.y - panY) * (newScale / scale);
  scale = newScale;
  draw();
}, { passive: false });

// Touch support
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); onPointerDown(e); }, { passive: false });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); onPointerMove(e); }, { passive: false });
canvas.addEventListener('touchend', onPointerUp);

// DPR scaling for retina
const dpr = window.devicePixelRatio || 1;
canvas.width = w * dpr;
canvas.height = h * dpr;
canvas.style.width = w + 'px';
canvas.style.height = h + 'px';
ctx.scale(dpr, dpr);
```

## Hamburger Menu Animation

```css
.header-menu-btn span {
  display: block; width: 22px; height: 2px;
  background: var(--text-primary);
  transition: all var(--transition);
  transform-origin: center;
}
.header-menu-btn.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.header-menu-btn.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.header-menu-btn.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```

## Gradient Border Card (Featured)

```css
.project-card.featured {
  border-color: transparent;
  background: linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
              linear-gradient(135deg, var(--accent), var(--accent-secondary), var(--accent)) border-box;
  border: 2px solid transparent;
  box-shadow: 0 0 30px color-mix(in srgb, var(--accent) 12%, transparent);
}
```

## Button Styles

```css
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.8rem 1.75rem; border-radius: var(--radius-sm);
  font-size: 0.9rem; font-weight: 700; letter-spacing: 0.02em;
  cursor: pointer; border: none; font-family: var(--font-sans);
  transition: all var(--transition);
}
.btn-primary {
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 80%, var(--accent-secondary)));
  color: #0a0a0f; box-shadow: 0 4px 20px var(--accent-glow);
}
.btn-primary:hover {
  transform: translateY(-3px); box-shadow: 0 8px 35px var(--accent-glow); opacity: 1;
}
.btn-ghost {
  background: var(--bg-card); color: var(--text-primary);
  border: 1px solid var(--bg-card-border);
}
.btn-ghost:hover {
  background: var(--bg-card-hover); border-color: var(--accent);
  color: var(--accent); transform: translateY(-2px); opacity: 1;
}
```

## Typing Effect

```js
const typedEl = document.querySelector('[data-typed]');
if (typedEl) {
  const text = typedEl.textContent || '';
  typedEl.textContent = '';
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      typedEl.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 40 + Math.random() * 30);
    }
  }
  setTimeout(typeChar, 800);
}
```

```css
.hero-typed::after {
  content: '|'; animation: blink 1s step-end infinite;
  color: var(--accent); font-weight: 300;
}
@keyframes blink { 50% { opacity: 0; } }
```

## Contact Form (mailto: pattern)

```js
const body = [
  `Olá Wesley,`, ``,
  `Nome: ${name}`, `Email: ${email}`,
  `Serviço: ${service}`, `Orçamento: ${budget}`, ``,
  `Descrição:`, `${message}`, ``,
  `Aguardo retorno.`,
].join('\n');
const mailto = `mailto:wesleyprofissional2020@gmail.com?subject=${encodeURIComponent(`[Orçamento] ${service} — ${name}`)}&body=${encodeURIComponent(body)}`;
window.location.href = mailto;

// Success feedback
btn.innerHTML = `✓ Email aberto! Verifique seu cliente de email.`;
btn.style.background = '#22c55e';
setTimeout(() => { btn.innerHTML = originalHTML; btn.style.background = ''; }, 4000);
```

## Select Option Styling

```css
.form-group select option {
  background: #1a1a2e; color: #e4e4e7;
}
:root[data-theme="light"] .form-group select option {
  background: #ffffff; color: #1a1a2e;
}
```

## Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
  [data-reveal] { opacity: 1; transform: none; }
}
```

## Performance Best Practices

```css
/* Skip below-fold rendering */
.section { content-visibility: auto; contain-intrinsic-size: auto 800px; }

/* Fixed header scroll offset */
html { scroll-padding-top: 80px; }
```

```html
<!-- Above-fold: eager -->
<img src="/images/profile.png" loading="eager" />
<!-- Below-fold: lazy -->
<img src="/images/profile.png" loading="lazy" />
```

## Timeline Chronological Sort

```js
const allItems = [...experience, ...education].sort((a, b) => {
  const getOrder = (item) => {
    if (item.period?.includes('Atual')) return 100;
    const match = item.period?.match(/(\d{4})/);
    return match ? parseInt(match[1]) : 0;
  };
  return getOrder(a) - getOrder(b); // ascending: old -> new
});
```

## Honeypot Anti-Spam

```html
<div class="form-honey" aria-hidden="true">
  <input type="text" name="website" tabindex="-1" autocomplete="off" />
</div>
```
```css
.form-honey { position: absolute; left: -9999px; opacity: 0; }
```
```js
// Check on submit
const honey = form.querySelector('[name="website"]');
if (honey?.value) return; // bot detected
```
