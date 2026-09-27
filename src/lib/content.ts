import type { CollectionEntry } from "astro:content";

type Publishable = CollectionEntry<"projects"> | CollectionEntry<"journal">;

export function isPublished(entry: Publishable) {
  return import.meta.env.DEV || !entry.data.draft;
}

export function newestFirst<T extends Publishable>(entries: T[]) {
  return entries.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}
