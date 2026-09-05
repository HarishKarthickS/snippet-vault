"use client";

import type { Language, Snippet } from "@/domain";
import { LANGUAGES } from "@/domain";

type Props = {
  snippets: Snippet[];
  language: Language | "all";
  onChange: (value: Language | "all") => void;
};

export function LanguageNav({ snippets, language, onChange }: Props) {
  return (
    <nav className="language-rail" aria-label="Languages">
      <button
        type="button"
        className="plaque"
        data-active={language === "all"}
        onClick={() => onChange("all")}
      >
        <span className="lang">All</span>
        <span className="meta">{snippets.length}</span>
      </button>
      {LANGUAGES.map((lang) => {
        const count = snippets.filter((item) => item.language === lang).length;
        return (
          <button
            key={lang}
            type="button"
            className="plaque"
            data-active={language === lang}
            onClick={() => onChange(lang)}
          >
            <span className="lang">{lang}</span>
            <span className="meta">{count}</span>
          </button>
        );
      })}
    </nav>
  );
}
