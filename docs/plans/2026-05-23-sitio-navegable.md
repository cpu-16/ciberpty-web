# CiberPTY Sitio Navegable — Plan de Implementación

> **Para ejecución:** sitio estático (Astro) — la verificación por tarea NO es TDD unitario sino: `npm run build` (astro build) sin errores + render de preview (Playwright) revisado. Pasos con checkbox `- [ ]`.

**Goal:** Convertir el sitio CiberPTY de una landing SPA a un sitio Astro multipágina navegable, bilingüe (es/en), con los Asistentes de IA al frente.

**Architecture:** Astro 5 estático con `BaseLayout` + `Header`/`Footer` compartidos y páginas reales por ruta/idioma. Se reusan estilos (`cyber.css`/`theme.css`/`global.css`) y componentes existentes; se retira la SPA babel (`public/ciberpty.html` y `*.jsx`). Build → nginx en Docker.

**Tech Stack:** Astro 5, HTML/CSS (sistema cyber existente), TypeScript para contenido i18n, Docker/nginx, Playwright (solo para previews).

Spec: `docs/specs/2026-05-23-sitio-navegable-design.md`.

---

## Task 0: Preparación y harness de preview
**Files:** (solo lectura/infra)
- [ ] Leer componentes y estilos existentes (`src/components/*`, `src/styles/*`, `src/content/projects.es.ts`).
- [ ] Verificar build base: `npm ci && npm run build` en `ciberpty-web-release/`. Esperado: build OK a `dist/`.
- [ ] Script de preview: reusar `/tmp/ad-render` (Playwright) con un `preview.js` que renderice rutas servidas por `npm run preview` o `astro dev` a PNG.
- [ ] Commit: `chore: baseline build + preview harness`.

## Task 1: Shell compartido (layout, nav, footer, i18n, rutas)
**Files:**
- Modify: `src/components/Header.astro` (nav de 5 enlaces + toggles)
- Create: `src/components/SiteFooter.astro`
- Modify: `src/layouts/BaseLayout.astro` (incluir footer; slots)
- Modify: `src/content/profile.es.ts` y `profile.en.ts` (nav nueva: Inicio/Asistentes/Ciberseguridad/Blog/Contacto con rutas absolutas por idioma)
- Modify: `src/pages/index.astro` (redirect `/` → `/es/`)
- [ ] Implementar nav con rutas reales por idioma (`/es/`, `/es/asistentes/`, `/es/ciberseguridad/`, `/es/blog/`, `/es/contacto/` y equivalentes en).
- [ ] Footer con marca, enlaces y contacto.
- [ ] Verificar: `npm run build` OK; nav presente en el HTML generado.
- [ ] Commit: `feat: shared shell (nav, footer, routing)`.

## Task 2: Página Asistentes de IA (estrella) — es + en
**Files:**
- Create: `src/pages/es/asistentes.astro`, `src/pages/en/assistants.astro`
- Create: `src/components/assistants/AssistantsHero.astro`, `Features.astro`, `HowItWorks.astro`, `FAQ.astro`
- Create: `src/content/assistants.es.ts`, `assistants.en.ts` (copy: hero "Una IA que te sigue el ritmo", 4 beneficios, 3-4 pasos, FAQ, CTA WhatsApp; sin precio)
- [ ] Hero alineado al anuncio (aurora/glass/burbujas de chat), 4 beneficios, cómo funciona, casos de uso, FAQ, CTA WhatsApp (wa.me/50768573845).
- [ ] Verificar: build OK + preview PNG revisado (es y en).
- [ ] Commit: `feat: assistants product page`.

## Task 3: Página Inicio (assistants-first) — es + en
**Files:**
- Create: `src/pages/es/index.astro`, `src/pages/en/index.astro` (reemplazan el redirect a la SPA)
- Create: `src/components/home/HomeHero.astro`, `SecondaryCyberBand.astro`
- [ ] Hero del agente personal + 4 beneficios resumidos + cómo funciona (resumen) + banda secundaria de Ciberseguridad/Automatización con enlace + CTA contacto.
- [ ] Verificar: build OK + preview PNG (es y en); `/es/` ya NO redirige a la SPA.
- [ ] Commit: `feat: home page assistants-first`.

## Task 4: Página Ciberseguridad & Automatización — es + en
**Files:**
- Create: `src/pages/es/ciberseguridad.astro`, `src/pages/en/cybersecurity.astro`
- Create: `src/content/cyber.es.ts`, `cyber.en.ts` (portar de `public/content.jsx`: 6 servicios, método 4 fases, stack 8, valor)
- Create: `src/components/cyber/Services.astro`, `Method.astro`, `Stack.astro`
- [ ] Portar contenido y estética (tarjetas, reveal). CTA "Solicitar diagnóstico".
- [ ] Verificar: build OK + preview PNG (es y en).
- [ ] Commit: `feat: cybersecurity page (ported content)`.

## Task 5: Blog índice — es + en
**Files:**
- Create: `src/pages/es/blog.astro`, `src/pages/en/blog.astro`
- Create: `src/content/blog.es.ts`, `blog.en.ts` (3 posts: categoría, fecha, título, excerpt, link a `/blog/*.html`)
- [ ] Índice navegable enlazando los 3 artículos existentes en `public/blog/`.
- [ ] Verificar: build OK + links resuelven.
- [ ] Commit: `feat: blog index`.

## Task 6: Página Contacto — es + en
**Files:**
- Create: `src/pages/es/contacto.astro`, `src/pages/en/contact.astro`
- Create: `src/components/ContactCard.astro`
- [ ] Datos (Gilberto Ramos, gilberto@ciberpty.com, wa.me/50768573845, github.com/cpu-16, Panamá·Veraguas) + botones WhatsApp/email. Sin formulario backend.
- [ ] Verificar: build OK + botones con `href` correctos.
- [ ] Commit: `feat: contact page`.

## Task 7: Limpieza SPA + verificación integral
**Files:**
- Remove/retire: `public/ciberpty.html`, `public/app.jsx`, `public/components.jsx`, `public/content.jsx`, `public/effects.jsx`, `public/tweaks-panel.jsx`, `public/vendor/*` (mover a `legacy/` por si acaso, no borrar duro).
- Modify: `nginx.conf` si hace falta (index → `index.html`).
- [ ] Verificar navegación completa es/en (5 páginas), header/footer coherentes, tema/idioma funcionando.
- [ ] Preview PNG de cada página. Mostrar a Gilberto.
- [ ] Commit: `chore: retire legacy SPA; final wiring`.

## Task 8: Despliegue (tras aprobación del preview)
- [ ] Snapshot del dir en el servidor: `cp -r ciberpty-web-release ciberpty-web-release.bak-AAAAMMDD`.
- [ ] `rsync` de la copia local (rama) → servidor.
- [ ] `docker compose up -d --build` en el servidor; verificar `curl 127.0.0.1:8088/` y healthcheck.
- [ ] Confirmar `ciberpty.com` navegable.

---

## Self-review
- Cobertura spec: shell/nav ✓(T1), inicio ✓(T3), asistentes ✓(T2), ciberseguridad ✓(T4), blog ✓(T5), contacto ✓(T6), i18n ✓(T1-6), retiro SPA ✓(T7), despliegue ✓(T8). Sin huecos.
- Orden: shell → asistentes (mayor valor) → inicio → resto, para mostrar preview temprano.
- Verificación realista para sitio estático (build + preview), no TDD unitario.
