import { DetailView } from "@/components/detail-view";
import type { People } from "@/types/People";
import { generateStaticParams as generatePeopleStaticParams } from "@/lib/generateStaticParams";
import { searchItem } from "@/lib/searchItem";
import { resolveLinks, resolveLink } from "@/lib/resolveLinks";
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
  Dna,
} from "lucide-react";

export async function generateStaticParams() {
  return generatePeopleStaticParams<People>("people");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = await searchItem<People>(slug, "people");

  if (!person) {
    return <DetailView title="Not Found" notFound notFoundMessage={`No person found for "${slug}"`} />;
  }

  const [filmLinks, vehicleLinks, starshipLinks, speciesLinks, homeworldLink] =
    await Promise.all([
      resolveLinks(person.films),
      resolveLinks(person.vehicles),
      resolveLinks(person.starships),
      resolveLinks(person.species),
      resolveLink(person.homeworld),
    ]);

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
      links: filmLinks.map((l) => ({ name: l.name, href: l.href })),
    },
    {
      label: "Vehicles",
      count: person.vehicles?.length || 0,
      icon: Car,
      links: vehicleLinks.map((l) => ({ name: l.name, href: l.href })),
    },
    {
      label: "Starships",
      count: person.starships?.length || 0,
      icon: Rocket,
      links: starshipLinks.map((l) => ({ name: l.name, href: l.href })),
    },
    {
      label: "Species",
      count: person.species?.length || 0,
      icon: Dna,
      links: speciesLinks.map((l) => ({ name: l.name, href: l.href })),
    },
  ];

  const additionalSections = [
    {
      title: "Homeworld",
      icon: Globe,
      content: homeworldLink ? (
        <a href={homeworldLink.href} className="text-primary hover:underline">
          {homeworldLink.name}
        </a>
      ) : (
        String(person.homeworld)
      ),
    },
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
