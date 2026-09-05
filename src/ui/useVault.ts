"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Language, Snippet, VaultError } from "@/domain";
import { filterSnippets, pickSelected } from "@/domain";
import { loadVault, restoreSeed, saveVault } from "@/data";

export function useVault() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<Language | "all">("all");
  const [error, setError] = useState<VaultError | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  useEffect(() => {
    const result = loadVault();
    if (!result.ok) {
      setError(result.error);
      setSnippets([]);
      setSelectedId(null);
      setReady(true);
      return;
    }
    setError(null);
    setSnippets(result.snapshot.snippets);
    setSelectedId(result.snapshot.selectedId);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || error) return;
    const writeError = saveVault({ snippets, selectedId });
    if (writeError) setError(writeError);
  }, [error, ready, selectedId, snippets]);

  const visible = useMemo(
    () => filterSnippets(snippets, query, language),
    [language, query, snippets],
  );

  const selected = useMemo(() => pickSelected(visible, selectedId), [selectedId, visible]);

  const select = useCallback((id: string) => {
    setSelectedId(id);
    setCopied(false);
    setCopyFailed(false);
  }, []);

  const copySelected = useCallback(async () => {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(selected.body);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopyFailed(true);
    }
  }, [selected]);

  const restore = useCallback(() => {
    const snapshot = restoreSeed();
    setSnippets(snapshot.snippets);
    setSelectedId(snapshot.selectedId);
    setError(null);
    setQuery("");
    setLanguage("all");
  }, []);

  return {
    ready,
    error,
    snippets,
    visible,
    selected,
    selectedId,
    query,
    language,
    copied,
    copyFailed,
    setQuery,
    setLanguage,
    select,
    copySelected,
    restore,
  };
}
