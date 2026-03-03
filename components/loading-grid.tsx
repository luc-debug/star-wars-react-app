import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { generateUniqueIdArray } from "@/lib/utils";

const LOADING_ITEMS = generateUniqueIdArray(12);

export function LoadingGrid() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{LOADING_ITEMS.map((item) => (
				<Card key={item.id}>
					<CardHeader>
						<Skeleton className="h-6 w-3/4" />
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="grid grid-cols-2 gap-2">
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
						</div>
						<div className="flex gap-2">
							<Skeleton className="h-6 w-20" />
							<Skeleton className="h-6 w-20" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
