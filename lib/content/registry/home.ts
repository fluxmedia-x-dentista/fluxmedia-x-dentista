import { section } from "@/lib/content/helpers";
import { ml, type ContentEntry } from "@/lib/types";

const hero = section("home", "Hero");
const specialties = section("home", "Specialties");
const help = section("home", "How we help");
const auto = section("home", "Automation visual");
const social = section("home", "Social visual");
const cards = section("home", "DENTISTA cards section");
const combined = section("home", "Combined value");
const process = section("home", "Process");
const trust = section("home", "Trust");
const final = section("home", "Final CTA");

export const homeEntries: ContentEntry[] = [
  /* --------------------------------- Hero -------------------------------- */
  hero.text(
    "home.hero.badge",
    "Badge",
    ml(
      "AI Automation × Social Media × DENTISTA Cards",
      "Automatisation IA × Réseaux sociaux × Cartes DENTISTA",
      "أتمتة الذكاء الاصطناعي × التواصل الاجتماعي × بطاقات DENTISTA",
    ),
  ),
  hero.text(
    "home.hero.title1",
    "Headline line 1",
    ml(
      "Build Smarter Systems.",
      "Des systèmes plus intelligents.",
      "ابنِ أنظمة أذكى.",
    ),
  ),
  hero.text(
    "home.hero.title2",
    "Headline line 2 (gradient)",
    ml(
      "Grow Stronger Online.",
      "Une présence en ligne plus forte.",
      "وانمُ بقوة على الإنترنت.",
    ),
  ),
  hero.area(
    "home.hero.sub",
    "Subtitle",
    ml(
      "Less manual work. Better systems. Stronger online presence. We build AI automation that runs your repetitive work, manage your social media end to end, and print the DENTISTA cards that open the conversation.",
      "Moins de travail manuel. De meilleurs systèmes. Une présence en ligne plus forte. Nous construisons des automatisations IA qui gèrent vos tâches répétitives, pilotons vos réseaux sociaux de bout en bout et imprimons les cartes DENTISTA qui lancent la conversation.",
      "عمل يدوي أقل. أنظمة أفضل. حضور رقمي أقوى. نبني أنظمة أتمتة بالذكاء الاصطناعي تتولى مهامك المتكررة، وندير مواقع تواصلك من الألف إلى الياء، ونطبع بطاقات DENTISTA التي تفتح باب الحديث.",
    ),
  ),
  hero.text(
    "home.hero.cta1",
    "Primary button",
    ml("Start a Project", "Démarrer un projet", "ابدأ مشروعاً"),
  ),
  hero.text(
    "home.hero.cta2",
    "Secondary button",
    ml("Explore Our Services", "Découvrir nos services", "اكتشف خدماتنا"),
  ),
  hero.image(
    "home.bg",
    "Hero background",
    "/images/backgrounds/home.svg",
    ml("Abstract node network", "Réseau de nœuds abstrait", "شبكة عقد تجريدية"),
    62,
  ),
  hero.text(
    "home.hero.card_workflow",
    "Floating card: workflow title",
    ml("Lead workflow", "Flux de prospects", "مسار العملاء"),
  ),
  hero.text(
    "home.hero.card_post",
    "Floating card: post title",
    ml("Scheduled post", "Publication programmée", "منشور مجدول"),
  ),
  hero.text(
    "home.hero.card_reach",
    "Floating card: reach title",
    ml("Reach this week", "Portée cette semaine", "الوصول هذا الأسبوع"),
  ),
  hero.text(
    "home.hero.card_bubble",
    "Floating card: bubble text",
    ml("New lead → CRM", "Nouveau prospect → CRM", "عميل جديد ← CRM"),
  ),

  /* ----------------------------- Specialties ----------------------------- */
  specialties.text(
    "home.specialties.badge",
    "Badge",
    ml("What we do", "Ce que nous faisons", "ما الذي نقوم به"),
  ),
  specialties.text(
    "home.specialties.title",
    "Title",
    ml(
      "Three Services. One Digital Growth System.",
      "Trois services. Un seul système de croissance.",
      "ثلاث خدمات. نظام نمو رقمي واحد.",
    ),
  ),
  specialties.area(
    "home.specialties.sub",
    "Subtitle",
    ml(
      "Automation removes the manual work, social media brings the attention, and DENTISTA cards turn every meeting into a saved contact.",
      "L'automatisation supprime le travail manuel, les réseaux sociaux attirent l'attention et les cartes DENTISTA transforment chaque rencontre en contact enregistré.",
      "الأتمتة تزيل العمل اليدوي، ومواقع التواصل تجلب الانتباه، وبطاقات DENTISTA تحوّل كل لقاء إلى جهة اتصال محفوظة.",
    ),
  ),
  specialties.text(
    "home.specialties.automation.title",
    "Card 1 title",
    ml(
      "AI Automation Systems",
      "Systèmes d'automatisation IA",
      "أنظمة الأتمتة بالذكاء الاصطناعي",
    ),
  ),
  specialties.area(
    "home.specialties.automation.text",
    "Card 1 text",
    ml(
      "Connected workflows that handle messages, leads, follow-ups and reporting without anyone copying data by hand.",
      "Des workflows connectés qui gèrent messages, prospects, relances et rapports sans aucune saisie manuelle.",
      "مسارات عمل مترابطة تتولى الرسائل والعملاء والمتابعات والتقارير دون نسخ البيانات يدوياً.",
    ),
  ),
  specialties.list("home.specialties.automation.items", "Card 1 checklist", [
    {
      title: ml(
        "Instagram & WhatsApp auto-replies",
        "Réponses automatiques Instagram & WhatsApp",
        "ردود تلقائية على إنستغرام وواتساب",
      ),
    },
    {
      title: ml(
        "Forms that write straight into your CRM",
        "Formulaires reliés directement au CRM",
        "نماذج تُسجَّل مباشرة في نظام العملاء",
      ),
    },
    {
      title: ml(
        "Automatic follow-up sequences",
        "Séquences de relance automatiques",
        "سلاسل متابعة تلقائية",
      ),
    },
    {
      title: ml(
        "Appointment booking & reminders",
        "Prise de rendez-vous & rappels",
        "حجز المواعيد والتذكيرات",
      ),
    },
    {
      title: ml(
        "AI answers for repeated questions",
        "Réponses IA aux questions récurrentes",
        "إجابات ذكية للأسئلة المتكررة",
      ),
    },
    {
      title: ml(
        "Abandoned cart recovery",
        "Récupération de paniers abandonnés",
        "استرجاع السلات المتروكة",
      ),
    },
    {
      title: ml(
        "Internal assistants over your documents",
        "Assistants internes sur vos documents",
        "مساعدون داخليون على مستنداتك",
      ),
    },
    {
      title: ml(
        "Weekly reports delivered automatically",
        "Rapports hebdomadaires automatiques",
        "تقارير أسبوعية تصل تلقائياً",
      ),
    },
  ]),
  specialties.text(
    "home.specialties.automation.cta",
    "Card 1 button",
    ml("See automations", "Voir les automatisations", "شاهد الأنظمة"),
  ),
  specialties.text(
    "home.specialties.social.title",
    "Card 2 title",
    ml(
      "Social Media Management",
      "Gestion des réseaux sociaux",
      "إدارة مواقع التواصل",
    ),
  ),
  specialties.area(
    "home.specialties.social.text",
    "Card 2 text",
    ml(
      "Strategy, content, publishing and community management handled monthly — so your pages stay alive and consistent.",
      "Stratégie, contenu, publication et gestion de communauté pris en charge chaque mois — vos pages restent vivantes et cohérentes.",
      "استراتيجية ومحتوى ونشر وإدارة مجتمع شهرياً — لتبقى صفحاتك نشطة ومنسجمة.",
    ),
  ),
  specialties.list("home.specialties.social.items", "Card 2 checklist", [
    {
      title: ml(
        "Content strategy & monthly plan",
        "Stratégie de contenu & plan mensuel",
        "استراتيجية محتوى وخطة شهرية",
      ),
    },
    {
      title: ml(
        "Post, reel and story design",
        "Création de posts, reels et stories",
        "تصميم المنشورات والريلز والستوري",
      ),
    },
    {
      title: ml(
        "Captions in Darija, Arabic, French & English",
        "Légendes en darija, arabe, français & anglais",
        "تعليقات بالدارجة والعربية والفرنسية والإنجليزية",
      ),
    },
    {
      title: ml(
        "Scheduling & publishing",
        "Programmation & publication",
        "الجدولة والنشر",
      ),
    },
    {
      title: ml(
        "Community management & DMs",
        "Gestion de communauté & messages privés",
        "إدارة المجتمع والرسائل الخاصة",
      ),
    },
    {
      title: ml(
        "Hashtag & trend research",
        "Recherche de hashtags & tendances",
        "بحث الهاشتاغات والترندات",
      ),
    },
    {
      title: ml(
        "Monthly performance reporting",
        "Rapport de performance mensuel",
        "تقرير أداء شهري",
      ),
    },
    {
      title: ml(
        "Ad-ready creative on request",
        "Créations prêtes pour la pub sur demande",
        "تصاميم جاهزة للإعلانات عند الطلب",
      ),
    },
  ]),
  specialties.text(
    "home.specialties.social.cta",
    "Card 2 button",
    ml("See packages", "Voir les formules", "شاهد الباقات"),
  ),
  specialties.text(
    "home.specialties.cards.title",
    "Card 3 title",
    ml(
      "DENTISTA Cards — Regular & NFC",
      "Cartes DENTISTA — Classiques & NFC",
      "بطاقات DENTISTA — عادية و NFC",
    ),
  ),
  specialties.area(
    "home.specialties.cards.text",
    "Card 3 text",
    ml(
      "Printed business cards and tap-to-share NFC cards that send your full profile to any phone.",
      "Cartes de visite imprimées et cartes NFC sans contact qui envoient votre profil complet à tout téléphone.",
      "بطاقات عمل مطبوعة وبطاقات NFC باللمس ترسل ملفك الكامل إلى أي هاتف.",
    ),
  ),
  specialties.list("home.specialties.cards.items", "Card 3 checklist", [
    {
      title: ml(
        "Regular cards in packs of 100 / 200 / 500",
        "Cartes classiques par 100 / 200 / 500",
        "بطاقات عادية بكميات 100 / 200 / 500",
      ),
    },
    {
      title: ml(
        "NFC cards sold one by one",
        "Cartes NFC vendues à l'unité",
        "بطاقات NFC تُباع بالوحدة",
      ),
    },
    {
      title: ml(
        "Matte, glossy, soft-touch, metal & wood",
        "Mat, brillant, soft-touch, métal & bois",
        "مطفي، لامع، ناعم الملمس، معدن وخشب",
      ),
    },
    {
      title: ml(
        "Works with iPhone & Android — no app",
        "Compatible iPhone & Android — sans application",
        "يعمل مع آيفون وأندرويد — بدون تطبيق",
      ),
    },
    {
      title: ml(
        "Share phone, WhatsApp, socials & location",
        "Partagez téléphone, WhatsApp, réseaux & localisation",
        "شارك الهاتف وواتساب والشبكات والموقع",
      ),
    },
    {
      title: ml(
        "Update your profile any time",
        "Mettez votre profil à jour à tout moment",
        "حدّث ملفك في أي وقت",
      ),
    },
    {
      title: ml(
        "Design included with every order",
        "Design inclus dans chaque commande",
        "التصميم مشمول في كل طلب",
      ),
    },
    {
      title: ml(
        "Delivery across Morocco",
        "Livraison partout au Maroc",
        "توصيل في جميع أنحاء المغرب",
      ),
    },
  ]),
  specialties.text(
    "home.specialties.cards.cta",
    "Card 3 button",
    ml(
      "See DENTISTA cards",
      "Voir les cartes DENTISTA",
      "شاهد بطاقات DENTISTA",
    ),
  ),
  specialties.list("home.specialties.flow", "Flow strip", [
    { title: ml("Automate", "Automatiser", "أتمتة") },
    { title: ml("Manage", "Gérer", "إدارة") },
    { title: ml("Grow", "Développer", "نمو") },
    { title: ml("Connect", "Connecter", "تواصل") },
  ]),

  /* ----------------------------- How we help ----------------------------- */
  help.text(
    "home.help.badge",
    "Badge",
    ml("How we help", "Notre approche", "كيف نساعدك"),
  ),
  help.text(
    "home.help.title",
    "Title",
    ml(
      "A Simple Way To Work Together",
      "Une façon simple de travailler ensemble",
      "طريقة بسيطة للعمل معاً",
    ),
  ),
  help.area(
    "home.help.sub",
    "Subtitle",
    ml(
      "No long contracts to understand, no jargon. We look at how your business actually runs, then remove the parts that waste your time.",
      "Pas de contrats interminables, pas de jargon. Nous observons le fonctionnement réel de votre activité, puis supprimons ce qui vous fait perdre du temps.",
      "بدون عقود معقدة ولا مصطلحات غامضة. ننظر في طريقة عمل نشاطك فعلياً، ثم نزيل ما يضيّع وقتك.",
    ),
  ),
  help.list("home.help.items", "Cards", [
    {
      title: ml("Understand", "Comprendre", "نفهم"),
      text: ml(
        "We map your current process: where messages arrive, who answers, what gets lost.",
        "Nous cartographions votre processus actuel : d'où viennent les messages, qui répond, ce qui se perd.",
        "نرسم مسار عملك الحالي: من أين تصل الرسائل، ومن يرد، وما الذي يضيع.",
      ),
    },
    {
      title: ml("Build", "Construire", "نبني"),
      text: ml(
        "We design the system around your tools — no need to change everything you already use.",
        "Nous concevons le système autour de vos outils — inutile de tout changer.",
        "نصمم النظام حول أدواتك الحالية — دون الحاجة لتغيير كل شيء.",
      ),
    },
    {
      title: ml("Automate", "Automatiser", "نؤتمت"),
      text: ml(
        "Repetitive steps run on their own: replies, data entry, reminders and reports.",
        "Les étapes répétitives tournent seules : réponses, saisie, rappels et rapports.",
        "الخطوات المتكررة تعمل وحدها: الردود وإدخال البيانات والتذكيرات والتقارير.",
      ),
    },
    {
      title: ml("Manage", "Gérer", "ندير"),
      text: ml(
        "Your social media is planned, produced and published on a monthly rhythm.",
        "Vos réseaux sociaux sont planifiés, produits et publiés selon un rythme mensuel.",
        "نخطط وننتج وننشر محتوى تواصلك وفق إيقاع شهري.",
      ),
    },
    {
      title: ml("Improve", "Améliorer", "نحسّن"),
      text: ml(
        "We review what the numbers say each month and adjust the system accordingly.",
        "Chaque mois, nous analysons les chiffres et ajustons le système.",
        "نراجع الأرقام كل شهر ونعدّل النظام بناءً عليها.",
      ),
    },
  ]),

  /* -------------------------- Automation visual -------------------------- */
  auto.text(
    "home.auto.badge",
    "Badge",
    ml("AI Automation", "Automatisation IA", "الأتمتة الذكية"),
  ),
  auto.text(
    "home.auto.title",
    "Title",
    ml(
      "Workflows That Run While You Work",
      "Des workflows qui tournent pendant que vous travaillez",
      "مسارات عمل تشتغل بينما تعمل أنت",
    ),
  ),
  auto.area(
    "home.auto.sub",
    "Subtitle",
    ml(
      "Every system is a chain of small, reliable steps. Here are two we build most often.",
      "Chaque système est une suite de petites étapes fiables. En voici deux que nous construisons souvent.",
      "كل نظام هو سلسلة من خطوات صغيرة موثوقة. إليك اثنين نبنيهما كثيراً.",
    ),
  ),
  auto.list("home.auto.flow1", "Flow 1 steps", [
    {
      title: ml(
        "Instagram DM received",
        "Message Instagram reçu",
        "وصول رسالة إنستغرام",
      ),
    },
    {
      title: ml(
        "AI reads the intent",
        "L'IA comprend l'intention",
        "الذكاء الاصطناعي يفهم الطلب",
      ),
    },
    {
      title: ml(
        "Instant personalised reply",
        "Réponse personnalisée instantanée",
        "رد فوري مخصص",
      ),
    },
    {
      title: ml(
        "Lead saved to CRM",
        "Prospect enregistré dans le CRM",
        "حفظ العميل في CRM",
      ),
    },
    {
      title: ml(
        "Owner notified on WhatsApp",
        "Notification WhatsApp au gérant",
        "إشعار للمالك على واتساب",
      ),
    },
  ]),
  auto.list("home.auto.flow2", "Flow 2 steps", [
    {
      title: ml(
        "Website form submitted",
        "Formulaire du site envoyé",
        "إرسال نموذج الموقع",
      ),
    },
    {
      title: ml(
        "Data cleaned & validated",
        "Données nettoyées & validées",
        "تنظيف البيانات والتحقق منها",
      ),
    },
    {
      title: ml(
        "Deal created in pipeline",
        "Opportunité créée dans le pipeline",
        "إنشاء صفقة في المسار",
      ),
    },
    {
      title: ml(
        "Follow-up emails scheduled",
        "Emails de relance programmés",
        "جدولة رسائل المتابعة",
      ),
    },
    {
      title: ml(
        "Weekly summary sent",
        "Résumé hebdomadaire envoyé",
        "إرسال ملخص أسبوعي",
      ),
    },
  ]),
  auto.text(
    "home.auto.cta",
    "Button",
    ml(
      "Explore all automations",
      "Voir toutes les automatisations",
      "استكشف كل الأنظمة",
    ),
  ),

  /* ---------------------------- Social visual ---------------------------- */
  social.text(
    "home.social.badge",
    "Badge",
    ml("Social Media", "Réseaux sociaux", "مواقع التواصل"),
  ),
  social.text(
    "home.social.title",
    "Title",
    ml(
      "Pages That Stay Active, Month After Month",
      "Des pages actives, mois après mois",
      "صفحات نشطة، شهراً بعد شهر",
    ),
  ),
  social.area(
    "home.social.sub",
    "Subtitle",
    ml(
      "A clear calendar, content that matches your brand, and someone who actually answers the DMs.",
      "Un calendrier clair, un contenu fidèle à votre marque et quelqu'un qui répond vraiment aux messages.",
      "تقويم واضح، ومحتوى يشبه علامتك، ومن يرد فعلاً على الرسائل.",
    ),
  ),
  social.list("home.social.chips", "Chips", [
    { title: ml("Strategy", "Stratégie", "استراتيجية") },
    { title: ml("Design", "Design", "تصميم") },
    { title: ml("Copywriting", "Rédaction", "كتابة") },
    { title: ml("Scheduling", "Programmation", "جدولة") },
    { title: ml("Community", "Communauté", "مجتمع") },
    { title: ml("Reporting", "Rapports", "تقارير") },
  ]),
  social.text(
    "home.social.cta",
    "Button",
    ml("See social packages", "Voir les formules", "شاهد الباقات"),
  ),

  /* ------------------------- DENTISTA cards block ------------------------ */
  cards.text(
    "home.cards.badge",
    "Badge",
    ml("DENTISTA Cards", "Cartes DENTISTA", "بطاقات DENTISTA"),
  ),
  cards.text(
    "home.cards.title1",
    "Headline line 1",
    ml("One Tap.", "Un seul geste.", "لمسة واحدة."),
  ),
  cards.text(
    "home.cards.title2",
    "Headline line 2 (accent)",
    ml(
      "Your Whole Business Card.",
      "Toute votre carte de visite.",
      "بطاقة عملك كاملة.",
    ),
  ),
  cards.area(
    "home.cards.sub",
    "Subtitle",
    ml(
      "DENTISTA makes two kinds of cards: beautifully printed regular cards, and NFC cards that share your contact details, socials and location with a single tap.",
      "DENTISTA propose deux types de cartes : des cartes classiques superbement imprimées et des cartes NFC qui partagent vos coordonnées, réseaux et localisation d'un simple geste.",
      "تقدم DENTISTA نوعين من البطاقات: بطاقات عادية مطبوعة بإتقان، وبطاقات NFC تشارك بياناتك وشبكاتك وموقعك بلمسة واحدة.",
    ),
  ),
  cards.text(
    "home.cards.chip_regular",
    "Chip: regular",
    ml("Regular cards", "Cartes classiques", "بطاقات عادية"),
  ),
  cards.text(
    "home.cards.chip_nfc",
    "Chip: NFC",
    ml("NFC cards", "Cartes NFC", "بطاقات NFC"),
  ),
  cards.text(
    "home.cards.cta",
    "Button",
    ml("Discover DENTISTA", "Découvrir DENTISTA", "اكتشف DENTISTA"),
  ),

  /* --------------------------- Combined value ---------------------------- */
  combined.text(
    "home.combined.badge",
    "Badge",
    ml("Better together", "Encore meilleur ensemble", "أفضل معاً"),
  ),
  combined.text(
    "home.combined.title1",
    "Headline line 1",
    ml(
      "Content Brings Attention.",
      "Le contenu attire l'attention.",
      "المحتوى يجلب الانتباه.",
    ),
  ),
  combined.text(
    "home.combined.title2",
    "Headline line 2 (gradient)",
    ml(
      "Systems Turn Attention Into Business.",
      "Les systèmes transforment l'attention en business.",
      "والأنظمة تحوّل الانتباه إلى أعمال.",
    ),
  ),
  combined.area(
    "home.combined.sub",
    "Subtitle",
    ml(
      "This is what happens when social media and automation work as one chain.",
      "Voici ce qui se passe quand réseaux sociaux et automatisation forment une seule chaîne.",
      "هذا ما يحدث عندما تعمل مواقع التواصل والأتمتة كسلسلة واحدة.",
    ),
  ),
  combined.list("home.combined.chain", "Chain nodes", [
    { title: ml("Post published", "Publication en ligne", "نشر المنشور") },
    { title: ml("People engage", "Les gens réagissent", "تفاعل الجمهور") },
    {
      title: ml(
        "DM or comment arrives",
        "Message ou commentaire reçu",
        "وصول رسالة أو تعليق",
      ),
    },
    {
      title: ml("Automation replies", "L'automatisation répond", "الأتمتة ترد"),
    },
    { title: ml("Lead qualified", "Prospect qualifié", "تأهيل العميل") },
    { title: ml("Saved in CRM", "Enregistré dans le CRM", "حفظ في CRM") },
    { title: ml("Follow-up sent", "Relance envoyée", "إرسال المتابعة") },
    { title: ml("Client won", "Client signé", "كسب العميل") },
  ]),

  /* -------------------------------- Process ------------------------------ */
  process.text(
    "home.process.badge",
    "Badge",
    ml("Process", "Processus", "مراحل العمل"),
  ),
  process.text(
    "home.process.title",
    "Title",
    ml(
      "From First Message To Live System",
      "Du premier message au système en production",
      "من أول رسالة إلى نظام يعمل",
    ),
  ),
  process.list("home.process.steps", "Steps", [
    {
      title: ml("Discovery call", "Appel de découverte", "مكالمة تعارف"),
      text: ml(
        "A short WhatsApp conversation about what slows you down today.",
        "Une courte conversation WhatsApp sur ce qui vous ralentit aujourd'hui.",
        "محادثة قصيرة على واتساب حول ما يعيق عملك اليوم.",
      ),
    },
    {
      title: ml("Proposal", "Proposition", "عرض"),
      text: ml(
        "A clear scope and a fixed price before anything starts.",
        "Un périmètre clair et un prix fixe avant tout démarrage.",
        "نطاق واضح وسعر ثابت قبل بدء أي شيء.",
      ),
    },
    {
      title: ml("Build", "Construction", "التنفيذ"),
      text: ml(
        "We build, connect and test the system with your real data.",
        "Nous construisons, connectons et testons le système avec vos données réelles.",
        "نبني ونربط ونختبر النظام ببياناتك الحقيقية.",
      ),
    },
    {
      title: ml("Launch", "Lancement", "الإطلاق"),
      text: ml(
        "We go live, show your team how it works and stay close for the first weeks.",
        "Mise en production, formation de votre équipe et accompagnement les premières semaines.",
        "نطلق النظام ونشرح لفريقك طريقة عمله ونبقى قريبين في الأسابيع الأولى.",
      ),
    },
    {
      title: ml("Support", "Suivi", "الدعم"),
      text: ml(
        "Monthly check-ins, fixes and improvements as your business changes.",
        "Points mensuels, corrections et améliorations à mesure que votre activité évolue.",
        "متابعة شهرية وإصلاحات وتحسينات مع تطور نشاطك.",
      ),
    },
  ]),

  /* --------------------------------- Trust ------------------------------- */
  trust.text(
    "home.trust.badge",
    "Badge",
    ml("Why FLUXMEDIA", "Pourquoi FLUXMEDIA", "لماذا FLUXMEDIA"),
  ),
  trust.text(
    "home.trust.title",
    "Title",
    ml("How We Work", "Notre façon de travailler", "كيف نعمل"),
  ),
  trust.list("home.trust.items", "Columns", [
    {
      title: ml("Clear pricing", "Prix clairs", "أسعار واضحة"),
      text: ml(
        "You know the price before we start. No hidden extras.",
        "Vous connaissez le prix avant de commencer. Sans extras cachés.",
        "تعرف السعر قبل البدء. بدون إضافات خفية.",
      ),
    },
    {
      title: ml(
        "Built around your tools",
        "Adapté à vos outils",
        "مبني حول أدواتك",
      ),
      text: ml(
        "WhatsApp, Instagram, Sheets, your CRM — we connect what you already use.",
        "WhatsApp, Instagram, Sheets, votre CRM — nous relions ce que vous utilisez déjà.",
        "واتساب، إنستغرام، Sheets، نظام عملائك — نربط ما تستعمله أصلاً.",
      ),
    },
    {
      title: ml("Local & reachable", "Local & joignable", "قريبون ومتاحون"),
      text: ml(
        "Based in Beni Mellal. You talk to the person who builds your system.",
        "Basés à Béni Mellal. Vous parlez à la personne qui construit votre système.",
        "مقرنا بني ملال. تتحدث مباشرة مع من يبني نظامك.",
      ),
    },
    {
      title: ml("You own everything", "Vous êtes propriétaire", "كل شيء ملكك"),
      text: ml(
        "Accounts, data and automations stay in your name.",
        "Comptes, données et automatisations restent à votre nom.",
        "الحسابات والبيانات والأنظمة تبقى باسمك.",
      ),
    },
    {
      title: ml("Honest reporting", "Rapports honnêtes", "تقارير صادقة"),
      text: ml(
        "Real numbers every month, including what did not work.",
        "Des chiffres réels chaque mois, y compris ce qui n'a pas marché.",
        "أرقام حقيقية كل شهر، بما في ذلك ما لم ينجح.",
      ),
    },
  ]),

  /* ------------------------------ Final CTA ------------------------------ */
  final.text(
    "home.final.title",
    "Title",
    ml(
      "Ready To Remove The Manual Work?",
      "Prêt à supprimer le travail manuel ?",
      "جاهز للتخلص من العمل اليدوي؟",
    ),
  ),
  final.area(
    "home.final.sub",
    "Subtitle",
    ml(
      "Tell us what you need on WhatsApp. No forms, no commitment — just a straight answer about what is possible and what it costs.",
      "Dites-nous ce dont vous avez besoin sur WhatsApp. Sans formulaire ni engagement — juste une réponse claire sur ce qui est possible et à quel prix.",
      "أخبرنا بما تحتاجه عبر واتساب. بدون نماذج ولا التزام — فقط جواب واضح عما هو ممكن وبكم.",
    ),
  ),
  final.text(
    "home.final.cta1",
    "Primary button",
    ml("Start a Project", "Démarrer un projet", "ابدأ مشروعاً"),
  ),
  final.text(
    "home.final.cta2",
    "Secondary button",
    ml("Chat on WhatsApp", "Discuter sur WhatsApp", "تحدث عبر واتساب"),
  ),
];
