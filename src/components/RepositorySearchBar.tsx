"use client";

import { useSearchParams } from "next/navigation";
import Form from "next/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RepositorySearchBar() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return (
    <Form
      action={"/search"}
      className="relative mx-auto flex w-full max-w-sm items-center justify-center"
    >
      <Input
        type="text"
        name="query"
        defaultValue={query ?? ""}
        placeholder="Search repositories"
        className="h-auto border-border bg-background/10 px-6 py-3 text-foreground backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button
        className={cn(
          "absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2",
        )}
        variant="outline"
        type="submit"
      >
        <Search className="h-4 w-4" />
        <span>Search</span>
      </Button>
    </Form>
  );
}
