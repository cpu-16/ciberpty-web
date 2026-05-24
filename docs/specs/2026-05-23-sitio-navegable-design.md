# CiberPTY — Sitio navegable (rebuild Astro multipágina) — Diseño

Fecha: 2026-05-23 · Estado: aprobado (diseño) por Gilberto.

## Contexto y objetivo
El sitio actual (`ciberpty.com`) es una SPA de React (`public/ciberpty.html`) servida como **landing de una sola página**; `src/pages/index.astro` y `es/index.astro` redirigen a ella. Existe además un esqueleto Astro multipágina sin usar. Objetivo: convertirlo en un **sitio Astro multipágina navegable**, reusando contenido y estética, y añadir el producto nuevo **Asistentes de IA (Ciberpty)** al frente.

## Decisiones (aprobadas)
- **Alcance:** rebuild cohesivo en Astro (retirar la SPA babel-en-navegador).
- **Identidad/Home:** Asistentes de IA al frente; ciberseguridad/automatización como segunda línea. Marca paraguas: **CiberPTY**.
- **Idiomas:** bilingüe es/en (patrón `/es/…`, `/en/…`; `/` redirige a `/es/`).
- **Precio:** no se muestra en el sitio; CTA de contacto (consistente con el anuncio). Se menciona "planes a tu medida" sin número.
- **Contacto:** datos + botones WhatsApp/email; sin formulario con backend en v1 (futuro: webhook a n8n).

## Arquitectura
- Astro 5 estático → build a `dist/` → nginx (Docker `ciberpty-web`, `docker compose up -d --build`).
- `BaseLayout.astro` compartido (head/SEO, fondos animados, reveal-on-scroll, theme) + `Header.astro` con navegación real + `Footer`.
- Reuso de estilos existentes (`global.css`, `theme.css`, `cyber.css`).

## Sitemap y navegación
Nav: **Inicio · Asistentes IA · Ciberseguridad · Blog · Contacto** (+ toggle idioma + toggle tema).

| Ruta (es) | Ruta (en) | Página |
|---|---|---|
| `/es/` | `/en/` | Inicio |
| `/es/asistentes/` | `/en/assistants/` | Asistentes de IA |
| `/es/ciberseguridad/` | `/en/cybersecurity/` | Ciberseguridad & Automatización |
| `/es/blog/` | `/en/blog/` | Blog (índice) |
| `/es/contacto/` | `/en/contact/` | Contacto |
| `/` | — | redirect → `/es/` |

Los artículos del blog siguen en `public/blog/*.html` (se enlazan desde el índice).

## Contenido por página
- **Inicio:** hero del agente personal de IA ("Una IA que te sigue el ritmo") + 4 beneficios + cómo funciona (resumen) + banda secundaria de Ciberseguridad/Automatización + CTA contacto. Enlaces a las páginas de producto.
- **Asistentes de IA (estrella):** qué es, 4 beneficios (organiza / responde / aprende-memoria / voz-texto 24/7), **cómo funciona** (3-4 pasos), casos de uso, FAQ breve, CTA WhatsApp. Lenguaje visual ligado al anuncio (aurora, glass, burbujas de chat). Sin precio.
- **Ciberseguridad & Automatización:** porta el contenido de la SPA (`content.jsx`): 6 servicios (Blue/Red Team, Forense, Ciber Legal, Automatización IA, Infra), método (4 fases), stack (8), valor. CTA "Solicitar diagnóstico".
- **Blog:** índice de los 3 artículos (categoría, fecha, excerpt, link).
- **Contacto:** Gilberto Ramos · gilberto@ciberpty.com · wa.me/50768573845 (+507 6857-3845) · github.com/cpu-16 · Panamá·Veraguas. Botones WhatsApp/email.

## Sistema de diseño / componentes
- Reusar/extender componentes Astro existentes (`Hero`, `About`, `Services/Projects`, `Skills`, `Timeline`, `Certificates`, `Contact`, toggles).
- Nuevos componentes: `AssistantsHero`, `AssistantsFeatures`, `HowItWorks`, `FAQ`, `BlogIndex`, `SiteFooter`.
- Mantener tema oscuro/claro y animaciones suaves.

## Despliegue (seguro y reversible)
1. Trabajo en copia local `ciberpty-web-release/` en rama `feat/sitio-navegable`; commits por etapa.
2. Preview local (`astro build` + render) mostrado a Gilberto antes de publicar.
3. Al aprobar: `rsync` de vuelta al servidor `ciberseguridad:/home/gar16/ciberpty-web-release/` + `docker compose up -d --build`; verificar `http://127.0.0.1:8088/`.
4. Revertible vía git (rama) y snapshot del dir en el servidor antes de desplegar.

## Fuera de alcance (v1)
- Gimmicks pesados de la SPA (terminal interactiva, mapa de amenazas/telemetría animada): se simplifican; re-añadibles después.
- Formulario de contacto con backend (futuro: n8n).
- Pasarela de pago / autoservicio de suscripción.

## Criterios de aceptación
- 5 páginas navegables por nav, en es y en, con header/footer coherentes.
- Home lidera con Asistentes de IA; página de Asistentes completa y alineada al anuncio.
- Contenido de ciberseguridad preservado.
- Build Docker arriba y `ciberpty.com` ya no es una sola landing.
