import type { Snippet, VaultError, VaultSnapshot } from "@/domain";
import { isLanguage } from "@/domain";
import { STORAGE_KEY, seedSnippets } from "./seed";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function asSnippet(value: unknown): Snippet | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || typeof row.title !== "string") return null;
  if (typeof row.body !== "string" || typeof row.didactic !== "string") return null;
  if (typeof row.accession !== "string" || typeof row.addedAt !== "string") return null;
  if (typeof row.year !== "number" || typeof row.language !== "string") return null;
  if (!isLanguage(row.language)) return null;
  return {
    id: row.id,
    title: row.title,
    language: row.language,
    body: row.body,
    didactic: row.didactic,
    accession: row.accession,
    year: row.year,
    addedAt: row.addedAt,
  };
}

export type LoadResult =
  | { ok: true; snapshot: VaultSnapshot }
  | { ok: false; error: VaultError };

export function loadVault(): LoadResult {
  const snippets = seedSnippets();
  const seeded: VaultSnapshot = {
    snippets,
    selectedId: snippets[0]?.id ?? null,
  };

  if (!canUseStorage()) {
    return {
      ok: false,
      error: {
        code: "unavailable",
        message: "The gallery cannot keep notes in this browser. The hanging is view-only.",
      },
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      persist(seeded);
      return { ok: true, snapshot: seeded };
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return {
        ok: false,
        error: {
          code: "corrupt",
          message: "A label fell. Local notes could not be read as a catalog.",
        },
      };
    }
    const bag = parsed as Record<string, unknown>;
    const rows = Array.isArray(bag.snippets) ? bag.snippets : null;
    if (!rows) {
      return {
        ok: false,
        error: {
          code: "corrupt",
          message: "The accession book is missing its list of works.",
        },
      };
    }
    const snippets = rows.map(asSnippet).filter((row): row is Snippet => row !== null);
    if (snippets.length === 0) {
      return {
        ok: false,
        error: {
          code: "corrupt",
          message: "Every wall label failed conservation. Restore the original hanging.",
        },
      };
    }
    const selectedId = typeof bag.selectedId === "string" ? bag.selectedId : snippets[0].id;
    return { ok: true, snapshot: { snippets, selectedId } };
  } catch {
    return {
      ok: false,
      error: {
        code: "corrupt",
        message: "The vitrine fogged. Stored fragments could not be parsed.",
      },
    };
  }
}

function persist(snapshot: VaultSnapshot): VaultError | null {
  if (!canUseStorage()) {
    return {
      code: "unavailable",
      message: "The gallery cannot keep notes in this browser.",
    };
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    return null;
  } catch {
    return {
      code: "quota",
      message: "The storeroom is full. Copy the work, then clear space in this browser.",
    };
  }
}

export function saveVault(snapshot: VaultSnapshot): VaultError | null {
  return persist(snapshot);
}

export function restoreSeed(): VaultSnapshot {
  const snippets = seedSnippets();
  const snapshot: VaultSnapshot = {
    snippets,
    selectedId: snippets[0]?.id ?? null,
  };
  persist(snapshot);
  return snapshot;
}
