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
              <CardHeader className="flex h-full flex-row items-center gap-3 p-4 sm:gap-6 sm:p-6">
                <Skeleton className="h-[40px] w-[40px] rounded sm:h-[80px] sm:w-[80px]" />
                <div className="space-y-2 sm:space-y-3">
                  <Skeleton className="h-6 w-3/4 sm:h-8" />
                  <Skeleton className="h-4 w-full sm:h-5" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Stats Card */}
            <Card className="flex-1">
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-6 w-28" />
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-9 w-28" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </>
  );
}
