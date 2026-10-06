import {
  ml,
  type CardProduct,
  type Category,
  type Faq,
  type SocialPackage,
  type SocialPageService,
  type SocialPageStep,
} from "@/lib/types";

/* -------------------------------------------------------------------------- */
/* Automation categories                                                       */
/* -------------------------------------------------------------------------- */

export const seedCategories: Omit<Category, "id">[] = [
  {
    slug: "messaging",
    name: ml("Messaging", "Messagerie", "المراسلة"),
    sort_order: 1,
    active: true,
  },
  {
    slug: "sales",
    name: ml("Sales & CRM", "Ventes & CRM", "المبيعات وCRM"),
    sort_order: 2,
    active: true,
  },
  {
    slug: "marketing",
    name: ml("Marketing", "Marketing", "التسويق"),
    sort_order: 3,
    active: true,
  },
  {
    slug: "support",
    name: ml("Customer support", "Support client", "دعم العملاء"),
    sort_order: 4,
    active: true,
  },
  {
    slug: "operations",
    name: ml("Operations", "Opérations", "العمليات"),
    sort_order: 5,
    active: true,
  },
  {
    slug: "ecommerce",
    name: ml("E-commerce", "E-commerce", "التجارة الإلكترونية"),
    sort_order: 6,
    active: true,
  },
  {
    slug: "reporting",
    name: ml("Reporting", "Reporting", "التقارير"),
    sort_order: 7,
    active: true,
  },
];

/* -------------------------------------------------------------------------- */
/* Social media packages — placeholder prices in MAD, editable in the admin    */
/* -------------------------------------------------------------------------- */

type SeedPackage = Omit<SocialPackage, "id" | "features"> & {
  features: { text: SocialPackage["description"]; sort_order: number }[];
};

const perMonth = ml("per month", "par mois", "شهرياً");

