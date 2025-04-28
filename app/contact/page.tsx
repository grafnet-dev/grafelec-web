"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Schéma de validation du formulaire
const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
  service: z.string().optional(),
})

// Informations de contact
const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6 text-[#be321d]" />,
    title: "Adresse",
    details: ["Avenue Houeyiho", "Cotonou, Bénin"],
  },
  {
    icon: <Phone className="h-6 w-6 text-[#be321d]" />,
    title: "Téléphone",
    details: ["+229 01 99 07 88 88", "+229 01 99 07 88 88"],
  },
  {
    icon: <Mail className="h-6 w-6 text-[#be321d]" />,
    title: "Email",
    details: ["contact@grafelecsarl.com", "support@grafelecsarl.com"],
  },
  {
    icon: <Clock className="h-6 w-6 text-[#be321d]" />,
    title: "Horaires",
    details: ["Lun-Ven: 8h00 - 18h00"],
  },
]

// Services
const services = [
  { value: "electrical", label: "Solutions Électriques" },
  { value: "smart-building", label: "Smart Building" },
  { value: "iot", label: "Mobilité et IoT" },
  { value: "renewable", label: "Énergie Renouvelable" },
  { value: "networks", label: "Réseaux" },
  { value: "security", label: "Sécurité" },
  { value: "hvac", label: "Climatisation" },
  { value: "industrial", label: "Solutions Industrielles" },
  { value: "biomedical", label: "Équipements Biomédicaux" },
  { value: "commerce", label: "Commerce Général" },
]

// Bureaux
const offices = [
  {
    city: "Houeyiho",
    address: "123 Avenue de la Technologie, 75000 Paris",
    phone: "+33 1 23 45 67 89",
    email: "contact@grafelecsarl.com",
    image: "/placeholder.svg?height=300&width=400",
    mapUrl:
       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.508916262408!2d2.3847477673828044!3d6.377572984872818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102355c614a5f131%3A0xcda5c0c57029be21!2sHoueyiho%201%2C%20Cotonou!5e0!3m2!1sen!2sbj!4v1745864123676!5m2!1sen!2sbj",
  },
  {
    city: "Ste Rita",
    address: "456 Rue de l'Innovation, 69000 Lyon",
    phone: "+33 4 56 78 90 12",
    email: "contact@grafnetsarl.com",
    image: "/placeholder.svg?height=300&width=400",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.508916262408!2d2.3847477673828044!3d6.377572984872818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102355ea3531d957%3A0xe77a81be1e3b28ff!2sSainte-Rita%2C%20Cotonou!5e0!3m2!1sen!2sbj!4v1745863986105!5m2!1sen!2sbj",
  },
  
]

