import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RepositoryCommitsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Commits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-md p-2 text-sm"
            >
              <div className="h-4 w-4 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
