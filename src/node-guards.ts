// Checks on what the page hands over, made at run time, so code reads only the
// members a node really has.

// An element, rather than text, a comment or anything else a page adds.
export const isElement = (node: Node): node is Element =>
  node instanceof Element;
