
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
    userNamePlaceholder: { es: 'Usuario Empathia', en: 'Empathia User' },
    userEmailPlaceholder: { es: 'usuario@empathia.app', en: 'user@empathia.app' },
    navigationHeader: { es: 'Navegación', en: 'Navigation'}
  };

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          {state === 'expanded' && <Logo iconSize={24} textSize="text-xl" />}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2 flex flex-col"> {/* Ensures flex column layout and padding for children */}
        
        <ScrollArea className="flex-1 min-h-0"> {/* Scrollable area takes available space and can shrink */}
          <SidebarMenu className="py-2"> {/* Padding for the menu list itself */}
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
      
        {/* Fixed sections below scroll area, with their own spacing */}
        {/* Added mt-4 for spacing from scroll area, and gap-4 for internal spacing of fixed items */}
        <div className="mt-4 flex flex-col gap-4"> 
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
        </div>
      </SidebarContent>
      
      <SidebarSeparator />
      <SidebarFooter className="p-2 mt-auto"> {/* mt-auto pushes this to the bottom of Sidebar's flex container */}
        {state === 'expanded' ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="p-2 flex items-center gap-3 hover:bg-sidebar-accent rounded-md cursor-pointer transition-colors"> {/* Removed mt-4, border-t, pt-4 to simplify, relying on SidebarSeparator and parent flex for positioning */}
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
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuItem disabled>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>{t(commonLabels.profile)}</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t(commonLabels.settings)}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t(commonLabels.logout)}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex justify-center items-center py-2">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-full" aria-label={t(commonLabels.settings)}>
                        <UserCircle />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="center" className="w-56">
                    <DropdownMenuItem disabled>
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>{t(commonLabels.profile)}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t(commonLabels.settings)}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{t(commonLabels.logout)}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
