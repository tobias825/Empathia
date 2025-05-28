
"use client";

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth.tsx';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, KeyRound, Eye, EyeOff, UserCircle as UserIcon } from 'lucide-react'; // Renamed UserCircle to UserIcon to avoid conflict

export default function ProfilePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const pageText = {
    title: { es: "Mi Perfil", en: "My Profile" },
    description: { es: "Revisa y gestiona la información de tu cuenta.", en: "Review and manage your account information." },
    emailLabel: { es: "Correo Electrónico", en: "Email" },
    passwordLabel: { es: "Contraseña (Simulada)", en: "Password (Simulated)" },
    showPasswordButton: { es: "Mostrar contraseña", en: "Show password" },
    hidePasswordButton: { es: "Ocultar contraseña", en: "Hide password" },
    nameLabel: { es: "Nombre", en: "Name"},
    loadingUser: { es: "Cargando información del usuario...", en: "Loading user information..."}
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
      </Card>
    </div>
  );
}
