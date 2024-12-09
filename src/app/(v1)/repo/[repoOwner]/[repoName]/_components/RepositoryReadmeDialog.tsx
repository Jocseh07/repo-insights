"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import useRepoReadme from "@/hooks/github/useRepoReadme";
import MDEditor from "@uiw/react-md-editor";
import { Skeleton } from "@/components/ui/skeleton";

export default function RepositoryReadmeDialog({
  repoOwner,
  repoName,
}: {
  repoOwner: string;
  repoName: string;
}) {
  const [open, setOpen] = useState(false);
  const {
    data: readme,
    isLoading,
    error,
  } = useRepoReadme({
    owner: repoOwner,
    repo: repoName,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          View README
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[75vh] max-w-[75vw] overflow-y-auto">
        <DialogHeader className="hidden">
          <DialogTitle>README</DialogTitle>
          <DialogDescription>
            This is the repository README. It is rendered as Markdown.
          </DialogDescription>
        </DialogHeader>
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}
        {error && (
          <div className="text-center text-muted-foreground">
            Failed to load README
          </div>
        )}
        {readme && (
          <div className="prose prose-invert max-w-none">
            <MDEditor.Markdown
              source={atob(readme.data.content)}
              className="prose-lg w-full bg-background"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
