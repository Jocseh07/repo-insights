import { SignedIn, UserButton } from "@clerk/nextjs";
import AuthButtons from "./AuthButtons";
import { ModeToggle } from "./ModeToggle";
import { LogoImage } from "./Logo";
import Link from "next/link";
import RepositorySearchBar from "./RepositorySearchBar";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <div className="m-2 rounded-md border border-sidebar-border bg-sidebar p-2 shadow">
      <div className="container mx-auto flex items-center justify-between gap-2 p-2">
        <Link href="/" className="hidden items-center gap-2 sm:flex">
          <LogoImage className="size-8" />
          <h1 className="text-xl font-bold">Repo Insight</h1>
        </Link>
        <RepositorySearchBar />
        <div className="flex items-center gap-2">
          <SignedIn>
            <Button variant="outline" asChild>
              <Link href="/qa">Saved Questions</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/user">Your Repos</Link>
            </Button>
          </SignedIn>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <AuthButtons />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
