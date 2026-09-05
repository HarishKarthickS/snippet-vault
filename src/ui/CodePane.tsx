"use client";

import type { Snippet } from "@/domain";

type Props = {
  snippet: Snippet;
  copied: boolean;
  copyFailed: boolean;
  onCopy: () => void;
};

export function CodePane({ snippet, copied, copyFailed, onCopy }: Props) {
  return (
    <article className="matte" aria-label="Snippet">
      <header>
        <div>
          <h1>{snippet.title}</h1>
          <span className="acc-lg">
            {snippet.language} · {snippet.accession}
          </span>
        </div>
        <div className="matte-actions">
          <button
            type="button"
            className="plaque-btn"
            data-copied={copied}
            onClick={onCopy}
          >
            {copied ? "Copied" : "Copy"}
          </button>
          {copyFailed ? <span className="acc-lg">Couldn’t copy</span> : null}
        </div>
      </header>
      <pre>
        <code>{snippet.body}</code>
      </pre>
      <p className="didactic">{snippet.didactic}</p>
    </article>
  );
}
