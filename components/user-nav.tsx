"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { useSession } from "@/lib/auth-client" // Ajustez le chemin selon votre configuration
import { useRouter } from "next/navigation"
import { signOut } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export function UserNav() {
  const { data: session} = useSession()
  const router = useRouter()
 const [isPending, setIsPending] = useState(false);

 // Fonction pour naviguer vers le profil
  const handleProfileClick = () => {
    router.push('/user/profile')
  }
  
// Fonction pour gérer la déconnexion
  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
         onError: (context) => {  
          toast.error(context.error.message || "Erreur lors de l'inscription");
        },
        onSuccess: () => {
          toast.success("Vous êtes déconnecté!");
          router.push("/");
        },
      },
    });
  }

   
  // Afficher un loader ou rien pendant le chargement
  if (isPending) {
    return (
      <Button variant="ghost" className="relative h-8 w-8 rounded-full" disabled>
        <Avatar className="h-8 w-8">
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  // Si pas d'utilisateur connecté, ne pas afficher le menu
  if (!session?.user) {
    return null
  }

  const user = session.user
  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email?.substring(0, 2).toUpperCase() || 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={user.image || "/placeholder.svg?height=32&width=32"} 
              alt={`Avatar de ${user.name || user.email}`} 
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name || 'Utilisateur'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
         <DropdownMenuItem onClick={handleProfileClick}>
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}