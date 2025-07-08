"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";
import { Bell, FileText, Home, Settings, Ticket, Calendar, User, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Gestion des tickets",
      href: "/admin/tickets",
      icon: <Ticket className="h-5 w-5" />,
    },
    {
      title: "Utilisateurs",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Evènements",
      href: "/admin/events",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Articles",
      href: "/admin/articles",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Profil",
      href: "/admin/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Paramètres",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background md:hidden">
        <div className="container flex h-14 items-center">
          <button className="mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span className="sr-only">Toggle sidebar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#b60101] dark:text-red-400"></h1>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b60101] text-[10px] font-medium text-white">
                5
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-full flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b px-4 flex-shrink-0">
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
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <MainNav items={navItems} isAdmin={true} />
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden md:ml-0 ">
        {/* Desktop header */}
        <header className="flex-shrink-0 border-b bg-background hidden md:block px-4 sm:px-6 lg:px-8">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-slate-500" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b60101] text-[10px] font-medium text-white">
                  5
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto bg-background pt-14 md:pt-0">
          <div className="container py-6">{children}</div>
        </div>
      </main>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}