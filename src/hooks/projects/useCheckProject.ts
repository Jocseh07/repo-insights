import { checkProjectExists } from "@/server/actions/project";
import { useQuery } from "@tanstack/react-query";

export const useCheckProject = ({ repoId }: { repoId: number | undefined }) => {
  const data = useQuery({
    queryKey: ["projectExists", repoId],
    queryFn: async () => await checkProjectExists({ repoId }),
  });
  const isProjectExists = data.data;
  return {
    isProjectExists,
    isCheckingProjectExists: data.isLoading,
    isCheckingProjectError: data.error,
  };
};
