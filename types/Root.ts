import { Film } from "./Film"
import { People } from "./People"
import { Planet } from "./Planet"
import { Species } from "./Species"
import { Starship } from "./Starship"
import { Vehicle } from "./Vehicle"

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
