// components/auth/RegisterTabContent.tsx
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { AuthDivider } from "./AuthDivider";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

interface RegisterTabContentProps {
  form: UseFormReturn<z.infer<typeof registerSchema>>;
  onSubmit: (values: z.infer<typeof registerSchema>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  fadeIn: any;
}

export function RegisterTabContent({
  form,
  onSubmit,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  fadeIn,
}: RegisterTabContentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    
    // Préparer les données pour l'envoi (sans confirmPassword)
    const registrationData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    
    console.log("Données d'inscription envoyées:", registrationData);
    
    try {
      const result = await signUp.email(registrationData, {
        onRequest: () => {
          console.log("Début de la requête d'inscription");
        },
        onResponse: () => {
          console.log("Réponse reçue");
        },
        onError: (context) => {
          console.error("Erreur d'inscription:", context.error);
          toast.error(context.error.message || "Erreur lors de l'inscription");
          setIsLoading(false);
        },
        onSuccess: () => {
          console.log("Inscription réussie");
          toast.success("Compte créé avec succès !");
          form.reset(); // Réinitialiser le formulaire
          onSubmit(values); // Appeler la fonction onSubmit si nécessaire
          setIsLoading(false);
        },
      });
      
      // Alternative si signUp.email retourne une promesse directement
      if (result && result.error) {
        throw new Error(result.error.message);
      }
      
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error(error.message || "Une erreur s'est produite lors de l'inscription");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="register"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-10"
                      placeholder="Votre nom"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-10"
                      placeholder="votre@email.com"
                      type="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-10 pr-10"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-10 pr-10"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#be321d] hover:bg-[#be321d]/90"
            disabled={isLoading}
          >
            {isLoading ? "Création en cours..." : "Créer un compte"}
          </Button>
        </form>
      </Form>

      <div className="mt-6">
        <AuthDivider text="Ou s'inscrire avec" />
        <SocialAuthButtons />
      </div>
    </motion.div>
  );
}