"use client";

import { EmptyCatalog, EmptyEditor, LoadingVault, VaultErrorPanel } from "./EmptyStates";
import { LanguageNav } from "./LanguageNav";
import { CodePane } from "./CodePane";
import { SnippetList } from "./SnippetList";
import { useVault } from "./useVault";

export function VaultApp() {
  const vault = useVault();

  if (!vault.ready) {
    return <LoadingVault />;
  }

  if (vault.error) {
    return <VaultErrorPanel error={vault.error} onRestore={vault.restore} />;
  }

  return (
    <div className="app">
      <aside className="lang-col">
        <p className="brand">Snippet Vault</p>
        <LanguageNav
          snippets={vault.snippets}
          language={vault.language}
          onChange={vault.setLanguage}
        />
      </aside>
      <aside className="list-col">
        <div className="search">
          <label htmlFor="snippet-search">Search</label>
          <input
            id="snippet-search"
            value={vault.query}
            onChange={(event) => vault.setQuery(event.target.value)}
            placeholder="Title, body, or id"
            autoComplete="off"
          />
        </div>
        <div className="catalog">
          {vault.visible.length === 0 ? (
            <EmptyCatalog />
          ) : (
            <SnippetList
              snippets={vault.visible}
              selectedId={vault.selected?.id ?? null}
              onSelect={vault.select}
            />
          )}
        </div>
      </aside>
      <section className="editor-col">
        {vault.selected ? (
          <CodePane
            snippet={vault.selected}
            copied={vault.copied}
            copyFailed={vault.copyFailed}
            onCopy={() => void vault.copySelected()}
          />
        ) : (
          <EmptyEditor />
        )}
      </section>
    </div>
  );
}
