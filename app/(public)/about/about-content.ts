import { EvidenceItem } from '@/@types/about'

export const aboutIntro = {
  title: 'Sobre este projeto',
  paragraphs: [
    'Este site é o meu currículo e também um projeto de engenharia. Ele reúne interface pública, API, persistência e um fluxo de publicação.',
    'As decisões abaixo registram o que escolhi simplificar, onde aceitei complexidade e como tratei os limites da infraestrutura.',
  ],
}

export const aboutDecisions = {
  title: 'Decisões',
  items: [
    {
      title: 'Currículo como sistema',
      paragraphs: [
        'Uma página estática seria suficiente para apresentar o currículo. Escolhi ir além para trabalhar com problemas que ela não teria: publicação de conteúdo, autenticação, persistência e operação.',
        'O currículo continua sendo o produto visível. A indicação de disponibilidade profissional, por exemplo, é controlada por uma feature flag no GrowthBook, sem exigir uma nova publicação do frontend.',
      ],
    },
    {
      title: 'Arquitetura desacoplada',
      paragraphs: [
        'Eu poderia manter tudo no Next.js. Preferi separar a interface em Next.js e a API em NestJS para preservar um contrato HTTP independente e reproduzir uma divisão que já utilizo profissionalmente.',
        'Essa escolha aumenta a operação: são dois repositórios, dois deploys e entram em cena CORS, cookies entre domínios e rastreamento distribuído. É uma complexidade que aceitei porque esses limites também fazem parte do tipo de sistema que o projeto representa.',
      ],
    },
    {
      title: 'Persistência, versionamento e cache',
      paragraphs: [
        'Como a estrutura do currículo ainda muda, preferi o modelo documental do MongoDB a definir cedo um schema relacional mais rígido.',
        'Cada publicação cria um novo documento com uma versão incremental. A aplicação lê somente a versão vigente, enquanto as anteriores permanecem preservadas como trilha de auditoria e base para um possível rollback.',
        'Para não consultar a API em toda visita, o Next.js mantém o perfil em cache. Depois de cada publicação, esse cache é invalidado e aquecido novamente com a versão vigente.',
      ],
    },
    {
      title: 'Segurança e contrato da API',
      paragraphs: [
        'Qualquer visitante pode ler o currículo, mas somente o painel pode publicar uma nova versão. A sessão utiliza JWT em cookie HttpOnly, e as mutações são protegidas por CSRF.',
        'Na borda, a API aplica CORS restrito, Helmet e limitação de requisições. O Swagger expõe o contrato em modo somente leitura, sem permitir a execução de mutações pela documentação.',
      ],
    },
    {
      title: 'Painel administrativo e validação',
      paragraphs: [
        'O painel é a ferramenta que uso para editar e publicar o conteúdo exibido na página inicial.',
        'O formulário valida os dados para oferecer feedback imediato. A API valida novamente porque não depende das garantias do cliente.',
      ],
    },
    {
      title: 'Operação, observabilidade e qualidade',
      paragraphs: [
        'Escolhi manter o frontend na Vercel, a API no Render e os dados no MongoDB Atlas, todos em planos gratuitos. Essa restrição traz um efeito concreto: o Render suspende a API após períodos sem tráfego.',
        'O cache absorve a maior parte das leituras. Se o perfil ainda não estiver em cache e o Render estiver iniciando, a interface explica a espera em vez de aparentar uma falha.',
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
