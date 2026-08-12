#!/usr/bin/env python3
"""Render crisp PJBUMI tech logo + favicon set from brand red (#ED2528)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import struct

from typing import Optional

ROOT = Path(__file__).resolve().parents[1]
RED = (237, 37, 40, 255)
WHITE = (255, 255, 255, 255)

FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial Black.ttf",
    "/Library/Fonts/Arial Black.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Supplemental/Impact.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]


def find_font() -> Optional[str]:
    return next((p for p in FONT_CANDIDATES if Path(p).exists()), None)


def load_font(path: Optional[str], size: int):
    if path:
        try:
            return ImageFont.truetype(path, size=size)
        except Exception:
            try:
                return ImageFont.truetype(path, size=size, index=0)
            except Exception:
                pass
    return ImageFont.load_default()


def render(size: int, font_path: Optional[str]):
    img = Image.new("RGBA", (size, size), RED)
    draw = ImageDraw.Draw(img)

    # Small favicons: short mark stays legible
    if size <= 48:
        mark = "PJ"
        font = load_font(font_path, max(10, int(size * 0.42)))
        draw.text((size / 2, size / 2), mark, font=font, fill=WHITE, anchor="mm")
        return img

    top_font = load_font(font_path, max(12, int(size * 0.16)))
    sub_font = load_font(font_path, max(10, int(size * 0.09)))
    draw.text(
        (size / 2, size * 0.42),
        "PJBUMI",
        font=top_font,
        fill=WHITE,
        anchor="mm",
    )
    draw.text(
        (size / 2, size * 0.62),
        "tech",
        font=sub_font,
        fill=WHITE,
        anchor="mm",
    )
    return img


def write_png_ico(png_paths: list[Path], ico_path: Path) -> None:
    images = [p.read_bytes() for p in png_paths]
    count = len(images)
    header = struct.pack("<HHH", 0, 1, count)
    offset = 6 + 16 * count
    entries = []
    blob = b""
    for raw in images:
        w = int.from_bytes(raw[16:20], "big")
        h = int.from_bytes(raw[20:24], "big")
        width = 0 if w >= 256 else w
        height = 0 if h >= 256 else h
        entries.append(
            struct.pack("<BBBBHHII", width, height, 0, 0, 1, 32, len(raw), offset)
        )
        blob += raw
        offset += len(raw)
    ico_path.write_bytes(header + b"".join(entries) + blob)


def main() -> None:
    font_path = find_font()
    print(f"font={font_path}", flush=True)

    master = ROOT / "public/images/pjbumi-tech-logo.png"
    render(1024, font_path).save(master, "PNG")
    print(f"wrote {master}", flush=True)

    targets = {
        ROOT / "src/app/icon.png": 512,
        ROOT / "src/app/apple-icon.png": 180,
        ROOT / "public/apple-touch-icon.png": 180,
        ROOT / "public/icon-192.png": 192,
        ROOT / "public/icon-512.png": 512,
        ROOT / "public/favicon-32x32.png": 32,
        ROOT / "public/favicon-16x16.png": 16,
    }
    for path, size in targets.items():
        render(size, font_path).save(path, "PNG")
        print(f"wrote {path}", flush=True)

    ico_pngs = [
        ROOT / "public/favicon-16x16.png",
        ROOT / "public/favicon-32x32.png",
    ]
    for ico in (ROOT / "src/app/favicon.ico", ROOT / "public/favicon.ico"):
        write_png_ico(ico_pngs, ico)
        print(f"wrote {ico}", flush=True)

    print("done", flush=True)


if __name__ == "__main__":
    main()
