"use client";

import Pagination from "@/components/PaginationComponent";
import UserPageFilter from "./_components/UserPageFilter";
import UserPageRepositories from "./_components/UserPageRepositories";
import UserDetails from "./_components/UserDetails";

export default function UserPage() {
  return (
    <div className="container mx-auto space-y-4 p-4">
      <UserDetails />
      <UserPageFilter />
      <UserPageRepositories />
      <Pagination />
    </div>
  );
}
