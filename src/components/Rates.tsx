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
    <div className="sticky top-2 z-10 m-2 rounded-md border border-sidebar-border bg-sidebar p-2 shadow">
      <div className="container mx-auto w-full">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <Card
            className={cn(
              "transition-colors duration-200",
              isCoreWarning && "border-destructive bg-destructive/10",
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Core API Usage
              </CardTitle>
              <Github className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={cn(
                    "text-lg font-medium",
                    isCoreWarning
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {rates.resources.core.remaining}/{rates.resources.core.limit}
                </span>
              </div>
              <Progress
                value={
                  (rates.resources.core.remaining /
                    rates.resources.core.limit) *
                  100
                }
                className={cn(
                  "h-2.5",
                  isCoreWarning
                    ? "bg-destructive/20 [&>div]:bg-destructive"
                    : "[&>div]:bg-primary",
                )}
              />
              <div className="mt-3 text-sm text-muted-foreground">
                Resets {coreResetMinutes}
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "transition-colors duration-200",
              isSearchWarning && "border-destructive bg-destructive/10",
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Search API Usage
              </CardTitle>
              <Github className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={cn(
                    "text-lg font-medium",
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
                  "h-2.5",
                  isSearchWarning
                    ? "bg-destructive/20 [&>div]:bg-destructive"
                    : "[&>div]:bg-primary",
                )}
              />
              <div className="mt-3 text-sm text-muted-foreground">
                Resets {searchResetMinutes}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
