
"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAuth } from '@/hooks/useAuth.tsx';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Mail, KeyRound, Eye, EyeOff, UserCircle as UserIcon, Edit3, UserSquare2, LockKeyhole } from 'lucide-react';

const nameFormSchema = z.object({
  newName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
});

export default function ProfilePage() {
  const { user, updateName } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);

  const nameForm = useForm<z.infer<typeof nameFormSchema>>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: {
      newName: user?.name || "",
    },
  });

  React.useEffect(() => {
    if (user) {
      nameForm.reset({ newName: user.name });
    }
  }, [user, nameForm]);

  const pageText = {
    title: { es: "Mi Perfil", en: "My Profile" },
    description: { es: "Revisa y gestiona la información de tu cuenta.", en: "Review and manage your account information." },
    emailLabel: { es: "Correo Electrónico", en: "Email" },
    passwordLabel: { es: "Contraseña (Simulada)", en: "Password (Simulated)" },
    showPasswordButton: { es: "Mostrar contraseña", en: "Show password" },
    hidePasswordButton: { es: "Ocultar contraseña", en: "Hide password" },
    nameLabel: { es: "Nombre", en: "Name"},
    loadingUser: { es: "Cargando información del usuario...", en: "Loading user information..."},
    editProfile: { es: "Editar Perfil", en: "Edit Profile" },
    changeUsername: { es: "Cambiar Nombre de Usuario", en: "Change Username" },
    changePassword: { es: "Cambiar Contraseña", en: "Change Password" },
    dialogChangeUsernameTitle: { es: "Cambiar Nombre de Usuario", en: "Change Username" },
    dialogNewNameLabel: { es: "Nuevo Nombre", en: "New Name" },
    dialogCancel: { es: "Cancelar", en: "Cancel" },
    dialogSave: { es: "Guardar", en: "Save" },
    nameUpdateSuccess: { es: "Nombre actualizado con éxito.", en: "Name updated successfully." },
    nameUpdateError: { es: "Error al actualizar el nombre.", en: "Error updating name." },
  };

  const handleNameChange = (values: z.infer<typeof nameFormSchema>) => {
    try {
      updateName(values.newName);
      toast({ title: t(pageText.nameUpdateSuccess) });
      setIsNameDialogOpen(false);
    } catch (error) {
      toast({ title: t(pageText.nameUpdateError), variant: "destructive" });
      console.error("Error updating name:", error);
    }
  };

  if (!user) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>{t(pageText.loadingUser)}</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <CardHeader className="text-center mb-6 px-0">
        <UserIcon className="mx-auto h-16 w-16 text-primary mb-3" />
        <CardTitle className="text-3xl font-bold text-foreground">
          {t(pageText.title)}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {t(pageText.description)}
        </CardDescription>
      </CardHeader>

      <Card className="w-full shadow-xl rounded-xl border">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="profile-name" className="text-sm font-medium text-muted-foreground flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              {t(pageText.nameLabel)}
            </label>
            <p id="profile-name" className="text-lg font-semibold text-foreground p-3 bg-muted/20 dark:bg-muted/30 rounded-md border border-input">
              {user.name || 'N/A'}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="profile-email" className="text-sm font-medium text-muted-foreground flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              {t(pageText.emailLabel)}
            </label>
            <p id="profile-email" className="text-lg font-semibold text-foreground p-3 bg-muted/20 dark:bg-muted/30 rounded-md border border-input">
              {user.email || 'N/A'}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="profile-password" className="text-sm font-medium text-muted-foreground flex items-center">
              <KeyRound className="mr-2 h-4 w-4" />
              {t(pageText.passwordLabel)}
            </label>
            <div className="flex items-center gap-2 p-3 bg-muted/20 dark:bg-muted/30 rounded-md border border-input">
              <p id="profile-password" className="text-lg font-semibold text-foreground flex-1 break-all">
                {showPassword ? (user.password || 'N/A') : '••••••••'}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t(pageText.hidePasswordButton) : t(pageText.showPasswordButton)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-6 border-t">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
                <Edit3 className="mr-2 h-5 w-5 text-primary"/>
                {t(pageText.editProfile)}
            </h3>
            <div className="flex flex-col gap-4 w-full">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left" 
                  onClick={() => { /* No action for now */ }}
                >
                    <LockKeyhole className="mr-2 h-4 w-4"/>
                    {t(pageText.changePassword)}
                </Button>

                <AlertDialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                            <UserSquare2 className="mr-2 h-4 w-4"/>
                            {t(pageText.changeUsername)}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>{t(pageText.dialogChangeUsernameTitle)}</AlertDialogTitle>
                        </AlertDialogHeader>
                        <Form {...nameForm}>
                            <form onSubmit={nameForm.handleSubmit(handleNameChange)} className="space-y-4">
                                <FormField
                                control={nameForm.control}
                                name="newName"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{t(pageText.dialogNewNameLabel)}</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => nameForm.reset({newName: user?.name || ""})}>
                                        {t(pageText.dialogCancel)}
                                    </AlertDialogCancel>
                                    <AlertDialogAction type="submit">{t(pageText.dialogSave)}</AlertDialogAction>
                                </AlertDialogFooter>
                            </form>
                        </Form>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
