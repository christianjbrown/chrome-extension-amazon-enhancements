// The stylesheet that does the hiding: Amazon's own ad blocks, plus every
// block the scanner has marked with the given attribute. main.ts passes the
// same attribute to the hider, so the two cannot drift apart.
const SELECTOR_SEPARATOR = ",\n";
const HIDING_DECLARATION = "display: none !important";

export function hidingStylesheet(
  adBlocks: readonly string[],
  hiddenAttribute: string,
): string {
  const selectors = [...adBlocks, `[${hiddenAttribute}]`];
  return `${selectors.join(SELECTOR_SEPARATOR)} {\n  ${HIDING_DECLARATION};\n}\n`;
}
