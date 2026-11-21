// Puts a label's text in the form the word list is compared in.
export interface TextNormalizer {
  normalize(text: string): string;
}
