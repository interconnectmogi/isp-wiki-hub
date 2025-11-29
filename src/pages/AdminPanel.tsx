import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockContentRequests } from '@/lib/mockData';
import { Check, X, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPanel() {
  const { toast } = useToast();

  const handleApprove = (id: string, title: string) => {
    toast({
      title: 'Solicitação aprovada',
      description: `"${title}" foi aprovada e será adicionada à wiki.`,
    });
  };

  const handleReject = (id: string, title: string) => {
    toast({
      title: 'Solicitação rejeitada',
      description: `"${title}" foi rejeitada.`,
      variant: 'destructive',
    });
  };

  const pendingRequests = mockContentRequests.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Painel Administrativo</h1>
        <p className="text-muted-foreground">Gerencie solicitações de conteúdo e permissões</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              Solicitações Pendentes
              <Badge variant="outline">{pendingRequests.length}</Badge>
            </CardTitle>
            <CardDescription>Analise e aprove novos conteúdos sugeridos pelos usuários</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingRequests.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Nenhuma solicitação pendente</p>
            ) : (
              pendingRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{request.title}</CardTitle>
                        <CardDescription>
                          Solicitado por {request.requestedBy} •{' '}
                          {request.createdAt.toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{request.department}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{request.content}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(request.id, request.title)}
                        className="bg-success hover:bg-success/90"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(request.id, request.title)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Rejeitar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
