
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
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
import { MessageSquare, BarChart3, LifeBuoy, LogOut, Settings, UserCircle, Globe, Moon, Sun, User as UserProfileIcon, Quote, Wind } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from '@/components/ui/scroll-area';

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: '/app/chat', translations: { es: 'Chat', en: 'Chat' }, icon: MessageSquare },
    { href: '/app/quotes', translations: { es: 'Citas Motivacionales', en: 'Motivational Quotes' }, icon: Quote },
    { href: '/app/breathing-exercises', translations: { es: 'Ejercicios de Respiración', en: 'Breathing Exercises' }, icon: Wind },
    { href: '/app/sentiment', translations: { es: 'Análisis de Sentimiento', en: 'Sentiment Analysis' }, icon: BarChart3 },
    { href: '/app/resources', translations: { es: 'Recursos', en: 'Resources' }, icon: LifeBuoy },
  ];

  const commonLabels = {
    profile: { es: 'Mi Perfil', en: 'My Profile' },
    settings: { es: 'Configuración', en: 'Settings' },
    logout: { es: 'Cerrar Sesión', en: 'Log Out' },
    themeToggle: { es: 'Tema', en: 'Theme' },
    activateDarkMode: { es: 'Activar Modo Oscuro', en: 'Activate Dark Mode' },
    activateLightMode: { es: 'Activar Modo Claro', en: 'Activate Light Mode' },
    darkMode: { es: 'Modo Oscuro', en: 'Dark Mode' },
    lightMode: { es: 'Modo Claro', en: 'Light Mode' },
    userNamePlaceholder: { es: 'Usuario Empathia', en: 'Empathia User' },
    userEmailPlaceholder: { es: 'usuario@empathia.app', en: 'user@empathia.app'},
    navigationHeader: { es: 'Navegación', en: 'Navigation'},
  };

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          {state === 'expanded' && <Logo iconSize={24} textSize="text-xl" />}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2 flex flex-col">
        
        <ScrollArea className="flex-1 min-h-0">
          <SidebarMenu className="py-2">
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
        </ScrollArea>

        {state === 'expanded' && (
          <div className="px-3 pt-4 flex items-end justify-start gap-2.5 opacity-60 group-hover/sidebar-wrapper:opacity-90 transition-opacity duration-300 -mb-1">
            {/* Eye-like Doodle */}
            <svg width="24" height="16" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" className="text-accent/80 dark:text-accent/70">
              <path d="M2 8 Q 12 2, 22 8 Q 12 14, 2 8 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="8" r="2.5" fill="currentColor"/>
            </svg>
            {/* Heart-like Doodle */}
            <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg" className="text-primary/80 dark:text-primary/70">
              <path d="M10 16.5L4.828 11.328C3.657 10.157 3.657 8.207 4.828 7.036C5.999 5.864 7.95 5.864 9.121 7.036L10 7.914L10.879 7.036C12.05 5.864 13.999 5.864 15.172 7.036C16.343 8.207 16.343 10.157 15.172 11.328L10 16.5Z" stroke="currentColor" strokeWidth="1.5" fill="hsl(var(--sidebar-background))" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </div>
        )}
      
        <div className="mt-auto pt-2 flex flex-col gap-4"> 
          <div className="group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
            {state === 'expanded' ? (
              <div className="flex flex-col gap-1 w-full">
                <p className="px-2 py-1.5 text-xs font-medium text-sidebar-foreground/70">{t(commonLabels.themeToggle)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => toggleTheme()}
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
                    onClick={() => toggleTheme()}
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
        </div>
      </SidebarContent>
      
      <SidebarSeparator />
      <SidebarFooter className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {state === 'expanded' ? (
              <div className="p-2 flex items-center gap-3 hover:bg-sidebar-accent rounded-md cursor-pointer transition-colors">
                <Avatar>
                  <AvatarImage 
                    src="https://placehold.co/40x40/CCCCCC/CCCCCC.png"
                    alt={user?.name || t(commonLabels.userNamePlaceholder)} 
                    data-ai-hint="anonymous user" />
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-sidebar-foreground truncate" title={user?.name || t(commonLabels.userNamePlaceholder)}>
                    {user?.name || t(commonLabels.userNamePlaceholder)}
                  </p>
                </div>
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="w-full" aria-label={t(commonLabels.profile)}>
                  <UserCircle />
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            side={state === 'expanded' ? "top" : "right"} 
            align={state === 'expanded' ? "start" : "center"} 
            className="w-64"
          >
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || t(commonLabels.userNamePlaceholder)}</p>
                <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || t(commonLabels.userEmailPlaceholder)}
                </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/app/profile">
                <UserProfileIcon className="mr-2 h-4 w-4" />
                <span>{t(commonLabels.profile)}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/app/profile"> {}
                <Settings className="mr-2 h-4 w-4" />
                <span>{t(commonLabels.settings)}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t(commonLabels.logout)}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
