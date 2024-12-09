"use client";
import { Octokit } from "octokit";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { queryClient } from "./Providers";
import { getToken } from "@/server/actions/user/getToken";

export const OctokitContext = createContext<{
  octokit: Octokit;
  setUserId: Dispatch<SetStateAction<string | null>>;
} | null>(null);

export default function OctokitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentOctokit, setCurrentOctokit] = useState<Octokit>(
    () => new Octokit(),
  );
  const [userId, setUserId] = useState<string | null>(null);
  const { userId: authUserId } = useAuth();
  if (authUserId && userId !== authUserId) setUserId(authUserId);

  const { data: token } = useQuery({
    queryKey: ["token", userId],
    queryFn: () => getToken({ userId: userId ?? "" }),
    enabled: !!userId,
  });

  useEffect(() => {
    if (userId && token) {
      setCurrentOctokit(new Octokit({ auth: token }));
    } else {
      setCurrentOctokit(new Octokit());
    }
    void queryClient.invalidateQueries({ queryKey: ["important"] });
  }, [userId, token]);

  return (
    <OctokitContext.Provider value={{ octokit: currentOctokit, setUserId }}>
      {children}
    </OctokitContext.Provider>
  );
}
