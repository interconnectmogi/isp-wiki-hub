import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Department } from '@/types/wiki';
import { MarkdownEditor } from '@/components/MarkdownEditor';

const departments = [
  { value: 'atendimento', label: 'Atendimento' },
  { value: 'ti', label: 'TI' },
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'estoque', label: 'Estoque' },
];

export default function RequestContent() {
  const { toast } = useToast();
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
      title: 'Solicitação enviada!',
      description: 'Sua solicitação foi enviada para análise dos administradores.',
    });

    setTitle('');
    setContent('');
    setDepartment('');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Solicitar Novo Conteúdo</h1>
        <p className="text-muted-foreground">
          Sugira novos artigos ou procedimentos para serem adicionados à wiki
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nova Solicitação</CardTitle>
          <CardDescription>Preencha os detalhes do conteúdo que você gostaria de adicionar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <MarkdownEditor
              value={content}
              onChange={setContent}
              label="Conteúdo Sugerido"
              placeholder="Descreva o conteúdo que você gostaria de adicionar à wiki em Markdown. Você pode adicionar imagens!"
              rows={12}
              showPreview={true}
            />

            <Button type="submit" className="w-full">
              Enviar Solicitação
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
