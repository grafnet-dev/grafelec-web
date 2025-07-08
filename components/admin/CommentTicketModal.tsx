"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  MessageCircle,
  Loader2,
  Send,
  User,
  Clock,
  Shield,
  AlertCircle,
  FileText,
  Calendar,
  Tag,
  AlertTriangle,
  UserCheck,
  Mail,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

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

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isInternal: boolean;
  author: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
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

interface CommentTicketModalProps {
  ticket: Ticket;
  trigger?: React.ReactNode;
  onCommentAdded?: () => void;
  currentUser?: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
  };
}

const commentFormSchema = z.object({
  content: z.string().min(5, {
    message: "Le commentaire doit contenir au moins 5 caractères.",
  }),
  isInternal: z.boolean().default(false).optional(),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

export default function CommentTicketModal({
  ticket,
  trigger,
  onCommentAdded,
  currentUser,
}: CommentTicketModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
      isInternal: false,
    },
  });

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) {
      return "À l'instant";
    } else if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      return `Il y a ${Math.floor(diffInMinutes / 60)} h`;
    } else {
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  // Fonction pour formater la date complète
  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Récupérer les commentaires via API
  const fetchComments = async () => {
    setLoadingComments(true);
    setError(null);
    try {
      const response = await fetch(`/api/tickets/${ticket.id}/comments`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la récupération des commentaires"
        );
      }

      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Erreur:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de la récupération des commentaires";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingComments(false);
    }
  };

  // Ajouter un commentaire via API
  const onSubmit = async (values: CommentFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`/api/tickets/${ticket.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de l'ajout du commentaire"
        );
      }

      const data = await response.json();
      setComments((prev) => [...prev, data.comment]);
      form.reset();
      onCommentAdded?.();
      toast.success("Commentaire ajouté avec succès");

      // Passer automatiquement à l'onglet commentaires après ajout
      setActiveTab("comments");
    } catch (error) {
      console.error("Erreur:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de l'ajout du commentaire";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Récupérer les commentaires quand la modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, ticket.id]);

  // Réinitialiser le formulaire quand la modal se ferme
  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setError(null);
      setActiveTab("details");
    }
  }, [isOpen, form]);

  // Fonction pour obtenir les initiales
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  
  // Supprimer un commentaire
const deleteComment = async (commentId: string) => {
  try {
    const response = await fetch(`/api/tickets/${ticket.id}/comments/${commentId}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erreur lors de la suppression du commentaire')
    }
    
    // Retirer le commentaire de la liste locale
    setComments(prev => prev.filter(comment => comment.id !== commentId))
    onCommentAdded?.();
    toast.success("Commentaire supprimé avec succès")
  } catch (error) {
    console.error('Erreur:', error)
    const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression du commentaire"
    toast.error(errorMessage)
  }
}

  // Fonction pour obtenir la couleur du badge selon l'urgence
  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Fonction pour obtenir le libellé de l'urgence
  const getUrgencyLabel = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "low":
        return "Faible";
      case "medium":
        return "Moyenne";
      case "high":
        return "Élevée";
      case "critical":
        return "Critique";
      default:
        return urgency;
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "Ouvert";
      case "in_progress":
        return "En cours";
      case "resolved":
        return "Résolu";
      case "closed":
        return "Fermé";
      default:
        return status;
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

  // Vérifier si l'utilisateur est admin
  const isAdmin = currentUser?.role === "ADMIN";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Commentaires</span>
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
              {ticket._count.comments}
            </Badge>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-full max-w-5xl h-[90vh] max-h-[800px] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="p-4 pb-0 border-b">
          <DialogTitle className="text-xl font-bold text-left line-clamp-2 text-[#b60101]">
            {ticket.title}
          </DialogTitle>
          {/*  
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Hash className="h-4 w-4" />
            <span>ID: {ticket.id}</span>
          </div>
          */}
        </DialogHeader>

        {/* Afficher les erreurs */}
        {error && (
          <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex-1 min-h-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-2  mt-4">
              <TabsTrigger value="details" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Détails</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Commentaires</span>
                <Badge
                  variant="secondary"
                  className="ml-1 px-1.5 py-0.5 text-xs"
                >
                  {comments.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {/* Onglet Détails */}
            <TabsContent
              value="details"
              className="flex-1 m-0 p-4 overflow-hidden"
            >
              <ScrollArea className="h-full">
                <div className="space-y-6">
                  {/* Informations générales */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Informations générales
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Tag className="h-4 w-4" />
                            Catégorie
                          </div>
                          <p className="text-sm bg-gray-50 px-3 py-2 rounded-md">
                            {mapCategory(ticket.category)}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <AlertTriangle className="h-4 w-4" />
                            Urgence
                          </div>
                          <Badge
                            variant="outline"
                            className={`${getUrgencyColor(
                              ticket.urgency
                            )} w-fit`}
                          >
                            {getUrgencyLabel(ticket.urgency)}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Shield className="h-4 w-4" />
                            Statut
                          </div>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(ticket.status)} w-fit`}
                          >
                            {getStatusLabel(ticket.status)}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Calendar className="h-4 w-4" />
                            Créé le
                          </div>
                          <p className="text-sm bg-gray-50 px-3 py-2 rounded-md">
                            {formatFullDate(ticket.createdAt)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personnes impliquées */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personnes impliquées
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Auteur */}
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={ticket.author.image} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {getInitials(ticket.author.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">
                              {ticket.author.name}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              Auteur
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Mail className="h-3 w-3" />
                            {ticket.author.email}
                          </div>
                        </div>
                      </div>

                      {/* Assigné */}
                      {ticket.assignee ? (
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={ticket.assignee.image} />
                            <AvatarFallback className="bg-green-100 text-green-700">
                              {getInitials(ticket.assignee.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">
                                {ticket.assignee.name}
                              </p>
                              <Badge variant="secondary" className="text-xs">
                                Assigné
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Mail className="h-3 w-3" />
                              {ticket.assignee.email}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Non assigné</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {ticket.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Onglet Commentaires */}
            <TabsContent
              value="comments"
              className="flex-1 m-0 flex flex-col overflow-hidden"
            >
              {/* Liste des commentaires */}
              <div className="flex-1 min-h-0 px-4">
                <ScrollArea className="h-full">
                  {loadingComments ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-blue-600" />
                        <p className="text-sm text-muted-foreground">
                          Chargement des commentaires...
                        </p>
                      </div>
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                        <MessageCircle className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium mb-1">
                        Aucun commentaire
                      </p>
                      <p className="text-sm text-gray-500">
                        Soyez le premier à commenter ce ticket
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 py-4">
                      {comments.map((comment, index) => {
                        // Vérifier si l'utilisateur peut supprimer ce commentaire
                        const canDelete =
                          isAdmin || currentUser?.id === comment.author.id;

                        return (
                          <div key={comment.id} className="group">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                                <AvatarImage src={comment.author.image} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 text-2xs">
                                  {getInitials(comment.author.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                                  <span className="font-medium text-sm text-gray-900">
                                    {comment.author.name}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    {comment.isInternal && (
                                      <Badge
                                        variant="secondary"
                                        className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700"
                                      >
                                        <Shield className="h-3 w-3 mr-1" />
                                        Interne
                                      </Badge>
                                    )}
                                    <span className="text-xs text-muted-foreror flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {formatDate(comment.createdAt)}
                                    </span>
                                  </div>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm group-hover:shadow-md transition-shadow relative">
                                  {canDelete && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => deleteComment(comment.id)}
                                      className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-opacity"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                                    {comment.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {index < comments.length - 1 && (
                              <div className="ml-11 mt-4">
                                <Separator className="bg-gray-100" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
              </div>

              {/* Formulaire d'ajout de commentaire */}
              <div className="border-t bg-white p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Écrivez votre commentaire..."
                      className="min-h-[80px] resize-none border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                      value={form.watch("content")}
                      onChange={(e) => form.setValue("content", e.target.value)}
                    />
                    {form.formState.errors.content && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.content.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {isAdmin && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={form.watch("isInternal")}
                          onCheckedChange={(checked) =>
                            form.setValue("isInternal", !!checked)
                          }
                        />
                        <label className="text-sm font-normal cursor-pointer">
                          Commentaire interne
                        </label>
                      </div>
                    )}

                    <div className="flex gap-2 sm:ml-auto">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 sm:flex-none"
                      >
                        Fermer
                      </Button>
                      <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Envoi...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Envoyer
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
