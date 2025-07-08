import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserLayout } from "@/components/layout/user-layout"
import { AlertCircle, CheckCircle, Clock, Ticket } from "lucide-react"

export default function UserDashboard() {
  return (
    <UserLayout>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        {/* Ticket Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Total</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#024b94]">12</div>
              <p className="text-xs text-muted-foreground">tickets soumis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attente</CardTitle>
              <Clock className="h-4 w-4 text-[#f59e0b]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#f59e0b]">4</div>
              <p className="text-xs text-muted-foreground">En attente de réponse</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En cours</CardTitle>
              <AlertCircle className="h-4 w-4 text-[#3b82f6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#3b82f6]">5</div>
              <p className="text-xs text-muted-foreground">Actuellement en cours de réalisation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolu</CardTitle>
              <CheckCircle className="h-4 w-4 text-[#10b981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#10b981]">3</div>
              <p className="text-xs text-muted-foreground">Terminé avec succès</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Notifications récentes</CardTitle>
              <CardDescription>Restez informé de l'état de votre ticket</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <AlertCircle className="h-4 w-4 text-[#024b94]" />
                </div>
                <div>
                  <p className="font-medium">Ticket #1089 statut mis à jour</p>
                  <p className="text-sm text-muted-foreground">Votre ticket a été marqué comme en cours</p>
                  <p className="text-xs text-muted-foreground mt-1">il y a 2 heures</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <CheckCircle className="h-4 w-4 text-[#10b981]" />
                </div>
                <div>
                  <p className="font-medium">Ticket #1076 Resolu</p>
                  <p className="text-sm text-muted-foreground">Votre problème d'accès au réseau a été résolu</p>
                  <p className="text-xs text-muted-foreground mt-1">Hier</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <Ticket className="h-4 w-4 text-[#024b94]" />
                </div>
                <div>
                  <p className="font-medium">Nouveau commentaire sur le Ticket #1082</p>
                  <p className="text-sm text-muted-foreground">Admin: "Nous étudions ce problème..."</p>
                  <p className="text-xs text-muted-foreground mt-1">il y a 2 heures</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Latest Events */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Derniers événements</CardTitle>
              <CardDescription>Événements et annonces à venir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#024b94]">Entretien du système</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                    Prochainement
                  </span>
                </div>
                <p className="text-sm mt-2">
                  Maintenance programmée le 25 mai 2025. Le système peut être indisponible de 2 h à 4 h du matin.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Publié par Admin • 19 mai 2025</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#024b94]">Nouvelle version de fonctionnalité</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-200">
                    Annonce
                  </span>
                </div>
                <p className="text-sm mt-2">Nous avons ajouté de nouvelles fonctionnalités de pièces jointes au système de tickets.</p>
                <p className="text-xs text-muted-foreground mt-2">Publié par Admin • 15 mai 2025</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#024b94]">Formation Microsoft</h3>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200">
                    Evènement
                  </span>
                </div>
                <p className="text-sm mt-2">Rejoignez-nous pour une assemblée virtuelle le 1er juin 2025 à 10h00.</p>
                <p className="text-xs text-muted-foreground mt-2">Publié par Admin • 10 mai 2025</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  )
}
