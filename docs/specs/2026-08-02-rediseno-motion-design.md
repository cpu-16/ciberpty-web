# Rediseño motion de ciberpty.com — Diseño

**Fecha:** 2026-08-02
**Estado:** Aprobado por Gilberto (conversación 2026-08-02)
**Referencias:** galería motionsites.ai — plantillas Future-State, Web3 EOS Hero, Sentinel AI y CodeNest (prompts completos de referencia guardados durante la exploración; los dos últimos pegados por Gilberto en la conversación).

## Objetivo

Evolucionar el sitio (Astro 5 estático, bilingüe es/en) al estilo "AI cinematográfico oscuro" de las referencias: hero a pantalla completa con fondo animado espectacular, tipografía display premium y un único acento verde. Es una evolución de la identidad actual (negro + `#00ff9c`), no un cambio de marca.

## Alcance

Todo el sitio, en dos fases:

- **Fase 1:** home nueva (es/en) — hero cinematográfico + secciones renovadas.
- **Fase 2:** propagar el sistema visual (tokens, tipografía, cards, motion) a Asistentes, Ciberseguridad, Contacto y Blog.

## 1. Dirección de arte

- **Tono:** AI cinematográfico oscuro.
- **Paleta:** fondo casi negro `#070b0a` (hero aún más oscuro), texto casi blanco, escala de grises muted, y `#00ff9c` como **único acento** (CTAs, punto final del headline, hovers, glow). Sin colores secundarios. Se conserva el toggle a tema claro existente (el sistema de tokens debe contemplar ambos temas).
- **Tipografía:** **Sora** (300–700) como display para headlines/subheads, en `clamp()` fluido con tracking apretado y contraste fuerte de pesos. **JetBrains Mono** se mantiene para eyebrows, labels tipo `[ 2026 ]`, navegación y detalles técnicos (ADN terminal de la marca).
- **Marca:** logo `>_ CIBERPTY` (`BrandLogo.astro`) intacto.

## 2. Hero de la home

Estructura tipo Sentinel AI + detalles de CodeNest:

- **Fondo:** video loop a pantalla completa (ver §4), opacidad ~60%, gradiente lineal oscuro desde la izquierda y de abajo hacia arriba para legibilidad. Poster estático mientras carga. `prefers-reduced-motion` → solo poster. Móvil → versión ligera del video o poster.
- **Layout:** contenido anclado abajo-izquierda (`flex items-end`), navbar flotante transparente encima.
- **Contenido:**
  - Eyebrow en JetBrains Mono verde.
  - Headline gigante Sora bold uppercase, `clamp(3rem, 8vw, 6rem)`, con "AI" o el punto final en verde.
  - Subheadline light, descripción muted con ancho máximo.
  - CTAs actuales conservados con ropa nueva: verde sólido → WhatsApp ("Escríbenos"), blanco → Asistentes ("Ver asistentes"). Sin precio, como siempre.
  - Línea de confianza pequeña (muted, ubicación "Panamá").
- **Liquid glass card** flotante con dato de credibilidad: `backdrop-filter: blur(4px)`, fondo `rgba(255,255,255,0.01)` con `background-blend-mode: luminosity`, borde por pseudo-elemento con `mask-composite: exclude` (receta CodeNest).
- **Motion de entrada:** fade-up escalonado con blur — keyframe `opacity 0→1, translateY(20px)→0, blur(4px)→0`, curva `cubic-bezier(0.16, 1, 0.3, 1)`, delays escalonados. Todo CSS.
- **Se retira el BootTerminal** de la home. El StackWindow de Asistentes se evalúa en Fase 2 (los heroes siguen siendo distintos entre páginas, bajo el mismo sistema).
- Los efectos matrix rain/scanlines se retiran de la home para no competir con el video; su destino en las demás páginas se decide en Fase 2.

## 3. Sistema visual (Fase 2)

- Tokens CSS compartidos: colores, tipografía, radios, animaciones (`fade-up`, `fade-in`), receta glass — en los CSS globales existentes (`theme.css`/`global.css`).
- Headlines Sora + eyebrows mono en todas las páginas; cards glass; navbar flotante unificada.
- El reveal-on-scroll existente se recalibra a la nueva curva/blur.
- Cada página conserva un hero propio diferenciado (no unificar), pero construido con el sistema.

## 4. Pipeline del video de fondo

