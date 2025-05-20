// components/auth/LoginTabContent.tsx
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { AuthDivider } from "./AuthDivider";

export const loginSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
});

interface LoginTabContentProps {
  form: UseFormReturn<z.infer<typeof loginSchema>>;
  onSubmit: (values: z.infer<typeof loginSchema>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  fadeIn: any;
}

export function LoginTabContent({
  form,
  onSubmit,
  showPassword,
  setShowPassword,
  fadeIn,
}: LoginTabContentProps) {
  // Wrapper de la fonction onSubmit pour ajouter le console.log
/*  const handleSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log("Données du formulaire de connexion:", values);
    console.log("Données envoyées:", {
      email: values.email,
      password: values.password,
    });
    onSubmit(values);
  };
*/
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const registrationData = {
      email: values.email,
      password: values.password,
    };
    
    console.log("Données d'inscription envoyées:", registrationData);
    
    try {
      const result = await signIn.email(registrationData, {
        onRequest: () => {
          console.log("Début de la requête de connexion");
        },
        onResponse: () => {
          console.log("Réponse reçue");
        },
        onError: (context) => {
          console.error("Erreur de connexion:", context.error);
          toast.error(context.error.message || "Erreur lors de la connexion");
          setIsLoading(false);
        },
        onSuccess: () => {
          console.log("connexion réussie");
          toast.success("Vous êtes connecté !");
          form.reset(); // Réinitialiser le formulaire
          onSubmit(values); // Appeler la fonction onSubmit si nécessaire
          setIsLoading(false);
           router.push("/");
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
      key="login"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

          <div>
           
            <Link
              href="#"
              className="text-sm text-[#1459a6] hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <Button
            type="submit"
           className="w-full bg-[#1459a6] hover:bg-[#1459a6]/90"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>
      </Form>

      <div className="mt-6">
        <AuthDivider text="Ou continuer avec" />
        <SocialAuthButtons />
      </div>
    </motion.div>
  );
}