import {
	Calendar,
	Car,
	Dna,
	Film as FilmIcon,
	Globe,
	Hash,
	Rocket,
	User,
	Users,
} from "lucide-react";
import { DetailView } from "@/components/detail-view";
import { generateStaticParams as generatePeopleStaticParams } from "@/lib/generateStaticParams";
import { resolveLinks } from "@/lib/resolveLinks";
import { searchItem } from "@/lib/searchItem";
import type { Film } from "@/types/Film";

export async function generateStaticParams() {
	return generatePeopleStaticParams<Film>("films");
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const film = await searchItem<Film>(slug, "films");

	if (!film) {
		return (
			<DetailView
				title="Not Found"
				notFound
				notFoundMessage={`No film found for "${slug}"`}
			/>
		);
	}

	const [
		characterLinks,
		planetLinks,
		starshipLinks,
		vehicleLinks,
		speciesLinks,
	] = await Promise.all([
		resolveLinks(film.characters),
		resolveLinks(film.planets),
		resolveLinks(film.starships),
		resolveLinks(film.vehicles),
		resolveLinks(film.species),
	]);

	const statItems = [
		{ label: "Episode", value: String(film.episode_id), icon: Hash },
		{ label: "Release Date", value: film.release_date, icon: Calendar },
		{ label: "Director", value: film.director, icon: User },
		{ label: "Producer", value: film.producer, icon: Users },
	];

	const appearanceItems = [
		{ label: "Opening Crawl", value: film.opening_crawl, icon: FilmIcon },
	];

	const connectionItems = [
		{
			label: "Characters",
			count: film.characters?.length || 0,
			icon: User,
			links: characterLinks.map((l) => ({ name: l.name, href: l.href })),
		},
		{
			label: "Planets",
			count: film.planets?.length || 0,
			icon: Globe,
			links: planetLinks.map((l) => ({ name: l.name, href: l.href })),
		},
		{
			label: "Starships",
			count: film.starships?.length || 0,
			icon: Rocket,
			links: starshipLinks.map((l) => ({ name: l.name, href: l.href })),
		},
		{
			label: "Vehicles",
			count: film.vehicles?.length || 0,
			icon: Car,
			links: vehicleLinks.map((l) => ({ name: l.name, href: l.href })),
		},
		{
			label: "Species",
			count: film.species?.length || 0,
			icon: Dna,
			links: speciesLinks.map((l) => ({ name: l.name, href: l.href })),
		},
	];

	return (
		<DetailView
			appearanceItems={appearanceItems}
			title={film?.title || "Film Details"}
			connectionItems={connectionItems}
			statItems={statItems}
		/>
	);
}
