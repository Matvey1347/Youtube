"""Tight-crop Fal RMBG cutouts without API calls. Requires Pillow."""

import json
from pathlib import Path

from PIL import Image

PROJECT = Path(__file__).resolve().parent.parent
ASSETS = PROJECT / "public" / "assets" / "pilot"
MANIFEST = ASSETS / "manifest.json"
NAMES = ("boy-back.png", "counter.png", "sixpack.png", "bottle.png", "seller-hand.png", "boy-hand.png")
ALPHA_THRESHOLD = 12
PADDING = 18


def main():
    manifest = json.loads(MANIFEST.read_text())
    entries = {item["file"]: item for item in manifest["assets"]}
    for name in NAMES:
        path = ASSETS / name
        if not path.exists():
            print(f"Missing {name}; skipping")
            continue
        image = Image.open(path).convert("RGBA")
        entry = entries[name]
        if entry.get("cropFromOriginal") and entry.get("dimensions") == list(image.size):
            print(f"Already cropped {name}; skipping")
            continue
        bbox = image.getchannel("A").point(lambda value: 255 if value >= ALPHA_THRESHOLD else 0).getbbox()
        if bbox is None:
            raise ValueError(f"No visible alpha pixels in {name}")
        x0, y0, x1, y1 = bbox
        crop_box = (max(0, x0 - PADDING), max(0, y0 - PADDING), min(image.width, x1 + PADDING), min(image.height, y1 + PADDING))
        cropped = image.crop(crop_box)
        cropped.save(path)
        entry.update(cropFromOriginal=list(crop_box), dimensions=list(cropped.size), hasAlpha=True)
        print(f"Cropped {name}: {image.size} -> {cropped.size}")
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
