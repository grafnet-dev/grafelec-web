"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/navigation'

// Définir l'ordre des pages pour le défilement
const PAGE_ORDER = [
  '/',           // Accueil
  '/about',      // À propos
  '/services',   // Services
  '/partners',   // Partenaires
  '/blog',       // Blog
  '/shop',       // Boutique
  '/contact',    // Contact
]

interface SmoothScrollLayoutProps {
  children: React.ReactNode
}

export default function SmoothScrollLayout({ children }: SmoothScrollLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(Date.now())
  

  // Trouver l'index de la page actuelle
  useEffect(() => {
    const index = PAGE_ORDER.indexOf(pathname)
    if (index !== -1) {
      setCurrentPageIndex(index)
    }
  }, [pathname])

  // Fonction pour naviguer vers une page spécifique
  const navigateToPage = useCallback((index: number) => {
    if (index >= 0 && index < PAGE_ORDER.length && !isScrolling) {
      setIsScrolling(true)
      setCurrentPageIndex(index)
      router.push(PAGE_ORDER[index])
      
      // Réinitialiser le flag de défilement après l'animation
      setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }
  }, [router, isScrolling])

  // Gestionnaire de défilement
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()

    // Empêcher le défilement pendant l'animation
    if (isScrolling) return

    // Limiter la fréquence des événements de défilement
    const now = Date.now()
    if (now - lastScrollTime.current < 800) return
    lastScrollTime.current = now

    // Déterminer la direction du défilement
    const delta = e.deltaY
    const threshold = 50 // Seuil pour déclencher le changement de page

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        // Défilement vers le bas
        navigateToPage(currentPageIndex + 1)
      } else {
        // Défilement vers le haut
        navigateToPage(currentPageIndex - 1)
      }
    }
  }, [currentPageIndex, navigateToPage, isScrolling])

  // Gestionnaire de touch pour mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isScrolling) return

    const touchEnd = e.changedTouches[0].clientY
    const diff = touchStart - touchEnd
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe vers le haut
        navigateToPage(currentPageIndex + 1)
      } else {
        // Swipe vers le bas
        navigateToPage(currentPageIndex - 1)
      }
    }
  }

  // Gestionnaire de touches clavier
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isScrolling) return

    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault()
        navigateToPage(currentPageIndex + 1)
        break
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault()
        navigateToPage(currentPageIndex - 1)
        break
      case 'Home':
        e.preventDefault()
        navigateToPage(0)
        break
      case 'End':
        e.preventDefault()
        navigateToPage(PAGE_ORDER.length - 1)
        break
    }
  }, [currentPageIndex, navigateToPage, isScrolling])

  // Attacher les événements
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Désactiver le défilement natif
    container.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    // Attacher les événements
    container.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleWheel, handleKeyDown])

  // Indicateurs de navigation
  const PageIndicators = () => (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {PAGE_ORDER.map((_, index) => (
        <button
          key={index}
          onClick={() => navigateToPage(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentPageIndex === index
              ? 'bg-[#be321d] scale-125'
              : 'bg-gray-400 hover:bg-gray-600'
          }`}
          aria-label={`Aller à la page ${index + 1}`}
        />
      ))}
    </div>
  )

  // Navigation horizontale en bas
  const BottomNavigation = () => (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigateToPage(currentPageIndex - 1)}
          disabled={currentPageIndex === 0}
          className={`p-2 rounded-full transition-all ${
            currentPageIndex === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-[#1459a6] hover:bg-gray-100'
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex gap-2">
          {PAGE_ORDER.map((_, index) => (
            <div
              key={index}
              className={`h-2 transition-all duration-300 ${
                currentPageIndex === index
                  ? 'w-8 bg-[#be321d]'
                  : 'w-2 bg-gray-300'
              } rounded-full`}
            />
          ))}
        </div>

        <button
          onClick={() => navigateToPage(currentPageIndex + 1)}
          disabled={currentPageIndex === PAGE_ORDER.length - 1}
          className={`p-2 rounded-full transition-all ${
            currentPageIndex === PAGE_ORDER.length - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-[#1459a6] hover:bg-gray-100'
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation principale (votre composant Navigation existant) */}
      <Navigation />

      {/* Indicateurs de page */}
      <PageIndicators />

      {/* Navigation en bas */}
      <BottomNavigation />

      {/* Contenu de la page avec animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full"
        >
          <div className="h-full overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}