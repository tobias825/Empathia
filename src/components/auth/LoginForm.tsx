
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
import { KeyRound, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  email: z.string().email({ message: "Dirección de correo electrónico inválida." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export function LoginForm() {
  const { toast } = useToast();
  const { login } = useAuth();
  const { t } = useLanguage();

  const translations = {
    emailLabel: { es: "Correo Electrónico", en: "Email" },
    emailPlaceholder: { es: "tu@email.com", en: "you@email.com" },
    passwordLabel: { es: "Contraseña", en: "Password" },
    passwordPlaceholder: { es: "••••••••", en: "••••••••" },
    loginButton: { es: "Iniciar Sesión", en: "Login" },
    noAccount: { es: "¿No tienes una cuenta?", en: "Don't have an account?" },
    registerLink: { es: "Regístrate aquí", en: "Sign up here" },
    loginSuccessTitle: { es: "Inicio de Sesión Exitoso", en: "Login Successful" },
    welcomeBack: { es: "¡Bienvenido/a de nuevo!", en: "Welcome back!" }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Intento de inicio de sesión:", values);
    toast({
      title: t(translations.loginSuccessTitle),
      description: t(translations.welcomeBack),
    });
    login(values.email); // Pass email to login
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(translations.emailLabel)}</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input placeholder={t(translations.emailPlaceholder)} {...field} className="pl-10"/>
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
                  <Input type="password" placeholder={t(translations.passwordPlaceholder)} {...field} className="pl-10"/>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t(translations.loginButton)}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {t(translations.noAccount)}{" "}
          <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/register">
             {t(translations.registerLink)}
            </Link>
          </Button>
        </p>
      </form>
    </Form>
  );
}
