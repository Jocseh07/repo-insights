"use client";

import { SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Github } from "lucide-react";

const AuthButtons = () => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <SignedOut>
      <Button asChild>
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="flex items-center gap-2"
        >
          <Github className="h-4 w-4" />
          <span className="hidden md:block">
            {isSignIn ? "Sign up" : "Sign in"}
          </span>
        </Link>
      </Button>
    </SignedOut>
  );
};

export default AuthButtons;
