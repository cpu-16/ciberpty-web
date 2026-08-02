# Rediseño Motion Fase 1 (Home Cinematográfica) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la home de ciberpty.com por el hero cinematográfico oscuro (video loop propio, Sora, fade-up escalonado, liquid glass) según `docs/specs/2026-08-02-rediseno-motion-design.md`.

**Architecture:** El efecto de fondo se construye como shader WebGL en una página standalone (`tools/hero-video/`), se graba frame a frame con Playwright y se codifica con ffmpeg a un loop perfecto self-hosted en `public/media/`. La home consume un nuevo componente `CinematicHero.astro`; el sistema motion (keyframes, glass, tokens) vive en `src/styles/motion.css` para reutilizarse en Fase 2.

**Tech Stack:** Astro 5 estático + CSS propio + `<script is:inline>`. Herramientas de build del video: Python + Playwright (solo local, no es dependencia del sitio) + ffmpeg (ya instalado en `/usr/bin/ffmpeg`).

## Global Constraints

- Directorio de trabajo: `/home/gar16/Documents/PROYECTOS/EMPRENDIMIENTO/ciberpty-web-release` (todo comando corre ahí salvo indicación).
- **Cero dependencias npm nuevas.** Sin React, sin Tailwind, sin hls.js. `package.json` no se toca.
- Copy SOLO en `src/content/home.{es,en}.ts`; datos de contacto/rutas SOLO desde `src/utils/site.ts` (`SITE`, `pagePath`).
- Paridad bilingüe es/en en cada cambio de contenido.
- Acento único `#00ff9c`. **En el hero usar `--cine-accent: #00ff9c` fijo, NO `var(--accent)`** (en tema claro `--accent` es `#00784f` y el hero permanece oscuro en ambos temas).
- No mostrar precios. No tocar `BrandLogo.astro` ni el favicon.
- Presupuesto de peso del video: mp4 ≤ 5 MB. Móvil (≤640px) y `prefers-reduced-motion` usan solo el poster.
- No hay tests ni linter: la verificación es `npm run build` + inspección visual (screenshots).
- Commits frecuentes en el repo del sitio. **NO hacer `git push` a `origin`.**
- No desplegar a producción: la fase termina con screenshots en `../previews/` para aprobación de Gilberto.

---

### Task 1: Fuente Sora self-hosted

**Files:**
- Create: `public/fonts/sora-var.woff2`
- Modify: `src/styles/global.css:1-5` (bloque de tokens tipográficos)

**Interfaces:**
- Produces: token CSS `--font-display` (Sora variable 100–800) disponible globalmente. Tasks 6 la consumen vía `font-family: var(--font-display)`.

- [ ] **Step 1: Descargar el woff2 variable de Sora**

```bash
mkdir -p public/fonts
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
curl -sA "$UA" "https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" -o /tmp/sora.css
grep -o 'https://fonts.gstatic.com/[^)]*' /tmp/sora.css
```

Del listado, tomar la URL del bloque cuyo comentario es `/* latin */` (woff2) y descargarla:

```bash
curl -s '<URL_DEL_WOFF2_LATIN>' -o public/fonts/sora-var.woff2
ls -la public/fonts/  # debe pesar ~40-80 KB
```

- [ ] **Step 2: Registrar @font-face y token**

En `src/styles/global.css`, ANTES del bloque `:root` existente, añadir:

```css
@font-face {
  font-family: 'Sora';
  src: url('/fonts/sora-var.woff2') format('woff2-variations');
  font-weight: 100 800;
  font-style: normal;
  font-display: swap;
}
```

Y dentro del `:root` (junto a `--font-title`, línea ~2) añadir:

```css
  --font-display: 'Sora', 'Space Grotesk', system-ui, sans-serif;
```

No tocar `--font-title` ni el `@import` de Google Fonts de `cyber.css:1` (las demás páginas siguen usándolo hasta Fase 2).

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `Complete!` sin errores.

- [ ] **Step 4: Commit**

```bash
git add public/fonts/sora-var.woff2 src/styles/global.css
git commit -m "feat: fuente Sora variable self-hosted + token --font-display"
```

---

### Task 2: Sistema motion en CSS (`motion.css`)

