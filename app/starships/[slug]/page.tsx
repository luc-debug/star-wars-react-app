import { DetailView } from "@/components/detail-view";
import { Starship } from "@/features/starships/types/starship";
import { User, Ruler, Scale } from "lucide-react";
import { generateStaticParams as generateStarshipStaticParams } from "@/lib/generateStaticParams";
import { searchItem } from "@/lib/searchItem";

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

  const appearanceItems = [
    { label: "Model", value: starship?.model || "N/A", icon: User },
    {
      label: "Manufacturer",
      value: starship?.manufacturer || "N/A",
      icon: Ruler,
    },
    {
      label: "Starship Class",
      value: starship?.starship_class || "N/A",
      icon: Scale,
    },
  ];

  const connectionItems = [
    {
      label: "Films",
      count: starship?.films?.length || 0,
      icon: User,
    },
    {
      count: starship?.pilots?.length || 0,
      label: "Pilots",
      icon: Ruler,
    },
    {
      count: starship?.crew?.length || 0,
      label: "Crew",
      icon: Ruler,
    },
  ];

  const additionalSections = [
    { title: "Specifications", icon: User, content: starship.consumables },
  ];

  const statItems = [
    {
      label: "Length",
      value: starship?.length || "N/A",
      unit: "m",
      icon: Ruler,
    },
    {
      label: "Max Atmosphering Speed",
      value: starship?.max_atmosphering_speed || "N/A",
      unit: "km/h",
      icon: Scale,
    },
    {
      label: "Hyperdrive Rating",
      value: starship?.hyperdrive_rating || "N/A",
      icon: User,
    },
    {
      label: "MGLT",
      value: starship?.MGLT || "N/A",
      unit: "Megalights",
      icon: Ruler,
    },
  ];

  return (
    <DetailView
      appearanceItems={appearanceItems}
      title={starship?.name || "Starship Details"}
      connectionItems={connectionItems}
      additionalSections={additionalSections}
      statItems={statItems}
    />
  );
}
