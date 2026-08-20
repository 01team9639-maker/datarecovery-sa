#!/usr/bin/env python3
"""مشتقّات صور الخدمات.

المصدر : design/service-images/<slug>.<jpg|png|webp>  أو باسم عنوان الخدمة العربي
الناتج : assets/img/services/<slug>-{480,800,1200}.{webp,avif}

لماذا ثلاثة عروض لا ملف واحد: صورة الـhero أكبر عنصر فوق الطيّة في صفحة
الخدمة، فهي مرشّح LCP. جوّال يعرضها بنحو 360 بكسل منطقي لا شأن له بتحميل
ملف سطح المكتب — وهذا القرار وحده يوفّر أكثر من كل تحسينات الصور مجتمعة.

ولماذا AVIF وWebP بلا JPEG: كل متصفّح يصل هذا الموقع يدعم WebP. سلسلة JPEG
ثالثة تعني ترميزًا إضافيًّا وملفًا أكبر لأجل لا أحد.

والقصّ مربّعًا هنا لا في CSS: الخانة مربّعة في كل المقاسات، والقصّ في الخط
يعني أن بايتات الحواف المحذوفة لا تُرسَل أصلًا.

Pillow لا sips: sips في هذا الإصدار لا يُخرج WebP إطلاقًا، وPillow متاح
ويُخرج الصيغتين بلا تثبيت أي أداة نظام.

التشغيل: python3 build/make-service-images.py
"""
import json
import unicodedata
import subprocess
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "design" / "service-images"
OUT_DIR = ROOT / "assets" / "img" / "services"
WIDTHS = (480, 800, 1200)
SUFFIXES = (".jpg", ".jpeg", ".png", ".webp")


def services() -> list[dict]:
    """السلك والعنوان العربي من build/services.js — مصدر واحد لا نسخة ثانية."""
    dumped = subprocess.run(
        ["node", "-e",
         "console.log(JSON.stringify(require('./build/services')"
         ".map(s => ({slug: s.slug, title: s.ar.title}))))"],
        cwd=ROOT, capture_output=True, text=True, check=True,
    )
    return json.loads(dumped.stdout)


def norm(value: str) -> str:
    return unicodedata.normalize("NFC", value).strip()


def find_source(slug: str, title: str) -> Path | None:
    """يقبل التسمية بالسلك أو بعنوان الخدمة — وهو ما يخرج به التصدير من أداة التصميم."""
    for suffix in SUFFIXES:
        candidate = SOURCE_DIR / f"{slug}{suffix}"
        if candidate.is_file():
            return candidate
    for candidate in sorted(SOURCE_DIR.iterdir()):
        if candidate.name.startswith(".") or candidate.suffix.lower() not in SUFFIXES:
            continue
        # التطبيع ليس تجميلًا: نظام ملفات macOS يخزّن اسم الملف العربي بصيغة
        # NFD (ا + همزة منفصلة)، بينما المصدر في JavaScript بصيغة NFC (أ حرف
        # واحد). العينان تريان النصّ نفسه والمقارنة الحرفية تفشل صامتة —
        # فشلت على أربعة من ثمانية ملفات تبدو متطابقة تمامًا.
        if norm(candidate.stem) == norm(title):
            return candidate
    return None


def square(image: Image.Image) -> Image.Image:
    side = min(image.size)
    left = (image.width - side) // 2
    top = (image.height - side) // 2
    return image.crop((left, top, left + side, top + side))


def main() -> int:
    if not SOURCE_DIR.is_dir():
        print(f"❌ مجلد المصادر غير موجود: {SOURCE_DIR.relative_to(ROOT)}")
        return 1
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    made, missing = 0, []
    for service in services():
        slug, title = service["slug"], service["title"]
        source = find_source(slug, title)
        if source is None:
            missing.append(slug)
            continue

        with Image.open(source) as opened:
            base = square(opened.convert("RGB"))

        sizes = []
        for width in WIDTHS:
            resized = base.resize((width, width), Image.LANCZOS)
            webp = OUT_DIR / f"{slug}-{width}.webp"
            avif = OUT_DIR / f"{slug}-{width}.avif"
            resized.save(webp, "WEBP", quality=80, method=6)
            resized.save(avif, "AVIF", quality=58, speed=4)
            made += 2
            sizes.append(f"{width}px {webp.stat().st_size // 1024}/{avif.stat().st_size // 1024}KB")
        print(f"  ✓ {slug:<14} {' · '.join(sizes)}")

    if missing:
        print(f"\n  ⏳ بانتظار مصادر: {', '.join(missing)}")
        print(f"     سمِّ الملف بالسلك أو بعنوان الخدمة، وضعه في {SOURCE_DIR.relative_to(ROOT)}/")
    print(f"\n✅ {made} ملفًا في {OUT_DIR.relative_to(ROOT)}/  (WebP/AVIF)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
