"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CTASection } from "@/components/blog/CTASection"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReactNode } from "react";
import {
  Zap,
  Building,
  Cpu,
  Battery,
  Network,
  Shield,
  Thermometer,
  Server,
  Stethoscope,
  ShoppingBag,
  CheckCircle,
  Phone,
  MessageSquare,
} from "lucide-react"

// Define types for our data structures
interface ServiceFeature {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
}

interface ServiceCategory {
  category: string;
  icon: ReactNode;
  description: string;
  services: ServiceFeature[];
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

interface WorkProcess {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
}

// Services data - Réorganisé par catégories
const serviceCategories: ServiceCategory[] = [
  {
    category: "Infrastructure",
    icon: <Server className="h-6 w-6" />,
    description: "Solutions complètes pour vos infrastructures électriques et réseaux",
    services: [
      {
        id: "electrical",
        icon: <Zap className="h-10 w-10" />,
        title: "Solutions Électriques et Électroniques",
        description: "Vente et ingénierie de solutions électriques et électroniques adaptées à vos besoins spécifiques.",
        features: [
          "Conception et installation de systèmes électriques",
          "Fourniture de composants électroniques de haute qualité",
          "Maintenance et dépannage",
          "Audit et conseil en efficacité énergétique",
          "Automatisation des systèmes électriques",
        ],
        image: "/batiment.jpg",
      },
      {
        id: "networks",
        icon: <Network className="h-10 w-10" />,
        title: "Réseaux",
        description:
          "Conception et installation de réseaux électriques et informatiques performants pour une connectivité optimale.",
        features: [
          "Infrastructure réseau complète",
          "Solutions de câblage structuré",
          "Réseaux sans fil haute performance",
          "Sécurité réseau",
          "Maintenance et supervision",
        ],
        image: "/solar.png",
      },
      {
        id: "industrial",
        icon: <Server className="h-10 w-10" />,
        title: "Solutions Industrielles et Datacenters",
        description:
          "Équipements pour l'industrie et datacenters avec une expertise technique pointue pour des performances optimales.",
        features: [
          "Infrastructure pour datacenters",
          "Solutions de refroidissement",
          "Alimentation électrique sécurisée",
          "Automatisation industrielle",
          "Supervision et monitoring",
        ],
        image: "/electronic.jpg",
      },
    ]
  },
  {
    category: "Bâtiment Intelligent",
    icon: <Building className="h-6 w-6" />,
    description: "Transformez vos espaces en bâtiments connectés et écoresponsables",
    services: [
      {
        id: "smart-building",
        icon: <Building className="h-10 w-10" />,
        title: "Smart Building et Facilities Management",
        description:
          "Gestion intelligente des bâtiments et facilities management pour optimiser vos espaces et réduire les coûts.",
        features: [
          "Systèmes de gestion technique des bâtiments (GTB)",
          "Solutions d'automatisation des bâtiments",
          "Optimisation énergétique",
          "Contrôle d'accès intelligent",
          "Supervision centralisée",
        ],
        image: "/solar.png",
      },
      {
        id: "security",
        icon: <Shield className="h-10 w-10" />,
        title: "Sécurité",
        description: "Systèmes de vidéosurveillance et contrôle d'accès pour protéger vos biens et vos personnes.",
        features: [
          "Vidéosurveillance IP haute définition",
          "Contrôle d'accès biométrique et par badge",
          "Systèmes d'alarme intrusion",
          "Détection incendie",
          "Intégration de systèmes de sécurité",
        ],
        image: "/electronic.jpg",
      },
      {
        id: "hvac",
        icon: <Thermometer className="h-10 w-10" />,
        title: "Climatisation et Traitement d'Air",
        description:
          "Solutions de climatisation et traitement d'air pour un confort optimal dans vos espaces de vie et de travail.",
        features: [
          "Installation de systèmes CVC",
          "Solutions de traitement d'air",
          "Systèmes de ventilation",
          "Maintenance préventive et curative",
          "Optimisation énergétique des systèmes",
        ],
        image: "/batiment.jpg",
      },
    ]
  },
  {
    category: "Nouvelles Technologies",
    icon: <Cpu className="h-6 w-6" />,
    description: "Adoptez les technologies de pointe pour votre transition numérique",
    services: [
      {
        id: "iot",
        icon: <Cpu className="h-10 w-10" />,
        title: "Mobilité et IoT",
        description:
          "Solutions connectées pour la mobilité et l'Internet des Objets pour un environnement plus intelligent et réactif.",
        features: [
          "Capteurs et dispositifs IoT",
          "Plateformes de gestion des objets connectés",
          "Solutions de mobilité intelligente",
          "Analyse de données IoT",
          "Intégration de systèmes",
        ],
        image: "panneau.jpg",
      },
      {
        id: "renewable",
        icon: <Battery className="h-10 w-10" />,
        title: "Énergie Renouvelable",
        description:
          "Bornes de recharge et solutions d'énergie renouvelable pour un avenir plus durable et respectueux de l'environnement.",
        features: [
          "Installation de bornes de recharge pour véhicules électriques",
          "Systèmes photovoltaïques",
          "Solutions de stockage d'énergie",
          "Gestion intelligente de l'énergie",
          "Conseil en transition énergétique",
        ],
        image: "/electronic.jpg",
      },
    ]
  },
  {
    category: "Secteurs Spécialisés",
    icon: <Stethoscope className="h-6 w-6" />,
    description: "Des solutions sur mesure pour des secteurs d'activité exigeants",
    services: [
      {
        id: "biomedical",
        icon: <Stethoscope className="h-10 w-10" />,
        title: "Équipements Biomédicaux",
        description:
          "Matériel biomédical et informatique pour le secteur de la santé, alliant technologie de pointe et fiabilité.",
        features: [
          "Équipements de diagnostic",
          "Solutions informatiques pour le secteur médical",
          "Maintenance d'équipements biomédicaux",
          "Conseil et formation",
          "Intégration de systèmes",
        ],
        image: "/solar.png",
      },
      {
        id: "commerce",
        icon: <ShoppingBag className="h-10 w-10" />,
        title: "Commerce Général",
        description:
          "Import-export et commerce général de produits technologiques pour répondre à tous vos besoins d'approvisionnement.",
        features: [
          "Sourcing international",
          "Logistique et supply chain",
          "Gestion des stocks",
          "Distribution B2B",
          "Service après-vente",
        ],
        image: "/solar.png",
      },
    ]
  }
];

// Témoignages clients
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Durand",
    role: "Directrice des Opérations",
    company: "TechCorp France",
    content: "Nous avons fait appel à cette entreprise pour refaire l'ensemble de notre infrastructure réseau. Le résultat a dépassé nos attentes avec une amélioration significative de nos performances.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Thomas Bernard",
    role: "Responsable IT",
    company: "MediGroup",
    content: "Les solutions biomédicales proposées ont permis à notre clinique d'améliorer considérablement l'efficacité de nos services. Un partenaire de confiance pour le secteur médical.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Sophie Lambert",
    role: "Directrice Générale",
    company: "Eco Bâtiment",
    content: "La transformation de notre siège en smart building nous a permis de réduire notre consommation énergétique de 40%. Un investissement rentabilisé en moins de 3 ans.",
    image: "/placeholder.svg?height=100&width=100",
  },
];

