import { SignedIn, UserButton } from "@clerk/nextjs";
import AuthButtons from "./AuthButtons";
import { ModeToggle } from "./ModeToggle";
import SidebarToggle from "./SidebarToggle";

export default async function TopBar() {
  return (
    <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar p-2 px-4 shadow">
      <SidebarToggle />
      {/* <SearchBar /> */}
      <div className="ml-auto"></div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <AuthButtons />
      <ModeToggle />
    </div>
  );
}
