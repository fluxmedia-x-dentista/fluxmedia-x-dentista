import { section } from "@/lib/content/helpers";
import { ml, type ContentEntry } from "@/lib/types";

const ui = section("ui", "Buttons & labels");
const state = section("ui", "States & messages");
const footer = section("footer", "Footer");
const nav = section("navigation", "Navbar");
const seo = section("seo", "Search engines & sharing");

export const commonEntries: ContentEntry[] = [
  /* --------------------------- Buttons & labels -------------------------- */
  ui.text(
    "ui.order_whatsapp",
    "Order on WhatsApp",
    ml("Order on WhatsApp", "Commander sur WhatsApp", "اطلب عبر واتساب"),
  ),
  ui.text(
    "ui.price_on_whatsapp",
    "Price on WhatsApp",
    ml("Price on WhatsApp", "Prix sur WhatsApp", "السعر عبر واتساب"),
  ),
  ui.text(
    "ui.view_details",
    "View details",
    ml("View details", "Voir les détails", "عرض التفاصيل"),
  ),
  ui.text(
    "ui.start_project",
    "Start a Project",
    ml("Start a Project", "Démarrer un projet", "ابدأ مشروعاً"),
  ),
  ui.text(
    "ui.explore_services",
    "Explore Our Services",
    ml("Explore Our Services", "Découvrir nos services", "اكتشف خدماتنا"),
  ),
  ui.text(
    "ui.chat_whatsapp",
    "Chat on WhatsApp",
    ml("Chat on WhatsApp", "Discuter sur WhatsApp", "تحدث عبر واتساب"),
  ),
  ui.text(
    "ui.back_to_automations",
    "Back link",
    ml(
      "Back to automations",
      "Retour aux automatisations",
      "العودة إلى الأتمتة",
    ),
  ),
  ui.text("ui.all", "Filter: All", ml("All", "Tout", "الكل")),
  ui.text("ui.regular", "Regular cards", ml("Regular", "Classiques", "عادية")),
  ui.text("ui.nfc", "NFC cards", ml("NFC", "NFC", "NFC")),
  ui.text("ui.per_month", "Per month", ml("/month", "/mois", "/شهرياً")),
  ui.text(
    "ui.popular",
    "Popular badge",
    ml("Popular", "Populaire", "الأكثر طلباً"),
  ),
  ui.text("ui.quantity", "Quantity", ml("Quantity", "Quantité", "الكمية")),
  ui.text("ui.card_word", "Word: card", ml("card", "carte", "بطاقة")),
  ui.text(
    "ui.for_cards",
    "Quantity suffix",
    ml("for {n} cards", "pour {n} cartes", "لـ {n} بطاقة"),
  ),
  ui.text(
    "ui.per_card",
    "Per-card price",
    ml("{price} per card", "{price} par carte", "{price} للبطاقة"),
  ),
  ui.text("ui.benefits", "Benefits", ml("Benefits", "Bénéfices", "الفوائد")),
  ui.text(
    "ui.how_it_works",
    "How it works",
    ml("How it works", "Comment ça marche", "كيف يعمل"),
  ),
  ui.text(
    "ui.integrations",
    "Integrations",
    ml("Integrations", "Intégrations", "التكاملات"),
  ),
  ui.text(
    "ui.related",
    "Related items",
    ml("Related automations", "Automatisations similaires", "أنظمة ذات صلة"),
  ),
  ui.text("ui.menu", "Menu", ml("Menu", "Menu", "القائمة")),
  ui.text("ui.close", "Close", ml("Close", "Fermer", "إغلاق")),
  ui.text(
    "ui.skip",
    "Skip to content",
    ml("Skip to content", "Aller au contenu", "تخطَّ إلى المحتوى"),
  ),
  ui.text(
    "ui.theme",
    "Theme toggle",
    ml("Switch theme", "Changer de thème", "تبديل المظهر"),
  ),
  ui.text(
    "ui.language",
    "Language switcher",
    ml("Language", "Langue", "اللغة"),
  ),

  /* --------------------------- States & messages ------------------------- */
  state.text(
    "ui.empty",
    "Empty list",
    ml("Nothing here yet.", "Rien pour le moment.", "لا يوجد شيء بعد."),
  ),
  state.text(
    "ui.notfound.title",
    "404 title",
    ml("Page not found", "Page introuvable", "الصفحة غير موجودة"),
  ),
  state.area(
    "ui.notfound.sub",
    "404 text",
    ml(
      "The page you are looking for has moved or never existed.",
      "La page que vous cherchez a été déplacée ou n'a jamais existé.",
      "الصفحة التي تبحث عنها تم نقلها أو أنها غير موجودة.",
    ),
  ),
  state.text(
    "ui.notfound.cta",
    "404 button",
    ml("Back to home", "Retour à l'accueil", "العودة للرئيسية"),
  ),
  state.text(
    "ui.loading",
    "Loading",
    ml("Loading…", "Chargement…", "جارٍ التحميل…"),
  ),

  /* -------------------------------- Navbar ------------------------------- */
  nav.text(
    "nav.cta",
    "Navbar CTA label",
    ml("Start a Project", "Démarrer un projet", "ابدأ مشروعاً"),
  ),
  nav.link("nav.cta_href", "Navbar CTA link", "/request", ml("", "", "")),

  /* -------------------------------- Footer ------------------------------- */
  footer.area(
    "footer.description",
    "Footer description",
    ml(
      "FLUXMEDIA builds AI automation systems and manages social media for businesses in Morocco — so teams spend less time on manual work and more time growing.",
      "FLUXMEDIA conçoit des systèmes d'automatisation IA et gère les réseaux sociaux des entreprises au Maroc — moins de travail manuel, plus de croissance.",
      "FLUXMEDIA تبني أنظمة أتمتة بالذكاء الاصطناعي وتدير مواقع التواصل الاجتماعي للشركات في المغرب — عمل يدوي أقل ونمو أكبر.",
    ),
  ),
  footer.text(
    "footer.note",
    "Footer note",
    ml(
      "Beni Mellal, Morocco — working with clients everywhere.",
      "Béni Mellal, Maroc — au service de clients partout.",
      "بني ملال، المغرب — نعمل مع عملاء في كل مكان.",
    ),
  ),
  footer.text(
    "footer.nav_title",
    "Column 2 title",
    ml("Navigation", "Navigation", "التنقل"),
  ),
  footer.text(
    "footer.services_title",
    "Column 3 title",
    ml("Services", "Services", "الخدمات"),
  ),
  footer.text(
    "footer.follow_title",
    "Column 4 title",
    ml("Follow us", "Nous suivre", "تابعنا"),
  ),
  footer.text(
    "footer.privacy",
    "Privacy link label",
    ml("Privacy", "Confidentialité", "الخصوصية"),
  ),
  footer.text(
    "footer.terms",
    "Terms link label",
    ml("Terms", "Conditions", "الشروط"),
  ),

  /* --------------------------------- SEO --------------------------------- */
  seo.text(
    "seo.title",
    "Default page title",
    ml(
      "FLUXMEDIA — AI Automation & Social Media Management",
      "FLUXMEDIA — Automatisation IA & gestion des réseaux sociaux",
      "FLUXMEDIA — أتمتة بالذكاء الاصطناعي وإدارة مواقع التواصل",
    ),
  ),
  seo.area(
    "seo.description",
    "Default meta description",
    ml(
      "Less manual work. Better systems. Stronger online presence. AI automation, social media management and DENTISTA business cards from Beni Mellal, Morocco.",
      "Moins de travail manuel. De meilleurs systèmes. Une présence en ligne plus forte. Automatisation IA, gestion des réseaux sociaux et cartes DENTISTA depuis Béni Mellal, Maroc.",
      "عمل يدوي أقل. أنظمة أفضل. حضور رقمي أقوى. أتمتة بالذكاء الاصطناعي وإدارة مواقع التواصل وبطاقات DENTISTA من بني ملال، المغرب.",
    ),
  ),
  seo.image(
    "seo.og_image",
    "Default sharing image",
    "/images/backgrounds/home.svg",
    ml("FLUXMEDIA", "FLUXMEDIA", "FLUXMEDIA"),
    0,
  ),
];
