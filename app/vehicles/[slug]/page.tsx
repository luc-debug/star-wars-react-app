import { DetailView } from "@/components/detail-view";
import { Vehicle } from "@/types/Vehicle";
import { generateStaticParams as generatePeopleStaticParams } from "@/lib/generateStaticParams";
import { searchItem } from "@/lib/searchItem";
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
    { label: "Films", count: vehicle.films?.length || 0, icon: Film },
    { label: "Pilots", count: vehicle.pilots?.length || 0, icon: Users },
  ];

  const additionalSections = [
    { title: "URL", icon: Globe, content: vehicle.url },
    { title: "Created", icon: Calendar, content: vehicle.created },
    { title: "Edited", icon: Calendar, content: vehicle.edited },
  ];

  return (
    <DetailView
      appearanceItems={appearanceItems}
      title={vehicle?.name || "Vehicle Details"}
      connectionItems={connectionItems}
      additionalSections={additionalSections}
      statItems={statItems}
    />
  );
}
