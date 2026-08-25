/* ==========================================================================
   About page content (Arabic + English).

   Supplied by the owner on 2026-08-25. The Arabic is published verbatim; the
   English is a faithful translation, not a looser rewrite, so both languages
   make the same commitments — a promise that differs between locales is a
   promise the business cannot keep.

   Two things the source document asked for are deliberately absent:

   - The legal box (trade name, founding year, CR number). The document ships
     it with `[يُستكمل]` placeholders. Publishing a placeholder as if it were a
     record is worse than publishing nothing, so the box lands when the owner
     supplies the values.
   - Team cards with photos, names, titles and years of service. None of that
     exists here and none of it may be invented. The document's own fallback —
     three disciplines, no names — is what ships until real details arrive.
   ========================================================================== */
"use strict";

module.exports = {
  ar: {
    metaTitle: "من نحن | من الصفر إلى الواحد لاستعادة البيانات",
    metaDesc:
      "تعرّف إلى «من الصفر إلى الواحد»، جهة متخصصة في استعادة البيانات من الأقراص والهواتف وRAID والخوادم، بتشخيص واضح وسرية كاملة قبل أي خطوة.",
    breadcrumb: "من نحن",

    hero: {
      eyebrow: "عن «من الصفر إلى الواحد»",
      title: "عندما تكون بياناتك مهمة، لا يكفي أن «نجرّب».",
      paras: [
        "نحن جهة متخصصة في استعادة البيانات من الأقراص الصلبة، وأقراص SSD وNVMe، وأنظمة RAID والخوادم، والهواتف، وبطاقات الذاكرة، وأنظمة المراقبة، إضافة إلى حالات الحذف والفورمات وهجمات الفدية.",
        "نبدأ كل حالة بفهم ما حدث وتشخيص نوع الضرر قبل اتخاذ أي إجراء. هدفنا ليس تجربة أكبر عدد من الحلول، بل اختيار المسار الذي يحافظ على أفضل فرصة ممكنة لاستعادة البيانات، مع وضوح كامل حول الحالة والخطوات المتوقعة."
      ],
      trust: "تشخيص واضح · سرية كاملة · تسليم آمن",
      ctaPrimary: "ابدأ تقييم حالتك",
      ctaSecondary: "تعرّف إلى آلية العمل",
      note: "فحص وتشخيص مجاني · بدون التزام"
    },

    story: {
      eyebrow: "لماذا «من الصفر إلى الواحد»؟",
      title: "بين «لا شيء» وأول ملف يعود، تبدأ الحكاية كلها.",
      paras: [
        "الصفر هو اللحظة التي لا يظهر فيها شيء: قرص صامت، مجلد فارغ، خادم متوقف، أو شاشة تطلب تهيئة. والواحد هو أول ملف يعود سليمًا — لأن المسافة بين «لا شيء» و«شيء واحد» هي المسافة كلها. من تلك النقطة تبدأ بقية الاستعادة.",
        "اخترنا هذا الاسم لأنه يعبّر عن جوهر عملنا: الانتقال من الغموض إلى نتيجة يمكن التحقق منها، ومن الخوف من الفقد إلى قرار مبني على تشخيص. لا نعد بنتيجة قبل أن نفهم الحالة، ولا نختصر الطريق على حساب البيانات."
      ],
      quote: "«من الصفر إلى الواحد» ليست مجرد نتيجة؛ إنها الطريقة التي نصل بها إليها."
    },

    who: {
      eyebrow: "البيانات أولًا",
      title: "لسنا أمام جهاز معطّل فقط، بل أمام ملفات قد لا يمكن تعويضها.",
      paras: [
        "قد يكون القرص الذي لا يعمل هو الأرشيف الكامل لشركة، أو قاعدة بيانات يعتمد عليها فريق كامل، أو سنوات من الصور العائلية، أو مشروعًا لم تُحفظ منه نسخة أخرى. لهذا نتعامل مع استعادة البيانات بوصفها مسؤولية دقيقة، لا خطوة صيانة عادية.",
        "خبرتنا هي آلاف القرارات الصغيرة التي تمنع ضررًا إضافيًا، وتختار المسار الأنسب لكل حالة من أول مرة. أحيانًا يكون أهم قرار هو البدء فورًا، وأحيانًا يكون التوقف عن التشغيل هو ما يحمي فرصة الاستعادة. التشخيص هو الذي يحدد ذلك.",
        "نضع البيانات في مركز القرار، ونفصل بين هدفين مختلفين: إصلاح الجهاز، واستعادة الملفات. قد يعود الجهاز إلى العمل من دون أن تعود البيانات، وقد تُستعاد البيانات حتى لو لم يعد الجهاز صالحًا للاستخدام. بالنسبة إلينا، الأولوية دائمًا لما تريد استعادته."
      ]
    },

    mission: {
      eyebrow: "ما الذي نعمل من أجله؟",
      title: "أن تعرف وضع بياناتك قبل أن تقرر.",
      paras: [
        "مهمتنا أن نمنح كل عميل تقييمًا واضحًا ومسارًا مفهومًا قبل بدء الاستعادة. نحدد نوع الضرر، ونشرح ما يمكن توقعه، ونبيّن العوامل التي قد تؤثر في النتيجة، ثم يبدأ العمل بعد موافقة العميل.",
        "لا توجد وصفة واحدة لكل الأجهزة، كما لا تتشابه حالتان بالكامل. نوع وسيط التخزين يحدد الأدوات، وطبيعة الضرر تحدد ترتيب الخطوات، وأهمية الملفات تحدد الأولويات. لذلك نبدأ من المشكلة نفسها، لا من اسم الجهاز وحده."
      ]
    },

    method: {
      eyebrow: "منهج واضح",
      title: "التشخيص قبل الإجراء، وحماية المصدر قبل البحث عن النتيجة.",
      items: [
        {
          t: "نبدأ بالسؤال الصحيح",
          b: "ما نوع الجهاز؟ ماذا حدث قبل فقدان البيانات؟ هل سقط، توقف، تعرّض للماء، تمّت تهيئته، أو ظهرت رسالة فدية؟ وما المحاولات التي أُجريت بعد ذلك؟ هذه التفاصيل قد تغيّر مسار الاستعادة بالكامل."
        },
        {
          t: "نحمي فرصة الاستعادة",
          b: "تكرار التشغيل، أو تثبيت برنامج على الوسيط نفسه، أو إعادة بناء RAID بصورة عشوائية، قد يضيف ضررًا جديدًا. لذلك نحدد أولًا ما يجب فعله وما يجب تجنبه."
        },
        {
          t: "لكل وسيط مساره",
          b: "القرص الميكانيكي لا يُعامل مثل SSD، والهاتف لا يُعامل مثل بطاقة الذاكرة، ومصفوفة RAID لا تُعامل كقرص منفرد. نختار الأدوات والخطوات بحسب بنية الوسيط وطبيعة العطل."
        },
        {
          t: "نوضح المتوقع قبل البدء",
          b: "بعد التشخيص نوضح نوع الضرر، وإمكانية الاستعادة، والمدة التقديرية، والخطوة المقترحة. لا نعتمد على وعود عامة أو نتيجة مضمونة قبل فحص الحالة."
        },
        {
          t: "نستعيد إلى وسيط منفصل",
          b: "تُسلّم الملفات المستعادة على وسيط منفصل، بما يحافظ على المصدر ويمنع خلط البيانات المستعادة بالوسيط المتضرر."
        },
        {
          t: "السرية جزء من المسار",
          b: "نتعامل مع بيانات الأفراد والشركات بسرية، ونوقّع اتفاقية عدم إفصاح (NDA) عند الطلب، مع معالجة بيانات الشركات على وسيط معزول وتسليمها على وسيط منفصل."
        }
      ]
    },

    fields: {
      eyebrow: "مجالات عملنا",
      title: "كل وسيط له بنيته، وكل عطل له إشاراته.",
      lead: "نتعامل مع حالات الفقد المنطقية والإلكترونية والميكانيكية، ويُحدَّد مسار العمل بعد فحص الوسيط ومعرفة ما جرى قبله وبعده.",
      /* Keyed by service slug — generate.js throws if a slug here has no service
         and if a service has no entry, so the two lists cannot drift apart. */
      rows: {
        hdd: "حالات عدم ظهور القرص، الأصوات غير الطبيعية، الأعطال الإلكترونية والميكانيكية، تلف نظام الملفات، والحذف أو الفورمات.",
        "ssd-nvme": "حالات تعطل وحدة التحكم أو الـFirmware، وعدم التعرّف على القرص، والحذف أو الفورمات، مع مراعاة طبيعة ذاكرة NAND وتأثير TRIM.",
        "raid-servers": "تحليل بنية المصفوفة وترتيب الأقراص ومعلمات RAID قبل أي إعادة بناء أو كتابة قد تغيّر الحالة الأصلية.",
        ransomware: "عزل الحالة، وفهم نطاق التشفير، وتقييم النسخ الاحتياطية وقواعد البيانات ومصادر الاستعادة المتاحة قبل اتخاذ القرار.",
        cctv: "استعادة التسجيلات المحذوفة أو المفقودة أو المتضررة، بحسب نظام التسجيل وحالة القرص ومقدار البيانات التي كُتبت فوق التسجيل المطلوب.",
        "after-format": "تقييم فرص استعادة الملفات قبل أن تحل بيانات جديدة مكانها، مع أهمية إيقاف استخدام الوسيط فور اكتشاف الفقد.",
        phones: "استعادة البيانات بحسب نوع الجهاز ونظام التشغيل وطبيعة الضرر، سواء كان منطقيًا أو كهربائيًا أو ناتجًا عن صدمة أو سوائل.",
        "memory-cards": "حالات الحذف والفورمات وعدم التعرّف على الوسيط والتلف المنطقي أو الكهربائي في بطاقات SD وmicroSD ووسائط USB."
      }
    },

    process: {
      eyebrow: "من أول اتصال إلى آخر ملف",
      title: "مسار تعرف خطواته قبل أن نبدأ.",
      items: [
        { t: "صف لنا ما حدث", b: "أخبرنا بنوع الجهاز، وآخر مرة عمل فيها بصورة طبيعية، وما ظهر بعد العطل، وما إذا أُجريت محاولات إصلاح أو استعادة." },
        { t: "استلام الحالة وفحصها", b: "نفحص وسيط التخزين ونحدد ما إذا كان الضرر منطقيًا أو إلكترونيًا أو ميكانيكيًا، وما المسار المناسب للتعامل معه." },
        { t: "تشخيص وقرار واضح", b: "نشرح لك نتيجة الفحص، وفرصة الاستعادة بحسب الحالة، والمدة التقديرية والخطوة المقترحة، ثم تقرر إن كنت ترغب في المتابعة." },
        { t: "بدء الاستعادة", b: "بعد موافقتك، يبدأ العمل وفق المسار المحدد للحالة، مع الحفاظ على الوسيط الأصلي وتجنب الكتابة عليه كلما سمحت الحالة التقنية بذلك." },
        { t: "التحقق من النتيجة", b: "نراجع سلامة الملفات القابلة للاستعادة وتنظيمها بالقدر الذي تسمح به حالة البيانات، مع إعطاء الأولوية للملفات الأكثر أهمية التي حددها العميل." },
        { t: "تسليم آمن", b: "تُسلّم البيانات المستعادة على وسيط منفصل، وتُستكمل إجراءات الإغلاق وفق السياسة المتفق عليها للحالة." }
      ],
      cta: "شاهد آلية العمل بالتفصيل"
    },

    privacy: {
      eyebrow: "سرية بالاتفاق، لا بالوعد",
      title: "نتعامل مع بياناتك كما لو كانت حساسة — لأنها كذلك.",
      paras: [
        "قد تحتوي الأجهزة التي تصل إلينا على صور شخصية، ووثائق عمل، وسجلات مالية، وقواعد بيانات، وملفات داخلية لا ينبغي أن يطّلع عليها غير أصحابها. لذلك لا نتعامل مع السرية كشعار تسويقي، بل كجزء من آلية الاستلام والمعالجة والتسليم.",
        "نوقّع اتفاقية عدم إفصاح (NDA) عند الطلب، ونعالج بيانات الشركات على وسيط معزول، ونسلّم الملفات المستعادة على وسيط منفصل. وعندما تكون لدى الجهة متطلبات خاصة بالتسليم أو التوثيق أو الاحتفاظ، يمكن مناقشتها قبل بدء العمل وتحديدها بوضوح."
      ],
      points: [
        "اتفاقية عدم إفصاح عند الطلب",
        "معالجة بيانات الشركات على وسيط معزول",
        "تسليم البيانات على وسيط منفصل",
        "تحديد أي متطلبات خاصة قبل بدء العمل"
      ],
      cta: "اطّلع على سياسة الخصوصية"
    },

    audience: {
      eyebrow: "بيانات مختلفة، والأهمية واحدة",
      title: "نستقبل حالات الأفراد والمهنيين والشركات.",
      items: [
        { t: "الأفراد والعائلات", b: "صور وذكريات ووثائق وملفات شخصية لا توجد منها نسخة أخرى." },
        { t: "المصورون وصنّاع المحتوى", b: "بطاقات ذاكرة وأقراص تحتوي على جلسات تصوير، ومواد خام، ومشاريع لم تُسلّم بعد." },
        { t: "الشركات وفرق تقنية المعلومات", b: "خوادم وقواعد بيانات وRAID وNAS وأجهزة عمل تحتوي على ملفات تشغيلية أو أرشيفات مهمة." },
        { t: "الجهات ذات البيانات الحساسة", b: "حالات تتطلب اتفاقية عدم إفصاح، ومسار استلام وتسليم واضح، ومتطلبات خاصة في التعامل مع البيانات." }
      ],
      closing: "لا تحتاج إلى معرفة اسم العطل التقني قبل التواصل. يكفي أن تصف ما حدث، ونبدأ معك من المعلومة الصحيحة بدل التخمين."
    },

    expect: {
      eyebrow: "قبل أن تقرر",
      title: "وضوح في ما نعرفه، وصدق في ما لا يمكن تأكيده قبل الفحص.",
      canLabel: "يمكنك أن تتوقع",
      can: [
        "أن نستمع إلى تفاصيل الحالة قبل اقتراح الحل.",
        "أن نوضح الخطوات المتوقعة قبل بدء الاستعادة.",
        "ألّا يبدأ العمل المعتمد قبل موافقتك.",
        "أن نحدد العوامل التي قد تقلل فرصة الاستعادة.",
        "أن نعطي الأولوية للملفات الأهم بالنسبة إليك.",
        "أن تُسلّم البيانات المستعادة على وسيط منفصل وبسرية."
      ],
      cannotLabel: "وما لن نعدك به",
      cannot: [
        "نتيجة مضمونة قبل تشخيص الوسيط.",
        "مدة موحدة لجميع الحالات.",
        "حل واحد يناسب كل الأجهزة والأعطال.",
        "إعادة تشغيل متكررة أو تجربة عشوائية عندما قد تزيد الضرر."
      ],
      quote: "الثقة لا تبدأ بوعد كبير؛ تبدأ بتشخيص واضح."
    },

    experience: {
      eyebrow: "خبرة تراكمت حالة بعد حالة",
      title: "ليست الخبرة عدد السنوات وحده، بل معرفة القرار الصحيح في الوقت الصحيح.",
      paras: [
        "تغيّرت وسائط التخزين كثيرًا عبر السنوات، من الأقراص الميكانيكية إلى ذاكرة NAND، ومن الخوادم المحلية إلى بيئات أكثر تعقيدًا. ومع كل جيل جديد تتغير الأدوات، لكن تبقى المبادئ الأساسية ثابتة: حماية المصدر، فهم بنية البيانات، عدم التسرع، والتحقق قبل التسليم.",
        "تعاملنا مع حالات وقطاعات مختلفة، لكن المسار الذي نعتمد عليه واحد: فحص أولًا، ثم شرح واضح، ثم قرار العميل."
      ]
    },

    team: {
      eyebrow: "الخبرة وراء كل قرار",
      title: "استعادة البيانات عمل دقيق يقوم به أشخاص يعرفون متى يتقدمون ومتى يتوقفون.",
      paras: [
        "لا تعتمد النتيجة على أداة واحدة، بل على قراءة صحيحة لأعراض العطل، وفهم بنية وسيط التخزين، واختيار الخطوة الأقل مخاطرة. يجمع عمل الفريق بين الخبرة التقنية، والدقة في التوثيق، والحرص على خصوصية كل حالة."
      ],
      items: [
        { t: "تشخيص الأعطال المادية والإلكترونية", b: "قراءة أعراض العطل على الوسيط نفسه، وتحديد ما إذا كان الضرر ميكانيكيًا أو كهربائيًا قبل أي تشغيل إضافي." },
        { t: "تحليل الأنظمة والملفات وRAID", b: "فهم بنية نظام الملفات وترتيب الأقراص ومعلمات المصفوفة، واستخراج البيانات دون كتابة على المصدر." },
        { t: "إدارة الحالات والتواصل والتسليم", b: "توثيق الحالة، وشرح الخيارات، ومتابعة الموافقة، وتسليم البيانات على وسيط منفصل وفق السياسة المتفق عليها." }
      ]
    },

    values: {
      eyebrow: "قيمنا",
      title: "مبادئ تحكم كل حالة نستلمها.",
      items: [
        { t: "الوضوح", b: "نشرح الحالة بلغة مفهومة، ونفصل بين ما نعرفه وما يحتاج إلى فحص إضافي." },
        { t: "الحذر", b: "لا نختار أسرع خطوة إذا كانت قد تقلل فرصة الاستعادة. حماية المصدر تأتي أولًا." },
        { t: "السرية", b: "نحترم خصوصية بيانات الأفراد والشركات في مراحل الاستلام والمعالجة والتسليم." },
        { t: "التخصص", b: "نختار الأدوات والمسار بحسب نوع الوسيط وطبيعة الضرر، لا بحسب وصفة عامة." },
        { t: "المسؤولية", b: "لا نقدّم ضمانات مطلقة، ولا نبدأ خطوة معتمدة قبل أن يفهم العميل خياراته ويوافق عليها." }
      ]
    },

    faq: {
      eyebrow: "أسئلة قصيرة عنّا",
      title: "قبل أن تتواصل معنا.",
      items: [
        { q: "هل تتعاملون مع الأفراد أم الشركات فقط؟", a: "نتعامل مع حالات الأفراد والشركات. تختلف آلية الحالة بحسب نوع الجهاز وحجم البيانات ومتطلبات السرية والتسليم." },
        { q: "هل يمكن معرفة النتيجة قبل تسليم الجهاز؟", a: "يمكن إعطاء إرشادات أولية من وصف الحالة، لكن التقييم الدقيق يحتاج فحص وسيط التخزين ومعرفة ما حدث وما تمّت تجربته بعد العطل." },
        { q: "هل تضمنون استعادة جميع الملفات؟", a: "لا يمكن ضمان النتيجة قبل التشخيص، لأن إمكانية الاستعادة تعتمد على نوع الضرر وحالة وسيط التخزين ومقدار الكتابة أو التلف الذي حدث. بعد الفحص نوضح لك المتوقع قبل أن تقرر." },
        { q: "كيف تحافظون على سرية بيانات الشركات؟", a: "السرية جزء أساسي من العمل. نوقّع اتفاقية عدم إفصاح عند الطلب، ونعالج بيانات الشركات على وسيط معزول، ونسلّم البيانات المستعادة على وسيط منفصل." },
        { q: "هل يجب أن أعرف نوع العطل قبل التواصل؟", a: "لا. أخبرنا فقط بنوع الجهاز، وما حدث، وآخر مرة عمل فيها بصورة طبيعية، وأي محاولات أُجريت بعد ذلك. سنساعدك في تحديد الخطوة الأولى الصحيحة." }
      ]
    },

    cta: {
      eyebrow: "ابدأ من المعلومة الصحيحة",
      title: "إذا كانت البيانات مهمة، لا تجعل التجربة التالية تقلل فرصة استعادتها.",
      body: "صف لنا نوع الجهاز، وما حدث قبل فقدان البيانات، وما الذي جُرّب حتى الآن. سنساعدك في فهم الخطوة الأولى قبل أن تتصرف.",
      primary: "ابدأ تقييم حالتك",
      secondary: "تواصل عبر واتساب",
      warn: "إذا كان الجهاز متوقفًا أو يصدر صوتًا غير طبيعي، أو إذا حُذفت الملفات أو تمّت تهيئة الوسيط، أوقف استخدامه إلى أن يتم تقييم الحالة.",
      trust: "فحص وتشخيص مجاني · سرية تامة · بدون التزام"
    },

    /* The trimmed version that stays on the home page. The source document is
       explicit that the section must not be deleted there, only shortened. */
    home: {
      eyebrow: "عن «من الصفر إلى الواحد»",
      title: "عندما تكون الملفات مهمة، لا يكفي أن «نجرب».",
      paras: [
        "نحن جهة متخصصة في استعادة البيانات، نبدأ بالتشخيص قبل أي إجراء ونختار المسار بحسب نوع الوسيط وطبيعة الضرر. خبرتنا هي آلاف القرارات الصغيرة التي تمنع ضررًا إضافيًا وتحافظ على أفضل فرصة ممكنة للاستعادة.",
        "الصفر هو اللحظة التي لا يظهر فيها شيء؛ والواحد هو أول ملف يعود سليمًا. من تلك النقطة تبدأ بقية الاستعادة."
      ],
      trust: "سرية كاملة · تشخيص واضح · تسليم آمن",
      cta: "اعرف أكثر عن «من الصفر إلى الواحد»"
    }
  },

  en: {
    metaTitle: "About us | Zero 2 One Data Recovery",
    metaDesc:
      "Zero 2 One is a specialist data recovery lab for drives, phones, RAID and servers — clear diagnosis and full confidentiality before any step.",
    breadcrumb: "About us",

    hero: {
      eyebrow: "About Zero 2 One",
      title: "When your data matters, trial and error is not a method.",
      paras: [
        "We are a specialist data recovery lab working on hard drives, SSD and NVMe drives, RAID arrays and servers, phones, memory cards and surveillance systems, as well as deletion, formatting and ransomware cases.",
        "Every case begins by understanding what happened and diagnosing the type of damage before anything is attempted. The goal is not to try the largest number of fixes, but to choose the path that protects the best possible chance of recovery — with full clarity about the condition and the steps ahead."
      ],
      trust: "Clear diagnosis · Full confidentiality · Secure handover",
      ctaPrimary: "Start your case assessment",
      ctaSecondary: "See how we work",
      note: "Free inspection and diagnosis · No obligation"
    },

    story: {
      eyebrow: "Why Zero 2 One?",
      title: "Between “nothing” and the first file that comes back lies the whole story.",
      paras: [
        "Zero is the moment nothing shows up: a silent drive, an empty folder, a server that will not start, or a screen asking you to format. One is the first file that returns intact — because the distance between “nothing” and “one thing” is the entire distance. Everything else follows from that point.",
        "We chose the name because it describes the work itself: moving from uncertainty to a result you can verify, and from the fear of loss to a decision grounded in diagnosis. We do not promise an outcome before we understand the case, and we never shorten the route at the data's expense."
      ],
      quote: "Zero 2 One is not only the result; it is the method that gets you there."
    },

    who: {
      eyebrow: "Data first",
      title: "This is not just a broken device — these are files that may have no replacement.",
      paras: [
        "The drive that will not spin may hold a company's entire archive, a database a whole team depends on, years of family photographs, or a project with no second copy anywhere. That is why we treat data recovery as a careful responsibility rather than an ordinary repair job.",
        "Our experience is the thousands of small decisions that prevent further damage and pick the right path the first time. Sometimes the most important decision is to begin at once; sometimes it is to stop powering the device, because that is what protects the chance of recovery. The diagnosis decides which.",
        "We keep the data at the centre of every decision, and we separate two different goals: repairing the device, and recovering the files. A device can come back to life without the data returning, and data can be recovered even when the device never works again. For us the priority is always what you want back."
      ]
    },

    mission: {
      eyebrow: "What we work for",
      title: "Knowing where your data stands before you decide.",
      paras: [
        "Our job is to give every client a clear assessment and an understandable path before recovery begins. We identify the type of damage, explain what can be expected, set out the factors that may affect the result — and only then, with the client's approval, does the work start.",
        "There is no single recipe for every device, and no two cases are truly alike. The storage medium determines the tools, the nature of the damage determines the order of the steps, and the importance of the files determines the priorities. So we start from the problem itself, not from the device's name alone."
      ]
    },

    method: {
      eyebrow: "A clear method",
      title: "Diagnosis before action, and protecting the source before chasing the result.",
      items: [
        {
          t: "We start with the right question",
          b: "What kind of device is it? What happened before the data was lost — did it fall, stop, get wet, get formatted, or show a ransom note? And what was attempted afterwards? These details can change the entire recovery path."
        },
        {
          t: "We protect the chance of recovery",
          b: "Repeated power cycles, installing software onto the affected medium, or rebuilding a RAID array by guesswork can all add fresh damage. So we establish first what must be done and what must be avoided."
        },
        {
          t: "Each medium has its own path",
          b: "A mechanical drive is not treated like an SSD, a phone is not treated like a memory card, and a RAID array is not treated like a single disk. Tools and steps follow the structure of the medium and the nature of the fault."
        },
        {
          t: "We set expectations before we begin",
          b: "After the diagnosis we explain the type of damage, whether recovery is possible, an estimated duration, and the step we recommend. We do not rely on general promises or guaranteed outcomes before the case has been inspected."
        },
        {
          t: "We recover onto separate media",
          b: "Recovered files are handed over on separate media, which preserves the source and keeps recovered data from being mixed back into the damaged medium."
        },
        {
          t: "Confidentiality is part of the path",
          b: "Personal and corporate data is handled confidentially. We sign a non-disclosure agreement on request, process corporate data on isolated media, and hand it back on separate media."
        }
      ]
    },

    fields: {
      eyebrow: "What we work on",
      title: "Every medium has its structure, and every fault has its signs.",
      lead: "We handle logical, electronic and mechanical data loss. The working path is set after the medium has been inspected and we know what happened before and after the fault.",
      rows: {
        hdd: "Drives that do not appear, unusual noises, electronic and mechanical failures, file-system corruption, and deletion or formatting.",
        "ssd-nvme": "Controller or firmware failures, drives that are not detected, and deletion or formatting — with the behaviour of NAND memory and the effect of TRIM taken into account.",
        "raid-servers": "Analysis of the array's structure, disk order and RAID parameters before any rebuild or write that could alter the original state.",
        ransomware: "Isolating the case, establishing the scope of encryption, and assessing backups, databases and the available recovery sources before any decision is made.",
        cctv: "Recovering deleted, missing or damaged footage according to the recording system, the state of the disk, and how much data has been written over the footage you need.",
        "after-format": "Assessing the chances of recovering files before new data takes their place — which is why using the medium must stop the moment the loss is noticed.",
        phones: "Recovery according to the device, its operating system and the nature of the damage, whether logical, electrical, or caused by impact or liquid.",
        "memory-cards": "Deletion, formatting, media that is not detected, and logical or electrical damage in SD and microSD cards and USB media."
      }
    },

    process: {
      eyebrow: "From the first call to the last file",
      title: "A path whose steps you know before we start.",
      items: [
        { t: "Tell us what happened", b: "Describe the device, the last time it worked normally, what appeared after the fault, and whether any repair or recovery was attempted." },
        { t: "Intake and inspection", b: "We inspect the storage medium and establish whether the damage is logical, electronic or mechanical, and which path suits it." },
        { t: "Diagnosis and a clear decision", b: "We explain the result of the inspection, the chance of recovery for your case, an estimated duration and the step we recommend — then you decide whether to proceed." },
        { t: "Recovery begins", b: "After your approval, work proceeds along the path set for the case, preserving the original medium and avoiding writes to it wherever the technical condition allows." },
        { t: "Verifying the result", b: "We review the integrity of the recoverable files and organise them as far as the state of the data allows, giving priority to the files you identified as most important." },
        { t: "Secure handover", b: "Recovered data is handed over on separate media, and closing procedures follow the policy agreed for the case." }
      ],
      cta: "See the full process"
    },

    privacy: {
      eyebrow: "Confidentiality by agreement, not by promise",
      title: "We treat your data as sensitive — because it is.",
      paras: [
        "The devices that reach us may hold personal photographs, business documents, financial records, databases and internal files that no one outside their owner should see. So confidentiality is not a marketing line here; it is built into how we take in, process and hand back a case.",
        "We sign a non-disclosure agreement on request, process corporate data on isolated media, and return recovered files on separate media. Where an organisation has specific requirements for handover, documentation or retention, these can be discussed and fixed clearly before work begins."
      ],
      points: [
        "Non-disclosure agreement on request",
        "Corporate data processed on isolated media",
        "Data handed back on separate media",
        "Any special requirements agreed before work begins"
      ],
      cta: "Read the privacy policy"
    },

    audience: {
      eyebrow: "Different data, the same importance",
      title: "We take cases from individuals, professionals and companies.",
      items: [
        { t: "Individuals and families", b: "Photographs, memories, documents and personal files with no second copy anywhere." },
        { t: "Photographers and content creators", b: "Memory cards and drives holding shoots, raw material, and projects not yet delivered." },
        { t: "Companies and IT teams", b: "Servers, databases, RAID and NAS systems, and workstations holding operational files or important archives." },
        { t: "Organisations with sensitive data", b: "Cases that call for a non-disclosure agreement, a clear intake and handover path, and specific requirements for handling the data." }
      ],
      closing: "You do not need to know the technical name of the fault before contacting us. Describing what happened is enough — we start from accurate information rather than guesswork."
    },

    expect: {
      eyebrow: "Before you decide",
      title: "Clarity about what we know, and honesty about what cannot be confirmed before inspection.",
      canLabel: "What you can expect",
      can: [
        "That we listen to the details of the case before proposing a fix.",
        "That we explain the expected steps before recovery begins.",
        "That no approved work starts without your agreement.",
        "That we identify the factors that may reduce the chance of recovery.",
        "That we prioritise the files that matter most to you.",
        "That recovered data is handed over on separate media and in confidence."
      ],
      cannotLabel: "What we will not promise",
      cannot: [
        "A guaranteed result before the medium is diagnosed.",
        "A single turnaround time for every case.",
        "One solution that fits every device and every fault.",
        "Repeated power cycles or random attempts when they could increase the damage."
      ],
      quote: "Trust does not start with a big promise; it starts with a clear diagnosis."
    },

    experience: {
      eyebrow: "Experience built one case at a time",
      title: "Experience is not years alone — it is knowing the right decision at the right moment.",
      paras: [
        "Storage media have changed a great deal over the years, from mechanical drives to NAND memory, and from local servers to far more complex environments. Each generation changes the tools, but the underlying principles hold: protect the source, understand the structure of the data, do not rush, and verify before handing anything back.",
        "We have handled cases across different sectors, but the path we rely on is one: inspect first, then explain clearly, then let the client decide."
      ]
    },

    team: {
      eyebrow: "The experience behind every decision",
      title: "Data recovery is exacting work done by people who know when to move and when to stop.",
      paras: [
        "The result does not depend on any single tool. It depends on reading the symptoms correctly, understanding the structure of the storage medium, and choosing the least risky step. The team's work combines technical experience, careful documentation, and respect for the privacy of every case."
      ],
      items: [
        { t: "Physical and electronic fault diagnosis", b: "Reading the symptoms on the medium itself and establishing whether the damage is mechanical or electrical before any further power is applied." },
        { t: "File system, OS and RAID analysis", b: "Understanding the file system, the disk order and the array parameters, and extracting data without writing to the source." },
        { t: "Case management, communication and handover", b: "Documenting the case, explaining the options, obtaining approval, and handing data back on separate media under the agreed policy." }
      ]
    },

    values: {
      eyebrow: "Our values",
      title: "Principles that govern every case we take in.",
      items: [
        { t: "Clarity", b: "We explain the case in plain language and separate what we know from what still needs inspection." },
        { t: "Caution", b: "We do not take the fastest step if it could reduce the chance of recovery. Protecting the source comes first." },
        { t: "Confidentiality", b: "We respect the privacy of personal and corporate data through intake, processing and handover." },
        { t: "Specialisation", b: "Tools and path follow the type of medium and the nature of the damage, not a general recipe." },
        { t: "Responsibility", b: "We give no absolute guarantees, and no approved step begins before the client understands the options and agrees to them." }
      ]
    },

    faq: {
      eyebrow: "Short questions about us",
      title: "Before you get in touch.",
      items: [
        { q: "Do you work with individuals or only companies?", a: "We take cases from both. How a case is handled depends on the device, the volume of data, and the confidentiality and handover requirements." },
        { q: "Can I know the outcome before handing over the device?", a: "We can give initial guidance from a description of the case, but an accurate assessment requires inspecting the storage medium and knowing what happened and what was attempted after the fault." },
        { q: "Do you guarantee that every file will be recovered?", a: "No outcome can be guaranteed before diagnosis, because recovery depends on the type of damage, the state of the storage medium, and how much writing or corruption has occurred. After the inspection we set out what to expect, before you decide." },
        { q: "How do you keep corporate data confidential?", a: "Confidentiality is fundamental to the work. We sign a non-disclosure agreement on request, process corporate data on isolated media, and hand recovered data back on separate media." },
        { q: "Do I need to know the type of fault before contacting you?", a: "No. Just tell us the type of device, what happened, when it last worked normally, and anything attempted since. We will help you identify the correct first step." }
      ]
    },

    cta: {
      eyebrow: "Start from accurate information",
      title: "If the data matters, do not let the next attempt reduce the chance of getting it back.",
      body: "Describe the device, what happened before the data was lost, and what has been tried so far. We will help you understand the first step before you act.",
      primary: "Start your case assessment",
      secondary: "Message us on WhatsApp",
      warn: "If the device has stopped or is making an unusual noise, or if files were deleted or the medium was formatted, stop using it until the case has been assessed.",
      trust: "Free inspection and diagnosis · Full confidentiality · No obligation"
    },

    home: {
      eyebrow: "About Zero 2 One",
      title: "When the files matter, trial and error is not a method.",
      paras: [
        "We are a specialist data recovery lab. We diagnose before we act, and choose the path according to the type of medium and the nature of the damage. Our experience is the thousands of small decisions that prevent further damage and protect the best possible chance of recovery.",
        "Zero is the moment nothing shows up; one is the first file that comes back intact. Everything else follows from that point."
      ],
      trust: "Full confidentiality · Clear diagnosis · Secure handover",
      cta: "More about Zero 2 One"
    }
  }
};
