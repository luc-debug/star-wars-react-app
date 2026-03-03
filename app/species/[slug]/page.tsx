import { DetailView } from "@/components/detail-view";
import type { Species } from "@/types/Species";
import { generateStaticParams as generatePeopleStaticParams } from "@/lib/generateStaticParams";
import { searchItem } from "@/lib/searchItem";
import { resolveLinks, resolveLink } from "@/lib/resolveLinks";
import { Ruler, Heart, Tag, Palette, Eye, Film, Users, MapPin, UserCircle, MessageSquare } from "lucide-react";

export async function generateStaticParams() {
  return generatePeopleStaticParams<Species>("species");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const species = await searchItem<Species>(slug, "species");

  if (!species) {
    return <DetailView title="Not Found" notFound notFoundMessage={`No species found for "${slug}"`} />;
  }

  const [peopleLinks, filmLinks, homeworldLink] = await Promise.all([
    resolveLinks(species.people),
    resolveLinks(species.films),
    resolveLink(species.homeworld),
  ]);

  const statItems = [
    { label: "Average Height", value: species.average_height, unit: "cm", icon: Ruler },
    { label: "Average Lifespan", value: species.average_lifespan, unit: "years", icon: Heart },
    { label: "Classification", value: species.classification, icon: Tag },
    { label: "Designation", value: species.designation, icon: UserCircle },
  ];

  const appearanceItems = [
    { label: "Eye Colors", value: species.eye_colors, icon: Eye },
    { label: "Skin Colors", value: species.skin_colors, icon: Palette },
    { label: "Hair Colors", value: species.hair_colors, icon: Palette },
    { label: "Language", value: species.language, icon: MessageSquare },
  ];

  const connectionItems = [
    {
      label: "People",
      count: species.people?.length || 0,
      icon: Users,
      links: peopleLinks.map((l) => ({ name: l.name, href: l.href })),
    },
    {
      label: "Films",
      count: species.films?.length || 0,
      icon: Film,
      links: filmLinks.map((l) => ({ name: l.name, href: l.href })),
    },
  ];

  const additionalSections = [
    {
      title: "Homeworld",
      icon: MapPin,
      content: homeworldLink ? (
        <a href={homeworldLink.href} className="text-primary hover:underline">
          {homeworldLink.name}
        </a>
      ) : (
        "Unknown"
      ),
    },
  ];

  return (
    <DetailView
      appearanceItems={appearanceItems}
      title={species?.name || "Species Details"}
      connectionItems={connectionItems}
      additionalSections={additionalSections}
      statItems={statItems}
    />
  );
}