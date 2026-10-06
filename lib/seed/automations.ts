import { ml, type Automation, type ML, type WorkflowStep } from "@/lib/types";

const NO_DETAIL: ML = { en: "", fr: "", ar: "" };

/** Workflow steps are short node labels; `detail` is optional extra copy. */
function steps(...titles: ML[]): WorkflowStep[] {
  return titles.map((title) => ({ title, detail: NO_DETAIL }));
}

type SeedAutomation = Omit<Automation, "id" | "thumbnail_url"> & {
  thumbnail_url: string;
};

export const seedAutomations: SeedAutomation[] = [
  {
    slug: "instagram-dm-automation",
    title_en: "Instagram DM Automation",
    title: ml(
      "Instagram DM Automation",
      "Automatisation des DM Instagram",
      "أتمتة رسائل إنستغرام",
    ),
    short: ml(
      "Answer every Instagram message in seconds, day or night.",
      "Répondez à chaque message Instagram en quelques secondes, jour et nuit.",
      "رد على كل رسالة إنستغرام في ثوانٍ، ليلاً أو نهاراً.",
    ),
    description: ml(
      "Most people who message a business on Instagram expect a reply within minutes. This system reads incoming DMs and story replies, understands what the person is asking for, answers the common questions instantly and hands the conversation to you when it becomes serious. Every contact is saved so nothing is lost in the inbox.",
      "La plupart des personnes qui écrivent à une entreprise sur Instagram attendent une réponse en quelques minutes. Ce système lit les DM et réponses aux stories, comprend la demande, répond instantanément aux questions courantes et vous transmet la conversation lorsqu'elle devient sérieuse. Chaque contact est enregistré, rien ne se perd dans la boîte de réception.",
      "أغلب من يراسل نشاطاً تجارياً على إنستغرام ينتظر رداً خلال دقائق. يقرأ هذا النظام الرسائل وردود الستوري، ويفهم ما يطلبه الشخص، ويجيب فوراً عن الأسئلة الشائعة، ثم يحوّل المحادثة إليك عندما تصبح جادة. ويُحفظ كل جهة اتصال حتى لا يضيع شيء في صندوق الوارد.",
    ),
    category_slug: "messaging",
    icon: "message",
    thumbnail_url: "/images/automations/instagram-dm-automation.svg",
    benefits: [
      ml(
        "Instant replies, even at 11pm",
        "Réponses instantanées, même à 23h",
        "ردود فورية حتى في منتصف الليل",
      ),
      ml(
        "Every interested person saved as a contact",
        "Chaque personne intéressée enregistrée comme contact",
        "حفظ كل شخص مهتم كجهة اتصال",
      ),
      ml(
        "You only step in when it matters",
        "Vous n'intervenez que quand c'est utile",
        "تتدخل فقط عندما يكون الأمر مهماً",
      ),
    ],
    workflow: steps(
      ml(
        "DM or story reply received",
        "DM ou réponse story reçue",
        "استلام رسالة أو رد ستوري",
      ),
      ml(
        "AI detects the intent",
        "L'IA détecte l'intention",
        "الذكاء الاصطناعي يحدد الطلب",
      ),
      ml(
        "Instant personalised answer",
        "Réponse personnalisée instantanée",
        "رد فوري مخصص",
      ),
      ml(
        "Contact saved to your list",
        "Contact enregistré dans votre liste",
        "حفظ جهة الاتصال في قائمتك",
      ),
      ml(
        "Handover alert on WhatsApp",
        "Alerte de reprise sur WhatsApp",
        "تنبيه التحويل عبر واتساب",
      ),
    ),
    integrations: ["Instagram", "WhatsApp", "Google Sheets", "Make", "OpenAI"],
    sort_order: 1,
    active: true,
  },
  {
    slug: "form-to-crm-pipeline",
    title_en: "Form-to-CRM Pipeline",
    title: ml(
      "Form-to-CRM Pipeline",
      "Pipeline formulaire vers CRM",
      "من النموذج إلى نظام العملاء",
    ),
    short: ml(
      "Website and ad leads land in your CRM, clean and complete.",
      "Les prospects du site et des publicités arrivent dans votre CRM, propres et complets.",
      "عملاء الموقع والإعلانات يصلون إلى نظامك منظمين وكاملين.",
    ),
    description: ml(
      "Leads arriving from a website form, a landing page or a lead ad usually end up in three different places. This pipeline collects them all, cleans the data (phone format, duplicates, missing fields), creates the contact and the deal in your CRM, assigns an owner and notifies the right person — in seconds, without copy-paste.",
      "Les prospects venant d'un formulaire, d'une landing page ou d'une publicité finissent souvent à trois endroits différents. Ce pipeline les rassemble, nettoie les données (format du téléphone, doublons, champs manquants), crée le contact et l'opportunité dans votre CRM, attribue un responsable et notifie la bonne personne — en quelques secondes, sans copier-coller.",
      "عادةً ما ينتهي العملاء القادمون من نموذج الموقع أو صفحة هبوط أو إعلان في ثلاثة أماكن مختلفة. يجمعها هذا النظام كلها، وينظّف البيانات (صيغة الهاتف، التكرارات، الحقول الناقصة)، وينشئ جهة الاتصال والصفقة في نظامك، ويحدد المسؤول ويُشعر الشخص المناسب — في ثوانٍ وبدون نسخ ولصق.",
    ),
    category_slug: "sales",
    icon: "clipboard",
    thumbnail_url: "/images/automations/form-to-crm-pipeline.svg",
    benefits: [
      ml(
        "No lead typed in twice",
        "Aucun prospect saisi deux fois",
        "لا إدخال مزدوج لأي عميل",
      ),
      ml(
        "Clean, usable phone numbers",
        "Numéros propres et exploitables",
        "أرقام هواتف نظيفة وقابلة للاستعمال",
      ),
      ml(
        "Faster first response",
        "Première réponse plus rapide",
        "رد أول أسرع",
      ),
    ],
    workflow: steps(
      ml(
        "Form or lead ad submitted",
        "Formulaire ou lead ad envoyé",
        "إرسال نموذج أو إعلان",
      ),
      ml(
        "Data validated & de-duplicated",
        "Données validées & dédupliquées",
        "التحقق من البيانات وإزالة التكرار",
      ),
      ml(
        "Contact + deal created",
        "Contact + opportunité créés",
        "إنشاء جهة الاتصال والصفقة",
      ),
      ml(
        "Owner assigned automatically",
        "Responsable attribué automatiquement",
        "إسناد المسؤول تلقائياً",
      ),
      ml(
        "Team notified instantly",
        "Équipe notifiée instantanément",
        "إشعار الفريق فوراً",
      ),
    ),
    integrations: [
      "Website forms",
      "Meta Lead Ads",
      "HubSpot",
      "Airtable",
      "Slack",
    ],
    sort_order: 2,
    active: true,
  },
  {
    slug: "whatsapp-business-automation",
    title_en: "WhatsApp Business Automation",
    title: ml(
      "WhatsApp Business Automation",
      "Automatisation WhatsApp Business",
      "أتمتة واتساب للأعمال",
    ),
    short: ml(
      "A WhatsApp assistant that answers, qualifies and books.",
      "Un assistant WhatsApp qui répond, qualifie et prend les rendez-vous.",
      "مساعد واتساب يرد ويؤهّل ويحجز المواعيد.",
    ),
    description: ml(
      "In Morocco most customers prefer WhatsApp. This system gives your business number a structured flow: a welcome message, quick-reply menu, answers about prices, hours and location, an optional booking step, and a clean escalation to a human. Conversations and contacts are logged so you can follow up later.",
      "Au Maroc, la plupart des clients préfèrent WhatsApp. Ce système donne à votre numéro professionnel un parcours structuré : message d'accueil, menu de réponses rapides, réponses sur les prix, horaires et adresse, étape de réservation optionnelle et transfert propre vers un humain. Conversations et contacts sont enregistrés pour la relance.",
      "في المغرب يفضّل أغلب الزبناء واتساب. يمنح هذا النظام رقمك المهني مساراً منظماً: رسالة ترحيب، وقائمة ردود سريعة، وإجابات عن الأسعار والتوقيت والموقع، وخطوة حجز اختيارية، وتحويل سلس إلى شخص حقيقي. وتُسجَّل المحادثات وجهات الاتصال للمتابعة لاحقاً.",
    ),
    category_slug: "messaging",
    icon: "whatsapp",
    thumbnail_url: "/images/automations/whatsapp-business-automation.svg",
    benefits: [
      ml(
        "Answers the same 10 questions for you",
        "Répond aux 10 mêmes questions à votre place",
        "يجيب عن الأسئلة العشرة المتكررة بدلاً عنك",
      ),
      ml(
        "Qualifies before you spend time",
        "Qualifie avant que vous y passiez du temps",
        "يؤهّل العميل قبل أن تضيّع وقتك",
      ),
      ml(
        "Full history for follow-up",
        "Historique complet pour la relance",
        "سجل كامل للمتابعة",
      ),
    ],
    workflow: steps(
      ml(
        "Customer messages your number",
        "Le client écrit à votre numéro",
        "الزبون يراسل رقمك",
      ),
      ml("Welcome + quick menu", "Accueil + menu rapide", "ترحيب وقائمة سريعة"),
      ml("Automated answers", "Réponses automatisées", "إجابات تلقائية"),
      ml(
        "Booking or quote step",
        "Étape de rendez-vous ou devis",
        "خطوة حجز أو عرض سعر",
      ),
      ml(
        "Escalation to a human",
        "Transfert vers un humain",
        "تحويل إلى شخص حقيقي",
      ),
    ),
    integrations: [
      "WhatsApp Business API",
      "Google Calendar",
      "Google Sheets",
      "Make",
      "OpenAI",
    ],
    sort_order: 3,
    active: true,
  },
  {
    slug: "crm-pipeline-automation",
    title_en: "CRM Pipeline Automation",
    title: ml(
      "CRM Pipeline Automation",
      "Automatisation du pipeline CRM",
      "أتمتة مسار المبيعات",
    ),
    short: ml(
      "Deals move, tasks appear, nothing is forgotten.",
      "Les opportunités avancent, les tâches apparaissent, rien n'est oublié.",
      "الصفقات تتقدم، والمهام تظهر، ولا شيء يُنسى.",
    ),
    description: ml(
      "A pipeline only works if it is updated. This system moves deals between stages based on what actually happens — a reply received, a quote sent, a payment confirmed — creates the follow-up task for the right person, warns you when a deal goes quiet, and keeps the forecast honest without anyone maintaining a spreadsheet.",
      "Un pipeline ne sert que s'il est à jour. Ce système déplace les opportunités selon ce qui se passe réellement — réponse reçue, devis envoyé, paiement confirmé — crée la tâche de suivi pour la bonne personne, vous alerte quand une affaire s'endort et garde des prévisions fiables sans tableur à maintenir.",
      "لا يفيد مسار المبيعات إلا إذا كان محدّثاً. ينقل هذا النظام الصفقات بين المراحل حسب ما يحدث فعلاً — وصول رد، إرسال عرض، تأكيد دفعة — وينشئ مهمة المتابعة للشخص المناسب، وينبهك عندما تتوقف صفقة، ويحافظ على توقعات صادقة دون جداول يدوية.",
    ),
    category_slug: "sales",
    icon: "chart",
    thumbnail_url: "/images/automations/crm-pipeline-automation.svg",
    benefits: [
      ml(
        "Pipeline always reflects reality",
        "Un pipeline toujours à jour",
        "مسار يعكس الواقع دائماً",
      ),
      ml(
        "Automatic reminders on stale deals",
        "Rappels automatiques sur les affaires dormantes",
        "تذكيرات تلقائية للصفقات الراكدة",
      ),
      ml(
        "Managers see the truth, not a guess",
        "Les managers voient la réalité, pas une estimation",
        "الإدارة ترى الحقيقة لا التخمين",
      ),
    ],
    workflow: steps(
      ml(
        "Deal created or updated",
        "Opportunité créée ou mise à jour",
        "إنشاء أو تحديث صفقة",
      ),
      ml(
        "Stage rules evaluated",
        "Règles d'étape évaluées",
        "تقييم قواعد المرحلة",
      ),
      ml(
        "Follow-up task generated",
        "Tâche de suivi générée",
        "إنشاء مهمة متابعة",
      ),
      ml(
        "Inactivity alert after X days",
        "Alerte d'inactivité après X jours",
        "تنبيه الخمول بعد أيام",
      ),
      ml(
        "Pipeline report refreshed",
        "Rapport de pipeline actualisé",
        "تحديث تقرير المسار",
      ),
    ),
    integrations: [
      "HubSpot",
      "Pipedrive",
      "Airtable",
      "Google Sheets",
      "Slack",
    ],
    sort_order: 4,
    active: true,
  },
  {
    slug: "email-follow-up-sequences",
    title_en: "Email Follow-up Sequences",
    title: ml(
      "Email Follow-up Sequences",
      "Séquences d'emails de relance",
      "سلاسل متابعة بالبريد",
    ),
    short: ml(
      "The polite reminders you never have time to send.",
      "Les relances polies que vous n'avez jamais le temps d'envoyer.",
      "رسائل التذكير المهذبة التي لا تجد وقتاً لإرسالها.",
    ),
    description: ml(
      "Most quotes are lost to silence, not to a competitor. This system sends a short sequence after a quote, a visit or a download: a reminder, a useful piece of information, then a final check-in. Replies stop the sequence automatically, and everything is written in your tone, in the language of the client.",
      "La plupart des devis sont perdus par silence, pas à cause d'un concurrent. Ce système envoie une courte séquence après un devis, une visite ou un téléchargement : un rappel, une information utile, puis un dernier message. Une réponse arrête la séquence automatiquement, et tout est écrit dans votre ton, dans la langue du client.",
      "تُفقد أغلب العروض بسبب الصمت لا بسبب منافس. يرسل هذا النظام سلسلة قصيرة بعد عرض السعر أو الزيارة أو التحميل: تذكير، ثم معلومة مفيدة، ثم رسالة أخيرة. وأي رد يوقف السلسلة تلقائياً، وكل شيء مكتوب بأسلوبك وبلغة العميل.",
    ),
    category_slug: "marketing",
    icon: "mail",
    thumbnail_url: "/images/automations/email-follow-up-sequences.svg",
    benefits: [
      ml(
        "More quotes answered",
        "Plus de devis relancés",
        "عدد أكبر من العروض يحصل على رد",
      ),
      ml(
        "Stops instantly when they reply",
        "S'arrête dès qu'ils répondent",
        "تتوقف فور رد العميل",
      ),
      ml(
        "Written in the client's language",
        "Rédigé dans la langue du client",
        "مكتوبة بلغة العميل",
      ),
    ],
    workflow: steps(
      ml(
        "Trigger: quote, visit or signup",
        "Déclencheur : devis, visite ou inscription",
        "محفّز: عرض أو زيارة أو تسجيل",
      ),
      ml("Email 1 — reminder", "Email 1 — rappel", "رسالة 1 — تذكير"),
      ml(
        "Email 2 — useful proof",
        "Email 2 — preuve utile",
        "رسالة 2 — معلومة مفيدة",
      ),
      ml(
        "Email 3 — final check-in",
        "Email 3 — dernière relance",
        "رسالة 3 — متابعة أخيرة",
      ),
      ml(
        "Reply detected → sequence stops",
        "Réponse détectée → arrêt",
        "عند الرد تتوقف السلسلة",
      ),
    ),
    integrations: ["Gmail", "Brevo", "Mailchimp", "HubSpot", "Make"],
    sort_order: 5,
    active: true,
  },
  {
    slug: "ai-customer-support",
    title_en: "AI Customer Support",
    title: ml(
      "AI Customer Support",
      "Support client par IA",
      "دعم العملاء بالذكاء الاصطناعي",
    ),
    short: ml(
      "An assistant trained on your real answers, not generic ones.",
      "Un assistant entraîné sur vos vraies réponses, pas des génériques.",
      "مساعد مدرَّب على إجاباتك الحقيقية لا على إجابات عامة.",
    ),
    description: ml(
      'We take your price list, your FAQ, your policies and your past replies, and build an assistant that answers in the same way you would — in Darija, Arabic, French or English. It works on your website, WhatsApp or Instagram, says "I will check with the team" instead of inventing an answer, and escalates with the full conversation attached.',
      "Nous prenons votre grille tarifaire, votre FAQ, vos politiques et vos anciennes réponses pour créer un assistant qui répond comme vous le feriez — en darija, arabe, français ou anglais. Il fonctionne sur votre site, WhatsApp ou Instagram, dit « je vérifie avec l'équipe » plutôt que d'inventer, et transfère avec toute la conversation.",
      "نأخذ لائحة أسعارك وأسئلتك الشائعة وسياساتك وردودك السابقة، ونبني مساعداً يجيب بالطريقة نفسها التي تجيب بها — بالدارجة أو العربية أو الفرنسية أو الإنجليزية. يعمل على موقعك أو واتساب أو إنستغرام، ويقول «سأتحقق مع الفريق» بدل اختلاق الإجابة، ويحوّل المحادثة كاملة عند الحاجة.",
    ),
    category_slug: "support",
    icon: "bot",
    thumbnail_url: "/images/automations/ai-customer-support.svg",
    benefits: [
      ml(
        "Consistent answers, every time",
        "Des réponses cohérentes à chaque fois",
        "إجابات موحّدة في كل مرة",
      ),
      ml(
        "Four languages out of the box",
        "Quatre langues dès le départ",
        "أربع لغات منذ البداية",
      ),
      ml(
        "Escalates instead of inventing",
        "Transfère au lieu d'inventer",
        "يحوّل بدل أن يختلق",
      ),
    ],
    workflow: steps(
      ml("Question arrives", "Question reçue", "وصول سؤال"),
      ml(
        "Assistant searches your knowledge base",
        "L'assistant cherche dans votre base",
        "المساعد يبحث في قاعدة معرفتك",
      ),
      ml(
        "Answer drafted in the right language",
        "Réponse rédigée dans la bonne langue",
        "صياغة الرد باللغة المناسبة",
      ),
      ml("Confidence check", "Contrôle de confiance", "فحص درجة الثقة"),
      ml(
        "Human handover when unsure",
        "Transfert humain en cas de doute",
        "تحويل بشري عند عدم اليقين",
      ),
    ),
    integrations: [
      "Website widget",
      "WhatsApp",
      "Instagram",
      "Notion",
      "OpenAI",
    ],
    sort_order: 6,
    active: true,
  },
  {
    slug: "appointment-booking-system",
    title_en: "Appointment Booking System",
    title: ml(
      "Appointment Booking System",
      "Système de prise de rendez-vous",
      "نظام حجز المواعيد",
    ),
    short: ml(
      "Bookings, confirmations and reminders without phone tag.",
      "Réservations, confirmations et rappels sans jouer au téléphone.",
      "حجوزات وتأكيدات وتذكيرات دون مكالمات متكررة.",
    ),
    description: ml(
      "Clients pick a slot from your real availability, receive an instant confirmation and a reminder before the appointment. No-shows drop, the calendar stays accurate and your staff stop writing appointments on paper. Rescheduling and cancellation are handled by the same flow.",
      "Les clients choisissent un créneau selon vos disponibilités réelles, reçoivent une confirmation immédiate et un rappel avant le rendez-vous. Les absences diminuent, l'agenda reste fiable et votre équipe arrête de noter les rendez-vous sur papier. Report et annulation passent par le même flux.",
      "يختار الزبون موعداً من أوقاتك المتاحة فعلاً، ويتوصل بتأكيد فوري وتذكير قبل الموعد. تنخفض حالات عدم الحضور، ويبقى التقويم دقيقاً، ويتوقف فريقك عن تدوين المواعيد على الورق. ويتم التأجيل والإلغاء عبر المسار نفسه.",
    ),
    category_slug: "operations",
    icon: "calendar",
    thumbnail_url: "/images/automations/appointment-booking-system.svg",
    benefits: [
      ml(
        "Fewer no-shows thanks to reminders",
        "Moins d'absences grâce aux rappels",
        "تقليل الغياب بفضل التذكيرات",
      ),
      ml("No double bookings", "Aucun double rendez-vous", "لا حجوزات مزدوجة"),
      ml(
        "Works over WhatsApp too",
        "Fonctionne aussi via WhatsApp",
        "يعمل عبر واتساب أيضاً",
      ),
    ],
    workflow: steps(
      ml(
        "Client opens the booking link",
        "Le client ouvre le lien",
        "العميل يفتح رابط الحجز",
      ),
      ml(
        "Real availability shown",
        "Disponibilités réelles affichées",
        "عرض الأوقات المتاحة فعلاً",
      ),
      ml(
        "Slot booked & calendar updated",
        "Créneau réservé & agenda mis à jour",
        "حجز الموعد وتحديث التقويم",
      ),
      ml("Confirmation sent", "Confirmation envoyée", "إرسال التأكيد"),
      ml(
        "Reminder before the appointment",
        "Rappel avant le rendez-vous",
        "تذكير قبل الموعد",
      ),
    ),
    integrations: ["Google Calendar", "Cal.com", "WhatsApp", "SMS", "Make"],
    sort_order: 7,
    active: true,
  },
  {
    slug: "abandoned-cart-recovery",
    title_en: "Abandoned Cart Recovery",
    title: ml(
      "Abandoned Cart Recovery",
      "Récupération de paniers abandonnés",
      "استرجاع السلات المتروكة",
    ),
    short: ml(
      "Bring back the shoppers who almost bought.",
      "Ramenez les acheteurs qui étaient sur le point d'acheter.",
      "استرجع الزبناء الذين كادوا يشترون.",
    ),
    description: ml(
      "A large share of online orders are abandoned at the last step. This system detects the abandoned cart, waits a sensible amount of time, then sends a friendly WhatsApp or email message with the exact products, an easy way to finish the order and an optional incentive. Recovered orders are tracked so you know what it earned.",
      "Une grande partie des commandes en ligne sont abandonnées à la dernière étape. Ce système détecte le panier abandonné, attend un délai raisonnable, puis envoie un message WhatsApp ou email amical avec les produits exacts, un lien simple pour finaliser et une incitation optionnelle. Les commandes récupérées sont suivies pour mesurer le gain.",
      "تُترك نسبة كبيرة من الطلبات عند الخطوة الأخيرة. يرصد هذا النظام السلة المتروكة، وينتظر مدة مناسبة، ثم يرسل رسالة ودّية عبر واتساب أو البريد تتضمن المنتجات نفسها ورابطاً سهلاً لإتمام الطلب وحافزاً اختيارياً. وتُتتبع الطلبات المسترجعة لتعرف العائد.",
    ),
    category_slug: "ecommerce",
    icon: "cart",
    thumbnail_url: "/images/automations/abandoned-cart-recovery.svg",
    benefits: [
      ml(
        "Recovers revenue you already earned",
        "Récupère un chiffre déjà gagné",
        "يسترجع مبيعات كنت قد كسبتها",
      ),
      ml("Friendly, not pushy", "Amical, pas insistant", "ودّي وغير ملحّ"),
      ml(
        "Measured: you see what came back",
        "Mesuré : vous voyez ce qui revient",
        "قابل للقياس: ترى ما عاد فعلاً",
      ),
    ],
    workflow: steps(
      ml("Cart abandoned", "Panier abandonné", "ترك السلة"),
      ml("Wait window", "Délai d'attente", "فترة انتظار"),
      ml(
        "Reminder with the exact items",
        "Rappel avec les articles exacts",
        "تذكير بنفس المنتجات",
      ),
      ml("Optional incentive", "Incitation optionnelle", "حافز اختياري"),
      ml("Recovery tracked", "Récupération suivie", "تتبع الاسترجاع"),
    ),
    integrations: ["Shopify", "WooCommerce", "WhatsApp", "Brevo", "Make"],
    sort_order: 8,
    active: true,
  },
  {
    slug: "content-repurposing-pipeline",
    title_en: "Content Repurposing Pipeline",
    title: ml(
      "Content Repurposing Pipeline",
      "Pipeline de recyclage de contenu",
      "نظام إعادة توظيف المحتوى",
    ),
    short: ml(
      "One long video or article becomes a week of posts.",
      "Une longue vidéo ou un article devient une semaine de publications.",
      "فيديو أو مقال واحد يتحول إلى أسبوع من المنشورات.",
    ),
    description: ml(
      "You already create content — it just stays in one place. This pipeline takes a video, a podcast or a long article and produces the short clips, the carousel, the captions and the newsletter paragraph from it, each adapted to the platform and the language. Drafts land in a folder for your approval before anything is published.",
      "Vous créez déjà du contenu — il reste simplement à un seul endroit. Ce pipeline prend une vidéo, un podcast ou un article long et en tire des clips courts, un carrousel, des légendes et un paragraphe de newsletter, adaptés à chaque plateforme et à chaque langue. Les brouillons arrivent dans un dossier pour validation avant publication.",
      "أنت تنتج محتوى بالفعل — لكنه يبقى في مكان واحد. يأخذ هذا النظام فيديو أو بودكاست أو مقالاً طويلاً ويستخرج منه مقاطع قصيرة وكاروسيل وتعليقات وفقرة نشرة بريدية، كل منها مهيأ للمنصة واللغة. وتصل المسودات إلى مجلد لمراجعتك قبل أي نشر.",
    ),
    category_slug: "marketing",
    icon: "video",
    thumbnail_url: "/images/automations/content-repurposing-pipeline.svg",
    benefits: [
      ml(
        "More output from the same work",
        "Plus de contenu pour le même travail",
        "محتوى أكثر من نفس الجهد",
      ),
      ml(
        "Consistent tone across platforms",
        "Un ton cohérent sur toutes les plateformes",
        "أسلوب موحّد عبر المنصات",
      ),
      ml(
        "You approve before it goes out",
        "Vous validez avant publication",
        "تراجع قبل النشر",
      ),
    ],
    workflow: steps(
      ml(
        "Source content uploaded",
        "Contenu source déposé",
        "رفع المحتوى الأصلي",
      ),
      ml(
        "Transcription & key moments",
        "Transcription & moments clés",
        "تفريغ نصي وتحديد اللحظات المهمة",
      ),
      ml(
        "Clips, carousel & captions drafted",
        "Clips, carrousel & légendes rédigés",
        "إعداد المقاطع والكاروسيل والتعليقات",
      ),
      ml(
        "Review folder for approval",
        "Dossier de validation",
        "مجلد المراجعة والموافقة",
      ),
      ml(
        "Scheduled per platform",
        "Programmation par plateforme",
        "جدولة حسب المنصة",
      ),
    ),
    integrations: ["Google Drive", "Notion", "Buffer", "OpenAI", "Make"],
    sort_order: 9,
    active: true,
  },
  {
    slug: "internal-ai-assistant",
    title_en: "Internal AI Assistant",
    title: ml(
      "Internal AI Assistant",
      "Assistant IA interne",
      "مساعد داخلي بالذكاء الاصطناعي",
    ),
    short: ml(
      "Ask your own documents instead of searching for them.",
      "Interrogez vos documents au lieu de les chercher.",
      "اسأل مستنداتك بدل البحث عنها.",
    ),
    description: ml(
      "Procedures, price lists, contracts, supplier conditions — the answer usually exists, somewhere. We connect your documents to a private assistant your team can ask in plain language, with sources shown for every answer. Access is limited to your staff and nothing is used to train public models.",
      "Procédures, tarifs, contrats, conditions fournisseurs — la réponse existe généralement, quelque part. Nous connectons vos documents à un assistant privé que votre équipe interroge en langage courant, avec les sources affichées. L'accès est réservé à vos collaborateurs et rien n'alimente l'entraînement de modèles publics.",
      "المساطر ولوائح الأسعار والعقود وشروط الموردين — الجواب موجود عادةً في مكان ما. نربط مستنداتك بمساعد خاص يسأله فريقك بلغة عادية، مع عرض المصدر لكل إجابة. الوصول محصور في موظفيك ولا تُستعمل بياناتك لتدريب نماذج عامة.",
    ),
    category_slug: "operations",
    icon: "cpu",
    thumbnail_url: "/images/automations/internal-ai-assistant.svg",
    benefits: [
      ml(
        "Answers in seconds, with the source",
        "Réponses en quelques secondes, avec la source",
        "إجابات في ثوانٍ مع المصدر",
      ),
      ml(
        "New staff get productive faster",
        "Les nouveaux sont opérationnels plus vite",
        "الموظفون الجدد ينتجون أسرع",
      ),
      ml(
        "Private to your team",
        "Privé, réservé à votre équipe",
        "خاص بفريقك وحده",
      ),
    ],
    workflow: steps(
      ml("Documents connected", "Documents connectés", "ربط المستندات"),
      ml("Indexed securely", "Indexés de façon sécurisée", "فهرسة آمنة"),
      ml(
        "Employee asks a question",
        "Un employé pose une question",
        "موظف يطرح سؤالاً",
      ),
      ml("Answer with sources", "Réponse avec sources", "إجابة مع المصادر"),
      ml(
        "Gaps flagged for update",
        "Lacunes signalées pour mise à jour",
        "تحديد النواقص للتحديث",
      ),
    ),
    integrations: ["Google Drive", "Notion", "SharePoint", "Slack", "OpenAI"],
    sort_order: 10,
    active: true,
  },
  {
    slug: "automated-weekly-reporting",
    title_en: "Automated Weekly Reporting",
    title: ml(
      "Automated Weekly Reporting",
      "Rapports hebdomadaires automatisés",
      "تقارير أسبوعية آلية",
    ),
    short: ml(
      "One clear digest every Monday, built while you sleep.",
      "Un résumé clair chaque lundi, préparé pendant votre sommeil.",
      "ملخص واضح كل اثنين، يُعدّ أثناء نومك.",
    ),
    description: ml(
      "Instead of opening five dashboards, you receive one digest: sales, leads, social performance, support volume and anything else that matters to you — compared with last week, with a short written summary of what changed. It arrives on WhatsApp or by email, and the underlying sheet stays available if you want the detail.",
      "Au lieu d'ouvrir cinq tableaux de bord, vous recevez un seul résumé : ventes, prospects, performance sociale, volume de support et tout ce qui compte pour vous — comparé à la semaine précédente, avec un court commentaire de ce qui a changé. Il arrive sur WhatsApp ou par email, et la feuille détaillée reste disponible.",
      "بدل فتح خمس لوحات بيانات، تتوصل بملخص واحد: المبيعات والعملاء وأداء التواصل وحجم الدعم وأي شيء يهمك — مقارنة بالأسبوع الماضي مع تعليق قصير عما تغيّر. يصلك عبر واتساب أو البريد، ويبقى الجدول التفصيلي متاحاً عند الحاجة.",
    ),
    category_slug: "reporting",
    icon: "trend",
    thumbnail_url: "/images/automations/automated-weekly-reporting.svg",
    benefits: [
      ml(
        "Five dashboards become one message",
        "Cinq tableaux de bord en un seul message",
        "خمس لوحات في رسالة واحدة",
      ),
      ml(
        "Same format every week",
        "Le même format chaque semaine",
        "نفس الصيغة كل أسبوع",
      ),
      ml(
        "Trends, not just numbers",
        "Des tendances, pas seulement des chiffres",
        "اتجاهات لا أرقاماً فقط",
      ),
    ],
    workflow: steps(
      ml(
        "Data pulled from each source",
        "Données récupérées de chaque source",
        "جلب البيانات من كل مصدر",
      ),
      ml(
        "Metrics calculated & compared",
        "Indicateurs calculés & comparés",
        "حساب المؤشرات ومقارنتها",
      ),
      ml("Charts generated", "Graphiques générés", "إنشاء الرسوم البيانية"),
      ml("Written summary drafted", "Résumé rédigé", "صياغة ملخص مكتوب"),
      ml(
        "Digest sent Monday morning",
        "Résumé envoyé lundi matin",
        "إرسال الملخص صباح الاثنين",
      ),
    ),
    integrations: [
      "Google Sheets",
      "Meta Insights",
      "Google Analytics",
      "Looker Studio",
      "WhatsApp",
    ],
    sort_order: 11,
    active: true,
  },
];
