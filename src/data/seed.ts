import type { Snippet } from "@/domain";

export const STORAGE_KEY = "snippet-vault:v1";

export function seedSnippets(): Snippet[] {
  const addedAt = "2026-04-11T18:00:00.000Z";
  return [
    {
      id: "acc-14.01",
      title: "Untitled (Promise)",
      language: "TypeScript",
      accession: "2026.14.01",
      year: 2026,
      addedAt,
      didactic:
        "A settled contract. The wall note records both the resolve path and the rejected one.",
      body: `export async function settle<T>(task: Promise<T>): Promise<
  | { ok: true; value: T }
  | { ok: false; error: unknown }
> {
  try {
    return { ok: true, value: await task };
  } catch (error) {
    return { ok: false, error };
  }
}`,
    },
    {
      id: "acc-14.02",
      title: "Still Life with Hash Map",
      language: "Python",
      accession: "2026.14.02",
      year: 2026,
      addedAt,
      didactic: "Grouping as still life: each key a shelf, each list a cluster of objects.",
      body: `from collections import defaultdict

def cluster(rows: list[tuple[str, str]]) -> dict[str, list[str]]:
    shelves: dict[str, list[str]] = defaultdict(list)
    for key, value in rows:
        shelves[key].append(value)
    return dict(shelves)`,
    },
    {
      id: "acc-14.03",
      title: "Study for a Join",
      language: "SQL",
      accession: "2026.14.03",
      year: 2026,
      addedAt,
      didactic: "Two tables meeting at a labeled edge. The wall prefers inner light only.",
      body: `SELECT
  work.accession,
  work.title,
  wall.label
FROM fragments AS work
INNER JOIN labels AS wall
  ON wall.fragment_id = work.id
WHERE wall.language = :language
ORDER BY work.accession;`,
    },
    {
      id: "acc-14.04",
      title: "White Space, No. 4",
      language: "CSS",
      accession: "2026.14.04",
      year: 2026,
      addedAt,
      didactic: "Negative space as the medium. A single object holds the cone of light.",
      body: `.vitrine {
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: #050505;
}

.matte {
  width: min(42rem, 88vw);
  padding: 2.5rem 2.75rem;
  background: #fafafa;
  box-shadow: 0 0 0 1px #ececec, 0 40px 80px rgba(0, 0, 0, 0.55);
}`,
    },
    {
      id: "acc-14.05",
      title: "Goroutine (study)",
      language: "Go",
      accession: "2026.14.05",
      year: 2026,
      addedAt,
      didactic: "A corridor of workers. Each door closes when the last visitor leaves.",
      body: `func gather(ctx context.Context, urls []string) []string {
    out := make(chan string, len(urls))
    var wg sync.WaitGroup
    for _, url := range urls {
        wg.Add(1)
        go func(u string) {
            defer wg.Done()
            select {
            case <-ctx.Done():
            case out <- u:
            }
        }(url)
    }
    go func() { wg.Wait(); close(out) }()
    var seen []string
    for item := range out {
        seen = append(seen, item)
    }
    return seen
}`,
    },
    {
      id: "acc-14.06",
      title: "Match Arms",
      language: "Rust",
      accession: "2026.14.06",
      year: 2026,
      addedAt,
      didactic: "Exhaustive branches, like labels that refuse an unlabeled wall.",
      body: `fn wall_note(status: Result<&str, &str>) -> String {
    match status {
        Ok(body) => format!("acquired: {body}"),
        Err(why) => format!("deaccessioned: {why}"),
    }
}`,
    },
    {
      id: "acc-14.07",
      title: "Trap for stderr",
      language: "Bash",
      accession: "2026.14.07",
      year: 2026,
      addedAt,
      didactic: "A small apparatus: fail loud, leave the gallery dark if a wire snaps.",
      body: `set -euo pipefail

copy_fragment() {
  local src="$1"
  local dest="$2"
  mkdir -p "$(dirname "$dest")"
  cp -- "$src" "$dest"
  printf 'hung %s\n' "$dest"
}`,
    },
    {
      id: "acc-14.08",
      title: "Figure in Markup",
      language: "HTML",
      accession: "2026.14.08",
      year: 2026,
      addedAt,
      didactic: "Caption under the work, not over it. The figure is the object.",
      body: `<figure class="spot">
  <pre><code data-lang="go">func gather() {}</code></pre>
  <figcaption>
    <span class="acc">2026.14.05</span>
    Goroutine (study)
  </figcaption>
</figure>`,
    },
  ];
}
