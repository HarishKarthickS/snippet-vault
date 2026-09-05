"use client";

import { LanguagePlaques } from "./LanguagePlaques";
import { SpotlightCard } from "./SpotlightCard";
import { WallCatalog } from "./WallCatalog";
import { useVault } from "./useVault";

export function GalleryApp() {
  const vault = useVault();

  if (!vault.ready) {
    return (
      <div className="hall">
        <p className="mast">
          <strong>Hall 14</strong> · lights warming
        </p>
      </div>
    );
  }

  if (vault.error) {
    return (
      <div className="hall">
        <div className="ceiling">
          <div className="track" />
          <div className="lamp" />
        </div>
        <section className="banner" data-kind="error">
          <h1>Conservation hold</h1>
          <p>{vault.error.message}</p>
          <button type="button" className="plaque-btn" onClick={vault.restore}>
            Rehang the seed works
          </button>
        </section>
      </div>
    );
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
            <div className="empty-wall" style={{ textAlign: "left", width: "auto" }}>
              <h1>Nothing on this wall</h1>
              <p>No fragment matches the search or the language plaque.</p>
            </div>
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
            <div className="empty-wall">
              <h1>The spotlight is empty</h1>
              <p>Choose another plaque, or clear the search.</p>
            </div>
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
