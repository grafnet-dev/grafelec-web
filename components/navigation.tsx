"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from 'next/image';
const navItems = [
  { name: "Accueil", href: "/" },
  { name: "A propos", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Partenaires", href: "/partners" },
  { name: "Blog", href: "/blog" },
  { name: "Boutique", href: "/shop" },
  { name: "Carrieres", href: "/careers" },
  { name: "Contact", href: "/contact" },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-sm py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo5.png"
            alt="Grafelec Logo"
            width={100} 
            height={60} 
            className="h-15 w-auto"
            priority 
          />
        </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href} className="relative group">
                  <span
                    className={cn(
                      "text-[#1459a6] hover:text-[#1459a6]/80 transition-colors",
                      isActive ? "font-medium" : "",
                    )}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#be321d]"
                      layoutId="underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#be321d] transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            })}
          </nav>

          {/* User Actions */}
         

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn("text-[#1459a6] py-2 border-b border-gray-100", isActive ? "font-medium" : "")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    {isActive && <span className="block w-12 h-0.5 mt-1 bg-[#be321d]" />}
                  </Link>
                )
              })}
              
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}

