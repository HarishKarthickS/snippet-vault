"use client";

import type { VaultError } from "@/domain";

export function LoadingVault() {
  return (
    <div className="hall">
      <p className="mast">
        <strong>Snippet Vault</strong> · Loading snippets…
      </p>
    </div>
  );
}

export function VaultErrorPanel({
  error,
  onRestore,
}: {
  error: VaultError;
  onRestore: () => void;
}) {
  return (
    <div className="hall">
      <section className="banner" data-kind="error">
        <h1>Couldn’t load the vault</h1>
        <p>{error.message}</p>
        <button type="button" className="plaque-btn" onClick={onRestore}>
          Restore seed snippets
        </button>
      </section>
    </div>
  );
}

export function EmptyCatalog() {
  return (
    <div className="empty-wall empty-wall--flush">
      <h1>No matching snippets</h1>
      <p>Try another search or language.</p>
    </div>
  );
}

export function EmptyEditor() {
  return (
    <div className="empty-wall">
      <h1>No snippet selected</h1>
      <p>Choose one from the list, or clear the search.</p>
    </div>
  );
}
