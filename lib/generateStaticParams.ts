import { People } from "@/features/peoples/types/People";
import { Planet } from "@/features/planets/types/Planet";
import { Starship } from "@/features/starships/types/starship";
import { ResponseType } from "@/types/ResponseType";
import { StarWarsEntities } from "@/types/Root";

export async function generateStaticParams<T extends People | Starship | Planet >(
    type: StarWarsEntities
) {
  const promises = Array.from({ length: 9 }).map(async (_, index) => {
    const res = await fetch(
      `https://swapi.py4e.com/api/${type}/?page=${index + 1}`
    );
    return (await res.json()) as ResponseType<T[]>;
  });

  const results = await Promise.all(promises);

  // Hilfsfunktion: name -> slug (normalize, lowercase, non-alnum -> dash, trim dashes)
  const makeSlug = (input?: string) => {
    if (!input || typeof input !== "string") return "";
    return input
      .toLowerCase()
      .normalize("NFKD") // entferne diakritische Zeichen
      .replace(/[\u0300-\u036f]/g, "") // komb. diakritika löschen
      .replace(/[^a-z0-9]+/g, "-") // alles Nicht-alnum -> '-'
      .replace(/^-+|-+$/g, ""); // führende/folgende '-' entfernen
  };

  // Alle Personen sammeln, slug aus name bilden, filtern, deduplizieren
  const entries = results
    .flatMap((data) => data.results || [])
    .map((person: T) => {
      const name = person?.name ?? "";
      const slug = makeSlug(name);
      return { slug };
    })
    .filter((p) => p.slug && p.slug !== "0");

  // Duplikate nach slug entfernen (letzten Eintrag behalten)
  const unique = Array.from(new Map(entries.map((e) => [e.slug, e])).values());

  return unique.map((e) => ({ slug: e.slug }));
}