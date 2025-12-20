import { DetailView } from "@/components/detail-view";
import { Film } from "@/types/Film";
import { generateStaticParams as generatePeopleStaticParams } from "@/lib/generateStaticParams";
import { searchItem } from "@/lib/searchItem";
import { Film as FilmIcon, Calendar, User, Globe, Rocket, Car, Users, Hash } from "lucide-react";

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
    { label: "Characters", count: film.characters?.length || 0, icon: User },
    { label: "Planets", count: film.planets?.length || 0, icon: Globe },
    { label: "Starships", count: film.starships?.length || 0, icon: Rocket },
    { label: "Vehicles", count: film.vehicles?.length || 0, icon: Car },
    { label: "Species", count: film.species?.length || 0, icon: Users },
  ];

  const additionalSections = [
    { title: "URL", icon: Globe, content: film.url },
    { title: "Created", icon: Calendar, content: film.created },
    { title: "Edited", icon: Calendar, content: film.edited },
  ];

  return (
    <DetailView
      appearanceItems={appearanceItems}
      title={film?.title || "Film Details"}
      connectionItems={connectionItems}
      additionalSections={additionalSections}
      statItems={statItems}
    />
  );
}
