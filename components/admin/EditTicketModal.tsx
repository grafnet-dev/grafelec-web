"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Pencil, Loader2 } from "lucide-react"
import { toast } from "sonner"

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

interface EditTicketModalProps {
  ticket: Ticket;
  trigger?: React.ReactNode;
  onTicketUpdated?: (updatedTicket: Ticket) => void;
}

const editTicketFormSchema = z.object({
  status: z.string({
    required_error: "Veuillez sélectionner un statut.",
  }),
  assigneeId: z.string().optional(),
})

type EditTicketFormValues = z.infer<typeof editTicketFormSchema>

// Mapping des statuts
const statusMapping = {
  'attente': 'OPEN',
  'en_cours': 'IN_PROGRESS',
  'resolu': 'RESOLVED'
} as const

export function EditTicketModal({ ticket, trigger, onTicketUpdated }: EditTicketModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [admins, setAdmins] = useState<Array<{id: string, name: string, email: string}>>([])

  // Fonction pour mapper les statuts de la DB vers l'affichage
  const mapStatusFromDB = (status: string) => {
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

  // Fonction pour obtenir la couleur du badge selon l'urgence
  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Fonction pour obtenir le libellé de l'urgence
  const getUrgencyLabel = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'low':
        return 'Faible'
      case 'medium':
        return 'Moyenne'
      case 'high':
        return 'Élevée'
      case 'critical':
        return 'Critique'
      default:
        return urgency
    }
  }

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

  const form = useForm<EditTicketFormValues>({
    resolver: zodResolver(editTicketFormSchema),
    defaultValues: {
      status: mapStatusFromDB(ticket.status),
      assigneeId: ticket.assignee?.id || "",
    },
  })

  // Récupérer la liste des admins
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('/api/admins')
        if (response.ok) {
          const data = await response.json()
          setAdmins(data.admins || [])
        } else {
          console.error('Erreur lors de la récupération des admins:', response.status)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des admins:', error)
      }
    }

    if (isOpen) {
      fetchAdmins()
    }
  }, [isOpen])

  // Réinitialiser le formulaire quand le ticket change
  useEffect(() => {
    form.reset({
      status: mapStatusFromDB(ticket.status),
      assigneeId: ticket.assignee?.id || "",
    })
  }, [ticket, form])

  async function onSubmit(data: EditTicketFormValues) {
    setIsSubmitting(true)

    try {
      // Mapper les valeurs vers les enums de la DB
      const payload = {
        status: statusMapping[data.status as keyof typeof statusMapping],
        assigneeId: data.assigneeId && data.assigneeId !== "" ? data.assigneeId : null
      }

      // Envoyer à l'API
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la mise à jour du ticket')
      }

      const responseData = await response.json()
      const updatedTicket = responseData.ticket // Extraire le ticket de la réponse
      
      // Succès
      onTicketUpdated?.(updatedTicket);
      toast.success('Ticket mis à jour avec succès!')
      setIsOpen(false)
      
      // Callback pour mettre à jour la liste
      if (onTicketUpdated) {
        onTicketUpdated(updatedTicket)
      }
      
      // Émettre un événement pour rafraîchir la liste
      window.dispatchEvent(new CustomEvent('ticketUpdated'))

    } catch (error) {
      console.error('Erreur:', error)
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  const defaultTrigger = (
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <Pencil className="h-4 w-4" />
      <span className="sr-only">Modifier le ticket</span>
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[95vh] sm:max-h-[85vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
          <DialogTitle className="text-lg sm:text-xl text-[#024b94]">Modifier le Ticket</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1 px-4 sm:px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 pb-4">
              
              {/* Informations en lecture seule */}
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Informations du ticket
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Titre:</span>
                    <p className="font-medium break-words text-[#b60101]">{ticket.title}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Catégorie:</span>
                    <p className="font-medium">{mapCategory(ticket.category)}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <AlertTriangle className="h-4 w-4" />
                            Urgence
                          </div>
                          <Badge variant="outline" className={`${getUrgencyColor(ticket.urgency)} w-fit`}>
                            {getUrgencyLabel(ticket.urgency)}
                          </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Demandeur:</span>
                    <p className="font-medium">{ticket.author.name}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground text-sm">Description:</span>
                  <p className="text-sm mt-1 p-2 bg-white dark:bg-gray-800 rounded border">
                    {ticket.description}
                  </p>
                </div>
              </div>

              {/* Champs modifiables */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Paramètres modifiables</h3>
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Statut</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full text-sm sm:text-base">
                            <SelectValue placeholder="Sélectionnez un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="attente">Attente</SelectItem>
                          <SelectItem value="en_cours">En cours</SelectItem>
                          <SelectItem value="resolu">Résolu</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assigneeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Assigner à</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full text-sm sm:text-base">
                            <SelectValue placeholder="Sélectionnez un admin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="null">Non assigné</SelectItem>
                          {admins.map((admin) => (
                            <SelectItem key={admin.id} value={admin.id}>
                              {admin.name} ({admin.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <DialogFooter className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 m-4 sm:p-6 border-t flex-col sm:flex-row gap-2 sm:gap-0">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto order-2 sm:order-1 m-2"
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            className="bg-[#024b94] hover:bg-[#024b94]/90 w-full sm:w-auto order-1 sm:order-2 m-2" 
            disabled={isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mise à jour...
              </>
            ) : (
              "Mettre à jour"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}