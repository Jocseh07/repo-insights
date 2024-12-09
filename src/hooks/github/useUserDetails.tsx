import { useQuery } from "@tanstack/react-query";
import useOctokit from "../useOctokit";

export default function useUserDetails() {
  const octokit = useOctokit();

  return useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      try {
        return await octokit?.rest.users.getAuthenticated();
      } catch (error) {
        throw error;
      }
    },
  });
}
