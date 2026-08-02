"""Captura 360 frames (12 s @ 30 fps = 1 período exacto) del generador WebGL."""
import pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).parent
FRAMES = ROOT / "frames"
FRAMES.mkdir(exist_ok=True)
FPS, DUR = 30, 12

with sync_playwright() as p:
    browser = p.chromium.launch(args=["--use-gl=angle"])
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
