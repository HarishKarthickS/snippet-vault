"use client";

import type { Snippet } from "@/domain";

type Props = {
  snippets: Snippet[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function WallCatalog({ snippets, selectedId, onSelect }: Props) {
  return (
    <div className="catalog-scroll" role="list" aria-label="Accession catalog">
      {snippets.map((snippet) => (
        <button
          key={snippet.id}
          type="button"
          className="wall-label"
          role="listitem"
          data-active={snippet.id === selectedId}
          onClick={() => onSelect(snippet.id)}
        >
          <span className="acc">{snippet.accession}</span>
          <span className="title">{snippet.title}</span>
        </button>
      ))}
    </div>
  );
}
