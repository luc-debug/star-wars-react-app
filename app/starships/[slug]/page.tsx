import { DetailView } from "@/components/detail-view";
import { Starship } from "@/types/Starship";
import {
  Car,
  Globe,
  DollarSign,
  Ruler,
  User,
  Rocket,
  Film,
  Users,
  Calendar,
} from "lucide-react";
import { generateStaticParams as generateStarshipStaticParams } from "@/lib/generateStaticParams";
import { searchItem } from "@/lib/searchItem";
import { resolveLinks } from "@/lib/resolveLinks";

export async function generateStaticParams() {
  return generateStarshipStaticParams<Starship>("starships");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; name: string }>;
}) {
  const { slug } = await params;
  const starship = await searchItem<Starship>(slug, "starships");

  if (!starship) {
    return <DetailView title="Not Found" notFound notFoundMessage={`No starship found for "${slug}"`} />;
  }

  const [filmLinks, pilotLinks] = await Promise.all([
    resolveLinks(starship.films),
    resolveLinks(starship.pilots),
  ]);

  const statItems = [
    { label: "Manufacturer", value: starship.manufacturer, icon: Globe },
    {
      label: "Cost",
      value: starship.cost_in_credits,
      unit: "cr",
      icon: DollarSign,
    },
    { label: "Crew", value: starship.crew, icon: User },
    {
      label: "Max Speed",
      value: starship.max_atmosphering_speed,
      icon: Rocket,
    },
    { label: "Consumables", value: starship.consumables, icon: Calendar },
    {
      label: "Cargo Capacity",
      value: starship.cargo_capacity,
      unit: "kg",
      icon: Globe,
    },
    { label: "Passengers", value: starship.passengers, icon: Users },
    {
      label: "Maximum Atmosphering Speed",
      value: starship.max_atmosphering_speed,
      unit: "km/h",
      icon: Ruler,
    },
  ];

  const appearanceItems = [
    { label: "Model", value: starship.model, icon: Car },
    { label: "starship Class", value: starship.starship_class, icon: Car },
    { label: "Length", value: starship.length, unit: "m", icon: Ruler },
  ];

  const connectionItems = [
    {
      label: "Films",
      count: starship.films?.length || 0,
      icon: Film,
      links: filmLinks.map((l) => ({ name: l.name, href: l.href })),
    },
    {
      label: "Pilots",
      count: starship.pilots?.length || 0,
      icon: Users,
      links: pilotLinks.map((l) => ({ name: l.name, href: l.href })),
    },
  ];

  return (
    <DetailView
      appearanceItems={appearanceItems}
      title={starship?.name || "Starship Details"}
      connectionItems={connectionItems}
      statItems={statItems}
    />
  );
}
