// Puts a label's text in the form the word list is compared in.
export interface TextNormalizer {
  normalize(text: string): string;
}

// Case and surrounding space do not make a different word.
export class TrimmedLowercase implements TextNormalizer {
  normalize(text: string): string {
    return text.trim().toLocaleLowerCase();
  }
}
