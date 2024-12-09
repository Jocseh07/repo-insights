"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useUserDetails from "@/hooks/github/useUserDetails";
import Image from "next/image";
import Link from "next/link";
import { Building2, Link as LinkIcon, MapPin, Users } from "lucide-react";
import UserPageSkeleton from "./UserPageSkeleton";
import UserPageError from "./UserPageError";

export default function UserDetails() {
  const { data: user, isPending, error } = useUserDetails();

  if (isPending) return <UserPageSkeleton />;
  if (error) return <UserPageError />;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Image
            src={user?.data.avatar_url || ""}
            alt={`${user?.data.login}'s avatar`}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="flex-1">
            <CardTitle className="text-2xl">{user?.data.name}</CardTitle>
            <p className="text-lg text-muted-foreground">@{user?.data.login}</p>
            {user?.data.bio && (
              <p className="mt-2 text-muted-foreground">{user?.data.bio}</p>
            )}
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{user?.data.public_repos} public repos</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{user?.data.total_private_repos} private repos</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                Created at:{" "}
                {user?.data.created_at
                  ? new Date(user?.data.created_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            {user?.data.bio && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{user.data.bio}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
