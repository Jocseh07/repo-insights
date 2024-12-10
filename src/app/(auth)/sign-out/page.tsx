import { redirect } from "next/navigation";

export default function SignOut() {
  redirect("/");
  return null;
}
