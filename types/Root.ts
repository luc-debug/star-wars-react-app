export interface StarWarsDataModels {
    people: string
    planets: string
    films: string
    species: string
    vehicles: string
    starships: string
}


export type StarWarsEntities = keyof StarWarsDataModels;
