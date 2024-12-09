"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, SortAsc } from "lucide-react";

export default function UserPageFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const order = searchParams.get("order") ?? "desc";
  const sort = searchParams.get("sort") ?? "updated";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`/user?${params.toString()}`);
  };

  const handleOrderChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("order", value);
    router.push(`/user?${params.toString()}`);
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
                  <SelectItem value="updated">Last Updated</SelectItem>
                  <SelectItem value="created">Created Date</SelectItem>
                  <SelectItem value="pushed">Last Pushed</SelectItem>
                  <SelectItem value="full_name">Repository Name</SelectItem>
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
