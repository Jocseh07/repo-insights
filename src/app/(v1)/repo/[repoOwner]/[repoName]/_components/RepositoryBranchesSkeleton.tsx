import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RepositoryBranchesSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Branches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-md p-2 text-sm text-muted-foreground"
            >
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 flex-1 rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
