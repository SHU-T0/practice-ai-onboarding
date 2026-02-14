export function toHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u3000-\u9fff\uff00-\uffef]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createHeadingIdFactory() {
  const counts = new Map<string, number>();

  return (text: string): string => {
    const baseId = toHeadingId(text) || "section";
    const currentCount = counts.get(baseId) ?? 0;
    const nextCount = currentCount + 1;
    counts.set(baseId, nextCount);
    return nextCount === 1 ? baseId : `${baseId}-${nextCount}`;
  };
}
