// The content script: builds every enhancement and starts it. Nothing else
// touches the page's globals.
import type { Enhancement } from "./enhancement";
import { HideSponsored } from "./hide-sponsored/hide-sponsored";
import { SelectorFinder } from "./hide-sponsored/element-finder";
import { AttributeHider } from "./hide-sponsored/hider";
import { LabelRule } from "./hide-sponsored/label-rule";
import { NodeWatcher } from "./hide-sponsored/node-watcher";
import { SelectorLabels } from "./hide-sponsored/selector-labels";
import { StyleElement } from "./hide-sponsored/page-style";
import { SponsoredScanner } from "./hide-sponsored/scanner";
import { HIDDEN } from "./hide-sponsored/hidden-marker";
import {
  AD_BLOCKS,
  SEARCH_BLOCK,
  SEARCH_LABELS,
  SEARCH_TEXT_LABELS,
  WIDGET_BLOCK,
  WIDGET_LABELS,
  WIDGET_TEXT_LABELS,
} from "./hide-sponsored/sponsored-selectors";
import { SPONSORED_WORDS } from "./hide-sponsored/sponsored-words";
import { hidingStylesheet } from "./hide-sponsored/stylesheet";
import { AnyRule } from "./hide-sponsored/sponsored-rule";
import { TrimmedLowercase } from "./hide-sponsored/text-normalizer";
import { WordLabels } from "./hide-sponsored/word-labels";

function hideSponsored(hidden: string): Enhancement {
  const finder = new SelectorFinder();
  const normalizer = new TrimmedLowercase();
  const words = (selector: string) =>
    new WordLabels(finder, selector, SPONSORED_WORDS, normalizer);
  const rule = new AnyRule([
    new LabelRule(new SelectorLabels(finder, SEARCH_LABELS), SEARCH_BLOCK),
    new LabelRule(new SelectorLabels(finder, WIDGET_LABELS), WIDGET_BLOCK),
    new LabelRule(words(SEARCH_TEXT_LABELS), SEARCH_BLOCK),
    new LabelRule(words(WIDGET_TEXT_LABELS), WIDGET_BLOCK),
  ]);
  return new HideSponsored(
    document.documentElement,
    new StyleElement(document, hidingStylesheet(AD_BLOCKS, hidden)),
    new SponsoredScanner(rule, new AttributeHider(hidden)),
    new NodeWatcher((callback) => new MutationObserver(callback), document),
  );
}

// A new enhancement is a new class and a new line here.
const enhancements: Enhancement[] = [hideSponsored(HIDDEN)];

for (const enhancement of enhancements) enhancement.start();
