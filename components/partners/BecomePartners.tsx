"use client"


import { Button } from "@/components/ui/button"
import Link from "next/link";

const BecomePartner: React.FC = () => {
  return (
    <section className="py-20 bg-[#1459a6]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Devenez Notre Partenaire</h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Vous êtes un fabricant ou un fournisseur de solutions technologiques ? Rejoignez notre réseau de partenaires
          et développons ensemble de nouvelles opportunités.
        </p>
        <Link href="/contact">
        <Button className="bg-white text-[#1459a6] hover:text-[#be321d] hover:bg-white">Nous Contacter</Button>
        </Link>
      </div>
    </section>
  )
}

export default BecomePartner