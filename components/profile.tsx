import { SignOutButton } from "@/components/auth/sign-out-button"
import { User, Settings, Shield } from "lucide-react"

interface ProfileProps {
  session: {
    user?: {
      name?: string
      email?: string
      image?: string | null
      role?: string
    }
  } | null
}

export function Profile({ session }: ProfileProps) {
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

  // Extraire les informations pertinentes de l'utilisateur
  const user = session.user || {}
  const { name, email, image, role } = user
  
  // Fonction pour formater le rôle
  const formatRole = (role: any) => {
    if (role === "USER") return "UTILISATEUR"
    if (role === "ADMIN") return "ADMINISTRATEUR"
    return role // retourne le rôle original si ce n'est ni USER ni ADMIN
  }

  return (
    <div className="container mx-auto max-w-screen-lg px-4 py-8 pt-8">
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
                  <label className="text-sm text-muted-foreground">Rôle</label>
                  <p className="font-medium text-sm truncate">{formatRole(role)}</p>
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
        </div>
      </div>
    </div>
  )
}