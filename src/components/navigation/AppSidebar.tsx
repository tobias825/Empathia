
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth.tsx';
import { MessageSquare, BarChart3, LifeBuoy, LogOut, Settings, UserCircle, Globe, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme(); 

  const navItems = [
    { href: '/app/chat', translations: { es: 'Chat', en: 'Chat' }, icon: MessageSquare },
    { href: '/app/sentiment', translations: { es: 'Análisis de Sentimiento', en: 'Sentiment Analysis' }, icon: BarChart3 },
    { href: '/app/resources', translations: { es: 'Recursos', en: 'Resources' }, icon: LifeBuoy },
  ];

  const commonLabels = {
    profile: { es: 'Perfil (Próximamente)', en: 'Profile (Coming Soon)' },
    settings: { es: 'Configuración (Próximamente)', en: 'Settings (Coming Soon)' },
    logout: { es: 'Cerrar Sesión', en: 'Log Out' },
    switchToEnglish: { es: 'Cambiar a Inglés', en: 'Switch to English' },
    switchToSpanish: { es: 'Switch to Spanish', en: 'Cambiar a Español' },
    language: { es: 'Idioma', en: 'Language' },
    themeToggle: { es: 'Tema', en: 'Theme' },
    activateDarkMode: { es: 'Activar Modo Oscuro', en: 'Activate Dark Mode' },
    activateLightMode: { es: 'Activar Modo Claro', en: 'Activate Light Mode' },
    darkMode: { es: 'Modo Oscuro', en: 'Dark Mode' },
    lightMode: { es: 'Modo Claro', en: 'Light Mode' },
    userNamePlaceholder: { es: 'Usuario', en: 'User' },
    userEmailPlaceholder: { es: 'email@example.com', en: 'email@example.com' },
    navigationHeader: { es: 'Navegación', en: 'Navigation'}
  };

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          {state === 'expanded' && <Logo iconSize={24} textSize="text-xl" />}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2 flex flex-col gap-4">
        {state === 'expanded' ? (
          <div className="flex flex-col gap-1">
            <p className="px-2 py-1.5 text-xs font-medium text-sidebar-foreground/70">{t(commonLabels.navigationHeader)}</p>
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                size="sm"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{t(item.translations)}</span>
                </Link>
              </Button>
            ))}
          </div>
        ) : (
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={t(item.translations)}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{t(item.translations)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      
        {/* Language Switcher Section */}
        <div className="group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
          {state === 'expanded' ? (
            <div className="flex flex-col gap-1">
              <p className="px-2 py-1.5 text-xs font-medium text-sidebar-foreground/70">{t(commonLabels.language)}</p>
              <Button
                variant={language === 'es' ? 'secondary' : 'ghost'}
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => setLanguage('es')}
              >
                <span className="opacity-80">🇪🇸</span> Español
              </Button>
              <Button
                variant={language === 'en' ? 'secondary' : 'ghost'}
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => setLanguage('en')}
              >
                <span className="opacity-80">🇬🇧</span> English
              </Button>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full"
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  aria-label={language === 'es' ? t(commonLabels.switchToEnglish) : t(commonLabels.switchToSpanish)}
                >
                  <Globe />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                {language === 'es' ? t(commonLabels.switchToEnglish) : t(commonLabels.switchToSpanish)}
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Theme Toggle Section */}
        <div className="group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
          {state === 'expanded' ? (
            <div className="flex flex-col gap-1 w-full">
              <p className="px-2 py-1.5 text-xs font-medium text-sidebar-foreground/70">{t(commonLabels.themeToggle)}</p>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={toggleTheme}
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span>{theme === 'light' ? t(commonLabels.darkMode) : t(commonLabels.lightMode)}</span>
              </Button>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full"
                  onClick={toggleTheme}
                  aria-label={theme === 'light' ? t(commonLabels.activateDarkMode) : t(commonLabels.activateLightMode)}
                >
                  {theme === 'light' ? <Moon /> : <Sun />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                {theme === 'light' ? t(commonLabels.activateDarkMode) : t(commonLabels.activateLightMode)}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </SidebarContent>
      
      <SidebarSeparator />
      <SidebarFooter className="p-2 mt-auto"> {/* Added mt-auto to push footer down */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={t(commonLabels.profile)} disabled>
              <UserCircle />
              <span>{t(commonLabels.profile)}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton tooltip={t(commonLabels.settings)} disabled>
              <Settings />
              <span>{t(commonLabels.settings)}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip={t(commonLabels.logout)}>
              <LogOut />
              <span>{t(commonLabels.logout)}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {state === 'expanded' && (
          <div className="mt-4 p-2 flex items-center gap-3 border-t border-sidebar-border pt-4">
            <Avatar>
              <AvatarImage src="https://placehold.co/40x40.png" alt={user?.name || t(commonLabels.userNamePlaceholder)} data-ai-hint="profile avatar" />
              <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground truncate" title={user?.name || t(commonLabels.userNamePlaceholder)}>
                {user?.name || t(commonLabels.userNamePlaceholder)}
              </p>
              <p className="text-xs text-sidebar-foreground/70 truncate" title={user?.email || t(commonLabels.userEmailPlaceholder)}>
                {user?.email || t(commonLabels.userEmailPlaceholder)}
              </p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
