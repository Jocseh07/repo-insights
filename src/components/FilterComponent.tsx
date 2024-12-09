"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ArrowUpDown, SortAsc } from "lucide-react";

export default function FilterComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const order = searchParams.get("order") ?? "desc";
  const sort = searchParams.get("sort") ?? "stars";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const query = searchParams.get("query");
    if (query) params.set("query", query);
    params.set("sort", value);
    router.push(`/search?${params.toString()}`);
  };

  const handleOrderChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const query = searchParams.get("query");
    if (query) params.set("query", query);
    params.set("order", value);
    router.push(`/search?${params.toString()}`, { scroll: true });
  };

  return (
    <div className="rounded-md border border-sidebar-border bg-sidebar p-2 shadow">
      <div className="container mx-auto w-full">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">Sort By</CardTitle>
              <SortAsc className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stars">Stars</SelectItem>
                  <SelectItem value="forks">Forks</SelectItem>
                  <SelectItem value="help-wanted-issues">
                    Help Wanted Issues
                  </SelectItem>
                  <SelectItem value="updated">Updated</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">Order</CardTitle>
              <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Select value={order} onValueChange={handleOrderChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Order by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
