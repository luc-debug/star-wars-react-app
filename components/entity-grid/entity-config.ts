import { env } from "@/lib/env";
import type { StarWarsEntities, StarWarsEntity } from "@/types/Root";

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
		apiEndpoint: `${env.swapiBaseUrl}/api/people`,
		nameKey: "name",
		fields: [
			{ key: "height", label: "Height", formatSuffix: "cm" },
			{ key: "mass", label: "Mass", formatSuffix: "kg" },
			{ key: "eye_color", label: "Eye Color" },
			{ key: "hair_color", label: "Hair Color" },
		],
		badges: [
			{ key: "gender", variant: "secondary" },
			{ key: "birth_year", variant: "outline" },
		],
		filters: [
			{ key: "gender", label: "Gender", optionKey: "gender" },
			{
				key: "eye_color",
				label: "Eye Color",
				optionKey: "eye_color",
				split: true,
				delimiter: ",",
			},
		],
		sortOptions: [
			{
				key: "name",
				label: "Name (A-Z)",
				sortKey: "name",
				type: "string",
				direction: "asc",
			},
			{
				key: "name_desc",
				label: "Name (Z-A)",
				sortKey: "name",
				type: "string",
				direction: "desc",
			},
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
		apiEndpoint: `${env.swapiBaseUrl}/api/planets`,
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
				optionKey: "climate",
				split: true,
				delimiter: ",",
			},
			{
				key: "terrain",
				label: "Terrain",
				optionKey: "terrain",
				split: true,
				delimiter: ",",
			},
		],
		sortOptions: [
			{
				key: "name",
				label: "Name (A-Z)",
				sortKey: "name",
				type: "string",
				direction: "asc",
			},
			{
				key: "name_desc",
				label: "Name (Z-A)",
				sortKey: "name",
				type: "string",
				direction: "desc",
			},
			{
				key: "diameter",
				label: "Diameter",
				sortKey: "diameter",
				type: "number",
			},
			{
				key: "population",
				label: "Population",
				sortKey: "population",
				type: "number",
			},
		],
		searchKeys: ["name", "climate", "terrain"],
	},

	starships: {
		entityType: "starships",
		title: "Starships",
		icon: "Rocket",
		iconColor: "text-primary",
		apiEndpoint: `${env.swapiBaseUrl}/api/starships`,
		nameKey: "name",
		fields: [
			{ key: "model", label: "Model" },
			{ key: "crew", label: "Crew" },
			{ key: "passengers", label: "Passengers" },
		],
		badges: [{ key: "starship_class", variant: "secondary" }],
		filters: [
			{ key: "starship_class", label: "Class", optionKey: "starship_class" },
			{
				key: "manufacturer",
				label: "Manufacturer",
				optionKey: "manufacturer",
				split: true,
				delimiter: ",",
			},
		],
		sortOptions: [
			{
				key: "name",
				label: "Name (A-Z)",
				sortKey: "name",
				type: "string",
				direction: "asc",
			},
			{
				key: "name_desc",
				label: "Name (Z-A)",
				sortKey: "name",
				type: "string",
				direction: "desc",
			},
			{ key: "crew", label: "Crew Size", sortKey: "crew", type: "number" },
			{ key: "length", label: "Length", sortKey: "length", type: "number" },
		],
		searchKeys: ["name", "model", "manufacturer", "starship_class"],
	},

	films: {
		entityType: "films",
		title: "Films",
		icon: "Film",
		iconColor: "text-yellow-500",
		apiEndpoint: `${env.swapiBaseUrl}/api/films`,
		nameKey: "title",
		fields: [
			{ key: "director", label: "Director" },
			{ key: "producer", label: "Producer" },
			{ key: "release_date", label: "Release Date" },
		],
		badges: [{ key: "episode_id", variant: "secondary" }],
		filters: [{ key: "director", label: "Director", optionKey: "director" }],
		sortOptions: [
			{
				key: "title",
				label: "Title (A-Z)",
				sortKey: "title",
				type: "string",
				direction: "asc",
			},
			{
				key: "title_desc",
				label: "Title (Z-A)",
				sortKey: "title",
				type: "string",
				direction: "desc",
			},
			{
				key: "episode_id",
				label: "Episode",
				sortKey: "episode_id",
				type: "number",
			},
			{
				key: "release_date",
				label: "Release Date",
				sortKey: "release_date",
				type: "date",
			},
		],
		searchKeys: ["title", "director", "producer"],
	},

	species: {
		entityType: "species",
		title: "Species",
		icon: "Bug",
		iconColor: "text-green-500",
		apiEndpoint: `${env.swapiBaseUrl}/api/species`,
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
				optionKey: "classification",
			},
			{ key: "designation", label: "Designation", optionKey: "designation" },
		],
		sortOptions: [
			{
				key: "name",
				label: "Name (A-Z)",
				sortKey: "name",
				type: "string",
				direction: "asc",
			},
			{
				key: "name_desc",
				label: "Name (Z-A)",
				sortKey: "name",
				type: "string",
				direction: "desc",
			},
			{
				key: "average_lifespan",
				label: "Lifespan",
				sortKey: "average_lifespan",
				type: "number",
			},
		],
		searchKeys: ["name", "classification", "designation", "language"],
	},

	vehicles: {
		entityType: "vehicles",
		title: "Vehicles",
		icon: "Car",
		iconColor: "text-orange-500",
		apiEndpoint: `${env.swapiBaseUrl}/api/vehicles`,
		nameKey: "name",
		fields: [
			{ key: "model", label: "Model" },
			{ key: "crew", label: "Crew" },
			{ key: "passengers", label: "Passengers" },
		],
		badges: [{ key: "vehicle_class", variant: "secondary" }],
		filters: [
			{ key: "vehicle_class", label: "Class", optionKey: "vehicle_class" },
			{
				key: "manufacturer",
				label: "Manufacturer",
				optionKey: "manufacturer",
				split: true,
				delimiter: ",",
			},
		],
		sortOptions: [
			{
				key: "name",
				label: "Name (A-Z)",
				sortKey: "name",
				type: "string",
				direction: "asc",
			},
			{
				key: "name_desc",
				label: "Name (Z-A)",
				sortKey: "name",
				type: "string",
				direction: "desc",
			},
			{ key: "crew", label: "Crew Size", sortKey: "crew", type: "number" },
			{ key: "length", label: "Length", sortKey: "length", type: "number" },
		],
		searchKeys: ["name", "model", "manufacturer", "vehicle_class"],
	},
};
