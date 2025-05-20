// components/GoogleTranslate.tsx
"use client"

import { useEffect } from 'react'
import Script from 'next/script'

export default function GoogleTranslate() {
  useEffect(() => {
    // Fonction pour initialiser Google Translate
    const googleTranslateElementInit = () => {
      if (typeof window !== 'undefined' && (window as any).google) {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'fr', // Langue source
          includedLanguages: 'fr,en,es,de,it', // Langues autorisées
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element')
      }
    }

    // Ajouter la méthode globale si elle n'existe pas déjà
    if (typeof window !== 'undefined' && !(window as any).googleTranslateElementInit) {
      (window as any).googleTranslateElementInit = googleTranslateElementInit
    }
  }, [])

  return (
    <>
      {/* Conteneur pour Google Translate */}
      <div 
        id="google_translate_element" 
        className="fixed top-4 right-4 z-[1000] hidden md:block"
      />

      {/* Script Google Translate */}
      <Script 
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
        strategy="lazyOnload"
      />

      {/* Style global pour personnaliser l'apparence */}
      <style jsx global>{`
        .goog-te-combo {
          margin: 5px;
          padding: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .goog-logo-link {
          display: none !important;
        }

        .goog-te-gadget {
          color: transparent !important;
          font-size: 0 !important;
        }

        .goog-te-gadget .goog-te-gadget-simple {
          color: black !important;
          font-size: 14px !important;
        }

        /* Masquer le bandeau de traduction */
        .goog-te-banner-frame {
          display: none !important;
        }

        /* Optimisations pour mobile */
        @media (max-width: 768px) {
          #google_translate_element {
            position: fixed;
            bottom: 20px;
            right: 20px;
            top: auto;
          }
        }
      `}</style>
    </>
  )
}