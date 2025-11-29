import { useParams, Link } from 'react-router-dom';
import { mockSections } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { Department } from '@/types/wiki';

const departmentNames: Record<Department, string> = {
  atendimento: 'Atendimento ao Cliente',
  ti: 'Tecnologia da Informação',
  financeiro: 'Financeiro',
  estoque: 'Estoque',
  admin: 'Administração',
};

export default function DepartmentView() {
  const { department } = useParams<{ department: Department }>();

  const section = mockSections.find((s) => s.department === department);

  if (!section) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Departamento não encontrado</h2>
          <p className="text-muted-foreground">O departamento solicitado não existe ou você não tem acesso.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-foreground">{section.title}</h1>
          <Badge variant="outline" className="text-sm">
            {departmentNames[department as Department]}
          </Badge>
        </div>
        <p className="text-muted-foreground">{section.subsections.length} artigos nesta seção</p>
      </div>

      <div className="grid gap-4">
        {section.subsections.map((subsection) => (
          <Link key={subsection.id} to={`/department/${department}/${subsection.id}`}>
            <Card className="hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span>{subsection.title}</span>
                </CardTitle>
                <CardDescription>
                  Por {subsection.author} • Atualizado em {subsection.updatedAt.toLocaleDateString('pt-BR')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {subsection.content.substring(0, 150)}...
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
