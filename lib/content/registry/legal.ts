import { section } from "@/lib/content/helpers";
import { ml, type ContentEntry } from "@/lib/types";

const privacy = section("privacy", "Privacy policy");
const terms = section("terms", "Terms of service");

const privacyEn = `## Privacy Policy

**Last updated:** 1 January 2026

FLUXMEDIA ("we", "us") is a digital studio based in Beni Mellal, Morocco. This
page explains what we collect on this website and what we do with it.

### 1. What we collect

- **Order clicks.** When you press an "Order on WhatsApp" button we store the
  item you selected (title, reference, type, quantity and price when shown),
  your language, the date and an anonymous session identifier. We do **not**
  receive your name or phone number at that moment — that only happens if you
  send the WhatsApp message.
- **Contact form.** The name, email, WhatsApp number, business name and message
  you type into the contact form.
- **Technical data.** Standard server logs (IP address, browser user agent)
  kept for security and abuse prevention.

### 2. What we do not do

We do not sell your data. We do not run advertising trackers or sell profiles
to third parties. We do not publish your name or your business as a client
reference without your written agreement.

### 3. Why we keep it

- To answer your request and prepare a quote.
- To keep a record of orders and deliveries.
- To improve the website (for example, understanding which services are
  requested most).

### 4. Where it is stored

Website content and orders are stored in Supabase (PostgreSQL), protected by
row level security. Only authorised FLUXMEDIA staff accounts can read order
data. WhatsApp conversations are stored on your device and ours, under
WhatsApp's own terms.

### 5. How long we keep it

Order records are kept for as long as we have a commercial relationship with
you, and up to five years afterwards for accounting purposes. Contact messages
are deleted after two years.

### 6. Your rights

You can ask us at any time to access, correct or delete the data we hold about
you. Write to the email on the contact page or send a WhatsApp message and we
will action it within 30 days.

### 7. Cookies

We use two functional cookies: one for your language choice and one for your
theme (dark or light). A third anonymous cookie groups repeated order clicks
from the same visitor so an order is not duplicated. No advertising cookies.

### 8. Changes

If this policy changes we will update the date at the top of this page.`;

const privacyFr = `## Politique de confidentialité

**Dernière mise à jour :** 1er janvier 2026

FLUXMEDIA (« nous ») est un studio digital basé à Béni Mellal, au Maroc. Cette
page explique ce que nous collectons sur ce site et ce que nous en faisons.

### 1. Ce que nous collectons

- **Clics de commande.** Lorsque vous appuyez sur « Commander sur WhatsApp »,
  nous enregistrons l'élément choisi (titre, référence, type, quantité et prix
  s'il est affiché), votre langue, la date et un identifiant de session anonyme.
  Nous ne recevons **pas** votre nom ni votre numéro à ce moment-là — cela
  n'arrive que si vous envoyez le message WhatsApp.
- **Formulaire de contact.** Les nom, email, numéro WhatsApp, nom d'entreprise
  et message que vous saisissez.
- **Données techniques.** Journaux serveur standards (adresse IP, navigateur)
  conservés pour la sécurité.

### 2. Ce que nous ne faisons pas

Nous ne vendons pas vos données. Nous n'utilisons pas de traqueurs
publicitaires. Nous ne publions pas votre nom ou votre entreprise comme
référence client sans votre accord écrit.

### 3. Pourquoi nous les conservons

- Pour répondre à votre demande et préparer un devis.
- Pour garder une trace des commandes et des livraisons.
- Pour améliorer le site (par exemple savoir quels services sont les plus
  demandés).

### 4. Où elles sont stockées

Le contenu du site et les commandes sont stockés dans Supabase (PostgreSQL),
protégés par des règles de sécurité au niveau des lignes. Seuls les comptes
autorisés de FLUXMEDIA peuvent lire les commandes. Les conversations WhatsApp
sont soumises aux conditions de WhatsApp.

### 5. Durée de conservation

Les commandes sont conservées pendant la durée de la relation commerciale, puis
jusqu'à cinq ans pour des raisons comptables. Les messages de contact sont
supprimés après deux ans.

### 6. Vos droits

Vous pouvez à tout moment demander l'accès, la correction ou la suppression de
vos données. Écrivez à l'adresse indiquée sur la page contact ou envoyez un
message WhatsApp : nous traiterons la demande sous 30 jours.

### 7. Cookies

Nous utilisons deux cookies fonctionnels : langue et thème. Un troisième cookie
anonyme regroupe les clics de commande répétés afin d'éviter les doublons.
Aucun cookie publicitaire.

### 8. Modifications

En cas de changement, la date en haut de cette page sera mise à jour.`;

