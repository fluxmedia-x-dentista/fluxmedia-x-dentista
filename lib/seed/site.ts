import {
  ml,
  type FooterLink,
  type HomeSection,
  type NavigationItem,
  type ReplyTemplate,
  type SiteSettings,
  type SocialLink,
} from "@/lib/types";

export const seedSettings: Omit<SiteSettings, "id"> = {
  site_name: "FLUXMEDIA",
  tagline: ml(
    "Less manual work. Better systems. Stronger online presence.",
    "Moins de travail manuel. De meilleurs systèmes. Une présence en ligne plus forte.",
    "عمل يدوي أقل. أنظمة أفضل. حضور رقمي أقوى.",
  ),
  contact_email: "contact@fluxmedia.ma",
  whatsapp_number: "212639803872",
  address: ml(
    "Beni Mellal, Beni Mellal-Khenifra, Morocco",
    "Béni Mellal, Béni Mellal-Khénifra, Maroc",
    "بني ملال، بني ملال خنيفرة، المغرب",
  ),
  footer_note: ml(
    "Beni Mellal, Morocco — working with clients everywhere.",
    "Béni Mellal, Maroc — au service de clients partout.",
    "بني ملال، المغرب — نعمل مع عملاء في كل مكان.",
  ),
  default_locale: "en",
};

export const seedHomeSections: HomeSection[] = [
  { key: "hero", label: "Hero", sort_order: 1, visible: true },
  { key: "specialties", label: "Specialties", sort_order: 2, visible: true },
  { key: "help", label: "How we help", sort_order: 3, visible: true },
  {
    key: "automation",
    label: "Automation visual",
    sort_order: 4,
    visible: true,
  },
  { key: "social", label: "Social visual", sort_order: 5, visible: true },
  { key: "cards", label: "DENTISTA cards", sort_order: 6, visible: true },
  { key: "combined", label: "Combined value", sort_order: 7, visible: true },
  { key: "process", label: "Process", sort_order: 8, visible: true },
  { key: "trust", label: "Trust", sort_order: 9, visible: true },
  { key: "final", label: "Final CTA", sort_order: 10, visible: true },
];

export const seedNavigation: Omit<NavigationItem, "id">[] = [
  {
    label: ml("Home", "Accueil", "الرئيسية"),
    href: "/",
    sort_order: 1,
    active: true,
    placement: "header",
  },
  {
    label: ml("Automations", "Automatisations", "الأتمتة"),
    href: "/automations",
    sort_order: 2,
    active: true,
    placement: "header",
  },
  {
    label: ml("Social Media", "Réseaux sociaux", "مواقع التواصل"),
    href: "/social-media",
    sort_order: 3,
    active: true,
    placement: "header",
  },
  {
    label: ml("Cards", "Cartes", "البطاقات"),
    href: "/cards",
    sort_order: 4,
    active: true,
    placement: "header",
  },
  {
    label: ml("About", "À propos", "من نحن"),
    href: "/about",
    sort_order: 5,
    active: true,
    placement: "header",
  },
  {
    label: ml("Social", "Social", "تواصل"),
    href: "/social",
    sort_order: 6,
    active: true,
    placement: "header",
  },
];

export const seedFooterLinks: Omit<FooterLink, "id">[] = [
  {
    group_key: "navigation",
    label: ml("Home", "Accueil", "الرئيسية"),
    href: "/",
    sort_order: 1,
    active: true,
  },
  {
    group_key: "navigation",
    label: ml("Automations", "Automatisations", "الأتمتة"),
    href: "/automations",
    sort_order: 2,
    active: true,
  },
  {
    group_key: "navigation",
    label: ml("Social Media", "Réseaux sociaux", "مواقع التواصل"),
    href: "/social-media",
    sort_order: 3,
    active: true,
  },
  {
    group_key: "navigation",
    label: ml("About", "À propos", "من نحن"),
    href: "/about",
    sort_order: 4,
    active: true,
  },
  {
    group_key: "navigation",
    label: ml("Contact", "Contact", "اتصل بنا"),
    href: "/contact",
    sort_order: 5,
    active: true,
  },
  {
    group_key: "services",
    label: ml("AI Automation", "Automatisation IA", "الأتمتة الذكية"),
    href: "/automations",
    sort_order: 1,
    active: true,
  },
  {
    group_key: "services",
    label: ml(
      "Social Media Management",
      "Gestion des réseaux sociaux",
      "إدارة مواقع التواصل",
    ),
    href: "/social-media",
    sort_order: 2,
    active: true,
  },
  {
    group_key: "services",
    label: ml("DENTISTA Cards", "Cartes DENTISTA", "بطاقات DENTISTA"),
    href: "/cards",
    sort_order: 3,
    active: true,
  },
  {
    group_key: "services",
    label: ml("Start a Project", "Démarrer un projet", "ابدأ مشروعاً"),
    href: "/request",
    sort_order: 4,
    active: true,
  },
  {
    group_key: "bottom",
    label: ml("Privacy", "Confidentialité", "الخصوصية"),
    href: "/privacy",
    sort_order: 1,
    active: true,
  },
  {
    group_key: "bottom",
    label: ml("Terms", "Conditions", "الشروط"),
    href: "/terms",
    sort_order: 2,
    active: true,
  },
];

