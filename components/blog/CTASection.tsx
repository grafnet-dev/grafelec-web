import { Button } from "@/components/ui/button"
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-16 bg-[#1459a6]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Vous avez des questions techniques ?</h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Nos experts sont disponibles pour vous aider à trouver les meilleures solutions pour vos projets.
        </p>
        <Link href="/contact">
        <Button className="bg-white text-[#1459a6] hover:text-[#be321d] hover:bg-white">Nous Contacter</Button>
        </Link>
      </div>
    </section>
  )
}