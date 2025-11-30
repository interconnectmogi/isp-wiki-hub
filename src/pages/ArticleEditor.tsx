import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Department } from '@/types/wiki';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const departments = [
  { value: 'atendimento', label: 'Atendimento' },
  { value: 'ti', label: 'TI' },
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'estoque', label: 'Estoque' },
];

export default function ArticleEditor() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [department, setDepartment] = useState<Department | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !department) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Artigo salvo!',
      description: 'O artigo foi publicado na wiki com sucesso.',
    });

    setTitle('');
    setContent('');
    setDepartment('');
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="max-w-5xl space-y-6">
      <Link to="/admin">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao painel
        </Button>
      </Link>

      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Criar Novo Artigo</h1>
        <p className="text-muted-foreground">
          Crie um novo artigo para a wiki com suporte completo a Markdown e imagens
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Artigo</CardTitle>
          <CardDescription>Preencha as informações e o conteúdo do artigo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Artigo</Label>
                <Input
                  id="title"
                  placeholder="Ex: Procedimento de Instalação de Fibra"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select value={department} onValueChange={(value) => setDepartment(value as Department)}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Selecione um departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <MarkdownEditor
              value={content}
              onChange={setContent}
              label="Conteúdo do Artigo"
              placeholder="Escreva o conteúdo do artigo em Markdown. Você pode adicionar imagens clicando no botão acima."
              rows={15}
              showPreview={true}
            />

            <Button type="submit" className="w-full" size="lg">
              <Save className="h-4 w-4 mr-2" />
              Publicar Artigo
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
