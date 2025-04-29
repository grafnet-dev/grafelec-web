import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Newsletter() {
  return (
    <section className="py-16 bg-[#1459a6]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Restez informé de nos nouveaux produits</h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Inscrivez-vous à notre newsletter pour recevoir en avant-première nos offres spéciales et nouveautés.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Votre adresse email"
            className="bg-white/10 text-white placeholder:text-white/60 border-white/20"
          />
          <Button className="bg-white text-[#1459a6] hover:bg-white/90">S'inscrire</Button>
        </div>
      </div>
    </section>
  )
}