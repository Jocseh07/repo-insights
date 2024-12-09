"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export const LogoImage = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <Image
        src="/just-logo-light-bg.png"
        alt="logo light"
        fill
        className={cn(
          "h-full rounded-md object-contain object-center mix-blend-darken dark:hidden",
        )}
      />
      <Image
        src="/just-logo-dark-bg.png"
        alt="logo dark"
        fill
        className={cn(
          "hidden h-full rounded-md object-contain mix-blend-lighten dark:block",
        )}
      />
    </div>
  );
};