const privacyAr = `## سياسة الخصوصية

**آخر تحديث:** 1 يناير 2026

FLUXMEDIA استوديو رقمي مقره بني ملال، المغرب. توضح هذه الصفحة ما الذي نجمعه عبر
هذا الموقع وما نفعله به.

### 1. ما الذي نجمعه

- **نقرات الطلب.** عند الضغط على زر «اطلب عبر واتساب» نسجّل العنصر الذي اخترته
  (العنوان والمرجع والنوع والكمية والسعر إن كان ظاهراً)، ولغتك، والتاريخ،
  ومعرّف جلسة مجهول. لا نتلقى اسمك أو رقمك في تلك اللحظة — يحدث ذلك فقط عند
  إرسالك رسالة واتساب.
- **نموذج الاتصال.** الاسم والبريد ورقم واتساب واسم النشاط والرسالة.
- **بيانات تقنية.** سجلات الخادم المعتادة (عنوان IP، نوع المتصفح) للأمان ومنع
  الإساءة.

### 2. ما لا نفعله

لا نبيع بياناتك. لا نستعمل أدوات تتبع إعلانية. لا ننشر اسمك أو اسم نشاطك
كمرجع تجاري دون موافقتك الكتابية.

### 3. لماذا نحتفظ بها

- للرد على طلبك وإعداد عرض السعر.
- لحفظ سجل الطلبات والتسليمات.
- لتحسين الموقع ومعرفة الخدمات الأكثر طلباً.

### 4. أين تُخزَّن

يُخزَّن محتوى الموقع والطلبات في Supabase (PostgreSQL) محمية بقواعد أمان على
مستوى الصفوف. لا يقرأ بيانات الطلبات إلا حسابات FLUXMEDIA المصرّح لها.
محادثات واتساب تخضع لشروط واتساب نفسها.

### 5. مدة الاحتفاظ

تُحفظ الطلبات طوال فترة التعامل التجاري، ثم حتى خمس سنوات لأغراض محاسبية.
تُحذف رسائل الاتصال بعد سنتين.

### 6. حقوقك

يمكنك في أي وقت طلب الاطلاع على بياناتك أو تصحيحها أو حذفها. راسلنا على البريد
المذكور في صفحة الاتصال أو عبر واتساب، وسننفّذ الطلب خلال 30 يوماً.

### 7. ملفات تعريف الارتباط

نستعمل ملفين وظيفيين: اللغة والمظهر. وملفاً ثالثاً مجهولاً يجمع نقرات الطلب
المتكررة لتفادي تكرار الطلب. لا توجد ملفات إعلانية.

### 8. التعديلات

عند أي تغيير سنحدّث التاريخ أعلى هذه الصفحة.`;

