# CiberPTY Website

Sitio web bilingue (ES/EN) para CiberPTY, enfocado en servicios de ciberseguridad y automatizacion con estilo futurista, tema claro/oscuro, blogs tecnicos y diseno responsive.

## Stack

- Astro + TypeScript
- React/JSX ejecutado en navegador para la experiencia principal
- CSS custom (sin framework visual)
- Sitio estatico optimizado para seguridad y rendimiento

## Sitio principal

La experiencia visual actual esta en:

- `public/ciberpty.html`: pagina principal del sitio.
- `public/blog/*.html`: articulos tecnicos enlazados desde la seccion Insights.
- `public/icons/*.svg`: logos de herramientas del stack.
- `public/vendor/*.js`: React, ReactDOM y Babel servidos localmente para evitar depender de CDN externos.

Las rutas Astro `/`, `/es/` y `/en/` redirigen a `/ciberpty.html` para que el nuevo sitio sea la entrada publica principal.

## Ejecutar local

```bash
npm install
npm run dev
```

Abrir en el navegador:

```text
http://localhost:4321/ciberpty.html
```

Build de produccion:

```bash
npm run build
npm run start
```

## Estructura principal

- `src/pages/index.astro`: redireccion a `/ciberpty.html`
- `src/pages/es/index.astro`: redireccion a `/ciberpty.html`
- `src/pages/en/index.astro`: redireccion a `/ciberpty.html`
- `public/ciberpty.html`: sitio principal
- `public/blog/*`: articulos tecnicos
- `public/icons/*`: logos y assets visuales
- `public/vendor/*`: dependencias frontend locales
- `src/content/*`, `src/components/*`, `src/styles/*`: base Astro anterior conservada como referencia/migracion futura

## Personalizacion rapida

1. Edita narrativa, stack, posts y textos principales en `public/content.jsx`.
2. Edita estructura visual y componentes en `public/components.jsx`.
3. Edita animaciones y efectos en `public/effects.jsx`.
4. Edita articulos en `public/blog/*.html`.

## Guia de despliegue (Dokku + Cloudflare)

### 1) DNS en Cloudflare

- `A` -> Nombre: `www`, Valor: `IP_PUBLICA_VM`
- `A` -> Nombre: `@`, Valor: `IP_PUBLICA_VM`

Canonicidad recomendada en `ciberpty.com`:

- `https://www.ciberpty.com/*` -> `https://ciberpty.com/$1` (301)

### 2) Dokku basico

En tu servidor:

```bash
dokku apps:create ciberpty-portfolio
dokku domains:add ciberpty-portfolio ciberpty.com
dokku domains:add ciberpty-portfolio www.ciberpty.com
```

Si vas por buildpack Node (sin Dockerfile), haz push normal de git.
Si prefieres Dockerfile, Dokku lo detecta automaticamente.

### 3) SSL

```bash
dokku letsencrypt:enable ciberpty-portfolio
```

En Cloudflare configura SSL/TLS en **Full (strict)**.

### 4) Headers de seguridad recomendados

En proxy/Nginx de Dokku aplica:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` ajustada a tu frontend final

## Nota de privacidad

El contacto por email se obfusca y se revela por accion del usuario para reducir scraping automatizado.
