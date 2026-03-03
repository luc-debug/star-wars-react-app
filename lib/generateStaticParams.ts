import type { ResponseType } from "@/types/ResponseType";
import type { StarWarsEntities, StarWarsEntity } from "@/types/Root";
import { env } from "./env";

export async function generateStaticParams<T extends StarWarsEntity>(
	type: StarWarsEntities,
) {
	const allResults: T[] = [];
	let nextUrl: string | null = `${env.swapiBaseUrl}/api/${type}/?page=1`;

	while (nextUrl) {
		try {
			const res = await fetch(nextUrl);
			if (!res.ok) break;
			const data = (await res.json()) as ResponseType<T[]>;
			allResults.push(...(data.results || []));
			nextUrl = data.next ?? null;
		} catch {
			break;
		}
	}

	// Alle Personen sammeln, slug aus name bilden, filtern, deduplizieren
	const entries = allResults
		.map((person: T) => {
			let name = "";
			if ("name" in person && typeof person.name === "string") {
				name = person.name;
			} else if ("title" in person && typeof person.title === "string") {
				name = person.title;
			}
			const slug = makeSlug(name);
			return { slug };
		})
		.filter((p) => p.slug && p.slug !== "0");

	// Duplikate nach slug entfernen (letzten Eintrag behalten)
	const unique = Array.from(new Map(entries.map((e) => [e.slug, e])).values());

	return unique.map((e) => ({ slug: e.slug }));
}

// Hilfsfunktion: name -> slug (normalize, lowercase, non-alnum -> dash, trim dashes)
export const makeSlug = (input?: string) => {
	if (!input || typeof input !== "string") return "";
	return input
		.toLowerCase()
		.normalize("NFKD") // entferne diakritische Zeichen
		.replace(/[\u0300-\u036f]/g, "") // komb. diakritika löschen
		.replace(/[^a-z0-9]+/g, "-") // alles Nicht-alnum -> '-'
		.replace(/^-+|-+$/g, ""); // führende/folgende '-' entfernen
};
