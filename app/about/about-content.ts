export const aboutIntro = {
  title: 'Sobre este projeto',
  paragraphs: [
    'Este site é o meu currículo. O conteúdo não fica estático no repositório: é servido por uma API que eu construí, usando tecnologias que já utilizei no trabalho, estudei ou estou estudando.',
    'Front, API e banco formam um sistema que eu consigo evoluir — novos campos, novos textos, um painel administrativo pela frente — sem reconstruir a interface a cada mudança.',
  ],
}

export const aboutDecisions = {
  title: 'Decisões',
  items: [
    {
      title: 'Por que não é uma página estática',
      paragraphs: [
        'Uma página estática resolveria a apresentação. Eu quis um sistema: contrato HTTP, persistência, autenticação na escrita e espaço para crescer.',
        'O currículo continua sendo o produto visível. A engenharia por trás é o que este projeto existe para demonstrar.',
      ],
    },
    {
      title: 'Front e API separados',
      paragraphs: [
        'A interface está em Next.js; a API, em NestJS. São dois repositórios e dois deploys, conversando por REST.',
        'Daria para concentrar tudo no Next. A separação existe porque essa divisão é amplamente usada no ecossistema Node — e é a que eu já pratico: React de um lado, Nest do outro.',
      ],
    },
    {
      title: 'Dados: Mongo e versionamento',
      paragraphs: [
        'Neste projeto a estrutura do currículo ainda muda (campos, textos, um admin pela frente). Mongo evita uma migration a cada alteração de schema.',
        'Cada publicação grava uma versão nova do perfil, no espírito de rascunho e publicação. Assim o histórico não se perde quando o conteúdo é sobrescrito.',
      ],
    },
    {
      title: 'Leitura pública, escrita autenticada',
      paragraphs: [
        'A leitura do currículo é pública. A escrita não.',
        'O `GET` não exige autenticação. O `POST` exige JWT, para impedir alteração indevida e para o painel administrativo já nascer atrás de autenticação.',
      ],
    },
    {
      title: 'Hospedagem',
      paragraphs: [
        'Frontend na Vercel, API no Render, dados no MongoDB Atlas — planos gratuitos.',
        'No Render a API dorme sem tráfego. Na primeira visita o site informa que os servidores estão subindo, em vez de falhar em silêncio.',
      ],
    },
    {
      title: 'Observabilidade e qualidade',
      paragraphs: [
        'New Relic: o plano gratuito cobre o que este projeto precisa (erros e visibilidade da API).',
        'Contentsquare (Hotjar) entra para comportamento de quem visita — sessão e clique.',
        'A API tem testes e2e (Jest), inclusive com repositório em memória, sem depender do Mongo. Os dois repositórios passam por lint, formatação, verificação de tipos e CI a cada pull request.',
      ],
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
        'Motion',
      ],
    },
    {
      label: 'API',
      items: ['NestJS', 'TypeScript', 'JWT', 'class-validator', 'Zod'],
    },
    {
      label: 'Dados',
      items: ['MongoDB Atlas', 'versionamento por publicação'],
    },
    {
      label: 'Qualidade',
      items: ['Jest e2e', 'Husky', 'GitHub Actions'],
    },
    {
      label: 'Operação',
      items: [
        'Vercel',
        'Render',
        'Atlas',
        'New Relic',
        'Contentsquare (Hotjar)',
      ],
    },
  ],
}
