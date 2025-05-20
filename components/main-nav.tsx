"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items: {
    title: string
    href: string
    icon: React.ReactNode
  }[]
  isAdmin?: boolean
}

export function MainNav({ items, isAdmin = false }: MainNavProps) {
  const pathname = usePathname()
  const baseColor = isAdmin ? "text-[#b60101]" : "text-[#024b94]"

  return (
    <nav className="flex flex-col gap-2 w-full">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
            pathname === item.href
              ? `${baseColor} bg-slate-100 dark:bg-slate-800 font-medium`
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
