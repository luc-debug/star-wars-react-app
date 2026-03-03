import { DetailView } from "@/components/detail-view";
import { Planet } from "@/types/Planet";
import { generateStaticParams as generatePeopleStaticParams } from "@/lib/generateStaticParams";
import { searchItem } from "@/lib/searchItem";
import { resolveLinks } from "@/lib/resolveLinks";
import { Ruler, Scale, Calendar, Palette, Eye, Film, User, Globe } from "lucide-react";

export async function generateStaticParams() {
  return generatePeopleStaticParams<Planet>("planets");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const planet = await searchItem<Planet>(slug, "planets");

  if (!planet) {
    return <DetailView title="Not Found" notFound notFoundMessage={`No planet found for "${slug}"`} />;
  }

  const [filmLinks, residentLinks] = await Promise.all([
    resolveLinks(planet.films),
    resolveLinks(planet.residents),
  ]);

  const statItems = [
    { label: "Diameter", value: planet.diameter, unit: "km", icon: Ruler },
    { label: "Rotation Period", value: planet.rotation_period, unit: "hours", icon: Scale },
    { label: "Orbital Period", value: planet.orbital_period, unit: "days", icon: Calendar },
    { label: "Gravity", value: planet.gravity, icon: Scale },
  ];

  const appearanceItems = [
    { label: "Climate", value: planet.climate, icon: Palette },
    { label: "Terrain", value: planet.terrain, icon: Globe },
    { label: "Surface Water", value: planet.surface_water, unit: "%", icon: Eye },
  ];

  const connectionItems = [
    {
      label: "Films",
      count: planet.films?.length || 0,
      icon: Film,
      links: filmLinks.map((l) => ({ name: l.name, href: l.href })),
    },
    {
      label: "Residents",
      count: planet.residents?.length || 0,
      icon: User,
      links: residentLinks.map((l) => ({ name: l.name, href: l.href })),
    },
  ];

  return (
    <DetailView
      appearanceItems={appearanceItems}
      title={planet?.name || "Planet Details"}
      connectionItems={connectionItems}
      statItems={statItems}
    />
  );
}
