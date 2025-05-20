"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Send, CheckCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

// Définition de l'interface pour les offres d'emploi
interface JobOpening {
  id: number | string; // Modifié pour accepter les deux types d'ID
  title: string;
  department?: string;
  location?: string;
  type?: string;
  remote?: string;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  featured?: boolean;
}

// Schéma de validation du formulaire de candidature
const applicationSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().optional(),
  position: z.string().min(1, { message: "Veuillez sélectionner un poste" }),
  experience: z.string().min(1, { message: "Veuillez sélectionner votre niveau d'expérience" }),
  portfolio: z.string().optional(),
  linkedin: z.string().optional(),
  // Notez que nous n'avons pas de validation pour les fichiers ici car ils seront gérés séparément
})

// Type pour les valeurs du formulaire
type ApplicationFormValues = z.infer<typeof applicationSchema>;

// Niveaux d'expérience
const experienceLevels = [
  { value: "junior", label: "Junior (0-2 ans)" },
  { value: "intermediaire", label: "Intermédiaire (3-5 ans)" },
  { value: "senior", label: "Senior (6-10 ans)" },
  { value: "expert", label: "Expert (10+ ans)" },
]

interface ApplicationFormProps {
  jobOpenings: JobOpening[];
}

export default function ApplicationForm({ jobOpenings }: ApplicationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)

  // Initialisation du formulaire
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      portfolio: "",
      linkedin: "",
    },
  })

  // Gestion des fichiers
  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  }

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverLetterFile(e.target.files[0]);
    }
  }

  // Soumission du formulaire
  function onSubmit(values: ApplicationFormValues) {
    console.log(values)
    console.log("CV:", cvFile)
    console.log("Lettre de motivation:", coverLetterFile)
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <section id="application-form" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1459a6]">Postulez Maintenant</h2>
            <p className="text-gray-600">
              {"Remplissez le formulaire ci-dessous pour postuler à l'une de nos offres ou envoyer une candidature"}
              spontanée.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              {!isSubmitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="votre@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone (optionnel)</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre numéro" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poste visé</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un poste" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Candidature spontanée">Candidature spontanée</SelectItem>
                                {jobOpenings.map((job) => (
                                  <SelectItem key={job.id.toString()} value={job.title}>
                                    {job.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{"Niveau d'expérience"}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="votre niveau d'expérience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {experienceLevels.map((level) => (
                                <SelectItem key={level.value} value={level.value}>
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="portfolio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio / Site web (optionnel)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://votre-portfolio.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profil LinkedIn (optionnel)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/in/votre-profil" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Section d'upload de fichiers */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Upload de CV */}
                      <div className="space-y-2">
                        <Label htmlFor="cv-upload" className="font-medium">CV (PDF, Word)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="h-6 w-6 text-gray-400" />
                            <p className="text-sm text-gray-500 text-center">
                              {cvFile ? cvFile.name : "Glissez votre CV ou cliquez pour sélectionner"}
                            </p>
                            <Input 
                              id="cv-upload" 
                              type="file" 
                              accept=".pdf,.doc,.docx" 
                              className="hidden" 
                              onChange={handleCvChange}
                              required
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => document.getElementById('cv-upload')?.click()}
                            >
                              Sélectionner un fichier
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Upload de lettre de motivation */}
                      <div className="space-y-2">
                        <Label htmlFor="cover-letter-upload" className="font-medium">Lettre de motivation (PDF, Word)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="h-6 w-6 text-gray-400" />
                            <p className="text-sm text-gray-500 text-center">
                              {coverLetterFile ? coverLetterFile.name : "Glissez votre lettre ou cliquez pour sélectionner"}
                            </p>
                            <Input 
                              id="cover-letter-upload" 
                              type="file" 
                              accept=".pdf,.doc,.docx" 
                              className="hidden" 
                              onChange={handleCoverLetterChange}
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => document.getElementById('cover-letter-upload')?.click()}
                            >
                              Sélectionner un fichier
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <Button type="submit" className="w-full bg-[#1459a6] hover:bg-[#1459a6]/90">
                      <Send className="mr-2 h-4 w-4" /> Envoyer ma candidature
                    </Button>
                  </form>
                </Form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="bg-green-100 rounded-full p-4 mb-6">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-[#1459a6] text-center">Candidature envoyée !</h2>
                  <p className="text-gray-600 text-center mb-8 max-w-md">
                    {"Merci pour votre candidature. Notre équipe RH l'examinera dans les plus brefs délais et vous"}
                    contactera pour la suite du processus.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      form.reset()
                      setCvFile(null)
                      setCoverLetterFile(null)
                    }}
                    className="bg-[#1459a6] hover:bg-[#1459a6]/90"
                  >
                    Envoyer une autre candidature
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
//Niveau