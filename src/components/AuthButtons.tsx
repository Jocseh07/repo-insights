"use client";

import { SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

const AuthButtons = () => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <SignedOut>
      <Button asChild className="font-bolds">
        <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
          {isSignIn ? "Sign up" : "Sign in"}
        </Link>
      </Button>
    </SignedOut>
  );
};

export default AuthButtons;
