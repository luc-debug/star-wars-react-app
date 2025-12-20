import { LucideIcon, Globe, User, Rocket, Film, Bug, Car } from "lucide-react";
import { People } from "@/types/People";
import { Planet } from "@/types/Planet";
import { Starship } from "@/types/Starship";
import { Film as FilmType } from "@/types/Film";
import { Species } from "@/types/Species";
import { Vehicle } from "@/types/Vehicle";
import { StarWarsEntity, StarWarsEntities } from "@/types/Root";

/**
 * Configuration for displaying a field in the entity card
 */
export interface FieldConfig {
  key: string;
  label: string;
  format?: (value: unknown) => string;
}

/**
 * Configuration for a badge in the entity card
 */
export interface BadgeConfig {
  key: string;
  variant: "default" | "secondary" | "destructive" | "outline";
}

/**
 * Configuration for filter options
 */
export interface FilterConfig {
  key: string;
  label: string;
  getOptions: (entities: StarWarsEntity[]) => string[];
}

/**
 * Configuration for sort options
 */
export interface SortConfig {
  key: string;
  label: string;
  compare: (a: StarWarsEntity, b: StarWarsEntity) => number;
}

/**
 * Full configuration for an entity type
 */
export interface EntityConfig {
  entityType: StarWarsEntities;
  title: string;
  icon: LucideIcon;
  iconColor: string;
  apiEndpoint: string;
  nameKey: string;
  fields: FieldConfig[];
  badges: BadgeConfig[];
  filters: FilterConfig[];
  sortOptions: SortConfig[];
  searchKeys: string[];
}

/**
 * Helper to get display name (name or title for films)
 */
export function getEntityDisplayName(entity: StarWarsEntity): string {
  if ("title" in entity) {
    return (entity as FilmType).title;
  }
  return (entity as { name: string }).name;
}

/**
 * Helper to get value by key from entity
 */
export function getEntityValue(entity: StarWarsEntity, key: string): unknown {
  return (entity as Record<string, unknown>)[key];
}

/**
 * Entity configurations for all Star Wars entity types
 */
