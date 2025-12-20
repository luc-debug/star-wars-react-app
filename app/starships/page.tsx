import { Suspense } from "react";
import { EntityGrid, EntityGridSkeleton } from "@/components/entity-grid";

export default function StarshipsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Starships</h1>
      <Suspense fallback={<EntityGridSkeleton count={9} />}>
        <EntityGrid entityType="starships" />
      </Suspense>
    </div>
  );
}
