import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ErrorRepositoryCard() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>API Rate Limit Exceeded</AlertTitle>
      <AlertDescription>
        You have reached the GitHub API rate limit. Please sign in with your
        GitHub account to continue.
      </AlertDescription>
    </Alert>
  );
}