export const entityConfigs: Record<StarWarsEntities, EntityConfig> = {
  people: {
    entityType: "people",
    title: "Characters",
    icon: User,
    iconColor: "text-primary",
    apiEndpoint: "https://swapi.py4e.com/api/people",
    nameKey: "name",
    fields: [
      { key: "height", label: "Height", format: (v) => `${v} cm` },
      { key: "mass", label: "Mass", format: (v) => `${v} kg` },
      { key: "eye_color", label: "Eye Color" },
      { key: "hair_color", label: "Hair Color" },
    ],
    badges: [
      { key: "gender", variant: "secondary" },
      { key: "birth_year", variant: "outline" },
    ],
    filters: [
      {
        key: "gender",
        label: "Gender",
        getOptions: (entities) => [
          ...new Set(
            entities.map((e) => (e as People).gender).filter(Boolean)
          ),
        ],
      },
      {
        key: "eye_color",
        label: "Eye Color",
        getOptions: (entities) => [
          ...new Set(
            entities.map((e) => (e as People).eye_color).filter(Boolean)
          ),
        ],
      },
    ],
    sortOptions: [
      {
        key: "name",
        label: "Name (A-Z)",
        compare: (a, b) =>
          getEntityDisplayName(a).localeCompare(getEntityDisplayName(b)),
      },
      {
        key: "name_desc",
        label: "Name (Z-A)",
        compare: (a, b) =>
          getEntityDisplayName(b).localeCompare(getEntityDisplayName(a)),
      },
      {
        key: "height",
        label: "Height",
        compare: (a, b) =>
          parseInt((a as People).height) - parseInt((b as People).height),
      },
      {
        key: "mass",
        label: "Mass",
        compare: (a, b) =>
          parseInt((a as People).mass) - parseInt((b as People).mass),
      },
    ],
    searchKeys: ["name", "gender", "birth_year"],
  },

  planets: {
    entityType: "planets",
    title: "Planets",
    icon: Globe,
    iconColor: "text-accent",
    apiEndpoint: "https://swapi.py4e.com/api/planets",
    nameKey: "name",
    fields: [
      { key: "diameter", label: "Diameter" },
      { key: "gravity", label: "Gravity" },
      { key: "population", label: "Population" },
    ],
    badges: [
      { key: "climate", variant: "secondary" },
      { key: "terrain", variant: "outline" },
    ],
    filters: [
      {
        key: "climate",
        label: "Climate",
        getOptions: (entities) => [
          ...new Set(
            entities.flatMap((e) =>
              (e as Planet).climate.split(",").map((c) => c.trim())
            )
          ),
        ],
      },
      {
        key: "terrain",
        label: "Terrain",
        getOptions: (entities) => [
          ...new Set(
            entities.flatMap((e) =>
              (e as Planet).terrain.split(",").map((t) => t.trim())
            )
          ),
        ],
      },
    ],
    sortOptions: [
      {
        key: "name",
        label: "Name (A-Z)",
        compare: (a, b) =>
          getEntityDisplayName(a).localeCompare(getEntityDisplayName(b)),
      },
      {
        key: "name_desc",
        label: "Name (Z-A)",
        compare: (a, b) =>
          getEntityDisplayName(b).localeCompare(getEntityDisplayName(a)),
      },
      {
        key: "diameter",
        label: "Diameter",
        compare: (a, b) =>
          parseInt((a as Planet).diameter) - parseInt((b as Planet).diameter),
      },
      {
        key: "population",
        label: "Population",
        compare: (a, b) =>
          parseInt((a as Planet).population) -
          parseInt((b as Planet).population),
      },
    ],
    searchKeys: ["name", "climate", "terrain"],
  },

  starships: {
    entityType: "starships",
    title: "Starships",
    icon: Rocket,
    iconColor: "text-primary",
    apiEndpoint: "https://swapi.py4e.com/api/starships",
    nameKey: "name",
    fields: [
      { key: "model", label: "Model" },
      { key: "crew", label: "Crew" },
      { key: "passengers", label: "Passengers" },
    ],
    badges: [{ key: "starship_class", variant: "secondary" }],
    filters: [
      {
        key: "starship_class",
        label: "Class",
        getOptions: (entities) => [
          ...new Set(
            entities.map((e) => (e as Starship).starship_class).filter(Boolean)
          ),
        ],
      },
      {
        key: "manufacturer",
        label: "Manufacturer",
        getOptions: (entities) => [
          ...new Set(
            entities.flatMap((e) =>
              (e as Starship).manufacturer.split(",").map((m) => m.trim())
            )
          ),
        ],
      },
    ],
    sortOptions: [
      {
        key: "name",
        label: "Name (A-Z)",
        compare: (a, b) =>
          getEntityDisplayName(a).localeCompare(getEntityDisplayName(b)),
      },
      {
        key: "name_desc",
        label: "Name (Z-A)",
        compare: (a, b) =>
          getEntityDisplayName(b).localeCompare(getEntityDisplayName(a)),
      },
      {
        key: "crew",
        label: "Crew Size",
        compare: (a, b) =>
          parseInt((a as Starship).crew) - parseInt((b as Starship).crew),
      },
      {
        key: "length",
        label: "Length",
        compare: (a, b) =>
          parseFloat((a as Starship).length) -
          parseFloat((b as Starship).length),
      },
    ],
    searchKeys: ["name", "model", "manufacturer", "starship_class"],
  },

  films: {
    entityType: "films",
    title: "Films",
    icon: Film,
    iconColor: "text-yellow-500",
    apiEndpoint: "https://swapi.py4e.com/api/films",
    nameKey: "title",
    fields: [
      { key: "director", label: "Director" },
      { key: "producer", label: "Producer" },
      { key: "release_date", label: "Release Date" },
    ],
    badges: [{ key: "episode_id", variant: "secondary" }],
    filters: [
      {
        key: "director",
        label: "Director",
        getOptions: (entities) => [
          ...new Set(
            entities.map((e) => (e as FilmType).director).filter(Boolean)
          ),
        ],
      },
    ],
    sortOptions: [
      {
        key: "title",
        label: "Title (A-Z)",
        compare: (a, b) =>
          getEntityDisplayName(a).localeCompare(getEntityDisplayName(b)),
      },
      {
        key: "title_desc",
        label: "Title (Z-A)",
        compare: (a, b) =>
          getEntityDisplayName(b).localeCompare(getEntityDisplayName(a)),
      },
      {
        key: "episode_id",
        label: "Episode",
        compare: (a, b) =>
          (a as FilmType).episode_id - (b as FilmType).episode_id,
      },
      {
        key: "release_date",
        label: "Release Date",
        compare: (a, b) =>
          new Date((a as FilmType).release_date).getTime() -
          new Date((b as FilmType).release_date).getTime(),
      },
    ],
    searchKeys: ["title", "director", "producer"],
  },

  species: {
    entityType: "species",
    title: "Species",
    icon: Bug,
    iconColor: "text-green-500",
    apiEndpoint: "https://swapi.py4e.com/api/species",
    nameKey: "name",
    fields: [
      { key: "classification", label: "Classification" },
      { key: "designation", label: "Designation" },
      { key: "language", label: "Language" },
      { key: "average_lifespan", label: "Avg. Lifespan" },
    ],
    badges: [
      { key: "classification", variant: "secondary" },
      { key: "designation", variant: "outline" },
    ],
    filters: [
      {
        key: "classification",
        label: "Classification",
        getOptions: (entities) => [
          ...new Set(
            entities.map((e) => (e as Species).classification).filter(Boolean)
          ),
        ],
      },
      {
        key: "designation",
        label: "Designation",
        getOptions: (entities) => [
          ...new Set(
            entities.map((e) => (e as Species).designation).filter(Boolean)
          ),
        ],
      },
    ],
    sortOptions: [
      {
        key: "name",
        label: "Name (A-Z)",
        compare: (a, b) =>
          getEntityDisplayName(a).localeCompare(getEntityDisplayName(b)),
      },
      {
        key: "name_desc",
        label: "Name (Z-A)",
        compare: (a, b) =>
          getEntityDisplayName(b).localeCompare(getEntityDisplayName(a)),
      },
      {
        key: "average_lifespan",
        label: "Lifespan",
        compare: (a, b) =>
          parseInt((a as Species).average_lifespan) -
          parseInt((b as Species).average_lifespan),
      },
    ],
    searchKeys: ["name", "classification", "designation", "language"],
  },

  vehicles: {
    entityType: "vehicles",
    title: "Vehicles",
    icon: Car,
    iconColor: "text-orange-500",
    apiEndpoint: "https://swapi.py4e.com/api/vehicles",
    nameKey: "name",
    fields: [
      { key: "model", label: "Model" },
      { key: "crew", label: "Crew" },
      { key: "passengers", label: "Passengers" },
    ],
    badges: [{ key: "vehicle_class", variant: "secondary" }],
    filters: [
      {
        key: "vehicle_class",
        label: "Class",
        getOptions: (entities) => [
          ...new Set(
            entities.map((e) => (e as Vehicle).vehicle_class).filter(Boolean)
          ),
        ],
      },
      {
        key: "manufacturer",
        label: "Manufacturer",
        getOptions: (entities) => [
          ...new Set(
            entities.flatMap((e) =>
              (e as Vehicle).manufacturer.split(",").map((m) => m.trim())
            )
          ),
        ],
      },
    ],
    sortOptions: [
      {
        key: "name",
        label: "Name (A-Z)",
        compare: (a, b) =>
          getEntityDisplayName(a).localeCompare(getEntityDisplayName(b)),
      },
      {
        key: "name_desc",
        label: "Name (Z-A)",
        compare: (a, b) =>
          getEntityDisplayName(b).localeCompare(getEntityDisplayName(a)),
      },
      {
        key: "crew",
        label: "Crew Size",
        compare: (a, b) =>
          parseInt((a as Vehicle).crew) - parseInt((b as Vehicle).crew),
      },
      {
        key: "length",
        label: "Length",
        compare: (a, b) =>
          parseFloat((a as Vehicle).length) -
          parseFloat((b as Vehicle).length),
      },
    ],
    searchKeys: ["name", "model", "manufacturer", "vehicle_class"],
  },
};
