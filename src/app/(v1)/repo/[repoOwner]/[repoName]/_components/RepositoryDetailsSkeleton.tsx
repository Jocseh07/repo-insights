import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RepositoryDetailsSkeleton() {
  return (
    <>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Profile Card */}
            <Card className="flex-1">
              <CardHeader className="flex h-full flex-row items-center gap-6 p-6">
                <Skeleton className="h-[100px] w-[100px] rounded" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Stats Card */}
            <Card className="flex-1">
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Skeleton className="mt-6 h-[120px] w-full" />
    </>
  );
}
