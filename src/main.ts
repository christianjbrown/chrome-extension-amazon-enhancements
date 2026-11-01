// The content script: builds every enhancement and starts it. Nothing else
// touches the page's globals.
import type { Enhancement } from "./enhancement";
import { HideSponsored } from "./hide-sponsored/hide-sponsored";
import { AttributeHider } from "./hide-sponsored/hider";
import { LabelRule } from "./hide-sponsored/label-rule";
import { NodeWatcher } from "./hide-sponsored/node-watcher";
import { StyleElement } from "./hide-sponsored/page-style";
import { SponsoredScanner } from "./hide-sponsored/scanner";
import {
  HIDDEN,
  SEARCH_BLOCK,
  SEARCH_LABELS,
  SEARCH_TEXT_LABELS,
  SPONSORED_WORDS,
  STYLESHEET,
  WIDGET_BLOCK,
  WIDGET_LABELS,
  WIDGET_TEXT_LABELS,
} from "./hide-sponsored/sponsored-markers";
import { AnyRule } from "./hide-sponsored/sponsored-rule";
import { TextLabelRule } from "./hide-sponsored/text-label-rule";

function hideSponsored(): Enhancement {
  const rule = new AnyRule([
    new LabelRule(SEARCH_LABELS, SEARCH_BLOCK),
    new LabelRule(WIDGET_LABELS, WIDGET_BLOCK),
    new TextLabelRule(SPONSORED_WORDS, SEARCH_TEXT_LABELS, SEARCH_BLOCK),
    new TextLabelRule(SPONSORED_WORDS, WIDGET_TEXT_LABELS, WIDGET_BLOCK),
  ]);
  return new HideSponsored(
    document.documentElement,
    new StyleElement(document, STYLESHEET),
    new SponsoredScanner(rule, new AttributeHider(HIDDEN)),
    new NodeWatcher((callback) => new MutationObserver(callback), document),
  );
}

// A new enhancement is a new class and a new line here.
const enhancements: Enhancement[] = [hideSponsored()];

for (const enhancement of enhancements) enhancement.start();
