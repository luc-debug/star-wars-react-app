import { LoadingGrid } from "@/components/loading-grid";
import { PeopleGrid } from "@/features/characters/components/people-grid";
import { Suspense } from "react";

export default function PeoplePage() {
  return (
    <Suspense fallback={<LoadingGrid />}>
      <PeopleGrid />
    </Suspense>
  );
}
