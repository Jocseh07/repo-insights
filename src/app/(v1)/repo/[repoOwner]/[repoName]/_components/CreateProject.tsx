"use client";

import { Button } from "@/components/ui/button";
import { createProject, deleteProject } from "@/server/actions/project";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { checkFiles } from "@/server/actions/github/checkFiles";
import { indexFiles } from "@/server/actions/github/indexFiles";
import { useRouter } from "next/navigation";

interface CreateProjectProps {
  repoOwner: string;
  repoName: string;
  repoId: number;
}

type CheckFilesReturn = Awaited<ReturnType<typeof checkFiles>>;

export const CreateProject = ({
  repoOwner,
  repoName,
  repoId,
}: CreateProjectProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [docs, setDocs] = useState<CheckFilesReturn>([]);
  const router = useRouter();

  const handleInitialClick = async () => {
    setIsLoading(true);
    const repoUrl = `https://github.com/${repoOwner}/${repoName}`;

    const filesCountPromise = toast.promise(
      async () => await checkFiles({ repoUrl }),
      {
        loading: "Checking repository files...",
        success: "Repository files checked successfully!",
        error: "Failed to check repository files",
      },
    );

    const docs = await filesCountPromise.unwrap();
    setDocs(docs);
    setShowDialog(true);
    setIsLoading(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    const repoUrl = `https://github.com/${repoOwner}/${repoName}`;

    const newProject = toast.promise(
      async () => await createProject({ repoUrl, repoOwner, repoName, repoId }),
      {
        loading: "Creating project...",
        success: "Project created successfully",
        error: "Error creating project",
      },
    );

    const project = await newProject.unwrap();
    const currentProject = project[0];
    if (!currentProject) return;

    const indexedProjectPromise = toast.promise(
      async () => await indexFiles({ docs, project: currentProject }),
      {
        loading: "Indexing files...",
        success: "Files indexed successfully",
        error: "Error indexing files",
      },
    );

    const isSuccess = await indexedProjectPromise.unwrap();
    if (!isSuccess) {
      await deleteProject({ repoId: currentProject.repoId });
    }

    router.push(`/repo/${repoOwner}/${repoName}`);

    setIsLoading(false);
    setShowDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Ready to Get Started?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-center text-muted-foreground">
              Create a project to enable AI-powered code assistance. We&apos;ll
              analyze your repository to provide intelligent answers to your
              questions about the codebase.
            </p>
            <Button onClick={handleInitialClick} disabled={isLoading}>
              {isLoading ? "Processing..." : "Create Project"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Project Creation</AlertDialogTitle>
            <AlertDialogDescription>
              We found {docs.length} files in your repository. Would you like to
              proceed with indexing? This process will analyze your codebase to
              enable AI-powered assistance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? "Processing..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
