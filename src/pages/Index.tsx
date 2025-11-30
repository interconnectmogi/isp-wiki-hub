import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { WikiSidebar } from '@/components/WikiSidebar';
import { mockUser, mockContentRequests } from '@/lib/mockData';
import { Outlet } from 'react-router-dom';
import logoImage from '@/assets/conexao-web-logo.png';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const pendingRequestsCount = mockContentRequests.filter((r) => r.status === 'pending').length;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <WikiSidebar
          userDepartments={mockUser.departments}
          isAdmin={mockUser.role === 'admin'}
          pendingRequestsCount={pendingRequestsCount}
        />
        <main className="flex-1 bg-background">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger />
            <img src={logoImage} alt="Conexão Web" className="h-8 w-8 object-contain" />
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Bem-vindo,</span>
                <span className="font-medium text-foreground">{mockUser.name}</span>
              </div>
            </div>
          </header>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
