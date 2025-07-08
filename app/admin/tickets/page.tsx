"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ViewTicketModal } from "@/components/admin/ViewTicketModal";
import { EditTicketModal } from "@/components/admin/EditTicketModal";
import CommentTicketModal  from "@/components/admin/CommentTicketModal"; // Import du nouveau composant
import { useSession } from "@/lib/auth-client";


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
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Pencil,
  MessageCircle,
  Search,
  User,
  Loader2,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Types pour les données de tickets
interface TicketAuthor {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface TicketAssignee {
  id: string;
  name: string;
  email: string;
  image?: string;
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
  author: TicketAuthor;
  assignee?: TicketAssignee;
  _count: {
    comments: number;
  };
}

interface TicketsResponse {
  tickets: Ticket[];
  count: number;
}

type SimplifiedUser = {
  id: string;
  name: string;
  email: string;
 image?: string;
  role: "ADMIN" | "USER";
}



export default function AdminTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [assignedFilter, setAssignedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<SimplifiedUser | undefined>(undefined);
  const itemsPerPage = 6;

useEffect(() => {
  if (session?.user) {
   setCurrentUser({
  id: session.user.id,
  name: session.user.name,
  email: session.user.email,
  role: session.user.role
});
}
}, [session]);
   
 // Créer une fonction helper pour afficher le nom de l'assigné
const getAssigneeDisplayName = (assignee: TicketAssignee | undefined) => {
  if (!assignee || !currentUser) return null;
  return assignee.id === currentUser.id ? "Vous" : assignee.name;
};


  // Récupérer les tickets depuis l'API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/tickets");

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des tickets");
        }

