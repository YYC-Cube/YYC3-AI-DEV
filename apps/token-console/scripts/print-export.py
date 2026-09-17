"""
============================================================
YYC³ AI Family — 人从众曌众从人
@Module : scripts/print-export — 印刷级 PNG 导出
============================================================
依赖: pip install cairosvg Pillow
"""
import os
import cairosvg
from PIL import Image

PRINT_SIZE = {
    "family":  (1600, 320),
    "tianshu": (1520, 320),
    "shouhu":  (1520, 320),
    "zongshi": (1520, 320),
    "lingyun": (1520, 320),
    "qianxing":(1520, 320),
    "wanyu":   (1520, 320),
    "xianzhi": (1520, 320),
    "bole":    (1520, 320),
}

OUTPUT_DIR = "public/badges/print"
os.makedirs(OUTPUT_DIR, exist_ok=True)

for name, (w, h) in PRINT_SIZE.items():
    svg_path = f"assets/badges/print/{name}-print.svg"
    if not os.path.exists(svg_path):
        print(f"🌹 跳过 {name}（缺 SVG）")
        continue

    # SVG → PNG（300 DPI 对应尺寸）
    png_path = f"{OUTPUT_DIR}/{name}-300dpi.png"
    cairosvg.svg2png(
        url=svg_path,
        write_to=png_path,
        output_width=w,
        output_height=h,
        background_color="transparent",
    )

    # 转 CMYK（印刷用）
    img = Image.open(png_path).convert("RGBA")
    bg = Image.new("RGB", img.size, (255, 255, 255))
    bg.paste(img, mask=img.split()[3])
    cmyk = bg.convert("CMYK")
    cmyk_path = f"{OUTPUT_DIR}/{name}-cmyk.tiff"
    cmyk.save(cmyk_path, format="TIFF", dpi=(300, 300))

    print(f"🌹 {name}: PNG {w}×{h} + CMYK TIFF 已生成")
