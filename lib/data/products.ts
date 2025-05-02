// Catégories de produits
export const categories = [
    "Toutes les catégories",
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
  
  // Types pour les produits
  export interface Product {
    id: number
    name: string
    category: string
    image: string
    description: string
  }
  
  // Produits simplifiés (sans prix, rating, etc.)
  export const products: Product[] = [
    {
      id: 1,
      name: "Panneau solaire haute performance",
      category: "Énergie Renouvelable",
      image: "/solar.png",
      description: "Panneau solaire 300W avec rendement optimisé pour toutes conditions météorologiques.",
    },
    {
      id: 2,
      name: "Caméra de surveillance IP HD",
      category: "Sécurité",
      image: "/camera.png",
      description: "Caméra IP 4K avec vision nocturne et détection de mouvement avancée.",
    },
    {
      id: 3,
      name: "Contrôleur domotique centralisé",
      category: "Smart Building",
      image: "/Home-control.png",
      description: "Contrôleur compatible avec tous les principaux protocoles domotiques du marché.",
    },
    {
      id: 4,
      name: "Switch réseau manageable 24 ports",
      category: "Réseaux",
      image: "/switches.avif",
      description: "Switch Gigabit avec fonctionnalités avancées de gestion et sécurité.",
    },
    {
      id: 5,
      name: "Climatiseur inverter basse consommation",
      category: "Climatisation",
      image: "/clim.png",
      description: "Climatiseur avec technologie inverter pour une efficacité énergétique maximale.",
    },
    {
      id: 6,
      name: "Tableau électrique intelligent",
      category: "Électricité",
      image: "/Electric-Panel.png",
      description: "Tableau électrique avec monitoring de consommation et protection avancée.",
    },
    {
      id: 7,
      name: "Kit de développement IoT",
      category: "Électronique",
      image: "/kit.png",
      description: "Kit complet pour développer vos projets IoT avec capteurs et modules de communication.",
    },
    {
      id: 8,
      name: "Onduleur industriel 5kVA",
      category: "Équipements Industriels",
      image: "/Inverter.png",
      description: "Onduleur haute capacité pour applications industrielles critiques.",
    },
  ]