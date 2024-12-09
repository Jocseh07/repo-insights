import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export function Hero() {
  return (
    <div className="space-y-6">
      <h1 className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl">
        Understand Any GitHub Repository in Seconds
      </h1>
      <p className="text-center text-lg text-muted-foreground sm:text-xl">
        Powered by AI to help you comprehend codebases effortlessly
      </p>

      <div className="relative mx-auto max-w-2xl">
        <Form action={"/search"}>
          <Input
            type="text"
            name="query"
            placeholder="Enter GitHub repository name"
            className="h-auto p-3"
          />
          <Button
            className={cn(
              "absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2",
            )}
            type="submit"
          >
            <Search className="h-5 w-5" />
            <span className="hidden sm:block">Search</span>
          </Button>
        </Form>
      </div>
    </div>
  );
}
