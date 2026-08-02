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
    browser = p.chromium.launch(args=["--use-gl=angle"])
    for name, url, w, h in SHOTS:
        page = browser.new_page(viewport={"width": w, "height": h})
        page.goto(url)
        page.wait_for_timeout(2500)  # deja terminar los fade-up
        page.screenshot(path=str(OUT / f"{name}-hero.png"))
        # scroll por toda la página para disparar los reveal-on-scroll
        page.evaluate(
            """async () => {
              for (let y = 0; y <= document.body.scrollHeight; y += 400) {
                window.scrollTo(0, y);
                await new Promise((r) => setTimeout(r, 120));
              }
              window.scrollTo(0, 0);
            }"""
        )
        page.wait_for_timeout(800)
        page.screenshot(path=str(OUT / f"{name}-full.png"), full_page=True)
        page.close()
    browser.close()
print(f"screenshots en {OUT}")
