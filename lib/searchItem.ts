import type { ResponseType } from "@/types/ResponseType";
import type { StarWarsEntities, StarWarsEntity } from "@/types/Root";
import { env } from "@/lib/env";

export const searchItem = async <T extends StarWarsEntity>(
	slug: string,
	type: StarWarsEntities,
): Promise<T | undefined> => {
	// Try full slug as search phrase first (e.g. "padme amidala"), fall back to first word
	const fullTerm = slug.replace(/-/g, " ");
	const firstTerm = slug.split("-")[0];

	for (const term of [fullTerm, firstTerm]) {
		try {
			const res = await fetch(
				`${env.swapiBaseUrl}/api/${type}/?search=${encodeURIComponent(term)}`,
			);
			if (!res.ok) continue;
			const data: ResponseType<T[]> = await res.json();
			if (data.results?.length) return data.results[0];
		} catch {
			console.error(`Error searching for ${slug} in ${type}`);
		}
	}

	return undefined;
};
