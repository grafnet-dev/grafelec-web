// app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginTabContent, loginSchema } from "@/components/auth/LoginTabContent";
import { RegisterTabContent, registerSchema } from "@/components/auth/RegisterTabContent";
import { AuthSidebar } from "@/components/auth/AuthSidebar";
import { BackgroundPattern } from "@/components/auth/BackgroundPattern";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialisation du formulaire de connexion
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Initialisation du formulaire d'inscription
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // Soumission du formulaire de connexion
  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    // Logique de connexion ici
  }

  // Soumission du formulaire d'inscription
  function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
    // Logique d'inscription ici
  }

  // Animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <BackgroundPattern />

      {/* Container principal avec ombre unique */}
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <AuthSidebar />

            {/* Côté droit - Formulaire */}
            <div className="p-8 lg:p-12">
              <Tabs
                defaultValue="login"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="register">Inscription</TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {activeTab === "login" && (
                    <TabsContent value="login" className="mt-0" forceMount>
                      <LoginTabContent
                        form={loginForm}
                        onSubmit={onLoginSubmit}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        fadeIn={fadeIn}
                      />
                    </TabsContent>
                  )}

                  {activeTab === "register" && (
                    <TabsContent value="register" className="mt-0" forceMount>
                      <RegisterTabContent
                        form={registerForm}
                        onSubmit={onRegisterSubmit}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        showConfirmPassword={showConfirmPassword}
                        setShowConfirmPassword={setShowConfirmPassword}
                        fadeIn={fadeIn}
                      />
                    </TabsContent>
                  )}
                </AnimatePresence>
              </Tabs>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}