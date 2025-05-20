///page d'accueil

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Hero slider images
const sliderImages = [
  {
    src: "/electronic.jpg",
    alt: "Solutions électriques et électroniques",
    title: "Solutions Électriques & Électroniques",
    description: "Expertise et innovation pour tous vos projets technologiques",
  },
  {
    src: "/batiment.jpg",
    alt: "Smart building et facilities management",
    title: "Smart Building",
    description: "Des bâtiments intelligents pour un avenir durable",
  },
  {
    src: "/panneau.jpg",
    alt: "Énergie renouvelable",
    title: "Énergie Renouvelable",
    description: "Solutions durables pour un monde meilleur",
  },
];

// Business domains
const domains = [
  {
    icon: <Zap className="h-10 w-10 text-[#1459a6]" />,
    title: "Solutions Électriques",
    description:
      "Vente et ingénierie de solutions électriques et électroniques adaptées à vos besoins.",
    href: "/services#electrical",
  },
  {
    icon: <Building className="h-10 w-10 text-[#1459a6]" />,
    title: "Smart Building",
    description:
      "Gestion intelligente des bâtiments et facilities management pour optimiser vos espaces.",
    href: "/services#smart-building",
  },
  {
    icon: <Cpu className="h-10 w-10 text-[#1459a6]" />,
    title: "Mobilité & IoT",
    description:
      "Solutions connectées pour la mobilité et l'Internet des Objets.",
    href: "/services#iot",
  },
  {
    icon: <Battery className="h-10 w-10 text-[#1459a6]" />,
    title: "Énergie Renouvelable",
    description:
      "Bornes de recharge et solutions d'énergie renouvelable pour un avenir durable.",
    href: "/services#renewable",
  },
  {
    icon: <Network className="h-10 w-10 text-[#1459a6]" />,
    title: "Réseaux",
    description:
      "Conception et installation de réseaux électriques et informatiques performants.",
    href: "/services#networks",
  },
  {
    icon: <Shield className="h-10 w-10 text-[#1459a6]" />,
    title: "Sécurité",
    description:
      "Systèmes de vidéosurveillance et contrôle d'accès pour protéger vos biens et personnes.",
    href: "/services#security",
  },
  {
    icon: <Thermometer className="h-10 w-10 text-[#1459a6]" />,
    title: "Climatisation",
    description:
      "Solutions de climatisation et traitement d'air pour un confort optimal.",
    href: "/services#hvac",
  },
  {
    icon: <Server className="h-10 w-10 text-[#1459a6]" />,
    title: "Solutions Industrielles",
    description:
      "Équipements pour l'industrie et datacenters avec une expertise technique pointue.",
    href: "/services#industrial",
  },
  {
    icon: <Stethoscope className="h-10 w-10 text-[#1459a6]" />,
    title: "Équipements Biomédicaux",
    description:
      "Matériel biomédical et informatique pour le secteur de la santé.",
    href: "/services#biomedical",
  },
  {
    icon: <ShoppingBag className="h-10 w-10 text-[#1459a6]" />,
    title: "Commerce Général",
    description:
      "Import-export et commerce général de produits technologiques.",
    href: "/services#commerce",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Slider */}
      <section className="relative h-screen max-h-[800px] w-full overflow-hidden">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              currentSlide === index ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  y: currentSlide === index ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {image.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8">{image.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/services">
                    <Button
                      size="lg"
                      className="bg-[#be321d] hover:bg-[#be321d]/90 text-white"
                    >
                      Découvrir nos services
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-[#1459a6] hover:bg-gray-200 hover:text-[#1459a6]"
                    >
                      Nous contacter
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        ))}

        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "bg-white w-10"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Domains Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {"Nos Domaines d'Expertise"}
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez notre large gamme de solutions technologiques pour
              répondre à tous vos besoins.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="mb-4">{domain.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#1459a6]">
                  {domain.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {domain.description}
                </p>
                <Link
                  href={domain.href}
                  className="inline-flex items-center text-[#be321d] hover:text-[#be321d]/80 font-medium"
                >
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1459a5] to-[#1459a6] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer votre infrastructure technologique ?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            
            {"Contactez nos experts dès aujourd'hui pour discuter de vos besoins et découvrir comment nos solutions peuvent vous aider."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button
                size="lg"
                className="bg-[#be321d] hover:bg-[#be321d]/90 text-white"
              >
                Découvrir nos services
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-[#1459a6] hover:bg-gray-200 hover:text-[#1459a6]"
              >
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
