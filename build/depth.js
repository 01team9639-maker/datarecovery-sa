/* ==========================================================================
   Service page depth sections — Arabic + English, keyed by service slug.

   The evaluation report scored the service pages 7.5/10 and named the reason:
   they read well but are too thin to outrank older, more detailed competitors on
   terms like استعادة RAID or استرجاع ملفات مشفرة. These three sections close that
   gap on every service page:

     devices[6]  — supported devices and brands, each with the one thing that is
                   specific about recovering it. This is the section that proves
                   specialism to a reader comparing three suppliers.
     steps[4]    — the process INSIDE this service, not the generic homepage
                   three steps.
     case*       — one short ILLUSTRATIVE case. Never a real named customer:
                   no client names, companies, dates, prices or exact
                   percentages. Presented explicitly as a typical case.

   A slug missing from this object simply renders without the extra sections, so
   adding a new service never breaks the build.
   ========================================================================== */
module.exports = {
  hdd: {
    ar: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "ابدأ من العرَض",
          "title": "ما نوع عطل الهارد؟",
          "lead": "لكل نوع مسار مختلف، والخطأ الشائع أن يُعامَل عطل مادي كأنه عطل برمجي.",
          "items": [
            {
              "t": "عطل منطقي",
              "b": "يظهر الهارد طبيعيًّا لكن القسم اختفى، أو أصبح RAW، أو يطلب النظام تهيئته، أو حُذفت ملفات ومجلدات. الأولوية منع أي كتابة جديدة، ثم العمل على نسخة."
            },
            {
              "t": "قراءة غير مستقرة",
              "b": "يظهر أحيانًا ويختفي أحيانًا، أو تنخفض السرعة بشدة، أو يتجمّد الجهاز عند فتح مجلد معيّن. الاستمرار في النسخ العادي قد يستهلك الوقت المتبقّي للقرص."
            },
            {
              "t": "عطل إلكتروني",
              "b": "قد يتوقّف بعد انقطاع كهرباء أو محوّل طاقة غير مناسب أو تلف في دائرة الحماية. تبديل اللوحة عشوائيًّا لا يعيد البيانات: بعض معلومات المعايرة مرتبطة بالقرص نفسه."
            },
            {
              "t": "عطل ميكانيكي",
              "b": "طقطقة متكرّرة، أو صوت احتكاك، أو عدم دوران، أو توقّف بعد سقوط. هذه مؤشّرات تستدعي إيقاف التشغيل — لا تشغيل برامج استرجاع."
            },
            {
              "t": "ماء أو حريق أو صدمة",
              "b": "لا تشغّله ولا تفتحه ولا تجفّفه بالحرارة. سجّل ما حدث واتركه في حالته. قد يتضرّر الغلاف أو الدائرة أو المكوّنات الداخلية بدرجات مختلفة."
            },
            {
              "t": "هارد خارجي لا يظهر",
              "b": "قد تكون المشكلة في الكابل أو الغلاف أو منفذ USB لا في القرص. إضاءة المؤشّر لا تدلّ على سلامة القرص. أرسله مع كابله ومحوّله الأصليين."
            }
          ]
        },
        {
          "kind": "prose",
          "eyebrow": "لا أداة واحدة",
          "title": "كيف نختار مسار الاستعادة؟",
          "paras": [
            "إذا كان القرص مستقرًّا، تُؤخذ نسخة كاملة للقراءة فقط ثم يُحلَّل نظام الملفات على النسخة. وإذا كانت القراءة متعثّرة، تتغيّر الأولوية إلى تثبيت الوصول ونسخ القطاعات المهمّة قبل تحليل الملفات. أما الصوت غير الطبيعي أو توقّف الدوران فيتطلّب تقييمًا ماديًّا قبل أي تشغيل جديد.",
            "والهدف الأول ليس فتح مجلد واحد بسرعة، بل حماية أكبر قدر ممكن من المصدر. بعد إنشاء النسخة يمكن البحث عن بنية الأقسام والمجلدات، ثم التحقّق من سلامة عيّنة من الصور والمستندات والفيديوهات وقواعد البيانات قبل عرض النتيجة."
          ]
        },
        {
          "kind": "cards",
          "eyebrow": "بين الطرفين",
          "title": "حالات شائعة ونتائج محتملة",
          "lead": "ليست وعودًا، بل توضيح لما يحدث فعليًّا حسب حالة القرص وما جرى بعد العطل.",
          "items": [
            {
              "t": "هارد خارجي لا يظهر",
              "b": "قد تكون المشكلة في الكابل أو الغلاف أو المنفذ، وقد تكون في القرص نفسه. يُفحص مصدر الطاقة والدائرة قبل أي خطوة."
            },
            {
              "t": "الهارد يطلب فورمات",
              "b": "قد يكون تلف جدول الأقسام أو نظام الملفات هو السبب. لا توافق على التهيئة ولا تشغّل CHKDSK إذا كانت الملفات مهمّة."
            },
            {
              "t": "بطء شديد وملفات لا تُنسخ",
              "b": "قد ترتبط الحالة بقطاعات متعثّرة. تكرار نسخ المجلد نفسه أو اختبار سطحي طويل يضغط على القرص. قد تكون الاستعادة جزئية، فتُرتَّب الملفات الحرجة أولًا."
            },
            {
              "t": "طقطقة بعد سقوط",
              "b": "حالة مادية محتملة. أوقف التشغيل ولا تجرّب كابلًا بعد آخر. كل محاولة دوران قد تزيد الضرر، وتُحدَّد الإمكانية بعد فحص القرص لا بعد سماع الصوت عبر الهاتف."
            },
            {
              "t": "تعرّض للماء أو حرارة عالية",
              "b": "قد تكون الدائرة وحدها متضرّرة، وقد يصل الضرر إلى الداخل. لا تستخدم الأرز ولا مجفّف الشعر ولا تفتح الغلاف."
            }
          ]
        },
        {
          "kind": "steps",
          "title": "ما نحتاجه للتقييم الأولي",
          "items": [
            {
              "t": "نوع الهارد",
              "b": "داخلي أو خارجي، وهل هو HDD أم غير مؤكّد."
            },
            {
              "t": "الشركة والطراز والسعة",
              "b": "وصورة واضحة للملصق إن أمكن."
            },
            {
              "t": "هل يظهر للنظام؟",
              "b": "في BIOS أو إدارة الأقراص، وهل يظهر بالسعة الصحيحة."
            },
            {
              "t": "الصوت الحالي",
              "b": "طبيعي، طقطقة، صفير، احتكاك، أو لا يدور."
            },
            {
              "t": "آخر حدث قبل العطل",
              "b": "سقوط، كهرباء، ماء، بطء، فورمات أو حذف."
            },
            {
              "t": "ما جُرّب بعد العطل",
              "b": "البرامج، أو تغيير اللوحة، أو تشغيل CHKDSK."
            },
            {
              "t": "أولوية المجلدات",
              "b": "أي المجلدات أو أنواع الملفات تُرتَّب أولًا."
            },
            {
              "t": "هل القرص مشفّر؟",
              "b": "BitLocker أو أي نظام تشفير آخر، ومفتاح الاسترداد إن وُجد."
            }
          ]
        }
      ],
      devicesTitle: "الأقراص والماركات التي نتعامل معها",
      devicesLead: "لكل عائلة أقراص سلوك مختلف عند العطل. هذا ما نأخذه في الحسبان قبل أي محاولة قراءة.",
      devices: [
        {
          t: "Seagate",
          b: "تحتفظ أقراص Seagate بوحدات الـFirmware وجدول الترجمة داخل منطقة الخدمة. قد يدور القرص بصورة طبيعية ولا يعلن سعته الصحيحة إذا تضررت هذه المنطقة، لذلك تُقرأ منطقة الخدمة وتُقيّم قبل الاقتراب من بيانات المستخدم."
        },
        {
          t: "Western Digital",
          b: "كثير من الأقراص الخارجية من WD تشفّر البيانات داخل لوحة الوصل USB نفسها. فصل القرص عن لوحته الأصلية وقراءته مباشرة قد يعطي بيانات غير مقروءة، لذلك تبقى اللوحة مع القرص طوال العمل."
        },
        {
          t: "Toshiba وHGST",
          b: "أقراص Toshiba مقاس 2.5 شائعة في اللابتوبات والعلب الخارجية، وHGST أكثر حضوراً في السيرفرات مقاس 3.5. عند الحاجة إلى قطع بديلة تُطابق حسب العائلة وإصدار الـFirmware، لا حسب رقم الموديل على الملصق."
        },
        {
          t: "مقاس 2.5 ومقاس 3.5",
          b: "أقراص 2.5 هي الأكثر تعرضاً للسقوط أثناء التشغيل. وأقراص 3.5 تحمل أسطوانات ورؤوساً أكثر وتعمل على خط 12 فولت، فالضرر فيها يتوزع على أسطح أكثر، وانقطاع الكهرباء غالباً يصيب اللوحة الإلكترونية أولاً."
        },
        {
          t: "أقراص SMR",
          b: "تكتب أقراص SMR مساراتها متداخلة وتدير خريطة داخلية وذاكرة وسيطة. تكرار المحاولات يدفع القرص إلى إعادة ترتيب المسارات، لذلك يُنسخ بمرور واحد هادئ وتُقرأ خريطته بدل تجاهلها."
        },
        {
          t: "الأقراص الخارجية بوحدة USB",
          b: "بعض العلب الخارجية تحتوي قرصاً بمنفذ SATA عادي، وبعضها يحمل لوحة USB مدمجة بلا منفذ SATA أصلاً. غالباً يكون العطل في اللوحة أو المنفذ لا في القرص نفسه، ويتحدد ذلك بالفحص قبل أي فك."
        }
      ],
      stepsTitle: "كيف نتعامل مع القرص الصلب داخل المختبر",
      steps: [
        {
          t: "فحص كهربائي قبل أي تشغيل",
          b: "يصل القرص مطفأً. تُفحص اللوحة الإلكترونية، عناصر الحماية، محرك الدوران ومسار الطاقة. لا يُشغّل القرص قبل التأكد من سلامة مسار الكهرباء."
        },
        {
          t: "تشغيل قصير ومراقب",
          b: "تشغيلة واحدة قصيرة تجيب على ثلاثة أسئلة: هل يصل القرص إلى وضع الجاهزية، هل يعلن الموديل والسعة الصحيحة، وهل تُقرأ منطقة الخدمة. عند سماع صوت رؤوس غير طبيعي تتوقف الطاقة فوراً وينتقل العمل إلى بيئة هواء نظيف داخل المختبر."
        },
        {
          t: "نسخ قطاعي على قرص منفصل",
          b: "يُنسخ القرص قطاعاً بقطاع إلى قرص آخر، بالتحكم في زمن الانتظار وبمرور مستقل لكل رأس: المناطق السليمة أولاً والمناطق المتعبة في مرور لاحق. الهدف ألا يبقى القرص عالقاً على منطقة متضررة."
        },
        {
          t: "إعادة بناء الملفات من النسخة",
          b: "كل عمل بعد ذلك يتم على النسخة لا على القرص الأصلي: إعادة بناء نظام الملفات، فتح عينات للتأكد من سلامتها، ثم التسليم على وسيط منفصل."
        }
      ],
      caseTitle: "حالة نموذجية: قرص خارجي سقط وهو يعمل",
      caseBody: "حالة نموذجية: قرص خارجي مقاس 2.5 سقط أثناء نسخ ملفات، ثم أعيد توصيله عدة مرات وكان يصدر الصوت نفسه في كل مرة. وصل إلى المختبر مطفأً. أظهر الفحص ضرراً في مجموعة الرؤوس، وفُحصت الأسطح قبل أي محاولة قراءة. جرى العمل في بيئة هواء نظيف بقطع مطابقة من العائلة نفسها، ثم نُسخ القرص برأس بعد رأس مع تأجيل المناطق المتضررة إلى مرور لاحق.",
      caseResult: "النتيجة: في حالات مشابهة يعود جزء كبير من الملفات قابلاً للقراءة، لكن لا حكم قبل فحص الأسطح. في هذه الحالة عادت المستندات والصور سليمة، وبقي جزء من مقاطع الفيديو ناقصاً في المنطقة التي لامستها الرؤوس."
    },
    en: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "Start from the symptom",
          "title": "What kind of hard drive fault is it?",
          "lead": "Each kind has a different route, and the common mistake is treating a physical fault as a software one.",
          "items": [
            {
              "t": "Logical fault",
              "b": "The drive appears normally but the partition has vanished, or shows as RAW, or the system asks to format it, or files and folders were deleted. The priority is preventing any new write, then working from an image."
            },
            {
              "t": "Unstable reading",
              "b": "It appears and disappears, or the speed drops sharply, or the machine freezes when opening a particular folder. Ordinary copying can consume whatever time the drive has left."
            },
            {
              "t": "Electronic fault",
              "b": "It may stop after a power cut, an unsuitable adapter, or damage to the protection circuit. Swapping the board at random does not bring the data back: some calibration data belongs to that specific drive."
            },
            {
              "t": "Mechanical fault",
              "b": "Repeated clicking, a grinding sound, no spin, or a stop after a fall. These call for powering down — not for running recovery software."
            },
            {
              "t": "Water, fire or impact",
              "b": "Do not power it on, open it, or dry it with heat. Record what happened and leave it as it is. The casing, the circuit, or the internal components may be damaged to different degrees."
            },
            {
              "t": "External drive not showing",
              "b": "The problem may be the cable, the enclosure or the USB port rather than the drive. A lit indicator says nothing about the drive's health. Send it with its original cable and adapter."
            }
          ]
        },
        {
          "kind": "prose",
          "eyebrow": "No single tool",
          "title": "How is the recovery route chosen?",
          "paras": [
            "If the drive is stable, a full read-only image is taken and the file system is then analysed on that image. If reading is unstable, the priority shifts to stabilising access and copying the important sectors before analysing files. An abnormal noise or a failure to spin calls for a physical assessment before any further power-on.",
            "The first aim is not to open one folder quickly but to protect as much of the source as possible. Once the image exists, the partition and folder structure can be searched, then a sample of images, documents, videos and databases checked for integrity before any result is presented."
          ]
        },
        {
          "kind": "cards",
          "eyebrow": "Between the extremes",
          "title": "Common cases and likely outcomes",
          "lead": "Not promises — an account of what actually happens, depending on the drive's condition and what was done after the fault.",
          "items": [
            {
              "t": "External drive not showing",
              "b": "The problem may be the cable, the enclosure or the port, and it may be the drive itself. Power source and circuit are examined before any other step."
            },
            {
              "t": "The drive asks to be formatted",
              "b": "Damage to the partition table or file system may be the cause. Do not agree to format, and do not run CHKDSK if the files matter."
            },
            {
              "t": "Very slow, files will not copy",
              "b": "The case may involve failing sectors. Repeatedly copying the same folder or running a long surface test puts the drive under strain. Recovery may be partial, so critical files are ordered first."
            },
            {
              "t": "Clicking after a fall",
              "b": "A likely physical case. Stop powering it and do not try one cable after another. Every spin-up attempt can add damage, and the odds are established after examining the drive, not after hearing the noise over the phone."
            },
            {
              "t": "Exposed to water or high heat",
              "b": "The circuit alone may be damaged, or the damage may have reached inside. Do not use rice or a hairdryer, and do not open the casing."
            }
          ]
        },
        {
          "kind": "steps",
          "title": "What we need for the initial assessment",
          "items": [
            {
              "t": "Drive type",
              "b": "Internal or external, and whether it is an HDD or unconfirmed."
            },
            {
              "t": "Make, model and capacity",
              "b": "With a clear photograph of the label if possible."
            },
            {
              "t": "Does the system see it?",
              "b": "In BIOS or Disk Management, and whether it reports the right capacity."
            },
            {
              "t": "Current noise",
              "b": "Normal, clicking, beeping, grinding, or not spinning."
            },
            {
              "t": "The last event before the fault",
              "b": "A fall, power, water, slowness, formatting or deletion."
            },
            {
              "t": "What was tried afterwards",
              "b": "Software, a board swap, or running CHKDSK."
            },
            {
              "t": "Folder priority",
              "b": "Which folders or file types should come first."
            },
            {
              "t": "Is the drive encrypted?",
              "b": "BitLocker or any other encryption, and the recovery key if you have it."
            }
          ]
        }
      ],
      devicesTitle: "Drives and brands we work on",
      devicesLead: "Each drive family behaves differently once it fails. This is what we account for before any read attempt.",
      devices: [
        {
          t: "Seagate",
          b: "Seagate drives keep their firmware modules and translator table in the service area. A drive can spin up perfectly and still report the wrong capacity when that area is damaged, so the service area is read and assessed before we go anywhere near user data."
        },
        {
          t: "Western Digital",
          b: "Many WD external drives encrypt the data inside the USB bridge board itself. Pulling the bare disk out and reading it directly can return unreadable data, so the original board stays with the drive throughout the work."
        },
        {
          t: "Toshiba and HGST",
          b: "Toshiba 2.5-inch drives are common in laptops and external cases; HGST turns up more often as a 3.5-inch server disk. When replacement parts are needed, they are matched by family and firmware revision, not by the model number printed on the label."
        },
        {
          t: "2.5-inch and 3.5-inch",
          b: "2.5-inch drives are the ones most often dropped while running. 3.5-inch drives carry more platters and more heads and run off a 12 V rail, so damage spreads across more surfaces and a power cut usually hits the board first."
        },
        {
          t: "SMR drives",
          b: "SMR drives write overlapping tracks and manage their own internal map and media cache. Repeated retries push the drive into reorganising those bands, so it is imaged in a single calm pass and its map is interpreted rather than ignored."
        },
        {
          t: "External USB drives",
          b: "Some enclosures hold an ordinary SATA disk; others carry a native USB board with no SATA connector at all. The fault is often in the board or the port rather than the disk, and inspection settles that before anything is opened."
        }
      ],
      stepsTitle: "How a hard drive is handled in the lab",
      steps: [
        {
          t: "Electrical check before any power-on",
          b: "The drive arrives powered off. The board, the protection components, the spindle motor and the power path are checked first. The drive is not spun up until the electrical path is confirmed clean."
        },
        {
          t: "One short, observed spin-up",
          b: "A single short power-on answers three questions: does the drive reach ready, does it report the correct model and capacity, and can the service area be read. If the heads sound wrong, power stops immediately and the work moves into a clean-air environment inside the lab."
        },
        {
          t: "Sector-by-sector imaging to a separate disk",
          b: "The drive is imaged sector by sector onto a separate disk, with controlled read timeouts and a separate pass per head: healthy zones first, tired zones on a later pass. The point is never to leave the drive stuck on a damaged area."
        },
        {
          t: "Rebuilding the files from the image",
          b: "Everything after that happens on the image, never on the original disk: the file system is rebuilt, samples are opened to confirm they are intact, and the data is handed back on a separate medium."
        }
      ],
      caseTitle: "A typical case: an external drive dropped while running",
      caseBody: "A typical case: a 2.5-inch external drive knocked off a desk mid-copy, then reconnected several times, making the same sound each time. It reached the lab powered off. Inspection showed damage to the head assembly, and the platter surfaces were checked before any read attempt. The work was done in a clean-air environment with parts matched from the same family, then the drive was imaged head by head, with the damaged zones left for a later pass.",
      caseResult: "Outcome: in cases like this a large part of the data often comes back readable, but no verdict is possible before the surfaces are inspected. Here the documents and photos returned intact, while part of the video files stayed incomplete in the zone the heads had touched."
    }
  },
  "ssd-nvme": {
    ar: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "ابدأ من العرَض",
          "title": "أي حالة تصف قرصك؟",
          "lead": "أقراص SSD وNVMe لا تتصرّف مثل الهارد الميكانيكي، ونتيجة الحذف عليها تختلف جذريًّا.",
          "items": [
            {
              "t": "لا يظهر في BIOS أو النظام",
              "b": "قد يكون السبب في الطاقة أو المنفذ أو وحدة التحكّم أو الـFirmware. عدم الظهور لا يثبت أن شرائح الذاكرة فارغة، لكنه يعني أن برامج الاسترجاع العادية لن تصل إليه."
            },
            {
              "t": "يظهر ثم يختفي أو يجمّد الجهاز",
              "b": "القرص غير مستقرّ أثناء القراءة، وقد تتدهور حالته مع الاختبارات الطويلة أو النسخ المتكرّر. أوقف الفحص التلقائي ولا تشغّل اختبارات سرعة أو تحديث Firmware."
            },
            {
              "t": "يظهر بوضع القراءة فقط",
              "b": "قد تدخل بعض الأقراص وضع حماية عند اكتشاف مشكلة داخلية. لا تحاول إجبار الكتابة أو التهيئة — قد يكون هذا آخر فرصة لنسخ المحتوى."
            },
            {
              "t": "حُذفت الملفات أو تمّ الفورمات",
              "b": "تختلف النتيجة بشدّة عن HDD بسبب أوامر TRIM وإدارة المساحات غير المستخدمة. التوقّف عن الاستخدام فورًا مهمّ، لكنه لا يجيز وعدًا بأن كل حذف قابل للعكس."
            },
            {
              "t": "حرارة أو انطفاء مفاجئ",
              "b": "تظهر بعض مشكلات NVMe مع الحرارة أو انقطاع الطاقة أو تلف المكوّنات. سجّل ما حدث ولا تكرّر التشغيل في أكثر من جهاز إذا كان القرص يسخن بسرعة."
            }
          ]
        },
        {
          "kind": "prose",
          "eyebrow": "تفصيلان يُخلط بينهما",
          "title": "‏M.2 ليس مرادفًا لـNVMe، وقراءة الشريحة ليست حلًّا سحريًّا",
          "paras": [
            "‏M.2 وصف لشكل البطاقة، بينما يمكن أن يعمل القرص ببروتوكول SATA أو NVMe. لذلك لا يكفي قول «عندي M.2»: نحتاج صورة الملصق أو الطراز الكامل، ونوع الجهاز الذي كان القرص مركّبًا فيه، وهل ظهر في BIOS وبأي سعة. تختلف وحدات التحكّم وطرق إدارة شرائح NAND، وهي التي تحدّد أدوات القراءة لا شكل الموصل.",
            "وفي SSD لا تُحفظ الملفات بترتيب مباشر داخل شريحة واحدة. توزّع وحدة التحكّم البيانات بين الشرائح، وتصحّح الأخطاء، وتبدّل الخلايا، وتدير جدولًا يربط العناوين المنطقية بالمواقع الفعلية. وقد تكون البيانات مشفّرة داخليًّا أو بواسطة BitLocker وFileVault. لذلك لا تعني قراءة NAND الخام أن الملفات ستظهر تلقائيًّا: يعتمد المسار على سلامة وحدة التحكّم، وإمكانية الوصول إلى معلومات الترجمة، وحالة الشرائح، والتشفير."
          ]
        },
        {
          "kind": "notes",
          "eyebrow": "حسب الحالة",
          "title": "مسارات الاستعادة الممكنة",
          "items": [
            {
              "t": "القرص مستقرّ ويظهر بالسعة الصحيحة",
              "b": "تُؤخذ نسخة للقراءة فقط بأقلّ قدر من الضغط، ثم يُحلَّل نظام الملفات على النسخة. ولا تُحفظ الملفات المستعادة على القرص نفسه."
            },
            {
              "t": "القرص يتقطّع أو بطيء",
              "b": "تُعطى الأولوية لنسخ المناطق المهمّة مع مراقبة الحرارة والاستقرار. وقد تُرتَّب مجلدات العمل أو الصور المهمّة قبل بقية البيانات إذا كان الوصول محدودًا."
            },
            {
              "t": "مشكلة وحدة تحكّم أو Firmware",
              "b": "يحتاج القرص إلى تقييم متخصّص يحدّد هل توجد طريقة للوصول المؤقّت أو التعامل مع عائلة وحدة التحكّم. ولا يُحدَّث Firmware من الإنترنت ولا تُستخدم أدوات المصنع التي قد تمسح القرص."
            },
            {
              "t": "القرص مشفّر",
              "b": "تُفصَل مشكلة الوصول المادي عن التشفير. حتى إذا أمكن أخذ نسخة كاملة، تبقى كلمة المرور أو مفتاح BitLocker أو FileVault مطلوبة لفتح المحتوى."
            }
          ]
        },
        {
          "kind": "steps",
          "title": "ما نحتاجه للتقييم الأولي",
          "items": [
            {
              "t": "الشركة والطراز والسعة",
              "b": "مع صورة الموصل والملصق."
            },
            {
              "t": "نوع القرص إن كان معروفًا",
              "b": "‏2.5 SATA أو M.2 SATA أو M.2 NVMe أو SSD خارجي."
            },
            {
              "t": "الجهاز ونظام التشغيل",
              "b": "الجهاز الذي كان القرص يعمل عليه، ونظامه."
            },
            {
              "t": "هل يظهر للنظام؟",
              "b": "في BIOS أو إدارة الأقراص، وبأي اسم وسعة."
            },
            {
              "t": "سلوك القرص",
              "b": "هل يسخن أو ينقطع الاتصال أو يظهر بوضع القراءة فقط."
            },
            {
              "t": "آخر حدث قبل العطل",
              "b": "تحديث، انقطاع طاقة، سقوط، فورمات، حذف أو اختفاء."
            },
            {
              "t": "ما جُرّب بعد المشكلة",
              "b": "البرامج والتحديثات والمحوّلات التي استُخدمت."
            },
            {
              "t": "التشفير",
              "b": "وجود BitLocker أو FileVault، وكلمة المرور أو مفتاح الاسترداد."
            },
            {
              "t": "الملفات الأهمّ",
              "b": "وترتيبها حسب الأولوية."
            }
          ]
        }
      ],
      devicesTitle: "أقراص SSD وNVMe التي نتعامل معها",
      devicesLead: "الاسم على الملصق لا يحدد المسار. ما يحدده هو وحدة التحكم وإصدار الـFirmware وحالة التشفير.",
      devices: [
        {
          t: "Samsung",
          b: "تستخدم Samsung وحدات تحكم وFirmware من تطويرها في أقراص NVMe مثل 970 و980 و990، وأقراص SATA مثل 860 و870. عند الخلل قد يدخل القرص وضع قراءة فقط أو وضع حماية داخلي، وهذه اللحظة هي الأنسب لنسخه قبل أن يتوقف عن الظهور نهائياً."
        },
        {
          t: "Kingston وCrucial",
          b: "تعتمد أقراص Kingston وCrucial في الغالب على عائلات وحدات تحكم معروفة مثل Phison وSilicon Motion. يبدأ التعامل بتحديد عائلة وحدة التحكم وإصدار الـFirmware، لأن قرصين بالاسم التجاري نفسه قد يحملان وحدتي تحكم مختلفتين."
        },
        {
          t: "WD وSanDisk",
          b: "أقراص WD وSanDisk شائعة في اللابتوبات وفي الأقراص الخارجية بمنفذ USB. في النسخ الخارجية تكون الذاكرة أحياناً ملحومة مع وحدة التحكم على لوحة واحدة، فلا يوجد قرص يمكن إخراجه، ويتحدد المسار بحالة تلك اللوحة."
        },
        {
          t: "M.2 NVMe مقابل SSD بمنفذ SATA",
          b: "شكل M.2 لا يعني NVMe بالضرورة؛ هناك أقراص M.2 تعمل ببروتوكول SATA وأخرى ببروتوكول NVMe عبر مسارات PCIe. يُحدد البروتوكول وطريقة التوصيل قبل أول تشغيل، لأن الوصلة الخاطئة لا تُظهر القرص وتدفع صاحبه إلى تكرار المحاولة."
        },
        {
          t: "الأقراص المشفّرة",
          b: "التشفير في SSD قد يكون داخل وحدة التحكم نفسها (OPAL) أو على مستوى النظام مثل BitLocker. الوصول إلى الذاكرة لا يعني قراءة الملفات: بدون مفتاح الاسترداد أو بيانات الدخول تبقى البيانات غير مقروءة، ونوضح ذلك قبل البدء لا بعده."
        },
        {
          t: "سلوك TRIM",
          b: "بعد الحذف أو الفورمات يرسل النظام أمر TRIM، وقد تستمر وحدة التحكم في مسح تلك المساحات في الخلفية حتى والقرص غير مستخدم. التوقف المبكر عن التشغيل يغيّر الفرص أكثر من أي أداة تُستخدم لاحقاً."
        }
      ],
      stepsTitle: "كيف نتعامل مع SSD وNVMe داخل المختبر",
      steps: [
        {
          t: "تحديد نوع القرص قبل توصيله",
          b: "M.2 بروتوكول NVMe، أو M.2 بروتوكول SATA، أو SSD مقاس 2.5 بمنفذ SATA، أو ذاكرة ملحومة على لوحة؛ لكل نوع وصلة مختلفة. تُفحص اللوحة بصرياً بحثاً عن أثر حرارة أو عنصر محترق قبل وصول أي طاقة."
        },
        {
          t: "توصيل بمانع كتابة وTRIM معطّل",
          b: "يُوصل القرص عبر مسار يمنع الكتابة مع تعطيل التهيئة التلقائية وأمر TRIM، ثم تُقرأ هوية وحدة التحكم: هل يعلن الموديل والسعة الصحيحة، أم يظهر بسعة صفر أو في وضع اضطراري. إذا ظهر مستقراً يُنسخ في الجلسة نفسها بمرور واحد وبعمق طلبات منخفض، لأن أقراص SSD غالباً تتوقف دفعة واحدة لا تدريجياً."
        },
        {
          t: "العمل على مستوى وحدة التحكم والذاكرة",
          b: "عند عدم استجابة وحدة التحكم ينتقل العمل داخل المختبر إلى مستوى الشرائح: قراءة الذاكرة وإعادة بناء طبقة الترجمة من ترتيب الكتل وتصحيح الأخطاء وفك التداخل. وإذا كان القرص مشفّراً ولا يتوفر مفتاحه تبقى القراءة غير مفهومة."
        },
        { t: "إعادة بناء الملفات من النسخة", b: "يُعاد بناء نظام الملفات من النسخة لا من القرص الأصلي، وتُفتح عينات للتأكد من سلامتها، ثم تُسلّم البيانات على وسيط منفصل." }
      ],
      caseTitle: "حالة نموذجية: لابتوب توقف عن الإقلاع وقرص M.2 يظهر بسعة خاطئة",
      caseBody: "حالة نموذجية: لابتوب توقف عن الإقلاع فجأة. يظهر قرص M.2 من نوع NVMe في إعدادات BIOS لكن بسعة غير صحيحة، وكان صاحبه قد أعاد التشغيل عدة مرات وجرّب علبة خارجية. وصل الجهاز إلى المختبر دون محاولة تحديث Firmware. وُصل القرص عبر مانع كتابة مع تعطيل TRIM، فاتضح أن وحدة التحكم دخلت وضع حماية يسمح بالقراءة فقط. نُسخ القرص بمرور واحد في تلك الجلسة، ثم أُعيد بناء نظام الملفات من النسخة.",
      caseResult: "النتيجة: قرص في هذه الحالة قد يتوقف عن الظهور في أي لحظة، والفرصة الحقيقية هي أول جلسة يظهر فيها. هنا قُرئ الجزء الأكبر من المساحة المستخدمة وفُتحت عينات للتأكد. ولو كان القرص مشفّراً بـBitLocker لكان مفتاح الاسترداد شرطاً لقراءة الملفات، ولا يمكن تجاوز ذلك."
    },
    en: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "Start from the symptom",
          "title": "Which case describes your drive?",
          "lead": "SSD and NVMe drives do not behave like mechanical disks, and the outcome of deletion on them is fundamentally different.",
          "items": [
            {
              "t": "Not visible in BIOS or the system",
              "b": "The cause may be power, the port, the controller, or firmware. Not appearing does not prove the memory chips are empty, but it does mean ordinary recovery software cannot reach it."
            },
            {
              "t": "Appears then disappears, or freezes the machine",
              "b": "The drive is unstable while reading, and its condition can degrade with long tests or repeated copying. Stop automatic scanning, and do not run speed tests or firmware updates."
            },
            {
              "t": "Appears in read-only mode",
              "b": "Some drives enter a protective mode when they detect an internal problem. Do not try to force writing or formatting — this may be the last opportunity to copy the contents."
            },
            {
              "t": "Files deleted or the drive formatted",
              "b": "The outcome differs sharply from an HDD because of TRIM and free-space management. Stopping use immediately matters, but it does not justify promising that every deletion is reversible."
            },
            {
              "t": "Heat or a sudden shutdown",
              "b": "Some NVMe problems appear with heat, power loss, or component damage. Record what happened, and do not keep trying it in several machines if the drive heats up quickly."
            }
          ]
        },
        {
          "kind": "prose",
          "eyebrow": "Two things often confused",
          "title": "M.2 is not a synonym for NVMe, and reading the chip is no magic answer",
          "paras": [
            "M.2 describes the card's form factor, while the drive itself may run the SATA or the NVMe protocol. So 'I have an M.2' is not enough: we need a photo of the label or the full model, the machine the drive was fitted in, and whether it appeared in BIOS and at what capacity. Controllers and NAND management differ, and it is those — not the connector shape — that determine the reading tools.",
            "In an SSD, files are not stored in direct order inside a single chip. The controller spreads data across chips, corrects errors, swaps cells, and maintains a table mapping logical addresses to physical locations. The data may also be encrypted internally, or by BitLocker or FileVault. Reading raw NAND therefore does not mean the files will simply appear: the route depends on the controller's health, access to the translation data, the state of the chips, and the encryption."
          ]
        },
        {
          "kind": "notes",
          "eyebrow": "Depending on the case",
          "title": "Possible recovery routes",
          "items": [
            {
              "t": "The drive is stable and reports the right capacity",
              "b": "A read-only image is taken with as little strain as possible, then the file system is analysed on that image. Recovered files are never written back to the same drive."
            },
            {
              "t": "The drive cuts out or is slow",
              "b": "Priority goes to copying the important regions while monitoring temperature and stability. Work folders or important images may be ordered ahead of everything else if access is limited."
            },
            {
              "t": "A controller or firmware problem",
              "b": "The drive needs a specialist assessment to establish whether temporary access or handling of that controller family is possible. Firmware is not updated from the internet, and manufacturer tools that can erase the drive are not used."
            },
            {
              "t": "The drive is encrypted",
              "b": "The physical access problem is separated from the encryption. Even where a full image can be taken, the password or the BitLocker or FileVault key is still required to open the contents."
            }
          ]
        },
        {
          "kind": "steps",
          "title": "What we need for the initial assessment",
          "items": [
            {
              "t": "Make, model and capacity",
              "b": "With a photo of the connector and the label."
            },
            {
              "t": "Drive type if known",
              "b": "2.5in SATA, M.2 SATA, M.2 NVMe, or an external SSD."
            },
            {
              "t": "Machine and operating system",
              "b": "The machine the drive was running in, and its system."
            },
            {
              "t": "Does the system see it?",
              "b": "In BIOS or Disk Management, under what name and capacity."
            },
            {
              "t": "How the drive behaves",
              "b": "Whether it heats up, drops the connection, or appears read-only."
            },
            {
              "t": "The last event before the fault",
              "b": "An update, power loss, a fall, formatting, deletion, or disappearance."
            },
            {
              "t": "What was tried afterwards",
              "b": "The software, updates and adapters that were used."
            },
            {
              "t": "Encryption",
              "b": "Whether BitLocker or FileVault is present, and the password or recovery key."
            },
            {
              "t": "The most important files",
              "b": "And their order of priority."
            }
          ]
        }
      ],
      devicesTitle: "SSD and NVMe drives we work on",
      devicesLead: "The name on the label does not decide the path. The controller, the firmware revision and the encryption state do.",
      devices: [
        {
          t: "Samsung",
          b: "Samsung uses its own controllers and firmware across its NVMe drives such as the 970, 980 and 990, and its SATA drives such as the 860 and 870. When something goes wrong the drive may fall into a read-only or internal protection mode, and that window is the best moment to image it, before it stops appearing altogether."
        },
        {
          t: "Kingston and Crucial",
          b: "Kingston and Crucial drives mostly build on well-known controller families such as Phison and Silicon Motion. Work starts by identifying the controller family and firmware revision, because two drives sold under the same product name can carry different controllers."
        },
        {
          t: "WD and SanDisk",
          b: "WD and SanDisk drives are common in laptops and in USB external drives alike. In the external ones the memory is sometimes soldered next to the controller on a single board, so there is no drive to take out and the path is decided by the state of that board."
        },
        {
          t: "M.2 NVMe vs SATA SSD",
          b: "The M.2 shape does not mean NVMe. Some M.2 drives speak SATA and others speak NVMe over PCIe lanes. The protocol and the connection method are established before the first power-on, because a wrong adapter simply shows nothing and pushes the owner into trying again."
        },
        {
          t: "Encrypted drives",
          b: "Encryption on an SSD may sit in the controller itself (OPAL) or at system level, such as BitLocker. Reaching the memory is not the same as reading the files: without the recovery key or the login credentials the data stays unreadable, and we say so before starting, not after."
        },
        {
          t: "TRIM behaviour",
          b: "After a delete or a format the system issues TRIM, and the controller may keep erasing those areas in the background even while the drive sits idle. Stopping early changes the odds more than any tool used later."
        }
      ],
      stepsTitle: "How an SSD or NVMe drive is handled in the lab",
      steps: [
        {
          t: "Identify the drive before it is connected",
          b: "M.2 running NVMe, M.2 running SATA, a 2.5-inch SATA SSD, or memory soldered to a board; each needs a different adapter. The board is also inspected for heat marks or a burnt component before any power reaches it."
        },
        {
          t: "Write-blocked connection, TRIM disabled",
          b: "The drive is connected through a write-blocked path with automount and TRIM disabled, then the controller identity is read: does it report the correct model and capacity, or does it come up at zero capacity or in a safe mode. If it enumerates and stays stable, it is imaged in that same session in one pass at low queue depth, because SSDs tend to stop all at once rather than degrade slowly."
        },
        {
          t: "Controller and memory level work",
          b: "If the controller does not respond, the work moves to chip level inside the lab: reading the memory and rebuilding the translation layer from block order, error correction and interleaving. On an encrypted drive with no key available, what comes back stays unreadable."
        },
        {
          t: "Rebuilding the files from the image",
          b: "The file system is rebuilt from the image, never from the original drive. Samples are opened to confirm they are intact, and the data is handed back on a separate medium."
        }
      ],
      caseTitle: "A typical case: a laptop that stopped booting, M.2 drive reporting the wrong capacity",
      caseBody: "A typical case: a laptop stopped booting. The M.2 NVMe drive still appears in the BIOS, but at the wrong capacity, and the owner had restarted it several times and tried an external enclosure. It reached the lab with no firmware update attempted. Connected through a write blocker with TRIM disabled, the drive turned out to have dropped into a protection mode that allows reads only. It was imaged in a single pass in that session, and the file system was rebuilt from the image afterwards.",
      caseResult: "Outcome: a drive in this state can stop appearing at any moment, and the real chance is the first session in which it still shows up. Here most of the used space was read and samples were opened to confirm. Had the drive been BitLocker encrypted, the recovery key would have been a requirement for reading the files, and there is no way around that."
    }
  },
  "raid-servers": {
    ar: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "list",
          "tone": "avoid",
          "eyebrow": "قرار الساعة الأولى",
          "title": "متى يجب إيقاف النظام؟",
          "lead": "كل كتابة جديدة على مصفوفة متضرّرة تُصعّب الاستعادة. هذه المؤشّرات تستدعي التوقّف والتوثيق قبل أي إجراء.",
          "items": [
            "المصفوفة أصبحت Degraded وظهر قرص ثانٍ بأخطاء قراءة.",
            "بدأ Rebuild ثم توقّف أو تراجع الأداء بصورة شديدة.",
            "اختفى Volume أو تغيّر إلى RAW أو Unmounted.",
            "طلب المتحكّم Initialize أو Create New Array أو Import Foreign Configuration.",
            "تغيّر ترتيب الأقراص أو نُقلت إلى جهاز آخر.",
            "توقّف NAS أو SAN أو خادم الملفات بعد انقطاع كهرباء.",
            "لم تعد آلات VMware أو Hyper-V أو قواعد البيانات قابلة للفتح.",
            "توجد مؤشّرات تشفير أو حذف جماعي — وهنا تُعامَل الحالة كحادث أمني أيضًا."
          ]
        },
        {
          "kind": "accordion",
          "eyebrow": "للتوجيه لا للتقنية",
          "title": "دليل مبسّط لمستويات RAID",
          "lead": "شرح موجز يساعدك على وصف حالتك. الإعدادات الفعلية تُقرأ من بيانات الأقراص لا من التخمين.",
          "items": [
            {
              "t": "RAID 0",
              "b": "يوزّع البيانات بين قرصين أو أكثر لتحسين الأداء بلا تكرار. فقدان جزء من قرص قد يؤثّر على الملفات الممتدّة عبر المصفوفة كلها، ويحتاج التحليل جميع الأقراص وترتيبها ومعاملات التوزيع."
            },
            {
              "t": "RAID 1",
              "b": "ينشئ نسخة متطابقة عادةً. ورغم ذلك قد تنتقل أخطاء الحذف أو التلف المنطقي إلى النسختين، وقد لا تكون الأقراص متزامنة تمامًا بعد عطل أو Rebuild."
            },
            {
              "t": "RAID 5",
              "b": "يستخدم Parity موزّعًا ويتحمّل عادةً فشل قرص واحد في الحالة السليمة. الخطر يظهر عندما يكون قرص آخر ضعيفًا أو عندما يبدأ Rebuild على أقراص قديمة."
            },
            {
              "t": "RAID 6",
              "b": "يستخدم Parity مزدوجًا ويتحمّل أعطالًا أكثر ضمن تصميمه، لكن فساد البيانات أو ترتيبًا خاطئًا أو فشل عدّة أقراص أثناء إعادة البناء قد يجعل الاستعادة معقّدة."
            },
            {
              "t": "RAID 10",
              "b": "يجمع بين المرايا والتوزيع. النتيجة تعتمد على أي الأقراص فشلت وعلى أزواج المرايا الفعلية، لا على عدد الأقراص المعطّلة وحده."
            }
          ]
        },
        {
          "kind": "steps",
          "title": "ما الذي نفعله قبل فتح الملفات؟",
          "items": [
            {
              "t": "توثيق البنية",
              "b": "يُسجَّل ترتيب الأقراص وحالة كل قرص وموديل المتحكّم ورسائل النظام وأي Rebuild أو استبدال حدث. صور الـBays وواجهة الإدارة أدقّ من الذاكرة بعد أيام."
            },
            {
              "t": "نسخة مستقلّة لكل قرص",
              "b": "يُفحص كل قرص منفردًا وتُؤخذ نسخة قطاعية متى أمكن. لا يُكتب على الأقراص الأصلية ولا يُعتمد على قرص واحد ليمثّل مصفوفة موزّعة."
            },
            {
              "t": "تحديد معاملات المصفوفة",
              "b": "يُحلَّل ترتيب الأقراص وحجم Stripe واتجاه Parity والـOffset وحالة الأقراص البديلة أو القديمة، ثم تُبنى مصفوفة افتراضية على النسخ."
            },
            {
              "t": "فحص نظام الملفات والخدمات",
              "b": "بعد ظهور الـVolume منطقيًّا تُراجَع بنية الملفات ومخازن الآلات الافتراضية وقواعد البيانات. نجاح إعادة بناء RAID لا يعني تلقائيًّا أن كل ملف سليم."
            },
            {
              "t": "ترتيب الأولويات والتحقّق",
              "b": "تُستعاد الأنظمة والملفات بحسب أثرها على العمل، ثم تُفتح عيّنة من المستندات والفيديوهات وقواعد البيانات للتحقّق قبل التسليم."
            }
          ]
        },
        {
          "kind": "cards",
          "eyebrow": "بين الطرفين",
          "title": "حالات شائعة ونتائج محتملة",
          "items": [
            {
              "t": "فشل قرص ثم فشل Rebuild",
              "b": "قد يكون القرص البديل سليمًا بينما يحتوي قرص آخر على قطاعات متعثّرة لا تظهر أثناء التشغيل العادي. احتفظ بالقرص الأصلي والبديل معًا؛ قد تلزم مقارنة حالتيهما."
            },
            {
              "t": "NAS يظهر Volume غير مركّب",
              "b": "قد تكون الأقراص سليمة نسبيًّا والمشكلة في بنية RAID أو نظام الملفات أو إعداد الجهاز. لا تنشئ Storage Pool جديدًا ولا تهيّئ الأقراص."
            },
            {
              "t": "تبدّل المتحكّم أو السيرفر",
              "b": "قد يقرأ المتحكّم الجديد البيانات بطريقة مختلفة أو يطلب Initialize. لا توافق. يلزم طراز المتحكّم القديم والجديد ونسخة من الإعدادات إن وُجدت."
            },
            {
              "t": "‏VMware أو Hyper-V لا ترى الآلات",
              "b": "قد تكون المصفوفة قابلة لإعادة البناء بينما تضرّرت ملفات VMDK أو VHDX أو بنية Datastore. النتيجة قد تكون آلة كاملة، أو أقراصًا افتراضية جزئية، أو استخراج ملفات مهمّة فقط."
            },
            {
              "t": "قاعدة بيانات لا تبدأ بعد عودة التخزين",
              "b": "عودة الـVolume لا تثبت اتّساق قاعدة البيانات. تُفحص ملفات البيانات والسجلّات وتُنسخ قبل أي Repair يكتب عليها."
            }
          ]
        },
        {
          "kind": "list",
          "tone": "avoid",
          "eyebrow": "الأكثر ضررًا",
          "title": "تجنّب هذه الخطوات",
          "items": [
            "لا تبدأ Rebuild ثانيًا ولا تعمل Initialize.",
            "لا تغيّر ترتيب الأقراص ولا منصّات الـBay.",
            "لا تستبدل أكثر من قرص دفعة واحدة.",
            "لا تجبر قرصًا Offline على Online ولا تمسح Foreign Configuration.",
            "لا تحدّث Firmware للمتحكّم أو NAS أثناء الحادث.",
            "لا تعد الأقراص القديمة إلى Pool يعمل قبل حفظ نسخ منها.",
            "لا تستعيد النسخ الاحتياطية فوق النظام المتضرّر قبل معرفة سبب العطل.",
            "لا تفترض أن Hot Spare يحتوي على نسخة كاملة؛ دوره يعتمد على حالة إعادة البناء."
          ]
        },
        {
          "kind": "steps",
          "title": "ما نحتاجه من مسؤول النظام",
          "items": [
            {
              "t": "الجهاز والمتحكّم",
              "b": "الشركة والطراز للسيرفر أو NAS أو SAN، وطراز المتحكّم."
            },
            {
              "t": "إعداد المصفوفة",
              "b": "مستوى RAID المتوقّع وعدد الأقراص وسعة كل قرص."
            },
            {
              "t": "صور الـBays",
              "b": "صور واضحة للأقراص داخل مواضعها قبل إخراجها."
            },
            {
              "t": "حالة كل قرص",
              "b": "‏Online أو Failed أو Degraded أو Foreign أو Rebuilding."
            },
            {
              "t": "تسلسل الأحداث بالتوقيت",
              "b": "أول إنذار، استبدال، Rebuild، انقطاع طاقة أو تحديث."
            },
            {
              "t": "ما أُخرج أو أُضيف",
              "b": "أي قرص أُخرج أو أُضيف، وأيّها يظنّ الفريق أنه قديم."
            },
            {
              "t": "الأنظمة والخدمات",
              "b": "نظام التشغيل ونظام الملفات والخدمات المهمّة."
            },
            {
              "t": "التشفير",
              "b": "وجود تشفير، ومكان مفاتيح BitLocker أو تشفير NAS."
            },
            {
              "t": "البيئات الافتراضية",
              "b": "وجود VMware أو Hyper-V أو قواعد بيانات، وأسماء الأنظمة الحرجة."
            },
            {
              "t": "النسخ الاحتياطية",
              "b": "حالتها وآخر اختبار استعادة ناجح."
            },
            {
              "t": "مؤشّرات أمنية",
              "b": "هل توجد شبهة فدية أو وصول غير مصرّح به."
            }
          ]
        }
      ],
      devicesTitle: "السيرفرات وأنظمة التخزين التي نتعامل معها",
      devicesLead: "لكل متحكم RAID طريقة خاصة في كتابة البيانات وترتيبها على الأقراص. هذه أكثر البيئات التي تصل المختبر، وما الذي يتغيّر في التعامل مع كل واحدة منها.",
      devices: [
        {
          t: "سيرفرات Dell PowerEdge",
          b: "متحكمات PERC تحفظ إعدادات المصفوفة على المتحكم وعلى الأقراص معاً. استيراد Foreign Config أو مسحه قد يعيد كتابة هذه الإعدادات، لذلك نقرأ الأقراص خارج المتحكم أولاً."
        },
        {
          t: "سيرفرات HP ProLiant",
          b: "متحكمات Smart Array تكتب بيانات وصفية خاصة في بداية كل قرص، ومكان القرص داخل الرف جزء من الحل. نوثّق موضع كل قرص قبل إخراجه من الجهاز."
        },
        {
          t: "أجهزة Synology NAS",
          b: "تعتمد على mdadm وLVM فوقهما نظام ملفات Btrfs أو ext4، وقد يجمع SHR أحجام أقراص مختلفة في أكثر من مستوى مصفوفة. يجب فهم البنية كاملة قبل أي تجميع."
        },
        {
          t: "أجهزة QNAP NAS",
          b: "الأقسام الرقيقة (Thin Volumes) واللقطات تضيف طبقة فوق المصفوفة نفسها. تلف هذه الطبقة قد يمنع الوصول إلى الملفات حتى لو كانت كل الأقراص تُقرأ بشكل سليم."
        },
        {
          t: "RAID البرمجي",
          b: "Storage Spaces في Windows وmdadm في Linux تحفظ تعريف المصفوفة داخل النظام لا في عتاد مستقل. عند فقد النظام تُستنتج البنية من الأقراص نفسها."
        },
        {
          t: "أنظمة SAN وأرفف التخزين",
          b: "وحدات LUN وأنظمة VMFS وملفات الأقراص الافتراضية تعني مصفوفة داخل مصفوفة. نعيد بناء الطبقة السفلى أولاً، ثم نفتح الأقراص الافتراضية المخزّنة داخلها."
        }
      ],
      stepsTitle: "كيف نتعامل مع مصفوفة متوقفة",
      steps: [
        {
          t: "توثيق المصفوفة قبل لمسها",
          b: "نسجّل نوع RAID، عدد الأقراص، رقم كل منفذ، موديل المتحكم ورسائل السجل. يُوسم ترتيب الأقراص فيزيائياً، ولا تُكتب أي بيانات على قرص عضو."
        },
        {
          t: "نسخ كل قرص قراءة فقط",
          b: "يُنسخ كل قرص قطاعاً بقطاع عبر واجهة قراءة فقط داخل المختبر. الأقراص الضعيفة تُعالج أولاً بقراءة متدرجة، وكل العمل بعدها يتم على النسخ لا على الأصل."
        },
        {
          t: "إعادة بناء المصفوفة افتراضياً",
          b: "من النسخ نحدد حجم الشريحة (Stripe)، ترتيب الكتل، دوران التماثل ونقطة البداية، ونحدد القرص الذي خرج من المصفوفة أولاً حتى لا تدخل بياناته القديمة في الحساب."
        },
        {
          t: "استخراج البيانات والتحقق منها",
          b: "يُقرأ نظام الملفات من المصفوفة المعاد بناؤها، ثم نفتح عينات من قواعد البيانات والأقراص الافتراضية والمجلدات المشتركة للتأكد من سلامتها قبل التسليم على وسيط منفصل."
        }
      ],
      caseTitle: "حالة نموذجية: مصفوفة RAID 5 توقفت أثناء إعادة البناء",
      caseBody: "وصل المختبر سيرفر مكتبي بمصفوفة RAID 5 من 5 أقراص. كان أحد الأقراص خارج الخدمة منذ فترة دون أن ينتبه أحد، وعند خروج قرص ثانٍ بدأت إعادة بناء توقفت في منتصفها. أوقفنا أي محاولة تجميع جديدة، ونسخنا الأقراص الخمسة قراءة فقط، ثم أعدنا بناء المصفوفة افتراضياً بعد تحديد القرص الذي خرج أولاً واستبعاد بياناته القديمة من الحساب.",
      caseResult: "في حالات مشابهة تعود المجلدات المشتركة وقواعد البيانات قابلة للفتح في كثير من الأحيان، وقد تبقى ملفات كُتب فوقها أثناء إعادة البناء غير قابلة للاستعادة. لا يمكن الحكم على أي حالة قبل قراءة الأقراص وفحصها."
    },
    en: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "list",
          "tone": "avoid",
          "eyebrow": "The first-hour decision",
          "title": "When should the system be stopped?",
          "lead": "Every new write to a damaged array makes recovery harder. These signs call for stopping and documenting before any action.",
          "items": [
            "The array has gone Degraded and a second disk is showing read errors.",
            "A rebuild started then stopped, or performance collapsed.",
            "A volume vanished, or turned RAW or unmounted.",
            "The controller asked to Initialize, Create New Array, or Import Foreign Configuration.",
            "The disk order changed, or the disks were moved to another machine.",
            "A NAS, SAN or file server stopped after a power cut.",
            "VMware or Hyper-V machines or databases will no longer open.",
            "There are signs of encryption or mass deletion — in which case this is a security incident too."
          ]
        },
        {
          "kind": "accordion",
          "eyebrow": "For orientation, not depth",
          "title": "A simple guide to RAID levels",
          "lead": "A brief explanation to help you describe your case. The actual parameters are read from the disks, not guessed.",
          "items": [
            {
              "t": "RAID 0",
              "b": "Spreads data across two or more disks for performance with no redundancy. Losing part of one disk can affect files spanning the whole array, and analysis needs every disk, its order, and the striping parameters."
            },
            {
              "t": "RAID 1",
              "b": "Normally creates an identical copy. Even so, deletion or logical corruption can propagate to both copies, and disks may not be perfectly in sync after a fault or a rebuild."
            },
            {
              "t": "RAID 5",
              "b": "Uses distributed parity and normally tolerates one disk failing while healthy. The danger appears when another disk is weak, or when a rebuild starts on ageing disks."
            },
            {
              "t": "RAID 6",
              "b": "Uses double parity and tolerates more failures by design, but data corruption, a wrong order, or several disks failing during a rebuild can make recovery complex."
            },
            {
              "t": "RAID 10",
              "b": "Combines mirroring and striping. The outcome depends on which disks failed and on the actual mirror pairs, not on the number of failed disks alone."
            }
          ]
        },
        {
          "kind": "steps",
          "title": "What we do before opening any files",
          "items": [
            {
              "t": "Documenting the structure",
              "b": "Disk order, the state of each disk, the controller model, system messages, and any rebuild or replacement are all recorded. Photographs of the bays and the management interface are more reliable than memory after a few days."
            },
            {
              "t": "An independent image of each disk",
              "b": "Each disk is examined on its own and imaged sector by sector where possible. Nothing is written to the original disks, and no single disk is treated as representing a distributed array."
            },
            {
              "t": "Establishing the array parameters",
              "b": "Disk order, stripe size, parity direction, offset, and the state of replacement or older disks are analysed, then a virtual array is assembled over the images."
            },
            {
              "t": "Checking the file system and services",
              "b": "Once the volume appears logically, the file structure, virtual machine stores and databases are reviewed. A successful RAID rebuild does not automatically mean every file is intact."
            },
            {
              "t": "Prioritising and verifying",
              "b": "Systems and files are recovered by their impact on operations, then a sample of documents, videos and databases is opened for verification before handover."
            }
          ]
        },
        {
          "kind": "cards",
          "eyebrow": "Between the extremes",
          "title": "Common cases and likely outcomes",
          "items": [
            {
              "t": "A disk failed, then the rebuild failed",
              "b": "The replacement disk may be healthy while another disk holds failing sectors that never showed in normal operation. Keep the original and the replacement together; comparing their state may be necessary."
            },
            {
              "t": "A NAS shows an unmounted volume",
              "b": "The disks may be relatively healthy while the problem lies in the RAID structure, the file system, or the device configuration. Do not create a new storage pool and do not format the disks."
            },
            {
              "t": "The controller or server was swapped",
              "b": "A new controller may read the data differently or ask to initialise. Do not agree. The old and new controller models are needed, along with a copy of the configuration if one exists."
            },
            {
              "t": "VMware or Hyper-V cannot see the machines",
              "b": "The array may be rebuildable while VMDK or VHDX files or the datastore structure are damaged. The outcome may be a complete machine, partial virtual disks, or extraction of important files only."
            },
            {
              "t": "A database will not start after storage returns",
              "b": "A returned volume does not prove database consistency. Data files and logs are examined and copied before any repair writes over them."
            }
          ]
        },
        {
          "kind": "list",
          "tone": "avoid",
          "eyebrow": "Most damaging",
          "title": "Avoid these steps",
          "items": [
            "Do not start another rebuild and do not initialise.",
            "Do not change the disk order or the bay positions.",
            "Do not replace more than one disk at a time.",
            "Do not force an offline disk online and do not clear a foreign configuration.",
            "Do not update controller or NAS firmware during the incident.",
            "Do not return older disks to a working pool before images of them are kept.",
            "Do not restore backups over the damaged system before the cause is known.",
            "Do not assume a hot spare holds a complete copy; its role depends on the state of the rebuild."
          ]
        },
        {
          "kind": "steps",
          "title": "What we need from the system administrator",
          "items": [
            {
              "t": "Machine and controller",
              "b": "Make and model of the server, NAS or SAN, and the controller model."
            },
            {
              "t": "Array configuration",
              "b": "The expected RAID level, the number of disks, and each disk's capacity."
            },
            {
              "t": "Photographs of the bays",
              "b": "Clear photographs of the disks in position before they are removed."
            },
            {
              "t": "The state of each disk",
              "b": "Online, Failed, Degraded, Foreign or Rebuilding."
            },
            {
              "t": "A timed sequence of events",
              "b": "First alert, replacement, rebuild, power loss or update."
            },
            {
              "t": "What was removed or added",
              "b": "Which disk was taken out or added, and which the team believes is the older one."
            },
            {
              "t": "Systems and services",
              "b": "Operating system, file system, and the services that matter."
            },
            {
              "t": "Encryption",
              "b": "Whether encryption is present, and where BitLocker or NAS keys are held."
            },
            {
              "t": "Virtual environments",
              "b": "Whether VMware, Hyper-V or databases are involved, and the names of critical systems."
            },
            {
              "t": "Backups",
              "b": "Their state and the last successful restore test."
            },
            {
              "t": "Security indicators",
              "b": "Whether ransomware or unauthorised access is suspected."
            }
          ]
        }
      ],
      devicesTitle: "Servers and storage systems we work with",
      devicesLead: "Every RAID controller has its own way of writing and ordering data across disks. These are the environments that most often reach the lab, and what changes in handling each one.",
      devices: [
        {
          t: "Dell PowerEdge servers",
          b: "PERC controllers keep array metadata both on the controller and on the member disks. Importing or clearing a foreign configuration can rewrite that metadata, so we read the disks outside the controller first."
        },
        {
          t: "HP ProLiant servers",
          b: "Smart Array controllers write their own metadata to the start of every member disk, and the bay a disk came from is part of the answer. We record the position of each disk before it leaves the chassis."
        },
        {
          t: "Synology NAS",
          b: "Built on mdadm and LVM with Btrfs or ext4 above them, and SHR can spread different disk sizes across more than one array level. The whole structure has to be understood before anything is assembled."
        },
        {
          t: "QNAP NAS",
          b: "Thin volumes and snapshots add a layer above the array itself. Damage to that layer can block access to the files even when every disk reads perfectly."
        },
        {
          t: "Software RAID",
          b: "Windows Storage Spaces and Linux mdadm hold the array definition inside the operating system rather than in separate hardware. When the system is gone, the layout has to be derived from the disks themselves."
        },
        {
          t: "SAN and disk shelves",
          b: "LUNs, VMFS volumes and virtual disk files mean an array inside an array. We rebuild the lower layer first, then open the virtual disks stored within it."
        }
      ],
      stepsTitle: "How we handle a stopped array",
      steps: [
        {
          t: "Document the array before touching it",
          b: "We record the RAID type, the disk count, every bay number, the controller model and the log messages. Disk order is labelled physically, and nothing is written to any member disk."
        },
        {
          t: "Image every disk read-only",
          b: "Each disk is copied sector by sector through a read-only interface in the lab. Weak disks are handled first with a gentler read strategy, and all later work happens on the images, never the originals."
        },
        {
          t: "Rebuild the array virtually",
          b: "From the images we determine the stripe size, block order, parity rotation and start offset, and identify which disk dropped out first so its stale data stays out of the calculation."
        },
        {
          t: "Extract and verify",
          b: "The file system is read from the reconstructed array, then we open samples — databases, virtual disks, shared folders — to confirm they are intact before handover on a separate medium."
        }
      ],
      caseTitle: "A typical case: a RAID 5 that stopped during a rebuild",
      caseBody: "An office server reached the lab with a RAID 5 built from 5 disks. One disk had been out of service for some time without anyone noticing, and when a second dropped out, a rebuild started and halted halfway. We stopped any further assembly, imaged all 5 disks read-only, then rebuilt the array virtually after identifying the disk that left first and excluding its stale data from the calculation.",
      caseResult: "In cases like this, shared folders and databases often come back openable, while files written over during the rebuild may stay unrecoverable. No case can be judged before the disks are read and inspected."
    }
  },
  cctv: {
    ar: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "قبل أي خطوة",
          "title": "حدّد الحالة أولًا",
          "lead": "الوقت هنا يعمل ضدّك: كل دقيقة تسجيل جديدة قد تستبدل المقطع المطلوب.",
          "items": [
            {
              "t": "المقطع حُذف من الواجهة",
              "b": "اختفاؤه من قائمة البحث لا يثبت أن بياناته أُزيلت، لكن استمرار التسجيل قد يستبدل المساحة القديمة. أوقف الجهاز وسجّل التاريخ والوقت ورقم الكاميرا المطلوبين."
            },
            {
              "t": "الجهاز عمل فورمات للهارد",
              "b": "تعتمد النتيجة على نوع التهيئة وما إذا عاد الجهاز إلى التسجيل بعدها. لا تعد إضافة القرص إلى DVR ولا توافق على Initialize مرة ثانية."
            },
            {
              "t": "‏DVR أو NVR لا يعمل",
              "b": "قد تكون المشكلة في الجهاز أو مصدر الطاقة أو القرص أو بنية التخزين. لا تنقل الهارد إلى جهاز آخر قد يهيّئه تلقائيًّا؛ احتفظ بالجهاز والقرص ومحوّل الطاقة."
            },
            {
              "t": "التسجيل موجود لكنه لا يُصدَّر أو لا يعمل",
              "b": "قد تكون المشكلة في صيغة التصدير أو المشغّل أو فهرس الجهاز، لا في الفيديو نفسه. احتفظ بالملف الأصلي وببرنامج المشاهدة الذي أنشأه الجهاز."
            }
          ]
        },
        {
          "kind": "prose",
          "eyebrow": "ليست ملفات عادية",
          "title": "أين تُحفظ تسجيلات المراقبة؟",
          "paras": [
            "قد تكون التسجيلات على هارد داخل DVR، أو مجموعة أقراص داخل NVR، أو بطاقة ذاكرة في الكاميرا، أو NAS، أو خدمة سحابية. تختلف طريقة الاستعادة بحسب مكان التخزين، ولذلك لا يكفي اسم ماركة الكاميرا وحده.",
            "وبعض الأجهزة تستخدم نظام ملفات وتجزئة فيديو خاصّين بها، فلا تظهر المقاطع كملفات MP4 عادية عند توصيل القرص بالحاسب. وقد تكون المقاطع موزّعة على أجزاء ترتبط بفهرس داخلي. لذلك يبدأ العمل بأخذ نسخة من وسيط التخزين، ثم فهم بنية الجهاز وتجميع المقاطع من النسخة."
          ]
        },
        {
          "kind": "steps",
          "title": "من القرص إلى مقطع قابل للتحقّق",
          "items": [
            {
              "t": "حفظ الحالة",
              "b": "يُوقَف التسجيل، وتُوثَّق شاشة الجهاز وطرازه وعدد الكاميرات والوقت الظاهر. وإذا كانت الحالة مرتبطة ببلاغ أو نزاع، لا تُغيَّر الإعدادات ولا يُعاد تشغيل الجهاز بلا تنسيق."
            },
            {
              "t": "أخذ نسخة من وسيط التخزين",
              "b": "يُقرأ الهارد بطريقة تمنع الكتابة عليه. وإذا كان متضرّرًا، تُعالَج مشكلة القراءة أولًا ثم يستمرّ التحليل على النسخة."
            },
            {
              "t": "تحديد بنية التسجيل",
              "b": "يُبحث عن فهرس الجهاز والقنوات والطوابع الزمنية وأجزاء الفيديو. وإذا كان الفهرس مفقودًا، يمكن البحث عن بنية المقاطع نفسها، لكن الأسماء والتواريخ الدقيقة قد تتأثّر."
            },
            {
              "t": "تجميع المدة المطلوبة",
              "b": "تُعطى الأولوية للقناة والفترة الحرجة مع هامش قبل الحدث وبعده. وقد تكون النتيجة مقطعًا كاملًا، أو أجزاء متفرّقة، أو تسجيلات مجاورة، أو لا شيء إذا تمّت الكتابة فوق البيانات فعليًّا."
            },
            {
              "t": "التحقّق والتسليم",
              "b": "يُفحص تشغيل الفيديو وتوضَّح الفترة والقناة. وعند الحاجة التشغيلية يمكن تسليم نسخة قابلة للمشاهدة مع الاحتفاظ بالنسخة الأصلية المستخرجة."
            }
          ]
        },
        {
          "kind": "cards",
          "eyebrow": "بين الطرفين",
          "title": "حالات شائعة ونتائج محتملة",
          "items": [
            {
              "t": "حُذف مقطع ثم استمرّ التسجيل ساعات قليلة",
              "b": "قد تبقى أجزاء أو المقطع كاملًا إذا لم تصل الكتابة الجديدة إلى مساحته. الأولوية لإيقاف الجهاز وتحديد النافذة الزمنية بدقّة."
            },
            {
              "t": "استمرّ التسجيل أيامًا بعد الحذف",
              "b": "ترتفع احتمالية الكتابة فوق البيانات، خصوصًا مع قرص صغير وعدد كاميرات كبير ودقّة عالية. لا يمكن استنتاج النتيجة من عدد الأيام وحده."
            },
            {
              "t": "القرص يُقرأ لكن الجهاز يقول «لا يوجد تسجيل»",
              "b": "قد يكون الفهرس أو قاعدة بيانات الجهاز متضرّرين بينما أجزاء الفيديو موجودة. لا تعمل Repair أو Format قبل حفظ نسخة."
            },
            {
              "t": "هارد DVR يصدر صوتًا أو يختفي",
              "b": "تتحوّل الحالة أولًا إلى استعادة قرص متضرّر. لا تشغّل الجهاز مرارًا: التسجيل المستمرّ والقراءة غير المستقرّة يجتمعان على المصدر نفسه."
            },
            {
              "t": "المقطع موجود بتوقيت مختلف",
              "b": "قد يكون هناك انحراف ساعة أو تغيير منطقة زمنية. تُراجَع المقاطع حول الوقت المتوقّع وتُقارن بأحداث معروفة بدلًا من الاعتماد على طابع واحد."
            }
          ]
        },
        {
          "kind": "list",
          "tone": "avoid",
          "eyebrow": "الأكثر ضررًا",
          "title": "تجنّب هذه الخطوات",
          "items": [
            "لا تعد تشغيل التسجيل «للتأكّد».",
            "لا تعمل Initialize أو Format للهارد.",
            "لا تنقل القرص إلى DVR آخر قد يعيد تهيئته.",
            "لا تحدّث Firmware ولا تعمل Factory Reset.",
            "لا تسجّل مقطع اختبار على القناة نفسها.",
            "لا تحذف الملف الأصلي أو تحوّله إذا كانت الحالة قانونية — اعمل على نسخة.",
            "لا تعدّل ساعة الجهاز قبل توثيق الفرق بينها وبين الوقت الحقيقي."
          ]
        },
        {
          "kind": "steps",
          "title": "ما نحتاجه للتقييم الأولي",
          "items": [
            {
              "t": "الجهاز",
              "b": "الشركة والطراز الكامل للـDVR أو NVR أو الكاميرا."
            },
            {
              "t": "التخزين",
              "b": "عدد الأقراص وسعتها، وهل النظام RAID أم قرص واحد."
            },
            {
              "t": "القنوات",
              "b": "عدد القنوات، والكاميرا المطلوبة ورقمها."
            },
            {
              "t": "النافذة الزمنية",
              "b": "التاريخ والوقت المطلوبان مع هامش قبل الحدث وبعده."
            },
            {
              "t": "دقّة الساعة",
              "b": "المنطقة الزمنية، وهل ساعة الجهاز صحيحة الآن."
            },
            {
              "t": "نمط التسجيل",
              "b": "مستمرّ، أو بالحركة، أو بالأحداث، أو بجدول زمني."
            },
            {
              "t": "الإعدادات",
              "b": "الدقّة ومعدّل الإطارات ومدة الاحتفاظ التقريبية إن عُرفت."
            },
            {
              "t": "ما حدث",
              "b": "حذف، فورمات، Reset، عطل جهاز، عطل هارد أو تصدير فاشل."
            },
            {
              "t": "التسجيل بعد الفقد",
              "b": "مقدار التسجيل الجديد بعد اختفاء المقطع."
            },
            {
              "t": "الغرض",
              "b": "هل توجد حاجة قانونية أو لسلسلة حيازة موثّقة."
            }
          ]
        }
      ],
      devicesTitle: "أجهزة التسجيل وأنظمة المراقبة التي نفحصها",
      devicesLead: "أجهزة DVR وNVR لا تحفظ الفيديو كملفات عادية، بل داخل تنسيق خاص بكل شركة. معرفة الجهاز وطريقة كتابته للتسجيل هي أول ما يحدد إمكانية الوصول إلى المقطع المطلوب.",
      devices: [
        {
          t: "أجهزة Hikvision للتسجيل",
          b: "تكتب الفيديو داخل كتل كبيرة محجوزة مسبقاً مع فهرس منفصل للقنوات والأوقات. عند تلف الفهرس يبقى الفيديو على القرص، ويُستخرج بتتبع بصمة التدفق نفسه."
        },
        {
          t: "أجهزة Dahua للتسجيل",
          b: "تقسّم التسجيل إلى مقاطع ثابتة يحمل كل منها رأساً يذكر القناة والتوقيت. هذا يسمح بترتيب المقاطع حسب الكاميرا والساعة حتى بعد فقد جدول الفهرسة."
        },
        {
          t: "أجهزة Uniview والأجهزة المعاد تسميتها",
          b: "كثير من الأجهزة في السوق تحمل أسماء تجارية مختلفة فوق لوحة وبرنامج مشتركين. نحدد المنصة الفعلية وإصدار البرنامج قبل قراءة القرص، لأن التنسيق يتغير بين الإصدارات."
        },
        {
          t: "أنظمة NVR متعددة الأقراص",
          b: "في التركيبات الكبيرة تُوزّع التسجيلات على أكثر من قرص ضمن مجموعة RAID أو JBOD. غياب قرص واحد قد يقطع المقاطع، لذلك نتعامل مع الأقراص كمجموعة واحدة ونحافظ على ترتيبها."
        },
        {
          t: "هاردات المراقبة WD Purple وSeagate SkyHawk",
          b: "مصممة للكتابة المستمرة على مدار الساعة، وهذا يجعل تآكل القطاعات متوقعاً بعد سنوات من التشغيل. القرص المتعب يُنسخ بقراءة متدرجة قبل أي بحث داخل محتواه."
        },
        {
          t: "التخزين داخل الكاميرا",
          b: "الكاميرات التي تسجّل على بطاقة SD تعمل بحلقة كتابة قصيرة، ومدة الاحتفاظ فيها أقل بكثير من جهاز التسجيل. إخراج البطاقة فوراً هو الفارق الحقيقي في هذه الحالات."
        }
      ],
      stepsTitle: "كيف نتعامل مع تسجيل مفقود",
      steps: [
        {
          t: "تثبيت الوقت وتحديد النافذة",
          b: "نسجّل موديل الجهاز، عدد القنوات، والتاريخ والساعة المطلوبين. من حجم القرص وعدد الكاميرات ومعدل البث نقدّر مدة الاحتفاظ الفعلية، وهل ما زالت النافذة المطلوبة داخل القرص أصلاً."
        },
        {
          t: "نسخ قرص التسجيل قراءة فقط",
          b: "يُفصل القرص عن الجهاز ويُنسخ داخل المختبر عبر واجهة قراءة فقط. لا يعود القرص إلى جهاز التسجيل، لأن أي تشغيل جديد يستأنف الكتابة من حيث توقف."
        },
        {
          t: "قراءة تنسيق الجهاز أو تجاوزه",
          b: "إذا كان الفهرس سليماً نقرأه مباشرة. وإذا تلف أو تمت التهيئة، نمسح النسخة بحثاً عن بصمات مقاطع الفيديو، ونعيد بناء القناة والتوقيت من رؤوس المقاطع نفسها."
        },
        {
          t: "تجميع المقاطع وتسليمها",
          b: "تُحوّل المقاطع المستخرجة إلى صيغة تعمل على أي مشغّل، مرتبة بالقناة والتاريخ. نوضح ما تم العثور عليه وما لا يظهر في القرص، ونسلّم على وسيط منفصل مع اتفاقية عدم إفصاح عند الطلب."
        }
      ],
      caseTitle: "حالة نموذجية: تسجيل مطلوب بعد أيام من الحادثة",
      caseBody: "وصل المختبر جهاز Hikvision بـ 8 قنوات من مستودع، والمطلوب مساء يوم واحد طُلب بعد مرور عدة أيام. كان الجهاز ما زال يسجّل طوال تلك المدة. أوقفنا التسجيل، ونسخنا القرص قراءة فقط، ثم بحثنا داخل النسخة عن مقاطع القناة والتوقيت المطلوبين بدل الاعتماد على واجهة الجهاز التي لم تعد تعرضها.",
      caseResult: "في حالات كهذه يعود جزء من النافذة الزمنية قابلاً للعرض في كثير من الأحيان، بينما تكون أجزاء أخرى قد كُتب فوقها بالتسجيل الجديد. لا يمكن تحديد ما تبقى قبل قراءة القرص وفحص محتواه."
    },
    en: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "Before any step",
          "title": "Identify the case first",
          "lead": "Time works against you here: every minute of new recording can overwrite the footage you need.",
          "items": [
            {
              "t": "The clip was deleted from the interface",
              "b": "Its absence from the search list does not prove the data is gone, but continued recording can overwrite the old space. Stop the device and note the exact date, time and camera number you need."
            },
            {
              "t": "The device formatted the disk",
              "b": "The outcome depends on the type of format and whether the device resumed recording afterwards. Do not re-add the disk to the DVR and do not agree to initialise it again."
            },
            {
              "t": "The DVR or NVR will not work",
              "b": "The problem may be the device, the power supply, the disk, or the storage structure. Do not move the disk to another device that may format it automatically; keep the device, the disk and the power adapter together."
            },
            {
              "t": "Footage exists but will not export or play",
              "b": "The problem may lie in the export format, the player, or the device index rather than the video itself. Keep the original file and the viewer the device produced."
            }
          ]
        },
        {
          "kind": "prose",
          "eyebrow": "Not ordinary files",
          "title": "Where is surveillance footage stored?",
          "paras": [
            "Footage may sit on a disk inside a DVR, a set of disks inside an NVR, a memory card in the camera, a NAS, or a cloud service. The recovery method differs with where it is stored, which is why the camera brand alone is not enough.",
            "Some devices use their own file system and video fragmentation, so clips do not appear as ordinary MP4 files when the disk is connected to a computer. Clips may also be split into fragments tied to an internal index. Work therefore starts by imaging the storage medium, then understanding the device structure and reassembling the clips from that image."
          ]
        },
        {
          "kind": "steps",
          "title": "From disk to a verifiable clip",
          "items": [
            {
              "t": "Preserving the state",
              "b": "Recording is stopped, and the device screen, model, camera count and displayed time are documented. If the case relates to a report or a dispute, settings are not changed and the device is not restarted without coordination."
            },
            {
              "t": "Imaging the storage medium",
              "b": "The disk is read in a way that prevents writing to it. If it is damaged, the reading problem is addressed first, then analysis continues on the image."
            },
            {
              "t": "Establishing the recording structure",
              "b": "The device index, channels, timestamps and video fragments are located. Where the index is missing, the clip structures themselves can be searched, but exact names and dates may be affected."
            },
            {
              "t": "Assembling the period needed",
              "b": "Priority goes to the channel and the critical window, with a margin before and after. The outcome may be a complete clip, scattered fragments, adjacent recordings, or nothing if the data was genuinely overwritten."
            },
            {
              "t": "Verification and handover",
              "b": "Playback is checked and the period and channel are made clear. Where operationally needed, a viewable copy can be handed over while the original extracted copy is retained."
            }
          ]
        },
        {
          "kind": "cards",
          "eyebrow": "Between the extremes",
          "title": "Common cases and likely outcomes",
          "items": [
            {
              "t": "A clip was deleted and recording continued for a few hours",
              "b": "Fragments or the whole clip may survive if new writing never reached its space. The priority is stopping the device and pinning down the time window precisely."
            },
            {
              "t": "Recording continued for days after deletion",
              "b": "The likelihood of overwriting rises, especially with a small disk, many cameras and high resolution. The outcome cannot be inferred from the number of days alone."
            },
            {
              "t": "The disk reads but the device says 'no recordings'",
              "b": "The index or the device database may be damaged while video fragments remain. Do not run repair or format before an image is taken."
            },
            {
              "t": "A DVR disk makes a noise or disappears",
              "b": "The case becomes a damaged-disk recovery first. Do not keep powering the device on: continuous recording and unstable reading meet on the same source."
            },
            {
              "t": "The clip exists at a different time",
              "b": "There may be clock drift or a timezone change. Clips around the expected time are reviewed and compared against known events rather than relying on a single timestamp."
            }
          ]
        },
        {
          "kind": "list",
          "tone": "avoid",
          "eyebrow": "Most damaging",
          "title": "Avoid these steps",
          "items": [
            "Do not restart recording 'just to check'.",
            "Do not initialise or format the disk.",
            "Do not move the disk to another DVR that may reformat it.",
            "Do not update firmware and do not factory reset.",
            "Do not record a test clip on the same channel.",
            "Do not delete or convert the original file if the case is legal — work on a copy.",
            "Do not adjust the device clock before documenting its difference from real time."
          ]
        },
        {
          "kind": "steps",
          "title": "What we need for the initial assessment",
          "items": [
            {
              "t": "The device",
              "b": "Make and full model of the DVR, NVR or camera."
            },
            {
              "t": "Storage",
              "b": "Number of disks and their capacity, and whether it is RAID or a single disk."
            },
            {
              "t": "Channels",
              "b": "How many channels, and which camera and number you need."
            },
            {
              "t": "The time window",
              "b": "The date and time required, with a margin before and after."
            },
            {
              "t": "Clock accuracy",
              "b": "The timezone, and whether the device clock is correct now."
            },
            {
              "t": "Recording mode",
              "b": "Continuous, motion, event-based, or scheduled."
            },
            {
              "t": "Settings",
              "b": "Resolution, frame rate and approximate retention period if known."
            },
            {
              "t": "What happened",
              "b": "Deletion, formatting, a reset, device failure, disk failure or a failed export."
            },
            {
              "t": "Recording since the loss",
              "b": "How much new recording has happened since the clip disappeared."
            },
            {
              "t": "The purpose",
              "b": "Whether there is a legal need or a documented chain of custody."
            }
          ]
        }
      ],
      devicesTitle: "Recorders and surveillance systems we inspect",
      devicesLead: "DVRs and NVRs don't store video as ordinary files; each vendor writes it in its own format. Knowing the device and how it records is the first thing that decides whether the requested clip can be reached.",
      devices: [
        {
          t: "Hikvision recorders",
          b: "Video is written into large preallocated blocks with a separate index of channels and times. When the index is damaged the footage is still on the disk, and it is extracted by following the stream signature itself."
        },
        {
          t: "Dahua recorders",
          b: "Recording is split into fixed segments, each carrying a header that names the channel and the timestamp. That allows clips to be sorted by camera and hour even after the index table is gone."
        },
        {
          t: "Uniview and rebranded recorders",
          b: "Many devices on the market carry different brand names over a shared board and firmware. We identify the actual platform and firmware generation before reading the disk, because the format changes between versions."
        },
        {
          t: "Multi-disk NVR arrays",
          b: "Larger installations spread footage across several disks in a RAID or JBOD group. One missing disk can cut clips in half, so the disks are treated as one set and kept in order."
        },
        {
          t: "Surveillance drives: WD Purple and Seagate SkyHawk",
          b: "These disks are built to write continuously around the clock, which makes sector wear predictable after years of service. A tired drive is imaged with a gentler read strategy before anything is searched inside it."
        },
        {
          t: "On-camera storage",
          b: "Cameras recording to an SD card run a much shorter write loop, so retention is far smaller than on a recorder. Taking the card out immediately is what makes the difference in these cases."
        }
      ],
      stepsTitle: "How we handle missing footage",
      steps: [
        {
          t: "Fix the timeline and the window",
          b: "We record the device model, the channel count and the exact date and hour needed. From disk size, camera count and bitrate we estimate real retention, and whether the window can still be on the disk at all."
        },
        {
          t: "Image the recording drive read-only",
          b: "The disk is disconnected from the recorder and copied in the lab through a read-only interface. It does not go back into the device, because any restart resumes writing from where it stopped."
        },
        {
          t: "Read the recorder's format, or work around it",
          b: "If the index is intact we read it directly. If it is damaged or the device was formatted, we scan the image for video segment signatures and rebuild the channel and timestamp from the segment headers themselves."
        },
        {
          t: "Assemble the clips and hand them over",
          b: "Recovered segments are converted to a format that plays in any player, ordered by channel and date. We state what was found and what does not appear on the disk, and hand over on a separate medium, with an NDA on request."
        }
      ],
      caseTitle: "A typical case: footage requested days after the incident",
      caseBody: "An 8-channel Hikvision recorder from a warehouse reached the lab, with one evening needed and the request made several days later. The device had kept recording throughout that period. We stopped the recording, imaged the disk read-only, then searched the image for the requested channel and time window instead of relying on the device interface, which no longer listed it.",
      caseResult: "In cases like this, part of the time window often comes back viewable, while other parts have already been written over by newer recording. What remains cannot be determined before the disk is read and examined."
    }
  },
  "after-format": {
    ar: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "ابدأ من الفعل",
          "title": "ما الذي حدث بالضبط؟",
          "lead": "كلمة «فورمات» تصف أفعالًا مختلفة جدًّا، ولكلٍّ منها نتيجة مختلفة.",
          "items": [
            {
              "t": "فورمات سريع",
              "b": "ينشئ نظام ملفات جديدًا فيزيل أو يستبدل أجزاء من بيانات الفهرسة، لكنه لا يساوي دائمًا الكتابة على كل قطاع. الفرصة تعتمد على نوع الوسيط وما كُتب بعد العملية."
            },
            {
              "t": "فورمات كامل أو مسح آمن",
              "b": "قد يكتب على مساحة القرص أو يرسل أوامر إزالة للوسيط، وحينها تقلّ الفرص بكثير. نحتاج اسم الأداة ونوع العملية والمدة التي استغرقتها قبل أي تقدير."
            },
            {
              "t": "حذف قسم أو إنشاء قسم جديد",
              "b": "قد تكون بيانات الملفات ما زالت موجودة، لكن معلومات بداية القسم ونظام الملفات تغيّرت. لا تنشئ أقسامًا إضافية ولا تحاول «إصلاح» جدول الأقسام على المصدر."
            },
            {
              "t": "تثبيت نظام جديد",
              "b": "يكتب Windows أو macOS ملفات النظام والتحديثات والملفات المؤقّتة على أجزاء من المساحة القديمة. قد تعود ملفات من المناطق التي لم تُستبدل، بينما تتضرّر بنية المجلدات في المنطقة المستخدمة للتثبيت."
            },
            {
              "t": "حذف عادي أو إفراغ سلة المحذوفات",
              "b": "لا يعني بالضرورة أن محتوى الملف اختفى فورًا، لكن استمرار استخدام الجهاز قد يكتب فوقه. أوقف التطبيقات والمزامنة والتنزيلات ولا تثبّت برنامج استرجاع على القرص نفسه."
            }
          ]
        },
        {
          "kind": "notes",
          "eyebrow": "العامل الحاسم",
          "title": "نوع الوسيط يغيّر النتيجة",
          "items": [
            {
              "t": "HDD",
              "b": "قد تبقى محتويات كثيرة بعد فورمات سريع إذا لم تتمّ الكتابة فوقها. يمكن تحليل بيانات نظام الملفات أو البحث عن الملفات بحسب بنيتها، مع احتمال فقد الأسماء والمجلدات إذا تضرّرت البيانات الوصفية."
            },
            {
              "t": "SSD وNVMe",
              "b": "قد تُرسَل أوامر TRIM للمساحات التي أصبحت غير مستخدمة، فتقلّ فرص الاستعادة. لا يمكن تطبيق نتيجة HDD على SSD، ولا يجوز إعطاء وعد قبل معرفة النظام ونوع العملية وحالة القرص."
            },
            {
              "t": "بطاقات الذاكرة والفلاش",
              "b": "تعتمد النتيجة على وحدة التحكّم ونظام الملفات واستخدام البطاقة بعد الفورمات. التصوير الجديد قد يستبدل المقاطع القديمة بسرعة، وبعض الفيديوهات تحتاج إعادة تجميع حتى لو عادت بياناتها الخام."
            },
            {
              "t": "قرص مشفّر",
              "b": "قد يكون المحتوى القديم مشفّرًا بـBitLocker أو FileVault أو تشفير جهاز آخر. الاستعادة التقنية للقطاعات لا تتجاوز التشفير: يبقى مفتاح الاسترداد أو كلمة المرور مطلوبًا."
            }
          ]
        },
        {
          "kind": "cards",
          "eyebrow": "بين الطرفين",
          "title": "حالات شائعة ونتائج محتملة",
          "items": [
            {
              "t": "‏HDD عليه Quick Format ولم يُستخدم بعده",
              "b": "من الحالات التي تستحقّ الفحص سريعًا. قد تعود البنية أو نسبة كبيرة من الملفات، لكن لا ضمان قبل إنشاء نسخة وتحليلها."
            },
            {
              "t": "تُثبّت Windows بعد الفورمات",
              "b": "قد تكون بعض المناطق استُبدلت بالنظام والتحديثات. تختلف النتيجة من مجلد إلى آخر، وقد تعود ملفات بلا أسماء أو تكون أجزاء منها تالفة."
            },
            {
              "t": "حُذف القسم وأصبح القرص Unallocated",
              "b": "لا تنشئ New Volume ولا تهيّئه. قد يكون جدول الأقسام فقط مفقودًا، ويمكن تحليل بداية ونهاية البنية على نسخة."
            },
            {
              "t": "‏SSD تمّ فورماته واستمرّ استخدامه",
              "b": "تقلّ الفرص بسبب TRIM والكتابة اللاحقة، لكن التقييم يحتاج تفاصيل النظام ونوع العملية. لا نستخدم عبارة «مستحيل» ولا «مضمون» قبل الفحص."
            },
            {
              "t": "بطاقة كاميرا فُرمتت ثم استمرّ التصوير",
              "b": "قد تُستبدل المقاطع بالتسلسل، فتعود تسجيلات أحدث بينما تتضرّر الأقدم. توقّف عن التصوير وحدّد التاريخ والملفات المطلوبة."
            },
            {
              "t": "القرص يطلب فورمات بلا أن يفرمت المستخدم",
              "b": "ليست حالة «بعد الفورمات» بالضرورة: قد يكون نظام الملفات تالفًا أو القرص غير مستقرّ. لا توافق على الرسالة، وتُقيَّم الحالة كعطل منطقي أو مادي."
            }
          ]
        },
        {
          "kind": "list",
          "eyebrow": "صريح",
          "title": "ماذا تتوقّع من النتيجة؟",
          "lead": "هذه هي الاحتمالات الفعلية، لا سيناريو واحد.",
          "items": [
            "قد تعود المجلدات والأسماء كاملة إذا بقيت البيانات الوصفية.",
            "قد تعود الملفات بأسماء عامة ومن دون مساراتها الأصلية.",
            "قد تعود بعض الملفات ناقصة أو غير قابلة للفتح بسبب الكتابة فوق أجزاء منها.",
            "قد يظهر أكثر من إصدار للملف نفسه.",
            "نجاح العثور على ملف لا يعني أنه سليم؛ تُفتح عيّنة موثّقة قبل اعتماد النتيجة.",
            "إذا كُتبت المنطقة فعليًّا، فلا أداة تعيد البتات القديمة منها."
          ]
        },
        {
          "kind": "steps",
          "title": "ما نحتاجه للتقييم الأولي",
          "items": [
            {
              "t": "نوع الوسيط",
              "b": "‏HDD أو SSD أو NVMe أو USB أو SD أو غير ذلك."
            },
            {
              "t": "الشركة والطراز والسعة",
              "b": "ونظام التشغيل المستخدم."
            },
            {
              "t": "ما الذي اختير بالضبط",
              "b": "‏Quick Format أو Full Format أو Reset أو حذف قسم أو غير معروف."
            },
            {
              "t": "نظام الملفات",
              "b": "القديم والجديد إن عُرف: NTFS أو exFAT أو APFS أو HFS+."
            },
            {
              "t": "الوقت والاستخدام",
              "b": "الوقت منذ الفقد، ومقدار الاستخدام، والملفات التي نُسخت بعده."
            },
            {
              "t": "ما ثُبّت على الوسيط",
              "b": "هل ثُبّت نظام أو برنامج استرجاع على الوسيط نفسه."
            },
            {
              "t": "التشفير",
              "b": "هل كان هناك BitLocker أو FileVault أو كلمة مرور."
            },
            {
              "t": "الأولويات",
              "b": "أنواع الملفات والمجلدات والفترة الزمنية المطلوبة."
            },
            {
              "t": "ما جُرّب",
              "b": "البرامج أو أوامر الإصلاح التي شُغّلت."
            }
          ]
        }
      ],
      devicesTitle: "الأجهزة وأنظمة الملفات التي نفحصها بعد الفورمات",
      devicesLead: "الفورمات ليس عملية واحدة. ما يبقى من البيانات يعتمد على نظام الملفات، ونوع التهيئة، والوسيط نفسه. لذلك يبدأ الفحص بتحديد هذه الثلاثة قبل أي قراءة.",
      devices: [
        {
          t: "أقراص Windows بنظام NTFS",
          b: "الفورمات السريع يكتب جدول ملفات جديداً صغيراً فوق بداية القسم فقط، وقد تبقى سجلات جدول الملفات القديم ($MFT) في مكانها. الفورمات الكامل حالة مختلفة تماماً، لأنه يمر على القسم كله."
        },
        {
          t: "فلاش وبطاقات بنظام exFAT وFAT32",
          b: "لا يوجد سجل تغييرات في هذه الأنظمة، وجدول التوزيع صغير ويُعاد كتابته بسرعة. لذلك تُبنى الاستعادة غالباً على تواقيع الملفات، وتكون مقاطع الفيديو المجزأة أصعب جزء فيها."
        },
        {
          t: "أجهزة Mac بنظام APFS وHFS+",
          b: "أمر Erase ينشئ حاوية APFS جديدة، وقد تبقى لقطات Snapshots أو نسخة Time Machine تحمل الملفات سليمة. في أجهزة Apple silicon وT2 يتلف مسح المحتوى والإعدادات مفتاح التشفير، وهذا وحده قد يغيّر الحكم على الحالة."
        },
        {
          t: "سيرفرات ولينكس وأقراص NAS بنظام ext4",
          b: "أمر mkfs يكتب جداول inode جديدة فوق القديمة، لكن النسخ الاحتياطية من الـsuperblock وبقايا الـjournal قد تسمح بإعادة بناء جزء من شجرة المجلدات بأسمائها."
        },
        {
          t: "أقسام محذوفة وجداول GPT وMBR",
          b: "حذف القسم أو أمر clean يغيّر قطاعات قليلة في أول القرص، بينما يبقى نظام الملفات نفسه في مكانه أبعد من ذلك. الخطوة الأولى هي إيجاد حدود القسم القديم، لا إعادة إنشائه."
        },
        {
          t: "أقراص SSD وNVMe بعد التهيئة",
          b: "بعد الفورمات قد يرسل النظام أوامر TRIM تُفرغ الصفحات فعلياً، لا أن تعلّم المساحة كفارغة فقط. لهذا يُفصل القرص عن التشغيل مباشرة، ويُقاس ما إذا كان يعيد أصفاراً قبل أي محاولة."
        }
      ],
      stepsTitle: "كيف نتعامل مع حالة بعد الفورمات",
      steps: [
        {
          t: "قراءة الوسيط مرة واحدة في نسخة كاملة",
          b: "نوصّل الوسيط عبر حاجز كتابة ونأخذ نسخة قطاعية كاملة داخل المختبر. كل ما يلي يجري على النسخة، ولا يُكتب شيء على الوسيط الأصلي."
        },
        {
          t: "البحث عن نظام الملفات القديم أولاً",
          b: "نفتش النسخة عن سجلات الجدول القديم، ونسخ الـboot sector، وحدود الأقسام السابقة. إذا وُجدت، تعود الملفات بأسمائها ومساراتها الأصلية، وهذا أفضل ناتج ممكن في هذه الحالات."
        },
        {
          t: "تحليل بالتواقيع لما لم يعد له فهرس",
          b: "المساحة التي لم يعد يغطيها أي فهرس تُقرأ ببصمات الصيغ: صور RAW وJPEG، مستندات، وفيديو. تعود المحتويات دون أسماء ولا مجلدات، وتُرتّب حسب النوع والتاريخ الداخلي إن وُجد."
        },
        {
          t: "تحقق ثم تسليم على وسيط منفصل",
          b: "نفتح عينات من كل نوع للتأكد أن الملفات سليمة لا مجرد أسماء، ونزيل التكرار. يُسلَّم الناتج على وسيط منفصل، مع بيان بما لم يظهر في النتيجة."
        }
      ],
      caseTitle: "حالة نموذجية: فورمات سريع قبل إعادة تثبيت النظام",
      caseBody: "لابتوب أُعيد تثبيت Windows عليه بعد فورمات سريع، ثم اكتشف صاحبه أن مجلد المستندات والصور لم يكن ضمن النسخة الاحتياطية. أوقف الجهاز بعد ساعات من الاستخدام، وهذا يعني أن النظام الجديد كتب فوق بداية القسم دون بقيته. أخذنا نسخة قطاعية كاملة، ثم بحثنا عن سجلات جدول الملفات القديم خارج المساحة التي شغلها التثبيت الجديد.",
      caseResult: "عاد جزء كبير من الصور والمستندات بأسمائه ومجلداته، وعاد جزء آخر عبر التواقيع دون أسماء. الملفات التي وقعت تحت مساحة التثبيت الجديد لم تكن قابلة للاستعادة. هذه نتيجة حالة واحدة، وتختلف حسب حجم الاستخدام بعد الفورمات."
    },
    en: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "Start from the action",
          "title": "What exactly happened?",
          "lead": "The word 'format' describes very different actions, and each has a different outcome.",
          "items": [
            {
              "t": "Quick format",
              "b": "Creates a new file system, removing or replacing parts of the indexing data, but that is not always the same as writing over every sector. The odds depend on the medium and on what was written afterwards."
            },
            {
              "t": "Full format or secure erase",
              "b": "May write across the disk or send removal commands to the medium, at which point the odds fall sharply. We need the tool's name, the type of operation, and how long it took before any estimate."
            },
            {
              "t": "Deleting or creating a partition",
              "b": "File data may still be there, but the partition start and file system information have changed. Do not create further partitions and do not try to 'repair' the partition table on the source."
            },
            {
              "t": "Installing a new operating system",
              "b": "Windows or macOS writes system files, updates and temporary files over parts of the old space. Files may return from regions that were not overwritten, while the folder structure in the installation area is damaged."
            },
            {
              "t": "Ordinary deletion or emptying the bin",
              "b": "It does not necessarily mean the file's contents vanished at once, but continuing to use the machine can write over them. Stop applications, syncing and downloads, and do not install recovery software onto the same disk."
            }
          ]
        },
        {
          "kind": "notes",
          "eyebrow": "The decisive factor",
          "title": "The medium changes the outcome",
          "items": [
            {
              "t": "HDD",
              "b": "A great deal may survive a quick format if nothing was written over it. File-system metadata can be analysed or files located by their structure, with the possibility of losing names and folders if the metadata was damaged."
            },
            {
              "t": "SSD and NVMe",
              "b": "TRIM commands may be sent for space that became unused, reducing the chance of recovery. An HDD outcome cannot be applied to an SSD, and no promise is justified before the system, the operation and the drive's state are known."
            },
            {
              "t": "Memory cards and flash",
              "b": "The outcome depends on the controller, the file system, and use of the card after formatting. New shooting can overwrite older clips quickly, and some videos need reassembly even when their raw data returns."
            },
            {
              "t": "An encrypted drive",
              "b": "The old contents may be encrypted with BitLocker, FileVault or another device's encryption. Recovering sectors technically does not bypass encryption: the recovery key or password is still required."
            }
          ]
        },
        {
          "kind": "cards",
          "eyebrow": "Between the extremes",
          "title": "Common cases and likely outcomes",
          "items": [
            {
              "t": "An HDD quick-formatted and not used since",
              "b": "One of the cases that deserves prompt examination. The structure or a large share of files may return, but nothing is guaranteed before an image is taken and analysed."
            },
            {
              "t": "Windows installed after the format",
              "b": "Some regions may have been overwritten by the system and its updates. The outcome varies from folder to folder, and files may return without names or with damaged parts."
            },
            {
              "t": "The partition was deleted and the disk shows unallocated",
              "b": "Do not create a new volume and do not format it. Only the partition table may be missing, and the start and end of the structure can be analysed on an image."
            },
            {
              "t": "An SSD was formatted and kept in use",
              "b": "The odds fall because of TRIM and later writing, but assessment needs the system details and the type of operation. We use neither 'impossible' nor 'guaranteed' before examination."
            },
            {
              "t": "A camera card formatted, then shooting continued",
              "b": "Clips may be overwritten in sequence, so newer recordings return while older ones are damaged. Stop shooting and identify the date and the files you need."
            },
            {
              "t": "The disk asks to be formatted without the user formatting it",
              "b": "This is not necessarily an 'after format' case: the file system may be corrupt or the disk unstable. Do not agree to the prompt; the case is assessed as a logical or physical fault."
            }
          ]
        },
        {
          "kind": "list",
          "eyebrow": "Plainly",
          "title": "What to expect from the result",
          "lead": "These are the real possibilities, not a single scenario.",
          "items": [
            "Folders and names may return intact if the metadata survived.",
            "Files may return with generic names and without their original paths.",
            "Some files may return incomplete or unopenable because parts were overwritten.",
            "More than one version of the same file may appear.",
            "Finding a file does not mean it is intact; a documented sample is opened before the result is accepted.",
            "If a region was genuinely overwritten, no tool returns the old bits from it."
          ]
        },
        {
          "kind": "steps",
          "title": "What we need for the initial assessment",
          "items": [
            {
              "t": "Medium type",
              "b": "HDD, SSD, NVMe, USB, SD or something else."
            },
            {
              "t": "Make, model and capacity",
              "b": "And the operating system in use."
            },
            {
              "t": "Exactly what was chosen",
              "b": "Quick format, full format, reset, partition deletion, or unknown."
            },
            {
              "t": "File system",
              "b": "The old and the new, if known: NTFS, exFAT, APFS or HFS+."
            },
            {
              "t": "Time and use",
              "b": "Time since the loss, how much use, and files copied afterwards."
            },
            {
              "t": "What was installed onto it",
              "b": "Whether an operating system or recovery software was installed on the medium itself."
            },
            {
              "t": "Encryption",
              "b": "Whether BitLocker, FileVault or a password was in place."
            },
            {
              "t": "Priorities",
              "b": "File types, folders and the period you need."
            },
            {
              "t": "What was tried",
              "b": "The software or repair commands that were run."
            }
          ]
        }
      ],
      devicesTitle: "The devices and file systems we inspect after a format",
      devicesLead: "A format is not one single operation. What survives depends on the file system, the type of format and the medium itself. So the inspection starts by establishing those three before anything is read.",
      devices: [
        {
          t: "Windows disks on NTFS",
          b: "A quick format writes a small new file table over the start of the partition only, and records from the old file table ($MFT) often survive where they sat. A full format is a different case entirely, because it passes over the whole partition."
        },
        {
          t: "Flash drives and cards on exFAT or FAT32",
          b: "These file systems keep no journal, and the allocation table is small and quickly rewritten. Recovery usually falls back on file signatures, and fragmented video is the hardest part of it."
        },
        {
          t: "Macs on APFS and HFS+",
          b: "Erase builds a new APFS container, and a snapshot or a Time Machine copy may still hold the files intact. On Apple silicon and T2 machines, Erase All Content and Settings destroys the encryption key, and that alone can change the verdict on the case."
        },
        {
          t: "Linux servers and NAS volumes on ext4",
          b: "mkfs writes fresh inode tables over the old ones, but backup superblocks and journal remnants can rebuild part of the directory tree with its original names."
        },
        {
          t: "Deleted partitions, GPT and MBR",
          b: "Deleting a partition, or running clean, changes a handful of sectors at the front of the disk, while the file system itself stays where it was further in. The first move is to locate the old partition boundaries, not to recreate them."
        },
        {
          t: "SSD and NVMe after a format",
          b: "After a format the system may issue TRIM commands that actually clear the pages, rather than only marking the space as free. That is why the disk is taken out of service at once, and tested for whether it now returns zeros before any attempt."
        }
      ],
      stepsTitle: "How a post-format case is handled",
      steps: [
        {
          t: "Read the medium once, into a full image",
          b: "The medium is connected through a write blocker and imaged sector by sector in the lab. Everything after this runs on the image, and nothing is written to the original."
        },
        {
          t: "Look for the old file system first",
          b: "We search the image for records of the previous file table, boot sector copies and earlier partition boundaries. When they are found, files come back with their original names and paths, which is the best possible outcome in these cases."
        },
        {
          t: "Signature analysis for what no longer has an index",
          b: "Space no longer covered by any index is read by format signatures: RAW and JPEG images, documents, video. The contents return without names or folders, sorted by type and by internal date where one exists."
        },
        {
          t: "Verify, then hand over on a separate medium",
          b: "We open samples of every type to confirm the files are intact and not just names, and remove duplicates. The result is handed over on a separate drive, with a statement of what did not appear in it."
        }
      ],
      caseTitle: "A typical case: a quick format before a system reinstall",
      caseBody: "A laptop was reinstalled with Windows after a quick format, and the owner then found the documents and photos folder had never been in the backup. The machine was stopped after a few hours of use, which meant the new system had written over the start of the partition but not the rest of it. We took a full sector image, then searched for records of the old file table outside the space the new installation occupied.",
      caseResult: "A large part of the photos and documents came back with names and folders, and a further part came back through signatures without names. Files that sat under the new installation were not recoverable. This is one case, and the outcome varies with how much the device was used after the format."
    }
  },
  ransomware: {
    ar: {
      /* التوسعة العميقة — خطة العميل 2026-08-20. الكتل اختيارية ويعرضها
         serviceExpansion() بترتيبها هنا، بمفردات تصميم الموقع نفسها.
         ولا ادعاءات قدرة جديدة: قائمة الأنظمة تبقى في devices أعلاه كما
         أقرّها العميل، ولا نِسَب نجاح ولا وعد بفكّ تشفير ولا مشورة قانونية. */
      alert: {
          t: "الإصابة ما زالت نشطة؟ افصل الجهاز عن الشبكة أولًا.",
          b: "افصل كابل الشبكة وأوقف Wi‑Fi وVPN، وافصل وحدات التخزين والنسخ الاحتياطية المتصلة. لا تُطفئ الجهاز إن أمكن عزله وكان فريق الاستجابة متاحًا، فالذاكرة والسجلات قد تساعد في التحليل. وإن تعذّر عزله واستمر التشفير أو الانتشار، اطلب توجيهًا فوريًا.",
          btn: "أحتاج توجيهًا عاجلًا"
        },
        expand: [
          {
            kind: "cards",
            eyebrow: "ابدأ من حالتك",
            title: "أي حالة تصف ما حدث لديك؟",
            lead: "لا تتشابه إصابات الفدية. اختر الأقرب، ويبدأ التقييم من البيانات المتاحة بلا تعديل الملفات الأصلية.",
            items: [
              { t: "ملفات جهاز واحد لا تفتح", b: "ظهرت امتدادات جديدة أو رسالة فدية على كمبيوتر مكتبي أو محمول، وبقية الأجهزة تعمل." },
              { t: "سيرفر أو شبكة شركة توقّفت", b: "تأثّرت مشاركات الشبكة أو حسابات المستخدمين أو أكثر من جهاز في الوقت نفسه." },
              { t: "NAS أو RAID أو تخزين مشترك", b: "تشفّرت الملفات على وحدة تخزين شبكية أو مصفوفة أقراص أو مخزن مركزي." },
              { t: "النسخ الاحتياطية تشفّرت أو حُذفت", b: "النسخ موجودة لكنها لا تفتح، أو حُذفت نقاط الاستعادة واللقطات." },
              { t: "بيئة افتراضية أو ملفات آلات", b: "تأثّرت بيئة VMware أو Hyper‑V أو ملفات الأقراص الافتراضية والأنظمة المستضافة." },
              { t: "تهديد بتسريب البيانات", b: "وصلت رسالة تدّعي سرقة بيانات أو تهدّد بنشرها، سواء حدث تشفير للملفات أو لا." }
            ]
          },
      {
        kind: "cases",
        eyebrow: "حالة نموذجية تشرح المسار",
        title: "ستّ حالات نموذجية من أكثر القطاعات تعرّضًا",
        lead: "القطاعات مأخوذة من بحث التهديدات السعودي: الإنشاءات، التصنيع، التقنية، التجزئة، الصحة، والنقل. وكل حالة تشرح ما فُحص، وما استُعيد، وما لم يُستعد."
      },
          {
            kind: "prose",
            eyebrow: "تعريف قبل أي إجراء",
            title: "ما هو فيروس الفدية؟",
            paras: [
              "فيروس الفدية برمجية خبيثة تمنع الوصول إلى الملفات أو الأنظمة، ثم يطلب المهاجم مقابلًا ماليًا لاستعادة الوصول أو لمنع نشر بيانات يدّعي أنه سرقها. قد يقتصر الهجوم على جهاز واحد، وقد ينتقل عبر الشبكة فيصل إلى السيرفرات ووحدات التخزين المشتركة والنسخ الاحتياطية والخدمات السحابية المتزامنة.",
              "تغيّر امتداد الملف لا يعني أن اسم الامتداد هو مفتاح فك التشفير، ولا أن حذف البرمجية الخبيثة يعيد الملفات تلقائيًا. يبدأ التقييم الصحيح بتحديد نمط الإصابة، وحفظ الأدلة، وفحص مسارات الاستعادة المتاحة من دون الكتابة فوق المصدر."
            ]
          },
          {
            kind: "list",
            eyebrow: "قبل أن تفترض",
            title: "كيف تعرف أن ما حدث قد يكون هجوم فدية؟",
            lead: "المؤشّرات مجتمعة أدقّ من أي مؤشّر منفرد. اقرأها كصورة كاملة لا كقائمة تحقّق.",
            items: [
              "ظهور امتداد جديد على عدد كبير من الملفات.",
              "تعذّر فتح الصور والمستندات وقواعد البيانات رغم بقاء أحجامها.",
              "وجود ملف نصّي أو HTML يتضمّن تعليمات دفع أو وسيلة تواصل.",
              "تغيّر خلفية سطح المكتب أو ظهور شاشة قفل.",
              "توقّف خدمات أو تطبيقات شركة بشكل مفاجئ.",
              "تشفير ملفات على مجلدات مشتركة أو عدة أجهزة في وقت متقارب.",
              "اختفاء نسخ احتياطية أو نقاط استعادة أو لقطات افتراضية.",
              "رسائل تهدّد بنشر بيانات أو بالتواصل مع العملاء والشركاء."
            ],
            warn: {
              label: "انتبه",
              t: "ليس كل عطل يشبه الفدية هجومًا",
              b: "تلف نظام الملفات، وفساد قاعدة البيانات، وخلل مفاتيح التشفير، والتشفير الشرعي مثل BitLocker — كلها قد تُنتج الأعراض نفسها. لذلك لا يُعتمد التشخيص على الامتداد أو الصورة وحدهما."
            }
          },
          {
            kind: "prose",
            eyebrow: "الترتيب يسبق الأدوات",
            title: "الاستعادة تبدأ بتحديد الإصابة، لا بتجربة البرامج",
            paras: [
              "نقارن رسالة الفدية، وامتداد الملفات، ونمط التشفير، وتوقيت الحادث، والملفات التنفيذية والسجلات المتاحة. وقد نطلب عيّنة صغيرة مشفّرة مع نسخة أصلية مطابقة إن توفّرت. هذه المؤشّرات تساعد في تحديد العائلة أو النمط التقني، والتحقّق من وجود أداة موثوقة، أو نسخة احتياطية صالحة، أو إصدار سابق، أو بقايا بيانات غير مشفّرة، أو مسار آخر للاستعادة.",
              "ولا يكفي اسم الامتداد وحده لتحديد العائلة: قد تستخدم عائلات مختلفة الامتداد نفسه، وقد تغيّر العائلة امتداداتها أو رسائلها بين ضحية وأخرى."
            ]
          },
          {
            kind: "accordion",
            eyebrow: "ليست نوعًا واحدًا",
            title: "أنواع هجمات الفدية",
            lead: "يختلف مسار التعامل باختلاف النوع. هذه الأنواع الثمانية تغطّي معظم ما يصل إلينا.",
            items: [
              { t: "فدية تشفير الملفات — Crypto Ransomware", b: "تشفير الملفات أو أجزاء منها مع بقاء النظام قادرًا على العمل أحيانًا. قد تستهدف المستندات والصور وقواعد البيانات والنسخ الاحتياطية وملفات الآلات الافتراضية." },
              { t: "فدية قفل الجهاز — Locker Ransomware", b: "تمنع تسجيل الدخول أو استخدام الجهاز عبر شاشة قفل، من دون أن يعني ذلك بالضرورة تشفير كل ملف. يحتاج التقييم إلى التمييز بين قفل الواجهة وتشفير البيانات فعليًا." },
              { t: "الابتزاز المزدوج — Double Extortion", b: "يدّعي المهاجم سرقة بيانات قبل تشفيرها، ثم يهدّد بالنشر بالإضافة إلى تعطيل الوصول. هنا مهمتان منفصلتان: استعادة التشغيل، والتحقّق من نطاق التسريب والاستجابة النظامية والقانونية." },
              { t: "الابتزاز المتعدّد — Multi/Triple Extortion", b: "قد يضيف المهاجم ضغطًا آخر مثل التواصل مع العملاء أو الشركاء، أو تعطيل الخدمات، أو التهديد بهجوم حجب خدمة. لا يعني فكّ التشفير وحده انتهاء الحادث." },
              { t: "ابتزاز بتسريب البيانات من دون تشفير", b: "في بعض الحوادث يسرق المهاجم بيانات ويطلب المال من دون تشفير الملفات. هذه حالة استجابة لحادث تسريب بيانات، وليست استعادة ملفات فقط." },
              { t: "برمجيات مسح تتظاهر بأنها فدية — Wiper", b: "قد يبدو الهجوم كفدية لكنه يتلف البيانات أو مفاتيحها بقصد التخريب. فرص الاستعادة تختلف جذريًا، ولذلك لا يُوعَد بوجود مفتاح أو فكّ تشفير قبل التحليل." },
              { t: "فدية تستهدف الأنظمة والخوادم", b: "قد تُنفَّذ على Windows أو Linux أو بيئات افتراضية، وقد تشفّر مخازن كبيرة بسرعة. الأولوية هي عزل نقاط الانتشار، وحماية النسخ غير المتأثّرة، ثم تحديد الأنظمة الحرجة وترتيب استعادتها." },
              { t: "نموذج «الفدية كخدمة» — Ransomware as a Service", b: "ليس نوع تشفير مستقلًّا، بل نموذج تشغيل يوفّر فيه مطوّرو أدوات بنية ابتزاز لجهات أخرى تنفّذ الهجمات. قد تظهر اختلافات في الرسائل والامتدادات حتى ضمن العائلة نفسها." }
            ]
          },
          {
            kind: "notes",
            eyebrow: "أكثر من طريق واحد",
            title: "ما الخيارات التي نفحصها قبل الوصول إلى النتيجة؟",
            lead: "لا تعتمد الاستعادة على طريق واحد. نفحص المسارات التالية حسب الحالة، مع العمل على نسخة مطابقة قدر الإمكان والحفاظ على المصدر الأصلي.",
            items: [
              { t: "أداة فكّ تشفير موثوقة", b: "قد تتوفّر أداة معروفة لبعض الإصدارات أو الضحايا. ووجود أداة لعائلة معيّنة لا يعني أنها تعمل مع كل إصدار أو مفتاح، ولذلك تُختبر على نسخة قبل أي تطبيق واسع." },
              { t: "نسخة احتياطية سليمة", b: "يتم التحقّق من تاريخ النسخة واكتمالها وسلامتها، ومن عدم احتوائها على بقايا الاختراق، قبل إعادتها إلى بيئة نظيفة." },
              { t: "الإصدارات السابقة واللقطات", b: "قد توجد نسخ سابقة في نظام التخزين أو الخدمة السحابية أو المنصّة الافتراضية. يجب فحصها قبل مزامنة أو كتابة بيانات جديدة تمحوها." },
              { t: "بقايا الملفات الأصلية", b: "قد يترك أسلوب التشفير نسخًا محذوفة أو مؤقّتة أو أجزاء غير مشفّرة. تعتمد الفرصة على نوع وسيط التخزين، ومقدار الاستخدام بعد الحادث، وخصائص TRIM أو إعادة الكتابة." },
              { t: "استعادة من التطبيق أو قاعدة البيانات", b: "قد تتوفّر سجلّات معاملات، أو نسخ تصدير، أو ملفات مؤقّتة، أو مرفقات ومخرجات تطبيق تساعد في إعادة جزء من البيانات حتى عندما لا يمكن فكّ الملفات مباشرة." },
              { t: "استعادة بيئة افتراضية أو تخزين مركزي", b: "قد يكون المسار عبر ملفات آلة افتراضية، أو لقطات، أو نسخ Replication، أو طبقات تخزين لم تتأثّر بالكامل. يحتاج ذلك إلى فحص البنية وليس ملفًا واحدًا فقط." },
              { t: "استعادة جزئية مرتّبة حسب الأولوية", b: "عندما لا تكون الاستعادة الكاملة ممكنة، تُرتَّب الملفات والأنظمة حسب أولويتها التشغيلية، ثم تُقاس النتيجة ويُتحقَّق من صلاحية الملفات المستعادة." },
              { t: "عدم وجود مسار تقني حالي", b: "بعض الحالات لا يتوفّر لها مفتاح ولا نسخة ولا بقايا قابلة للاستعادة. تُذكر هذه النتيجة بصراحة، مع حفظ نسخة من البيانات المشفّرة لاحتمال ظهور حلّ موثوق مستقبلًا." }
            ],
            warn: {
              label: "الصريح أولًا",
              t: "لا توجد نسبة نجاح ثابتة لفيروس الفدية",
              b: "تعتمد النتيجة على العائلة والإصدار، وطريقة التشفير، وحالة المفتاح، ونوع التخزين، والنسخ الاحتياطية، وحجم الكتابة على الجهاز بعد الحادث. أي رقم يُعطى قبل الفحص تخمين لا تقدير."
            }
          },
          {
            kind: "steps",
            title: "ما الذي نحتاجه لتقييم الحالة؟",
            items: [
              { t: "رسالة الفدية", b: "صورة أو نسخة منها، ويُفضّل الملف النصّي أو HTML الأصلي كما هو." },
              { t: "الامتداد الذي ظهر على الملفات", b: "كما هو تمامًا، بلا تصحيح أو إعادة كتابة." },
              { t: "عيّنة صغيرة مشفّرة", b: "ملف غير حسّاس، ومعه نسخة أصلية مطابقة للعيّنة إن كانت متوفّرة." },
              { t: "نوع الأجهزة والأنظمة", b: "الأجهزة والأنظمة ووسائط التخزين المتأثّرة، وعددها التقريبي." },
              { t: "توقيت الحادث", b: "وقت ملاحظة المشكلة، وآخر وقت كانت فيه الملفات تعمل." },
              { t: "حالة الشبكة والنسخ", b: "هل ما زال أي جهاز متصلًا؟ وهل توجد نسخ احتياطية، وهل كانت متصلة؟" },
              { t: "ما جرى بعد الإصابة", b: "هل شُغّل برنامج تنظيف أو فكّ تشفير أو تهيئة؟ وهل توجد مؤشّرات على وصول غير مصرّح به؟" },
              { t: "أولويات الاستعادة", b: "أيّ الأنظمة والملفات يجب إعطاؤها الأولوية إن تعذّرت الاستعادة الكاملة." }
            ],
            warn: {
              label: "خصوصية",
              t: "لا ترسل ملفات حسّاسة كاملة في أول تواصل",
              b: "ابدأ برسالة الفدية وعيّنة غير حسّاسة، وانتظر تحديد القناة التي تُعتمد للحالة. وأي تفاصيل تقنية إضافية تُجمَع بعد أول تواصل، لا في نموذج طويل قبله."
            }
          },
          {
            kind: "steps",
            title: "من إرسال الحالة إلى التسليم",
            items: [
              { t: "فرز الحالة العاجل", b: "نتحقّق من نشاط الهجوم، ونطاق الأجهزة المتأثّرة، ووجود خطر على أجهزة أو نسخ احتياطية أخرى." },
              { t: "حفظ الأدلة والمصدر", b: "نحدّد ما يجب الاحتفاظ به، ونوصي بالعمل على نسخة من وسيط التخزين متى كان ذلك مناسبًا." },
              { t: "تحديد نمط الإصابة", b: "نفحص رسالة الفدية والامتداد والعيّنات والسجلات والبنية المتأثّرة لتقييم التخمين الأقرب." },
              { t: "اختبار مسارات الاستعادة", b: "نختبر الأدوات الموثوقة والنسخ والإصدارات السابقة وبقايا البيانات أو مسارات التطبيق على نطاق محدود وآمن." },
              { t: "عرض النتيجة والنطاق", b: "نوضّح ما هو ممكن، وما هو غير مؤكّد، والأولويات، والوقت والتكلفة قبل الاستمرار في العمل الكامل." },
              { t: "الاستعادة في بيئة نظيفة", b: "تتمّ الاستعادة إلى وسيط أو بيئة نظيفة، مع عدم إعادة الملفات مباشرة إلى نظام ما زال مخترقًا." },
              { t: "التحقّق والتسليم", b: "تُراجَع سلامة عيّنة موثّقة من الملفات والأنظمة، وتُسلَّم البيانات وفق النطاق المتّفق عليه." },
              { t: "تقليل احتمال التكرار", b: "بعد الاستعادة، يمكن تقديم توصيات عن النسخ الاحتياطية والحسابات والتحديثات والتقسيم الشبكي والمراقبة." }
            ]
          },
          {
            kind: "cards",
            eyebrow: "بين الطرفين",
            title: "ليست كل حالة «فكّ تشفير أو لا شيء»",
            lead: "هذه أنماط شائعة ونتائجها المحتملة. ليست وعودًا، بل توضيح لما يحدث فعليًا بين الحالتين القصوى.",
            items: [
              { t: "أداة موثوقة متاحة للإصدار نفسه", b: "يُجرى اختبار على نسخ من عيّنات محدودة. إن نجح الاختبار مع الحفاظ على سلامة الملف، يمكن توسيع النطاق وفق خطة واضحة." },
              { t: "النسخة الاحتياطية سليمة والبيئة مخترقة", b: "لا تُعاد النسخة فورًا. الأولوية لعزل الاختراق، والتحقّق من النسخة، وتنظيف أو إعادة بناء البيئة، ثم الاستعادة." },
              { t: "النسخ الاحتياطية نفسها مشفّرة", b: "يتم فحص النسخ غير المتصلة، والإصدارات السابقة، والتخزين القديم، وسجلّات النسخ وطبقات الحماية أو اللقطات التي قد لا تكون ظاهرة للمستخدم." },
              { t: "تشفير جزئي أو توقّف الهجوم أثناء التنفيذ", b: "قد تبقى ملفات أو أجزاء أو أجهزة غير متأثّرة. يجب حماية ما تبقّى فورًا، ثم فرز البيانات بدلًا من افتراض أن كل شيء في الحالة نفسها." },
              { t: "قاعدة بيانات أو آلة افتراضية كبيرة لا تفتح", b: "قد يكون الملف الحالي مشفّرًا جزئيًا أو تالفًا. يُقيَّم التشفير أولًا، ثم سلامة البنية الداخلية وإمكانية استخراج بيانات جزئية." },
              { t: "SSD استُخدم بكثافة بعد الإصابة", b: "إعادة الكتابة وخصائص TRIM قد تُقلّلان فرصة استعادة النسخ المحذوفة. لذلك يجب تقليل الاستخدام وعدم تثبيت أدوات على القرص نفسه." },
              { t: "تهديد بتسريب بيانات من دون تشفير", b: "التركيز يكون على احتواء الوصول، وحفظ السجلّات، وتحديد البيانات والحسابات المتأثّرة، والتنسيق مع الأمن السيبراني والشؤون القانونية والجهات المختصة." },
              { t: "لا يوجد حلّ تقني حالي", b: "تُحفظ الملفات المشفّرة ورسالة الفدية ومعلومات الحالة من دون تعديل. قد تظهر أدوات موثوقة لاحقًا لبعض العائلات، لكن لا يمكن ضمان ذلك أو تحديد موعد له." }
            ]
          },
          {
            kind: "list",
            tone: "avoid",
            eyebrow: "الأكثر ضررًا",
            title: "تجنّب الخطوات التي قد تُقلّل فرص الاستعادة",
            lead: "معظم ما يُفقد نهائيًا يُفقد في الساعات الأولى، وبأفعال تبدو معقولة.",
            items: [
              "لا تُهيّئ القرص ولا تعد تثبيت النظام على المصدر الأصلي.",
              "لا تحذف الملفات المشفّرة أو رسالة الفدية أو السجلّات.",
              "لا تغيّر امتداد الملفات يدويًا؛ تغيير الاسم لا يفكّ التشفير.",
              "لا تشغّل أدوات فكّ تشفير من إعلانات أو روابط غير موثوقة.",
              "لا تثبّت برامج على القرص المتضرّر ولا تنسخ إليه ملفات جديدة.",
              "لا تُوصِل النسخ الاحتياطية أو الأقراص السليمة بجهاز مشتبه بإصابته.",
              "لا تبدأ استعادة النسخ إلى الشبكة قبل احتواء الاختراق.",
              "لا تفتح العيّنات على جهاز عمل متصل بالشبكة.",
              "لا تعد تشغيل الأجهزة مرات متكرّرة بلا خطة.",
              "لا تتفاوض أو تدفع قبل تقييم تقني وقانوني وإداري للحادث.",
              "لا تفترض أن حذف البرمجية يعني أن الحسابات أو الشبكة أصبحت آمنة.",
              "لا تعلن تفاصيل حسّاسة عن الحادث علنًا قبل تنسيق الاستجابة."
            ]
          },
          {
            kind: "prose",
            eyebrow: "قرار لا يُختصر",
            title: "الدفع لا يضمن عودة البيانات ولا انتهاء الحادث",
            paras: [
              "قد لا يرسل المهاجم مفتاحًا، وقد تكون أداة الفكّ بطيئة أو تالفة، وقد يستمرّ الابتزاز بسبب نسخة مسروقة من البيانات. كما أن الدفع قد يشجّع على إعادة الاستهداف. لذلك يجب تقييم النسخ الاحتياطية، والأدوات الموثوقة، ونطاق الاختراق ومسارات الاستعادة أولًا، مع إشراف الإدارة والأمن السيبراني والمستشار القانوني والجهات المختصة عند الحاجة.",
              "وحتى عند توفّر أداة فكّ من المهاجم، تبقى الحاجة إلى احتواء الاختراق، وتغيير بيانات الاعتماد، وفحص الأنظمة، والتأكّد من عدم وجود وصول مستمرّ."
            ],
            warn: {
              label: "حدود هذه الصفحة",
              t: "هذه ليست مشورة قانونية",
              b: "الالتزامات تختلف حسب الجهة والأطراف والأنظمة المطبّقة. حدّد ما ينطبق على حالتك مع مسؤول الأمن السيبراني والمستشار القانوني والجهات المختصة."
            }
          },
      {
        kind: "prose",
        eyebrow: "التزامات قد تسري في السعودية",
        title: "الاستعادة مسار، والإشعار النظامي مسار آخر يبدأ مبكرًا",
        paras: [
          "إن تضمّن الحادث بيانات شخصية، فقد تسري مهلة إشعار تبدأ من وقت العلم بالحادثة لا من انتهاء التحليل الفنّي — تنشر منصة حوكمة البيانات الوطنية مهلة لا تتجاوز 72 ساعة وشروط الإشعار. ولهذا يبدأ تقييم الالتزام بالتوازي مع العمل التقني لا بعده.",
          "وضوابط الهيئة الوطنية للأمن السيبراني تتناول النسخ الاحتياطية وإدارة الحوادث واستمرارية الأعمال والأطراف الخارجية — وهي المواضع نفسها التي تحسم نتيجة حادث فدية قبل وقوعه."
        ],
        links: [
          { t: "سدايا — إشعار تسرّب البيانات الشخصية", href: "https://dgp.sdaia.gov.sa/wps/portal/pdp/services/personaldatabreachnotification/" },
          { t: "الهيئة الوطنية للأمن السيبراني — الضوابط الأساسية ECC-2:2024", href: "https://cdn.nca.gov.sa/api/files/public/upload/da829b21-c4ef-4a6e-9f6e-82690d612ee9_ECC-2-2024-.pdf" },
          { t: "الهيئة الوطنية للأمن السيبراني — ضوابط الأنظمة التشغيلية OTCC-1:2022", href: "https://cdn.nca.gov.sa/ar/otcc_ar.pdf" },
          { t: "CISA — StopRansomware Guide", href: "https://www.cisa.gov/resources-tools/resources/stopransomware-guide" }
        ],
        warn: {
          label: "حدود هذه الصفحة",
          t: "إشارة إلى مصادر رسمية، لا مشورة قانونية",
          b: "تختلف الالتزامات حسب نوع الجهة والبيانات والعقود. راجع ما ينطبق على حالتك مع مسؤول الأمن السيبراني والمستشار القانوني والجهات المختصة."
        }
      },
          {
            kind: "list",
            eyebrow: "بعد الاستعادة",
            title: "امنع تكرار نقطة الدخول نفسها",
            lead: "العودة إلى التشغيل ليست نهاية الحادث. إن بقيت نقطة الدخول مفتوحة، قد تتكرّر الإصابة بعد الاستعادة.",
            items: [
              "احتفظ بنسخ احتياطية منفصلة وغير متصلة دائمًا، واختبر الاستعادة دوريًا.",
              "استخدم نسخة غير قابلة للتعديل أو الحذف من حسابات التشغيل اليومية متى أمكن.",
              "فعّل المصادقة متعدّدة العوامل، خصوصًا للبريد وVPN والحسابات الإدارية.",
              "حدّث الأنظمة والتطبيقات وأجهزة الشبكة وفق برنامج واضح.",
              "قلّل صلاحيات المدير وافصل الحسابات الإدارية عن الاستخدام اليومي.",
              "قيّد خدمات الوصول البعيد، ولا تترك RDP أو لوحات الإدارة مكشوفة للإنترنت.",
              "قسّم الشبكة حتى لا ينتقل اختراق جهاز واحد إلى كل الخوادم والنسخ.",
              "راقب محاولات الدخول وإنشاء الحسابات وتعطيل الحماية وحذف النسخ.",
              "استخدم حماية نقاط النهاية والبريد وتصفية المرفقات والروابط.",
              "ضع خطة استجابة تحدّد من يعزل الأنظمة، ومن يتواصل، وما ترتيب الاستعادة.",
              "اختبر استمرارية الأعمال، لا مجرّد نجاح النسخ الاحتياطي.",
              "راجع وصول الأطراف الخارجية والحسابات القديمة والمفاتيح السرّية."
            ]
          }
        ],
      devicesTitle: "الأنظمة والبيئات التي نفحصها بعد التشفير",
      devicesLead: "أثر الفدية يختلف باختلاف ما أصابه. ملف قاعدة بيانات وصورة قرص افتراضي لا يُقرآن كما تُقرأ المستندات. نبدأ بتحديد عائلة التشفير من الامتداد الجديد ورسالة الفدية وبنية الملف المشفر — عائلات مثل LockBit وPhobos وMakop لها بصمات معروفة — ثم نقيس كم شُفّر فعلياً من كل ملف.",
      devices: [
        {
          t: "قواعد بيانات SQL Server",
          b: "ملفات MDF وLDF تكون مفتوحة لدى الخدمة وقت الإصابة، وقد يُشفَّر جزء منها فقط. نسخ BAK الموجودة على نفس الوحدة تُصاب عادة معها. لا تُشغَّل القاعدة قبل فحص تماسك صفحاتها."
        },
        {
          t: "قواعد بيانات MySQL وMariaDB",
          b: "بيانات InnoDB موزعة بين ibdata وملف ibd لكل جدول. تشفير أول صفحات الملف يكسر ترويسة المساحة الجدولية، بينما تبقى صفحات البيانات خلفها قابلة للقراءة في كثير من الحالات، ويجري التعامل معها صفحة صفحة."
        },
        {
          t: "قواعد بيانات Oracle",
          b: "ملفات البيانات وملفات التحكم وسجلات redo يجب أن تعود متسقة زمنياً مع بعضها. نسخ RMAN المخزّنة على نفس المسار تكون غالباً داخل نطاق الإصابة، لذلك يبدأ العمل بجرد ما بقي سليماً قبل أي محاولة فتح."
        },
        {
          t: "صور الأجهزة الافتراضية VMDK وVHDX وqcow2",
          b: "الملفات الكبيرة تُشفَّر أحياناً على شكل مقاطع متباعدة لا من طرف إلى طرف. يعني ذلك أن نظام ملفات الضيف داخل الصورة قد يكون سليماً في مساحات واسعة، ويمكن قراءته من داخل الصورة دون تشغيل الجهاز الافتراضي."
        },
        {
          t: "خوادم البريد Exchange",
          b: "قاعدة EDB وسجلات المعاملات مرتبطة ببعضها، وقاعدة أُغلقت إغلاقاً غير نظيف لا تُعالج بأمر إصلاح سريع. ملفات OST على أجهزة الموظفين قد تحمل نسخة من صناديق البريد لم تصلها الإصابة."
        },
        {
          t: "النسخ الاحتياطية وأقراص NAS",
          b: "أغلب العائلات تحذف نسخ Shadow Copies وتستهدف مستودعات النسخ ومشاركات NAS المتصلة. النسخة المحذوفة ليست بالضرورة نسخة ضائعة، إذ يمكن فحص وحدة التخزين بحثاً عن بقايا الملفات المحذوفة قبل الكتابة فوقها."
        }
      ],
      stepsTitle: "كيف نتعامل مع حالة تشفير",
      steps: [
        {
          t: "عزل ونسخ قبل أي تحليل",
          b: "لا يجري أي عمل على النظام المصاب. نأخذ نسخاً قطاعية للأقراص أو لصور الأجهزة الافتراضية داخل المختبر، ونحتفظ برسالة الفدية وعينة من الملفات المشفرة كما هي."
        },
        {
          t: "قياس نمط التشفير لا افتراضه",
          b: "نقارن ملفاً مشفراً بنسخة أصلية من نفس الصيغة، ونحدد أي بايتات تغيّرت وأين تقف. هذه المقارنة تكشف هل الملف مشفّر بالكامل أم أن جزءاً منه فقط تغيّر، وهي التي تحدد إن كان في الحالة شيء يمكن العمل عليه أصلاً."
        },
        {
          t: "استخراج ما لم يمسّه التشفير",
          b: "كثير من البرامج تكتب ملفاً جديداً مشفراً ثم تحذف الأصلي، فتبقى الأصول المحذوفة في المساحة غير المخصصة. نبحث عنها، وعن لقطات النظام والنسخ المؤقتة وسجلات المعاملات والإصدارات الأقدم، وعن المقاطع السليمة داخل ملفات قواعد البيانات والصور الافتراضية."
        },
        {
          t: "إعادة بناء ثم تسليم معزول",
          b: "تُعاد قواعد البيانات من الصفحات السليمة وتُختبر قابلية فتحها قبل التسليم، وتُقرأ الأقراص الافتراضية المعاد بناؤها للتأكد من شجرة الملفات. التسليم على وسيط منفصل، ونوقّع اتفاقية عدم إفصاح عند الطلب."
        }
      ],
      caseTitle: "حالة نموذجية: سيرفر ملفات وقاعدة بيانات في إصابة واحدة",
      caseBody: "شركة صغيرة استيقظت على امتداد جديد على كل الملفات، ورسالة فدية في كل مجلد. مشاركة NAS كانت متصلة بالسيرفر وقت الإصابة فأصابها التشفير كذلك، ونسخ Shadow Copies كانت محذوفة. أوقفنا كل شيء وأخذنا نسخاً قطاعية، ثم قارنّا الملفات المشفرة بأصول من نفس الصيغة، وفحصنا المساحة غير المخصصة على السيرفر وعلى وحدة NAS بحثاً عن أصول حُذفت بعد التشفير.",
      caseResult: "عاد جزء من المستندات من أصول محذوفة، وأمكن بناء قاعدة البيانات من صفحات لم يمسّها التشفير ومن نسخة أقدم على وحدة أخرى. ملفات أخرى بقيت مشفرة بلا مصدر بديل. هذه الحصة لا تُعرف قبل الفحص، وتختلف من إصابة إلى أخرى."
    },
    en: {
      /* مرآة العربية كتلةً بكتلة — نفس الترتيب ونفس الأعداد. */
      alert: {
          t: "Is the infection still active? Disconnect the machine from the network first.",
          b: "Unplug the network cable, turn off Wi-Fi and VPN, and disconnect attached storage and backups. Do not power the machine off if it can be isolated and a response team is available, because memory and logs may help the analysis. If it cannot be isolated and encryption or spread continues, ask for immediate guidance.",
          btn: "I need urgent guidance"
        },
        expand: [
          {
            kind: "cards",
            eyebrow: "Start from your case",
            title: "Which case describes what happened to you?",
            lead: "Ransomware incidents are not alike. Pick the closest one, and the assessment starts from the available evidence without altering the original files.",
            items: [
              { t: "One machine's files will not open", b: "New extensions or a ransom note appeared on a desktop or laptop, and the rest of the machines are working." },
              { t: "A company server or network stopped", b: "Network shares, user accounts, or more than one machine were affected at the same time." },
              { t: "NAS, RAID or shared storage", b: "Files were encrypted on network-attached storage, a disk array, or central storage." },
              { t: "Backups encrypted or deleted", b: "The backups exist but will not open, or restore points and snapshots were deleted." },
              { t: "Virtual environment or VM files", b: "A VMware or Hyper-V environment, virtual disk files, or hosted systems were affected." },
              { t: "Threat to leak data", b: "A message arrived claiming data was stolen or threatening to publish it, whether or not files were encrypted." }
            ]
          },
      {
        kind: "cases",
        eyebrow: "An illustrative case explaining the route",
        title: "Six illustrative cases from the most targeted sectors",
        lead: "The sectors come from the Saudi threat research: construction, manufacturing, technology, retail, health and logistics. Each case sets out what was examined, what came back, and what did not."
      },
          {
            kind: "prose",
            eyebrow: "Definition before action",
            title: "What is ransomware?",
            paras: [
              "Ransomware is malicious software that blocks access to files or systems, after which the attacker demands payment to restore access or to withhold data they claim to have stolen. An attack may stay on a single machine, or move across the network to reach servers, shared storage, backups, and synchronised cloud services.",
              "A changed file extension does not mean the extension name is the decryption key, nor does removing the malware bring the files back on its own. A sound assessment starts by identifying the pattern of infection, preserving the evidence, and examining the available recovery paths without writing over the source."
            ]
          },
          {
            kind: "list",
            eyebrow: "Before you assume",
            title: "How do you know what happened might be a ransomware attack?",
            lead: "The indicators are more reliable together than any one of them alone. Read them as a whole picture, not a checklist.",
            items: [
              "A new extension appearing on a large number of files.",
              "Images, documents and databases failing to open while their sizes stay the same.",
              "A text or HTML file containing payment instructions or a contact method.",
              "The desktop wallpaper changing, or a lock screen appearing.",
              "Company services or applications stopping suddenly.",
              "Files encrypted across shared folders or several machines at around the same time.",
              "Backups, restore points, or virtual snapshots disappearing.",
              "Messages threatening to publish data or to contact your customers and partners."
            ],
            warn: {
              label: "Careful",
              t: "Not every fault that looks like ransomware is an attack",
              b: "File-system corruption, a damaged database, lost encryption keys, and legitimate encryption such as BitLocker can all produce the same symptoms. That is why diagnosis never rests on the extension or a screenshot alone."
            }
          },
          {
            kind: "prose",
            eyebrow: "Order before tools",
            title: "Recovery starts by identifying the infection, not by trying software",
            paras: [
              "We compare the ransom note, the file extension, the encryption pattern, the timing of the incident, and the executables and logs available. We may ask for a small encrypted sample together with a matching original file if you have one. These indicators help identify the family or the technical pattern, and establish whether there is a trustworthy tool, a valid backup, an earlier version, unencrypted remnants, or another route to recovery.",
              "The extension name alone is not enough to identify the family: different families may use the same extension, and a family may change its extensions or messages from one victim to the next."
            ]
          },
          {
            kind: "accordion",
            eyebrow: "Not one single thing",
            title: "Types of ransomware attack",
            lead: "The route differs with the type. These eight cover most of what reaches us.",
            items: [
              { t: "File-encrypting ransomware — Crypto", b: "Encrypts files or parts of them while the system sometimes keeps working. It may target documents, images, databases, backups, and virtual machine files." },
              { t: "Device-locking ransomware — Locker", b: "Blocks sign-in or use of the machine behind a lock screen, without that necessarily meaning every file is encrypted. The assessment has to separate a locked interface from data that is genuinely encrypted." },
              { t: "Double extortion", b: "The attacker claims to have stolen data before encrypting it, then threatens publication as well as blocking access. That is two separate jobs: restoring operations, and establishing the scope of the leak alongside the regulatory and legal response." },
              { t: "Multi or triple extortion", b: "The attacker may add further pressure such as contacting customers or partners, disrupting services, or threatening a denial-of-service attack. Decryption alone does not end the incident." },
              { t: "Data-leak extortion without encryption", b: "In some incidents the attacker steals data and demands payment without encrypting anything. That is a data-breach response case, not only a file recovery one." },
              { t: "Wipers disguised as ransomware", b: "The attack may look like ransomware while actually destroying the data or its keys for sabotage. The odds of recovery are fundamentally different, which is why no key or decryption is promised before analysis." },
              { t: "Ransomware targeting systems and servers", b: "It may run on Windows, Linux, or virtual environments, and can encrypt large stores quickly. The priority is isolating the points of spread, protecting unaffected copies, then identifying critical systems and the order in which to restore them." },
              { t: "Ransomware as a Service", b: "Not a distinct encryption type but an operating model, in which tool developers supply an extortion infrastructure to other groups who carry out the attacks. Messages and extensions can vary even within the same family." }
            ]
          },
          {
            kind: "notes",
            eyebrow: "More than one route",
            title: "Which options do we examine before reaching a result?",
            lead: "Recovery does not rest on a single route. We examine the following paths as the case allows, working on a matching copy wherever possible and preserving the original source.",
            items: [
              { t: "A trustworthy decryption tool", b: "A known tool may exist for certain builds or victims. A tool existing for a family does not mean it works with every build or key, so it is tested on a copy before any wider use." },
              { t: "An intact backup", b: "The backup's date, completeness and integrity are verified, along with the absence of any remnants of the breach, before it is restored into a clean environment." },
              { t: "Earlier versions and snapshots", b: "Earlier copies may exist in the storage system, the cloud service, or the virtualisation platform. They must be examined before any sync or new write erases them." },
              { t: "Remnants of the original files", b: "The encryption method may leave deleted or temporary copies, or unencrypted fragments. The odds depend on the storage medium, how much the device was used after the incident, and TRIM or overwriting behaviour." },
              { t: "Recovery from the application or database", b: "Transaction logs, export copies, temporary files, attachments, or application output may help return part of the data even when the files themselves cannot be decrypted directly." },
              { t: "Virtual environment or central storage", b: "The route may run through virtual machine files, snapshots, replication copies, or storage layers that were not fully affected. That calls for examining the structure, not a single file." },
              { t: "Partial recovery ordered by priority", b: "Where full recovery is not possible, files and systems are ordered by operational priority, then the result is measured and the recovered files checked for validity." },
              { t: "No current technical route", b: "Some cases have no key, no copy, and no recoverable remnants. That result is stated plainly, and a copy of the encrypted data is preserved in case a trustworthy solution appears later." }
            ],
            warn: {
              label: "Plainly",
              t: "There is no fixed success rate for ransomware",
              b: "The outcome depends on the family and build, the encryption method, the state of the key, the storage type, the backups, and how much was written to the machine after the incident. Any figure given before inspection is a guess, not an estimate."
            }
          },
          {
            kind: "steps",
            title: "What do we need to assess the case?",
            items: [
              { t: "The ransom note", b: "A photograph or copy, ideally the original text or HTML file exactly as it is." },
              { t: "The extension that appeared", b: "Exactly as it appears, with no correction or retyping." },
              { t: "A small encrypted sample", b: "A non-sensitive file, together with a matching original of that same file if you have one." },
              { t: "Device and system types", b: "The devices, systems and storage media affected, and roughly how many." },
              { t: "Timing of the incident", b: "When the problem was noticed, and the last time the files were working." },
              { t: "Network and backup state", b: "Is any machine still connected? Do backups exist, and were they connected?" },
              { t: "What happened after the infection", b: "Was a cleanup, decryption or formatting tool run? Are there signs of unauthorised access?" },
              { t: "Recovery priorities", b: "Which systems and files should come first if full recovery is not possible." }
            ],
            warn: {
              label: "Privacy",
              t: "Do not send whole sensitive files in first contact",
              b: "Start with the ransom note and a non-sensitive sample, and wait until the channel for the case is agreed. Further technical detail is gathered after first contact, not in a long form before it."
            }
          },
          {
            kind: "steps",
            title: "From sending the case to handover",
            items: [
              { t: "Urgent triage", b: "We establish whether the attack is still active, the scope of affected machines, and any risk to other machines or backups." },
              { t: "Preserving evidence and source", b: "We identify what must be kept, and recommend working from an image of the storage medium where that is appropriate." },
              { t: "Identifying the pattern", b: "We examine the ransom note, extension, samples, logs, and affected structure to assess the closest match." },
              { t: "Testing recovery paths", b: "We test trustworthy tools, backups, earlier versions, data remnants, or application routes on a limited and safe scope." },
              { t: "Presenting result and scope", b: "We set out what is possible, what is uncertain, the priorities, and the time and cost before continuing with the full job." },
              { t: "Recovery into a clean environment", b: "Data is recovered onto a clean medium or environment, and files are not returned directly to a system that is still compromised." },
              { t: "Verification and handover", b: "A documented sample of files and systems is checked for integrity, and the data is handed over within the agreed scope." },
              { t: "Reducing the chance of recurrence", b: "After recovery we can give recommendations on backups, accounts, patching, network segmentation, and monitoring." }
            ]
          },
          {
            kind: "cards",
            eyebrow: "Between the extremes",
            title: "Not every case is decryption or nothing",
            lead: "These are common patterns and their likely outcomes. Not promises — an account of what actually happens between the two extremes.",
            items: [
              { t: "A trustworthy tool exists for the same build", b: "Testing is carried out on copies of a limited set of samples. If the test succeeds while file integrity holds, the scope can be widened under a clear plan." },
              { t: "The backup is intact but the environment is compromised", b: "The backup is not restored straight away. The priority is isolating the breach, verifying the backup, cleaning or rebuilding the environment, and then restoring." },
              { t: "The backups themselves are encrypted", b: "We examine offline copies, earlier versions, older storage, backup logs, and protection layers or snapshots that may not be visible to the user." },
              { t: "Partial encryption, or the attack stopped mid-run", b: "Files, fragments or whole machines may be untouched. What remains must be protected immediately, then the data triaged rather than assumed to be all in the same state." },
              { t: "A large database or VM will not open", b: "The current file may be partially encrypted or corrupted. Encryption is assessed first, then internal structural integrity and whether partial extraction is possible." },
              { t: "An SSD used heavily after infection", b: "Overwriting and TRIM can reduce the chance of recovering deleted copies. Usage should therefore be minimised, and no tools installed onto that disk." },
              { t: "A leak threat with no encryption", b: "The focus is containing access, preserving logs, identifying the affected data and accounts, and coordinating with cyber security, legal counsel, and the relevant authorities." },
              { t: "No current technical solution", b: "The encrypted files, the ransom note, and the case details are preserved unmodified. Trustworthy tools may appear later for some families, but that cannot be guaranteed or dated." }
            ]
          },
          {
            kind: "list",
            tone: "avoid",
            eyebrow: "Most damaging",
            title: "Avoid the steps that can reduce the chance of recovery",
            lead: "Most of what is lost for good is lost in the first hours, through actions that look reasonable.",
            items: [
              "Do not format the disk or reinstall the system onto the original source.",
              "Do not delete the encrypted files, the ransom note, or the logs.",
              "Do not rename file extensions by hand; renaming does not decrypt anything.",
              "Do not run decryption tools from adverts or untrusted links.",
              "Do not install software onto the affected disk or copy new files to it.",
              "Do not connect backups or healthy disks to a machine you suspect is infected.",
              "Do not start restoring backups to the network before the breach is contained.",
              "Do not open samples on a work machine that is connected to the network.",
              "Do not keep power-cycling the machines without a plan.",
              "Do not negotiate or pay before a technical, legal and management assessment.",
              "Do not assume that removing the malware makes the accounts or network safe.",
              "Do not disclose sensitive incident details publicly before the response is coordinated."
            ]
          },
          {
            kind: "prose",
            eyebrow: "Not a shortcut",
            title: "Paying does not guarantee the data back, nor the end of the incident",
            paras: [
              "The attacker may not send a key, the decryption tool may be slow or faulty, and the extortion may continue because of a stolen copy of the data. Payment can also encourage repeat targeting. Backups, trustworthy tools, the scope of the breach, and the recovery paths should therefore be assessed first, with oversight from management, cyber security, legal counsel, and the relevant authorities where needed.",
              "Even where a decryption tool is supplied by the attacker, the breach still has to be contained, credentials changed, systems examined, and continued access ruled out."
            ],
            warn: {
              label: "Limits of this page",
              t: "This is not legal advice",
              b: "Obligations differ by organisation, the parties involved, and the regulations that apply. Establish what applies to your case with your cyber security lead, legal counsel, and the relevant authorities."
            }
          },
      {
        kind: "prose",
        eyebrow: "Obligations that may apply in Saudi Arabia",
        title: "Recovery is one track; regulatory notification is another that starts early",
        paras: [
          "If the incident touched personal data, a notification period may run from the moment you become aware of it rather than from the end of the technical analysis — the National Data Governance Platform publishes a period of no more than 72 hours along with the notification conditions. That is why assessing the obligation runs alongside the technical work rather than after it.",
          "The National Cybersecurity Authority's controls cover backups, incident management, business continuity and third parties — the same places that decide the outcome of a ransomware incident before it happens."
        ],
        links: [
          { t: "SDAIA — Personal data breach notification", href: "https://dgp.sdaia.gov.sa/wps/portal/pdp/services/personaldatabreachnotification/" },
          { t: "National Cybersecurity Authority — Essential Controls ECC-2:2024", href: "https://cdn.nca.gov.sa/api/files/public/upload/da829b21-c4ef-4a6e-9f6e-82690d612ee9_ECC-2-2024-.pdf" },
          { t: "National Cybersecurity Authority — Operational Technology Controls OTCC-1:2022", href: "https://cdn.nca.gov.sa/ar/otcc_ar.pdf" },
          { t: "CISA — StopRansomware Guide", href: "https://www.cisa.gov/resources-tools/resources/stopransomware-guide" }
        ],
        warn: {
          label: "Limits of this page",
          t: "A pointer to official sources, not legal advice",
          b: "Obligations differ by organisation type, data and contracts. Review what applies to your case with your cyber security lead, legal counsel and the relevant authorities."
        }
      },
          {
            kind: "list",
            eyebrow: "After recovery",
            title: "Close the entry point so it is not used again",
            lead: "Returning to operation is not the end of the incident. If the entry point stays open, the infection can return after recovery.",
            items: [
              "Keep separate, offline backups at all times, and test restoring them regularly.",
              "Use a copy that day-to-day operational accounts cannot modify or delete, wherever possible.",
              "Enable multi-factor authentication, especially for email, VPN, and administrative accounts.",
              "Patch systems, applications and network devices under a clear programme.",
              "Reduce administrator rights and separate admin accounts from daily use.",
              "Restrict remote access services; do not leave RDP or management panels exposed to the internet.",
              "Segment the network so one compromised machine cannot reach every server and backup.",
              "Monitor sign-in attempts, account creation, protection being disabled, and backup deletions.",
              "Use endpoint and email protection with attachment and link filtering.",
              "Set out a response plan naming who isolates systems, who communicates, and the order of recovery.",
              "Test business continuity, not merely that the backup job succeeded.",
              "Review third-party access, dormant accounts, and secret keys."
            ]
          }
        ],
      devicesTitle: "The systems and environments we inspect after encryption",
      devicesLead: "What ransomware leaves behind depends on what it hit. A database file and a virtual disk image are not read the way documents are read. We start by identifying the encryptor family from the new extension, the ransom note and the structure of an encrypted file — families such as LockBit, Phobos and Makop leave known markers — then measure how much of each file was actually encrypted.",
      devices: [
        {
          t: "SQL Server databases",
          b: "MDF and LDF files are held open by the service at the moment of infection, and only part of them may be encrypted. BAK copies sitting on the same volume are usually hit along with them. The database should not be started before its page consistency is inspected."
        },
        {
          t: "MySQL and MariaDB databases",
          b: "InnoDB data is split between ibdata and a per-table ibd file. Encrypting the first pages breaks the tablespace header, while the data pages behind it stay readable in many cases and are handled page by page."
        },
        {
          t: "Oracle databases",
          b: "Data files, control files and redo logs have to come back consistent with each other in time. RMAN copies kept on the same mount are usually inside the blast radius, so the work starts with an inventory of what survived intact, before anything is opened."
        },
        {
          t: "Virtual disk images: VMDK, VHDX, qcow2",
          b: "Large files are sometimes encrypted in spaced intervals rather than end to end. That means the guest file system inside the image can be intact across wide regions, and can be read from within the image without booting the virtual machine."
        },
        {
          t: "Exchange mail servers",
          b: "The EDB database and its transaction logs belong together, and a database left in a dirty shutdown is not fixed by a quick repair command. OST files on staff machines may hold a copy of the mailboxes the infection never reached."
        },
        {
          t: "Backups and NAS storage",
          b: "Most families delete shadow copies and go after backup repositories and any mounted NAS share. A deleted backup is not necessarily a lost one, as the volume can be inspected for remnants of the deleted files before they are overwritten."
        }
      ],
      stepsTitle: "How an encryption case is handled",
      steps: [
        {
          t: "Isolate and image before any analysis",
          b: "No work happens on the infected system. We take sector images of the disks or of the virtual machine images in the lab, and keep the ransom note and a sample of the encrypted files exactly as they are."
        },
        {
          t: "Measure the encryption pattern, do not assume it",
          b: "We compare an encrypted file against an original of the same format and identify which bytes changed and where they stop. That comparison shows whether the file is encrypted end to end or only in part, and it is what decides whether there is anything in the case to work with at all."
        },
        {
          t: "Extract what the encryption never touched",
          b: "Many programs write a new encrypted file and then delete the original, leaving those originals in unallocated space. We look for them, for system snapshots, temporary copies, transaction logs and older versions, and for the untouched regions inside database files and virtual disk images."
        },
        {
          t: "Rebuild, then hand over in isolation",
          b: "Databases are rebuilt from the intact pages and tested for whether they open before handover, and reconstructed virtual disks are read to confirm the file tree. Handover is on a separate medium, and we sign an NDA on request."
        }
      ],
      caseTitle: "A typical case: a file server and a database in one infection",
      caseBody: "A small company woke up to a new extension on every file and a ransom note in every folder. A NAS share was mounted to the server at the time, so it was encrypted as well, and the shadow copies had been deleted. We stopped everything and took sector images, compared the encrypted files against originals in the same format, and searched unallocated space on both the server and the NAS unit for originals deleted after encryption.",
      caseResult: "Part of the documents came back from deleted originals, and the database was rebuilt from pages the encryption had not reached, together with an older copy on another unit. Other files stayed encrypted with no alternative source. That share cannot be known before inspection, and it differs from one infection to the next."
    }
  },
  phones: {
    ar: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "ابدأ من الحالة",
          "title": "اختر الحالة الأقرب",
          "lead": "التشفير في الأجهزة الحديثة يجعل ترتيب الخطوات أهمّ من سرعتها.",
          "items": [
            {
              "t": "يعمل لكن الشاشة أو اللمس متعطّل",
              "b": "قد يكون المسار إصلاح الوصول المؤقّت إلى الشاشة أو منفذ البيانات، مع بقاء رمز القفل ضروريًّا في الأجهزة المشفّرة. لا تعمل Reset ولا تغيّر الحساب."
            },
            {
              "t": "لا يعمل بعد ماء أو سقوط",
              "b": "لا تشحنه ولا تستخدم حرارة. نحتاج معرفة متى وقع الحادث وهل شُغّل أو شُحن بعده، فالتيّار والتآكل قد يفعلان أكثر من مدّة ملامسة الماء."
            },
            {
              "t": "عالق على الشعار أو يعيد التشغيل",
              "b": "قد تكون المشكلة برمجية أو في التخزين أو اللوحة. لا تعمل Restore أو Factory Reset إذا كانت البيانات في الأولوية، ولا تثبّت تحديثًا قبل تقييم أثره."
            },
            {
              "t": "حُذفت صور أو تمّ ضبط المصنع",
              "b": "تستخدم الهواتف الحديثة تشفيرًا مرتبطًا بالجهاز ورمز القفل، وبعد ضبط المصنع قد تُفقَد مفاتيح الوصول إلى البيانات القديمة. تُراجَع النسخ السحابية والمحلّية أولًا."
            },
            {
              "t": "يعمل ويُفتح لكن البيانات داخل تطبيق",
              "b": "تختلف إمكانية التصدير حسب التطبيق وإصداره والحساب والتشفير. لا نعد باسترجاع محادثات أو بيانات تطبيق بعينه قبل التحقّق من طريقة تخزينه والنسخ المتاحة."
            }
          ]
        },
        {
          "kind": "prose",
          "eyebrow": "توقّع واقعي",
          "title": "ما الذي يمكن تسليمه؟",
          "paras": [
            "عندما يمكن تشغيل الجهاز وفتحه بصورة مستقرّة، قد يشمل التسليم الصور والفيديوهات والمستندات وجهات الاتصال والملفات المتاحة للتصدير. أما بيانات التطبيقات والمحادثات فليست ملفًّا واحدًا دائمًا: بعضها مشفّر داخل الجهاز أو مرتبط بالحساب أو مخزّن في السحابة، ولذلك تُحدَّد النتيجة لكلّ نوع على حدة.",
            "والهدف في حالة اللوحة المتضرّرة هو إيقاع مستقرّ يكفي للوصول إلى البيانات، وليس بالضرورة إعادة الهاتف للاستخدام اليومي. وقد تتطلّب العملية فتح الجهاز أو العمل على اللوحة، ويجب توضيح أثر ذلك على الضمان أو مقاومة الماء أو قابلية الاستخدام قبل البدء."
          ]
        },
        {
          "kind": "steps",
          "title": "ما نحتاجه للتقييم الأولي",
          "items": [
            {
              "t": "الجهاز",
              "b": "الشركة والطراز الكامل وسعة الجهاز."
            },
            {
              "t": "نظام التشغيل",
              "b": "التقريبي إن عُرف."
            },
            {
              "t": "ما حدث ومتى",
              "b": "ماء، سقوط، حرارة، تحديث، حذف أو Reset."
            },
            {
              "t": "ما جرى بعد الحادث",
              "b": "هل شُغّل أو شُحن أو فُتح أو أُصلح."
            },
            {
              "t": "سلوك الجهاز",
              "b": "هل يلمع أو يهتزّ أو يصدر صوتًا أو يتصل بالحاسب."
            },
            {
              "t": "رمز القفل",
              "b": "هل هو معروف ويمكن إدخاله."
            },
            {
              "t": "النسخ الاحتياطية",
              "b": "وجود نسخة iCloud أو Google أو نسخة حاسب، وآخر مزامنة."
            },
            {
              "t": "أولوية البيانات",
              "b": "صور، فيديو، جهات اتصال، مستندات أو تطبيق محدّد."
            },
            {
              "t": "إثبات الملكية",
              "b": "عند الحاجة — ومن دون إرسال كلمات مرور الحساب في نموذج أوّلي."
            }
          ]
        }
      ],
      devicesTitle: "كل جوال له طريقة وصول مختلفة.",
      devicesLead: "الماركة تحدد نوع الذاكرة وطريقة التشفير، وهما يحددان ما يمكن الوصول إليه وما لا يمكن. هذه أكثر الأجهزة التي تصل المختبر.",
      devices: [
        {
          t: "iPhone",
          b: "بيانات iPhone مشفّرة بمفاتيح داخل الشريحة ومرتبطة باللوحة نفسها، لذلك لا يمكن قراءة الجهاز بنقل الذاكرة وحدها. المسار الوحيد هو إعادة اللوحة إلى حالة إقلاع، ثم الفتح برمز العميل."
        },
        {
          t: "Samsung Galaxy",
          b: "الأجهزة الحديثة تستخدم ذاكرة UFS مع مفاتيح محمية بالعتاد، بينما ما زالت بعض الفئات الاقتصادية على eMMC. نوع الذاكرة هو ما يحدد إن كانت القراءة المباشرة خياراً أصلاً."
        },
        {
          t: "Xiaomi وRedmi وPOCO",
          b: "النتيجة تختلف حسب إصدار Android والمنصة وحالة القفل. مع bootloader مقفل وتشفير مفعّل لا توجد أداة تتجاوز ذلك، والفحص يحدد ما تبقى من مسارات."
        },
        {
          t: "Huawei وHonor",
          b: "معالج وبنية تخزين خاصة وتقسيم مختلف عن باقي أجهزة Android. نبدأ بتحديد الطراز وبنية الأقسام قبل أي محاولة قراءة، لأن الأداة الخاطئة قد تكتب على الجهاز."
        },
        {
          t: "eMMC مقابل UFS",
          b: "ذاكرة eMMC في الأجهزة الأقدم يمكن أحياناً قراءتها عبر نقاط اختبار أو بعد فكها. أما UFS فواجهة تسلسلية عالية السرعة، والقراءة المباشرة فيها محدودة وتحتاج معدات دقيقة ولوحة سليمة."
        },
        {
          t: "اللوحة المتضررة والعمل بمستوى اللحام",
          b: "حالات الماء والسقوط تُعالج تحت المجهر: إزالة التآكل، قياس مسارات الطاقة، وإصلاح ما يمنع الإقلاع. نقل الذاكرة إلى لوحة أخرى لا ينفع وحده، لأن المفاتيح مرتبطة باللوحة الأصلية."
        }
      ],
      stepsTitle: "ما يحدث للجوال داخل المختبر",
      steps: [
        {
          t: "استقبال بلا تشغيل",
          b: "لا نشغّل الجهاز عند الاستلام. نفتحه ونفصل البطارية أولاً، ونوثّق حالة اللوحة. في حالات الماء يبدأ العمل بتنظيف اللوحة وإيقاف التآكل قبل أي قياس."
        },
        {
          t: "قياس اللوحة قبل اللحام",
          b: "نقيس خطوط الطاقة وسحب التيار تحت المجهر لتحديد ما إذا كان المنع في دائرة الشحن أو في إدارة الطاقة أو في مسار الذاكرة. القياس يسبق أي لمسة كاوية."
        },
        {
          t: "إصلاح مسار الإقلاع الواحد",
          b: "نصلح فقط ما يلزم ليقلع الجهاز مرة واحدة بثبات يكفي لسحب البيانات، لا لإعادته للاستخدام اليومي. وإذا لزم نقل الذاكرة تُنقل مع ما هو مقترن بها، لأن فصلها عن لوحتها الأصلية يجعل البيانات غير قابلة للقراءة."
        },
        {
          t: "الاستخراج والتسليم",
          b: "بعد الإقلاع نستخرج البيانات على وسيط معزول ونسلّمها على وسيط منفصل. رمز القفل يبقى ملك العميل ونحتاجه للوصول، وما يبقى مشفّراً بلا مفاتيح لا يمكن قراءته ونقول ذلك بوضوح."
        }
      ],
      caseTitle: "جوال دخله ماء ثم أعيد شحنه",
      caseBody: "حالة نموذجية: جهاز Android سقط في الماء لثوانٍ، جُفّف بمجفف الشعر، ثم وُصل بالشاحن في اليوم نفسه فسخن وتوقف عن الاستجابة. يصل المختبر مطفأً. نفصل البطارية، ننظّف أثر التآكل حول دائرة الطاقة، ثم نقيس اللوحة لنعرف ما الذي أتلفه التيار بعد الماء، لأن الشحن على لوحة مبللة غالباً يكون الضرر الأكبر لا الماء نفسه. الهدف إقلاع واحد يكفي لسحب الصور والمحادثات.",
      caseResult: "في كثير من الحالات المشابهة تعود الصور والمحادثات بعد إصلاح مسار الطاقة. وفي حالات أخرى يكون التآكل قد قطع مسارات تحت الشريحة فلا تكون القراءة ممكنة. الفحص وحده يفرّق بين الحالتين، ولا نعد بنتيجة قبله."
    },
    en: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "Start from the case",
          "title": "Choose the closest case",
          "lead": "Encryption on modern devices makes the order of steps matter more than their speed.",
          "items": [
            {
              "t": "It works but the screen or touch is dead",
              "b": "The route may be restoring temporary access to the display or the data port, with the lock code still required on encrypted devices. Do not reset and do not change the account."
            },
            {
              "t": "Dead after water or a fall",
              "b": "Do not charge it and do not use heat. We need to know when the incident happened and whether it was powered or charged afterwards — current and corrosion can do more than the length of water contact."
            },
            {
              "t": "Stuck on the logo or rebooting",
              "b": "The problem may be software, storage or the board. Do not restore or factory reset if the data is the priority, and do not install an update before its effect is assessed."
            },
            {
              "t": "Photos deleted or the device factory reset",
              "b": "Modern phones use encryption tied to the device and the lock code, and after a factory reset the keys to older data may be gone. Cloud and local backups are reviewed first."
            },
            {
              "t": "It works and unlocks, but the data is inside an app",
              "b": "Exporting depends on the app, its version, the account and the encryption. We do not promise to retrieve chats or a specific app's data before verifying how it stores them and what copies exist."
            }
          ]
        },
        {
          "kind": "prose",
          "eyebrow": "A realistic expectation",
          "title": "What can actually be handed over?",
          "paras": [
            "When a device can be powered and unlocked reliably, handover may include photos, videos, documents, contacts and files available for export. App data and chats are not always a single file: some are encrypted on the device, tied to the account, or held in the cloud, so the outcome is established for each type separately.",
            "Where the board is damaged, the aim is a stable enough state to reach the data, not necessarily returning the phone to daily use. The work may require opening the device or working on the board, and the effect on warranty, water resistance or usability must be made clear before starting."
          ]
        },
        {
          "kind": "steps",
          "title": "What we need for the initial assessment",
          "items": [
            {
              "t": "The device",
              "b": "Make, full model and capacity."
            },
            {
              "t": "Operating system",
              "b": "Approximately, if known."
            },
            {
              "t": "What happened and when",
              "b": "Water, a fall, heat, an update, deletion or a reset."
            },
            {
              "t": "What happened afterwards",
              "b": "Whether it was powered, charged, opened or repaired."
            },
            {
              "t": "How it behaves",
              "b": "Whether it lights up, vibrates, makes a sound, or connects to a computer."
            },
            {
              "t": "The lock code",
              "b": "Whether it is known and can be entered."
            },
            {
              "t": "Backups",
              "b": "Whether an iCloud, Google or computer backup exists, and the last sync."
            },
            {
              "t": "Data priority",
              "b": "Photos, video, contacts, documents or a specific app."
            },
            {
              "t": "Proof of ownership",
              "b": "Where needed — and without sending account passwords in an initial form."
            }
          ]
        }
      ],
      devicesTitle: "Every phone has a different way in.",
      devicesLead: "The brand decides the memory type and the encryption method, and those two decide what can be reached and what cannot. These are the devices that reach the lab most often.",
      devices: [
        {
          t: "iPhone",
          b: "iPhone data is encrypted with keys held inside the chip and tied to the board itself, so moving the memory alone reads nothing. The only path is bringing the board back to a bootable state, then unlocking with the owner's passcode."
        },
        {
          t: "Samsung Galaxy",
          b: "Recent models use UFS storage with hardware-backed keys, while some entry-level lines still ship eMMC. The memory type decides whether reading the chip directly is an option at all."
        },
        {
          t: "Xiaomi, Redmi and POCO",
          b: "The outcome varies with the Android version, the platform and the lock state. With a locked bootloader and encryption active, no tool goes around it, and the inspection shows which paths are left."
        },
        {
          t: "Huawei and Honor",
          b: "Their own chipset, their own storage layout and a partition scheme unlike other Android phones. We identify the model and its partitions before any read attempt, because the wrong tool can write to the device."
        },
        {
          t: "eMMC vs UFS",
          b: "eMMC in older phones can sometimes be read through test points or after removal. UFS is a high-speed serial interface where direct reading is limited and needs both precise equipment and a healthy board."
        },
        {
          t: "Damaged boards and micro-soldering",
          b: "Water and drop cases are handled under a microscope: corrosion removed, power rails measured, and only what blocks the boot repaired. Moving the memory to another board is not enough on its own, because the keys belong to the original board."
        }
      ],
      stepsTitle: "What happens to a phone inside the lab",
      steps: [
        {
          t: "Intake with no power-on",
          b: "We don't switch the device on when it arrives. It is opened, the battery disconnected first, and the board state documented. Water cases start with cleaning the board and stopping the corrosion before anything is measured."
        },
        {
          t: "Measure the board before soldering",
          b: "Power rails and current draw are measured under the microscope to see whether the block sits in the charging circuit, in power management, or in the path to the memory. Measurement comes before any iron touches the board."
        },
        {
          t: "Repair the path to a single boot",
          b: "We repair only what the device needs to come up once, stably enough to read the data, not to return it to daily use. If the memory has to move, whatever is paired with it moves too, because separating it from its original board leaves the data unreadable."
        },
        {
          t: "Extraction and handover",
          b: "Once it boots, the data is pulled to an isolated medium and handed back on a separate drive. The passcode stays the owner's and we need it for access, and anything that remains encrypted without its keys cannot be read. We say so plainly."
        }
      ],
      caseTitle: "A phone that took in water, then went on the charger",
      caseBody: "A typical case: an Android phone dropped in water for a few seconds, dried with a hairdryer, then put on the charger the same day, where it grew hot and stopped responding. It reaches the lab switched off. We disconnect the battery, clean the corrosion around the power circuit, then measure the board to see what the current damaged after the water, because charging a wet board is usually the larger damage, not the water itself. The goal is one boot, long enough to pull the photos and messages.",
      caseResult: "In many similar cases the photos and messages come back once the power path is repaired. In others, corrosion has already cut tracks under the chip and reading is not possible. Only the inspection separates the two, and we promise no outcome before it."
    }
  },
  "memory-cards": {
    ar: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "ابدأ من العرَض",
          "title": "أي عطل تصف بطاقتك؟",
          "items": [
            {
              "t": "تطلب فورمات أو أصبحت RAW",
              "b": "قد يكون نظام الملفات أو جدول المجلدات متضرّرًا بينما البيانات ما زالت موجودة. لا توافق على التهيئة ولا تشغّل أداة Repair على النسخة الوحيدة."
            },
            {
              "t": "تظهر ببطء أو تنفصل أثناء النسخ",
              "b": "قد توجد مناطق قراءة متعثّرة أو مشكلة في وحدة التحكّم. لا تكرّر نسخ المجلد نفسه ولا تفحصها ببرنامج طويل؛ تُؤخذ نسخة كاملة بقراءة محسوبة أولًا."
            },
            {
              "t": "لا تظهر أو تظهر بسعة خاطئة",
              "b": "قد يكون الخلل في وحدة التحكّم أو الموصّلات أو الشريحة. برامج الاسترجاع لا ترى وسيطًا لا يُعلن سعته بصورة صحيحة."
            },
            {
              "t": "كسر في موصّل USB أو جسم البطاقة",
              "b": "لا تلحمها ولا تثبّتها بالغراء ولا تكرّر إدخالها. احتفظ بكل القطع؛ سلامة الشريحة أهمّ من شكل الغلاف."
            },
            {
              "t": "حُذفت صور أو تمّ الفورمات ثم استمرّ التصوير",
              "b": "كل صورة أو فيديو جديد قد يستبدل مساحة قديمة. أخرج البطاقة وحدّد تقريبًا عدد الملفات الجديدة والوقت المطلوب."
            },
            {
              "t": "تسجيل فيديو توقّف فجأة",
              "b": "قد يبقى ملف فيديو غير مكتمل أو بلا فهرس نهائي. نحتاج البطاقة الأصلية، ونوع الكاميرا، وإعداد الدقّة ومعدّل الإطارات، وأحيانًا ملفًّا سليمًا مصوَّرًا بالجهاز نفسه للمقارنة."
            }
          ]
        },
        {
          "kind": "prose",
          "eyebrow": "توقّع واقعي",
          "title": "ماذا قد يعود؟",
          "paras": [
            "قد تعود الصور بصيغ JPEG أو RAW والفيديوهات والمستندات مع مجلداتها وأسمائها إذا بقي نظام الملفات سليمًا. وإذا تضرّرت الفهارس، قد تُستعاد الملفات بحسب بنيتها من دون الأسماء الأصلية أو الترتيب.",
            "والفيديو الطويل، وخصوصًا من الكاميرات الاحترافية أو كاميرات الحركة، قد يكون مجزّأً إلى أجزاء موزّعة على البطاقة. العثور على بداية الفيديو لا يعني أن المقطع مكتمل، ولذلك يجب تشغيله والتحقّق من المدة والصوت والصورة بعد التجميع. وإذا كُتبت بيانات جديدة فوق جزء من ملف قديم، قد يعود الملف ناقصًا أو يتوقّف أثناء التشغيل. تُعرض النتيجة الفعلية بعد فحص النسخة، لا بعد عدّ أسماء الملفات فقط."
          ]
        },
        {
          "kind": "steps",
          "title": "ما نحتاجه للتقييم الأولي",
          "items": [
            {
              "t": "نوع الوسيط",
              "b": "‏SD أو microSD أو CF أو CFexpress أو USB."
            },
            {
              "t": "الشركة والطراز والسعة",
              "b": "مع صورة للجهتين."
            },
            {
              "t": "الجهاز المستخدم",
              "b": "الكاميرا أو الهاتف أو الجهاز الذي استُخدمت معه."
            },
            {
              "t": "الرسالة التي ظهرت",
              "b": "‏Format أو Card Error أو No Card أو Write Protected أو سعة خاطئة."
            },
            {
              "t": "الاستخدام بعد المشكلة",
              "b": "هل تمّ الفورمات أو التصوير أو النسخ، وكم تقريبًا."
            },
            {
              "t": "الحالة المادية",
              "b": "هل الوسيط يسخن أو ينفصل أو مكسور."
            },
            {
              "t": "الملفات المطلوبة",
              "b": "نوعها والتاريخ أو جلسة التصوير المعنيّة."
            },
            {
              "t": "تفاصيل الفيديو",
              "b": "الدقّة ومعدّل الإطارات ونوع الكاميرا ومدة المقطع المتوقّعة."
            },
            {
              "t": "ما جُرّب",
              "b": "أي برامج أو أدوات مصنع استُخدمت."
            }
          ]
        }
      ],
      devicesTitle: "الاسم على الغلاف لا يحدد المسار.",
      devicesLead: "ما يحدد طريقة القراءة هو نوع الشريحة ووحدة التحكم داخل الوسيط وطريقة تجميعهما. هذه أكثر البطاقات والفلاشات التي تصل المختبر.",
      devices: [
        {
          t: "SanDisk",
          b: "بطاقات SD وmicroSD وفلاشات SanDisk تعمل بوحدات تحكم وجداول ترجمة خاصة بها. كثير من بطاقات microSD منها مصبوبة في قطعة واحدة، فلا توجد شريحة تُفك، ويتم العمل على جسم البطاقة نفسه."
        },
        {
          t: "Lexar",
          b: "بطاقات CF وSD المستخدمة في التصوير المحترف. التسجيل المستمر للفيديو يستهلك خلايا بعينها أسرع من غيرها، فتظهر الأعطال أولاً في المقاطع الطويلة قبل أن تتوقف البطاقة عن الظهور."
        },
        {
          t: "Samsung",
          b: "بطاقات EVO وPRO وفلاشات Samsung تجمع الشريحة ووحدة التحكم من المصنّع نفسه. العطل الشائع توقف مفاجئ: البطاقة تظهر بحجم خاطئ أو تتحول إلى وضع القراءة فقط، وهذه علامة وحدة تحكم لا علامة حذف."
        },
        {
          t: "Kingston",
          b: "الطراز الواحد قد يحمل أكثر من وحدة تحكم حسب دفعة الإنتاج، لذلك يبدأ العمل بتحديد الوحدة بدقة. أدوات المصنع المتداولة على الإنترنت تعيد تهيئة الوسيط بدل قراءته، ولا تُستخدم على حالة فيها بيانات."
        },
        {
          t: "SD وmicroSD وCF وCFexpress",
          b: "الشكل يحدد طريقة الوصول. بطاقات CF تتصل عبر مسامير دقيقة قد تلتوي داخل الكاميرا، أما CFexpress فهي عملياً قرص NVMe داخل غلاف بطاقة، فتُعامل معاملة SSD لا معاملة كرت SD."
        },
        {
          t: "الشرائح المدمجة وأعطال وحدة التحكم",
          b: "في الوسائط المدمجة (Monolith) تكون الشريحة ووحدة التحكم داخل صبّة واحدة، فلا يمكن فك الذاكرة. تُحدد نقاط الاتصال على جسم البطاقة وتُقرأ مباشرة، ثم يُعاد بناء ترتيب البيانات الذي كانت وحدة التحكم تديره."
        }
      ],
      stepsTitle: "ما يحدث للبطاقة داخل المختبر",
      steps: [
        {
          t: "تعريف الوسيط قبل توصيله",
          b: "نقرأ العلامات على الجسم ونحدد نوع الوسيط وعائلة وحدة التحكم قبل أي توصيل. لا نكرر إدخال البطاقة، ولا نسمح لأي جهاز بالكتابة عليها، والتوصيل يتم عبر مسار قراءة فقط."
        },
        {
          t: "نسخة كاملة بقراءة بطيئة",
          b: "إذا كان الوسيط ما زال يظهر، نأخذ نسخة كاملة بسرعة منخفضة مع إعادة المحاولة على القطاعات المتعثرة ومراقبة الحرارة. بعدها تُترك البطاقة جانباً ويستمر العمل على النسخة."
        },
        {
          t: "قراءة الشريحة عند عدم الظهور",
          b: "إذا لم يظهر الوسيط أصلاً، نفحص الوصلات والطرف المعدني تحت المجهر. في الوسائط المنفصلة تُفك شريحة NAND وتُقرأ على برمجة مباشرة، وفي الوسائط المدمجة تُحدد نقاط الاتصال على جسم البطاقة بدلاً من ذلك."
        },
        {
          t: "إعادة بناء الترتيب ثم الملفات",
          b: "القراءة الخام للشريحة ليست ملفات: نصحّح أخطاء ECC، ونعكس خلط البيانات، ونعيد الصفحات إلى تسلسلها، ثم نعيد بناء نظام الملفات ونجمع مقاطع الكاميرا من بنيتها الداخلية. نتحقق بفتح الصور وتشغيل المقاطع قبل التسليم."
        }
      ],
      caseTitle: "كرت SD طلب تهيئة بعد تغطية مناسبة",
      caseBody: "حالة نموذجية: كرت SD يعمل في كاميرا احترافية، ظهرت عليه رسالة خطأ في نهاية التصوير، وعند توصيله بالحاسب طلب تهيئة. جُرّب برنامج استرجاع مجاني ثم توقف الاستخدام، دون تهيئة ودون تصوير جديد. يصل المختبر والكرت يظهر لكن قراءته متعثرة. نأخذ نسخة كاملة بقراءة بطيئة، ثم نعمل على النسخة وحدها: جدول الملفات متضرر، لذلك تُجمع المقاطع من بنيتها الداخلية بدل الاعتماد عليه.",
      caseResult: "في كثير من الحالات المشابهة تعود الصور والمقاطع كاملة أو شبه كاملة، ما دامت التهيئة لم تتم ولم يُصوَّر على الكرت بعدها. وإذا كانت الكتابة قد طالت أجزاء من المقاطع، فقد يعود بعضها ناقصاً أو لا يعود. نعرض ما ظهر في النسخة قبل أي وعد."
    },
    en: {
      /* التوسعة العميقة — خطة العميل. اختيارية ويعرضها serviceExpansion()
         بمفردات تصميم الموقع نفسها، بلا ادعاءات قدرة جديدة. */
      expand: [
        {
          "kind": "cards",
          "eyebrow": "Start from the symptom",
          "title": "Which fault describes your card?",
          "items": [
            {
              "t": "It asks to be formatted, or shows as RAW",
              "b": "The file system or directory table may be damaged while the data is still there. Do not agree to format and do not run a repair tool on your only copy."
            },
            {
              "t": "It appears slowly or disconnects while copying",
              "b": "There may be failing read areas or a controller problem. Do not repeatedly copy the same folder or scan it with a long-running tool; a full image is taken with measured reading first."
            },
            {
              "t": "It does not appear, or shows the wrong capacity",
              "b": "The fault may be in the controller, the contacts, or the chip. Recovery software cannot see a medium that does not report its capacity correctly."
            },
            {
              "t": "A broken USB connector or card body",
              "b": "Do not solder it, glue it, or keep re-inserting it. Keep every piece; the chip's integrity matters more than the casing."
            },
            {
              "t": "Photos deleted or formatted, then shooting continued",
              "b": "Every new photo or video can overwrite older space. Remove the card and estimate how many new files were made and the time you need."
            },
            {
              "t": "A video recording stopped suddenly",
              "b": "An incomplete video file may remain, or one with no final index. We need the original card, the camera type, the resolution and frame rate settings, and sometimes a known-good file shot on the same device for comparison."
            }
          ]
        },
        {
          "kind": "prose",
          "eyebrow": "A realistic expectation",
          "title": "What might come back?",
          "paras": [
            "Photos in JPEG or RAW, videos and documents may return with their folders and names if the file system survived. Where the directories are damaged, files may be recovered by their structure without the original names or ordering.",
            "Long video, especially from professional or action cameras, may be split into fragments spread across the card. Finding the start of a video does not mean the clip is complete, so it must be played and its duration, audio and picture checked after reassembly. If new data was written over part of an older file, the file may return incomplete or stop during playback. The real outcome is presented after examining the image, not after counting file names."
          ]
        },
        {
          "kind": "steps",
          "title": "What we need for the initial assessment",
          "items": [
            {
              "t": "Medium type",
              "b": "SD, microSD, CF, CFexpress or USB."
            },
            {
              "t": "Make, model and capacity",
              "b": "With a photo of both sides."
            },
            {
              "t": "The device used",
              "b": "The camera, phone or device it was used with."
            },
            {
              "t": "The message shown",
              "b": "Format, Card Error, No Card, Write Protected, or a wrong capacity."
            },
            {
              "t": "Use since the problem",
              "b": "Whether it was formatted, shot on, or copied from, and roughly how much."
            },
            {
              "t": "Physical condition",
              "b": "Whether the medium heats up, disconnects, or is broken."
            },
            {
              "t": "The files you need",
              "b": "Their type and the date or shooting session concerned."
            },
            {
              "t": "Video details",
              "b": "Resolution, frame rate, camera type, and the expected clip length."
            },
            {
              "t": "What was tried",
              "b": "Any software or manufacturer tools that were used."
            }
          ]
        }
      ],
      devicesTitle: "The name on the label doesn't decide the method.",
      devicesLead: "What decides how a card is read is the chip inside it, its controller, and the way the two are packaged together. These are the cards and sticks that reach the lab most often.",
      devices: [
        {
          t: "SanDisk",
          b: "SanDisk SD, microSD and USB media run on their own controllers and translation tables. Many of their microSD cards are moulded as a single piece, so there is no chip to remove and the work is done on the body of the card itself."
        },
        {
          t: "Lexar",
          b: "CF and SD cards common in professional shooting. Continuous video wears specific cells faster than the rest, so faults show up first in the long clips, before the card stops appearing at all."
        },
        {
          t: "Samsung",
          b: "Samsung EVO and PRO cards and USB sticks pair the maker's own chip with its own controller. The common fault is a sudden stop: the card reports the wrong capacity or turns read-only, which points at the controller, not at deletion."
        },
        {
          t: "Kingston",
          b: "One model can carry different controllers depending on the production batch, so the work starts by identifying the exact one. The factory tools circulating online reformat the medium instead of reading it, and are never used on a case that still holds data."
        },
        {
          t: "SD, microSD, CF and CFexpress",
          b: "The form factor decides the access. CF connects through fine pins that can bend inside the camera, while CFexpress is effectively an NVMe drive in a card shell and is handled like an SSD, not like an SD card."
        },
        {
          t: "Monolithic chips and controller failure",
          b: "In monolithic media the chip and the controller sit inside one moulded block, so the memory cannot be removed. The contact points are located on the body of the card and read directly, then the data order the controller used to manage is rebuilt."
        }
      ],
      stepsTitle: "What happens to a card inside the lab",
      steps: [
        {
          t: "Identify the medium before connecting it",
          b: "The markings on the body are read and the media type and controller family identified before anything is plugged in. The card is not re-inserted repeatedly, nothing is allowed to write to it, and the connection goes through a read-only path."
        },
        {
          t: "A full image at a slow read",
          b: "If the medium still appears, a full image is taken at low speed, with retries on stalling sectors and the temperature watched throughout. After that the card is set aside and all work continues on the image."
        },
        {
          t: "Read the chip when nothing appears",
          b: "If the medium doesn't appear at all, the joints and the metal connector are examined under the microscope. On discrete media the NAND chip is removed and read on a programmer; on monolithic media the contact points on the card body are located instead."
        },
        {
          t: "Rebuild the order, then the files",
          b: "A raw chip read is not files: ECC errors are corrected, the data scrambling is reversed, the pages are put back in sequence, then the file system is rebuilt and camera clips are carved from their own internal structure. We verify by opening the photos and playing the clips before handover."
        }
      ],
      caseTitle: "An SD card that asked to be formatted after a shoot",
      caseBody: "A typical case: an SD card working in a professional camera showed an error at the end of a shoot, and asked to be formatted when it was connected to a computer. A free recovery tool was tried, then use stopped, with no format and nothing new shot. It reaches the lab still visible but reading unevenly. We take a full image at a slow read, then work on the image alone: the file table is damaged, so the clips are carved from their own internal structure instead of trusting it.",
      caseResult: "In many similar cases the photos and clips come back complete or nearly complete, as long as no format happened and nothing new was shot on the card. Where writes did reach parts of the clips, some may come back truncated or not at all. We show what the image holds before promising anything."
    }
  }
};
