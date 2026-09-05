"use client";

import type { Language, Snippet } from "@/domain";
import { LANGUAGES } from "@/domain";

type Props = {
  snippets: Snippet[];
  language: Language | "all";
  onChange: (value: Language | "all") => void;
};

export function LanguagePlaques({ snippets, language, onChange }: Props) {
  return (
    <div className="language-rail" role="tablist" aria-label="Wall labels by language">
      <button
        type="button"
        className="plaque"
        role="tab"
        data-active={language === "all"}
        onClick={() => onChange("all")}
      >
        <span className="lang">All media</span>
        <span className="meta">{snippets.length} works</span>
      </button>
      {LANGUAGES.map((lang) => {
        const count = snippets.filter((item) => item.language === lang).length;
        return (
          <button
            key={lang}
            type="button"
            className="plaque"
            role="tab"
            data-active={language === lang}
            onClick={() => onChange(lang)}
          >
            <span className="lang">{lang}</span>
            <span className="meta">{count === 0 ? "not hung" : `${count} hung`}</span>
          </button>
        );
      })}
    </div>
  );
}
