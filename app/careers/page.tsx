"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  Users,
  Lightbulb,
  TrendingUp,
  Heart,
  Coffee,
  Award,
  ChevronDown,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Badge } from "@/components/ui/badge"

import CareersCTA from "@/components/careers/CareersCTA"
import ApplicationForm from "@/components/careers/PostuleForm"
// Schéma de validation du formulaire de candidature
const applicationSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().optional(),
  position: z.string().min(1, { message: "Veuillez sélectionner un poste" }),
  experience: z.string().min(1, { message: "Veuillez sélectionner votre niveau d'expérience" }),
  message: z.string().min(10, { message: "Votre message doit contenir au moins 10 caractères" }),
  portfolio: z.string().optional(),
  linkedin: z.string().optional(),
})

// Offres d'emploi
const jobOpenings = [
  {
    id: 1,
    title: "Ingénieur en Solutions Électriques",
    department: "Ingénierie",
    location: "Paris, France",
    type: "CDI",
    remote: "Hybride",
    description:
      "Nous recherchons un ingénieur expérimenté pour concevoir et mettre en œuvre des solutions électriques innovantes pour nos clients.",
    requirements: [
      "Diplôme d'ingénieur en génie électrique ou équivalent",
      "Minimum 3 ans d'expérience dans un rôle similaire",
      "Connaissance approfondie des normes électriques",
      "Expérience en gestion de projets",
      "Excellentes compétences en communication",
    ],
    responsibilities: [
      "Concevoir des solutions électriques sur mesure",
      "Superviser l'installation et la mise en service",
      "Assurer la conformité aux normes et réglementations",
      "Collaborer avec les équipes internes et les clients",
      "Rester à jour sur les dernières technologies",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Technicien Smart Building",
    department: "Technique",
    location: "Lyon, France",
    type: "CDI",
    remote: "Sur site",
    description:
      "Rejoignez notre équipe technique pour installer et maintenir des systèmes de gestion intelligente des bâtiments.",
    requirements: [
      "BTS ou DUT en électronique, domotique ou équivalent",
      "Connaissance des systèmes de gestion technique du bâtiment",
      "Expérience en installation de systèmes domotiques",
      "Permis de conduire obligatoire",
      "Capacité à travailler en équipe",
    ],
    responsibilities: [
      "Installer et configurer des systèmes domotiques",
      "Assurer la maintenance préventive et corrective",
      "Former les utilisateurs aux systèmes installés",
      "Diagnostiquer et résoudre les problèmes techniques",
      "Rédiger des rapports d'intervention",
    ],
    featured: true,
  },
  {
    id: 3,
    title: "Développeur IoT",
    department: "R&D",
    location: "Paris, France",
    type: "CDI",
    remote: "Télétravail possible",
    description:
      "Nous cherchons un développeur talentueux pour créer des applications innovantes pour nos solutions IoT.",
    requirements: [
      "Formation en informatique ou équivalent",
      "Maîtrise des langages de programmation (Python, JavaScript)",
      "Expérience avec les plateformes IoT",
      "Connaissance des protocoles de communication (MQTT, CoAP)",
      "Esprit d'innovation et de résolution de problèmes",
    ],
    responsibilities: [
      "Développer des applications pour dispositifs IoT",
      "Concevoir des interfaces utilisateur intuitives",
      "Assurer l'intégration avec les systèmes existants",
      "Participer à la R&D de nouvelles solutions",
      "Collaborer avec l'équipe produit",
    ],
    featured: false,
  },
  
]

// Avantages
const benefits = [
  {
    icon: <TrendingUp className="h-10 w-10 text-[#be321d]" />,
    title: "Évolution de carrière",
    description: "Des opportunités d'évolution et de formation continue pour développer vos compétences.",
  },
  {
    icon: <Heart className="h-10 w-10 text-[#be321d]" />,
    title: "Bien-être au travail",
    description:
      "Un environnement de travail agréable et des initiatives pour favoriser votre équilibre vie pro/perso.",
  },
  {
    icon: <Coffee className="h-10 w-10 text-[#be321d]" />,
    title: "Ambiance conviviale",
    description: "Une culture d'entreprise basée sur la collaboration, le respect et la convivialité.",
  },
  {
    icon: <Award className="h-10 w-10 text-[#be321d]" />,
    title: "Reconnaissance",
    description: "Vos contributions sont valorisées et récompensées à leur juste valeur.",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-[#be321d]" />,
    title: "Innovation",
    description: "Participez à des projets innovants et contribuez à façonner l'avenir technologique.",
  },
  {
    icon: <Users className="h-10 w-10 text-[#be321d]" />,
    title: "Esprit d'équipe",
    description: "Rejoignez une équipe dynamique et passionnée, unie par des valeurs communes.",
  },
]

// Étapes du processus de recrutement
const recruitmentSteps = [
  {
    number: 1,
    title: "Candidature",
    description: "Postulez en ligne en soumettant votre CV et lettre de motivation.",
  },
  {
    number: 2,
    title: "Présélection",
    description: "Notre équipe RH examine votre candidature et vous contacte pour un premier échange téléphonique.",
  },
  {
    number: 3,
    title: "Entretiens",
    description: "Rencontrez les équipes et managers pour discuter de votre parcours et de nos attentes.",
  },
  {
    number: 4,
    title: "Offre",
    description: "Si votre profil correspond à nos attentes, nous vous faisons une proposition d'embauche.",
  },
  {
    number: 5,
    title: "Intégration",
    description: "Bienvenue dans l'équipe ! Un parcours d'intégration personnalisé vous attend.",
  },
]

// Témoignages d'employés
const testimonials = [
  {
    name: "Sophie Martin",
    position: "Ingénieure en Solutions Électriques",
    years: "3 ans chez Grafelec",
    quote:
      "Rejoindre Grafelec a été une excellente décision pour ma carrière. J'ai pu travailler sur des projets variés et innovants, tout en bénéficiant d'un excellent équilibre vie professionnelle/vie personnelle.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Thomas Dubois",
    position: "Technicien Smart Building",
    years: "5 ans chez Grafelec",
    quote:
      "Ce que j'apprécie le plus chez Grafelec, c'est l'esprit d'équipe et les opportunités d'apprentissage. Chaque jour apporte de nouveaux défis et la satisfaction de contribuer à des projets qui font la différence.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Léa Bernard",
    position: "Responsable Marketing",
    years: "2 ans chez Grafelec",
    quote:
      "Grafelec est une entreprise qui valorise réellement l'innovation et la créativité. J'ai pu développer de nouvelles compétences et évoluer rapidement dans un environnement stimulant et bienveillant.",
    image: "/placeholder.svg?height=200&width=200",
  },
]




export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Références pour les animations au scroll
  const benefitsRef = useRef(null)
  const processRef = useRef(null)
  const testimonialsRef = useRef(null)
  

  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 })
  const processInView = useInView(processRef, { once: true, amount: 0.2 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 })
  

  // Initialisation du formulaire
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      message: "",
      portfolio: "",
      linkedin: "",
    },
  })

 

  // Filtrer les offres d'emploi
  const filteredJobs = jobOpenings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Animations
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
      <section className="relative bg-gradient-to-r from-[#1459a5] to-[#1459a6] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              className="absolute top-0 right-0 h-full w-1/2 transform translate-x-1/3 text-white/10"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="0,0 100,0 50,100 0,100" />
            </svg>
            <svg
              className="absolute bottom-0 left-0 h-full w-1/2 transform -translate-x-1/3 text-white/10"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,100 0,100" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Rejoignez Notre Équipe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              {"Découvrez les opportunités de carrière chez Grafelec et contribuez à façonner l'avenir technologique."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-white text-[#1459a6] hover:bg-white/90"
                onClick={() => {
                  const element = document.getElementById("job-openings")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
              >
               {" Voir nos offres d'emploi"}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
     <section className="py-20">
  <div className="container mx-auto px-4">
    {/* Titre et description */}
    <div className="text-center max-w-3xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#1459a6]">
        Pourquoi Nous Rejoindre ?
      </h2>
      <p className="text-gray-600 text-base sm:text-lg">
        Chez Grafelec, nous valorisons le talent, l'innovation et le bien-être de nos collaborateurs.
        Découvrez ce qui fait de nous un employeur de choix.
      </p>
    </div>

    {/* Grille des avantages */}
    <div ref={benefitsRef}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={benefitsInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4 text-3xl text-[#1459a6]">{benefit.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#1459a6]">{benefit.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
</section>


      {/* Job Openings Section */}
      <section id="job-openings" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1459a6]">{"Nos Offres d'Emploi"}</h2>
            <p className="text-gray-600 mb-8">
              
              {"Découvrez nos opportunités actuelles et rejoignez une équipe dynamique et innovante."}
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher par poste"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col ${
                    selectedJob === job.id ? "ring-2 ring-[#1459a6]" : ""
                  }`}
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#1459a6] mb-1">{job.title}</h3>
                        <p className="text-gray-600">{job.department}</p>
                      </div>
                      {job.featured && <Badge className="bg-[#be321d] hover:bg-[#be321d]/90">Featured</Badge>}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-[#be321d]" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-[#be321d]" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-[#be321d]" />
                        <span>{job.remote}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{job.description}</p>
                  </div>

                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <Button
                      className="w-full bg-[#1459a6] hover:bg-[#1459a6]/90"
                      onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    >
                      {selectedJob === job.id ? "Voir moins" : "Voir plus"}
                      <ChevronDown
                        className={`ml-2 h-4 w-4 transition-transform ${selectedJob === job.id ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </div>

                  {selectedJob === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 border-t border-gray-100"
                    >
                      <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-3 text-[#1459a6]">Prérequis</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="h-5 w-5 text-[#be321d] mr-2 flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-3 text-[#1459a6]">Responsabilités</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="h-5 w-5 text-[#be321d] mr-2 flex-shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        className="w-full bg-[#be321d] hover:bg-[#be321d]/90"
                        onClick={() => {
                          const element = document.getElementById("application-form")
                          element?.scrollIntoView({ behavior: "smooth" })
                          form.setValue("position", job.title)
                        }}
                      >
                        Postuler maintenant
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-lg text-gray-600 mb-4">Aucune offre ne correspond à votre recherche.</p>
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  Réinitialiser la recherche
                </Button>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Vous ne trouvez pas le poste qui vous correspond ?</p>
            <Button
              variant="outline"
              className="border-[#1459a6] text-[#1459a6]"
              onClick={() => {
                const element = document.getElementById("application-form")
                element?.scrollIntoView({ behavior: "smooth" })
                form.setValue("position", "Candidature spontanée")
              }}
            >
              Envoyez une candidature spontanée
            </Button>
          </div>
        </div>
      </section>

      {/* Recruitment Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#1459a6]">Notre Processus de Recrutement</h2>
            <p className="text-gray-600">
              {"Découvrez les étapes de notre processus de recrutement transparent et efficace."}
            </p>
          </div>

          <div ref={processRef} className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

            {/* Timeline steps */}
            <div className="space-y-12 relative">
              {recruitmentSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } },
                  }}
                  initial="hidden"
                  animate={processInView ? "visible" : "hidden"}
                  className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="md:w-1/2 p-4 flex justify-center md:justify-end items-center">
                    <div
                      className={`bg-white p-6 rounded-lg shadow-md max-w-md ${
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-2 text-[#1459a6]">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex justify-center items-center relative z-10">
                    <div className="bg-[#be321d] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  <div className="md:w-1/2 p-4"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
    <section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center max-w-3xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#1459a6]">
        Ce Que Disent Nos Employés
      </h2>
      <p className="text-gray-600 text-base sm:text-lg">
        Découvrez les témoignages de nos collaborateurs sur leur expérience au sein de Grafelec.
      </p>
    </div>

    <div ref={testimonialsRef} className="relative max-w-4xl mx-auto px-4 sm:px-0">
      <div className="overflow-hidden">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          className="relative"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: activeTestimonial === index ? 1 : 0,
                x: activeTestimonial === index ? 0 : 100,
                position: activeTestimonial === index ? "relative" : "absolute",
              }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#1459a6]/20">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <svg
                      className="h-10 w-10 sm:h-12 sm:w-12 text-[#1459a6]/20 mb-4 mx-auto md:mx-0"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="..."/>
                    </svg>
                    <p className="text-gray-600 italic mb-4 text-base sm:text-lg">
                      {testimonial.quote}
                    </p>
                    <h4 className="font-bold text-lg sm:text-xl text-[#1459a6]">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{testimonial.position}</p>
                    <p className="text-[#be321d] text-xs sm:text-sm mt-1">{testimonial.years}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTestimonial(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              activeTestimonial === index ? "bg-[#be321d] w-8" : "bg-gray-300 hover:bg-gray-400 w-3"
            }`}
            aria-label={`Témoignage ${index + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
</section>

      
      {/* Application Form Section */}
      <ApplicationForm jobOpenings={jobOpenings} />
      <CareersCTA/>
     
    </div>
  )
}
