import { useQuery } from "@tanstack/react-query";
import useOctokit from "../useOctokit";

export default function useUserRepos({
  page = 1,
  per_page = 10,
  sort = "updated",
  order = "desc",
}: {
  page?: number;
  per_page?: number;
  sort?: "updated" | "created" | "pushed" | "full_name";
  order?: "desc" | "asc";
}) {
  const octokit = useOctokit();

  return useQuery({
    queryKey: ["userRepos", page, per_page, sort, order],
    queryFn: async () => {
      try {
        return await octokit?.rest.repos.listForAuthenticatedUser({
          page,
          per_page,
          sort,
          order,
        });
      } catch (error) {
        throw error;
      }
    },
  });
}
