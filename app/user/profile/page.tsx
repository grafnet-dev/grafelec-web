import { UserLayout } from "@/components/layout/user-layout";
import { Profile } from "@/components/profile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <UserLayout>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Mon Profil
          </h1>
          <Profile session={session} />
        </div>
     
    </UserLayout>
  );
}
