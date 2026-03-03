import type { Film } from "./Film"
import type { People } from "./People"
import type { Planet } from "./Planet"
import type { Species } from "./Species"
import type { Starship } from "./Starship"
import type { Vehicle } from "./Vehicle"

export interface StarWarsDataModels {
    people: string
    planets: string
    films: string
    species: string
    vehicles: string
    starships: string
}


export type StarWarsEntities = keyof StarWarsDataModels;

export type StarWarsEntity = People | Planet | Starship | Film | Species | Vehicle;
