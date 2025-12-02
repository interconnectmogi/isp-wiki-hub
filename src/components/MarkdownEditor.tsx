import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Image, Eye, X } from 'lucide-react';
import { useState, useMemo } from 'react';
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

// Regex to match base64 images in markdown
const BASE64_IMAGE_REGEX = /!\[([^\]]*)\]\((data:image\/[^;]+;base64,[^)]+)\)/g;

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

  // Extract base64 images and create a map
  const { displayValue, imageMap } = useMemo(() => {
    const images: Map<string, string> = new Map();
    let index = 0;
    
    const display = value.replace(BASE64_IMAGE_REGEX, (match, alt, base64Url) => {
      const placeholder = `__IMAGE_${index}__`;
      images.set(placeholder, base64Url);
      index++;
      return `![${alt || 'imagem'}](${placeholder})`;
    });
    
    return { displayValue: display, imageMap: images };
  }, [value]);

  // Convert display value back to actual value with base64
  const handleDisplayChange = (displayText: string) => {
    let actualValue = displayText;
    
    imageMap.forEach((base64Url, placeholder) => {
      const placeholderRegex = new RegExp(`\\]\\(${placeholder}\\)`, 'g');
      actualValue = actualValue.replace(placeholderRegex, `](${base64Url})`);
    });
    
    onChange(actualValue);
  };

  // Remove an image by its index
  const handleRemoveImage = (indexToRemove: number) => {
    let currentIndex = 0;
    const newValue = value.replace(BASE64_IMAGE_REGEX, (match) => {
      if (currentIndex === indexToRemove) {
        currentIndex++;
        return ''; // Remove this image
      }
      currentIndex++;
      return match;
    });
    // Clean up extra newlines left behind
    onChange(newValue.replace(/\n{3,}/g, '\n\n').trim());
    toast({
      title: 'Imagem removida',
      description: 'A imagem foi removida do editor.',
    });
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <Label>{label}</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('image-upload')?.click()}
            className="flex-1 sm:flex-none"
          >
            <Image className="h-4 w-4 mr-2" />
            <span className="sm:inline">Imagem</span>
          </Button>
          {showPreview && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex-1 sm:flex-none"
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
            value={displayValue}
            onChange={(e) => handleDisplayChange(e.target.value)}
            rows={rows}
            className="font-mono text-sm"
          />
          {imageMap.size > 0 && (
            <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/30">
              <span className="text-xs text-muted-foreground w-full mb-1">
                Imagens incorporadas ({imageMap.size}) - clique no X para remover:
              </span>
              {Array.from(imageMap.entries()).map(([placeholder, base64Url], index) => (
                <div 
                  key={placeholder} 
                  className="relative group"
                  title={`Imagem ${index + 1} - clique para remover`}
                >
                  <img 
                    src={base64Url} 
                    alt={`Imagem ${index + 1}`}
                    className="h-16 w-16 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                    title="Remover imagem"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5 rounded-b">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Suporta Markdown: **negrito**, *itálico*, [links](url), `código`, # títulos, listas, etc.
          </p>
        </>
      )}
    </div>
  );
}