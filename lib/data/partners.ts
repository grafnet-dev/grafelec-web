// Types
export interface Partner {
    id: number;
    name: string;
    logo: string;
    category: string;
    description: string;
    featured: boolean;
    website: string;
  }
  
  // Catégories
  export const categories = [
    "Tous",
    "Électricité",
    "Électronique",
    "Smart Building",
    "Énergie Renouvelable",
    "Réseaux",
    "Sécurité",
    "Climatisation",
    "Équipements Industriels",
    "Équipements Biomédicaux",
  ]
  
  // Partenaires fictifs
  export const partners: Partner[] = [
    {
      id: 1,
      name: "ElectroPro",
      logo: "/placeholder.svg?height=200&width=200",
      category: "Électricité",
      description: "Leader mondial dans la fabrication de matériel électrique haute performance.",
      featured: true,
      website: "https://example.com",
    },
    {
      id: 2,
      name: "SmartTech",
      logo: "/placeholder.svg?height=200&width=200",
      category: "Smart Building",
      description: "Solutions innovantes pour la gestion intelligente des bâtiments et l'automatisation.",
      featured: true,
      website: "https://example.com",
    },
    {
      id: 3,
      name: "SolarPower",
      logo: "/placeholder.svg?height=200&width=200",
      category: "Énergie Renouvelable",
      description: "Spécialiste des solutions photovoltaïques et de stockage d'énergie.",
      featured: true,
      website: "https://example.com",
    },
    {
      id: 4,
      name: "SecureNet",
      logo: "/placeholder.svg?height=200&width=200",
      category: "Sécurité",
      description: "Expert en solutions de sécurité et vidéosurveillance pour entreprises et particuliers.",
      featured: false,
      website: "https://example.com",
    },
    {
      id: 5,
      name: "NetConnect",
      logo: "/placeholder.svg?height=200&width=200",
      category: "Réseaux",
      description: "Équipements réseau haute performance pour infrastructures critiques.",
      featured: false,
      website: "https://example.com",
    },
    {
      id: 6,
      name: "CoolSystems",
      logo: "/placeholder.svg?height=200&width=200",
      category: "Climatisation",
      description: "Solutions de climatisation et traitement d'air écoénergétiques.",
      featured: false,
      website: "https://example.com",
    },
    {
      id: 7,
      name: "DataCenter Pro",
      logo: "/placeholder.svg?height=200&width=200",
      category: "Équipements Industriels",
      description: "Infrastructures complètes pour datacenters et environnements industriels.",
      featured: false,
      website: "https://example.com",
    },
   
    {
      id: 8,
      name: "IoT Connect",
      logo: "/placeholder.svg?height=200&width=200",
      category: "Électronique",
      description: "Capteurs et solutions IoT pour l'industrie 4.0 et les villes intelligentes.",
      featured: false,
      website: "https://example.com",
    },
  ]
  
  // Animations
  export const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }
  
  export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }