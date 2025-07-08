"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Shield, Ticket, User, Clock } from "lucide-react"

interface UserProfileDialogProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    email: string
    role: string
    registrationDate: string
    lastLogin?: string
    ticketCount?: number
    status?: string
  }
}

export function UserProfileDialog({ isOpen, onClose, user }: UserProfileDialogProps) {
  // Sample additional user data
  const userStats = {
    totalTickets: 12,
    openTickets: 3,
    resolvedTickets: 9,
    lastLogin: "May 19, 2025 2:30 PM",
    status: "active",
    department: "IT Department",
    phoneNumber: "+1 (555) 123-4567",
    location: "New York, NY",
  }

  const recentActivity = [
    {
      action: "Created ticket",
      details: "TKT-2045: Server Outage Issue",
      timestamp: "2 hours ago",
    },
    {
      action: "Commented on ticket",
      details: "TKT-2039: VPN Connection Issues",
      timestamp: "1 day ago",
    },
    {
      action: "Ticket resolved",
      details: "TKT-2030: Password Reset Request",
      timestamp: "3 days ago",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profil Utilisateur
          </DialogTitle>
          <DialogDescription>Informations détaillées pour {user.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Information de Base</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Nom et prénom</p>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">E-mail</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Rôle</p>
                  <Badge variant={user.role === "admin" ? "destructive" : "secondary"} className="mt-1">
                    {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date d'Inscription</p>
                  <p className="text-sm text-muted-foreground">{user.registrationDate}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Détails supplémentaires</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium">Département</p>
                <p className="text-sm text-muted-foreground">{userStats.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Téléphone</p>
                <p className="text-sm text-muted-foreground">{userStats.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Emplacement</p>
                <p className="text-sm text-muted-foreground">{userStats.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Statut</p>
                <Badge variant={userStats.status === "active" ? "default" : "secondary"}>{userStats.status}</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Activity Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Statistiques d'activité</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Ticket className="h-6 w-6 mx-auto mb-2 text-[#024b94]" />
                <p className="text-2xl font-bold text-[#024b94]">{userStats.totalTickets}</p>
                <p className="text-sm text-muted-foreground">Tickets Total </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-[#f59e0b]" />
                <p className="text-2xl font-bold text-[#f59e0b]">{userStats.openTickets}</p>
                <p className="text-sm text-muted-foreground">Tickets ouverts</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Shield className="h-6 w-6 mx-auto mb-2 text-[#10b981]" />
                <p className="text-2xl font-bold text-[#10b981]">{userStats.resolvedTickets}</p>
                <p className="text-sm text-muted-foreground">Résolu</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Dernière connexion:</span>
              <span>{userStats.lastLogin}</span>
            </div>
          </div>

          <Separator />

          {/* Recent Activity */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Activité Récente</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="h-2 w-2 bg-[#024b94] rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
