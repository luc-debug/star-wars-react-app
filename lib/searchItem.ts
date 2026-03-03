import { People } from "@/types/People";
import { Planet } from "@/types/Planet";
import { Starship } from "@/types/Starship";
import { ResponseType } from "@/types/ResponseType";
import { StarWarsEntities, StarWarsEntity } from "@/types/Root";

export const searchItem = async <T extends StarWarsEntity>(slug: string, type: StarWarsEntities): Promise<T | undefined> => {
    // Try full slug as search phrase first (e.g. "padme amidala"), fall back to first word
    const fullTerm = slug.replace(/-/g, " ");
    const firstTerm = slug.split("-")[0];

    for (const term of [fullTerm, firstTerm]) {
        try {
            const res = await fetch(
                `https://swapi.py4e.com/api/${type}/?search=${encodeURIComponent(term)}`,
            );
            if (!res.ok) continue;
            const data: ResponseType<T[]> = await res.json();
            if (data.results?.length) return data.results[0];
        } catch {
            continue;
        }
    }

    return undefined;
}