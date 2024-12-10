import { OctokitContext } from "@/app/(v1)/_components/OctokitProvider";
import { useContext } from "react";

export default function useOctokit() {
  const octokitContext = useContext(OctokitContext);
  return octokitContext;
}
