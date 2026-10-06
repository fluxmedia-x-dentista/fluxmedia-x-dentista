import { section } from "@/lib/content/helpers";
import { ml, type ContentEntry } from "@/lib/types";

const autoPage = section("automations", "Automations page");
const socialHero = section("social", "Hero");
const socialBody = section("social", "Sections");
const cardsHero = section("cards", "Hero");
const cardsBody = section("cards", "Sections");
const about = section("about", "About page");
const request = section("request-contact", "Request hub");
const contact = section("request-contact", "Contact page");
const socialLinks = section("request-contact", "Social links page");

export const pageEntries: ContentEntry[] = [
  /* ---------------------------- Automations page -------------------------- */
  autoPage.text(
    "automations.page.badge",
    "Badge",
    ml("AI Automation", "Automatisation IA", "الأتمتة الذكية"),
  ),
  autoPage.text(
    "automations.page.title",
    "Title",
    ml(
      "Automation Systems We Build",
      "Les systèmes que nous construisons",
      "أنظمة الأتمتة التي نبنيها",
    ),
  ),
  autoPage.area(
    "automations.page.sub",
    "Subtitle",
    ml(
      "Each system below is built for your own tools and data. Pick the one closest to your need and send it to us on WhatsApp — we will tell you exactly what it takes.",
      "Chaque système ci-dessous est construit pour vos outils et vos données. Choisissez celui qui correspond le mieux et envoyez-le nous sur WhatsApp — nous vous dirons précisément ce que cela implique.",
      "كل نظام هنا يُبنى حسب أدواتك وبياناتك. اختر الأقرب إلى حاجتك وأرسله لنا على واتساب — وسنخبرك بالضبط بما يتطلبه.",
    ),
  ),
  autoPage.image(
    "automations.bg",
    "Page background",
    "/images/backgrounds/automations.svg",
    ml("Circuit network", "Réseau de circuits", "شبكة دوائر"),
    68,
  ),
  autoPage.text(
    "automations.page.detail_cta",
    "Detail page button",
    ml("Order on WhatsApp", "Commander sur WhatsApp", "اطلب عبر واتساب"),
  ),
  autoPage.area(
    "automations.page.detail_note",
    "Detail page note",
    ml(
      "Every system is quoted after a short call, because the price depends on your tools, your volume and how much already exists.",
      "Chaque système est chiffré après un court échange, car le prix dépend de vos outils, de votre volume et de l'existant.",
      "يُحدَّد سعر كل نظام بعد مكالمة قصيرة، لأنه يعتمد على أدواتك وحجم عملك وما هو موجود مسبقاً.",
    ),
  ),

  /* ------------------------------ Social page ----------------------------- */
  socialHero.text(
    "social.hero.badge",
    "Badge",
    ml(
      "Social Media Management",
      "Gestion des réseaux sociaux",
      "إدارة مواقع التواصل",
    ),
  ),
  socialHero.text(
    "social.hero.title1",
    "Headline line 1",
    ml("Your Pages,", "Vos pages,", "صفحاتك،"),
  ),
  socialHero.text(
    "social.hero.title2",
    "Headline line 2 (gradient)",
    ml("Handled Properly.", "gérées sérieusement.", "مُدارة باحترافية."),
  ),
  socialHero.area(
    "social.hero.sub",
    "Subtitle",
    ml(
      "Strategy, content, publishing and community management in one monthly package — in Darija, Arabic, French or English.",
      "Stratégie, contenu, publication et gestion de communauté dans une formule mensuelle — en darija, arabe, français ou anglais.",
      "استراتيجية ومحتوى ونشر وإدارة مجتمع في باقة شهرية واحدة — بالدارجة أو العربية أو الفرنسية أو الإنجليزية.",
    ),
  ),
  socialHero.text(
    "social.hero.cta",
    "Hero button",
    ml("See packages", "Voir les formules", "شاهد الباقات"),
  ),
  socialHero.image(
    "social.bg",
    "Page background",
    "/images/backgrounds/social-media.svg",
    ml("Content calendar artwork", "Calendrier de contenu", "تقويم المحتوى"),
    68,
  ),
  socialBody.text(
    "social.services.title",
    "Services title",
    ml("What's Included", "Ce qui est inclus", "ما الذي تتضمنه الخدمة"),
  ),
  socialBody.area(
    "social.services.sub",
    "Services subtitle",
    ml(
      "The same work every month, done on a schedule you can rely on.",
      "Le même travail chaque mois, selon un rythme sur lequel vous pouvez compter.",
      "نفس العمل كل شهر، وفق جدول يمكنك الاعتماد عليه.",
    ),
  ),
  socialBody.text(
    "social.platforms.title",
    "Platforms title",
    ml("Platforms We Manage", "Plateformes gérées", "المنصات التي نديرها"),
  ),
  socialBody.area(
    "social.platforms.note",
    "Honesty note",
    ml(
      "We only take on platforms we can genuinely keep active for you. If a platform does not fit your audience, we will say so instead of selling it.",
      "Nous ne prenons en charge que les plateformes que nous pouvons réellement animer. Si une plateforme ne correspond pas à votre audience, nous vous le dirons au lieu de vous la vendre.",
      "لا نتولى إلا المنصات التي نستطيع إبقاءها نشطة فعلاً. وإن كانت منصة لا تناسب جمهورك، سنخبرك بذلك بدل بيعها لك.",
    ),
  ),
  socialBody.text(
    "social.packages.title",
    "Packages title",
    ml("Monthly Packages", "Formules mensuelles", "الباقات الشهرية"),
  ),
  socialBody.area(
    "social.packages.sub",
    "Packages subtitle",
    ml(
      "Prices are per month in Moroccan dirham. Content volume can be adjusted — tell us what you need on WhatsApp.",
      "Prix mensuels en dirham marocain. Le volume de contenu est ajustable — dites-nous ce qu'il vous faut sur WhatsApp.",
      "الأسعار شهرية بالدرهم المغربي. يمكن تعديل حجم المحتوى — أخبرنا بما تحتاجه عبر واتساب.",
    ),
  ),
  socialBody.text(
    "social.process.title",
    "Process title",
    ml("How The Month Works", "Comment se déroule le mois", "كيف يسير الشهر"),
  ),
  socialBody.text(
    "social.faq.title",
    "FAQ title",
    ml("Questions", "Questions", "أسئلة"),
  ),
  socialBody.text(
    "social.final.title",
    "Final CTA title",
    ml(
      "Let's Plan Your Next Month",
      "Planifions votre prochain mois",
      "لنخطط لشهرك القادم",
    ),
  ),
  socialBody.area(
    "social.final.sub",
    "Final CTA subtitle",
    ml(
      "Send us the package you like on WhatsApp and we will reply with the onboarding questions.",
      "Envoyez-nous la formule qui vous intéresse sur WhatsApp et nous répondrons avec les questions de démarrage.",
      "أرسل لنا الباقة التي تناسبك عبر واتساب وسنرد عليك بأسئلة الانطلاق.",
    ),
  ),

  /* ------------------------------- Cards page ----------------------------- */
  cardsHero.text(
    "cards.hero.badge",
    "Badge",
    ml("DENTISTA Cards", "Cartes DENTISTA", "بطاقات DENTISTA"),
  ),
  cardsHero.text(
    "cards.hero.title1",
    "Headline line 1",
    ml(
      "Cards That Make The First Impression.",
      "Des cartes qui marquent la première impression.",
      "بطاقات تصنع الانطباع الأول.",
    ),
  ),
  cardsHero.text(
    "cards.hero.title2",
    "Headline line 2 (accent)",
    ml("And The Second Tap.", "Et le second geste.", "واللمسة الثانية."),
  ),
  cardsHero.area(
    "cards.hero.sub",
    "Subtitle",
    ml(
      "DENTISTA by design: printed cards in packs of 100, 200 or 500, and NFC cards sold one by one that share your whole profile with a tap.",
      "DENTISTA par nature : cartes imprimées par 100, 200 ou 500, et cartes NFC vendues à l'unité qui partagent tout votre profil d'un geste.",
      "DENTISTA بتصميم أنيق: بطاقات مطبوعة بكميات 100 أو 200 أو 500، وبطاقات NFC تُباع بالوحدة تشارك ملفك كاملاً بلمسة.",
    ),
  ),
  cardsHero.image(
    "cards.bg",
    "Page background",
    "/images/backgrounds/cards.svg",
    ml("Floating cards artwork", "Cartes flottantes", "بطاقات طائرة"),
    64,
  ),
  cardsBody.text(
    "cards.products.title",
    "Products title",
    ml("Choose Your Card", "Choisissez votre carte", "اختر بطاقتك"),
  ),
  cardsBody.area(
    "cards.products.sub",
    "Products subtitle",
    ml(
      "Pick a finish, pick a quantity, then send the order on WhatsApp. Design is included — we only need your logo and details.",
      "Choisissez une finition, une quantité, puis envoyez la commande sur WhatsApp. Le design est inclus — il nous faut seulement votre logo et vos coordonnées.",
      "اختر اللمسة النهائية ثم الكمية، وأرسل الطلب عبر واتساب. التصميم مشمول — نحتاج فقط شعارك وبياناتك.",
    ),
  ),
  cardsBody.text(
    "cards.nfc.title",
    "How NFC works title",
    ml(
      "How An NFC Card Works",
      "Comment fonctionne une carte NFC",
      "كيف تعمل بطاقة NFC",
    ),
  ),
  cardsBody.list("cards.nfc.steps", "How NFC works steps", [
    {
      title: ml("Tap the card", "Approchez la carte", "قرّب البطاقة"),
      text: ml(
        "Hold the card near the top of any modern phone — iPhone or Android.",
        "Tenez la carte près du haut de n'importe quel téléphone récent — iPhone ou Android.",
        "ضع البطاقة قرب أعلى أي هاتف حديث — آيفون أو أندرويد.",
      ),
    },
    {
      title: ml("Your profile opens", "Votre profil s'ouvre", "يفتح ملفك"),
      text: ml(
        "A link opens instantly. No app to install, on either side.",
        "Un lien s'ouvre instantanément. Aucune application à installer, des deux côtés.",
        "يفتح الرابط فوراً. بدون تطبيق على أي من الجهازين.",
      ),
    },
    {
      title: ml("They save you", "Ils vous enregistrent", "يحفظون بياناتك"),
      text: ml(
        "Phone, WhatsApp, email, socials and location saved in one tap.",
        "Téléphone, WhatsApp, email, réseaux et localisation enregistrés en un geste.",
        "الهاتف وواتساب والبريد والشبكات والموقع تُحفظ بلمسة واحدة.",
      ),
    },
    {
      title: ml("You stay updated", "Vous restez à jour", "تبقى محدثاً"),
      text: ml(
        "Changed number or new offer? Update the profile — the card keeps working.",
        "Numéro changé ou nouvelle offre ? Mettez le profil à jour — la carte continue de fonctionner.",
        "غيّرت رقمك أو لديك عرض جديد؟ حدّث الملف — والبطاقة تستمر في العمل.",
      ),
    },
  ]),
  cardsBody.text(
    "cards.compare.title",
    "Comparison title",
    ml("Regular vs NFC", "Classique vs NFC", "عادية مقابل NFC"),
  ),
  cardsBody.list(
    "cards.compare.rows",
    "Comparison rows",
    [
      {
        title: ml("Sold by", "Vendue par", "طريقة البيع"),
        text: ml(
          "Packs of 100 / 200 / 500",
          "Packs de 100 / 200 / 500",
          "حزم 100 / 200 / 500",
        ),
        extra: ml("One card at a time", "À l'unité", "بطاقة واحدة في كل مرة"),
      },
      {
        title: ml("Shares", "Partage", "ما تشاركه"),
        text: ml("Printed details", "Informations imprimées", "معلومات مطبوعة"),
        extra: ml(
          "Full digital profile",
          "Profil digital complet",
          "ملف رقمي كامل",
        ),
      },
      {
        title: ml("Needs an app", "Nécessite une app", "يحتاج تطبيقاً"),
        text: ml("No", "Non", "لا"),
        extra: ml(
          "No — works natively",
          "Non — fonctionne nativement",
          "لا — يعمل مباشرة",
        ),
      },
      {
        title: ml(
          "Update details later",
          "Mise à jour ultérieure",
          "تحديث البيانات لاحقاً",
        ),
        text: ml(
          "Needs reprinting",
          "Réimpression nécessaire",
          "يتطلب إعادة طباعة",
        ),
        extra: ml(
          "Edit the profile any time",
          "Modifiez le profil à tout moment",
          "عدّل الملف في أي وقت",
        ),
      },
      {
        title: ml("Best for", "Idéal pour", "الأنسب لـ"),
        text: ml(
          "Events, shops, teams",
          "Événements, boutiques, équipes",
          "الفعاليات والمتاجر والفرق",
        ),
        extra: ml(
          "Founders, sales, freelancers",
          "Fondateurs, commerciaux, freelances",
          "المؤسسين والمبيعات والمستقلين",
        ),
      },
    ],
    "Column 1 = feature, column 2 = Regular, column 3 = NFC",
  ),
  cardsBody.text(
    "cards.order.title",
    "Ordering process title",
    ml("Ordering Is Simple", "Commander est simple", "الطلب بسيط"),
  ),
  cardsBody.list("cards.order.steps", "Ordering steps", [
    {
      title: ml(
        "Send the card on WhatsApp",
        "Envoyez la carte sur WhatsApp",
        "أرسل البطاقة عبر واتساب",
      ),
      text: ml(
        "The button fills the message for you: card, type and quantity.",
        "Le bouton remplit le message pour vous : carte, type et quantité.",
        "الزر يملأ الرسالة لك: البطاقة والنوع والكمية.",
      ),
    },
    {
      title: ml(
        "Send your details",
        "Envoyez vos informations",
        "أرسل معلوماتك",
      ),
      text: ml(
        "Logo, name, job title, phone, socials — whatever should appear.",
        "Logo, nom, fonction, téléphone, réseaux — tout ce qui doit figurer.",
        "الشعار والاسم والوظيفة والهاتف والشبكات — كل ما يجب أن يظهر.",
      ),
    },
    {
      title: ml("Approve the design", "Validez le design", "اعتمد التصميم"),
      text: ml(
        "We send a preview. You approve or ask for changes.",
        "Nous envoyons un aperçu. Vous validez ou demandez des modifications.",
        "نرسل لك معاينة. توافق أو تطلب تعديلات.",
      ),
    },
    {
      title: ml(
        "Production & delivery",
        "Production & livraison",
        "الإنتاج والتسليم",
      ),
      text: ml(
        "Cards are produced and delivered across Morocco.",
        "Les cartes sont produites et livrées partout au Maroc.",
        "تُنتج البطاقات وتُسلَّم في جميع أنحاء المغرب.",
      ),
    },
  ]),
  cardsBody.text(
    "cards.faq.title",
    "FAQ title",
    ml("Card Questions", "Questions sur les cartes", "أسئلة عن البطاقات"),
  ),
  cardsBody.text(
    "cards.final.title",
    "Final CTA title",
    ml(
      "Ready For Your DENTISTA Card?",
      "Prêt pour votre carte DENTISTA ?",
      "جاهز لبطاقة DENTISTA؟",
    ),
  ),
  cardsBody.area(
    "cards.final.sub",
    "Final CTA subtitle",
    ml(
      "Tell us the card and the quantity on WhatsApp — we reply with the design questions and the delivery time.",
      "Indiquez la carte et la quantité sur WhatsApp — nous répondons avec les questions de design et le délai de livraison.",
      "أخبرنا بالبطاقة والكمية عبر واتساب — وسنرد بأسئلة التصميم ومدة التسليم.",
    ),
  ),

  /* -------------------------------- About --------------------------------- */
  about.text("about.hero.badge", "Badge", ml("About", "À propos", "من نحن")),
  about.text(
    "about.hero.title",
    "Title",
    ml(
      "A Small Studio For Systems And Presence",
      "Un petit studio pour vos systèmes et votre présence",
      "استوديو صغير للأنظمة والحضور الرقمي",
    ),
  ),
  about.area(
    "about.hero.sub",
    "Subtitle",
    ml(
      "FLUXMEDIA is based in Beni Mellal, Morocco. We work with small businesses, clinics, shops and freelancers who want their daily operations to run with less effort — and their brand to look serious online.",
      "FLUXMEDIA est basée à Béni Mellal, au Maroc. Nous accompagnons petites entreprises, cliniques, commerces et indépendants qui veulent des opérations plus fluides — et une marque crédible en ligne.",
      "تتخذ FLUXMEDIA من بني ملال بالمغرب مقراً لها. نعمل مع الشركات الصغيرة والعيادات والمتاجر والمستقلين الراغبين في تشغيل عملهم اليومي بجهد أقل وبصورة احترافية على الإنترنت.",
    ),
  ),
  about.text(
    "about.services.title",
    "Services title",
    ml("What We Offer", "Ce que nous proposons", "ما نقدمه"),
  ),
  about.text(
    "about.principles.title",
    "Principles title",
    ml("What We Believe", "Nos principes", "مبادئنا"),
  ),
  about.list("about.principles.items", "Principles", [
    {
      title: ml(
        "Honesty over hype",
        "L'honnêteté avant le marketing",
        "الصدق قبل التسويق",
      ),
      text: ml(
        "We do not publish fake clients, fake reviews or invented statistics.",
        "Nous ne publions ni faux clients, ni faux avis, ni statistiques inventées.",
        "لا ننشر عملاء وهميين ولا تقييمات مزيفة ولا إحصائيات مختلقة.",
      ),
    },
    {
      title: ml(
        "Simple beats clever",
        "Simple vaut mieux que compliqué",
        "البساطة قبل التعقيد",
      ),
      text: ml(
        "A system nobody understands is a system nobody keeps using.",
        "Un système que personne ne comprend est un système que personne n'utilise.",
        "النظام الذي لا يفهمه أحد لن يستمر أحد في استخدامه.",
      ),
    },
    {
      title: ml(
        "Own your data",
        "Vos données vous appartiennent",
        "بياناتك ملكك",
      ),
      text: ml(
        "Accounts and automations are created in your name, not ours.",
        "Comptes et automatisations sont créés à votre nom, pas au nôtre.",
        "تُنشأ الحسابات والأنظمة باسمك، لا باسمنا.",
      ),
    },
    {
      title: ml("Answer fast", "Répondre vite", "الرد السريع"),
      text: ml(
        "WhatsApp is our main channel for a reason: you get a human reply.",
        "WhatsApp est notre canal principal pour une raison : vous obtenez une réponse humaine.",
        "واتساب قناتنا الأساسية لسبب: تحصل على رد بشري.",
      ),
    },
    {
      title: ml(
        "Finish what we start",
        "Finir ce qu'on commence",
        "نُنهي ما نبدأه",
      ),
      text: ml(
        "A project ends when it works in your hands, not when it is delivered.",
        "Un projet se termine quand il fonctionne entre vos mains, pas à la livraison.",
        "ينتهي المشروع حين يعمل بين يديك، لا عند التسليم.",
      ),
    },
  ]),
  about.text(
    "about.brands.title",
    "Our brands title",
    ml("Our Brands", "Nos marques", "علاماتنا"),
  ),
  about.area(
    "about.brands.flux",
    "FLUXMEDIA description",
    ml(
      "The studio: AI automation systems and social media management for businesses that want to grow without hiring a bigger team.",
      "Le studio : systèmes d'automatisation IA et gestion des réseaux sociaux pour des entreprises qui veulent grandir sans agrandir leur équipe.",
      "الاستوديو: أنظمة أتمتة بالذكاء الاصطناعي وإدارة مواقع التواصل للشركات التي تريد النمو دون توسيع فريقها.",
    ),
  ),
  about.area(
    "about.brands.dentista",
    "DENTISTA description",
    ml(
      "The card brand: regular printed cards and NFC cards, designed and produced for professionals across Morocco.",
      "La marque de cartes : cartes classiques imprimées et cartes NFC, conçues et produites pour les professionnels partout au Maroc.",
      "علامة البطاقات: بطاقات مطبوعة عادية وبطاقات NFC، تُصمَّم وتُنتج للمحترفين في كل المغرب.",
    ),
  ),
  about.text(
    "about.final.title",
    "Final CTA title",
    ml(
      "Want To Work Together?",
      "Envie de travailler ensemble ?",
      "هل نعمل معاً؟",
    ),
  ),

  /* ------------------------------- Request -------------------------------- */
  request.text(
    "request.title",
    "Title",
    ml(
      "What Would You Like To Order?",
      "Que souhaitez-vous commander ?",
      "ماذا تريد أن تطلب؟",
    ),
  ),
  request.area(
    "request.sub",
    "Subtitle",
    ml(
      "No forms here. Choose what you need, and the WhatsApp message will be written for you.",
      "Aucun formulaire ici. Choisissez ce dont vous avez besoin, le message WhatsApp est rédigé pour vous.",
      "لا توجد نماذج هنا. اختر ما تحتاجه وسنكتب لك رسالة واتساب جاهزة.",
    ),
  ),
  request.text(
    "request.card1.title",
    "Card 1 title",
    ml("An automation system", "Un système d'automatisation", "نظام أتمتة"),
  ),
  request.area(
    "request.card1.text",
    "Card 1 text",
    ml(
      "Browse the systems we build and send the one that fits.",
      "Parcourez les systèmes que nous construisons et envoyez celui qui vous convient.",
      "تصفّح الأنظمة التي نبنيها وأرسل المناسب لك.",
    ),
  ),
  request.text(
    "request.card2.title",
    "Card 2 title",
    ml(
      "A social media package",
      "Une formule réseaux sociaux",
      "باقة لمواقع التواصل",
    ),
  ),
  request.area(
    "request.card2.text",
    "Card 2 text",
    ml(
      "Monthly management with a fixed price in dirham.",
      "Gestion mensuelle à prix fixe en dirham.",
      "إدارة شهرية بسعر ثابت بالدرهم.",
    ),
  ),
  request.text(
    "request.card3.title",
    "Card 3 title",
    ml("DENTISTA cards", "Cartes DENTISTA", "بطاقات DENTISTA"),
  ),
  request.area(
    "request.card3.text",
    "Card 3 text",
    ml(
      "Regular packs or NFC cards, delivered across Morocco.",
      "Packs classiques ou cartes NFC, livrés partout au Maroc.",
      "حزم عادية أو بطاقات NFC، تُوصَّل في كل المغرب.",
    ),
  ),
  request.text(
    "request.unsure.title",
    "Not sure title",
    ml("Not sure? Chat with us", "Pas sûr ? Discutons", "غير متأكد؟ تحدث معنا"),
  ),
  request.area(
    "request.unsure.text",
    "Not sure text",
    ml(
      'Describe your situation in a few words and we will tell you what makes sense — even if the answer is "you don\'t need us yet".',
      "Décrivez votre situation en quelques mots et nous vous dirons ce qui a du sens — même si la réponse est « vous n'avez pas encore besoin de nous ».",
      "صف وضعك في بضع كلمات وسنخبرك بما يناسبك — حتى لو كان الجواب أنك لا تحتاجنا بعد.",
    ),
  ),

  /* ------------------------------- Contact -------------------------------- */
  contact.text(
    "contact.title",
    "Title",
    ml("Contact FLUXMEDIA", "Contacter FLUXMEDIA", "اتصل بـ FLUXMEDIA"),
  ),
  contact.area(
    "contact.sub",
    "Subtitle",
    ml(
      "WhatsApp is the fastest way to reach us. The form below works too — we answer within one working day.",
      "WhatsApp est le moyen le plus rapide de nous joindre. Le formulaire fonctionne aussi — réponse sous un jour ouvré.",
      "واتساب أسرع وسيلة للوصول إلينا. النموذج أدناه يعمل أيضاً — نرد خلال يوم عمل واحد.",
    ),
  ),
  contact.text(
    "contact.info_title",
    "Info card title",
    ml("Direct contact", "Contact direct", "تواصل مباشر"),
  ),
  contact.text(
    "contact.form_title",
    "Form title",
    ml("Send a message", "Envoyer un message", "أرسل رسالة"),
  ),
  contact.text("contact.form.name", "Field: name", ml("Name", "Nom", "الاسم")),
  contact.text(
    "contact.form.email",
    "Field: email",
    ml("Email", "Email", "البريد الإلكتروني"),
  ),
  contact.text(
    "contact.form.whatsapp",
    "Field: WhatsApp",
    ml("WhatsApp number", "Numéro WhatsApp", "رقم واتساب"),
  ),
  contact.text(
    "contact.form.company",
    "Field: company",
    ml("Business name", "Nom de l'entreprise", "اسم النشاط"),
  ),
  contact.text(
    "contact.form.message",
    "Field: message",
    ml("Your message", "Votre message", "رسالتك"),
  ),
  contact.text(
    "contact.form.submit",
    "Submit button",
    ml("Send message", "Envoyer le message", "إرسال الرسالة"),
  ),
  contact.text(
    "contact.form.success",
    "Success message",
    ml(
      "Thank you — your message is with us. We will reply shortly.",
      "Merci — votre message nous est bien parvenu. Nous répondrons rapidement.",
      "شكراً لك — وصلتنا رسالتك وسنرد قريباً.",
    ),
  ),
  contact.text(
    "contact.form.error",
    "Error message",
    ml(
      "Something went wrong. Please try WhatsApp instead.",
      "Une erreur est survenue. Essayez plutôt WhatsApp.",
      "حدث خطأ ما. جرّب التواصل عبر واتساب.",
    ),
  ),

  /* ---------------------------- Social links page -------------------------- */
  socialLinks.text(
    "social.links.title",
    "Title",
    ml("Find Us Online", "Nous retrouver en ligne", "تجدنا هنا"),
  ),
  socialLinks.area(
    "social.links.sub",
    "Subtitle",
    ml(
      "All the official FLUXMEDIA and DENTISTA channels in one place.",
      "Tous les canaux officiels FLUXMEDIA et DENTISTA au même endroit.",
      "كل قنوات FLUXMEDIA و DENTISTA الرسمية في مكان واحد.",
    ),
  ),
];
