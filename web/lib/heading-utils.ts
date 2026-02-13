export function toHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u3000-\u9fff\uff00-\uffef]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
