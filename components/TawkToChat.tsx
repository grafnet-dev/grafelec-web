'use client';
import { useEffect, createContext, useContext, useState } from 'react';

// Définir les types pour Tawk_API
interface TawkToAPI {
  onLoad?: () => void;
  onStatusChange?: (status: string) => void;
  setAttributes: (attributes: Record<string, string>, callback?: (error?: Error) => void) => void;
  maximize?: () => void;
  toggle?: () => void;
}

// Étendre l'interface Window pour inclure les propriétés Tawk
declare global {
  interface Window {
    Tawk_API?: TawkToAPI;
    Tawk_LoadStart?: Date;
  }
}

// Créer un contexte pour TawkTo
interface TawkToContextType {
  openChat: (attributes?: Record<string, string>) => void;
  isLoaded: boolean;
}

const TawkToContext = createContext<TawkToContextType>({
  openChat: () => console.warn('TawkTo context not initialized'),
  isLoaded: false
});

export const useTawkTo = () => useContext(TawkToContext);

export default function TawkToChat() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Vérifier si le script est déjà chargé
    if (document.querySelector('script[src*="tawk.to"]')) {
      return;
    }

    // Initialiser les variables Tawk
    window.Tawk_API = window.Tawk_API || {
      setAttributes: (attributes: Record<string, string>, callback?: (error?: Error) => void) => {
        console.warn('Tawk.to not fully loaded yet');
        if (callback) callback(new Error('Tawk.to not loaded'));
      },
      maximize: () => {
        console.warn('Tawk.to not fully loaded yet');
      },
      toggle: () => {
        console.warn('Tawk.to not fully loaded yet');
      }
    };
    window.Tawk_LoadStart = new Date();
    
    // Charger le script Tawk.to
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    
    if (s0 && s0.parentNode) {
      s1.async = true;
      // Remplacez cette URL par celle que vous obtiendrez de votre compte Tawk.to
      s1.src = 'https://embed.tawk.to/6814599628944c19102d5770/1iq7nrtpn';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    }

    // Configuration de l'API Tawk
    if (window.Tawk_API) {
      window.Tawk_API.onLoad = function() {
        console.log('Tawk.to chargé avec succès');
        setIsLoaded(true);
      };
      
      // Surveiller les changements de statut
      window.Tawk_API.onStatusChange = function(status) {
        console.log('Statut Tawk.to modifié:', status);
      };
    }

    return () => {
      // Nettoyage lorsque le composant est démonté
      const tawkScript = document.querySelector('script[src*="tawk.to"]');
      if (tawkScript) {
        tawkScript.remove();
      }
      setIsLoaded(false);
      delete window.Tawk_API;
      delete window.Tawk_LoadStart;
    };
  }, []);
  
  // Fonction pour ouvrir le chat
  const openChat = (attributes?: Record<string, string>) => {
    if (!window.Tawk_API || !isLoaded) {
      console.warn("Tawk.to n'est pas encore initialisé ou chargé");
      return;
    }
    
    try {
      // Si des attributs sont fournis, les définir
      if (attributes) {
        window.Tawk_API.setAttributes(attributes, (error) => {
          if (error) {
            console.error("Erreur lors de la définition des attributs:", error);
            return;
          }
          // Une fois les attributs définis, maximiser la fenêtre de chat
          if (window.Tawk_API?.maximize) {
            window.Tawk_API.maximize();
          } else {
            console.warn("La fonction maximize n'est pas disponible");
          }
        });
      } else {
        // Sinon, ouvrir directement le chat
        if (window.Tawk_API.maximize) {
          window.Tawk_API.maximize();
        } else {
          console.warn("La fonction maximize n'est pas disponible");
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'ouverture du chat:", error);
    }
  };

  return (
    <TawkToContext.Provider value={{ openChat, isLoaded }}>
      {/* Ce composant n'affiche rien visuellement */}
    </TawkToContext.Provider>
  );
}