**Files:**
- Create: `src/styles/motion.css`
- Modify: `src/layouts/SiteLayout.astro:2-5` (imports de CSS)

**Interfaces:**
- Produces: clases globales `.anim-fade-up`, `.anim-fade-in`, `.glass-card`; token `--hero-bg`; easing `--ease-out-expo`; reglas `body.is-cinematic ...`. Tasks 6 y 7 las consumen.

- [ ] **Step 1: Crear `src/styles/motion.css`**

```css
/* Sistema motion — rediseño 2026-08 (spec: docs/specs/2026-08-02-rediseno-motion-design.md) */
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --hero-bg: #070b0a; /* el hero cinematográfico es oscuro en ambos temas */
}

@keyframes fade-up {
  0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.anim-fade-up { opacity: 0; animation: fade-up 0.7s var(--ease-out-expo) forwards; }
.anim-fade-in { opacity: 0; animation: fade-in 0.5s ease-out forwards; }

@media (prefers-reduced-motion: reduce) {
  .anim-fade-up, .anim-fade-in { animation: none; opacity: 1; }
}

/* Liquid glass (receta CodeNest: luminosity + borde por mask-composite) */
.glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  border-radius: 14px;
}
.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1.4px;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.08));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

/* Página con hero cinematográfico: header flotante y sin efectos de fondo viejos */
body.is-cinematic .site-header {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 50;
  background: transparent;
  border-bottom: 0;
}
body.is-cinematic #matrix-canvas,
body.is-cinematic .bg-aurora,
body.is-cinematic .scanlines { display: none; }
```

- [ ] **Step 2: Importarlo en el layout**

En `src/layouts/SiteLayout.astro`, tras `import '../styles/site.css';` (línea 5), añadir:

```astro
import '../styles/motion.css';
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `Complete!` sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/styles/motion.css src/layouts/SiteLayout.astro
git commit -m "feat: sistema motion (fade-up, glass card, modo cinematográfico)"
```

---

### Task 3: Generador WebGL del fondo del hero

**Files:**
- Create: `tools/hero-video/index.html`

**Interfaces:**
- Produces: página standalone que dibuja el efecto en un canvas 1920×1080 y expone `window.renderFrame(t: seconds)` determinista con **período exacto de 12 s** (`renderFrame(0)` ≡ `renderFrame(12)`). Task 4 la consume.

- [ ] **Step 1: Crear `tools/hero-video/index.html`**

```html
<!doctype html>
<html>
<head><meta charset="utf-8"><title>hero-bg generator</title>
<style>html,body{margin:0;background:#000}canvas{display:block}</style></head>
<body>
<canvas id="c" width="1920" height="1080"></canvas>
<script>
// Vórtice de fibras de luz verde (#00ff9c) sobre negro. Loop perfecto: período T=12s.
const T = 12;
const canvas = document.getElementById('c');
const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_phase; /* 0..2PI, cíclico */

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
/* ruido periódico en el tiempo: muestrea el dominio sobre un círculo */
float pnoise(vec2 p, float phase){
  return noise(p + vec2(cos(phase), sin(phase)) * 2.0);
}
void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  uv.x += 0.22; /* descentrado: el contenido va abajo-izquierda, el vórtice a la derecha */
  float r = length(uv);
  float a = atan(uv.y, uv.x);

  float f = 0.0;
  for (int i = 1; i <= 4; i++) {
    float fi = float(i);
    /* filamentos angulares girando; frecuencias enteras => periódico en u_phase */
    float band = sin(a * fi * 3.0 + u_phase * fi + pnoise(uv * (2.0 + fi), u_phase) * 6.2831853);
    f += smoothstep(0.82, 1.0, band) / fi;
  }
  float ring = exp(-pow((r - 0.34) * 6.0, 2.0));
  float core = exp(-r * r * 18.0) * 0.35;
  float glow = f * ring + core;

  vec3 green = vec3(0.0, 1.0, 0.612); /* #00ff9c */
  vec3 col = green * glow + vec3(1.0) * pow(glow, 3.0) * 0.55;
  col *= 1.0 - smoothstep(0.55, 1.1, r); /* viñeta */
  gl_FragColor = vec4(col, 1.0);
}`;

