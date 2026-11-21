// The stylesheet that does the hiding: Amazon's own ad blocks, plus every
// block the scanner has marked.
import { HIDDEN } from "./hidden-marker";
import { AD_BLOCKS } from "./sponsored-selectors";

const SELECTOR_SEPARATOR = ",\n";
const HIDING_DECLARATION = "display: none !important";

export function hidingStylesheet(
  adBlocks: readonly string[],
  hiddenAttribute: string,
): string {
  const selectors = [...adBlocks, `[${hiddenAttribute}]`];
  return `${selectors.join(SELECTOR_SEPARATOR)} {\n  ${HIDING_DECLARATION};\n}\n`;
}

export const STYLESHEET = hidingStylesheet(AD_BLOCKS, HIDDEN);
