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