export const seedSocialLinks: Omit<SocialLink, "id">[] = [
  {
    platform: "whatsapp",
    name: "WhatsApp",
    username: "+212 639 803 872",
    description: ml(
      "The fastest way to reach us — orders, questions and support.",
      "Le moyen le plus rapide de nous joindre — commandes, questions et support.",
      "أسرع وسيلة للتواصل معنا — الطلبات والأسئلة والدعم.",
    ),
    url: "https://wa.me/212639803872",
    active: true,
    sort_order: 1,
  },
  {
    platform: "instagram",
    name: "Instagram",
    username: "@fluxmedia.ma",
    description: ml(
      "Work in progress, systems we build and card designs.",
      "Travaux en cours, systèmes construits et designs de cartes.",
      "أعمال قيد الإنجاز وأنظمة نبنيها وتصاميم بطاقات.",
    ),
    url: "https://instagram.com/",
    active: true,
    sort_order: 2,
  },
  {
    platform: "facebook",
    name: "Facebook",
    username: "FLUXMEDIA",
    description: ml(
      "Announcements and longer posts for local businesses.",
      "Annonces et publications plus longues pour les entreprises locales.",
      "إعلانات ومنشورات أطول للشركات المحلية.",
    ),
    url: "https://facebook.com/",
    active: true,
    sort_order: 3,
  },
  {
    platform: "tiktok",
    name: "TikTok",
    username: "@fluxmedia.ma",
    description: ml(
      "Short videos explaining automation in simple words.",
      "Vidéos courtes expliquant l'automatisation simplement.",
      "فيديوهات قصيرة تشرح الأتمتة بكلمات بسيطة.",
    ),
    url: "https://tiktok.com/",
    active: true,
    sort_order: 4,
  },
  {
    platform: "linkedin",
    name: "LinkedIn",
    username: "FLUXMEDIA",
    description: ml(
      "For business owners and teams looking at operations.",
      "Pour les dirigeants et les équipes qui travaillent leurs opérations.",
      "لأصحاب الأعمال والفرق المهتمة بتحسين العمليات.",
    ),
    url: "https://linkedin.com/",
    active: true,
    sort_order: 5,
  },
  {
    platform: "youtube",
    name: "YouTube",
    username: "FLUXMEDIA",
    description: ml(
      "Longer walkthroughs of the systems we build.",
      "Démonstrations plus longues des systèmes que nous construisons.",
      "شروحات أطول للأنظمة التي نبنيها.",
    ),
    url: "https://youtube.com/",
    active: true,
    sort_order: 6,
  },
];

