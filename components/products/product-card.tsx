import Image from "next/image"
import { motion } from "framer-motion"
import { Product } from "@/lib/data/products"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-48 bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-[#1459a6]">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="mt-auto">
          <button className="inline-flex items-center text-[#be321d] hover:underline text-sm" >
            En savoir plus
          </button>
        </div>
      </div>
    </motion.div>
  )
}