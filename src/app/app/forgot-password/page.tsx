
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth.tsx";
import { useLanguage } from "@/contexts/LanguageContext";
import { KeyRound, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const passwordSchema = z.object({
  newPassword: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { setPendingPassword } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const pageText = {
    title: { es: "¿Y mi contraseña?", en: "My Password?" },
    description: { es: "Ingresa tu nueva contraseña. Luego te pediremos un código de verificación.", en: "Enter your new password. We'll ask for a verification code next." },
    newPasswordLabel: { es: "Nueva Contraseña", en: "New Password" },
    newPasswordPlaceholder: { es: "••••••••", en: "••••••••" },
    submitButton: { es: "Hecho", en: "Done" },
    passwordSetToast: { es: "Nueva contraseña lista para verificación.", en: "New password ready for verification."}
  };

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof passwordSchema>) {
    setPendingPassword(values.newPassword);
    toast({
      title: t(pageText.passwordSetToast),
    });
    router.push('/app/verify-code');
  }

  return (
    <div className="container mx-auto max-w-md py-12">
      <Card className="shadow-xl rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">{t(pageText.title)}</CardTitle>
          <CardDescription>{t(pageText.description)}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(pageText.newPasswordLabel)}</FormLabel>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input type="password" placeholder={t(pageText.newPasswordPlaceholder)} {...field} className="pl-10"/>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t(pageText.submitButton)} <Send className="ml-2 h-4 w-4"/>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
