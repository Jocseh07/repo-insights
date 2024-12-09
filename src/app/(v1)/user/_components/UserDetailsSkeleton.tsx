import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function UserDetailsSkeleton() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="h-[100px] w-[100px] animate-pulse rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-8 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
