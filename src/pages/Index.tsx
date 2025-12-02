import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { WikiSidebar } from '@/components/WikiSidebar';
import { mockUser, mockContentRequests } from '@/lib/mockData';
import { Outlet, useNavigate } from 'react-router-dom';
import logoImage from '@/assets/conexao-web-logo.png';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Index = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pendingRequestsCount = mockContentRequests.filter((r) => r.status === 'pending').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <WikiSidebar
          userDepartments={mockUser.departments}
          isAdmin={mockUser.role === 'admin'}
          pendingRequestsCount={pendingRequestsCount}
        />
        <main className="flex-1 bg-background min-w-0">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-2 sm:gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 sm:px-6">
            <SidebarTrigger />
            <img src={logoImage} alt="Conexão Web" className="h-7 w-7 sm:h-8 sm:w-8 object-contain" />
            <div className="flex-1" />
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Bem-vindo,</span>
                <span className="font-medium text-foreground">{user?.name || mockUser.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
