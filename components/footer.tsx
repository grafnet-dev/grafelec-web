import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 
        
          {/* Company Info */}
          <div>
          <div className="mb-5" >
                <img
                src="/logo5.png" 
                alt="Grafelec Logo"
                className="h-12 w-auto" 
            />
            </div>
            <p className="text-gray-300 mb-4">
              Solutions innovantes dans les domaines électriques, électroniques et technologiques.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-[#be321d] transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#be321d] transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#be321d] transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#be321d] transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-300 hover:text-white transition-colors">
                  Partenaires
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-white transition-colors">
                  Boutique
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#electrical" className="text-gray-300 hover:text-white transition-colors">
                  Solutions Électriques
                </Link>
              </li>
              <li>
                <Link href="/services#smart-building" className="text-gray-300 hover:text-white transition-colors">
                  Smart Building
                </Link>
              </li>
              <li>
                <Link href="/services#renewable" className="text-gray-300 hover:text-white transition-colors">
                  Énergie Renouvelable
                </Link>
              </li>
              <li>
                <Link href="/services#security" className="text-gray-300 hover:text-white transition-colors">
                  Sécurité
                </Link>
              </li>
              <li>
                <Link href="/services#networks" className="text-gray-300 hover:text-white transition-colors">
                  Réseaux
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-[#be321d] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300"> Avenue Houeyiho, Bénin</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#be321d] flex-shrink-0" />
                <span className="text-gray-300">+229 01 99 07 88 88</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#be321d] flex-shrink-0" />
                <span className="text-gray-300">contact@grafelecsarl.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Grafelec. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
