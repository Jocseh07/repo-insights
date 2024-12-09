"use client";

import { useSearchParams } from "next/navigation";
import { RepositoryCard } from "@/app/(v1)/_components/RepositoryCard";
import FilterComponent from "@/components/FilterComponent";
import Pagination from "@/components/PaginationComponent";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page") ?? 1;
  const order = searchParams.get("order") ?? "desc";
  const sort = searchParams.get("sort") ?? "stars";

  return (
    <div className="mb-4 space-y-4">
      <FilterComponent />
      {query && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">
            Search Results for &quot;{query}&quot;
          </h2>
          <RepositoryCard
            query={query}
            page={Number(page)}
            per_page={12}
            order={order as "desc" | "asc"}
            sort={sort as "stars" | "forks" | "help-wanted-issues" | "updated"}
          />
        </div>
      )}
      <Pagination />
    </div>
  );
}
