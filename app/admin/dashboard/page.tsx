"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout } from "@/components/layout/admin-layout"
import { AlertCircle, CheckCircle, Clock, Ticket, Users, Loader2 } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts"

// Types pour les données de tickets
interface TicketAuthor {
  id: string
  name: string
  email: string
  image?: string
}

interface TicketAssignee {
  id: string
  name: string
  email: string
  image?: string
}

interface Ticket {
  id: string
  title: string
  description: string
  category: string
  urgency: string
  status: string
  createdAt: string
  updatedAt: string
  author: TicketAuthor
  assignee?: TicketAssignee
  _count: {
    comments: number
  }
}

interface TicketsResponse {
  tickets: Ticket[]
  count: number
}

interface DashboardStats {
  totalTickets: number
  waitingTickets: number
  inProgressTickets: number
  resolvedTickets: number
  percentageChange: {
    total: number
    waiting: number
    inProgress: number
    resolved: number
  }
}

interface TicketTrend {
  name: string
  tickets: number
}

interface CategoryData {
  category: string
  count: number
}

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalTickets: 0,
    waitingTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
    percentageChange: {
      total: 0,
      waiting: 0,
      inProgress: 0,
      resolved: 0
    }
  })
  const [ticketTrends, setTicketTrends] = useState<TicketTrend[]>([])
  const [ticketsByCategory, setTicketsByCategory] = useState<CategoryData[]>([])
  const [priorityTickets, setPriorityTickets] = useState<Ticket[]>([])

  // Récupérer les tickets depuis l'API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/tickets')
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des tickets')
        }
        
        const data: TicketsResponse = await response.json()
        setTickets(data.tickets)
        
        // Calculer les statistiques
        calculateDashboardStats(data.tickets)
        calculateTicketTrends(data.tickets)
        calculateTicketsByCategory(data.tickets)
        calculatePriorityTickets(data.tickets)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  // Fonction pour mapper les statuts de la DB vers l'affichage
  const mapStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'attente'
      case 'in_progress':
        return 'en_cours'
      case 'resolved':
        return 'resolu'
      default:
        return status.toLowerCase()
    }
  }

  // Fonction pour mapper les catégories de la DB vers l'affichage
  const mapCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hardware':
        return 'Materiel'
      case 'software':
        return 'Logiciel'
      case 'network':
        return 'Reseau'
      case 'account':
        return 'Compte'
      case 'other':
        return 'Autres'
      default:
        return category
    }
  }

  // Fonction pour mapper les urgences
  const mapUrgency = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'low':
        return 'Faible'
      case 'medium':
        return 'Moyen'
      case 'high':
        return 'Élevé'
      case 'critical':
        return 'Critique'
      default:
        return urgency
    }
  }

  // Calculer les statistiques du dashboard
  const calculateDashboardStats = (tickets: Ticket[]) => {
    const totalTickets = tickets.length
    const waitingTickets = tickets.filter(t => mapStatus(t.status) === 'attente').length
    const inProgressTickets = tickets.filter(t => mapStatus(t.status) === 'en_cours').length
    const resolvedTickets = tickets.filter(t => mapStatus(t.status) === 'resolu').length

    // Calculer les pourcentages de changement (simulés pour l'exemple)
    // Dans un vrai projet, vous compareriez avec les données du mois précédent
    const percentageChange = {
      total: Math.floor(Math.random() * 20) - 10, // -10 à +10
      waiting: Math.floor(Math.random() * 30) - 15, // -15 à +15
      inProgress: Math.floor(Math.random() * 20) - 10, // -10 à +10
      resolved: Math.floor(Math.random() * 25) - 5 // -5 à +20
    }

    setDashboardStats({
      totalTickets,
      waitingTickets,
      inProgressTickets,
      resolvedTickets,
      percentageChange
    })
  }

  // Calculer les tendances des tickets (derniers 7 jours)
  const calculateTicketTrends = (tickets: Ticket[]) => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    const today = new Date()
    const trends: TicketTrend[] = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      const dayName = days[date.getDay()]
      const dayTickets = tickets.filter(ticket => {
        const ticketDate = new Date(ticket.createdAt)
        return ticketDate.toDateString() === date.toDateString()
      }).length

      trends.push({
        name: dayName,
        tickets: dayTickets
      })
    }

    setTicketTrends(trends)
  }

  // Calculer les tickets par catégorie
  const calculateTicketsByCategory = (tickets: Ticket[]) => {
    const categories = tickets.reduce((acc, ticket) => {
      const category = mapCategory(ticket.category)
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const categoryData = Object.entries(categories).map(([category, count]) => ({
      category,
      count
    }))

    setTicketsByCategory(categoryData)
  }

  // Calculer les tickets prioritaires
  const calculatePriorityTickets = (tickets: Ticket[]) => {
    const priorityTickets = tickets
      .filter(ticket => 
        ticket.urgency.toLowerCase() === 'high' || 
        ticket.urgency.toLowerCase() === 'critical'
      )
      .sort((a, b) => {
        // Trier par urgence (critique en premier) puis par date
        if (a.urgency !== b.urgency) {
          return a.urgency.toLowerCase() === 'critical' ? -1 : 1
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })
      .slice(0, 3) // Prendre les 3 premiers

    setPriorityTickets(priorityTickets)
  }

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Il y a moins d\'une heure'
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`
    }
  }

  // Fonction pour recharger les données
  const refreshData = async () => {
    try {
      const response = await fetch('/api/tickets')
      if (response.ok) {
        const data: TicketsResponse = await response.json()
        setTickets(data.tickets)
        calculateDashboardStats(data.tickets)
        calculateTicketTrends(data.tickets)
        calculateTicketsByCategory(data.tickets)
        calculatePriorityTickets(data.tickets)
      }
    } catch (err) {
      console.error('Erreur lors du rechargement des données:', err)
    }
  }

  // Écouter les événements de nouveaux tickets
  useEffect(() => {
    const handleNewTicket = () => {
      refreshData()
    }

    window.addEventListener('newTicket', handleNewTicket)
    
    return () => {
      window.removeEventListener('newTicket', handleNewTicket)
    }
  }, [])

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Chargement du dashboard...</span>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Erreur</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={refreshData}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        

        {/* Ticket Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#b60101]">{dashboardStats.totalTickets}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.percentageChange.total > 0 ? '+' : ''}{dashboardStats.percentageChange.total}% du mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attente</CardTitle>
              <Clock className="h-4 w-4 text-[#f59e0b]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#f59e0b]">{dashboardStats.waitingTickets}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.percentageChange.waiting > 0 ? '+' : ''}{dashboardStats.percentageChange.waiting}% du mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En cours</CardTitle>
              <AlertCircle className="h-4 w-4 text-[#3b82f6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#3b82f6]">{dashboardStats.inProgressTickets}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.percentageChange.inProgress > 0 ? '+' : ''}{dashboardStats.percentageChange.inProgress}% du mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolu</CardTitle>
              <CheckCircle className="h-4 w-4 text-[#10b981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#10b981]">{dashboardStats.resolvedTickets}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.percentageChange.resolved > 0 ? '+' : ''}{dashboardStats.percentageChange.resolved}% du mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tendances Ticket</CardTitle>
              <CardDescription>Soumissions quotidiennes de tickets au cours de la semaine dernière</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    tickets: {
                      label: "Tickets",
                      color: "hsl(0, 98%, 36%)",
                    },
                  }}
                >
                  <LineChart
                    data={ticketTrends}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="name" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                    <Line
                      type="monotone"
                      dataKey="tickets"
                      strokeWidth={2}
                      activeDot={{
                        r: 6,
                        style: { fill: "hsl(0, 98%, 36%)" },
                      }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tickets par Categorie</CardTitle>
              <CardDescription>Répartition des tickets selon les catégories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    count: {
                      label: "Count",
                      color: "hsl(217, 91%, 60%)",
                    },
                  }}
                >
                  <BarChart
                    data={ticketsByCategory}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 20,
                    }}
                    layout="vertical"
                  >
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Priorité Tickets</CardTitle>
            <CardDescription>Tickets nécessitant une attention immédiate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityTickets.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucun ticket prioritaire en attente</p>
                </div>
              ) : (
                priorityTickets.map((ticket) => (
                  <div key={ticket.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full p-2 ${
                          ticket.urgency.toLowerCase() === 'critical' 
                            ? 'bg-red-100 dark:bg-red-900' 
                            : 'bg-orange-100 dark:bg-orange-900'
                        }`}>
                          <AlertCircle className={`h-4 w-4 ${
                            ticket.urgency.toLowerCase() === 'critical' 
                              ? 'text-[#b60101]' 
                              : 'text-[#f59e0b]'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{ticket.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Ticket #{ticket.id.slice(0, 8)} • Ouvert {formatDate(ticket.createdAt)}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        ticket.urgency.toLowerCase() === 'critical'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      }`}>
                        {mapUrgency(ticket.urgency)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm">{ticket.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {ticket.author.name} • {mapCategory(ticket.category)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs text-[#024b94] hover:underline">
                          {ticket.assignee ? 'Réassigner' : 'Assigner'}
                        </button>
                        <button className="text-xs text-[#024b94] hover:underline">Voir Details</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}