// Process de travail
const workProcess: WorkProcess[] = [
  {
    step: 1,
    title: "Conception",
    description: "Nous analysons vos besoins et objectifs pour comprendre parfaitement vos attentes",
    icon: <MessageSquare className="h-8 w-8" />,
  },
  {
    step: 2,
    title: "Audit",
    description: "Nos experts évaluent votre situation actuelle et identifient les points d'amélioration",
    icon: <CheckCircle className="h-8 w-8" />,
  },
  {
    step: 3,
    title: "Implémentation",
    description: "Nous élaborons une solution sur mesure adaptée à vos besoins spécifiques",
    icon: <Cpu className="h-8 w-8" />,
  },
  {
    step: 4,
    title: "Suivi & Control",
    description: "Nos équipes qualifiées mettent en œuvre la solution avec rigueur et professionnalisme",
    icon: <Server className="h-8 w-8" />,
  },
  {
    step: 5,
    title: "Support",
    description: "Nous assurons un service continu pour garantir la performance optimale de nos solutions",
    icon: <Phone className="h-8 w-8" />,
  },
  
];

// Flatten services for tab navigation
const allServices = serviceCategories.flatMap(category => category.services);

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("electrical")
  const [activeCategory, setActiveCategory] = useState("Infrastructure")
  const [visibleTestimonial, setVisibleTestimonial] = useState(0);

  // Change testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Filtrer les services par catégorie active
  const filteredServices = serviceCategories.find(cat => cat.category === activeCategory)?.services || allServices;
  
  // Trouver la catégorie d'un service
  const findCategoryForService = (serviceId: string): string => {
    for (const category of serviceCategories) {
      if (category.services.some(service => service.id === serviceId)) {
        return category.category;
      }
    }
    return serviceCategories[0].category;
  };

  // Mettre à jour la catégorie lorsque l'onglet change
  const handleTabChange = (value: string): void => {
    setActiveTab(value);
    setActiveCategory(findCategoryForService(value));
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section avec animation */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#1459a5] to-[#1459a6] text-white py-20 relative"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Solutions Technologiques Intégrées</h1>
            <p className="text-xl mb-8">
              Découvrez comment nos services innovants peuvent transformer votre environnement professionnel
            </p>
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1459a6]">Notre processus {"d'intervention"}</h2>
            <p className="text-gray-700">
              Une méthodologie éprouvée pour garantir le succès de chaque projet
            </p>
          </div>
          
          <div className="relative">
            {/* Ligne de connexion */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#1459a6]/20 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {workProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center border-2 border-[#1459a6] text-[#1459a6] mb-4 relative shadow-md">
                    {step.icon}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#be321d] text-white flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#1459a6]">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs - Improved */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-3 mb-12 mx-auto max-w-4xl">
              {filteredServices.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex items-center p-3 rounded-md transition-all data-[state=active]:bg-[#1459a6] data-[state=active]:text-white data-[state=active]:shadow-md"
                >
                  <div className={`mr-2 ${activeTab === service.id ? "text-white" : "text-[#1459a6]"}`}>
                    {service.icon}
                  </div>
                  <span className="font-medium">{service.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {allServices.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <motion.div
                  key={service.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="grid md:grid-cols-2 gap-12 items-center"
                >
                  <div className="order-2 md:order-1">
                    <div className="inline-flex items-center justify-center p-3 bg-[#1459a6]/10 rounded-lg mb-6">
                      <div className="text-[#1459a6]">{service.icon}</div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-[#1459a6]">{service.title}</h2>
                    <p className="text-gray-700 mb-6">{service.description}</p>

                    <h3 className="text-xl font-semibold mb-4 text-[#be321d]">Caractéristiques principales</h3>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="text-[#be321d] mr-3 mt-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-[#be321d] hover:bg-[#be321d]/90 text-white font-medium py-2 px-6 rounded-md transition-colors">
                        En savoir plus
                      </button>
                      <button className="bg-transparent border border-[#1459a6] text-[#1459a6] hover:bg-[#1459a6]/5 font-medium py-2 px-6 rounded-md transition-colors">
                        Voir réalisations
                      </button>
                    </div>
                  </div>
                  
                  <div className="order-1 md:order-2 relative rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 duration-300">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-start p-6">
                      <div>
                        <h3 className="text-white text-xl font-bold mb-2">{service.title}</h3>
                        <div className="bg-[#be321d] text-white text-sm px-3 py-1 rounded-full inline-block">
                          Solution certifiée
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1459a6]">Ce que nos clients disent</h2>
            <p className="text-gray-700">
              Découvrez les retours {"d'expérience"} de nos clients satisfaits
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden relative min-h-[280px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: visibleTestimonial === index ? 1 : 0,
                    x: visibleTestimonial === index ? 0 : visibleTestimonial > index ? '-100%' : '100%'
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 bg-white p-8 rounded-xl shadow-md border border-gray-100 ${
                    visibleTestimonial === index ? "z-10" : "z-0"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <Image 
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#1459a6] mb-4">
                        <svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 1L12.9389 6.95492L19.5106 7.90983L14.7553 12.5451L15.8779 19.0902L10 16L4.12215 19.0902L5.24472 12.5451L0.489435 7.90983L7.06107 6.95492L10 1Z" fill="#1459a6"/>
                          <path d="M30 1L32.9389 6.95492L39.5106 7.90983L34.7553 12.5451L35.8779 19.0902L30 16L24.1221 19.0902L25.2447 12.5451L20.4894 7.90983L27.0611 6.95492L30 1Z" fill="#1459a6"/>
                          <path d="M50 1L52.9389 6.95492L59.5106 7.90983L54.7553 12.5451L55.8779 19.0902L50 16L44.1221 19.0902L45.2447 12.5451L40.4894 7.90983L47.0611 6.95492L50 1Z" fill="#1459a6"/>
                          <path d="M70 1L72.9389 6.95492L79.5106 7.90983L74.7553 12.5451L75.8779 19.0902L70 16L64.1221 19.0902L65.2447 12.5451L60.4894 7.90983L67.0611 6.95492L70 1Z" fill="#1459a6"/>
                          <path d="M90 1L92.9389 6.95492L99.5106 7.90983L94.7553 12.5451L95.8779 19.0902L90 16L84.1221 19.0902L85.2447 12.5451L80.4894 7.90983L87.0611 6.95492L90 1Z" fill="#1459a6"/>
                        </svg>
                      </div>
                      <p className="text-gray-700 italic mb-6">{testimonial.content}</p>
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    visibleTestimonial === index ? "bg-[#1459a6] w-6" : "bg-gray-300"
                  }`}
                  onClick={() => setVisibleTestimonial(index)}
                  aria-label={`Voir témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}