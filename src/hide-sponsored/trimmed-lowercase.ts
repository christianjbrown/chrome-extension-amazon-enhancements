// Case and surrounding space do not make a different word.
import type { TextNormalizer } from "./text-normalizer";

export class TrimmedLowercase implements TextNormalizer {
  normalize(text: string): string {
    return text.trim().toLocaleLowerCase();
  }
}
