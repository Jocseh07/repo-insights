import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export function Hero() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-center text-5xl font-bold text-transparent">
          Understand Any GitHub Repository in Seconds
        </h1>
        <p className="mb-12 text-center text-xl text-muted-foreground">
          Powered by AI to help you comprehend codebases effortlessly
        </p>

        <div className="relative mx-auto max-w-2xl">
          <Form action={"/search"}>
            <Input
              type="text"
              name="query"
              placeholder="Enter GitHub repository name"
              className="h-auto border-border bg-background/10 px-6 py-4 text-foreground backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button
              className={cn(
                "absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2",
              )}
              type="submit"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
