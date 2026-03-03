import { DetailView } from "@/components/detail-view";
import { Vehicle } from "@/types/Vehicle";
import { generateStaticParams as generatePeopleStaticParams } from "@/lib/generateStaticParams";
import { searchItem } from "@/lib/searchItem";
import { resolveLinks } from "@/lib/resolveLinks";
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

export async function generateStaticParams() {
  return generatePeopleStaticParams<Vehicle>("vehicles");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await searchItem<Vehicle>(slug, "vehicles");

  if (!vehicle) {
    return <DetailView title="Not Found" notFound notFoundMessage={`No vehicle found for "${slug}"`} />;
  }

  const [filmLinks, pilotLinks] = await Promise.all([
    resolveLinks(vehicle.films),
    resolveLinks(vehicle.pilots),
  ]);

  const statItems = [
    { label: "Manufacturer", value: vehicle.manufacturer, icon: Globe },
    {
      label: "Cost",
      value: vehicle.cost_in_credits,
      unit: "cr",
      icon: DollarSign,
    },
    { label: "Crew", value: vehicle.crew, icon: User },
    { label: "Max Speed", value: vehicle.max_atmosphering_speed, icon: Rocket },
    { label: "Consumables", value: vehicle.consumables, icon: Calendar },
    {
      label: "Cargo Capacity",
      value: vehicle.cargo_capacity,
      unit: "kg",
      icon: Globe,
    },
    { label: "Passengers", value: vehicle.passengers, icon: Users },
    {
      label: "Maximum Atmosphering Speed",
      value: vehicle.max_atmosphering_speed,
      unit: "km/h",
      icon: Ruler,
    },
  ];

  const appearanceItems = [
    { label: "Model", value: vehicle.model, icon: Car },
    { label: "Vehicle Class", value: vehicle.vehicle_class, icon: Car },
    { label: "Length", value: vehicle.length, unit: "m", icon: Ruler },
  ];

  const connectionItems = [
    {
      label: "Films",
      count: vehicle.films?.length || 0,
      icon: Film,
      links: filmLinks.map((l) => ({ name: l.name, href: l.href })),
    },
    {
      label: "Pilots",
      count: vehicle.pilots?.length || 0,
      icon: Users,
      links: pilotLinks.map((l) => ({ name: l.name, href: l.href })),
    },
  ];

  return (
    <DetailView
      appearanceItems={appearanceItems}
      title={vehicle?.name || "Vehicle Details"}
      connectionItems={connectionItems}
      statItems={statItems}
    />
  );
}