export const seedReplyTemplates: Omit<ReplyTemplate, "id">[] = [
  {
    key: "details",
    service_type: "general",
    name: "Thanks — here are the details",
    body: ml(
      "Hello {client_name} 👋\nThank you for your interest in {item}.\nHere are the details and the next steps:\n\n1) …\n2) …\n\nOrder reference: {order_no}",
      "Bonjour {client_name} 👋\nMerci pour votre intérêt pour {item}.\nVoici les détails et les prochaines étapes :\n\n1) …\n2) …\n\nRéférence : {order_no}",
      "مرحباً {client_name} 👋\nشكراً لاهتمامك بـ {item}.\nإليك التفاصيل والخطوات التالية:\n\n1) …\n2) …\n\nرقم الطلب: {order_no}",
    ),
    sort_order: 1,
    active: true,
  },
  {
    key: "card_design",
    service_type: "card",
    name: "Design confirmation (cards)",
    body: ml(
      "Hello {client_name} 👋\nFor your order {order_no} ({item} × {qty}), please send:\n• Your logo (PNG or vector)\n• Name and job title\n• Phone / WhatsApp\n• Social links or website\n\nWe will send a design preview before printing.",
      "Bonjour {client_name} 👋\nPour votre commande {order_no} ({item} × {qty}), merci d'envoyer :\n• Votre logo (PNG ou vectoriel)\n• Nom et fonction\n• Téléphone / WhatsApp\n• Réseaux ou site web\n\nNous enverrons un aperçu avant impression.",
      "مرحباً {client_name} 👋\nمن أجل طلبك {order_no} ({item} × {qty})، أرسل لنا:\n• شعارك (PNG أو ملف متجهي)\n• الاسم والوظيفة\n• الهاتف / واتساب\n• روابط التواصل أو الموقع\n\nسنرسل معاينة التصميم قبل الطباعة.",
    ),
    sort_order: 2,
    active: true,
  },
  {
    key: "automation_setup",
    service_type: "automation",
    name: "Setup questionnaire (automation)",
    body: ml(
      "Hello {client_name} 👋\nTo scope {item} correctly, could you tell us:\n• Which tools you use today\n• How many messages / leads per week\n• Who should be notified\n• What happens today when a message arrives\n\nWith that we send a fixed price.",
      "Bonjour {client_name} 👋\nPour cadrer {item}, pouvez-vous nous dire :\n• Quels outils vous utilisez aujourd'hui\n• Combien de messages / prospects par semaine\n• Qui doit être notifié\n• Ce qui se passe aujourd'hui à l'arrivée d'un message\n\nAvec cela nous envoyons un prix fixe.",
      "مرحباً {client_name} 👋\nلتحديد نطاق {item} بدقة، أخبرنا من فضلك:\n• ما الأدوات التي تستعملها حالياً\n• كم عدد الرسائل / العملاء أسبوعياً\n• من الذي يجب إشعاره\n• ماذا يحدث اليوم عند وصول رسالة\n\nوبعدها نرسل لك سعراً ثابتاً.",
    ),
    sort_order: 3,
    active: true,
  },
  {
    key: "social_onboarding",
    service_type: "social_media",
    name: "Onboarding questions (social media)",
    body: ml(
      "Hello {client_name} 👋\nWelcome to the {item} package ({price} / month).\nTo start we need:\n• Access to your pages\n• Logo and brand colours\n• Your current offers\n• 3 competitors you like\n\nWe send the first calendar within 5 days.",
      "Bonjour {client_name} 👋\nBienvenue dans la formule {item} ({price} / mois).\nPour démarrer il nous faut :\n• L'accès à vos pages\n• Logo et couleurs\n• Vos offres actuelles\n• 3 concurrents que vous appréciez\n\nPremier calendrier sous 5 jours.",
      "مرحباً {client_name} 👋\nمرحباً بك في باقة {item} ({price} / شهرياً).\nللبدء نحتاج:\n• صلاحية الدخول إلى صفحاتك\n• الشعار وألوان العلامة\n• عروضك الحالية\n• 3 منافسين يعجبك أسلوبهم\n\nنرسل أول تقويم خلال 5 أيام.",
    ),
    sort_order: 4,
    active: true,
  },
  {
    key: "payment",
    service_type: "general",
    name: "Payment info",
    body: ml(
      "Hello {client_name} 👋\nOrder {order_no} — {item}\nTotal: {price}\n\nPayment can be made by bank transfer or cash on delivery. Tell us which you prefer and we will send the details.",
      "Bonjour {client_name} 👋\nCommande {order_no} — {item}\nTotal : {price}\n\nPaiement par virement ou à la livraison. Dites-nous ce que vous préférez et nous enverrons les coordonnées.",
      "مرحباً {client_name} 👋\nالطلب {order_no} — {item}\nالمجموع: {price}\n\nيمكن الأداء بتحويل بنكي أو عند التسليم. أخبرنا بما تفضّل وسنرسل لك التفاصيل.",
    ),
    sort_order: 5,
    active: true,
  },
  {
    key: "delivery_ready",
    service_type: "general",
    name: "Delivery ready",
    body: ml(
      "Hello {client_name} 👋\nGood news — order {order_no} ({item} × {qty}) is ready.\nWhen would you like to receive it?",
      "Bonjour {client_name} 👋\nBonne nouvelle — la commande {order_no} ({item} × {qty}) est prête.\nQuand souhaitez-vous la recevoir ?",
      "مرحباً {client_name} 👋\nخبر جيد — الطلب {order_no} ({item} × {qty}) جاهز.\nمتى تود استلامه؟",
    ),
    sort_order: 6,
    active: true,
  },
];
