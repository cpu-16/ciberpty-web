# Uso: python3 scripts/responsivo.py <base-url> <carpeta-capturas>   (p. ej. http://127.0.0.1:8767 o https://ciberpty.com)
# Requiere Python Playwright. Sale con la lista de casos que fallan; "casos con falla: 0" = todo bien.
# Recorre todas las páginas en varios anchos y con letra base 16/20 px; reporta scroll horizontal,
# elementos que se salen, errores de consola y recursos rotos.
import sys
from playwright.sync_api import sync_playwright
base, out = sys.argv[1], sys.argv[2]
paginas = ['/es/', '/en/', '/es/asistentes/', '/en/assistants/', '/es/ciberseguridad/', '/en/cybersecurity/',
           '/es/blog/', '/en/blog/', '/es/contacto/', '/en/contact/']
anchos = [320, 360, 390, 414, 768, 1024, 1280, 1440, 1920]
FUERA = """(() => { const vw = document.documentElement.clientWidth, r = [];
  for (const el of document.querySelectorAll('body *')) {
    const b = el.getBoundingClientRect(); if (!b.width || b.right <= vw + 1) continue;
    const cs = getComputedStyle(el); if (cs.position === 'fixed') continue;
    let p = el.parentElement, cortado = false;
    while (p && p !== document.body) { const o = getComputedStyle(p); if (/(hidden|clip|auto|scroll)/.test(o.overflowX)) { cortado = true; break; } p = p.parentElement; }
    if (!cortado) r.push(el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0] + ' →' + Math.round(b.right)); }
  return { sw: document.documentElement.scrollWidth, vw, r: r.slice(0, 4) }; })()"""
fallas = 0
with sync_playwright() as p:
    b = p.chromium.launch()
    for fuente in (16, 20):
        for w in anchos:
            pg = b.new_page(viewport={'width': w, 'height': 900})
            if fuente != 16:
                cdp = pg.context.new_cdp_session(pg); cdp.send('Page.enable')
                cdp.send('Page.setFontSizes', {'fontSizes': {'standard': fuente, 'fixed': fuente}})
            errs, rotos = [], []
            pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
            pg.on('response', lambda r: rotos.append(r.url) if r.status >= 400 else None)
            for ruta in paginas:
                errs.clear(); rotos.clear()
                pg.goto(base + ruta, wait_until='networkidle'); pg.wait_for_timeout(300)
                res = pg.evaluate(FUERA)
                malo = res['sw'] > res['vw'] or res['r'] or errs or rotos
                if malo:
                    fallas += 1
                    print(f'✗ {fuente}px {w:>4} {ruta:<22} scroll={res["sw"]}/{res["vw"]} fuera={res["r"]} err={errs[:2]} 4xx={rotos[:2]}')
                if fuente == 16 and w == 390:
                    pg.screenshot(path=f'{out}/{ruta.strip("/").replace("/", "-") or "raiz"}-390.png', full_page=True)
            pg.close()
    b.close()
print('casos con falla:', fallas, 'de', 2 * len(anchos) * len(paginas))
