"use client";

import { useSetUserId } from "@/hooks/useSetUserId";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const router = useRouter();
  const setUserId = useSetUserId();

  useEffect(() => {
    if (setUserId) {
      setUserId(null);
      router.push("/");
    }
  }, [setUserId, router]);

  return null;
}
