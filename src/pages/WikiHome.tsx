import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Clock } from 'lucide-react';
import { useState } from 'react';
import { mockSections } from '@/lib/mockData';
import { Link } from 'react-router-dom';

export default function WikiHome() {
  const [searchQuery, setSearchQuery] = useState('');

  const recentUpdates = mockSections
    .flatMap((section) =>
      section.subsections.map((sub) => ({
        ...sub,
        sectionTitle: section.title,
        department: section.department,
      }))
    )
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  const filteredSections = mockSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.subsections.some((sub) => sub.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">Base de Conhecimento</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Documentação e procedimentos da empresa</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar na wiki..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Atualizações Recentes
            </CardTitle>
            <CardDescription>Últimos conteúdos modificados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUpdates.map((item) => (
                <Link
                  key={item.id}
                  to={`/department/${item.department}/${item.id}`}
                  className="block p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.sectionTitle} • {item.updatedAt.toLocaleDateString('pt-BR')}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Acesso Rápido
            </CardTitle>
            <CardDescription>Seções mais acessadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredSections.slice(0, 5).map((section) => (
                <Link
                  key={section.id}
                  to={`/department/${section.department}`}
                  className="block p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <p className="font-medium text-sm">{section.title}</p>
                  <p className="text-xs text-muted-foreground">{section.subsections.length} artigos</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Todas as Seções</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSections.map((section) => (
            <Card key={section.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <CardDescription>{section.subsections.length} artigos disponíveis</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  to={`/department/${section.department}`}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Ver todos →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
