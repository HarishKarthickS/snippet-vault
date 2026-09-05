export const LANGUAGES = [
  "TypeScript",
  "Python",
  "SQL",
  "CSS",
  "Go",
  "Rust",
  "Bash",
  "HTML",
] as const;

export type Language = (typeof LANGUAGES)[number];

export type Snippet = {
  id: string;
  title: string;
  language: Language;
  body: string;
  didactic: string;
  accession: string;
  year: number;
  addedAt: string;
};

export type VaultSnapshot = {
  snippets: Snippet[];
  selectedId: string | null;
};

export type VaultError = {
  code: "corrupt" | "quota" | "unavailable";
  message: string;
};

export function isLanguage(value: string): value is Language {
  return (LANGUAGES as readonly string[]).includes(value);
}
