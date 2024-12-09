"use client";

import { Github } from "lucide-react";
import { Progress } from "./ui/progress";
import { format } from "timeago.js";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import useRates from "@/hooks/github/useRates";
export default function Rates() {
  const { data, isPending } = useRates();
  const rates = data?.data;

  if (!rates || isPending) return null;
  const coreResetMinutes = format(rates.resources.core.reset * 1000);
  const searchResetMinutes = format(rates.resources.search.reset * 1000);

  const isCoreWarning = rates.resources.core.remaining <= 5;
  const isSearchWarning = rates.resources.search.remaining <= 5;

  return (
    <div className="floating-box sticky top-2 z-10">
      <div className="box w-full">
        <Card
          className={cn(
            "transition-colors duration-200",
            (isCoreWarning || isSearchWarning) &&
              "border-destructive bg-destructive/10",
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              GitHub API Usage
            </CardTitle>
            <Github className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Core API
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isCoreWarning
                        ? "text-destructive"
                        : "text-muted-foreground",
                    )}
                  >
                    {rates.resources.core.remaining}/
                    {rates.resources.core.limit}
                  </span>
                </div>
                <Progress
                  value={
                    (rates.resources.core.remaining /
                      rates.resources.core.limit) *
                    100
                  }
                  className={cn(
                    "h-2",
                    isCoreWarning
                      ? "bg-destructive/20 [&>div]:bg-destructive"
                      : "[&>div]:bg-primary",
                  )}
                />
                {rates.resources.core.remaining <
                  rates.resources.core.limit && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    Resets {coreResetMinutes}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Search API
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isSearchWarning
                        ? "text-destructive"
                        : "text-muted-foreground",
                    )}
                  >
                    {rates.resources.search.remaining}/
                    {rates.resources.search.limit}
                  </span>
                </div>
                <Progress
                  value={
                    (rates.resources.search.remaining /
                      rates.resources.search.limit) *
                    100
                  }
                  className={cn(
                    "h-2",
                    isSearchWarning
                      ? "bg-destructive/20 [&>div]:bg-destructive"
                      : "[&>div]:bg-primary",
                  )}
                />
                {rates.resources.search.remaining <
                  rates.resources.search.limit && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    Resets {searchResetMinutes}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
