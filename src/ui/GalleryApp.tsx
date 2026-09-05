"use client";

import { ConservationHold, EmptyCatalog, EmptySpotlight, LightsWarming } from "./EmptyStates";
import { LanguagePlaques } from "./LanguagePlaques";
import { SpotlightCard } from "./SpotlightCard";
import { WallCatalog } from "./WallCatalog";
import { useVault } from "./useVault";

export function GalleryApp() {
  const vault = useVault();

  if (!vault.ready) {
    return <LightsWarming />;
  }

  if (vault.error) {
    return <ConservationHold error={vault.error} onRestore={vault.restore} />;
  }

  return (
    <div className="app">
      <aside className="lang-col">
        <p className="brand">Snippet Vault</p>
        <LanguagePlaques
          snippets={vault.snippets}
          language={vault.language}
          onChange={vault.setLanguage}
        />
      </aside>
      <aside className="list-col">
        <div className="search">
          <label htmlFor="catalog-search">Search</label>
          <input
            id="catalog-search"
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
            <WallCatalog
              snippets={vault.visible}
              selectedId={vault.selected?.id ?? null}
              onSelect={vault.select}
            />
          )}
        </div>
      </aside>
      <section className="editor-col">
        {vault.selected ? (
          <SpotlightCard
            snippet={vault.selected}
            copied={vault.copied}
            copyFailed={vault.copyFailed}
            onCopy={() => void vault.copySelected()}
          />
        ) : (
          <EmptySpotlight />
        )}
      </section>
    </div>
  );
}
