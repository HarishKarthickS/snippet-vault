"use client";

import type { Snippet } from "@/domain";

type Props = {
  snippet: Snippet;
  copied: boolean;
  copyFailed: boolean;
  onCopy: () => void;
};

export function SpotlightCard({ snippet, copied, copyFailed, onCopy }: Props) {
  return (
    <article className="matte" aria-label="Work on view">
      <header>
        <h1>{snippet.title}</h1>
        <span className="acc-lg">{snippet.accession}</span>
      </header>
      <pre>
        <code>{snippet.body}</code>
      </pre>
      <p className="didactic">{snippet.didactic}</p>
      <div className="matte-actions">
        <button
          type="button"
          className="plaque-btn"
          data-copied={copied}
          onClick={onCopy}
        >
          {copied ? "Rubbing taken" : "Lift a rubbing"}
        </button>
        {copyFailed ? (
          <span className="acc-lg">Clipboard refused the transfer.</span>
        ) : null}
      </div>
    </article>
  );
}
