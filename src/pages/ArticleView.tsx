import { useParams, Link } from 'react-router-dom';
import { mockSections } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Calendar, Edit } from 'lucide-react';
import { Department } from '@/types/wiki';

export default function ArticleView() {
  const { department, articleId } = useParams<{ department: Department; articleId: string }>();

  const section = mockSections.find((s) => s.department === department);
  const article = section?.subsections.find((sub) => sub.id === articleId);

  if (!article || !section) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Artigo não encontrado</h2>
          <p className="text-muted-foreground">O artigo solicitado não existe ou você não tem acesso.</p>
          <Link to="/">
            <Button className="mt-4" variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Link to={`/department/${department}`}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para {section.title}
        </Button>
      </Link>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-3xl">{article.title}</CardTitle>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Atualizado em {article.updatedAt.toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </div>
          <Badge variant="secondary" className="w-fit">
            {section.title}
          </Badge>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">{article.content}</div>
        </CardContent>
      </Card>
    </div>
  );
}
