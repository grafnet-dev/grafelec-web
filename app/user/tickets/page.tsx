"use client";

import { useEffect, useState } from "react";
import { UserLayout } from "@/components/layout/user-layout";
import { TicketForm } from "@/components/tickets/ticket-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  attachments: string[];
  author: User;
  assignee: User | null;
  _count: {
    comments: number;
  };
}

interface TicketsResponse {
  tickets: Ticket[];
  count: number;
}

export default function UserTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/tickets");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des tickets");
        }
        const data: TicketsResponse = await response.json();
        setTickets(data.tickets);
        setFilteredTickets(data.tickets);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Fonction pour filtrer et trier les tickets
  useEffect(() => {
    let filtered = [...tickets];

    // Filtrage par recherche
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrage par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(ticket => {
        const translatedStatus = translateStatus(ticket.status);
        return translatedStatus === statusFilter;
      });
    }

    // Filtrage par catégorie
    if (categoryFilter !== "all") {
      filtered = filtered.filter(ticket => {
        const translatedCategory = translateCategory(ticket.category);
        return translatedCategory === categoryFilter;
      });
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "ancien":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "urgent":
          const urgencyOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
          return urgencyOrder[b.urgency as keyof typeof urgencyOrder] - urgencyOrder[a.urgency as keyof typeof urgencyOrder];
        default:
          return 0;
      }
    });

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter, categoryFilter, sortBy]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const translateStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      OPEN: "attente",
      IN_PROGRESS: "en_cours",
      CLOSED: "resolu",
    };
    return statusMap[status] || status.toLowerCase();
  };

  const translateCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      HARDWARE: "Materiel",
      SOFTWARE: "Logiciel",
      NETWORK: "Reseau",
      ACCOUNT: "Compte",
      OTHER: "Autres",
    };
    return categoryMap[category] || category;
  };

  const translateUrgency = (urgency: string) => {
    const urgencyMap: { [key: string]: string } = {
      LOW: "faible",
      MEDIUM: "moyen",
      HIGH: "elevé",
      CRITICAL: "critique",
    };
    return urgencyMap[urgency] || urgency.toLowerCase();
  };

  const renderStatusBadge = (status: string) => {
    const translatedStatus = translateStatus(status);
    const styles = {
      attente: {
        icon: <Clock className="h-3 w-3 text-[#f59e0b]" />,
        label: "Attente",
        color: "text-[#f59e0b]",
      },
      en_cours: {
        icon: <AlertCircle className="h-3 w-3 text-[#3b82f6]" />,
        label: "En cours",
        color: "text-[#3b82f6]",
      },
      resolu: {
        icon: <CheckCircle className="h-3 w-3 text-[#10b981]" />,
        label: "Resolu",
        color: "text-[#10b981]",
      },
    };
    const style = styles[translatedStatus as keyof typeof styles];
    return style ? (
      <div className="flex items-center gap-1">
        <>{style.icon}</>
        <span className={`text-xs font-medium ${style.color}`}>
          {style.label}
        </span>
      </div>
    ) : null;
  };

  const renderUrgencyBadge = (urgency: string) => {
    const translatedUrgency = translateUrgency(urgency);
    const classes = {
      faible: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      moyen:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      elevé:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      critique: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
          classes[translatedUrgency as keyof typeof classes]
        }`}
      >
        {translatedUrgency.charAt(0).toUpperCase() + translatedUrgency.slice(1)}
      </span>
    );
  };

  const truncateDescription = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Composant pour l'état de chargement du tableau
  const TableLoadingState = () => (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Chargement des tickets...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Composant pour l'état d'erreur du tableau
  const TableErrorState = () => (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Composant pour le contenu du tableau
  const TableContent = () => (
    <Card>
      <CardContent className="p-0">
        {/* Vue desktop - cachée sur mobile et tablette */}
        <div className="hidden lg:block overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Titre</TableHead>
                <TableHead className="min-w-[250px]">Description</TableHead>
                <TableHead className="w-[100px]">Catégorie</TableHead>
                <TableHead className="w-[120px]">Créé</TableHead>
                <TableHead className="w-[100px]">Statuts</TableHead>
                <TableHead className="w-[100px]">Urgence</TableHead>
                <TableHead className="w-[80px]">Réponses</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">
                    {ticket.title}
                  </TableCell>
                  <TableCell>
                    <div 
                      className="max-w-[250px] truncate text-sm text-muted-foreground"
                      title={ticket.description}
                    >
                      {truncateDescription(ticket.description, 80)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {translateCategory(ticket.category)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(ticket.createdAt)}
                  </TableCell>
                  <TableCell>
                    {renderStatusBadge(ticket.status)}
                  </TableCell>
                  <TableCell>
                    {renderUrgencyBadge(ticket.urgency)}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {ticket._count.comments}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Voir</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Vue tablette - affichée uniquement sur tablette */}
        <div className="hidden md:block lg:hidden overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">Titre</TableHead>
                <TableHead className="min-w-[180px]">Description</TableHead>
                <TableHead className="w-[100px]">Statuts</TableHead>
                <TableHead className="w-[90px]">Urgence</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">
                        {ticket.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {translateCategory(ticket.category)} •{" "}
                        {formatDate(ticket.createdAt)} •{" "}
                        {ticket._count.comments} réponses
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="truncate text-sm"
                      title={ticket.description}
                    >
                      {truncateDescription(ticket.description, 60)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderStatusBadge(ticket.status)}
                  </TableCell>
                  <TableCell>
                    {renderUrgencyBadge(ticket.urgency)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Eye className="h-3 w-3" />
                        <span className="sr-only">Voir</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Pencil className="h-3 w-3" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Vue mobile - affichée uniquement sur mobile */}
        <div className="block md:hidden">
          <div className="divide-y">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight">
                      {ticket.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {truncateDescription(ticket.description, 120)}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    {renderUrgencyBadge(ticket.urgency)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">
                      Catégorie:
                    </span>
                    <div className="font-medium">
                      {translateCategory(ticket.category)}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Créé:</span>
                    <div className="font-medium">
                      {formatDate(ticket.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Statuts:
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      {renderStatusBadge(ticket.status)}
                      <span className="text-xs text-muted-foreground">
                        • {ticket._count.comments} réponses
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Voir</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Modifier</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Fonction pour recharger les tickets
  const refreshTickets = async () => {
    try {
      const response = await fetch('/api/tickets')
      if (response.ok) {
        const data: TicketsResponse = await response.json()
        setTickets(data.tickets)
      }
    } catch (err) {
      console.error('Erreur lors du rechargement des tickets:', err)
    }
  }

  // Écouter les événements de nouveaux tickets
  useEffect(() => {
    const handleNewTicket = () => {
      refreshTickets()
    }

    // Écouter les événements personnalisés
    window.addEventListener('newTicket', handleNewTicket)
    
    return () => {
      window.removeEventListener('newTicket', handleNewTicket)
    }
  }, [])


  

  return (
    <UserLayout>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Mes Tickets
          </h1>
          <TicketForm/>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher tickets..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="attente">Attente</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="resolu">Résolu</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="Materiel">Matériel</SelectItem>
                <SelectItem value="Logiciel">Logiciel</SelectItem>
                <SelectItem value="Reseau">Réseau</SelectItem>
                <SelectItem value="Compte">Compte</SelectItem>
                <SelectItem value="Autres">Autres</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récent</SelectItem>
                <SelectItem value="ancien">Plus ancien</SelectItem>
                <SelectItem value="urgent">Plus urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="table" className="w-full">
          <TabsList className="mb-4 flex flex-wrap gap-2">
            <TabsTrigger value="table">Vue Tableau</TabsTrigger>
            <TabsTrigger value="cards">Vue Carte</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            {loading ? (
              <TableLoadingState />
            ) : error ? (
              <TableErrorState />
            ) : (
              <TableContent />
            )}
          </TabsContent>

          <TabsContent value="cards">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Chargement des tickets...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTickets.map((ticket) => (
                  <Card key={ticket.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-base">
                            {ticket.title}
                          </CardTitle>
                          <CardDescription>
                            {ticket._count.comments} réponses
                          </CardDescription>
                        </div>
                        {renderUrgencyBadge(ticket.urgency)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">
                          <p className="line-clamp-3" title={ticket.description}>
                            {ticket.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Catégorie:
                          </span>
                          <span>{translateCategory(ticket.category)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Créé:</span>
                          <span>{formatDate(ticket.createdAt)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Statuts:</span>
                          {renderStatusBadge(ticket.status)}
                        </div>
                       {/**
                        * <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            Voir Détails
                          </Button>
                        </div>
                        */} 
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
}