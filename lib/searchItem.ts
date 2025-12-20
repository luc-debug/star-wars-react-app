import { People } from "@/types/People";
import { Planet } from "@/types/Planet";
import { Starship } from "@/types/Starship";
import { ResponseType } from "@/types/ResponseType";
import { StarWarsEntities } from "@/types/Root";

export const searchItem = async <T extends People | Starship | Planet>(slug: string, type: StarWarsEntities) => {
    const searchTerm = (slug && slug.split("-")[0]) || slug;

    const res = await fetch(
        `https://swapi.py4e.com/api/${type}/?search=${searchTerm}`
    );
    const data: ResponseType<T[]> = await res.json();
    return data.results?.[0];

}