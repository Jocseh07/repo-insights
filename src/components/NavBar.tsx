import { SignedIn, UserButton } from "@clerk/nextjs";
import AuthButtons from "./AuthButtons";
import { ModeToggle } from "./ModeToggle";
import { LogoImage } from "./Logo";
import Link from "next/link";
import RepositorySearchBar from "./RepositorySearchBar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu } from "lucide-react";

const NavBar = () => {
  return (
    <div className="floating-box !mb-0">
      <div className="box flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <LogoImage className="size-8" />
          <h1 className="hidden w-fit text-xs font-bold sm:block md:text-lg">
            Repo Insight
          </h1>
        </Link>
        <RepositorySearchBar />
        <div className="flex items-center gap-2">
          <SignedIn>
            <div className="hidden md:flex md:gap-2">
              <Button variant="outline" asChild>
                <Link href="/qa">Saved Questions</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/user">Your Repos</Link>
              </Button>
            </div>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="flex flex-col gap-1"
                >
                  <DropdownMenuItem asChild>
                    <Button variant="outline" asChild>
                      <Link href="/qa">Saved Questions</Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button variant="outline" asChild>
                      <Link href="/user">Your Repos</Link>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
