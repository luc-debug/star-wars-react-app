import { DetailView } from "@/components/detail-view";
import { People } from "@/features/peoples/types/People";
import { generateStaticParams as generatePeopleStaticParams } from "@/lib/generateStaticParams";
import { searchItem } from "@/lib/searchItem";
import {
  Ruler,
  Scale,
  Calendar,
  User,
  Scissors,
  Palette,
  Eye,
  Film,
  Rocket,
  Car,
  Globe,
} from "lucide-react";

export async function generateStaticParams() {
  return generatePeopleStaticParams<People>("people");
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = await searchItem<People>(slug, "people");

  const statItems = [
    { label: "Height", value: person.height, unit: "cm", icon: Ruler },
    { label: "Mass", value: person.mass, unit: "kg", icon: Scale },
    { label: "Birth Year", value: person.birth_year, icon: Calendar },
    { label: "Gender", value: person.gender, icon: User },
  ];

  const appearanceItems = [
    { label: "Hair Color", value: person.hair_color, icon: Scissors },
    { label: "Skin Color", value: person.skin_color, icon: Palette },
    { label: "Eye Color", value: person.eye_color, icon: Eye },
  ];

  const connectionItems = [
    {
      label: "Films",
      count: person.films?.length || 0,
      icon: Film,
    },
    {
      label: "Vehicles",
      count: person.vehicles?.length || 0,
      icon: Car,
    },
    {
      label: "Starships",
      count: person.starships?.length || 0,
      icon: Rocket,
    },
  ];

  const additionalSections = [
    { title: "Homeworld", icon: Globe, content: person.homeworld },
  ];

  return (
    <DetailView
      appearanceItems={appearanceItems}
      title={person?.name || "person Details"}
      connectionItems={connectionItems}
      additionalSections={additionalSections}
      statItems={statItems}
    />
  );
}
