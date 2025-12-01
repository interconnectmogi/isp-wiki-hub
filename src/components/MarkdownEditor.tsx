import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Image, Eye } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useToast } from '@/hooks/use-toast';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  showPreview?: boolean;
}

export function MarkdownEditor({
  value,
  onChange,
  label = 'Conteúdo',
  placeholder = 'Escreva seu conteúdo em Markdown...',
  rows = 10,
  showPreview = true,
}: MarkdownEditorProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Arquivo inválido',
        description: 'Por favor, selecione uma imagem.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Arquivo muito grande',
        description: 'O tamanho máximo da imagem é 5MB.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const imageMarkdown = `![${file.name}](${base64})`;
      onChange(value + '\n\n' + imageMarkdown);
      toast({
        title: 'Imagem adicionada',
        description: 'A imagem foi inserida no editor.',
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            <Image className="h-4 w-4 mr-2" />
            Adicionar Imagem
          </Button>
          {showPreview && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? 'Editar' : 'Preview'}
            </Button>
          )}
        </div>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {isPreviewMode ? (
        <Card className="p-4 min-h-[240px]">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {value || '*Nenhum conteúdo para visualizar*'}
            </ReactMarkdown>
          </div>
        </Card>
      ) : (
        <>
          <Textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Suporta Markdown: **negrito**, *itálico*, [links](url), `código`, # títulos, listas, etc.
          </p>
        </>
      )}
    </div>
  );
}
