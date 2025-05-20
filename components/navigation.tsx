"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Onglets principaux avec sous-menus pour Services
const mainNavItems = [
  { name: "Accueil", href: "/" },
  { name: "A propos", href: "/about" },
  { 
    name: "Services", 
    href: "#",
    hasSubmenu: true,
    submenu: [
      { name: "Solutions", href: "/services" },
      { name: "Produits", href: "" }
    ]
  },
  { name: "Partenaires", href: "/partners" },
  { name: "Blog", href: "/blog" },
  { name: "Boutique", href: "/shop" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fermer les sous-menus lorsque le pathname change
    setActiveSubmenu(null);
  }, [pathname]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);

    // Déclencher Google Translate
    const selectElement = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = value;
      selectElement.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled ? "bg-white shadow-md" : "bg-white backdrop-blur-sm"
        )}
      >
        {/* Barre de navigation secondaire */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-2">
              {/* Sélecteur de langue à gauche */}
              <div className="hidden md:flex items-center">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-32 h-9 text-sm border-gray-300">
                    <Globe className="h-4 w-4 mr-1" />
                    <SelectValue placeholder="Langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Espace vide pour mobile */}
              <div className="md:hidden"></div>

              {/* Actions à droite : Carrières et Se connecter */}
              <div className="flex items-center space-x-4">
                {/* Lien Carrières */}
                <Link
                  href="/careers"
                  className={cn(
                    "hidden md:block text-sm text-gray-600 hover:text-[#1459a6] transition-colors",
                    pathname === "/careers" ? "font-medium text-[#1459a6]" : ""
                  )}
                >
                  <span className="notranslate">Carrières</span>
                </Link>

                {/* Séparateur vertical */}
                <div className="hidden md:block h-5 w-px bg-gray-300"></div>

                {/* Bouton de connexion */}
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="hidden md:flex h-9 text-sm border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span className="notranslate">Se connecter</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de navigation principale */}
        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
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

              {/* Navigation principale desktop */}
              <nav className="hidden md:flex items-center space-x-8">
                {mainNavItems.map((item) => {
                  const isActive = pathname === item.href || (item.hasSubmenu && item.submenu?.some(sub => pathname === sub.href));
                  return (
                    <div key={item.name} className="relative">
                      {item.hasSubmenu ? (
                        <div className="group">
                          <button
                            onClick={() => toggleSubmenu(item.name)}
                            className={cn(
                              "flex items-center text-[#1459a6] hover:text-[#1459a6]/80 transition-colors font-medium",
                              isActive ? "font-semibold" : ""
                            )}
                          >
                            {item.name}
                            <ChevronDown className={cn(
                              "ml-1 h-4 w-4 transition-transform duration-200",
                              activeSubmenu === item.name ? "rotate-180" : ""
                            )} />
                          </button>
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
                          
                          {/* Sous-menu desktop */}
                          <AnimatePresence>
                            {activeSubmenu === item.name && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 mt-2 bg-white shadow-md rounded-md py-2 w-64 z-50"
                              >
                                {item.submenu?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className={cn(
                                      "block px-4 py-2 text-[#1459a6] hover:bg-gray-50",
                                      pathname === subItem.href ? "font-medium bg-gray-50" : ""
                                    )}
                                    onClick={() => setActiveSubmenu(null)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="relative group"
                        >
                          <span
                            className={cn(
                              "text-[#1459a6] hover:text-[#1459a6]/80 transition-colors font-medium",
                              isActive ? "font-semibold" : ""
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
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Bouton menu mobile */}
              <button
                className="md:hidden text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={
                  mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
                }
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Navigation mobile */}
            {mobileMenuOpen && (
              <motion.div
                ref={mobileNavRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-gray-200 overflow-y-auto max-h-[70vh]"
              >
                <nav className="flex flex-col pb-4">
                  {/* Onglets principaux */}
                  <div className="py-4">
                    {mainNavItems.map((item) => {
                      const isActive = pathname === item.href || (item.hasSubmenu && item.submenu?.some(sub => pathname === sub.href));
                      return (
                        <div key={item.name}>
                          {item.hasSubmenu ? (
                            <>
                              <button
                                onClick={() => toggleSubmenu(item.name)}
                                className={cn(
                                  "flex items-center justify-between w-full px-4 py-2 text-[#1459a6] hover:bg-gray-50",
                                  isActive ? "font-medium bg-gray-50" : ""
                                )}
                              >
                                <span>{item.name}</span>
                                <ChevronDown className={cn(
                                  "h-4 w-4 transition-transform duration-200",
                                  activeSubmenu === item.name ? "rotate-180" : ""
                                )} />
                              </button>
                              <AnimatePresence>
                                {activeSubmenu === item.name && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-gray-50"
                                  >
                                    {item.submenu?.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className={cn(
                                          "block px-8 py-2 text-[#1459a6] hover:bg-gray-100",
                                          pathname === subItem.href ? "font-medium bg-gray-100" : ""
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link
                              href={item.href}
                              className={cn(
                                "block px-4 py-2 text-[#1459a6] hover:bg-gray-50",
                                isActive ? "font-medium bg-gray-50" : ""
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Ligne de séparation */}
                  <div className="h-px bg-gray-200 my-2"></div>

                  {/* Section secondaire */}
                  <div className="py-4">
                    {/* Lien Carrières */}
                    <Link
                      href="/careers"
                      className={cn(
                        "block px-4 py-2 text-gray-600 hover:bg-gray-50",
                        pathname === "/careers" ? "font-medium bg-gray-50" : ""
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="notranslate">Carrières</span>
                    </Link>

                    {/* Sélecteur de langue mobile */}
                    <div className="px-4 py-2">
                      <Select
                        value={language}
                        onValueChange={handleLanguageChange}
                      >
                        <SelectTrigger className="w-full h-10">
                          <Globe className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Langue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Ligne de séparation */}
                  <div className="h-px bg-gray-200 my-2"></div>

                  {/* Bouton de connexion mobile */}
                  <div className="px-4 py-4">
                    <Link href="/login">
                      <Button
                        className="w-full"
                        variant="default"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        <span className="notranslate">Se connecter</span>
                      </Button>
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </div>
        </div>
      </header>
      {/* Espace vide pour compenser la navbar fixe */}
      <div className="h-[104px] md:h-[112px]"></div>
    </>
  );
}