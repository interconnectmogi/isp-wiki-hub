import { User, WikiSection, ContentRequest } from '@/types/wiki';

export const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@isp.com',
  departments: ['admin', 'ti', 'financeiro'],
  role: 'admin',
};

export const mockSections: WikiSection[] = [
  {
    id: '1',
    title: 'Atendimento ao Cliente',
    department: 'atendimento',
    order: 1,
    subsections: [
      {
        id: '1-1',
        title: 'Procedimentos de Abertura de Chamado',
        content: '## Como abrir um chamado\n\n1. Acesse o sistema de tickets\n2. Preencha as informações do cliente\n3. Classifique o problema\n4. Atribua prioridade',
        author: 'João Silva',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        sectionId: '1',
      },
      {
        id: '1-2',
        title: 'Scripts de Atendimento',
        content: '## Scripts padrão\n\n### Saudação inicial\n"Olá, bem-vindo à [Nome da Empresa]. Meu nome é [Nome]. Como posso ajudá-lo hoje?"\n\n### Encerramento\n"Há mais algo em que posso ajudar? Obrigado por entrar em contato!"',
        author: 'Maria Santos',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-02-10'),
        sectionId: '1',
      },
    ],
  },
  {
    id: '2',
    title: 'Tecnologia da Informação',
    department: 'ti',
    order: 2,
    subsections: [
      {
        id: '2-1',
        title: 'Configuração de Roteadores',
        content: '## Configuração básica de roteadores\n\n### Mikrotik\n- IP padrão: 192.168.88.1\n- Usuário: admin\n- Senha: [configurar]\n\n### Comandos essenciais\n```\n/ip address add\n/interface bridge add\n```',
        author: 'Carlos Tech',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-03-01'),
        sectionId: '2',
      },
      {
        id: '2-2',
        title: 'Troubleshooting de Rede',
        content: '## Diagnóstico de problemas\n\n1. Verificar conectividade física\n2. Testar ping para gateway\n3. Verificar DNS\n4. Analisar logs do sistema',
        author: 'Ana Network',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
        sectionId: '2',
      },
    ],
  },
  {
    id: '3',
    title: 'Financeiro',
    department: 'financeiro',
    order: 3,
    subsections: [
      {
        id: '3-1',
        title: 'Processo de Cobrança',
        content: '## Fluxo de cobrança\n\n1. Geração de boletos (dia 1)\n2. Envio por email/WhatsApp (dia 2)\n3. Vencimento (dia 10)\n4. Follow-up (dia 15)\n5. Bloqueio (dia 20)',
        author: 'Pedro Finanças',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
        sectionId: '3',
      },
    ],
  },
  {
    id: '4',
    title: 'Estoque',
    department: 'estoque',
    order: 4,
    subsections: [
      {
        id: '4-1',
        title: 'Controle de Equipamentos',
        content: '## Entrada de equipamentos\n\n- Registrar nota fiscal\n- Catalogar no sistema\n- Etiquetar com código de barras\n- Armazenar em local apropriado',
        author: 'Lucas Estoque',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-12'),
        sectionId: '4',
      },
    ],
  },
];

export const mockContentRequests: ContentRequest[] = [
  {
    id: 'r1',
    title: 'Procedimento de Instalação Fibra Óptica',
    content: 'Gostaria de adicionar um guia completo sobre instalação de fibra óptica, incluindo ferramentas necessárias e passo a passo.',
    department: 'ti',
    requestedBy: 'Roberto Técnico',
    status: 'pending',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'r2',
    title: 'Política de Descontos',
    content: 'Documentar a política de descontos para casos especiais e clientes antigos.',
    department: 'financeiro',
    requestedBy: 'Carla Vendas',
    status: 'pending',
    createdAt: new Date('2024-03-12'),
  },
];