export default function ContactPage() {
  const [activeOffice, setActiveOffice] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Initialisation du formulaire
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      service: "",
    },
  })

  // Soumission du formulaire
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1459a5] to-[#1459a6] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-Nous</h1>
            <p className="text-xl">
              Nous sommes à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                {!isSubmitted ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold mb-2 text-[#1459a6]">Envoyez-nous un message</h2>
                      <p className="text-gray-600">
                        Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>

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
                            name="service"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Service concerné</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez un service" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {services.map((service) => (
                                      <SelectItem key={service.value} value={service.value}>
                                        {service.label}
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
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sujet</FormLabel>
                              <FormControl>
                                <Input placeholder="Sujet de votre message" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Détaillez votre demande ici..."
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full bg-[#be321d] hover:bg-[#be321d]/90">
                          <Send className="mr-2 h-4 w-4" /> Envoyer le message
                        </Button>
                      </form>
                    </Form>
                  </>
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
                    <h2 className="text-3xl font-bold mb-4 text-[#1459a6] text-center">Message envoyé !</h2>
                    <p className="text-gray-600 text-center mb-8">
                      Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false)
                        form.reset()
                      }}
                      className="bg-[#1459a6] hover:bg-[#1459a6]/90"
                    >
                      Envoyer un autre message
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:pl-8"
            >
              <h2 className="text-3xl font-bold mb-8 text-[#1459a6]">Informations de contact</h2>

              <div className="grid gap-8 mb-12">
                {contactInfo.map((item, index) => (
                  <motion.div key={index} variants={fadeIn} className="flex items-start">
                    <div className="bg-[#1459a6]/10 p-3 rounded-full mr-4">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-[#1459a5] to-[#1459a6] rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <MessageSquare className="h-8 w-8 mr-4" />
                  <h3 className="text-2xl font-bold">Besoin d'une assistance rapide ?</h3>
                </div>
                <p className="mb-6">
                  Notre équipe de support technique est disponible pour répondre à vos questions urgentes.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1459a6]">
                    <Phone className="mr-2 h-4 w-4" /> Appelez-nous
                  </Button>
                  <Button className="bg-white text-[#1459a6] hover:bg-white/90">
                    <Mail className="mr-2 h-4 w-4" /> Email
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#1459a6]">Nos Bureaux</h2>
            <p className="text-gray-600">
              Retrouvez-nous dans nos différentes agences en France pour discuter de vos projets.
            </p>
          </div>

          <Tabs
            defaultValue={offices[0].city.toLowerCase()}
            value={offices[activeOffice].city.toLowerCase()}
            onValueChange={(value) => {
              const index = offices.findIndex((office) => office.city.toLowerCase() === value)
              if (index !== -1) setActiveOffice(index)
            }}
            className="w-full"
          >
            <TabsList className="flex justify-center mb-8">
              {offices.map((office, index) => (
                <TabsTrigger key={index} value={office.city.toLowerCase()}>
                  {office.city}
                </TabsTrigger>
              ))}
            </TabsList>

            {offices.map((office, index) => (
              <TabsContent key={index} value={office.city.toLowerCase()} className="mt-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={office.mapUrl}
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Carte ${office.city}`}
                      className="w-full"
                    ></iframe>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="relative h-38 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={office.image || "/placeholder.svg"}
                        alt={`Bureau de ${office.city}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#1459a6]">Bureau de {office.city}</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-[#be321d] mr-3 mt-1" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-[#be321d] mr-3" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-[#be321d] mr-3" />
                        <span>{office.email}</span>
                      </div>
                    </div>
                    <Button className="mt-6 bg-[#1459a6] hover:bg-[#1459a6]/90">Prendre rendez-vous</Button>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#1459a6]">Questions Fréquentes</h2>
            <p className="text-gray-600">
              Retrouvez les réponses aux questions les plus fréquemment posées par nos clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-3 text-[#1459a6]">Comment demander un devis ?</h3>
              <p className="text-gray-600">
                Vous pouvez demander un devis en remplissant notre formulaire de contact, en nous appelant directement
                ou en nous envoyant un email avec les détails de votre projet.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-3 text-[#1459a6]">Quels sont vos délais d'intervention ?</h3>
              <p className="text-gray-600">
                Nos délais d'intervention varient selon la nature et l'ampleur du projet. Pour une intervention urgente,
                nous proposons un service prioritaire sous 24 à 48 heures.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-3 text-[#1459a6]">Proposez-vous un service après-vente ?</h3>
              <p className="text-gray-600">
                Oui, nous offrons un service après-vente complet incluant maintenance, dépannage et assistance technique
                pour tous nos produits et installations.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-3 text-[#1459a6]">Travaillez-vous avec des particuliers ?</h3>
              <p className="text-gray-600">
                Oui, nous travaillons aussi bien avec des professionnels que des particuliers pour tous types de
                projets, quelle que soit leur taille.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1459a5] to-[#1459a6] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à démarrer votre projet ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nos solutions peuvent vous
            aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#be321d] hover:bg-[#be321d]/90 text-white">
              Demander un devis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1459a6]">
              Découvrir nos services
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
