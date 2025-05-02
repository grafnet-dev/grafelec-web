"use client"

import React from "react"
import { partners } from "@/lib/data/partners"
import Image from "next/image";
import FeaturedPartners from "@/components/partners/FeaturedPartners"
import AllPartners from "@/components/partners/AllPartners"
import PartnershipBenefits from "@/components/partners/BenefitsPartners"
import BecomePartner from "@/components/partners/BecomePartners"

export default function PartnersPage() {
  // Filtrer les partenaires en vedette
  const featuredPartners = partners.filter((partner) => partner.featured)

  return (
    <div className="pt-20">
     {/* Hero Section with Background Image */}
          <section className="relative py-50 ">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/partner.jpg"
                alt="Hero background"
                fill
                className="object-cover brightness-50 "
                priority
              />
            </div>
            {/* Content overlaid on the image */}
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Partenaires</h1>
          <p className="text-xl">
            Découvrez les entreprises de confiance avec lesquelles nous collaborons pour vous offrir les meilleures
            solutions.
          </p>
              </div>
            </div>
          </section>
      <FeaturedPartners partners={featuredPartners} />
      <AllPartners partners={partners} />
      <PartnershipBenefits />
      <BecomePartner />
    </div>
  )
}