        const data: TicketsResponse = await response.json();
        setTickets(data.tickets);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Fonction pour mapper les statuts de la DB vers l'affichage
  const mapStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "attente";
      case "in_progress":
        return "en_cours";
      case "resolved":
        return "resolu";
      default:
        return status.toLowerCase();
    }
  };

  // Fonction pour mapper les urgences de la DB vers l'affichage
  const mapUrgency = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "low":
        return "low";
      case "medium":
        return "medium";
      case "high":
        return "high";
      case "critical":
        return "critical";
      default:
        return urgency.toLowerCase();
    }
  };

  // Fonction pour mapper les catégories de la DB vers l'affichage
  const mapCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "hardware":
        return "Materiel";
      case "software":
        return "Logiciel";
      case "network":
        return "Reseau";
      case "account":
        return "Compte";
      case "other":
        return "Autres";
      default:
        return category;
    }
  };

  // Filter and sort tickets
  const filteredTickets = tickets
    .filter((ticket) => {
      const mappedStatus = mapStatus(ticket.status);
      const mappedCategory = mapCategory(ticket.category);

      const matchesSearch =
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.author.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || mappedStatus === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || mappedCategory === categoryFilter;
      const matchesAssigned =
        assignedFilter === "all" ||
        (assignedFilter === "non_assigné" && !ticket.assignee) ||
        (assignedFilter !== "non_assigné" &&
          ticket.assignee?.name
            .toLowerCase()
            .includes(assignedFilter.toLowerCase()));

      return (
        matchesSearch && matchesStatus && matchesCategory && matchesAssigned
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "ancien":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "urgent":
          const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          const aUrgency = mapUrgency(a.urgency) as keyof typeof urgencyOrder;
          const bUrgency = mapUrgency(b.urgency) as keyof typeof urgencyOrder;
          return urgencyOrder[bUrgency] - urgencyOrder[aUrgency];
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  // Reset pagination when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    switch (filterType) {
      case "status":
        setStatusFilter(value);
        break;
      case "category":
        setCategoryFilter(value);
        break;
      case "assigned":
        setAssignedFilter(value);
        break;
      case "sort":
        setSortBy(value);
        break;
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    const mappedStatus = mapStatus(status);
    switch (mappedStatus) {
      case "attente":
        return (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-[#f59e0b]" />
            <span className="text-xs font-medium text-[#f59e0b]">Attente</span>
          </div>
        );
      case "en_cours":
        return (
          <div className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-[#3b82f6]" />
            <span className="text-xs font-medium text-[#3b82f6]">En cours</span>
          </div>
        );
      case "resolu":
        return (
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-[#10b981]" />
            <span className="text-xs font-medium text-[#10b981]">Résolu</span>
          </div>
        );
      default:
        return null;
    }
  };

 

  // Function to render urgency badge
  const renderUrgencyBadge = (urgency: string) => {
    const mappedUrgency = mapUrgency(urgency);
    switch (mappedUrgency) {
      case "low":
        return (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Faible
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Moyen
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            Élevé
          </span>
        );
      case "critical":
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
            Critique
          </span>
        );
      default:
        return null;
    }
  };

  // Fonction pour recharger les tickets
  const refreshTickets = async () => {
    try {
      const response = await fetch("/api/tickets");
      if (response.ok) {
        const data: TicketsResponse = await response.json();
        setTickets(data.tickets);
      }
    } catch (err) {
      console.error("Erreur lors du rechargement des tickets:", err);
    }
  };

  // Fonction callback pour rafraîchir les données après un nouveau commentaire
  const handleCommentAdded = () => {
    refreshTickets();
  };

  const handleTicketUpdated = () => {
    refreshTickets();
  };
  

  // Écouter les événements de nouveaux tickets
  useEffect(() => {
    const handleNewTicket = () => {
      refreshTickets();
    };

    // Écouter les événements personnalisés
    window.addEventListener("newTicket", handleNewTicket);

    return () => {
      window.removeEventListener("newTicket", handleNewTicket);
    };
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Gestion des tickets
          </h1>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher tickets par ID, titre, utilisateur..."
              className="pl-8 w-full md:w-[350px]"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              value={statusFilter}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="attente">Attente</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="resolu">Résolu</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={categoryFilter}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="Materiel">Matériel</SelectItem>
                <SelectItem value="Logiciel">Logiciel</SelectItem>
                <SelectItem value="Reseau">Réseau</SelectItem>
                <SelectItem value="Compte">Compte</SelectItem>
                <SelectItem value="Autres">Autres</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={assignedFilter}
              onValueChange={(value) => handleFilterChange("assigned", value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Assigné à" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les admins</SelectItem>
                <SelectItem value="non_assigné">Non assigné</SelectItem>
                {Array.from(
                  new Set(tickets.map((t) => t.assignee?.name).filter(Boolean))
                ).map((name) => (
                  <SelectItem key={name} value={name!.toLowerCase()}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value) => handleFilterChange("sort", value)}
            >
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

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Chargement des tickets...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h2 className="text-lg font-semibold mb-2">Erreur</h2>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={() => refreshTickets()}>Réessayer</Button>
                </div>
              </div>
            ) : currentTickets.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Aucun ticket trouvé</p>
              </div>
            ) : (
              <>
                {/* Vue desktop - cachée sur mobile et tablette */}
                <div className="hidden xl:block overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Titre</TableHead>
                        <TableHead className="w-[120px]">Utilisateur</TableHead>
                        <TableHead className="w-[100px]">Catégorie</TableHead>
                        <TableHead className="w-[100px]">Créé</TableHead>
                        <TableHead className="w-[100px]">Statut</TableHead>
                        <TableHead className="w-[120px]">
                          Niveau d'urgence
                        </TableHead>
                        <TableHead className="w-[120px]">Assigné à</TableHead>
                        <TableHead className="w-[80px]">Commentaires</TableHead>
                        <TableHead className="w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">
                            {ticket.title}
                          </TableCell>
                          <TableCell className="text-sm">
                            {ticket.author.name}
                          </TableCell>
                          <TableCell>{mapCategory(ticket.category)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(ticket.createdAt)}
                          </TableCell>
                          <TableCell>
                            {renderStatusBadge(ticket.status)}
                          </TableCell>
                          <TableCell>
                            {renderUrgencyBadge(ticket.urgency)}
                          </TableCell>
                          <TableCell>
                            {!ticket.assignee ? (
                              <span className="text-muted-foreground text-sm">
                                Non assigné
                              </span>
                            ) : (
                              <span className="text-sm">
                                {getAssigneeDisplayName(ticket.assignee)}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {ticket._count.comments}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <ViewTicketModal ticket={ticket} />
                              <EditTicketModal  onTicketUpdated={handleTicketUpdated} ticket={ticket} />
                              <CommentTicketModal 
                                ticket={ticket}
                                currentUser={currentUser}
                                onCommentAdded={handleCommentAdded}
                                trigger={
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="sr-only">Commenter</span>
                                  </Button>
                                }
                              />
                              
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Vue tablette - affichée uniquement sur tablette */}
                <div className="hidden md:block xl:hidden overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[90px]">ID</TableHead>
                        <TableHead className="min-w-[200px]">
                          Titre / Utilisateur
                        </TableHead>
                        <TableHead className="w-[100px]">Statut</TableHead>
                        <TableHead className="w-[100px]">Urgence</TableHead>
                        <TableHead className="w-[120px]">Assigné</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-mono text-sm">
                            {ticket.id.slice(0, 8)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm leading-tight">
                                {ticket.title}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Par {ticket.author.name} •{" "}
                                {mapCategory(ticket.category)} •{" "}
                                {formatDate(ticket.createdAt)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {renderStatusBadge(ticket.status)}
                          </TableCell>
                          <TableCell>
                            {renderUrgencyBadge(ticket.urgency)}
                          </TableCell>
                          <TableCell>
                            {!ticket.assignee ? (
                              <span className="text-muted-foreground text-xs">
                                Non assigné
                              </span>
                            ) : (
                              <span className="text-xs">
                                {getAssigneeDisplayName(ticket.assignee)}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <ViewTicketModal ticket={ticket} />
                              <EditTicketModal onTicketUpdated={handleTicketUpdated}  ticket={ticket} />
                              <CommentTicketModal 
                                ticket={ticket}
                                currentUser={currentUser}
                                onCommentAdded={handleCommentAdded}
                                trigger={
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                  >
                                    <MessageCircle className="h-3 w-3" />
                                    <span className="sr-only">Commenter</span>
                                  </Button>
                                }
                              />
                              
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
                    {currentTickets.map((ticket) => (
                      <div key={ticket.id} className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-xs text-muted-foreground mb-1">
                              {ticket.id.slice(0, 8)}
                            </div>
                            <h3 className="font-medium text-sm leading-tight">
                              {ticket.title}
                            </h3>
                            <div className="text-xs text-muted-foreground mt-1">
                              Par {ticket.author.name}
                            </div>
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
                              {mapCategory(ticket.category)}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Créé:</span>
                            <div className="font-medium">
                              {formatDate(ticket.createdAt)}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">
                              Statut:
                            </span>
                            <div className="mt-1">
                              {renderStatusBadge(ticket.status)}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Assigné à:
                            </span>
                            <div className="font-medium mt-1">
                              {!ticket.assignee ? (
                                <span className="text-muted-foreground">
                                  Non assigné
                                </span>
                              ) : (
                                getAssigneeDisplayName(ticket.assignee)
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <ViewTicketModal ticket={ticket} />
                          <EditTicketModal onTicketUpdated={handleTicketUpdated} ticket={ticket} />
                          <CommentTicketModal 
                            ticket={ticket}
                            currentUser={currentUser}
                            onCommentAdded={handleCommentAdded}
                            trigger={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MessageCircle className="h-4 w-4" />
                                <span className="sr-only">Commenter</span>
                              </Button>
                            }
                          />
                       
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent className="flex-wrap gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={`${
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    } text-xs sm:text-sm`}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    const showOnMobile =
                      page === 1 || page === totalPages || page === currentPage;
                    const showOnDesktop =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1);

                    if (showOnDesktop) {
                      return (
                        <PaginationItem
                          key={page}
                          className={`${
                            !showOnMobile ? "hidden sm:block" : ""
                          }`}
                        >
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={currentPage === page}
                            className="text-xs sm:text-sm"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page} className="hidden sm:block">
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  }
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={`${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    } text-xs sm:text-sm`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Results Info */}
        <div className="text-xs sm:text-sm text-muted-foreground text-center px-4">
          Affichage {startIndex + 1} à{" "}
          {Math.min(endIndex, filteredTickets.length)} sur{" "}
          {filteredTickets.length} ticket{filteredTickets.length > 1 ? "s" : ""}
        </div>
      </div>
    </AdminLayout>
  );
}