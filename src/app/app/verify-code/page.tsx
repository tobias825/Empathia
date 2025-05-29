
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
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Keypad } from "lucide-react";

const codeSchema = z.object({
  verificationCode: z.string().length(6, { message: "El código debe tener 6 dígitos." }).regex(/^\d{6}$/, {message: "El código debe contener solo números."}),
});

export default function VerifyCodePage() {
  const router = useRouter();
  const { confirmPasswordUpdate } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const pageText = {
    title: { es: "Inserta el Código", en: "Enter Code" },
    description: { es: "Se ha enviado un código de verificación a tu correo electrónico (simulado). Ingrésalo a continuación.", en: "A verification code has been sent to your email (simulated). Enter it below." },
    codeLabel: { es: "Código de Verificación (6 dígitos)", en: "Verification Code (6 digits)" },
    codePlaceholder: { es: "123456", en: "123456" },
    submitButton: { es: "Verificar y Cambiar Contraseña", en: "Verify & Change Password" },
    successToastTitle: { es: "Contraseña Actualizada", en: "Password Updated" },
    successToastDesc: { es: "Tu contraseña ha sido cambiada exitosamente.", en: "Your password has been changed successfully." },
    errorToastTitle: { es: "Error de Verificación", en: "Verification Error" },
    errorToastDesc: { es: "El código no es válido o algo salió mal. Intenta de nuevo.", en: "The code is invalid or something went wrong. Please try again." },
  };

  const form = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof codeSchema>) {
    const success = confirmPasswordUpdate(values.verificationCode);
    if (success) {
      toast({
        title: t(pageText.successToastTitle),
        description: t(pageText.successToastDesc),
      });
      router.push('/app/profile');
    } else {
      toast({
        title: t(pageText.errorToastTitle),
        description: t(pageText.errorToastDesc),
        variant: "destructive",
      });
      // Optionally clear the input or allow retry
      // form.reset(); 
    }
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
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(pageText.codeLabel)}</FormLabel>
                     <div className="relative">
                        <Keypad className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                        <Input type="text" placeholder={t(pageText.codePlaceholder)} {...field} className="pl-10 tracking-widest text-center" maxLength={6}/>
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t(pageText.submitButton)} <ShieldCheck className="ml-2 h-4 w-4"/>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
