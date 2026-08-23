#!/usr/bin/env python3
"""أدوات مشتركة لاشتقاق صور الموقع.

كانت هذه المنطق داخل make-service-images.py وحده. صور الصفحة الرئيسية تحتاجه
حرفيًّا، ونسخه مرّة ثانية يعني أن أي تعديل على الجودة أو القصّ يُطبَّق على نصف
الصور فقط — فنُقل هنا ويستورده الخطّان.
"""
import unicodedata
from pathlib import Path

from PIL import Image

WIDTHS = (480, 800, 1200)
SUFFIXES = (".jpg", ".jpeg", ".png", ".webp")


def norm(value: str) -> str:
    """التطبيع ليس تجميلًا: نظام ملفات macOS يخزّن الاسم العربي بصيغة NFD
    (ا + همزة منفصلة) بينما المصدر في JavaScript بصيغة NFC (أ حرف واحد).
    العينان تريان النصّ نفسه والمقارنة الحرفية تفشل صامتة — فشلت على أربعة
    من ثمانية ملفات تبدو متطابقة تمامًا."""
    return unicodedata.normalize("NFC", value).strip()


def find_source(directory: Path, *names: str) -> Path | None:
    """يقبل التسمية بالسلك أو بالعنوان العربي — وهو ما يخرج به التصدير من أداة
    التصميم."""
    wanted = [norm(n) for n in names if n]
    for name in names:
        for suffix in SUFFIXES:
            candidate = directory / f"{name}{suffix}"
            if candidate.is_file():
                return candidate
    for candidate in sorted(directory.iterdir()):
        if candidate.name.startswith(".") or candidate.suffix.lower() not in SUFFIXES:
            continue
        if norm(candidate.stem) in wanted:
            return candidate
    return None


def square(image: Image.Image) -> Image.Image:
    """القصّ مربّعًا في الخطّ لا في CSS: الخانة مربّعة في كل المقاسات، والقصّ
    هنا يعني أن بايتات الحواف المحذوفة لا تُرسَل أصلًا."""
    side = min(image.size)
    left = (image.width - side) // 2
    top = (image.height - side) // 2
    return image.crop((left, top, left + side, top + side))


def derive(source: Path, out_dir: Path, slug: str, widths=WIDTHS) -> str:
    """ثلاثة عروض لا ملف واحد: جوّال يعرض الصورة بنحو 360 بكسل منطقي لا شأن له
    بتحميل ملف سطح المكتب — وهذا القرار وحده يوفّر أكثر من كل تحسينات الصور
    مجتمعة. وAVIF وWebP بلا JPEG: كل متصفّح يصل هذا الموقع يدعم WebP، وسلسلة
    ثالثة تعني ترميزًا إضافيًّا وملفًا أكبر لأجل لا أحد."""
    out_dir.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as opened:
        base = square(opened.convert("RGB"))

    report = []
    for width in widths:
        resized = base.resize((width, width), Image.LANCZOS)
        webp = out_dir / f"{slug}-{width}.webp"
        avif = out_dir / f"{slug}-{width}.avif"
        resized.save(webp, "WEBP", quality=80, method=6)
        resized.save(avif, "AVIF", quality=58, speed=4)
        report.append(f"{width}px {webp.stat().st_size // 1024}/{avif.stat().st_size // 1024}KB")
    return " · ".join(report)
