import { LucideIcon, Globe, User, Rocket, Film, Bug, Car } from "lucide-react";
import { People } from "@/types/People";
import { Planet } from "@/types/Planet";
import { Starship } from "@/types/Starship";
import { Film as FilmType } from "@/types/Film";
import { Species } from "@/types/Species";
import { Vehicle } from "@/types/Vehicle";
import { StarWarsEntity, StarWarsEntities } from "@/types/Root";
import { API_ENDPOINTS } from "@/lib/constants";
import { createCommonSortOptions, createFilter, createField, commonFields, commonSorts, commonFilters } from "@/lib/config-helpers";

/**
 * Configuration for displaying a field in the entity card
 */
export interface FieldConfig {
  key: string;
  label: string;
  /** optional suffix to append when displaying the value (e.g. 'cm', 'kg') */
  formatSuffix?: string;
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
  /**
   * The entity field to read values from for this filter.
   * If `split` is true the field will be split by `delimiter`.
   */
  optionKey: string;
  split?: boolean;
  delimiter?: string;
}

/**
 * Configuration for sort options
 */
export interface SortConfig {
  key: string;
  label: string;
  /** the entity field this sort option targets */
  sortKey?: string;
  /** data type for comparison */
  type?: "string" | "number" | "date";
  /** default direction */
  direction?: "asc" | "desc";
}

/**
 * Full configuration for an entity type
 */
export interface EntityConfig {
  entityType: StarWarsEntities;
  title: string;
  icon: string;
  iconColor: string;
  apiEndpoint: string;
  nameKey: keyof StarWarsEntity | "title";
  fields: FieldConfig[];
  badges: BadgeConfig[];
  filters: FilterConfig[];
  sortOptions: SortConfig[];
  searchKeys: string[];
}

/**
 * Helper to get display name (name or title for films)
 */
/**
 * Entity configurations for all Star Wars entity types
 */
export const entityConfigs: Record<StarWarsEntities, EntityConfig> = {
  people: {
    entityType: "people",
    title: "Characters",
    icon: "User",
    iconColor: "text-primary",
    apiEndpoint: API_ENDPOINTS.people,
    nameKey: "name",
    fields: [
      createField("height", "Height", "cm"),
      createField("mass", "Mass", "kg"),
      createField("eye_color", "Eye Color"),
      createField("hair_color", "Hair Color"),
    ],
    badges: [
      { key: "gender", variant: "secondary" },
      { key: "birth_year", variant: "outline" },
    ],
    filters: [
      createFilter("gender", "Gender"),
      createFilter("eye_color", "Eye Color", { split: true, delimiter: "," }),
    ],
    sortOptions: [
      ...createCommonSortOptions("name"),
      { key: "height", label: "Height", sortKey: "height", type: "number" },
      { key: "mass", label: "Mass", sortKey: "mass", type: "number" },
    ],
    searchKeys: ["name", "gender", "birth_year"],
  },

  planets: {
    entityType: "planets",
    title: "Planets",
    icon: "Globe",
    iconColor: "text-accent",
    apiEndpoint: API_ENDPOINTS.planets,
    nameKey: "name",
    fields: [
      createField("diameter", "Diameter"),
      createField("gravity", "Gravity"),
      createField("population", "Population"),
    ],
    badges: [
      { key: "climate", variant: "secondary" },
      { key: "terrain", variant: "outline" },
    ],
    filters: [
      createFilter("climate", "Climate", { split: true, delimiter: "," }),
      createFilter("terrain", "Terrain", { split: true, delimiter: "," }),
    ],
    sortOptions: [
      ...createCommonSortOptions("name"),
      { key: "diameter", label: "Diameter", sortKey: "diameter", type: "number" },
      { key: "population", label: "Population", sortKey: "population", type: "number" },
    ],
    searchKeys: ["name", "climate", "terrain"],
  },

  starships: {
    entityType: "starships",
    title: "Starships",
    icon: "Rocket",
    iconColor: "text-primary",
    apiEndpoint: API_ENDPOINTS.starships,
    nameKey: "name",
    fields: [
      commonFields.model,
      commonFields.crew,
      commonFields.passengers,
    ],
    badges: [{ key: "starship_class", variant: "secondary" }],
    filters: [
      createFilter("starship_class", "Class"),
      commonFilters.manufacturer,
    ],
    sortOptions: [
      ...createCommonSortOptions("name"),
      commonSorts.crew,
      commonSorts.length,
    ],
    searchKeys: ["name", "model", "manufacturer", "starship_class"],
  },

  films: {
    entityType: "films",
    title: "Films",
    icon: "Film",
    iconColor: "text-yellow-500",
    apiEndpoint: API_ENDPOINTS.films,
    nameKey: "title",
    fields: [
      createField("director", "Director"),
      createField("producer", "Producer"),
      createField("release_date", "Release Date"),
    ],
    badges: [{ key: "episode_id", variant: "secondary" }],
    filters: [
      createFilter("director", "Director"),
    ],
    sortOptions: [
      ...createCommonSortOptions("title"),
      { key: "episode_id", label: "Episode", sortKey: "episode_id", type: "number" },
      { key: "release_date", label: "Release Date", sortKey: "release_date", type: "date" },
    ],
    searchKeys: ["title", "director", "producer"],
  },

  species: {
    entityType: "species",
    title: "Species",
    icon: "Bug",
    iconColor: "text-green-500",
    apiEndpoint: API_ENDPOINTS.species,
    nameKey: "name",
    fields: [
      createField("classification", "Classification"),
      createField("designation", "Designation"),
      createField("language", "Language"),
      createField("average_lifespan", "Avg. Lifespan"),
    ],
    badges: [
      { key: "classification", variant: "secondary" },
      { key: "designation", variant: "outline" },
    ],
    filters: [
      createFilter("classification", "Classification"),
      createFilter("designation", "Designation"),
    ],
    sortOptions: [
      ...createCommonSortOptions("name"),
      { key: "average_lifespan", label: "Lifespan", sortKey: "average_lifespan", type: "number" },
    ],
    searchKeys: ["name", "classification", "designation", "language"],
  },

  vehicles: {
    entityType: "vehicles",
    title: "Vehicles",
    icon: "Car",
    iconColor: "text-orange-500",
    apiEndpoint: API_ENDPOINTS.vehicles,
    nameKey: "name",
    fields: [
      commonFields.model,
      commonFields.crew,
      commonFields.passengers,
    ],
    badges: [{ key: "vehicle_class", variant: "secondary" }],
    filters: [
      createFilter("vehicle_class", "Class"),
      commonFilters.manufacturer,
    ],
    sortOptions: [
      ...createCommonSortOptions("name"),
      commonSorts.crew,
      commonSorts.length,
    ],
    searchKeys: ["name", "model", "manufacturer", "vehicle_class"],
  },
};
