"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"

interface UserRoleDialogProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  onConfirm: (userId: string, newRole: string) => void
}

export function UserRoleDialog({ isOpen, onClose, user, onConfirm }: UserRoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState(user.role)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    if (selectedRole === user.role) {
      onClose()
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onConfirm(user.id, selectedRole)
      setIsSubmitting(false)
      onClose()
    }, 1000)
  }

  const isPromotingToAdmin = user.role === "user" && selectedRole === "admin"
  const isDemotingFromAdmin = user.role === "admin" && selectedRole === "user"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Changer le Role Utilisateur</DialogTitle>
          <DialogDescription>
            Mettre à jour le rôle pour {user.name} ({user.email})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Role actuel</label>
            <div className="p-2 bg-muted rounded-md">
              <span className="capitalize">{user.role}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nouveau Rôle</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Utilisateur</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(isPromotingToAdmin || isDemotingFromAdmin) && (
            <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                {isPromotingToAdmin && (
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">Promotion au rang d'administrateur</p>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      Cet utilisateur bénéficiera de tous les privilèges administratifs, y compris la gestion des utilisateurs, les paramètres système et toutes les fonctionnalités d'administration.
                    </p>
                  </div>
                )}
                {isDemotingFromAdmin && (
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">Rétrogradation d'administrateur</p>
                    <p className="text-yellow-700 dark:text-yellow-300">
                     Cet utilisateur perdra tous ses privilèges administratifs et n'aura accès qu'aux fonctionnalités utilisateur standard.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting || selectedRole === user.role}
            className="bg-[#b60101] hover:bg-[#b60101]/90"
          >
            {isSubmitting ? "Mis à jour..." : "Mettre à jour le rôle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
