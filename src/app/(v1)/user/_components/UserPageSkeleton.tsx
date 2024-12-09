import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, GitFork, Star } from "lucide-react";
import Pagination from "@/components/PaginationComponent";

export default function UserPageSkeleton() {
  return (
    <div className="container mx-auto space-y-4">
      <h1 className="mb-6 text-2xl font-bold">Your Repositories</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="w-full animate-pulse">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 rounded bg-muted" />
                  <div className="h-3 w-3/4 rounded bg-muted" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-muted" />
                  <div className="h-4 w-8 rounded bg-muted" />
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4 text-muted" />
                  <div className="h-4 w-8 rounded bg-muted" />
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted" />
                  <div className="h-4 w-24 rounded bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
