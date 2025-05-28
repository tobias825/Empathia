
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth.tsx"; // Ensure .tsx extension
import { User, KeyRound, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Dirección de correo electrónico inválida." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export function RegisterForm() {
  const { toast } = useToast();
  const { register } = useAuth();
  const { t } = useLanguage();

  const translations = {
    nameLabel: { es: "Nombre Completo", en: "Full Name" },
    namePlaceholder: { es: "Tu Nombre", en: "Your Name" },
    emailLabel: { es: "Correo Electrónico", en: "Email" },
    emailPlaceholder: { es: "tu@email.com", en: "you@email.com" },
    passwordLabel: { es: "Contraseña", en: "Password" },
    passwordPlaceholder: { es: "••••••••", en: "••••••••" },
    registerButton: { es: "Crear Cuenta", en: "Create Account" },
    hasAccount: { es: "¿Ya tienes una cuenta?", en: "Already have an account?" },
    loginLink: { es: "Inicia sesión aquí", en: "Login here" },
    registerSuccessTitle: { es: "Registro Exitoso", en: "Registration Successful" },
    welcomeMessage: { es: "¡Bienvenido/a a Empathia! Por favor, inicia sesión.", en: "Welcome to Empathia! Please log in." }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Intento de registro:", values);
    toast({
      title: t(translations.registerSuccessTitle),
      description: t(translations.welcomeMessage),
    });
    register(values.name, values.email); // Pass name and email to register
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(translations.nameLabel)}</FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input placeholder={t(translations.namePlaceholder)} {...field} className="pl-10" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(translations.emailLabel)}</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input placeholder={t(translations.emailPlaceholder)} {...field} className="pl-10" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(translations.passwordLabel)}</FormLabel>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input type="password" placeholder={t(translations.passwordPlaceholder)} {...field} className="pl-10" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t(translations.registerButton)}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {t(translations.hasAccount)}{" "}
          <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/login">
              {t(translations.loginLink)}
            </Link>
          </Button>
        </p>
      </form>
    </Form>
  );
}
