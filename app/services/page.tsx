"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"

// Services data - Réorganisé par catégories
const serviceCategories = [
  {
    category: "Infrastructure",
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
        image: "/placeholder.svg?height=600&width=800",
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
        image: "/placeholder.svg?height=600&width=800",
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
        image: "/placeholder.svg?height=600&width=800",
      },
    ]
  },
  {
    category: "Bâtiment Intelligent",
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
        image: "/placeholder.svg?height=600&width=800",
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
        image: "/placeholder.svg?height=600&width=800",
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
        image: "/placeholder.svg?height=600&width=800",
      },
    ]
  },
  {
    category: "Nouvelles Technologies",
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
        image: "/placeholder.svg?height=600&width=800",
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
        image: "/placeholder.svg?height=600&width=800",
      },
    ]
  },
  {
    category: "Secteurs Spécialisés",
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
        image: "/placeholder.svg?height=600&width=800",
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
        image: "/placeholder.svg?height=600&width=800",
      },
    ]
  }
];

// Flatten services for tab navigation
const allServices = serviceCategories.flatMap(category => category.services);

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("electrical")
  const [activeCategory, setActiveCategory] = useState("Infrastructure")

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
  const findCategoryForService = (serviceId) => {
    for (const category of serviceCategories) {
      if (category.services.some(service => service.id === serviceId)) {
        return category.category;
      }
    }
    return serviceCategories[0].category;
  };

  // Mettre à jour la catégorie lorsque l'onglet change
  const handleTabChange = (value) => {
    setActiveTab(value);
    setActiveCategory(findCategoryForService(value));
  };

  // Mettre à jour l'onglet actif lorsque la catégorie change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const firstServiceInCategory = serviceCategories.find(cat => cat.category === category)?.services[0]?.id;
    if (firstServiceInCategory) {
      setActiveTab(firstServiceInCategory);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section avec animation */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#1459a5] to-[#1459a6] text-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services</h1>
            <p className="text-xl">
              Découvrez notre large gamme de solutions technologiques pour répondre à tous vos besoins professionnels.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Navigation par catégories */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {serviceCategories.map((category) => (
              <button
                key={category.category}
                onClick={() => handleCategoryChange(category.category)}
                className={`px-6 py-3 rounded-full transition-all ${
                  activeCategory === category.category
                    ? "bg-[#1459a6] text-white shadow-md"
                    : "bg-white text-[#1459a6] border border-[#1459a6] hover:bg-[#1459a6]/10"
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-12 mx-auto max-w-4xl">
              {filteredServices.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex flex-col items-center p-4 rounded-md transition-all data-[state=active]:bg-[#1459a6]/10 data-[state=active]:text-[#be321d] data-[state=active]:shadow-md"
                >
                  <div className="text-[#1459a6] mb-2">{service.icon}</div>
                  <span className="text-center text-sm font-medium">{service.title.split(" ")[0]}</span>
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
                    <div className="hidden md:block">
                      <button className="bg-[#be321d] hover:bg-[#be321d]/90 text-white font-medium py-2 px-6 rounded-md transition-colors">
                        En savoir plus
                      </button>
                    </div>
                  </div>
                  
                  <div className="order-1 md:order-2 relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-start p-6 md:opacity-0 md:hover:opacity-100 transition-opacity">
                      <h3 className="text-white text-xl font-bold">{service.title}</h3>
                    </div>
                  </div>
                  
                  <div className="order-3 md:hidden mt-4">
                    <button className="w-full bg-[#be321d] hover:bg-[#be321d]/90 text-white font-medium py-3 px-6 rounded-md transition-colors">
                      En savoir plus
                    </button>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section avec animation */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-[#1459a6]/5"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#1459a6]">Besoin d'une solution personnalisée ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
            Contactez nos experts dès aujourd'hui pour discuter de vos besoins spécifiques et découvrir comment nos
            services peuvent vous aider à atteindre vos objectifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#be321d] hover:bg-[#be321d]/90 text-white font-medium py-3 px-8 rounded-md transition-colors">
              Nous contacter
            </button>
            <button className="bg-white border border-[#1459a6] text-[#1459a6] hover:bg-[#1459a6]/10 font-medium py-3 px-8 rounded-md transition-colors">
              Demander un devis
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}