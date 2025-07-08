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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Plus, Upload } from "lucide-react"
import { toast } from "sonner" // ou votre système de toast
import { useSession } from '@/lib/auth-client' // better-auth client

const ticketFormSchema = z.object({
  title: z.string().min(5, {
    message: "Le titre doit contenir au moins 5 caractères.",
  }),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  urgency: z.string({
    required_error: "Veuillez sélectionner un niveau d'urgence.",
  }),
})

type TicketFormValues = z.infer<typeof ticketFormSchema>

// Mapping des valeurs du formulaire vers les enums de la DB
const categoryMapping = {
  'hardware': 'HARDWARE',
  'software': 'SOFTWARE',
  'network': 'NETWORK',
  'account': 'ACCOUNT',
  'other': 'OTHER'
} as const

const urgencyMapping = {
  'low': 'LOW',
  'medium': 'MEDIUM',
  'high': 'HIGH',
  'critical': 'CRITICAL'
} as const

export function TicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const { data: session } = useSession()

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments(prev => [...prev, ...files])
  }

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    // Implémentez votre logique d'upload ici
    // Par exemple avec un service comme Cloudinary, AWS S3, etc.
    // Pour l'instant, on retourne un tableau vide
    const uploadPromises = files.map(async (file) => {
      // Simuler un upload
      const formData = new FormData()
      formData.append('file', file)
      
      // Remplacez par votre endpoint d'upload
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // })
      // const { url } = await response.json()
      // return url
      
      // Pour l'instant, retourner un placeholder
      return `placeholder-url-${file.name}`
    })
    
    return Promise.all(uploadPromises)
  }

  async function onSubmit(data: TicketFormValues) {
    if (!session?.user) {
      toast.error('Vous devez être connecté pour créer un ticket')
      return
    }

    setIsSubmitting(true)

    try {
      // Upload des fichiers si nécessaire
      let attachmentUrls: string[] = []
      if (attachments.length > 0) {
        attachmentUrls = await uploadFiles(attachments)
      }

      // Mapper les valeurs vers les enums de la DB
      const payload = {
        title: data.title,
        description: data.description,
        category: categoryMapping[data.category as keyof typeof categoryMapping],
        urgency: urgencyMapping[data.urgency as keyof typeof urgencyMapping],
        attachments: attachmentUrls
      }

      // Envoyer à l'API
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include', // Important pour better-auth
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la création du ticket')
      }

      const result = await response.json()
      
      // Succès
      window.dispatchEvent(new CustomEvent('newTicket'));
      toast.success('Ticket créé avec succès!')
      setIsOpen(false)
      form.reset() 
      setAttachments([])
      
      // Optionnel: rafraîchir la liste des tickets ou rediriger
      // window.location.reload() // ou utiliser votre state management

    } catch (error) {
      console.error('Erreur:', error)
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#024b94] hover:bg-[#024b94]/90 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> 
          <span className="hidden sm:inline">Nouveau Ticket</span>
          <span className="sm:hidden">Nouveau</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[550px] max-h-[95vh] sm:max-h-[85vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
          <DialogTitle className="text-lg sm:text-xl">Créer un Nouveau Ticket</DialogTitle>
          <DialogDescription className="text-sm">
            Remplissez le formulaire ci-dessous pour soumettre un nouveau ticket d'assistance.
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1 px-4 sm:px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 pb-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Titre</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Brève description du problème" 
                        className="w-full text-sm sm:text-base"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-xs sm:text-sm">
                      Fournissez un titre clair et concis pour votre ticket.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full text-sm sm:text-base">
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hardware">Matériel</SelectItem>
                        <SelectItem value="software">Logiciel</SelectItem>
                        <SelectItem value="network">Réseau</SelectItem>
                        <SelectItem value="account">Compte</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs sm:text-sm">
                      Sélectionnez la catégorie qui correspond le mieux à votre problème.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Description détaillée du problème" 
                        className="min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-xs sm:text-sm">
                      Fournissez autant de détails que possible sur le problème.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Niveau d'Urgence</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full text-sm sm:text-base">
                          <SelectValue placeholder="Sélectionnez le niveau d'urgence" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Faible</SelectItem>
                        <SelectItem value="medium">Moyen</SelectItem>
                        <SelectItem value="high">Élevé</SelectItem>
                        <SelectItem value="critical">Critique</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs sm:text-sm">
                      Sélectionnez le niveau d'urgence approprié pour votre problème.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel className="text-sm font-medium">Pièces Jointes</FormLabel>
                <div className="mt-2 flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-2 pb-2 sm:pt-5 sm:pb-6">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-gray-500 dark:text-gray-400" />
                      <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center px-2">
                        <span className="font-semibold">Cliquez pour télécharger</span>
                        <span className="hidden sm:inline"> ou glissez-déposez</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        PNG, JPG, PDF, DOC <span className="hidden sm:inline">(MAX. 10MB)</span>
                      </p>
                    </div>
                    <input 
                      id="dropzone-file" 
                      type="file" 
                      className="hidden" 
                      multiple 
                      onChange={handleFileChange}
                      accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                    />
                  </label>
                </div>
                {attachments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      {attachments.length} fichier(s) sélectionné(s)
                    </p>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </div>

        <DialogFooter className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 sm:p-6 border-t flex-col sm:flex-row gap-2 sm:gap-0">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            className="bg-[#024b94] hover:bg-[#024b94]/90 w-full sm:w-auto order-1 sm:order-2" 
            disabled={isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            <span className="text-sm">
              {isSubmitting ? "Envoi en cours..." : "Soumettre le Ticket"}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}