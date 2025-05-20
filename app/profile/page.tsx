/*import { ChangePasswordForm } from "@/components/change-password-form";
import { ReturnButton } from "@/components/return-button";
import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { UpdateUserForm } from "@/components/update-user-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/auth/login");

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-4">
      <div className="space-y-4">
        <ReturnButton href="/" label="Home" />

        <h1 className="text-3xl font-bold">Profile</h1>

        <div className="flex items-center gap-2">
          {session.user.role === "ADMIN" && (
            <Button size="sm" asChild>
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </Button>
          )}

          <SignOutButton />
        </div>
      </div>

      <h2 className="text-2xl font-bold">Permissions</h2>

      <div className="space-x-4">
        <Button size="sm">MANAGE OWN POSTS</Button>
        <Button size="sm" disabled={!FULL_POST_ACCESS.success}>
          MANAGE ALL POSTS
        </Button>
      </div>

      {session.user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={session.user.image}
          alt="User Image"
          className="size-32 border border-primary rounded-md object-cover"
        />
      ) : (
        <div className="size-32 border border-primary rounded-md bg-primary text-primary-foreground flex items-center justify-center">
          <span className="uppercase text-lg font-bold">
            {session.user.name.slice(0, 2)}
          </span>
        </div>
      )}

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>

      <div className="space-y-4 p-4 rounded-b-md  border border-t-8 border-blue-600">
        <h2 className="text-2xl font-bold">Update User</h2>

        <UpdateUserForm
          name={session.user.name}
          image={session.user.image ?? ""}
        />
      </div>

      <div className="space-y-4 p-4 rounded-b-md  border border-t-8 border-red-600">
        <h2 className="text-2xl font-bold">Change Password</h2>

        <ChangePasswordForm />
      </div>
    </div>
  );
}
  */


import { SignOutButton } from "@/components/auth/sign-out-button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { User, Settings, Shield, Mail, Calendar } from "lucide-react"

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <h1 className="text-xl font-semibold text-red-600 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Accès non autorisé
          </h1>
          <p className="mt-2 text-red-500">Veuillez vous connecter pour accéder à cette page.</p>
        </div>
      </div>
    )
  }

  // Extraire les informations pertinentes du utilisateur
  const user = session.user || {}
  const { name, email, image } = user
  
  // Formater la date de mise à jour de session
 

  return (
    <div className="container mx-auto max-w-screen-lg px-4 py-8 pt-40">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section de profil principal */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
            <div className="flex flex-col items-center text-center">
              {image ? (
                <img 
                  src={image} 
                  alt="Photo de profil" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/10"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary/40" />
                </div>
              )}
              <h1 className="mt-4 text-2xl font-bold">{name || 'Utilisateur'}</h1>
              <p className="text-muted-foreground">{email || 'Aucun email'}</p>
            </div>

            

            <div className="pt-4">
              <SignOutButton />
            </div>
          </div>
        </div>

        {/* Section d'informations détaillées */}
        <div className="md:col-span-2 space-y-8">
          {/* Informations du compte */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="mr-2 h-5 w-5" />
              Informations du compte
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Nom complet</label>
                  <p className="font-medium">{name || 'Non renseigné'}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium">{email || 'Non renseigné'}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">ID</label>
                  <p className="font-medium text-sm truncate">{user.id || 'Non disponible'}</p>
                </div>
               
              </div>
            </div>
          </div>

          {/* Section d'activité récente (fictive) */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Paramètres du compte
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-1">
                  <p className="font-medium">Notifications par email</p>
                  <p className="text-sm text-muted-foreground">Recevez des notifications importantes par email</p>
                </div>
                <div>
                  <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-1">
                  <p className="font-medium">Authentification à deux facteurs</p>
                  <p className="text-sm text-muted-foreground">Sécurisez votre compte avec 2FA</p>
                </div>
                <div>
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="font-medium">Données de session</p>
                  <p className="text-sm text-muted-foreground">Informations détaillées sur votre session actuelle</p>
                </div>
                <button className="text-sm text-primary hover:underline">
                  Afficher
                </button>
              </div>
            </div>
          </div>

          {/* Données JSON brutes (masquées par défaut) 
          <details className="bg-white rounded-lg shadow-sm border p-2">
            <summary className="p-2 cursor-pointer font-medium">Données de session brutes</summary>
            <pre className="text-xs p-4 bg-gray-50 rounded-md overflow-auto max-h-96">
              {JSON.stringify(session, null, 2)}
            </pre>
          </details>
          */}
        </div>
      </div>
    </div>
  )
}