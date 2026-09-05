import type { Language, Snippet } from "./types";

function haystack(snippet: Snippet): string {
  return [snippet.title, snippet.language, snippet.body, snippet.didactic, snippet.accession]
    .join("\n")
    .toLowerCase();
}

export function filterSnippets(
  snippets: Snippet[],
  query: string,
  language: Language | "all",
): Snippet[] {
  const needle = query.trim().toLowerCase();
  return snippets.filter((snippet) => {
    if (language !== "all" && snippet.language !== language) return false;
    if (!needle) return true;
    return haystack(snippet).includes(needle);
  });
}

export function pickSelected(snippets: Snippet[], selectedId: string | null): Snippet | null {
  if (snippets.length === 0) return null;
  if (selectedId) {
    const hit = snippets.find((item) => item.id === selectedId);
    if (hit) return hit;
  }
  return snippets[0] ?? null;
}

export function uniqueLanguages(snippets: Snippet[]): Language[] {
  const seen = new Set<Language>();
  for (const snippet of snippets) seen.add(snippet.language);
  return [...seen];
}
