import { OctokitContext } from "@/components/providers/OctokitProvider";
import { useContext } from "react";

export default function useOctokit() {
  const octokitContext = useContext(OctokitContext);
  return octokitContext?.octokit;
}