function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}
const prog = gl.createProgram();
gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
gl.linkProgram(prog); gl.useProgram(prog);

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prog, 'p');
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
const uRes = gl.getUniformLocation(prog, 'u_res');
const uPhase = gl.getUniformLocation(prog, 'u_phase');
gl.viewport(0, 0, canvas.width, canvas.height);
gl.uniform2f(uRes, canvas.width, canvas.height);

function renderFrame(t) {
  gl.uniform1f(uPhase, (t % T) / T * Math.PI * 2.0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.finish();
}
window.renderFrame = renderFrame;

/* preview en vivo (la captura usa renderFrame directamente) */
(function loop() {
  renderFrame(performance.now() / 1000);
  requestAnimationFrame(loop);
})();
</script>
</body>
</html>
```

- [ ] **Step 2: Verificación visual del efecto**

Run: `xdg-open tools/hero-video/index.html`

Criterios de aceptación (iterar constantes del shader hasta cumplirlos):
- Fondo mayormente negro; fibras verdes nítidas formando un vórtice/anillo a la derecha del encuadre.
- Núcleo con glow blanco-verdoso sutil, sin zonas quemadas grandes.
- Movimiento lento y elegante (si se siente frenético, bajar los multiplicadores de `u_phase`… manteniendo SIEMPRE coeficientes enteros de `u_phase` para no romper el loop).
- El tercio izquierdo/inferior queda oscuro (ahí va el texto del hero).

- [ ] **Step 3: Verificar que el loop cierra**

En la consola del navegador (DevTools):

```js
renderFrame(0);  // observar el canvas
renderFrame(12); // debe verse EXACTAMENTE igual
```

Expected: ambos frames idénticos a simple vista (matemáticamente lo son: todos los términos usan `u_phase` con coeficientes enteros).

- [ ] **Step 4: Commit**

```bash
git add tools/hero-video/index.html
git commit -m "feat: generador WebGL del fondo del hero (loop 12s)"
```

---

### Task 4: Grabar el video loop y el poster a `public/media/`

**Files:**
- Create: `tools/hero-video/capture.py`
- Create: `public/media/hero-loop.mp4`, `public/media/hero-loop.webm`, `public/media/hero-poster.jpg`
- Modify: `.gitignore` (si no existe, crearlo)

**Interfaces:**
- Consumes: `window.renderFrame(t)` de Task 3.
- Produces: `/media/hero-loop.mp4`, `/media/hero-loop.webm`, `/media/hero-poster.jpg` — las rutas exactas que `CinematicHero.astro` (Task 6) referencia.

- [ ] **Step 1: Instalar Playwright para Python (solo tooling local)**

```bash
pip install --user playwright
python3 -m playwright install chromium
```

- [ ] **Step 2: Crear `tools/hero-video/capture.py`**

```python
"""Captura 360 frames (12 s @ 30 fps = 1 período exacto) del generador WebGL."""
import pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).parent
FRAMES = ROOT / "frames"
FRAMES.mkdir(exist_ok=True)
FPS, DUR = 30, 12

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1920, "height": 1080})
    page.goto((ROOT / "index.html").as_uri())
    page.wait_for_function("typeof window.renderFrame === 'function'")
    for i in range(FPS * DUR):
        page.evaluate(f"window.renderFrame({i}/{FPS})")
        page.locator("canvas").screenshot(path=str(FRAMES / f"{i:04d}.png"))
        if i % 60 == 0:
            print(f"{i}/{FPS * DUR}")
    browser.close()
print("done")
```

Run: `python3 tools/hero-video/capture.py`
Expected: `tools/hero-video/frames/` con 360 PNGs (0000.png … 0359.png).

- [ ] **Step 3: Codificar con ffmpeg**

```bash
mkdir -p public/media
ffmpeg -y -framerate 30 -i tools/hero-video/frames/%04d.png \
  -c:v libx264 -pix_fmt yuv420p -crf 24 -movflags +faststart public/media/hero-loop.mp4
ffmpeg -y -framerate 30 -i tools/hero-video/frames/%04d.png \
  -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 public/media/hero-loop.webm
