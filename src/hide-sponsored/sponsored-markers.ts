// What Amazon puts on its ads. The class names and attributes are the same on
// every storefront and in every language, so they come first. The words are
// the fallback for a label drawn without them.

// The attribute a hidden block is marked with.
export const HIDDEN = "data-amazon-enhancements-sponsored";

// Blocks that are ads in their own right, hidden by the stylesheet alone the
// moment they appear: Amazon's ad slots and the older sponsored result.
const AD_BLOCKS = [".AdHolder", '[data-component-type="sp-sponsored-result"]'];

const HIDDEN_BLOCKS = [...AD_BLOCKS, "[" + HIDDEN + "]"].join(",\n");

export const STYLESHEET = `${HIDDEN_BLOCKS} {\n  display: none !important;\n}\n`;

// One search result, or one whole widget such as a carousel. A label inside a
// carousel card hides that card. A label in the carousel's heading hides the
// carousel.
export const SEARCH_BLOCK = ".s-result-item";

export const SEARCH_LABELS = [
  ".puis-sponsored-label-text",
  ".s-sponsored-label-text",
  ".s-widget-sponsored-label-text",
  ".sponsored-brand-label-info-desktop",
  '[data-component-type="sp-sponsored-result"]',
  "[data-ad-feedback-label-id]",
].join(", ");

// The sponsored carousels on product and other pages, each in its own widget.
// Amazon names a widget in data-cel-widget only after it is on the page, but
// the class is there from the start. A label inside a search result stops at
// the result, because a carousel's cards share one widget, and the organic
// cards beside a sponsored one have to stay.
export const WIDGET_BLOCK = `${SEARCH_BLOCK}, .celwidget`;

export const WIDGET_LABELS = [
  ".sp_desktop_sponsored_label",
  ".dynamicSponsoredLabelClass",
  "[data-ad-feedback-label-id]",
].join(", ");

export const SEARCH_TEXT_LABELS = "span";

// Product pages draw some "Sponsored" labels as a bare div.
export const WIDGET_TEXT_LABELS = "span, div";

// "Sponsored" in the languages Amazon's storefronts are offered in, plus a few
// more that the extension this replaced looked for.
export const SPONSORED_WORDS = [
  "Sponsored",
  "Gesponsert",
  "Sponsorisé",
  "Sponsorisée",
  "Sponsorizzato",
  "Patrocinado",
  "Gesponsord",
  "Sponsrad",
  "Sponsorowane",
  "Sponsorowany",
  "Sponsorlu",
  "スポンサー",
  "広告",
  "إعلان",
  "ممول",
  "مُموَّل",
  "प्रायोजित",
  "ஸ்பான்சர் செய்யப்பட்டது",
  "స్పాన్సర్ చేయబడింది",
  "ಪ್ರಾಯೋಜಿತ",
  "സ്പോൺസർ ചെയ്‌തത്",
  "স্পনসর করা",
  "赞助",
  "赞助商链接",
  "贊助",
  "스폰서",
  "ממומן",
  "Реклама",
  "Sponzorováno",
  "Sponsorováno",
  "Sponsoroitu",
  "Sponsoreret",
  "Sponset",
  "Χορηγούμενη",
  "Sponsorizat",
  "Szponzorált",
  "Sponsorirano",
];
