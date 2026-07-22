/* ==========================================================================
   Site config + UI strings + homepage content (Arabic + English).
   ========================================================================== */

// Canonical/base URL — update to the real domain before going live.
const BASE_URL = "https://datarecovery-sa.com";
// Image CDN base — images are referenced through this so they can be moved to
// a CDN without touching markup. Empty string => serve locally from /assets/img.
const CDN = ""; // e.g. "https://cdn.mnalsfr.example"

const config = {
  baseUrl: BASE_URL,
  cdn: CDN,
  // Contact details — real values pulled from the brand's marketing repo (zero2one-web).
  whatsapp: "966531010903",          // wa.me/<this>
  phoneDisplay: "+966 53 101 0903",
  phoneHref: "+966531010903",
  email: "info@datarecovery-sa.com",
  // Location pill target + display. NOTE: site content is Riyadh-branded while the
  // brand's registered address is Riyadh — mapsUrl points to a brand search; adjust if needed.
  mapsUrl: "https://maps.app.goo.gl/3Pa3LR1e7HWd6fko9",
  timezone: "Asia/Riyadh", // GMT+3 — used for the footer local-time clock
  geo: { lat: "24.68148", lng: "46.6908087" }, // Riyadh (Osool Data Recovery)
  // Social profiles (from the brand's repo)
  socials: [
    { name: "Instagram", url: "https://www.instagram.com/osooldatarecovery", icon: "instagram" },
    { name: "X", url: "https://x.com/osoolrecovery", icon: "x" },
    { name: "TikTok", url: "https://www.tiktok.com/@osooldatarecovery", icon: "tiktok" },
    { name: "Facebook", url: "https://www.facebook.com/share/1Gy9Ku7Gx8/", icon: "facebook" },
    { name: "YouTube", url: "https://www.youtube.com/channel/UC36WAnDT1fOpNHQ69UeA-Ew", icon: "youtube" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/osool-data-recovery-b4b3b4379", icon: "linkedin" }
  ],
  serviceOrder: ["ransomware", "hdd", "ssd-nvme", "raid-servers", "cctv", "after-format"]
};

const ui = {
  ar: {
    dir: "rtl", lang: "ar", langName: "العربية", other: "English", otherLang: "en",
    brand: "من الصفر إلى الواحد",
    skip: "تخطَّ إلى المحتوى",
    nav: { services: "الخدمات", process: "آلية العمل", about: "من نحن", faq: "الأسئلة الشائعة", home: "الرئيسية", contact: "تواصل معنا" },
    evalBtn: "تقييم الحالة",
    startFreeBtn: "ابدأ التقييم المجاني",
    sendCaseBtn: "أرسل تفاصيل الحالة",
    whatsappBtn: "تواصل عبر واتساب",
    location: "الرياض · السعودية",
    trust: { privacy: "خصوصية وحماية", recovered: "ملف مستعاد", years: "سنة خبرة" },
    dangerLabel: "لا تفعل هذا",
    steps: ["فحص الحالة", "تحديد المسار", "استعادة آمنة"],
    stepLabels: ["الخطوة", "الخطوة", "الخطوة"],
    faqSection: "الأسئلة الشائعة",
    breadcrumbHome: "الرئيسية", breadcrumbServices: "الخدمات",
    footer: {
      contact: "تواصل", whatsapp: "واتساب", phone: "الهاتف", email: "البريد", sendCase: "أرسل حالتك",
      services: "الخدمات", location: "الموقع", quick: "روابط سريعة",
      home: "الرئيسية", process: "آلية العمل", faq: "الأسئلة الشائعة",
      hours: "ساعات العمل", hoursValue: "السبت — الخميس · 10:00 صباحًا — 10:00 مساءً",
      addressLine: "الرياض — السعودية",
      rights: "جميع الحقوق محفوظة", backTop: "العودة للأعلى",
      tagline: "استعادة بيانات احترافية للأفراد والشركات.",
      ctaEyebrow: "كل رحلة عظيمة تبدأ بخطوة",
      ctaTitle: "لنبدأ رحلتك.",
      ctaBtn: "لنبدأ من الصفر إلى الواحد",
      version: "الإصدار", edition: "إصدار 2026 ©", localTime: "التوقيت المحلي", socials: "تابعنا", privacy: "سياسة الخصوصية"
    },
    serviceNames: {
      "hdd": "الأقراص الصلبة", "ssd-nvme": "SSD وNVMe", "raid-servers": "RAID والسيرفرات",
      "cctv": "كاميرات المراقبة", "after-format": "بعد الفورمات", "ransomware": "فيروس الفدية"
    }
  },
  en: {
    dir: "ltr", lang: "en", langName: "English", other: "العربية", otherLang: "ar",
    brand: "Zero 2 One Data Recovery",
    skip: "Skip to content",
    nav: { services: "Services", process: "How it works", about: "About", faq: "FAQ", home: "Home", contact: "Contact" },
    evalBtn: "Case assessment",
    startFreeBtn: "Start free assessment",
    sendCaseBtn: "Send case details",
    whatsappBtn: "Chat on WhatsApp",
    location: "Riyadh · Saudi Arabia",
    trust: { privacy: "Privacy & security", recovered: "Files recovered", years: "Years of experience" },
    dangerLabel: "Do not do this",
    steps: ["Inspect the case", "Choose the path", "Safe recovery"],
    stepLabels: ["Step", "Step", "Step"],
    faqSection: "FAQ",
    breadcrumbHome: "Home", breadcrumbServices: "Services",
    footer: {
      contact: "Contact", whatsapp: "WhatsApp", phone: "Phone", email: "Email", sendCase: "Send your case",
      services: "Services", location: "Location", quick: "Quick links",
      home: "Home", process: "How it works", faq: "FAQ",
      hours: "Working hours", hoursValue: "Sat — Thu · 10:00 AM — 10:00 PM",
      addressLine: "Riyadh — Saudi Arabia",
      rights: "All rights reserved", backTop: "Back to top",
      tagline: "Professional data recovery for individuals and businesses.",
      ctaEyebrow: "Every great journey starts with one step",
      ctaTitle: "Let's start your journey.",
      ctaBtn: "Let's build success from Zero to One",
      version: "Version", edition: "2026 © Edition", localTime: "Local time", socials: "Socials", privacy: "Privacy policy"
    },
    serviceNames: {
      "hdd": "Hard drives", "ssd-nvme": "SSD & NVMe", "raid-servers": "RAID & servers",
      "cctv": "CCTV footage", "after-format": "After format", "ransomware": "Ransomware"
    }
  }
};

// Homepage content
const home = {
  ar: {
    metaTitle: "من الصفر إلى الواحد — استعادة بيانات متخصصة | الرياض، السعودية",
    metaDesc: "استعادة بيانات متخصصة من الأقراص الصلبة، SSD، الهواتف، RAID والخوادم. تشخيص واضح وسرية كاملة قبل أي خطوة. خبرة أكثر من 25 سنة في الرياض، السعودية.",
    hero: {
      eyebrow: "استعادة بيانات متخصصة منذ أكثر من 25 سنة",
      title: "نستعيد ما ظننته مفقودًا.",
      lead: "استعادة متخصصة للبيانات من الأقراص، الهواتف، RAID والخوادم—بتشخيص واضح وسرية كاملة قبل أي خطوة."
    },
    trustIntro: "خبرة يمكن قياسها وتشخيص يبدأ بالوضوح.",
    metrics: [
      { v: "+25", l: "سنة خبرة" }, { v: "+50K", l: "حالة تم التعامل معها" }, { v: "99%", l: "نسبة نجاح بعد التشخيص" }
    ],
    ticker: "إذا كانت البيانات مهمة، أوقف استخدام الجهاز الآن. كل كتابة جديدة قد تقلّل فرصة الاستعادة.",
    problem: {
      eyebrow: "ابدأ من المشكلة",
      title: "ابدأ من المشكلة، لا من اسم الجهاز.",
      noteStrong: "المشكلة تصف ما حدث. الجهاز يحدد الأدوات فقط.",
      note: "اختر الوصف الأقرب، وسنبدأ معك من المعلومة الصحيحة بدل التخمين.",
      foot: "ما لازم تعرف اسم العطل التقني. يكفي أن تصف ما حدث.",
      cases: [
        { t: "الجهاز لا يظهر", b: "قد يكون العطل منطقيًا أو كهربائيًا أو ميكانيكيًا. لا تكرر التشغيل قبل التشخيص." },
        { t: "الملفات اختفت أو حُذفت", b: "توقف عن استخدام الجهاز حتى لا تُكتب بيانات جديدة فوق الملفات القديمة." },
        { t: "تعرض الجهاز للماء أو الصدمة", b: "افصل الطاقة ولا تحاول التجفيف أو التشغيل. الضرر المادي يحتاج فحصًا متخصصًا." },
        { t: "الخادم أو RAID توقف", b: "حافظ على ترتيب الأقراص ولا تعد البناء قبل تقييم بنية المصفوفة." },
        { t: "التسجيلات انحذفت", b: "يمكن فحص أقراص DVR وNVR واستعادة التسجيلات حسب حالة الكتابة فوقها." },
        { t: "تعرضت لهجوم فدية", b: "اعزل الجهاز عن الشبكة واحتفظ بعينة من رسالة الفدية قبل أي تغيير." }
      ]
    },
    services: {
      eyebrow: "خدمات من الصفر إلى الواحد",
      title: "كل وسيط له طريقته. لا توجد وصفة واحدة.",
      noteStrong: "نوع الجهاز يحدد الأدوات، ونوع الضرر يحدد ترتيب الخطوات.",
      note: "نختار المسار بعد التشخيص، لا قبلَه.",
      footTag: "التشخيص أولًا",
      footText: "نعرف ما الذي سنفعله، وما المتوقع، قبل اعتماد الاستعادة.",
      rows: [
        { t: "هجمات الفدية وقواعد البيانات", d: "عزل الحالة، تحليل الضرر، وتقييم خيارات الاستعادة الآمنة.", tags: "SQL · Ransomware", link: "ransomware" },
        { t: "الأقراص الصلبة وSSD", d: "استعادة من الأعطال الميكانيكية، الإلكترونية والمنطقية.", tags: "HDD · SSD · NVMe", link: "hdd" },
        { t: "RAID والسيرفرات", d: "تحليل المصفوفة وبنيتها قبل أي إعادة بناء أو كتابة.", tags: "RAID · NAS · SAN", link: "raid-servers" },
        { t: "الهواتف والأجهزة الذكية", d: "استعادة حسب نوع الذاكرة، النظام وطبيعة الضرر.", tags: "iOS · Android", link: "ssd-nvme" },
        { t: "بطاقات الذاكرة والفلاش", d: "حالات الحذف والفورمات والتلف المنطقي أو الكهربائي.", tags: "SD · USB", link: "after-format" },
        { t: "أنظمة المراقبة", d: "استعادة تسجيلات DVR وNVR المحذوفة أو المتضررة.", tags: "DVR · NVR", link: "cctv" }
      ]
    },
    process: {
      eyebrow: "مسار واضح من البداية",
      title: "من أول اتصال إلى آخر ملف.",
      noteStrong: "تفهم الحالة والخيارات قبل أن نبدأ بالاستعادة. بدون مفاجآت.",
      steps: [
        { t: "صف لنا ما حدث", b: "نوع الجهاز، آخر ما حدث، وما الذي جُرّب حتى الآن." },
        { t: "فحص وتشخيص واضح", b: "نحدد نوع الضرر، فرصة الاستعادة والمدة المتوقعة." },
        { t: "استعادة وتسليم آمن", b: "نستعيد الملفات على وسيط منفصل ونسلّمها بسرية." }
      ],
      stopTitle: "البيانات لا تُستعاد بالتجربة.",
      stopRules: ["لا تعاود تشغيل الجهاز مرارًا", "لا تعمل فورمات أو إعادة تهيئة", "لا تثبّت برامج على الوسيط نفسه"],
      stopLabel: "قبل أي محاولة",
      stopBtn: "اسأل قبل أن تتصرف"
    },
    experience: {
      eyebrow: "عن من الصفر إلى الواحد",
      title: "عندما تكون الملفات مهمة، لا يكفي أن «نجرب».",
      lead: "خبرتنا هي آلاف القرارات الصغيرة التي تمنع ضررًا إضافيًا، وتختار المسار الأنسب لكل حالة من أول مرة.",
      tags: "سرية كاملة · تشخيص واضح · تسليم آمن",
      principle: "نبدأ بالتشخيص، لا بالتجربة.",
      rankEyebrow: "حين تُشفّر الفدية كل شيء",
      rankValue: "#1",
      rankText: "الاسم الأول في استعادة البيانات بعد هجمات الفدية."
    },
    faq: {
      eyebrow: "الأسئلة الشائعة",
      title: "قبل أن تسلّمنا جهازك.",
      noteStrong: "هذه إجابات عامة. التقييم الدقيق يحتاج معرفة نوع الجهاز وما حدث قبل فقدان البيانات.",
      asideStrong: "القرار الصحيح في البداية قد يحمي فرصة الاستعادة.",
      asideNote: "لا تجرّب برنامجًا أو فورمات إذا كانت الملفات مهمة.",
      items: [
        { q: "هل يمكن استرجاع البيانات إذا كان الجهاز لا يعمل؟", a: "غالبًا نعم. توقف الجهاز عن العمل لا يعني فقدان البيانات؛ نبدأ بتشخيص سبب العطل (كهربائي، ميكانيكي أو منطقي) ثم نحدد المسار الأنسب للاستعادة." },
        { q: "هل أجرّب برنامج استعادة قبل التواصل معكم؟", a: "يُفضّل ألّا تفعل. برامج الاستعادة قد تكتب فوق البيانات وتقلّل فرص الاستعادة. إذا كانت الملفات مهمة، أوقف استخدام الجهاز وتواصل معنا أولًا." },
        { q: "هل يمكن استعادة بيانات SSD وNVMe؟", a: "نعم، لكن أقراص SSD وNVMe لها طبيعة خاصة بسبب آلية TRIM. سرعة التوقف عن الاستخدام تلعب دورًا كبيرًا في نتيجة الاستعادة." },
        { q: "كم تستغرق عملية الاستعادة؟", a: "تختلف حسب نوع الجهاز وحجم الضرر. بعد التشخيص نعطيك مدة تقديرية واضحة قبل البدء، بدون مفاجآت." },
        { q: "هل يمكن استعادة البيانات بعد الفورمات؟", a: "في كثير من الحالات نعم، طالما لم تُكتب بيانات جديدة فوق القرص بعد الفورمات. لذلك من المهم إيقاف استخدام الوسيط مباشرة." },
        { q: "هل تتعاملون مع بيانات الشركات بسرية؟", a: "نعم. السرية جزء أساسي من عملنا؛ نتعامل مع بيانات الأفراد والشركات باتفاق واضح وتسليم آمن على وسيط منفصل." }
      ]
    },
    contact: {
      eyebrow: "ابدأ من هون",
      title: "كل دقيقة قد تُحدث فرقًا.",
      lead: "أخبرنا بنوع الجهاز وما حدث. سنعطيك أول خطوة صحيحة قبل أن تتحرك."
    }
  },
  en: {
    metaTitle: "Zero 2 One Data Recovery — Specialised Data Recovery | Riyadh, Saudi Arabia",
    metaDesc: "Specialised data recovery from hard drives, SSDs, phones, RAID and servers. Clear diagnosis and full confidentiality before any step. Over 25 years of experience in Riyadh, Saudi Arabia.",
    hero: {
      eyebrow: "Specialised data recovery for over 25 years",
      title: "We recover what you thought was lost.",
      lead: "Specialised data recovery from disks, phones, RAID and servers—with clear diagnosis and full confidentiality before any step."
    },
    trustIntro: "Experience you can measure and a diagnosis that starts with clarity.",
    metrics: [
      { v: "+25", l: "Years of experience" }, { v: "+50K", l: "Cases handled" }, { v: "99%", l: "Success rate after diagnosis" }
    ],
    ticker: "If the data matters, stop using the device now. Every new write can lower the recovery chance.",
    problem: {
      eyebrow: "Start from the problem",
      title: "Start from the problem, not the device name.",
      noteStrong: "The problem describes what happened. The device only decides the tools.",
      note: "Pick the closest description, and we'll start from the right information instead of guessing.",
      foot: "You don't need to know the technical fault name. Describing what happened is enough.",
      cases: [
        { t: "The device doesn't appear", b: "The fault may be logical, electrical or mechanical. Don't keep powering it on before diagnosis." },
        { t: "Files disappeared or were deleted", b: "Stop using the device so new data isn't written over the old files." },
        { t: "Water or shock damage", b: "Disconnect power and don't try to dry or run it. Physical damage needs a specialist inspection." },
        { t: "A server or RAID stopped", b: "Keep the disk order and don't rebuild before assessing the array structure." },
        { t: "Recordings were deleted", b: "DVR and NVR disks can be inspected and footage recovered based on overwrite state." },
        { t: "Hit by a ransomware attack", b: "Isolate the device from the network and keep a sample of the ransom note before any change." }
      ]
    },
    services: {
      eyebrow: "Zero 2 One Data Recovery services",
      title: "Every medium has its method. There's no single recipe.",
      noteStrong: "The device type decides the tools, and the damage type decides the order of steps.",
      note: "We choose the path after diagnosis, not before it.",
      footTag: "Diagnosis first",
      footText: "We know what we'll do, and what to expect, before committing to recovery.",
      rows: [
        { t: "Ransomware & databases", d: "Isolating the case, analysing damage, and assessing safe recovery options.", tags: "SQL · Ransomware", link: "ransomware" },
        { t: "Hard drives & SSD", d: "Recovery from mechanical, electronic and logical faults.", tags: "HDD · SSD · NVMe", link: "hdd" },
        { t: "RAID & servers", d: "Analysing the array and its structure before any rebuild or write.", tags: "RAID · NAS · SAN", link: "raid-servers" },
        { t: "Phones & smart devices", d: "Recovery based on memory type, system and damage nature.", tags: "iOS · Android", link: "ssd-nvme" },
        { t: "Memory cards & flash", d: "Deletion, formatting and logical or electrical damage cases.", tags: "SD · USB", link: "after-format" },
        { t: "Surveillance systems", d: "Recovering deleted or damaged DVR and NVR footage.", tags: "DVR · NVR", link: "cctv" }
      ]
    },
    process: {
      eyebrow: "A clear path from the start",
      title: "From the first call to the last file.",
      noteStrong: "You understand the case and options before we start recovery. No surprises.",
      steps: [
        { t: "Tell us what happened", b: "The device type, the last thing that happened, and what has been tried so far." },
        { t: "Clear inspection & diagnosis", b: "We identify the damage type, the recovery chance and the expected time." },
        { t: "Safe recovery & handover", b: "We recover the files onto a separate medium and hand them over confidentially." }
      ],
      stopTitle: "Data isn't recovered by trial and error.",
      stopRules: ["Don't power the device on repeatedly", "Don't format or re-initialise", "Don't install software on the medium itself"],
      stopLabel: "Before any attempt",
      stopBtn: "Ask before you act"
    },
    experience: {
      eyebrow: "About Zero 2 One Data Recovery",
      title: "When the files matter, “trying” isn't enough.",
      lead: "Our experience is thousands of small decisions that prevent extra damage and choose the best path for each case the first time.",
      tags: "Full confidentiality · Clear diagnosis · Safe handover",
      principle: "We start with diagnosis, not trial and error.",
      rankEyebrow: "When ransomware locks everything",
      rankValue: "#1",
      rankText: "The first name in post-ransomware data recovery."
    },
    faq: {
      eyebrow: "FAQ",
      title: "Before you hand us your device.",
      noteStrong: "These are general answers. A precise assessment needs to know the device type and what happened before the data loss.",
      asideStrong: "The right decision at the start can protect the recovery chance.",
      asideNote: "Don't try software or formatting if the files matter.",
      items: [
        { q: "Can data be recovered if the device doesn't work?", a: "Usually yes. A device not working doesn't mean the data is lost; we start by diagnosing the cause (electrical, mechanical or logical) then choose the best recovery path." },
        { q: "Should I try recovery software before contacting you?", a: "It's better not to. Recovery software can overwrite data and lower the chances. If the files matter, stop using the device and contact us first." },
        { q: "Can SSD and NVMe data be recovered?", a: "Yes, but SSD and NVMe disks have a special nature due to the TRIM mechanism. How quickly you stop using them strongly affects the result." },
        { q: "How long does recovery take?", a: "It varies by device type and damage size. After diagnosis we give you a clear time estimate before starting, with no surprises." },
        { q: "Can data be recovered after a format?", a: "In many cases yes, as long as no new data was written over the disk after the format. That's why it's important to stop using the medium immediately." },
        { q: "Do you handle business data confidentially?", a: "Yes. Confidentiality is a core part of our work; we handle individual and business data with a clear agreement and a safe handover on a separate medium." }
      ]
    },
    contact: {
      eyebrow: "Start here",
      title: "Every minute can make a difference.",
      lead: "Tell us the device type and what happened. We'll give you the first correct step before you move."
    }
  }
};

// Contact page content (front-end only for now — backend hooks in later)
const contact = {
  ar: {
    metaTitle: "تواصل معنا — أرسل تفاصيل حالتك | من الصفر إلى الواحد",
    metaDesc: "أرسل تفاصيل حالتك: نوع الجهاز وما حدث، ونعطيك أول خطوة صحيحة قبل أن تتحرك. استعادة بيانات متخصصة في الرياض، السعودية.",
    eyebrow: "ابدأ من هون",
    title: "أرسل تفاصيل حالتك.",
    lead: "كل ما زادت التفاصيل، صار التشخيص أدق. املأ النموذج وسنعود إليك بأول خطوة صحيحة — بدون أي التزام.",
    formTitle: "تفاصيل الحالة",
    formNote: "نتعامل مع كل حالة بسرية كاملة. نستخدم بياناتك للرد على حالتك وحماية النموذج من إساءة الاستخدام فقط.",
    submit: "أرسل الحالة",
    required: "مطلوب",
    optional: "اختياري",
    successTitle: "تم استلام طلبك",
    successBody: "وصلتنا تفاصيل حالتك وسنعود إليك بأسرع وقت خلال ساعات العمل.",
    sending: "جاري الإرسال…",
    errorTitle: "تعذّر الإرسال",
    errorBody: "صار خطأ غير متوقع. جرّب مرة ثانية، أو تواصل معنا مباشرة عبر واتساب.",
    fields: {
      name:    { label: "الاسم الكامل", ph: "مثال: أحمد المطيري" },
      phone:   { label: "رقم الجوال / واتساب", ph: "05XXXXXXXX" },
      email:   { label: "البريد الإلكتروني", ph: "name@example.com" },
      device:  { label: "نوع الجهاز", ph: "اختر نوع الجهاز",
                 opts: ["هارد ديسك (HDD)", "SSD / NVMe", "RAID أو سيرفر", "كاميرات مراقبة (DVR/NVR)", "بطاقة ذاكرة أو فلاش", "هاتف جوال", "أخرى"] },
      issue:   { label: "نوع المشكلة", ph: "اختر المشكلة",
                 opts: ["الجهاز لا يظهر", "حذف ملفات أو فورمات", "صوت غريب أو سقوط", "هجوم فدية أو تشفير", "تلف منطقي أو نظام ملفات", "أخرى"] },
      urgency: { label: "درجة الاستعجال", opts: ["عادي", "مستعجل", "طارئ"] },
      tried:   { label: "هل جرّبت برامج استرجاع أو إصلاح؟", yes: "نعم", no: "لا" },
      details: { label: "اشرح ما حدث", ph: "متى بدأت المشكلة؟ ما آخر شيء حصل قبلها؟ وهل جُرّب أي شيء بعدها؟" }
    },
    infoTitle: "أو تواصل مباشرة",
    infoNote: "الرد خلال ساعات العمل. للحالات الطارئة استخدم واتساب."
  },
  en: {
    metaTitle: "Contact us — Send your case details | Zero 2 One Data Recovery",
    metaDesc: "Send your case details: device type and what happened, and we'll give you the right first step before you act. Specialised data recovery in Riyadh, Saudi Arabia.",
    eyebrow: "Start here",
    title: "Send your case details.",
    lead: "The more detail you give, the more accurate the diagnosis. Fill in the form and we'll come back with the right first step — no obligation.",
    formTitle: "Case details",
    formNote: "Every case is handled with full confidentiality. Your details are used only to respond to your case and protect the form from abuse.",
    submit: "Send the case",
    required: "required",
    optional: "optional",
    successTitle: "Your request was received",
    successBody: "We've got your case details and will get back to you shortly during working hours.",
    sending: "Sending…",
    errorTitle: "Couldn't send",
    errorBody: "Something went wrong. Please try again, or reach us directly on WhatsApp.",
    fields: {
      name:    { label: "Full name", ph: "e.g. Ahmed Al-Mutairi" },
      phone:   { label: "Mobile / WhatsApp", ph: "05XXXXXXXX" },
      email:   { label: "Email", ph: "name@example.com" },
      device:  { label: "Device type", ph: "Select device type",
                 opts: ["Hard drive (HDD)", "SSD / NVMe", "RAID or server", "CCTV recorder (DVR/NVR)", "Memory card or flash drive", "Mobile phone", "Other"] },
      issue:   { label: "Issue type", ph: "Select the issue",
                 opts: ["Device not detected", "Deleted files or format", "Strange noise or a drop", "Ransomware or encryption", "Logical or file-system damage", "Other"] },
      urgency: { label: "Urgency", opts: ["Normal", "Urgent", "Emergency"] },
      tried:   { label: "Have you tried recovery or repair software?", yes: "Yes", no: "No" },
      details: { label: "Describe what happened", ph: "When did it start? What was the last thing that happened before it? Has anything been tried since?" }
    },
    infoTitle: "Or reach us directly",
    infoNote: "We reply during working hours. For emergencies, use WhatsApp."
  }
};

// Privacy / cookie policy — intentionally short, but present (Google-friendly)
const privacy = {
  ar: {
    metaTitle: "سياسة الخصوصية وملفات تعريف الارتباط | من الصفر إلى الواحد",
    metaDesc: "كيف يستخدم موقع من الصفر إلى الواحد ملفات تعريف الارتباط (Cookies)، بما فيها ملفات خدمات Google، وكيف تتحكم بها.",
    eyebrow: "الخصوصية",
    title: "سياسة الخصوصية وملفات تعريف الارتباط.",
    lead: "توضّح هذه الصفحة باختصار كيف نستخدم ملفات تعريف الارتباط والبيانات البسيطة عند زيارتك للموقع.",
    updatedLabel: "آخر تحديث",
    updated: "22 يوليو 2026",
    sections: [
      {
        h: "نطاق هذه السياسة",
        p: ["تشرح هذه الصفحة كيف يستخدم موقع «من الصفر إلى الواحد» (Zero 2 One Data Recovery) ملفات تعريف الارتباط والبيانات البسيطة أثناء تصفّحك للموقع."]
      },
      {
        h: "ما هي ملفات تعريف الارتباط؟",
        p: ["ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يحفظها متصفحك عند زيارة أي موقع. تساعد على تشغيل الموقع بشكل صحيح وقياس أدائه."]
      },
      {
        h: "كيف نستخدمها",
        list: [
          "ملفات ضرورية لتشغيل الموقع وعرضه بالشكل الصحيح.",
          "ملفات لقياس الأداء وفهم كيفية استخدام الزوّار للموقع، بشكل مُجمّع لا يُعرّف هويتك."
        ]
      },
      {
        h: "خدمات Google",
        p: ["قد نستخدم خدمات من Google مثل Google Analytics أو خدمات إعلانات Google. قد تضع هذه الخدمات ملفات تعريف ارتباط خاصة بها لقياس الزيارات أو عرض إعلانات مناسبة، وتُدار وفق سياسة خصوصية Google."],
        links: [
          { label: "كيفية استخدام Google لملفات تعريف الارتباط", url: "https://policies.google.com/technologies/cookies" },
          { label: "سياسة خصوصية Google", url: "https://policies.google.com/privacy" }
        ]
      },
      {
        h: "كيف تتحكم بها",
        p: ["يمكنك في أي وقت حذف ملفات تعريف الارتباط أو منعها من إعدادات المتصفح. كما يمكنك التحكم بإعلانات Google أو إيقاف تتبّع Google Analytics عبر الروابط التالية:"],
        links: [
          { label: "إعدادات إعلانات Google", url: "https://adssettings.google.com" },
          { label: "إيقاف Google Analytics", url: "https://tools.google.com/dlpage/gaoptout" }
        ]
      },
      {
        h: "البيانات التي ترسلها عبر النموذج",
        p: [
          "عند إرسال نموذج التواصل نستخدم الاسم ورقم الجوال والبريد الإلكتروني إن أدخلته وتفاصيل الحالة للرد على طلبك فقط. تُرسل هذه البيانات إلى بريد العمل عبر مزود الاستضافة والبريد، ولا نبيعها أو نستخدمها للتسويق.",
          "لمنع إساءة الاستخدام، يستخدم التطبيق بصمة أحادية الاتجاه مشتقة من عنوان الشبكة مع أوقات الإرسال ضمن نوافذ لا تتجاوز 24 ساعة، من دون حفظ عنوان الشبكة الخام في ملف المحدد. تُزال السجلات المنتهية عند قبول طلب صالح لاحقًا، وقد تسجل بنية الاستضافة معلومات تقنية ضمن سجلاتها الأمنية وفق سياسة مزود الاستضافة."
        ]
      }
    ],
    contactLabel: "أسئلة حول الخصوصية؟",
    contactText: "لأي استفسار حول هذه السياسة تواصل معنا على"
  },
  en: {
    metaTitle: "Privacy & Cookie Policy | Zero 2 One Data Recovery",
    metaDesc: "How Zero 2 One Data Recovery uses cookies, including cookies set by Google services, and how you can control them.",
    eyebrow: "Privacy",
    title: "Privacy & Cookie Policy.",
    lead: "This page briefly explains how we use cookies and basic data when you visit the site.",
    updatedLabel: "Last updated",
    updated: "22 July 2026",
    sections: [
      {
        h: "Scope of this policy",
        p: ["This page explains how the Zero 2 One Data Recovery website uses cookies and basic data while you browse the site."]
      },
      {
        h: "What are cookies?",
        p: ["Cookies are small text files your browser stores when you visit a website. They help the site work correctly and let us measure its performance."]
      },
      {
        h: "How we use them",
        list: [
          "Essential cookies needed to run the site and display it correctly.",
          "Analytics cookies to understand how visitors use the site, in an aggregated way that does not identify you."
        ]
      },
      {
        h: "Google services",
        p: ["We may use Google services such as Google Analytics or Google advertising. These services can set their own cookies to measure traffic or show relevant ads, and are governed by Google's privacy policy."],
        links: [
          { label: "How Google uses cookies", url: "https://policies.google.com/technologies/cookies" },
          { label: "Google Privacy Policy", url: "https://policies.google.com/privacy" }
        ]
      },
      {
        h: "How to control them",
        p: ["You can delete or block cookies at any time from your browser settings. You can also manage Google ads or opt out of Google Analytics through the links below:"],
        links: [
          { label: "Google Ads settings", url: "https://adssettings.google.com" },
          { label: "Google Analytics opt-out", url: "https://tools.google.com/dlpage/gaoptout" }
        ]
      },
      {
        h: "Data you send through the form",
        p: [
          "When you submit the contact form, we use your name, phone number, optional email address, and case details only to respond to your request. The data is delivered to our business inbox through the hosting and email providers; we do not sell it or use it for marketing.",
          "To prevent abuse, the application uses a one-way fingerprint derived from the network address and submission times in windows no longer than 24 hours. It does not store the raw network address in the limiter file. Expired records are removed when a later valid submission is admitted; the hosting infrastructure may also record technical information in its security logs under the hosting provider's policy."
        ]
      }
    ],
    contactLabel: "Questions about privacy?",
    contactText: "For any question about this policy, contact us at"
  }
};

module.exports = { config, ui, home, contact, privacy };
