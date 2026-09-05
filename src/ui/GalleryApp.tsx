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
    <div className="hall">
      <p className="mast">
        <strong>Hall 14</strong> · fragments
      </p>
      <div className="ceiling" aria-hidden="true">
        <div className="track" />
        <div className="lamp" />
      </div>
      <div className="cone" aria-hidden="true" />
      <div className="hall-grid">
        <aside className="catalog">
          <div className="search">
            <label htmlFor="catalog-search">Find a work</label>
            <input
              id="catalog-search"
              value={vault.query}
              onChange={(event) => vault.setQuery(event.target.value)}
              placeholder="title, body, accession"
              autoComplete="off"
            />
          </div>
          {vault.visible.length === 0 ? (
            <EmptyCatalog />
          ) : (
            <WallCatalog
              snippets={vault.visible}
              selectedId={vault.selected?.id ?? null}
              onSelect={vault.select}
            />
          )}
        </aside>
        <section className="stage">
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
          <LanguagePlaques
            snippets={vault.snippets}
            language={vault.language}
            onChange={vault.setLanguage}
          />
        </section>
      </div>
    </div>
  );
}
