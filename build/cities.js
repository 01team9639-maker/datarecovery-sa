/* ==========================================================================
   City landing pages — Arabic + English.

   The client's keyword sheet carries a geographic cluster (استعادة بيانات الرياض،
   شركة استعادة بيانات جدة، استرجاع بيانات الدمام) that had no destination on the
   site. These pages serve it.

   HONESTY RULE, baked into the copy: the lab is in Riyadh. Only the Riyadh page
   describes in-person drop-off; Jeddah and Dammam describe secure shipping to the
   Riyadh lab and never imply a local branch exists. Claiming branches that do not
   exist is both a trust problem and a Google Business Profile violation.

   Each page is written from a genuinely different angle — different customer
   profile, different examples, different FAQs — because three near-identical
   city pages read as doorway pages and get demoted rather than ranked.

   Order is controlled by config.cityOrder in site.js.
   ========================================================================== */
module.exports = [
  {
    slug: "riyadh",
    ar: {
      city: "الرياض",
      title: "استعادة بيانات الرياض — من يدك إلى المختبر مباشرة",
      metaTitle: "استعادة بيانات الرياض — تسليم مباشر | من الصفر إلى الواحد",
      metaDesc: "استعادة بيانات في الرياض: المختبر داخل المدينة، ويمكنك تسليم الجهاز بنفسك. فحص وتشخيص مجاني بلا التزام لهاردسك وSSD وRAID وكاميرات المراقبة.",
      heroHook: "المختبر في الرياض. الجهاز لا يحتاج إلى سفر.",
      heroIntro: "إذا مرّ الجهاز على محل صيانة أو اثنين داخل الرياض قبل أن يصل إلينا، فذلك جزء من الحالة لا يمكن تجاهله. لذلك نبدأ بسؤال واحد: ما الذي جُرّب حتى الآن؟ هذه الإجابة قد تغيّر مسار الفحص أكثر من نوع الجهاز نفسه. ولأن المختبر داخل المدينة، يمكنك تسليم الجهاز بيدك بدل أن تضعه في الشحن.",
      whyTitle: "لماذا يختلف التعامل مع حالة داخل الرياض؟",
      why: [
        {
          t: "المختبر في نفس المدينة",
          b: "لا توجد مرحلة شحن. تسلّم الجهاز في الرياض، وقد يبدأ الفحص في نفس اليوم إذا وصل خلال ساعات العمل، بدل أن يقضي القرص أياماً في الطريق بينما تحتاج البيانات."
        },
        {
          t: "التاريخ الذي يصل مع القرص",
          b: "بين مجمعات الحاسب ومحلات تصليح الهاردسك في الرياض، من السهل أن يُشغَّل القرص ويُفحص ببرامج قبل أن يصل إلينا. إن حدث ذلك، نوثّقه أولاً، لأنه يحدد ما تبقّى من فرص ولا يظهر في الفحص وحده."
        },
        {
          t: "مكاتب صغيرة تعتمد على جهاز واحد",
          b: "مكاتب المحاسبة والمقاولات والعيادات في العليا وعلى طريق الملك فهد كثيراً ما تحفظ كل شيء على محطة عمل أو سيرفر واحد. وجودنا في نفس المدينة يعني أن المسؤول عن البيانات يمكنه الحضور، ويرى حالة الأقراص، ويقرر قبل أي محاولة."
        }
      ],
      coverageTitle: "كيف يصل جهازك من حيّك إلى المختبر؟",
      coverageBody: "ابدأ برسالة واتساب تصف فيها نوع الجهاز وما حدث وما جُرّب؛ نردّ بأول خطوة صحيحة قبل أن تتحرك. بعدها يمكنك إحضار الجهاز بنفسك خلال ساعات العمل، أو إرساله مع مندوب توصيل داخل الرياض إذا كان الحضور صعباً. في الحالتين نوثّق حالة الجهاز الظاهرة عند الاستلام، ويبدأ فحص وتشخيص مجاني بلا التزام. قبل النقل: افصل الكابلات، ضع القرص في كيس مضاد للكهرباء الساكنة (ESD) لا في كيس بلاستيك عادي مضغوط، ثم ضعه في علبة مبطّنة حتى لا يتحرك، ولا تسمح لأحد بتشغيله أو تجربته في الطريق.",
      areas: ["العليا", "الملز", "السويدي", "النسيم", "الملقا", "حي الورود", "شمال الرياض", "طريق الملك فهد"],
      faqs: [
        {
          q: "هل أستطيع إحضار الجهاز بنفسي إلى المختبر؟",
          a: "نعم. المختبر في الرياض ويمكنك تسليم الجهاز مباشرة خلال ساعات العمل. يُفضّل إرسال وصف مختصر للحالة عبر واتساب قبل الحضور، حتى تكون الخطوة الأولى واضحة قبل أن تتحرك."
        },
        {
          q: "أنا في السويدي أو النسيم والمسافة بعيدة، ما البديل؟",
          a: "يمكن إرسال الجهاز مع مندوب توصيل داخل الرياض. افصل الكابلات، ضع القرص في كيس مضاد للكهرباء الساكنة (ESD) ثم في علبة مبطّنة، ولا تطلب من أحد تشغيله أو فحصه في الطريق. كل تشغيل إضافي قد يغيّر حالة القرص قبل أن يصل."
        },
        {
          q: "هل يبدأ الفحص في نفس اليوم؟",
          a: "قد يبدأ الفحص في نفس اليوم إذا وصل الجهاز خلال ساعات العمل. مدة التشخيص نفسها تختلف حسب نوع العطل وحالة القرص، ونوضح لك ما وصلنا إليه قبل أي خطوة استعادة."
        },
        {
          q: "سيرفر مكتبنا في العليا توقف، هل نفكّ الأقراص ونحضرها؟",
          a: "لا تفكّها قبل التصوير والترقيم، ولا تبدأ إعادة بناء جديدة. صوّر ترتيب الأقراص داخل الجهاز ورقّم كل قرص بموضعه، وصف الحالة عبر واتساب أولاً، ثم نحدد معك هل يُنقل الجهاز كاملاً أم الأقراص فقط."
        }
      ],
      ctaHook: "المسافة ليست عذراً داخل الرياض.",
      ctaBody: "أوقف الجهاز الآن، وأرسل نوعه ووصف ما حدث وما جُرّب قبل ذلك. سنوضح لك إن كان إحضاره هو الخطوة التالية. الفحص والتشخيص بلا مقابل، والقرار بعدهما يبقى لك."
    },
    en: {
      city: "Riyadh",
      title: "Data Recovery in Riyadh — From Your Hand to the Lab",
      metaTitle: "Data Recovery in Riyadh | Zero 2 One",
      metaDesc: "Data recovery in Riyadh — the lab is in the city, so you can drop the device off yourself. Free inspection and diagnosis, no obligation. HDD, SSD, RAID, CCTV.",
      heroHook: "The lab is in Riyadh. Your drive doesn't need to travel.",
      heroIntro: "If the device passed through one or two repair shops inside Riyadh before it reached us, that is part of the case and can't be ignored. So we start with a single question: what has been tried so far? That answer can shape the inspection more than the device type does. And because the lab is in the city, you can hand the device over yourself instead of putting it in transit.",
      whyTitle: "What makes a Riyadh case different",
      why: [
        {
          t: "The lab is in the same city",
          b: "There is no shipping stage. You hand the device over in Riyadh, and inspection may begin the same day if it arrives during working hours, instead of the disk sitting on the road while you need the data."
        },
        {
          t: "The history that arrives with a disk",
          b: "Between the computer malls and the hard drive repair shops around Riyadh, it is easy for a disk to be powered on and scanned with software before it reaches us. If that happened, we record it first, because it defines the chance that is left and it doesn't show up in the inspection alone."
        },
        {
          t: "Small offices running on one machine",
          b: "Accounting firms, contracting offices and clinics in Al Olaya and along King Fahd Road often keep everything on a single workstation or server. Being in the same city means the person responsible can come in, see the state of the disks, and decide before anything is attempted."
        }
      ],
      coverageTitle: "How your device gets from your district to the lab",
      coverageBody: "Start with a WhatsApp message describing the device, what happened, and what has been tried; we reply with the right first step before you move. After that you can bring the device in yourself during working hours, or send it with a delivery courier inside Riyadh if coming in is difficult. Either way, we note the visible condition of the device on arrival, and the free inspection and diagnosis carries no obligation. Before it travels: disconnect the cables, put the bare drive in an anti-static (ESD) bag rather than a tight plastic bag, then place it in a padded box so it can't move, and don't let anyone power it on or test it along the way.",
      areas: ["Al Olaya", "Al Malaz", "Al Suwaidi", "Al Naseem", "Al Malqa", "Al Wurud", "North Riyadh", "King Fahd Road"],
      faqs: [
        {
          q: "Can I bring the device to the lab myself?",
          a: "Yes. The lab is in Riyadh and you can hand the device over during working hours. It helps to send a short description of the case on WhatsApp before coming in, so the first step is clear before you move."
        },
        {
          q: "I'm in Al Suwaidi or Al Naseem and it's a long drive. What's the alternative?",
          a: "You can send the device with a delivery courier inside Riyadh. Disconnect the cables, put the disk in an anti-static (ESD) bag and then in a padded box, and don't ask anyone to power it on or check it on the way. Every extra power-on can change the state of the disk before it arrives."
        },
        {
          q: "Does the inspection start the same day?",
          a: "Inspection may start the same day if the device arrives during working hours. How long the diagnosis itself takes varies with the fault type and the state of the disk, and we explain what we found before any recovery step."
        },
        {
          q: "Our office server in Al Olaya has stopped. Should we pull the disks out and bring them in?",
          a: "Don't pull them before photographing and labelling, and don't start a new rebuild. Photograph the disk order inside the chassis, label each disk with its slot, describe the case on WhatsApp first, and then we decide together whether the whole unit or only the disks should be moved."
        }
      ],
      ctaHook: "Distance isn't the obstacle inside Riyadh.",
      ctaBody: "Power the device down, then send us its type, what happened, and what was tried before that. We'll tell you whether bringing it in is the right next step. The inspection and diagnosis cost you nothing, and the decision afterwards stays yours."
    }
  },
  {
    slug: "jeddah",
    ar: {
      city: "جدة",
      title: "استعادة البيانات لعملاء جدة — شحن آمن إلى مختبر الرياض",
      metaTitle: "استعادة البيانات لعملاء جدة | من الصفر إلى الواحد",
      metaDesc: "استعادة البيانات لعملاء جدة: تصل الحالة عبر شحن آمن ويجري الفحص في مختبرنا بالرياض. فحص وتشخيص مجاني بلا التزام قبل أي محاولة استعادة.",
      heroHook: "القرص توقف في جدة؟ القرار الأهم يسبق الشحن.",
      heroIntro: "لا يوجد لنا فرع في جدة. المختبر في الرياض، والحالات القادمة من جدة تُستلم عبر شحن آمن. قبل أن تغلّف الجهاز، أوقف تشغيله وأخبرنا بما حدث؛ الطريقة التي يُشحن بها الجهاز جزء من حالته عند وصوله.",
      whyTitle: "الحالات القادمة من جدة لها طابعها.",
      why: [
        {
          t: "أرشيف الاستوديوهات ومصوّري المناسبات",
          b: "جدة مدينة إنتاج بصري كثيف؛ ملفات المناسبات وموسم العمرة تتراكم على أقراص خارجية وأنظمة NAS. نتعامل مع هذا النوع من الأرشيف بمراعاة بنية المجلدات وأحجام الفيديو الكبيرة قبل أي محاولة نسخ."
        },
        {
          t: "مكاتب الشحن والتخليص والتجارة",
          b: "مكاتب الملاحة والتخليص الجمركي قرب الميناء تعتمد على قواعد بيانات وسيرفرات محاسبية. نبدأ بقراءة حالة الأقراص وتحديد ما يمكن قراءته، قبل أي إعادة بناء قد تطيل التوقف."
        },
        {
          t: "الرطوبة الساحلية والأقراص الخارجية",
          b: "القرب من البحر في أحياء مثل أبحر والشاطئ قد يترك أثره على أطراف التوصيل ولوحات الأقراص الخارجية. أحيانًا يبدو القرص ميتًا بينما تكون المشكلة في الغلاف أو المنفذ، لذلك يُفحص كل جزء على حدة."
        }
      ],
      coverageTitle: "الشحن من جدة: التغليف والتتبع ونتيجة الفحص.",
      coverageBody: "لا يوجد فرع في جدة؛ نستقبل الحالات القادمة منها عبر الشحن. تبدأ بوصف الحالة عبر واتساب أو الهاتف، ثم نوضح طريقة التغليف: الجهاز في كيس مضاد للكهرباء الساكنة، داخل صندوق صلب مع حشوة تمنع الحركة، ومعه الغلاف الخارجي والكابل إن وُجدا. ونتّفق معك على تفاصيل الشحن قبل أن يغادر الجهاز. عند وصوله إلى مختبر الرياض يُسجَّل ويُفتح ويُفحص، ثم نتواصل معك بنتيجة الفحص قبل أي محاولة استعادة. ومدة النقل لا تدخل في تقديرنا الفني.",
      areas: ["الروضة", "الحمراء", "السلامة", "أبحر الشمالية", "البلد", "الشاطئ", "النزهة", "الصفا"],
      faqs: [
        {
          q: "هل لديكم فرع في جدة؟",
          a: "لا. عملنا كله يجري داخل مختبر واحد في الرياض، ولا فرع لنا في جدة. ما يصلنا من جدة يأتي عبر الشحن، ويبقى الجهاز داخل المختبر في كل مراحل الفحص والتعامل معه."
        },
        {
          q: "كيف أغلّف الهارد قبل شحنه من جدة؟",
          a: "ضع القرص في كيس مضاد للكهرباء الساكنة، ثم في صندوق صلب مع حشوة تمنع حركته من كل الجهات. لا تكتفِ بلفّه بورق أو قماش، ولا تشغّله لتجربته قبل الشحن. أرفق الغلاف الخارجي والكابل إذا كانت المشكلة تظهر عند التوصيل."
        },
        {
          q: "عندي سيرفر أو RAID في مكتب بجدة، هل أشحن الأقراص كلها؟",
          a: "نعم، تُشحن الأقراص كاملة مع ترقيم يوضح ترتيبها داخل المصفوفة، ومعها نوع RAID ورسائل الخطأ إن توفرت. لا تبدأ إعادة بناء قبل الفحص، ولا تغيّر ترتيب الأقراص أثناء الإخراج أو التغليف."
        },
        {
          q: "متى أعرف نتيجة الفحص، وكيف تصلني الملفات في جدة؟",
          a: "بعد وصول الشحنة وتسجيلها يبدأ الفحص، ثم نتواصل معك بنتيجته وبفرص الاستعادة قبل أي خطوة. في حال الاتفاق على الاستعادة، تُنسخ الملفات على وسيط منفصل ويُعاد إرساله إليك في جدة بالطريقة المتفق عليها. أما الفحص والتشخيص فلا تُحتسب عليهما أي تكلفة، ولست ملزمًا بالمتابعة بعدهما."
        }
      ],
      ctaHook: "قبل أن تغلق الصندوق، اسأل.",
      ctaBody: "أرسل لنا نوع الجهاز، وما الذي حدث قبل توقفه، وما جُرّب بعده. نوضح لك طريقة التغليف والشحن من جدة، ونبدأ بفحص وتشخيص مجاني بلا التزام قبل أي محاولة."
    },
    en: {
      city: "Jeddah",
      title: "Data Recovery in Jeddah — Secure Courier to Our Riyadh Lab",
      metaTitle: "Data Recovery in Jeddah | Zero 2 One",
      metaDesc: "Data recovery for Jeddah: cases are received by secure courier and inspected in our Riyadh lab. Free, no-obligation inspection before any recovery attempt.",
      heroHook: "Drive stopped in Jeddah? The biggest decision comes before you ship.",
      heroIntro: "We do not have a branch in Jeddah. The lab is in Riyadh, and cases from Jeddah are received by secure courier. Before you pack the device, power it off and tell us what happened. How a drive is packed is part of the state it arrives in.",
      whyTitle: "Cases from Jeddah have their own pattern.",
      why: [
        {
          t: "Studio and event-photography archives",
          b: "Jeddah produces a heavy volume of visual work; event files and Umrah-season shoots pile up on external drives and NAS units. We handle this kind of archive with its folder structure and large video files in mind, before any copy is attempted."
        },
        {
          t: "Freight, customs-clearance and trading offices",
          b: "Shipping and clearance offices near the port run on databases and accounting servers. We start by reading the state of the disks and identifying what is readable, before any rebuild that could extend the downtime."
        },
        {
          t: "Coastal humidity and external drives",
          b: "Living close to the sea in districts such as Obhur and Ash Shati can leave its mark on connectors and on the boards inside external enclosures. A drive may look dead when the fault sits in the enclosure or the port, so each part is inspected separately."
        }
      ],
      coverageTitle: "How your case travels from Jeddah to the lab.",
      coverageBody: "There is no Jeddah branch; cases from the city reach us by courier. You start by describing the case on WhatsApp or by phone, then we explain how to pack it: the device in an anti-static bag, inside a rigid box with padding that stops it moving, along with its enclosure and cable if it has them. We agree the shipping details with you before the device leaves. When it reaches the Riyadh lab it is logged, opened and inspected, and we come back to you with the inspection result before any recovery attempt. Transit time is not part of our technical estimate.",
      areas: ["Ar Rawdah", "Al Hamra", "As Salamah", "North Obhur", "Al Balad", "Ash Shati", "An Nuzha", "As Safa"],
      faqs: [
        {
          q: "Do you have a branch in Jeddah?",
          a: "No. All of our work happens inside a single lab in Riyadh, and we have not opened a branch in Jeddah. What comes from Jeddah arrives by courier, and the device stays inside the lab through every stage of inspection and handling."
        },
        {
          q: "How should I pack a drive before shipping it from Jeddah?",
          a: "Put the disk in an anti-static bag, then in a rigid box with padding that stops it moving in every direction. Don't rely on paper or cloth wrapping, and don't power it on to test it before shipping. Include the external enclosure and cable if the problem appears on connection."
        },
        {
          q: "I have a server or RAID in a Jeddah office. Do I ship all the disks?",
          a: "Yes, ship the full set with labels showing each disk's position in the array, together with the RAID type and any error messages you have. Don't start a rebuild before inspection, and don't change the disk order while removing or packing them."
        },
        {
          q: "When will I know the inspection result, and how do the files get back to Jeddah?",
          a: "Once the parcel arrives and is logged, the inspection begins, then we contact you with the result and the recovery odds before any step. If recovery is agreed, the files are copied onto a separate medium and shipped back to you in Jeddah in the way agreed. The inspection and diagnosis themselves carry no cost, and you are not committed to going further afterwards."
        }
      ],
      ctaHook: "Before you seal the box, ask.",
      ctaBody: "Send us the device type, what happened before it stopped, and what has been tried since. We'll explain how to pack and ship it from Jeddah, and start with a free, no-obligation inspection before any attempt."
    }
  },
  {
    slug: "dammam",
    ar: {
      city: "الدمام",
      title: "استرجاع بيانات الدمام والمنطقة الشرقية",
      metaTitle: "استرجاع بيانات الدمام والمنطقة الشرقية | من الصفر إلى الواحد",
      metaDesc: "استرجاع بيانات الدمام والخبر والظهران والجبيل: سيرفرات، RAID، محطات عمل هندسية وأقراص. شحن آمن إلى مختبرنا في الرياض، وفحص وتشخيص مجاني بلا التزام.",
      heroHook: "في الشرقية، عطل واحد قد يوقف فريقًا كاملاً.",
      heroIntro: "في الدمام والخبر والظهران والجبيل قد لا يكون الجهاز المتوقف جهازًا شخصيًا: سيرفر ملفات، مصفوفة RAID، أو محطة عمل هندسية تحمل مخططات ونماذج مشروع قائم. في هذه الحالات يكون الضغط لإعادة التشغيل بسرعة هو أكبر خطر على البيانات. أوقف النظام أولًا، ثم اسأل.",
      whyTitle: "لماذا تختلف حالات الدمام والشرقية؟",
      why: [
        {
          t: "أرشيف مشروع، لا ملفات شخصية",
          b: "مقاولو الطاقة ومكاتب الهندسة في الدمام والجبيل يفقدون مخططات ونماذج ومجلدات مشتركة مرتبطة بعقد قائم وموعد تسليم. نتعامل مع الحالة على أساس أنها بيانات مؤسسية: سرية واضحة، ونوضح الخيارات والمدة المتوقعة بعد التشخيص وقبل البدء، وتسليم على وسيط منفصل."
        },
        {
          t: "غرف سيرفرات بلا مختص تخزين مقيم",
          b: "كثير من الشركات هناك تدير السيرفر عبر مزود خارجي يزور الموقع بين فترة وأخرى. عند فشل قرص يكون أول رد فعل هو بدء Rebuild لإعادة الخدمة بسرعة، وهذا قد يضاعف الضرر قبل أن يفحص أحد بنية المصفوفة وترتيب الأقراص."
        },
        {
          t: "أقراص تتنقل بين الموقع والمكتب",
          b: "الأقراص الخارجية ومحركات الميدان تنتقل يوميًا بين مواقع العمل والمكاتب في الجبيل الصناعية وبقيق ورأس تنورة. السقوط أثناء النقل أو انقطاع الكهرباء أثناء النسخ قد يترك عطلًا لا يظهر أثره فورًا، والحكم على نوعه لا يتم من الخارج."
        }
      ],
      coverageTitle: "شحن الوسائط من الشرقية إلى مختبر الرياض",
      coverageBody: "المختبر في الرياض، ولا يوجد لنا فرع في الدمام. في حالات المنشآت يتولى الترتيب غالبًا مسؤول تقنية المعلومات أو المشتريات، لذلك يبدأ المسار موثقًا: محادثة فنية عبر واتساب أو الهاتف نحدد فيها نوع النظام وعدد الأقراص ورسائل الخطأ وما جُرّب حتى الآن، ويمكن توقيع اتفاقية عدم إفصاح قبل أن تغادر الوسائط موقعك. عند التغليف يُرقّم كل قرص بموضعه داخل الهيكل، ويوضع في كيس مضاد للكهرباء الساكنة، ثم داخل صندوق صلب بحشوة تمنع الحركة. ونتّفق على تفاصيل الشحن قبل أن تغادر الوسائط الموقع، ومدة النقل لا تدخل في تقديرنا الفني. عند الوصول نبلغك بعدد الأقراص التي استلمناها وحالتها الظاهرة، ثم يبدأ الفحص والتشخيص المجاني، ولا تُنفّذ أي خطوة استعادة قبل أن تعتمدها. الملفات المستعادة تُسلّم على وسيط منفصل يُشحن إليك أو يُستلم من المختبر.",
      areas: [
        "الدمام — الفيصلية والشاطئ",
        "الدمام — عبدالله فؤاد والمزروعية",
        "الخبر — العقربية والراكة",
        "الخبر — الحزام الذهبي والثقبة",
        "الظهران — الدوحة ومنطقة الجامعة",
        "الجبيل الصناعية والفناتير",
        "القطيف وسيهات وصفوى",
        "بقيق ورأس تنورة"
      ],
      faqs: [
        {
          q: "ليس لديكم فرع في الدمام. كيف أرسل السيرفر أو الأقراص؟",
          a: "المختبر في الرياض فقط، والوسائط تصل شحنًا. نتفق أولًا على تفاصيل الحالة عن بُعد، ويمكن توقيع اتفاقية عدم إفصاح قبل إخراج الأقراص من غرفة السيرفر. ونتّفق على تفاصيل الشحن قبل إخراج الوسائط، ونبلغك عند الاستلام بما وصل وحالته الظاهرة."
        },
        {
          q: "هل أرسل السيرفر كاملاً أم الأقراص فقط؟",
          a: "في أغلب حالات RAID تكفي الأقراص مع صورة أو ملاحظة توضح ترتيبها داخل الهيكل ونوع المتحكم. أحيانًا نطلب بطاقة RAID أو الجهاز كاملاً إذا كان الإعداد غير قياسي. نحدد ذلك في المحادثة الفنية قبل الشحن، لا بعده."
        },
        {
          q: "هل تتعاملون مع بيانات الشركات والمقاولين باتفاقية سرية؟",
          a: "نعم. بيانات المشاريع والعقود تُعامل بسرية كاملة، ويمكن توقيع اتفاقية عدم إفصاح قبل استلام الوسائط. يتم التسليم على وسيط منفصل مع اتفاق واضح مسبقًا على طريقة التعامل مع النسخ بعد التسليم."
        },
        {
          q: "هل الفحص مجاني إذا شحنت من خارج الرياض، وكم يستغرق؟",
          a: "لا يوجد مقابل على الفحص أو التشخيص، ولا يترتب عليه التزام بالمتابعة، والحالات القادمة من الدمام والشرقية تُعامل كغيرها. أما المدة فلا تُقدَّر قبل رؤية الأقراص؛ بعد التشخيص نوضح نطاق العمل والمدة التقديرية، ثم تقرر البدء."
        }
      ],
      ctaHook: "أوقف المصفوفة قبل أن ترتب الشحن.",
      ctaBody: "أرسل نوع النظام، عدد الأقراص، رسائل الخطأ وما جُرّب حتى الآن. نراجع الحالة معك من الدمام قبل أن يتحرك أي قرص، والفحص والتشخيص مجاني بلا التزام."
    },
    en: {
      city: "Dammam",
      title: "Data Recovery in Dammam and the Eastern Province",
      metaTitle: "Data Recovery in Dammam & the Eastern Province | Zero 2 One",
      metaDesc: "Data recovery for Dammam, Khobar, Dhahran and Jubail: servers, RAID, engineering workstations and disks. Secure shipping to our Riyadh lab. Free inspection.",
      heroHook: "In the Eastern Province, one failure can stop a whole team.",
      heroIntro: "In Dammam, Khobar, Dhahran and Jubail the device that stops may not be a personal one at all: a file server, a RAID array, or an engineering workstation holding the drawings and models of a live project. In those cases the pressure to get back online quickly is the biggest threat to the data. Stop the system first, then ask.",
      whyTitle: "Why Dammam and Eastern Province cases are different",
      why: [
        {
          t: "A project archive, not personal files",
          b: "Energy contractors and engineering offices in Dammam and Jubail lose drawings, models and shared folders tied to a live contract and a delivery date. We treat the case as corporate data: clear confidentiality, the options and expected time explained after diagnosis and before work starts, and handover on a separate medium."
        },
        {
          t: "Server rooms with no resident storage engineer",
          b: "Many companies there run the server through an external provider who visits the site now and then. When a disk fails, the first reaction is to start a rebuild and restore service fast — and that can multiply the damage before anyone has inspected the array structure and disk order."
        },
        {
          t: "Disks that move between site and office",
          b: "External drives and field disks travel daily between work sites and offices in Jubail Industrial City, Abqaiq and Ras Tanura. A drop in transit or a power cut mid-copy can leave a fault that shows nothing at first, and its type cannot be judged from the outside."
        }
      ],
      coverageTitle: "Shipping the media from the Eastern Province to the Riyadh lab",
      coverageBody: "The lab is in Riyadh, and we have no branch in Dammam. In company cases the arrangement usually sits with an IT or procurement lead, so the route is documented from the start: a technical conversation on WhatsApp or by phone covering the system type, the number of disks, the error messages and what has been tried so far, and a non-disclosure agreement can be signed before the media leave your site. For packing, each disk is labelled with its slot in the chassis, placed in an anti-static bag, then in a rigid box with padding that stops it moving. We agree the shipping details before the media leave the site, and transit time is not part of our technical estimate. On arrival we tell you how many disks reached us and their visible condition, then the free inspection and diagnosis begins, and no recovery step is carried out before you approve it. Recovered files are handed over on a separate medium, either shipped to you or collected from the lab.",
      areas: [
        "Dammam — Al Faisaliyah & Ash Shati",
        "Dammam — Abdullah Fouad & Al Mazruiyah",
        "Khobar — Al Aqrabiyah & Ar Rakah",
        "Khobar — Golden Belt & Ath Thuqbah",
        "Dhahran — Ad Doha & the university area",
        "Jubail Industrial City & Al Fanateer",
        "Qatif, Saihat & Safwa",
        "Abqaiq & Ras Tanura"
      ],
      faqs: [
        {
          q: "You have no branch in Dammam. How do I send the server or the disks?",
          a: "The lab is in Riyadh only, and the media reach us by courier. We agree the case details remotely first, and a non-disclosure agreement can be signed before the disks leave the server room. We agree the shipping details before the media leave, and we tell you on receipt what reached us and its visible condition."
        },
        {
          q: "Should I send the whole server or only the disks?",
          a: "For most RAID cases the disks are enough, along with a photo or note showing their order in the chassis and the controller type. Sometimes we ask for the RAID card or the full unit if the setup is non-standard. That is decided in the technical conversation before shipping, not after."
        },
        {
          q: "Do you handle contractor and corporate data under an NDA?",
          a: "Yes. Project and contract data is handled with full confidentiality, and a non-disclosure agreement can be signed before the media are received. Handover is on a separate medium, with a clear prior agreement on how copies are handled afterwards."
        },
        {
          q: "Is inspection free if I ship from outside Riyadh, and how long does it take?",
          a: "There is no charge for the inspection or the diagnosis, and it commits you to nothing further; cases sent from Dammam and the Eastern Province are treated like any other. Arranging the courier stays with you and the company you pick. Duration is not estimated before we see the disks; after diagnosis we set out the scope and an estimated time, and then you decide whether to start."
        }
      ],
      ctaHook: "Stop the array before you arrange the shipment.",
      ctaBody: "Send the system type, the number of disks, the error messages and what has been tried so far. We review the case with you from Dammam before a single disk moves, and inspection and diagnosis are free with no obligation."
    }
  }
];
