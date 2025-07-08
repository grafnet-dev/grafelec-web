"use client"

import { usePathname } from 'next/navigation'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Liste des chemins où la navbar et le footer sont cachés
  const hideNavbarPaths = ["/login", "/signup", "/auth/signin","/admin/tickets","/admin/events","/admin/articles","/user/tickets"];
  
  // Vérifie si on est sur un dashboard
  const isAdminDashboard = pathname?.startsWith("/admin");
  const isMerchantDashboard = pathname?.startsWith("/user");
  const isDashboard = isAdminDashboard || isMerchantDashboard;
  
  // Cacher la navbar et le footer pour les chemins spécifiés ainsi que les dashboards
  const shouldHideNavbarAndFooter = 
    hideNavbarPaths.some((path) => pathname?.startsWith(path)) || 
    isDashboard;

  return (
    <div className="flex min-h-screen flex-col">
      {!shouldHideNavbarAndFooter && <Navigation />}
      
      <main className="flex-1">
        {isDashboard ? (
          <ThemeProvider 
            attribute="class" 
            defaultTheme="light" 
            enableSystem 
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        ) : (
          children
        )}
      </main>
      
      <Toaster/>
      {!shouldHideNavbarAndFooter && <Footer />}
    </div>
  )
}