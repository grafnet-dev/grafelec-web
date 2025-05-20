export const translations = {
    fr: {
      // Navigation principale
      home: "Accueil",
      about: "A propos",
      services: "Services",
      partners: "Partenaires",
      blog: "Blog",
      shop: "Boutique",
      contact: "Contact",
      
      // Navigation secondaire
      careers: "Carrières",
      login: "Se connecter",
      language: "Langue",
      
      // Langues
      french: "Français",
      english: "English",
      
      // Accessibilité
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    en: {
      // Navigation principale
      home: "Home",
      about: "About",
      services: "Services",
      partners: "Partners",
      blog: "Blog",
      shop: "Shop",
      contact: "Contact",
      
      // Navigation secondaire
      careers: "Careers",
      login: "Sign in",
      language: "Language",
      
      // Langues
      french: "Français",
      english: "English",
      
      // Accessibilité
      openMenu: "Open menu",
      closeMenu: "Close menu",
    }
  }
  
  export type Language = keyof typeof translations
  export type TranslationKeys = keyof typeof translations.fr