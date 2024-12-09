import { OctokitContext } from "@/components/providers/OctokitProvider";

import { useContext } from "react";

export const useSetUserId = () => {
  const octokitContext = useContext(OctokitContext);
  return octokitContext?.setUserId;
};
