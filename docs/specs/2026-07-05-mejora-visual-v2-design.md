# Mejora visual v2 — «más oficio, misma alma»

**Fecha:** 2026-07-05 · **Branch:** `feat/mejora-visual-v2` · **Aprobado por:** Gilberto (carta blanca, con dos condiciones explícitas)

## Decisiones del usuario

1. **Alcance:** todo el sitio, por fases.
2. **Identidad:** profundizar la actual (SOC terminal, verde neón, mono) — no pivotar.
3. **Temas:** ambos temas de primer nivel; el claro se rediseña en serio.
4. **Cuadrículas fuera:** eliminar los fondos de grilla (`.grid-bg`, `.bg-grid`) en ambos temas — en claro se notan y ensucian.
5. Resto delegado: «lo más top, actual, llamativo y novedoso-profesional».

## Dirección de arte

SOC terminal editorial. Verde `#00ff9c` sobre negro profundo con matrix rain y scanlines en oscuro; en claro, «papel de sala de control»: fondo neutro cálido, cards con contraste real, acento verde profundo accesible. Tipografía: Space Grotesk (display) + Instrument Serif itálico (firma) + JetBrains Mono (datos). Sin libs nuevas, sin backend, CSS + scripts inline. `prefers-reduced-motion` respetado siempre.

## Fase 1 — Base global

- Quitar `.grid-bg` del layout y CSS; el fondo pasa a aurora de gradientes radiales animados (ya existe `bg-gradient`, se refina) + matrix + scanlines solo en oscuro.
- Paleta clara nueva: fondo `#f7f7f4` aprox, cards blancas con borde definido y sombra suave, texto casi negro, acento `#007a55` AA, íconos con tinte sólido (no pastel).
- Micro-animaciones: reveals con stagger por índice, hover unificado (lift + borde acento), spotlight que sigue el mouse en cards (JS mínimo, solo pointer fine), shimmer sutil en los spans serif de títulos, border-beam animado en la terminal del hero y el CTA final.

## Fase 2 — Home

- Sección nueva **demo del agente**: conversación simulada (burbujas chat que aparecen on-scroll con indicador de escritura). Caso: recordatorio + resumen del día. Vende el producto sin explicarlo.
- «Lo que hace por ti» → bento grid con numeración `AGT.0x` y tags mono (jerarquía tipo página Ciber).
- «Dos formas de trabajar contigo» → split asimétrico con íconos.
- «Cómo funciona» en 3 pasos (versión corta) antes del CTA.
- Señales de confianza reales (Panamá, datos privados, 24/7, stack) — sin testimonios inventados, sin precio.
- Hero móvil más compacto.

## Fase 3 — Asistentes / Contacto / Blog

- Asistentes: «Ideas para usarlo» como cards con ícono y ejemplo; FAQ con apertura animada.
- Contacto: filas → cards accionables con ícono y hover.
- Blog: cards del índice consistentes con el sistema.

## Verificación y despliegue

- Por fase: `npm run build` + screenshots Playwright (oscuro, claro, móvil) → `previews/` para aprobación.
- Deploy solo tras OK, con el flujo rsync quirúrgico de `AVANCE.md` §3. Sin `git push` a origin sin confirmación.

## Restricciones vigentes

Sin precio en el sitio · CTAs a WhatsApp/email · sin n8n en materiales de venta de Asistentes · ubicación «Panamá» · no reintroducir texto plano CIBERPTY en el header.
