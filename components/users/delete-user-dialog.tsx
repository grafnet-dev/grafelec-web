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
import { Input } from "@/components/ui/input"
import { AlertTriangle } from "lucide-react"

interface DeleteUserDialogProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  onConfirm: (userId: string) => void
}

export function DeleteUserDialog({ isOpen, onClose, user, onConfirm }: DeleteUserDialogProps) {
  const [confirmText, setConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      onConfirm(user.id)
      setIsDeleting(false)
      onClose()
      setConfirmText("")
    }, 1000)
  }

  const isConfirmValid = confirmText === "SUPPRIMER"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Supprimer le compte utilisateur
          </DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Elle supprimera définitivement le compte utilisateur et toutes les données associées.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
            <div className="space-y-2">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">Utilisateur à supprimer :</p>
              <div className="text-sm text-red-700 dark:text-red-300">
                <p>
                  <strong>Nom:</strong> {user.name}
                </p>
                <p>
                  <strong>E-mail:</strong> {user.email}
                </p>
                <p>
                  <strong>Rôle:</strong> {user.role}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Tape <code className="bg-muted px-1 py-0.5 rounded text-xs">SUPPRIMER</code> pour confirmer :
            </label>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Tape SUPPRIMER pour confirmer"
              className="font-mono"
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Avertissement :</strong> Ceci entraînera de façon permanente :
            </p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Supprimer le compte utilisateur</li>
              <li>Supprimer tickets et commentaires des utilisateurs</li>
              <li>Révoquer toutes les autorisations d'accès</li>
              <li>Effacer toutes les données utilisateur du système</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={!isConfirmValid || isDeleting}>
            {isDeleting ? "Suppression..." : "Supprimer utilisateur"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
