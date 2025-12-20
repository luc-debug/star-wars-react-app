import { People } from "@/features/peoples/types/People";
import { ResponseType } from "@/types/ResponseType";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Ruler,
  Scale,
  Palette,
  Eye,
  Scissors,
  Calendar,
  Globe,
  Film,
  Rocket,
  Car,
} from "lucide-react";
import { PeopleDetail } from "@/features/peoples/components/people-detail";

export async function generateStaticParams() {
  const promises = Array.from({ length: 9 }).map(async (_, index) => {
    const res = await fetch(
      `https://swapi.py4e.com/api/people/?page=${index + 1}`
    );
    return (await res.json()) as ResponseType<People[]>;
  });

  const results = await Promise.all(promises);

  // Hilfsfunktion: name -> slug (normalize, lowercase, non-alnum -> dash, trim dashes)
  const makeSlug = (input?: string) => {
    if (!input || typeof input !== "string") return "";
    return input
      .toLowerCase()
      .normalize("NFKD") // entferne diakritische Zeichen
      .replace(/[\u0300-\u036f]/g, "") // komb. diakritika löschen
      .replace(/[^a-z0-9]+/g, "-") // alles Nicht-alnum -> '-'
      .replace(/^-+|-+$/g, ""); // führende/folgende '-' entfernen
  };

  // Alle Personen sammeln, slug aus name bilden, filtern, deduplizieren
  const entries = results
    .flatMap((data) => data.results || [])
    .map((person: People) => {
      const name = person?.name ?? "";
      const slug = makeSlug(name);
      return { slug };
    })
    .filter((p) => p.slug && p.slug !== "0");

  // Duplikate nach slug entfernen (letzten Eintrag behalten)
  const unique = Array.from(new Map(entries.map((e) => [e.slug, e])).values());

  return unique.map((e) => ({ slug: e.slug }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; name: string }>;
}) {
  const { slug } = await params;
  return <PeopleDetail slug={slug} />;
}
