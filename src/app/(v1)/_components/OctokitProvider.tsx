"use client";
import { Octokit } from "octokit";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { getToken } from "@/server/actions/user/getToken";

export const OctokitContext = createContext<Octokit | null>(null);

export default function OctokitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useAuth();
  const { data: token } = useQuery({
    queryKey: ["token", userId],
    queryFn: () => getToken({ userId: userId ?? "" }),
    enabled: !!userId,
  });

  const octokit = new Octokit({
    auth: token,
  });

  return (
    <OctokitContext.Provider value={octokit}>
      {children}
    </OctokitContext.Provider>
  );
}
