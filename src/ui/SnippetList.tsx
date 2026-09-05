"use client";

import type { Snippet } from "@/domain";

type Props = {
  snippets: Snippet[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function SnippetList({ snippets, selectedId, onSelect }: Props) {
  return (
    <div className="catalog-scroll" role="list" aria-label="Snippets">
      {snippets.map((snippet) => (
        <button
          key={snippet.id}
          type="button"
          className="wall-label"
          role="listitem"
          data-active={snippet.id === selectedId}
          onClick={() => onSelect(snippet.id)}
        >
          <span className="title">{snippet.title}</span>
          <span className="acc">
            {snippet.language} · {snippet.accession}
          </span>
        </button>
      ))}
    </div>
  );
}