const termsEn = `## Terms of Service

**Last updated:** 1 January 2026

These terms describe how we work together when you order a service from
FLUXMEDIA or a card from DENTISTA.

### 1. Orders

Pressing an order button on this website opens WhatsApp with a pre-filled
message. **It is a request, not a contract.** An order is confirmed only after
we agree in writing on the scope, the price and the delivery time.

### 2. Prices

All prices on this website are shown in Moroccan dirham (DH) and may change
without notice. The price agreed in your WhatsApp conversation is the one that
applies to your order. Social media packages are billed monthly in advance.
Card orders are produced after confirmation, usually against a deposit.

### 3. What we need from you

- Content, logos and access needed to do the work.
- Clear and timely feedback — delays in approval move the delivery date.
- Accurate contact and billing details.

### 4. Automation projects

Automation systems depend on third-party tools (for example WhatsApp,
Instagram, email providers, CRMs and AI providers). If one of those platforms
changes its rules or pricing, the system may need an adjustment. We will tell
you honestly when that happens and what it costs.

### 5. Social media management

We publish, reply and report within the agreed volume. We do not buy followers,
engagement or reviews. You keep ownership of all accounts and all content we
produce for you.

### 6. DENTISTA cards

Card designs are confirmed by you before production. Once production starts, an
order cannot be cancelled. NFC cards are tested before delivery; if a card fails
for a manufacturing reason we replace it free of charge. Printed colours may
vary slightly from a screen preview.

### 7. Payment

Payment terms are agreed per project. Late payment may pause an active service
until the balance is settled.

### 8. Intellectual property

Final deliverables become yours once the invoice is paid. We keep the right to
reuse internal methods, templates and code libraries built for our own studio.

### 9. Liability

We do our best work, but we cannot guarantee commercial results such as a number
of followers, leads or sales. Our liability is limited to the amount you paid
for the service concerned.

### 10. Ending a service

Monthly services can be stopped at the end of any month with written notice.
Work already delivered remains payable.

### 11. Law

These terms are governed by Moroccan law. If something is unclear, write to us
and we will explain it in plain language.`;

const termsFr = `## Conditions de service

**Dernière mise à jour :** 1er janvier 2026

Ces conditions décrivent notre façon de travailler lorsque vous commandez un
service FLUXMEDIA ou une carte DENTISTA.

### 1. Commandes

Appuyer sur un bouton de commande ouvre WhatsApp avec un message pré-rempli.
**Il s'agit d'une demande, pas d'un contrat.** Une commande est confirmée
uniquement après accord écrit sur le périmètre, le prix et le délai.

### 2. Prix

Tous les prix sont affichés en dirham marocain (DH) et peuvent évoluer sans
préavis. Le prix convenu dans votre conversation WhatsApp fait foi. Les
formules réseaux sociaux sont facturées mensuellement d'avance. Les cartes sont
produites après confirmation, généralement contre un acompte.

### 3. Ce que nous attendons de vous

- Les contenus, logos et accès nécessaires.
- Des retours clairs et rapides — un retard de validation décale la livraison.
- Des coordonnées de facturation exactes.

### 4. Projets d'automatisation

Les systèmes d'automatisation dépendent d'outils tiers (WhatsApp, Instagram,
emailing, CRM, fournisseurs d'IA). Si l'une de ces plateformes change ses règles
ou ses tarifs, un ajustement peut être nécessaire. Nous vous le dirons
honnêtement, avec le coût correspondant.

### 5. Gestion des réseaux sociaux

Nous publions, répondons et rendons compte dans le volume convenu. Nous
n'achetons ni abonnés, ni engagement, ni avis. Vous restez propriétaire des
comptes et de tous les contenus produits.

### 6. Cartes DENTISTA

Les designs sont validés par vous avant production. Une fois la production
lancée, la commande ne peut plus être annulée. Les cartes NFC sont testées avant
livraison ; un défaut de fabrication est remplacé gratuitement. Les couleurs
imprimées peuvent légèrement différer d'un aperçu à l'écran.

### 7. Paiement

Les modalités sont convenues par projet. Un retard de paiement peut suspendre un
service actif.

### 8. Propriété intellectuelle

Les livrables finaux vous appartiennent une fois la facture réglée. Nous
conservons le droit de réutiliser nos méthodes, modèles et bibliothèques de code
internes.

### 9. Responsabilité

Nous faisons notre meilleur travail, mais nous ne garantissons pas de résultats
commerciaux (nombre d'abonnés, de prospects ou de ventes). Notre responsabilité
est limitée au montant payé pour le service concerné.

### 10. Fin de service

Les services mensuels peuvent être arrêtés à la fin d'un mois, par écrit. Le
travail déjà livré reste dû.

### 11. Droit applicable

Ces conditions sont régies par le droit marocain. En cas de doute, écrivez-nous
et nous vous l'expliquerons simplement.`;

