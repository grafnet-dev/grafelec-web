"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  AlertTriangle, 
  MessageSquare, 
  Clock,
  CheckCircle,
  AlertCircle,
  Paperclip
} from "lucide-react"

// Types
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

interface ViewTicketModalProps {
  ticket: Ticket;
  trigger?: React.ReactNode;
}

export function ViewTicketModal({ ticket, trigger }: ViewTicketModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Fonction pour mapper les statuts
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

  // Fonction pour mapper les urgences
  const mapUrgency = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "low":
        return "Faible";
      case "medium":
        return "Moyen";
      case "high":
        return "Élevé";
      case "critical":
        return "Critique";
      default:
        return urgency;
    }
  };

  // Fonction pour mapper les catégories
  const mapCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "hardware":
        return "Matériel";
      case "software":
        return "Logiciel";
      case "network":
        return "Réseau";
      case "account":
        return "Compte";
      case "other":
        return "Autres";
      default:
        return category;
    }
  };

  // Fonction pour rendre le badge de statut
  const renderStatusBadge = (status: string) => {
    const mappedStatus = mapStatus(status);
    switch (mappedStatus) {
      case "attente":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Attente
          </Badge>
        );
      case "en_cours":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            En cours
          </Badge>
        );
      case "resolu":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Résolu
          </Badge>
        );
      default:
        return null;
    }
  };

  // Fonction pour rendre le badge d'urgence
  const renderUrgencyBadge = (urgency: string) => {
    const mappedUrgency = mapUrgency(urgency);
    switch (urgency.toLowerCase()) {
      case "low":
        return (
          <Badge variant="outline" className="border-blue-200 text-blue-800 dark:border-blue-800 dark:text-blue-200">
            {mappedUrgency}
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-200 text-yellow-800 dark:border-yellow-800 dark:text-yellow-200">
            {mappedUrgency}
          </Badge>
        );
      case "high":
        return (
          <Badge variant="outline" className="border-orange-200 text-orange-800 dark:border-orange-800 dark:text-orange-200">
            {mappedUrgency}
          </Badge>
        );
      case "critical":
        return (
          <Badge variant="outline" className="border-red-200 text-red-800 dark:border-red-800 dark:text-red-200">
            {mappedUrgency}
          </Badge>
        );
      default:
        return null;
    }
  };

  const defaultTrigger = (
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <Eye className="h-4 w-4" />
      <span className="sr-only">Voir le ticket</span>
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[700px] max-h-[95vh] sm:max-h-[85vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 border-b">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg sm:text-xl font-semibold break-words text-[#b60101]">
                {ticket.title}
              </DialogTitle>
             
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              {renderStatusBadge(ticket.status)}
              {renderUrgencyBadge(ticket.urgency)}
            </div>
          </div>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1 px-4 sm:px-6 pb-4">
          <div className="space-y-4 sm:space-y-6 mt-4">
            {/* Informations principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Demandeur
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{ticket.author.name}</p>
                    <p className="text-xs text-muted-foreground">{ticket.author.email}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Assigné à
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {ticket.assignee ? (
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{ticket.assignee.name}</p>
                      <p className="text-xs text-muted-foreground">{ticket.assignee.email}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Non assigné</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Détails du ticket */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Catégorie
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm">{mapCategory(ticket.category)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Créé le
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm">{formatDate(ticket.createdAt)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-0">
                    <MessageSquare className="h-4 w-4" />
                    Commentaires
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm">{ticket._count.comments} commentaire(s)</p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {ticket.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pièces jointes (si nécessaire) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  Pièces jointes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Aucune pièce jointe</p>
              </CardContent>
            </Card> 

            {/* Historique */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Historique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Ticket créé</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(ticket.createdAt)} par {ticket.author.name}
                      </p>
                    </div>
                  </div>
                  {ticket.updatedAt !== ticket.createdAt && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Dernière mise à jour</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(ticket.updatedAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}