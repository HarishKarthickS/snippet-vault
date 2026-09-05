"use client";

import type { VaultError } from "@/domain";

export function LightsWarming() {
  return (
    <div className="hall">
      <p className="mast">
        <strong>Hall 14</strong> · lights warming
      </p>
    </div>
  );
}

export function ConservationHold({
  error,
  onRestore,
}: {
  error: VaultError;
  onRestore: () => void;
}) {
  return (
    <div className="hall">
      <div className="ceiling">
        <div className="track" />
        <div className="lamp" />
      </div>
      <section className="banner" data-kind="error">
        <h1>Conservation hold</h1>
        <p>{error.message}</p>
        <button type="button" className="plaque-btn" onClick={onRestore}>
          Rehang the seed works
        </button>
      </section>
    </div>
  );
}

export function EmptyCatalog() {
  return (
    <div className="empty-wall empty-wall--flush">
      <h1>Nothing on this wall</h1>
      <p>No fragment matches the search or the language plaque.</p>
    </div>
  );
}

export function EmptySpotlight() {
  return (
    <div className="empty-wall">
      <h1>The spotlight is empty</h1>
      <p>Choose another plaque, or clear the search.</p>
    </div>
  );
}