ffmpeg -y -i tools/hero-video/frames/0000.png -q:v 3 public/media/hero-poster.jpg
du -h public/media/*
```

Expected: mp4 ≤ 5 MB (si pesa más, resubir `-crf` a 26–28 y repetir), webm menor que el mp4, poster ≤ 200 KB.

- [ ] **Step 4: Verificar el loop en el navegador**

```bash
cat > /tmp/looptest.html <<'EOF'
<video src="/media/hero-loop.mp4" autoplay muted loop style="width:100vw"></video>
EOF
cp /tmp/looptest.html public/looptest.html
npm run dev
```

Abrir `http://localhost:4321/looptest.html` y mirar 2–3 vueltas completas.
Expected: sin salto perceptible al reiniciar el loop. Después: `rm public/looptest.html`.

- [ ] **Step 5: Ignorar los frames y commitear**

Añadir a `.gitignore` (crear el archivo si no existe):

```
tools/hero-video/frames/
```

```bash
git add .gitignore tools/hero-video/capture.py public/media/
git commit -m "feat: video loop del hero (mp4+webm) y poster, self-hosted"
```

---

### Task 5: Copy del hero cinematográfico (es/en)

**Files:**
- Modify: `src/content/home.es.ts:5-13` (bloque `hero`)
- Modify: `src/content/home.en.ts` (bloque `hero` equivalente)

**Interfaces:**
- Produces: objeto `heroCinematic` en `homeEs`/`homeEn` con las claves exactas: `eyebrow`, `title`, `accent`, `titleEnd`, `subtitle`, `desc`, `ctaPrimary`, `ctaSecondary`, `trustLine`, `card: { tag, title, desc }`. Task 6 renderiza exactamente esas claves.

- [ ] **Step 1: Reemplazar el bloque `hero` de `home.es.ts`**

Eliminar el objeto `hero` actual (líneas 5–13) y en su lugar añadir:

```ts
  heroCinematic: {
    eyebrow: 'CIBERPTY — PANAMÁ',
    title: 'Tu agente personal de',
    accent: 'IA',
    titleEnd: '',
    subtitle: 'Conversa. Organiza. Recuerda.',
    desc: 'Una IA que habla contigo por chat o voz, organiza tu día y recuerda lo que importa. Y si tu operación lo necesita: ciberseguridad y automatización.',
    ctaPrimary: 'Escríbeme por WhatsApp',
    ctaSecondary: 'Ver Asistentes de IA',
    trustLine: 'Hecho en Panamá · Datos privados · Disponible 24/7',
    card: {
      tag: '[ 2026 ]',
      title: 'Agentes con memoria',
      desc: 'Tu asistente corre en su propio espacio privado, con lo que tú usas.'
    }
  },
```

- [ ] **Step 2: Reemplazar el bloque `hero` de `home.en.ts`**

Mismo cambio, en inglés:

```ts
  heroCinematic: {
    eyebrow: 'CIBERPTY — PANAMA',
    title: 'Your personal',
    accent: 'AI',
    titleEnd: 'agent',
    subtitle: 'It chats. It organizes. It remembers.',
    desc: 'An AI that talks with you by chat or voice, organizes your day and remembers what matters. And if your operation needs it: cybersecurity and automation.',
    ctaPrimary: 'Message me on WhatsApp',
    ctaSecondary: 'See AI Assistants',
    trustLine: 'Made in Panama · Private data · Available 24/7',
    card: {
      tag: '[ 2026 ]',
      title: 'Agents with memory',
      desc: 'Your assistant runs in its own private space, with the tools you use.'
    }
  },
```

- [ ] **Step 3: Verificar que nada más consumía `content.hero`**

Run: `grep -rn "content.hero\b\|\.hero\." src/ | grep -v heroCinematic`
Expected: solo apariciones en `HomePage.astro` (se eliminan en Task 6). Si aparece otro consumidor, detenerse y reportar.

Nota: `npm run build` FALLARÁ en este punto (HomePage aún referencia `content.hero`). Es esperado; se arregla en Task 6. Por eso este task se commitea junto con el siguiente paso de verificación en Task 6 — NO commitear aquí.

---

### Task 6: Componente `CinematicHero.astro`

**Files:**
- Create: `src/components/home/CinematicHero.astro`
- Modify: `src/components/home/HomePage.astro:1-31` (imports + sección hero)

**Interfaces:**
- Consumes: `heroCinematic` (Task 5), clases `.anim-fade-up`/`.glass-card` y token `--hero-bg` (Task 2), `--font-display` (Task 1), `/media/hero-loop.{mp4,webm}` y `/media/hero-poster.jpg` (Task 4), `SITE.whatsapp` y `pagePath('assistants', locale)` de `src/utils/site.ts`.
- Produces: `<CinematicHero content={...} locale={...} />` con Props `{ content: any; locale: Locale }`.

- [ ] **Step 1: Crear `src/components/home/CinematicHero.astro`**

```astro
---
import { SITE, pagePath, type Locale } from '../../utils/site';

interface Props {
  content: any; // homeEs.heroCinematic | homeEn.heroCinematic
  locale: Locale;
}

const { content: c, locale } = Astro.props;
---

<section class="cine-hero">
  <div class="cine-media" aria-hidden="true">
    <video id="cine-video" muted loop playsinline preload="none" poster="/media/hero-poster.jpg"></video>
    <div class="cine-shade"></div>
  </div>

  <aside class="glass-card cine-card anim-fade-up" style="animation-delay:.9s">
    <p class="cine-card-tag">{c.card.tag}</p>
    <p class="cine-card-title">{c.card.title}</p>
    <p class="cine-card-desc">{c.card.desc}</p>
  </aside>

  <div class="cine-content">
    <p class="cine-eyebrow anim-fade-up" style="animation-delay:.2s">{c.eyebrow}</p>
    <h1 class="cine-title anim-fade-up" style="animation-delay:.35s">
      {c.title} <span class="cine-accent">{c.accent}</span>
      {c.titleEnd && <Fragment> {c.titleEnd}</Fragment>}<span class="cine-accent">.</span>
    </h1>
    <p class="cine-sub anim-fade-up" style="animation-delay:.5s">{c.subtitle}</p>
    <p class="cine-desc anim-fade-up" style="animation-delay:.6s">{c.desc}</p>
    <div class="cine-ctas anim-fade-up" style="animation-delay:.75s">
      <a class="cine-btn cine-btn-primary" href={SITE.whatsapp} target="_blank" rel="noreferrer">{c.ctaPrimary}</a>
      <a class="cine-btn cine-btn-light" href={pagePath('assistants', locale)}>{c.ctaSecondary}</a>
    </div>
    <p class="cine-trust anim-fade-up" style="animation-delay:.9s">{c.trustLine}</p>
  </div>
</section>

<script is:inline>
  // carga el video solo si no es móvil ni reduced-motion; si no, queda el poster
  (() => {
    const v = document.getElementById('cine-video');
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 640px)').matches;
    if (reduce || small) return;
    [
      { src: '/media/hero-loop.webm', type: 'video/webm' },
      { src: '/media/hero-loop.mp4', type: 'video/mp4' }
    ].forEach(({ src, type }) => {
      const s = document.createElement('source');
      s.src = src;
      s.type = type;
      v.appendChild(s);
    });
    v.load();
    v.play().catch(() => {});
  })();
</script>

<style>
  /* El hero es oscuro en ambos temas: colores fijos, no tokens del tema */
  .cine-hero {
    --cine-accent: #00ff9c;
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    background: var(--hero-bg);
  }
  .cine-media,
  .cine-media video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cine-media { background: url('/media/hero-poster.jpg') center / cover; }
  .cine-media video { opacity: 0.6; }
  .cine-shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, var(--hero-bg) 0%, transparent 55%),
      linear-gradient(0deg, var(--hero-bg) 0%, transparent 45%);
  }

  .cine-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1100px;
    margin-inline: auto;
    padding: 8rem 1.5rem 3rem;
  }
  .cine-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--cine-accent);
    margin: 0 0 0.6rem;
  }
  .cine-title {
    font-family: var(--font-display);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.05em;
    line-height: 1.05;
    font-size: clamp(3rem, 8vw, 6rem);
    color: #f2f7f5;
    margin: 0 0 0.5rem;
  }
  .cine-accent { color: var(--cine-accent); }
  .cine-sub {
    font-family: var(--font-display);
    font-weight: 300;
    font-size: clamp(1.125rem, 2.5vw, 1.875rem);
    color: rgba(230, 237, 243, 0.8);
    margin: 0 0 0.6rem;
  }
  .cine-desc {
    font-weight: 300;
    font-size: clamp(0.875rem, 1.5vw, 1.1rem);
    color: #7d8a9a;
    max-width: 34rem;
    margin: 0 0 1.5rem;
  }
  .cine-ctas { display: flex; flex-wrap: wrap; gap: 0.8rem; }
  .cine-btn {
    padding: 0.85rem 1.7rem;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    transition: filter 0.2s ease, transform 0.1s ease;
  }
  .cine-btn:active { transform: scale(0.97); }
  .cine-btn-primary { background: var(--cine-accent); color: #050608; }
  .cine-btn-primary:hover { filter: brightness(1.1); }
  .cine-btn-light { background: #ffffff; color: #050608; }
  .cine-btn-light:hover { filter: brightness(0.9); }
  .cine-trust {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: rgba(125, 138, 154, 0.7);
    margin: 1.2rem 0 0;
  }

  .cine-card {
    position: absolute;
    z-index: 2;
    top: 22%;
    right: 8%;
    width: 220px;
    padding: 1.1rem;
    display: none;
  }
  .cine-card-tag { font-family: var(--font-mono); font-size: 0.75rem; color: var(--cine-accent); margin: 0 0 0.4rem; }
  .cine-card-title { font-family: var(--font-display); font-weight: 600; font-size: 1.05rem; color: #f2f7f5; margin: 0 0 0.3rem; }
  .cine-card-desc { font-size: 0.72rem; color: rgba(230, 237, 243, 0.65); margin: 0; }
  @media (min-width: 900px) { .cine-card { display: block; } }
</style>
```

- [ ] **Step 2: Integrarlo en `HomePage.astro`**

En `src/components/home/HomePage.astro`:

1. Eliminar `import BootTerminal from '../BootTerminal.astro';` (línea 4) y añadir `import CinematicHero from './CinematicHero.astro';`.
2. Reemplazar TODO el bloque `<section class="page-hero container home-hero">…</section>` (líneas 15–31) por:

```astro
<CinematicHero content={content.heroCinematic} locale={locale} />
```

3. En el `<style>` del componente, eliminar el bloque `.home-hero`/`.home-visual` (líneas 114–119) que queda huérfano.

- [ ] **Step 3: Verificar build y ambos idiomas**

Run: `npm run build`
Expected: `Complete!` sin errores (aquí se resuelve el fallo esperado de Task 5).

Run: `npm run dev` y abrir `http://localhost:4321/es/` y `http://localhost:4321/en/`.
Expected: hero a pantalla completa con video de fondo, headline Sora con "IA."/"AI agent." y puntos verdes, fade-up escalonado, glass card visible en desktop.

- [ ] **Step 4: Commit (incluye Task 5)**

```bash
git add src/content/home.es.ts src/content/home.en.ts src/components/home/CinematicHero.astro src/components/home/HomePage.astro
git commit -m "feat: hero cinematográfico en la home (video loop, Sora, fade-up, glass)"
```

---

### Task 7: Modo cinematográfico en el layout (header flotante, sin matrix en home)

**Files:**
- Modify: `src/layouts/SiteLayout.astro:10-21` (Props y `<body>`) y `:95-98` (IIFE del matrix rain)
- Modify: `src/pages/es/index.astro`, `src/pages/en/index.astro`

**Interfaces:**
- Consumes: reglas `body.is-cinematic ...` de Task 2.
- Produces: prop opcional `cinematic?: boolean` en `SiteLayout` (default `false`). Las páginas home la pasan como `cinematic`.

- [ ] **Step 1: Añadir la prop al layout**

En `src/layouts/SiteLayout.astro`:

1. En la `interface Props`, añadir `cinematic?: boolean;`.
2. En el destructuring: `const { locale, pageKey, title, description, cinematic = false } = Astro.props;`
3. Cambiar `<body>` por `<body class:list={[{ 'is-cinematic': cinematic }]}>`.

- [ ] **Step 2: Apagar el matrix rain en modo cinematográfico**

En el IIFE del matrix rain (línea ~95, `const canvas = document.getElementById('matrix-canvas');`), añadir justo después del `if (!canvas) return;`:

```js
if (document.body.classList.contains('is-cinematic')) return;
```

(El CSS ya lo oculta; esto evita gastar frames en un canvas invisible.)

- [ ] **Step 3: Pasar la prop desde las dos homes**

En `src/pages/es/index.astro` y `src/pages/en/index.astro`, añadir `cinematic` al `<SiteLayout ...>`:

```astro
<SiteLayout locale="es" pageKey="home" title={homeEs.title} description={homeEs.description} cinematic>
```

(Ajustar al formato exacto de props que ya tenga cada archivo; solo se agrega `cinematic`.)

- [ ] **Step 4: Verificar**

Run: `npm run dev`, abrir `http://localhost:4321/es/`.
Expected: header transparente flotando sobre el video, sin lluvia matrix detrás de las secciones de la home. Abrir también `http://localhost:4321/es/asistentes` — esa página debe seguir EXACTAMENTE igual que antes (matrix, header normal).

Run: `npm run build`
Expected: `Complete!`.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/SiteLayout.astro src/pages/es/index.astro src/pages/en/index.astro
git commit -m "feat: modo cinematográfico del layout (header flotante, matrix off en home)"
```

---

### Task 8: QA visual, screenshots para Gilberto y build final

**Files:**
- Create: `../previews/rediseno-fase1/` (fuera del repo del sitio; NO se commitea)
- Create: `tools/hero-video/screenshots.py`

**Interfaces:**
- Consumes: sitio corriendo en `npm run dev` (`:4321`), Playwright de Task 4.

- [ ] **Step 1: Crear `tools/hero-video/screenshots.py`**

```python
"""Screenshots de QA de la home nueva: desktop/móvil × es/en."""
import pathlib
from playwright.sync_api import sync_playwright

OUT = pathlib.Path(__file__).resolve().parents[3] / "previews" / "rediseno-fase1"
OUT.mkdir(parents=True, exist_ok=True)
SHOTS = [
    ("es-desktop", "http://localhost:4321/es/", 1440, 900),
    ("en-desktop", "http://localhost:4321/en/", 1440, 900),
    ("es-mobile", "http://localhost:4321/es/", 390, 844),
    ("en-mobile", "http://localhost:4321/en/", 390, 844),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, url, w, h in SHOTS:
        page = browser.new_page(viewport={"width": w, "height": h})
        page.goto(url)
        page.wait_for_timeout(2500)  # deja terminar los fade-up
        page.screenshot(path=str(OUT / f"{name}-hero.png"))
        page.screenshot(path=str(OUT / f"{name}-full.png"), full_page=True)
        page.close()
    browser.close()
print(f"screenshots en {OUT}")
```

- [ ] **Step 2: Generar y REVISAR los screenshots**

```bash
npm run dev &
python3 tools/hero-video/screenshots.py
```

Abrir cada PNG y criticar contra esta lista (corregir y re-capturar hasta pasar):
- Headline completo y legible sobre el video en desktop y móvil (es y en; el inglés es más largo: "YOUR PERSONAL AI AGENT.").
- Contraste suficiente del texto muted sobre el fondo (el gradiente `cine-shade` debe cubrir el texto).
- Glass card no tapa el vórtice ni el headline; no aparece en móvil.
- Las secciones bajo el hero (demo, bento, pasos) se ven bien sin la lluvia matrix.
- En móvil se ve el poster (no video) y nada desborda horizontalmente.

- [ ] **Step 3: Chequeos manuales restantes**

En el navegador:
- Tema claro (toggle): el hero permanece oscuro; el resto de la home respeta el tema claro.
- DevTools → Rendering → "Emulate prefers-reduced-motion": recargar; debe verse el poster estático y el contenido sin animación pero visible.
- El loop del video no salta tras 2–3 vueltas (24–36 s mirándolo).

- [ ] **Step 4: Build final y commit**

```bash
npm run build
git add tools/hero-video/screenshots.py
git commit -m "chore: script de screenshots de QA del rediseño"
```

Expected: `Complete!` y árbol de trabajo limpio (`git status`).

- [ ] **Step 5: Entregar para aprobación**

Mostrar a Gilberto los PNGs de `previews/rediseno-fase1/`. **No desplegar ni pushear**: el deploy (rsync + docker compose) se hace solo tras su visto bueno, siguiendo el flujo de `AVANCE.md` §3.