const termsAr = `## شروط الخدمة

**آخر تحديث:** 1 يناير 2026

توضح هذه الشروط طريقة عملنا معاً عند طلب خدمة من FLUXMEDIA أو بطاقة من
DENTISTA.

### 1. الطلبات

الضغط على زر الطلب يفتح واتساب برسالة جاهزة. **هذا طلب وليس عقداً.** لا يُعتبر
الطلب مؤكداً إلا بعد الاتفاق كتابة على النطاق والسعر ومدة التسليم.

### 2. الأسعار

جميع الأسعار معروضة بالدرهم المغربي (DH) وقد تتغير دون إشعار. السعر المتفق عليه
في محادثة واتساب هو المعتمد. تُفوتر باقات مواقع التواصل شهرياً مقدماً، وتُنتج
البطاقات بعد التأكيد وعادةً مقابل عربون.

### 3. ما نحتاجه منك

- المحتوى والشعارات والصلاحيات اللازمة للعمل.
- ملاحظات واضحة وفي وقتها — تأخر الموافقة يؤخر التسليم.
- بيانات تواصل وفوترة صحيحة.

### 4. مشاريع الأتمتة

تعتمد أنظمة الأتمتة على أدوات خارجية (واتساب، إنستغرام، مزودو البريد، أنظمة
العملاء، مزودو الذكاء الاصطناعي). إذا غيّرت إحدى هذه المنصات قواعدها أو
أسعارها فقد يحتاج النظام إلى تعديل، وسنخبرك بذلك بصراحة مع التكلفة.

### 5. إدارة مواقع التواصل

ننشر ونرد ونقدّم التقارير ضمن الحجم المتفق عليه. لا نشتري متابعين ولا تفاعلاً
ولا تقييمات. تبقى الحسابات وكل المحتوى المنتج ملكاً لك.

### 6. بطاقات DENTISTA

تُعتمد التصاميم من طرفك قبل الإنتاج. وبعد بدء الإنتاج لا يمكن إلغاء الطلب.
تُختبر بطاقات NFC قبل التسليم، وتُستبدل مجاناً عند وجود عيب تصنيع. قد تختلف
الألوان المطبوعة قليلاً عن المعاينة على الشاشة.

### 7. الأداء

تُحدَّد شروط الأداء لكل مشروع. قد يؤدي التأخر في الأداء إلى إيقاف الخدمة مؤقتاً.

### 8. الملكية الفكرية

تصبح المخرجات النهائية ملكك بعد سداد الفاتورة. ونحتفظ بحق إعادة استعمال
أساليبنا وقوالبنا ومكتباتنا البرمجية الداخلية.

### 9. المسؤولية

نقدّم أفضل ما لدينا، لكننا لا نضمن نتائج تجارية كعدد المتابعين أو العملاء أو
المبيعات. وتقتصر مسؤوليتنا على المبلغ المدفوع مقابل الخدمة المعنية.

### 10. إنهاء الخدمة

يمكن إيقاف الخدمات الشهرية في نهاية أي شهر بإشعار كتابي، ويبقى العمل المنجز
مستحق الأداء.

### 11. القانون

تخضع هذه الشروط للقانون المغربي. وإن كان أي بند غير واضح فراسلنا وسنشرحه بلغة
بسيطة.`;

export const legalEntries: ContentEntry[] = [
  privacy.text(
    "privacy.title",
    "Page title",
    ml("Privacy Policy", "Politique de confidentialité", "سياسة الخصوصية"),
  ),
  privacy.rich(
    "privacy.body",
    "Privacy policy body (Markdown)",
    ml(privacyEn, privacyFr, privacyAr),
  ),
  terms.text(
    "terms.title",
    "Page title",
    ml("Terms of Service", "Conditions de service", "شروط الخدمة"),
  ),
  terms.rich(
    "terms.body",
    "Terms of service body (Markdown)",
    ml(termsEn, termsFr, termsAr),
  ),
];