1. Construir el efecto en código WebGL (canvas propio): vórtice/fibras de luz verde `#00ff9c` sobre negro, estilo Future-State/Web3 EOS.
2. Grabarlo a video loop perfecto con ffmpeg (mp4 H.264 + webm), más un poster JPG/AVIF del mejor frame.
3. Self-hosted en `public/media/` del sitio. **Nada de streams de Mux ni escenas Spline ajenas.**
4. Presupuesto de peso: apuntar a ≤ 4–5 MB el loop desktop; versión móvil recortada/reducida o solo poster.
5. Si hace falta imagen base adicional (texturas, ilustración), generarla vía `codex exec`.

## 5. Enfoque técnico

- **Stack sin cambios:** Astro 5 + CSS propio + `<script is:inline>`. Sin React, sin Tailwind, sin hls.js (video self-hosted = `<video>` nativo), sin librerías nuevas.
- Copy nuevo en `src/content/*.{es,en}.ts` (nunca en los `.astro`); rutas/datos de contacto siguen en `src/utils/site.ts`.
- Bilingüe es/en en paridad desde Fase 1.
- Fuente Sora: self-hosted (woff2 en `public/fonts/`) para no depender de Google Fonts en producción.

## 6. Verificación y entrega

- Cerrar el loop visual: screenshots de cada iteración en `previews/` (desktop y móvil, es/en) y revisión antes de desplegar.
- `npm run build` debe pasar (es el único check de CI).
- Deploy por el flujo aprobado: rsync quirúrgico a `ciberseguridad` + `docker compose up -d --build` + verificación curl/navegador. Rollback = snapshot `.bak-*`.
- Sin `git push` a `origin` sin confirmar con Gilberto.

## No-objetivos

- No agregar backend/formularios (CTAs siguen a WhatsApp/email).
- No mostrar precios.
- No rehacer el blog (solo recibe los tokens del sistema en Fase 2).
- No unificar los heroes de todas las páginas en uno solo.

## Riesgos

- **Peso del video:** mitigado con presupuesto de peso, webm+mp4, poster y variante móvil.
- **Legibilidad sobre video:** mitigado con overlay/gradientes y opacidad ~60%.
- **Tema claro:** el hero cinematográfico es intrínsecamente oscuro; en tema claro el hero permanece oscuro (como hacen las referencias) y el resto de la página respeta el toggle.

---

## Addendum Fase 2 (2026-08-02, tarde) — diferenciación por página

Gilberto aprobó la Fase 1 y pidió que las demás páginas no compartan el mismo molde
("se nota que es un sitio hecho por IA"), que el contenido no se repita entre páginas,
y sumar imágenes/contenido 2026 generado con Codex (`codex exec`, verificado funcionando).

**Diagnóstico de repetición:** (1) esqueleto idéntico en todas las páginas
(kicker → título con span → lead → chips → grids de cards → mismo CTA box);
(2) las 4 features y los 3 pasos de Asistentes repiten casi textual los de la home;
(3) cero imágenes; (4) Sora solo en la home.

**Principio:** un solo sistema (Sora display + JetBrains Mono + verde único + fade-up),
pero cada página con firma propia de layout, motion y contenido:

- **Global:** `--font-title` pasa a Sora (retipografía todo el sitio); el CTA final deja
  de ser el mismo box clonado — cada página cierra distinto.
- **Asistentes ("el producto, humano"):** se eliminan features/useCases duplicados de la
  home y entra **"Un día con tu agente"** (timeline horaria realista). Firma motion:
  **spotlight-reveal** que sigue el cursor (adaptación del efecto más popular de la
  galería de referencia). Ilustración orb generada con Codex.
- **Ciberseguridad ("sala de operaciones"):** conserva globo de amenazas y terminal
  (ya son su identidad); se suma barra de status tipo ticker y acentos dot-matrix estilo
  Sentinel. Copy 2026 (SOC asistido por agentes, Zero Trust) sin inventar métricas.
- **Contacto (editorial mínimo):** tipografía gigante, glass cards, indicador de
  disponibilidad. Página corta a propósito.
- **Blog (editorial):** covers generadas con Codex por artículo, layout con destacado
  asimétrico, y un artículo nuevo 2026 sobre agentes personales de IA.

Restricciones sin cambio: sin precios, sin backend, es/en en paridad, sin libs npm nuevas.
