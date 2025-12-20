import { DetailView } from "@/components/detail-view";
import { Species } from "@/types/Species";
import { generateStaticParams as generatePeopleStaticParams } from "@/lib/generateStaticParams";
import { searchItem } from "@/lib/searchItem";
import { Ruler, Hourglass, Tag, Palette, Eye, Film, Users, Globe, Calendar, User } from "lucide-react";

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

  const statItems = [
    { label: "Average Height", value: species.average_height, unit: "cm", icon: Ruler },
    { label: "Average Lifespan", value: species.average_lifespan, unit: "years", icon: Hourglass },
    { label: "Classification", value: species.classification, icon: Tag },
    { label: "Designation", value: species.designation, icon: Tag },
  ];

  const appearanceItems = [
    { label: "Eye Colors", value: species.eye_colors, icon: Eye },
    { label: "Skin Colors", value: species.skin_colors, icon: Palette },
    { label: "Hair Colors", value: species.hair_colors, icon: Palette },
    { label: "Language", value: species.language, icon: User },
  ];

  const connectionItems = [
    { label: "People", count: species.people?.length || 0, icon: Users },
    { label: "Films", count: species.films?.length || 0, icon: Film },
  ];

  const additionalSections = [
    { title: "Homeworld", icon: Globe, content: species.homeworld },
    { title: "URL", icon: Globe, content: species.url },
    { title: "Created", icon: Calendar, content: species.created },
    { title: "Edited", icon: Calendar, content: species.edited },
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
