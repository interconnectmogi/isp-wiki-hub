import { FileText, Users, DollarSign, Package, Settings, Plus, Bell } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Department } from '@/types/wiki';

interface WikiSidebarProps {
  userDepartments: Department[];
  isAdmin: boolean;
  pendingRequestsCount?: number;
}

const departmentItems = [
  { title: 'Atendimento', department: 'atendimento' as Department, icon: Users },
  { title: 'TI', department: 'ti' as Department, icon: Settings },
  { title: 'Financeiro', department: 'financeiro' as Department, icon: DollarSign },
  { title: 'Estoque', department: 'estoque' as Department, icon: Package },
];

export function WikiSidebar({ userDepartments, isAdmin, pendingRequestsCount = 0 }: WikiSidebarProps) {
  const accessibleDepartments = isAdmin
    ? departmentItems
    : departmentItems.filter((item) => userDepartments.includes(item.department));

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <h2 className="text-lg font-bold text-primary">Wiki ISP</h2>
        <p className="text-xs text-muted-foreground">Base de Conhecimento</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" end activeClassName="bg-accent text-accent-foreground font-medium">
                    <FileText className="h-4 w-4" />
                    <span>Início</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/requests" activeClassName="bg-accent text-accent-foreground font-medium">
                    <Plus className="h-4 w-4" />
                    <span>Solicitar Conteúdo</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin" activeClassName="bg-accent text-accent-foreground font-medium">
                      <Bell className="h-4 w-4" />
                      <span className="flex items-center gap-2">
                        Admin
                        {pendingRequestsCount > 0 && (
                          <Badge variant="destructive" className="h-5 min-w-5 px-1">
                            {pendingRequestsCount}
                          </Badge>
                        )}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Departamentos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accessibleDepartments.map((item) => (
                <SidebarMenuItem key={item.department}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={`/department/${item.department}`}
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="text-xs text-muted-foreground">
          {isAdmin ? (
            <Badge variant="outline" className="border-primary text-primary">
              Administrador
            </Badge>
          ) : (
            <div>
              Acesso: {userDepartments.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')}
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
