import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useUserRepos from "@/hooks/github/useUserRepos";
import { Clock, GitFork, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "timeago.js";
import Pagination from "@/components/PaginationComponent";
import { useSearchParams } from "next/dist/client/components/navigation";
import UserPageSkeleton from "./UserPageSkeleton";
import UserPageError from "./UserPageError";
import { Badge } from "@/components/ui/badge";

export default function UserPageRepositories() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") ?? "updated";
  const order = searchParams.get("order") ?? "desc";

  const {
    data: repos,
    isPending,
    error,
  } = useUserRepos({
    sort: sort as "updated" | "created" | "pushed" | "full_name",
    order: order as "desc" | "asc",
    page,
  });

  if (isPending) return <UserPageSkeleton />;
  if (error) return <UserPageError />;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Your Repositories</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {repos?.data.map((repo) => (
          <Card
            key={repo.id}
            className="w-full transition-shadow hover:shadow-md"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <Image
                  src={repo.owner?.avatar_url || ""}
                  alt={`${repo.owner?.login}'s avatar`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/repo/${repo.owner?.login}/${repo.name}`}
                      className="font-medium hover:underline"
                    >
                      {repo.name}
                    </Link>
                    <Badge variant={repo.private ? "secondary" : "default"}>
                      {repo.private ? "Private" : "Public"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {repo.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4 text-muted-foreground" />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Updated {format(repo.updated_at || new Date())}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
