import { EvidenceItem } from '@/@types/about'

export const aboutIntro = {
  title: 'Sobre este projeto',
  paragraphs: [
    'Este site é o meu currículo e também um projeto de engenharia. Ele reúne interface pública, API, banco de dados e painel administrativo.',
    'As decisões abaixo mostram os problemas que escolhi resolver, os limites da arquitetura e os cuidados adotados para manter o sistema seguro e confiável.',
  ],
}

export const aboutDecisions = {
  title: 'Decisões',
  items: [
    {
      title: 'Currículo como sistema',
      paragraphs: [
        'Uma página estática seria suficiente para apresentar o currículo. Optei por construir um sistema completo para demonstrar integração entre interface, API, persistência e administração de conteúdo.',
        'O currículo é o produto visível; a arquitetura por trás dele demonstra como estruturo uma aplicação com abertura para evoluir. O front também utiliza o GrowthBook para controlar via feature flags recursos como a indicação de disponibilidade profissional.',
      ],
    },
    {
      title: 'Arquitetura desacoplada',
      paragraphs: [
        'A interface utiliza Next.js, enquanto a API foi construída com NestJS. Os projetos possuem repositórios e deploys independentes e se comunicam por REST.',
        'A solução poderia estar concentrada no Next.js, mas a separação torna explícitos o contrato HTTP, os limites entre as camadas e desafios como CORS, autenticação entre domínios e observabilidade distribuída.',
      ],
    },
    {
      title: 'Persistência, versionamento e cache',
      paragraphs: [
        'O currículo ainda evolui em estrutura e conteúdo. O modelo documental do MongoDB oferece flexibilidade para essas mudanças sem exigir um schema relacional rígido.',
        'Cada publicação cria um novo documento com uma versão incremental. A aplicação lê somente a versão vigente, enquanto as anteriores permanecem preservadas como trilha de auditoria e base para um possível rollback.',
        'Para reduzir a latência e a dependência da disponibilidade imediata da API, o Next.js mantém em cache o resultado da leitura do perfil.',
      ],
    },
    {
      title: 'Segurança e contrato da API',
      paragraphs: [
        'A leitura do currículo é pública, mas toda escrita exige autenticação. A sessão utiliza JWT em cookie HttpOnly, e as mutações são protegidas por CSRF.',
        'A API também aplica CORS restrito, Helmet e limitação de requisições. O Swagger documenta as rotas públicas e protegidas em modo somente leitura, permitindo consultar o contrato sem executar mutações.',
      ],
    },
    {
      title: 'Painel administrativo e validação',
      paragraphs: [
        'O painel administrativo permite editar e publicar o conteúdo exibido na página inicial.',
        'O formulário valida os dados para oferecer feedback imediato. A API aplica suas próprias validações como autoridade sobre os dados, sem depender das garantias do cliente.',
      ],
    },
    {
      title: 'Operação, observabilidade e qualidade',
      paragraphs: [
        'O frontend está hospedado na Vercel, a API no Render e os dados no MongoDB Atlas, todos em planos gratuitos.',
        'Quando uma leitura não pode ser atendida pelo cache e encontra a API suspensa por falta de tráfego, a interface informa ao visitante que o serviço está iniciando, em vez de apresentar uma falha silenciosa.',
        'New Relic monitora erros e transações no frontend e na API, enquanto o Contentsquare registra sinais de comportamento no site público.',
        'Os repositórios executam lint, formatação e verificação de tipos no CI.',
      ],
    },
  ],
}

export const aboutEvidence: { title: string; items: EvidenceItem[] } = {
  title: 'Algumas camadas',
  items: [
    {
      title: 'New Relic',
      src: '/carousel/newrelic.png',
      caption: 'Trace de ponta a ponta.',
      width: 1920,
      height: 1080,
    },
    {
      title: 'Contentsquare (Hotjar)',
      src: '/carousel/contentsquare.png',
      caption: 'Mapa de comportamento dos visitantes.',
      width: 1920,
      height: 1080,
    },
    {
      title: 'Painel administrativo',
      src: '/carousel/admin.png',
      caption:
        'O painel publica o currículo: mesma API, sessão e uma versão nova.',
      width: 1132,
      height: 995,
    },
    {
      title: 'GitHub Actions',
      src: '/carousel/github-actions.png',
      caption: 'CI no PR com check obrigatório para o merge.',
      width: 1125,
      height: 402,
    },
  ],
}

export const aboutStack = {
  title: 'Stack',
  githubs: [
    {
      label: 'presentation-nextjs',
      href: 'https://github.com/ruyfreire/presentation-nextjs',
    },
    {
      label: 'presentation-api',
      href: 'https://github.com/ruyfreire/presentation-api',
    },
  ],
  groups: [
    {
      label: 'Interface',
      items: [
        'Next.js',
        'TypeScript',
        'Tailwind',
        'shadcn/ui (Radix)',
        'TanStack Query',
        'Axios',
        'React Hook Form',
        'Motion',
      ],
    },
    {
      label: 'API',
      items: ['NestJS', 'TypeScript', 'Swagger', 'class-validator', 'Zod'],
    },
    {
      label: 'Acesso',
      items: [
        'JWT em cookie HttpOnly',
        'CSRF',
        'Helmet',
        'CORS restrito',
        'limite de taxa',
      ],
    },
    {
      label: 'Dados',
      items: ['MongoDB Atlas', 'versionamento por publicação'],
    },
    {
      label: 'Qualidade',
      items: ['Jest', 'Husky', 'GitHub Actions'],
    },
    {
      label: 'Operação',
      items: [
        'Vercel',
        'Render',
        'Atlas',
        'New Relic',
        'Contentsquare (Hotjar)',
        'GrowthBook',
      ],
    },
  ],
}