export const seedPackages: SeedPackage[] = [
  {
    slug: "starter",
    title_en: "Starter",
    name: ml("Starter", "Starter", "الباقة الأساسية"),
    description: ml(
      "For a business that needs to look alive and consistent on its two main pages.",
      "Pour une entreprise qui doit rester vivante et cohérente sur ses deux pages principales.",
      "لنشاط يحتاج إلى حضور منتظم على صفحتيه الأساسيتين.",
    ),
    price_mad: 490,
    billing_period: perMonth,
    badge: ml("", "", ""),
    popular: false,
    visible: true,
    sort_order: 1,
    posts_per_month: 12,
    reels_per_month: 0,
    stories_per_month: 8,
    platforms: ["instagram", "facebook"],
    features: [
      {
        text: ml(
          "12 designed posts per month",
          "12 publications designées par mois",
          "12 منشوراً مصمماً شهرياً",
        ),
        sort_order: 1,
      },
      {
        text: ml("8 stories per month", "8 stories par mois", "8 ستوري شهرياً"),
        sort_order: 2,
      },
      {
        text: ml(
          "Instagram + Facebook",
          "Instagram + Facebook",
          "إنستغرام + فيسبوك",
        ),
        sort_order: 3,
      },
      {
        text: ml(
          "Captions & hashtags included",
          "Légendes & hashtags inclus",
          "التعليقات والهاشتاغات مشمولة",
        ),
        sort_order: 4,
      },
      {
        text: ml(
          "Monthly content calendar",
          "Calendrier de contenu mensuel",
          "تقويم محتوى شهري",
        ),
        sort_order: 5,
      },
      {
        text: ml(
          "Simple monthly report",
          "Rapport mensuel simple",
          "تقرير شهري مبسّط",
        ),
        sort_order: 6,
      },
    ],
  },
  {
    slug: "growth",
    title_en: "Growth",
    name: ml("Growth", "Growth", "باقة النمو"),
    description: ml(
      "Our most requested package: more content, video, and someone answering your DMs.",
      "Notre formule la plus demandée : plus de contenu, de la vidéo et quelqu'un qui répond à vos messages.",
      "الباقة الأكثر طلباً: محتوى أكثر، وفيديو، ومن يرد على رسائلك.",
    ),
    price_mad: 890,
    billing_period: perMonth,
    badge: ml("Most chosen", "La plus choisie", "الأكثر اختياراً"),
    popular: true,
    visible: true,
    sort_order: 2,
    posts_per_month: 20,
    reels_per_month: 8,
    stories_per_month: 16,
    platforms: ["instagram", "facebook", "tiktok"],
    features: [
      {
        text: ml(
          "20 posts + 8 reels per month",
          "20 publications + 8 reels par mois",
          "20 منشوراً + 8 ريلز شهرياً",
        ),
        sort_order: 1,
      },
      {
        text: ml(
          "16 stories per month",
          "16 stories par mois",
          "16 ستوري شهرياً",
        ),
        sort_order: 2,
      },
      {
        text: ml(
          "Instagram + Facebook + TikTok",
          "Instagram + Facebook + TikTok",
          "إنستغرام + فيسبوك + تيك توك",
        ),
        sort_order: 3,
      },
      {
        text: ml(
          "Community management & DM replies",
          "Gestion de communauté & réponses aux DM",
          "إدارة المجتمع والرد على الرسائل",
        ),
        sort_order: 4,
      },
      {
        text: ml(
          "Hashtag & trend research",
          "Recherche hashtags & tendances",
          "بحث الهاشتاغات والترندات",
        ),
        sort_order: 5,
      },
      {
        text: ml(
          "Analytics review every month",
          "Analyse des performances chaque mois",
          "مراجعة التحليلات كل شهر",
        ),
        sort_order: 6,
      },
      {
        text: ml(
          "Content shooting guidance",
          "Accompagnement pour le tournage",
          "إرشاد لتصوير المحتوى",
        ),
        sort_order: 7,
      },
    ],
  },
  {
    slug: "pro",
    title_en: "Pro",
    name: ml("Pro", "Pro", "الباقة الاحترافية"),
    description: ml(
      "Full coverage for brands publishing everywhere, with ad-ready creative.",
      "Couverture complète pour les marques présentes partout, avec des créations prêtes pour la publicité.",
      "تغطية كاملة للعلامات التي تنشر في كل مكان، مع تصاميم جاهزة للإعلانات.",
    ),
    price_mad: 1490,
    billing_period: perMonth,
    badge: ml("", "", ""),
    popular: false,
    visible: true,
    sort_order: 3,
    posts_per_month: 30,
    reels_per_month: 12,
    stories_per_month: 30,
    platforms: ["instagram", "facebook", "tiktok", "linkedin", "youtube", "x"],
    features: [
      {
        text: ml(
          "30 posts + 12 reels per month",
          "30 publications + 12 reels par mois",
          "30 منشوراً + 12 ريلز شهرياً",
        ),
        sort_order: 1,
      },
      {
        text: ml(
          "30 stories per month",
          "30 stories par mois",
          "30 ستوري شهرياً",
        ),
        sort_order: 2,
      },
      {
        text: ml(
          "All six platforms covered",
          "Les six plateformes couvertes",
          "تغطية المنصات الست",
        ),
        sort_order: 3,
      },
      {
        text: ml(
          "Daily community management",
          "Gestion de communauté quotidienne",
          "إدارة يومية للمجتمع",
        ),
        sort_order: 4,
      },
      {
        text: ml(
          "Ad-ready creative variations",
          "Variations créatives prêtes pour la pub",
          "نسخ إبداعية جاهزة للإعلان",
        ),
        sort_order: 5,
      },
      {
        text: ml(
          "Competitor watch",
          "Veille concurrentielle",
          "مراقبة المنافسين",
        ),
        sort_order: 6,
      },
      {
        text: ml(
          "Monthly strategy call",
          "Point stratégique mensuel",
          "مكالمة استراتيجية شهرية",
        ),
        sort_order: 7,
      },
      {
        text: ml(
          "Priority WhatsApp support",
          "Support WhatsApp prioritaire",
          "دعم واتساب ذو أولوية",
        ),
        sort_order: 8,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* DENTISTA card products — prices intentionally null until the owner sets them */
/* -------------------------------------------------------------------------- */

type SeedCard = Omit<CardProduct, "id" | "tiers"> & {
  tiers: { quantity: number; price_mad: number | null; sort_order: number }[];
};

const regularTiers = [
  { quantity: 100, price_mad: null, sort_order: 1 },
  { quantity: 200, price_mad: null, sort_order: 2 },
  { quantity: 500, price_mad: null, sort_order: 3 },
];

const nfcTier = [{ quantity: 1, price_mad: null, sort_order: 1 }];

export const seedCards: SeedCard[] = [
  {
    slug: "dentista-classic-matte",
    type: "regular",
    title_en: "DENTISTA Classic Matte",
    title: ml(
      "DENTISTA Classic Matte",
      "DENTISTA Classique Mat",
      "DENTISTA كلاسيك مطفي",
    ),
    description: ml(
      "A clean matte card that feels solid in the hand and stays readable under any light.",
      "Une carte mate sobre, agréable en main et lisible sous toutes les lumières.",
      "بطاقة مطفية أنيقة، متينة الملمس وواضحة القراءة تحت أي إضاءة.",
    ),
    specs: [
      ml(
        "Standard 85 × 55 mm",
        "Format standard 85 × 55 mm",
        "مقاس قياسي 85 × 55 مم",
      ),
      ml(
        "350 g matte laminated card stock",
        "Papier 350 g pelliculé mat",
        "ورق 350 غ بتغليف مطفي",
      ),
      ml("Printed both sides", "Impression recto-verso", "طباعة على الوجهين"),
      ml("Design included", "Design inclus", "التصميم مشمول"),
    ],
    finish: "matte",
    popular: false,
    visible: true,
    sort_order: 1,
    image_url: null,
    tiers: regularTiers,
  },
  {
    slug: "dentista-premium-soft-touch",
    type: "regular",
    title_en: "DENTISTA Premium Soft-Touch",
    title: ml(
      "DENTISTA Premium Soft-Touch",
      "DENTISTA Premium Soft-Touch",
      "DENTISTA بريميوم ناعمة الملمس",
    ),
    description: ml(
      "Velvet-feel lamination that people notice the second they hold it.",
      "Un pelliculage velours que l'on remarque dès la prise en main.",
      "تغليف مخملي يلاحظه الشخص بمجرد أن يمسك البطاقة.",
    ),
    specs: [
      ml(
        "Standard 85 × 55 mm",
        "Format standard 85 × 55 mm",
        "مقاس قياسي 85 × 55 مم",
      ),
      ml(
        "400 g soft-touch lamination",
        "Pelliculage soft-touch 400 g",
        "تغليف ناعم 400 غ",
      ),
      ml(
        "Scratch resistant surface",
        "Surface résistante aux rayures",
        "سطح مقاوم للخدش",
      ),
      ml("Design included", "Design inclus", "التصميم مشمول"),
    ],
    finish: "soft-touch",
    popular: true,
    visible: true,
    sort_order: 2,
    image_url: null,
    tiers: regularTiers,
  },
  {
    slug: "dentista-glossy-spot-uv",
    type: "regular",
    title_en: "DENTISTA Glossy Spot-UV",
    title: ml(
      "DENTISTA Glossy Spot-UV",
      "DENTISTA Brillant Vernis Sélectif",
      "DENTISTA لامعة بطلاء انتقائي",
    ),
    description: ml(
      "Matte background with a glossy raised varnish on your logo or name.",
      "Fond mat avec un vernis brillant en relief sur votre logo ou votre nom.",
      "خلفية مطفية مع طلاء لامع بارز على شعارك أو اسمك.",
    ),
    specs: [
      ml(
        "Standard 85 × 55 mm",
        "Format standard 85 × 55 mm",
        "مقاس قياسي 85 × 55 مم",
      ),
      ml(
        "350 g card with spot-UV",
        "Carte 350 g avec vernis sélectif",
        "بطاقة 350 غ بطلاء انتقائي",
      ),
      ml(
        "Raised glossy detail",
        "Détail brillant en relief",
        "تفاصيل لامعة بارزة",
      ),
      ml("Design included", "Design inclus", "التصميم مشمول"),
    ],
    finish: "glossy",
    popular: false,
    visible: true,
    sort_order: 3,
    image_url: null,
    tiers: regularTiers,
  },
  {
    slug: "dentista-nfc-classic",
    type: "nfc",
    title_en: "DENTISTA NFC Classic",
    title: ml(
      "DENTISTA NFC Classic",
      "DENTISTA NFC Classique",
      "DENTISTA NFC كلاسيك",
    ),
    description: ml(
      "A durable PVC NFC card: tap it on a phone and your full profile opens.",
      "Une carte NFC en PVC durable : approchez-la d'un téléphone et votre profil s'ouvre.",
      "بطاقة NFC من PVC متينة: قرّبها من الهاتف ليفتح ملفك كاملاً.",
    ),
    specs: [
      ml(
        "Works with iPhone & Android — no app needed",
        "Compatible iPhone & Android — sans application",
        "تعمل مع آيفون وأندرويد — بدون تطبيق",
      ),
      ml(
        "Durable PVC, 85 × 55 mm",
        "PVC durable, 85 × 55 mm",
        "PVC متين، 85 × 55 مم",
      ),
      ml(
        "Profile you can update any time",
        "Profil modifiable à tout moment",
        "ملف يمكن تحديثه في أي وقت",
      ),
      ml("Sold one by one", "Vendue à l'unité", "تُباع بالوحدة"),
    ],
    finish: "pvc",
    popular: true,
    visible: true,
    sort_order: 4,
    image_url: null,
    tiers: nfcTier,
  },
  {
    slug: "dentista-nfc-metal",
    type: "nfc",
    title_en: "DENTISTA NFC Metal",
    title: ml(
      "DENTISTA NFC Metal",
      "DENTISTA NFC Métal",
      "DENTISTA NFC معدنية",
    ),
    description: ml(
      "Brushed metal with laser engraving — the card people keep on the desk.",
      "Métal brossé avec gravure laser — la carte que l'on garde sur le bureau.",
      "معدن مصقول مع نقش ليزري — البطاقة التي يحتفظ بها الناس على المكتب.",
    ),
    specs: [
      ml(
        "Brushed stainless steel",
        "Acier inoxydable brossé",
        "فولاذ مقاوم للصدأ مصقول",
      ),
      ml(
        "Laser engraved logo & name",
        "Logo & nom gravés au laser",
        "نقش الشعار والاسم بالليزر",
      ),
      ml(
        "Works with iPhone & Android — no app needed",
        "Compatible iPhone & Android — sans application",
        "تعمل مع آيفون وأندرويد — بدون تطبيق",
      ),
      ml("Sold one by one", "Vendue à l'unité", "تُباع بالوحدة"),
    ],
    finish: "metal",
    popular: false,
    visible: true,
    sort_order: 5,
    image_url: null,
    tiers: nfcTier,
  },
  {
    slug: "dentista-nfc-wood",
    type: "nfc",
    title_en: "DENTISTA NFC Wood",
    title: ml("DENTISTA NFC Wood", "DENTISTA NFC Bois", "DENTISTA NFC خشبية"),
    description: ml(
      "Real wood veneer with engraved details — warm, light and distinctive.",
      "Placage de bois véritable gravé — chaleureux, léger et distinctif.",
      "قشرة خشب طبيعي منقوشة — دافئة وخفيفة ومميزة.",
    ),
    specs: [
      ml("Natural wood veneer", "Placage de bois naturel", "قشرة خشب طبيعي"),
      ml(
        "Engraved logo & details",
        "Logo & détails gravés",
        "نقش الشعار والتفاصيل",
      ),
      ml(
        "Works with iPhone & Android — no app needed",
        "Compatible iPhone & Android — sans application",
        "تعمل مع آيفون وأندرويد — بدون تطبيق",
      ),
      ml("Sold one by one", "Vendue à l'unité", "تُباع بالوحدة"),
    ],
    finish: "wood",
    popular: false,
    visible: true,
    sort_order: 6,
    image_url: null,
    tiers: nfcTier,
  },
];

/* -------------------------------------------------------------------------- */
/* Social page content                                                         */
/* -------------------------------------------------------------------------- */

export const seedSocialServices: Omit<SocialPageService, "id">[] = [
  {
    icon: "compass",
    title: ml("Content strategy", "Stratégie de contenu", "استراتيجية المحتوى"),
    text: ml(
      "We decide what to post and why, based on your offer and your audience — not on trends alone.",
      "Nous définissons quoi publier et pourquoi, selon votre offre et votre audience — pas seulement les tendances.",
      "نحدد ما يُنشر ولماذا، انطلاقاً من عرضك وجمهورك لا من الترندات وحدها.",
    ),
    sort_order: 1,
    active: true,
  },
  {
    icon: "pen",
    title: ml("Design & editing", "Design & montage", "التصميم والمونتاج"),
    text: ml(
      "Posts, carousels and reels designed in your brand colours, ready to publish.",
      "Publications, carrousels et reels aux couleurs de votre marque, prêts à publier.",
      "منشورات وكاروسيل وريلز بألوان علامتك، جاهزة للنشر.",
    ),
    sort_order: 2,
    active: true,
  },
  {
    icon: "message",
    title: ml("Copywriting", "Rédaction", "كتابة المحتوى"),
    text: ml(
      "Captions in Darija, Arabic, French or English — whichever your clients actually read.",
      "Légendes en darija, arabe, français ou anglais — celle que vos clients lisent vraiment.",
      "تعليقات بالدارجة أو العربية أو الفرنسية أو الإنجليزية — ما يقرأه زبناؤك فعلاً.",
    ),
    sort_order: 3,
    active: true,
  },
  {
    icon: "calendar",
    title: ml(
      "Planning & publishing",
      "Planification & publication",
      "التخطيط والنشر",
    ),
    text: ml(
      "A calendar you approve, then scheduled publishing at the right times.",
      "Un calendrier que vous validez, puis une publication programmée aux bons moments.",
      "تقويم توافق عليه، ثم نشر مجدول في الأوقات المناسبة.",
    ),
    sort_order: 4,
    active: true,
  },
  {
    icon: "users",
    title: ml("Community management", "Gestion de communauté", "إدارة المجتمع"),
    text: ml(
      "Comments and DMs answered, questions routed to you when they need a decision.",
      "Commentaires et messages traités, questions transmises quand une décision s'impose.",
      "الرد على التعليقات والرسائل، وتحويل الأسئلة إليك عند الحاجة لقرار.",
    ),
    sort_order: 5,
    active: true,
  },
  {
    icon: "video",
    title: ml(
      "Reels & short video",
      "Reels & vidéos courtes",
      "الريلز والفيديو القصير",
    ),
    text: ml(
      "Scripts, shooting guidance and editing for short video that fits your business.",
      "Scripts, conseils de tournage et montage pour des vidéos courtes adaptées.",
      "سيناريوهات وإرشاد التصوير والمونتاج لفيديوهات قصيرة تناسب نشاطك.",
    ),
    sort_order: 6,
    active: true,
  },
  {
    icon: "chart",
    title: ml("Reporting", "Reporting", "التقارير"),
    text: ml(
      "A monthly report with the real numbers and what we will change next month.",
      "Un rapport mensuel avec les chiffres réels et ce que nous changerons le mois suivant.",
      "تقرير شهري بالأرقام الحقيقية وما سنغيّره الشهر المقبل.",
    ),
    sort_order: 7,
    active: true,
  },
  {
    icon: "sparkles",
    title: ml(
      "Ad-ready creative",
      "Créations prêtes pour la pub",
      "تصاميم جاهزة للإعلان",
    ),
    text: ml(
      "On request: variations of your best posts prepared for paid campaigns.",
      "Sur demande : des variations de vos meilleurs posts préparées pour la publicité.",
      "عند الطلب: نسخ من أفضل منشوراتك مهيأة للحملات المدفوعة.",
    ),
    sort_order: 8,
    active: true,
  },
];

export const seedSocialSteps: Omit<SocialPageStep, "id">[] = [
  {
    step_no: 1,
    title: ml("Kickoff", "Démarrage", "الانطلاق"),
    text: ml(
      "We collect your logo, colours, offers and the tone you want.",
      "Nous récupérons logo, couleurs, offres et le ton souhaité.",
      "نجمع شعارك وألوانك وعروضك والأسلوب الذي تريده.",
    ),
    sort_order: 1,
    active: true,
  },
  {
    step_no: 2,
    title: ml("Calendar", "Calendrier", "التقويم"),
    text: ml(
      "You receive next month's plan before anything is produced.",
      "Vous recevez le plan du mois avant toute production.",
      "تتوصل بخطة الشهر القادم قبل إنتاج أي شيء.",
    ),
    sort_order: 2,
    active: true,
  },
  {
    step_no: 3,
    title: ml("Production", "Production", "الإنتاج"),
    text: ml(
      "Design, copy and editing — delivered for approval in one batch.",
      "Design, rédaction et montage — livrés pour validation en un lot.",
      "تصميم وكتابة ومونتاج — تُسلَّم دفعة واحدة للمراجعة.",
    ),
    sort_order: 3,
    active: true,
  },
  {
    step_no: 4,
    title: ml("Publishing", "Publication", "النشر"),
    text: ml(
      "Scheduled and published, with community management through the month.",
      "Programmation et publication, avec gestion de communauté tout le mois.",
      "جدولة ونشر مع إدارة المجتمع طوال الشهر.",
    ),
    sort_order: 4,
    active: true,
  },
  {
    step_no: 5,
    title: ml("Review", "Bilan", "المراجعة"),
    text: ml(
      "End-of-month report and the adjustments for the next cycle.",
      "Rapport de fin de mois et ajustements pour le cycle suivant.",
      "تقرير نهاية الشهر وتعديلات الدورة القادمة.",
    ),
    sort_order: 5,
    active: true,
  },
];

/* -------------------------------------------------------------------------- */
/* FAQs                                                                        */
/* -------------------------------------------------------------------------- */

export const seedFaqs: Omit<Faq, "id">[] = [
  {
    scope: "social",
    question: ml(
      "Do I need to send you content every week?",
      "Dois-je vous envoyer du contenu chaque semaine ?",
      "هل يجب أن أرسل لكم محتوى كل أسبوع؟",
    ),
    answer: ml(
      "No. We work one month ahead from a short kickoff. We will ask for photos or short clips when a specific post needs them, and we tell you exactly what to shoot.",
      "Non. Nous travaillons avec un mois d'avance à partir d'un court démarrage. Nous demandons des photos ou clips seulement quand un post précis en a besoin, en vous expliquant quoi filmer.",
      "لا. نعمل بشهر مسبق انطلاقاً من جلسة قصيرة. نطلب صوراً أو مقاطع فقط عندما يحتاجها منشور معيّن، ونوضح لك ما يجب تصويره.",
    ),
    sort_order: 1,
    visible: true,
  },
  {
    scope: "social",
    question: ml(
      "Can you write in Darija?",
      "Pouvez-vous écrire en darija ?",
      "هل تكتبون بالدارجة؟",
    ),
    answer: ml(
      "Yes — Darija, Modern Standard Arabic, French and English. We usually mix them the way your customers actually speak.",
      "Oui — darija, arabe standard, français et anglais. Nous mélangeons généralement comme le font réellement vos clients.",
      "نعم — الدارجة والعربية الفصحى والفرنسية والإنجليزية. وعادةً نمزج بينها كما يتحدث زبناؤك فعلاً.",
    ),
    sort_order: 2,
    visible: true,
  },
  {
    scope: "social",
    question: ml(
      "Is the ad budget included in the price?",
      "Le budget publicitaire est-il inclus ?",
      "هل ميزانية الإعلانات مشمولة في السعر؟",
    ),
    answer: ml(
      "No. The package covers the work (strategy, content, publishing, community). Any advertising budget is paid by you directly to the platform, so you keep full control of it.",
      "Non. La formule couvre le travail (stratégie, contenu, publication, communauté). Le budget publicitaire est payé directement par vous à la plateforme, vous en gardez le contrôle.",
      "لا. تغطي الباقة العمل (الاستراتيجية والمحتوى والنشر والمجتمع). أما ميزانية الإعلانات فتدفعها أنت مباشرة للمنصة لتبقى تحت سيطرتك.",
    ),
    sort_order: 3,
    visible: true,
  },
  {
    scope: "social",
    question: ml(
      "Can I stop after one month?",
      "Puis-je arrêter après un mois ?",
      "هل يمكنني التوقف بعد شهر؟",
    ),
    answer: ml(
      "Yes. Packages are monthly. We only ask that you tell us before the end of the month so we do not start producing the next cycle.",
      "Oui. Les formules sont mensuelles. Prévenez-nous avant la fin du mois pour que nous ne lancions pas le cycle suivant.",
      "نعم. الباقات شهرية. نطلب فقط إخبارنا قبل نهاية الشهر حتى لا نبدأ إنتاج الدورة التالية.",
    ),
    sort_order: 4,
    visible: true,
  },
  {
    scope: "social",
    question: ml(
      "Who owns the accounts and the content?",
      "À qui appartiennent les comptes et le contenu ?",
      "لمن تعود ملكية الحسابات والمحتوى؟",
    ),
    answer: ml(
      "You do. Accounts stay in your name and all produced files are yours. If we stop working together, nothing is taken away.",
      "À vous. Les comptes restent à votre nom et tous les fichiers produits vous appartiennent. Si nous arrêtons, rien ne vous est retiré.",
      "لك أنت. تبقى الحسابات باسمك وكل الملفات المنتجة ملكك. وإذا توقف التعاون لا يُسحب منك شيء.",
    ),
    sort_order: 5,
    visible: true,
  },
  {
    scope: "cards",
    question: ml(
      "Do NFC cards need an app?",
      "Les cartes NFC nécessitent-elles une application ?",
      "هل تحتاج بطاقات NFC إلى تطبيق؟",
    ),
    answer: ml(
      "No. Modern iPhones and Android phones read NFC natively. The other person simply taps their phone on the card and a link opens.",
      "Non. Les iPhone et Android récents lisent le NFC nativement. L'autre personne approche simplement son téléphone et un lien s'ouvre.",
      "لا. الهواتف الحديثة من آيفون وأندرويد تقرأ NFC مباشرة. يكفي أن يقرّب الشخص هاتفه من البطاقة ليفتح الرابط.",
    ),
    sort_order: 1,
    visible: true,
  },
  {
    scope: "cards",
    question: ml(
      "Can I change my details after printing?",
      "Puis-je modifier mes informations après impression ?",
      "هل يمكنني تغيير معلوماتي بعد الطباعة؟",
    ),
    answer: ml(
      "On an NFC card, yes — the card points to a profile you can edit at any time. A regular printed card has to be reprinted.",
      "Sur une carte NFC, oui — elle pointe vers un profil modifiable à tout moment. Une carte imprimée classique doit être réimprimée.",
      "في بطاقة NFC نعم — فهي توجّه إلى ملف يمكنك تعديله في أي وقت. أما البطاقة المطبوعة العادية فتحتاج إعادة طباعة.",
    ),
    sort_order: 2,
    visible: true,
  },
  {
    scope: "cards",
    question: ml(
      "What is the minimum quantity?",
      "Quelle est la quantité minimum ?",
      "ما هي الكمية الدنيا؟",
    ),
    answer: ml(
      "Regular cards start at 100 per order. NFC cards are sold one by one, so you can order a single card.",
      "Les cartes classiques démarrent à 100 par commande. Les cartes NFC sont vendues à l'unité : vous pouvez en commander une seule.",
      "تبدأ البطاقات العادية من 100 في الطلب. أما بطاقات NFC فتُباع بالوحدة، ويمكنك طلب بطاقة واحدة.",
    ),
    sort_order: 3,
    visible: true,
  },
  {
    scope: "cards",
    question: ml(
      "Do you design the card for me?",
      "Concevez-vous la carte pour moi ?",
      "هل تصممون البطاقة نيابة عني؟",
    ),
    answer: ml(
      "Yes, design is included. Send your logo and the details you want on the card; we send a preview and adjust it until you approve.",
      "Oui, le design est inclus. Envoyez votre logo et les informations souhaitées ; nous envoyons un aperçu et ajustons jusqu'à validation.",
      "نعم، التصميم مشمول. أرسل شعارك والمعلومات المطلوبة، ونرسل لك معاينة ونعدّلها حتى توافق.",
    ),
    sort_order: 4,
    visible: true,
  },
  {
    scope: "cards",
    question: ml(
      "How long does delivery take?",
      "Quel est le délai de livraison ?",
      "كم تستغرق مدة التسليم؟",
    ),
    answer: ml(
      "It depends on the finish and the quantity. We confirm the exact production and delivery time on WhatsApp before you pay anything.",
      "Cela dépend de la finition et de la quantité. Nous confirmons le délai exact sur WhatsApp avant tout paiement.",
      "يعتمد على نوع اللمسة النهائية والكمية. نؤكد لك المدة الدقيقة عبر واتساب قبل أي أداء.",
    ),
    sort_order: 5,
    visible: true,
  },
];
