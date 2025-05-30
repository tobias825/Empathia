
"use client";

import { AppSidebar } from '@/components/navigation/AppSidebar';
import { ProtectRoute } from '@/hooks/useAuth';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FloatingShapes } from '@/components/decorative/FloatingShapes';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectRoute>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/90 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-3">
            <SidebarTrigger className="md:hidden" />
            {/* Potentially add breadcrumbs or page title here */}
          </header>
          <ScrollArea className="flex-1">
            <main className="p-4 sm:px-6 sm:py-0 md:gap-8 relative">
              <FloatingShapes variant="layout" className="z-0" />
              <div className="relative z-10">
                {children}
              </div>
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </ProtectRoute>
  );
}
