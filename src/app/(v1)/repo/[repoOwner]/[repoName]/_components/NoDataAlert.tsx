import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function NoDataAlert({ name }: { name: string }) {
  return (
    <Alert className="flex h-full w-full items-center gap-3 border-yellow-500/50 bg-yellow-50 pt-3 dark:border-yellow-400/30 dark:bg-yellow-900/20">
      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      <div className="flex flex-col">
        <AlertTitle className="text-yellow-800 dark:text-yellow-300">
          No Data Available
        </AlertTitle>
        <AlertDescription className="text-yellow-700/90 dark:text-yellow-400/90">
          We couldn't find any {name} for this repository.
        </AlertDescription>
      </div>
    </Alert>
  );
}
