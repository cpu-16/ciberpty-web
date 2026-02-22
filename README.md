# CiberPTY Website

Sitio web bilingue (ES/EN) para CiberPTY, enfocado en servicios de ciberseguridad y automatizacion con estilo futurista, tema claro/oscuro y diseno responsive.

## Stack

- Astro + TypeScript
- CSS custom (sin framework visual)
- Sitio estatico optimizado para seguridad y rendimiento

## Ejecutar local

```bash
npm install
npm run dev
```

Build de produccion:

```bash
npm run build
npm run start
```

## Estructura principal

- `src/pages/es/index.astro`: pagina en espanol
- `src/pages/en/index.astro`: pagina en ingles
- `src/content/*`: contenido de empresa y servicios
- `src/components/*`: componentes de secciones
- `src/styles/*`: tema visual y estilos globales

## Personalizacion rapida

1. Edita narrativa de empresa, stack y secciones de negocio en:
   - `src/content/profile.es.ts`
   - `src/content/profile.en.ts`
2. Edita servicios en:
   - `src/content/projects.es.ts`
   - `src/content/projects.en.ts`

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
