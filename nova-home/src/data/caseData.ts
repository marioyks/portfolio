export interface TagBadge {
  label: string;
  variant: 'outline-charcoal' | 'filled-teal' | 'outline-teal' | 'outline-amber';
}

export interface NarrativeBlock {
  lead: string;
  body: string;
  codeInline?: string;
}

export interface DeepDiveItem {
  label: string;
  tag?: string;
  content: string;
  subpoints?: string[];
}

export interface ArtifactSpec {
  id: string;
  chapterNum: string;
  iconType:
    | 'search-minus'
    | 'monitor'
    | 'brain'
    | 'columns'
    | 'swatch'
    | 'grid'
    | 'chart-line'
    | 'smartphone'
    | 'compass';
  bracketTitle: string;
  boxHeader: string;
  description?: string;
  items?: string[];
  proportionBadge: string;
  aspectRatioLabel: string;
  recommendedAssetNote: string;
  inspectionChecklist: string[];
}

export interface MetricCardData {
  value: string;
  label: string;
  sublabel: string;
  nature: 'Fato Observado (Hotjar)' | 'Telemetria Auditada (GID)' | 'Diagnóstico Mobile';
  causalNote: string;
  accent: 'teal' | 'charcoal' | 'amber';
}

export interface ChapterData {
  id: string;
  number: string;
  shortNavTitle: string;
  bracketCategory: string;
  headlinePlain: string;
  headlineTeal: string;
  headlineSuffix?: string;
  readingTimeEstimate: string;
  summaryBlocks: NarrativeBlock[];
  tags: TagBadge[];
  artifact: ArtifactSpec;
  deepDiveTitle: string;
  deepDiveSubtitle: string;
  deepDiveItems: DeepDiveItem[];
  // Princípio de design do iFood que a decisão deste bloco evidencia (etiqueta discreta).
  designPrinciple?: string;
  ownershipNote?: {
    personalLeadership: string;
    squadCoauthorship: string;
  };
}

export const CASE_METADATA = {
  author: 'MARIO YOSHIO KANEGAE SILVEIRA',
  roleHeader: 'CASE STAFF PRODUCT DESIGNER',
  title: 'Nova Home do SAVA',
  subtitle: 'Transformando uma lista de disciplinas em autogestão acadêmica',
  footerLeft: 'ROTEIRO EXECUTIVO · ESTRUTURA UXFOLIO + PLAYBOOK IFOOD',
  contextSummary:
    'Redesenho estrutural da porta de entrada do ambiente virtual de aprendizagem (SAVA) da YDUQS, desenvolvido para quatro de nossas principais marcas de ensino: Estácio, Wyden, Ibmec e IDOMED. A nova versão centraliza alertas importantes, permite que o aluno retome a aula de onde parou com apenas um clique e traz total visibilidade sobre o calendário de provas. O projeto marca também a estreia do Design System Lift 2.0, unindo consistência visual e eficiência operacional na jornada do estudante.',
  quickFacts: [
    {
      label: 'PAPEL & ESCOPO',
      value: 'Product Design Lead / Staff IC',
      detail: 'Estratégia, Arquitetura, Pesquisa, Craft no Figma & Influência Executiva',
    },
    {
      label: 'ECOSSISTEMA MULTIMARCA',
      value: '4 Instituições YDUQS',
      detail: 'Estácio · Wyden · Ibmec · IDOMED ( centenas de milhares de alunos ativos )',
    },
    {
      label: 'SISTEMA & PARIDADE',
      value: 'Estreia do Lift 2.0',
      detail: 'Base multi-tenant via design tokens e auditoria de contraste WCAG',
    },
    {
      label: 'IMPACTO AUDITADO (WEB)',
      value: '90,0% CSAT · 34,5% CTR',
      detail: '+5 p.p. acima da meta anual (Hotjar) e 140.496 alunos engajados no Mural',
    },
  ],
};

export const KEY_METRICS_SUMMARY: MetricCardData[] = [
  {
    value: '90,0%',
    label: 'CSAT na Nova Home Web',
    sublabel: 'Meta anual: 85,0% (+5 p.p. acima da meta · Hotjar Mar/2026 · 1.520 respostas/ciclo)',
    nature: 'Fato Observado (Hotjar)',
    causalNote:
      'Leitura responsável de causalidade: resultado consistente com a simplificação da entrada, atuando em conjunto com o início do semestre letivo.',
    accent: 'teal',
  },
  {
    value: '34,5%',
    label: 'CTR no Mural de Avisos',
    sublabel: '140.496 estudantes interagiram entre 407.021 ativos na Home (telemetria GID)',
    nature: 'Telemetria Auditada (GID)',
    causalNote:
      'Tornou-se a 2ª maior ação real da plataforma logo após o lançamento, validando a aposta de posicionar o Mural na primeira dobra.',
    accent: 'teal',
  },
  {
    value: '74%',
    label: 'Origem de Acessos ao Portal Renova',
    sublabel: '+ 195 mil cliques em movimentação de grade (+37% vs. ciclo anterior)',
    nature: 'Telemetria Auditada (GID)',
    causalNote:
      'Comprova o papel da Home como centro de autogestão transacional (renovação, negociação financeira via SSO Recupera e documentos).',
    accent: 'charcoal',
  },
  {
    value: '83% / 71%',
    label: 'Adoção App (600,3k) vs. CSAT Mobile (4,0)',
    sublabel: '86% das queixas ligadas à latência da WebView e quebra de contexto na navegação',
    nature: 'Diagnóstico Mobile',
    causalNote:
      'Parecer técnico liderado junto à engenharia expôs os limites do modelo híbrido e garantiu aprovação executiva para reconstrução 100% nativa.',
    accent: 'amber',
  },
];

export const CHAPTERS: ChapterData[] = [
  {
    id: 'bloco-01',
    number: '01',
    shortNavTitle: 'Contexto e Desafio',
    bracketCategory: '[ CONTEXTO E DESAFIO ]',
    headlinePlain: 'A dispersão de informações ',
    headlineTeal: 'competia com a rotina de estudos.',
    readingTimeEstimate: '2–3 min de fala',
    summaryBlocks: [
      {
        lead: 'O Cenário:',
        body: 'A porta de entrada na rota /disciplinas funcionava como um índice estático sem hierarquia de urgências nas quatro marcas da YDUQS.',
        codeInline: '/disciplinas',
      },
      {
        lead: 'O Problema:',
        body: 'O estudante precisava localizar manualmente a última aula em cada matéria, enquanto prazos de provas, boletos no SIA legado e convocações do ENADE chegavam fragmentados. O resultado era a perda de datas críticas.',
      },
    ],
    tags: [
      { label: 'ROTA LEGADA /DISCIPLINAS', variant: 'outline-charcoal' },
      { label: 'CANAIS PULVERIZADOS', variant: 'outline-charcoal' },
      { label: 'ATRITO DIÁRIO', variant: 'filled-teal' },
    ],
    artifact: {
      id: 'artifact-01',
      chapterNum: '01',
      iconType: 'search-minus',
      bracketTitle: '[ ARTEFATO VISUAL // INTERFACE ANTERIOR (/DISCIPLINAS) ]',
      boxHeader: 'CAPTURA EM TELA CHEIA DA INTERFACE ANTIGA COM 3 CALLOUTS OBJETIVOS:',
      items: [
        '1. A lista passiva de matérias sem sinalização de próxima atividade;',
        '2. A ausência de alertas de datas limites e avaliações;',
        '3. O fluxo manual de múltiplos cliques para retomar o conteúdo.',
      ],
      proportionBadge: '2/3 ÁREA DEDICADA À EVIDÊNCIA VISUAL',
      aspectRatioLabel: '16:10 · Captura Desktop Legada + Anotações de Callout',
      recommendedAssetNote:
        'Espaço reservado para inserção da captura real da rota /disciplinas legada com os 3 callouts numerados de fricção.',
      inspectionChecklist: [
        'Ausência de indicador de última aula assistida nos cards da lista estática',
        'Inexistência de superfície para alertas financeiros (SIA), renovação ou ENADE',
        'Necessidade de entrar matéria por matéria para descobrir pendências acadêmicas',
      ],
    },
    deepDiveTitle: 'Anatomia do problema no ecossistema YDUQS',
    deepDiveSubtitle: 'Por que a antiga rota /disciplinas gerava sobrecarga cognitiva e risco operacional',
    deepDiveItems: [
      {
        label: 'Fricção para o Estudante',
        tag: 'JORNADA DO ALUNO',
        content:
          'Sem memória visual do último ponto de estudo na tela inicial, o aluno gastava os primeiros minutos de cada sessão navegando por árvores de disciplinas e temas apenas para reencontrar onde havia parado.',
      },
      {
        label: 'Risco para o Negócio e Retenção',
        tag: 'IMPACTO NO NEGÓCIO',
        content:
          'Obrigações acadêmicas e financeiras críticas (renovação de matrícula, boletos vencidos no SIA legado, entrega de documentos e convocações obrigatórias como ENADE/ENAMED) dependiam de comunicações externas ou menus secundários pouco visitados.',
      },
      {
        label: 'Complexidade Multimarca',
        tag: 'ESCALA TÉCNICA',
        content:
          'Qualquer evolução precisava atender simultaneamente quatro instituições (Estácio, Wyden, Ibmec e IDOMED) com perfis distintos de alunado e identidade visual, sem duplicar bases de código.',
      },
    ],
  },
  {
    id: 'bloco-02',
    number: '02',
    shortNavTitle: 'Outcome e Visão',
    bracketCategory: '[ OUTCOME E VISÃO DA SOLUÇÃO ]',
    headlinePlain: 'Autogestão acadêmica integrada em ',
    headlineTeal: 'plataforma multimarca.',
    readingTimeEstimate: '2 min de fala',
    summaryBlocks: [
      {
        lead: 'A Visão:',
        body: 'Posicionar a entrada da sala de aula virtual como um centro ativo de autogestão que antecipa obrigações críticas e devolve foco aos estudos.',
      },
      {
        lead: 'A Solução:',
        body: 'Um hub unificado que reúne o Mural de Avisos com gatilhos transacionais imediatos, acesso direto à aula em andamento ("Continue de onde parou"), painel de provas com filtros de status e paridade multimarca com o Lift 2.0.',
      },
    ],
    tags: [
      { label: 'ESTÁCIO · WYDEN · IBMEC · IDOMED', variant: 'outline-charcoal' },
      { label: 'HUB DE AUTOGESTÃO', variant: 'outline-charcoal' },
      { label: '90,0% CSAT WEB', variant: 'filled-teal' },
    ],
    artifact: {
      id: 'artifact-02',
      chapterNum: '02',
      iconType: 'monitor',
      bracketTitle: '[ ARTEFATO VISUAL // NOVA HOME WEB EM PRODUÇÃO ]',
      boxHeader: 'CAPTURA PANORÂMICA EM ALTA RESOLUÇÃO DA NOVA HOME WEB:',
      description:
        'Destaque para o alinhamento entre a Saudação Contextual, o Mural de Avisos, o Carrossel de Disciplinas e o Painel de Avaliações.',
      proportionBadge: '2/3 ÁREA DEDICADA À EVIDÊNCIA VISUAL',
      aspectRatioLabel: '16:10 · Viewport Desktop 1440px em Produção',
      recommendedAssetNote:
        'Espaço reservado para a captura panorâmica oficial da Nova Home Web em produção mostrando os 4 blocos estruturais integrados.',
      inspectionChecklist: [
        'Saudação contextual e cabeçalho enxuto orientando a sessão de estudo',
        'Mural de Avisos na primeira dobra com CTAs transacionais diretos',
        'Carrossel de Disciplinas com barra de progresso e atalho para aula ativa',
        'Painel de Avaliações com filtros de status (pendentes/concluídas) e regras ENADE',
      ],
    },
    deepDiveTitle: 'De lista passiva a centro ativo de decisão',
    deepDiveSubtitle: 'Visão executiva antecipada do resultado (formato UXfolio + Playbook iFood)',
    deepDiveItems: [
      {
        label: '1. Antecipação Transacional (Mural de Avisos)',
        tag: '1ª DOBRA',
        content:
          'Centraliza avisos urgentes com ação imediata (renovação, negociação financeira via SSO Recupera, documentação pendente) e elimina a caça por links no SIA legado.',
      },
      {
        label: '2. Retomada Cirúrgica de Conteúdo',
        tag: '1 CLIQUE',
        content:
          'Conecta o card da disciplina e a chamada de continuidade diretamente aos metadados do CMS Sirius e leva o estudante ao ponto exato da aula em andamento.',
      },
      {
        label: '3. Previsibilidade Avaliativa e Regulatória',
        tag: 'CALENDÁRIO & PROVAS',
        content:
          'Exibe claramente provas pendentes e realizadas, além de cards parametrizados para exames obrigatórios (ENADE e ENAMED) conforme elegibilidade do aluno.',
      },
    ],
  },
  {
    id: 'bloco-03',
    number: '03',
    shortNavTitle: 'Evidências e IA',
    bracketCategory: '[ EVIDÊNCIAS E OPORTUNIDADES ]',
    headlinePlain: 'Pesquisa acumulada e ',
    headlineTeal: 'síntese assistida por LLMs.',
    readingTimeEstimate: '3–4 min de fala',
    summaryBlocks: [
      {
        lead: 'As Evidências:',
        body: 'Survey de progresso (2.606 feedbacks) mapeou falhas na gravação do ponto de estudo. O Dovetail revelou que 65% trabalham e 77% focam em 1 disciplina por vez à noite; já o Card Sorting provou que 80% ignoravam o ícone de sino.',
      },
      {
        lead: 'Aplicação Real de IA:',
        body: 'Utilizei LLMs na categorização semântica dos 2.606+ comentários abertos, com curadoria humana rigorosa para isolar problemas reais de interface (sem automação de telas).',
      },
    ],
    tags: [
      { label: '2.606 RELATOS CDOP', variant: 'outline-charcoal' },
      { label: '77% FOCO EM 1 DISCIPLINA', variant: 'outline-charcoal' },
      { label: 'CLUSTERIZAÇÃO LLM + CURADORIA', variant: 'outline-teal' },
    ],
    artifact: {
      id: 'artifact-03',
      chapterNum: '03',
      iconType: 'brain',
      bracketTitle: '[ ARTEFATO VISUAL // DOVETAIL & WORKSPACE PRÁTICO DE IA ]',
      boxHeader: 'COMPOSIÇÃO DUPLA DE EVIDÊNCIAS DE PROCESSO:',
      items: [
        '1. Matriz do repositório Dovetail (rotina acadêmica e grupos do Card Sorting);',
        '2. Recorte do workspace de IA (planilha com comentários brutos, prompt semântico utilizado e tabela consolidada com anotações manuais).',
      ],
      proportionBadge: '2/3 ÁREA DEDICADA À EVIDÊNCIA VISUAL',
      aspectRatioLabel: '16:10 · Composição Dupla (Dovetail + Planilha/Workspace LLM)',
      recommendedAssetNote:
        'Espaço reservado para o artefato real combinando a matriz do Dovetail e a planilha auditada de categorização semântica via LLM (sem prompts fictícios).',
      inspectionChecklist: [
        'Matriz Dovetail evidenciando o perfil de estudo noturno (65% trabalham, 77% focam em 1 matéria)',
        'Resultado do Card Sorting demonstrando cegueira de banner/sino (80% ignoravam o ícone superior)',
        'Planilha real com os 2.606 feedbacks da Survey CDOP clusterizados e revisados manualmente',
      ],
    },
    deepDiveTitle: 'Triangulação de pesquisa e uso pragmático de IA',
    deepDiveSubtitle: 'Como dados dispersos viraram direção de produto',
    designPrinciple: 'Conexão humana e de dados',
    deepDiveItems: [
      {
        label: 'Survey de Progresso / CDOP (2.606 feedbacks)',
        tag: 'QUANT + QUALI',
        content:
          'Mapeou a dor latente no recurso "Continue de onde parou" (CDOP): falhas de sincronização na gravação do ponto de estudo minavam a confiança do estudante na plataforma.',
      },
      {
        label: 'Repositório Dovetail (Rotina Real do Aluno)',
        tag: 'COMPORTAMENTO',
        content:
          '65% dos estudantes conciliam trabalho e faculdade e acessam o SAVA majoritariamente à noite, com janela curta de atenção; 77% preferem focar em 1 disciplina por vez em vez de navegar por múltiplas frentes.',
      },
      {
        label: 'Card Sorting (80% ignoravam o sino de notificações)',
        tag: 'ARQUITETURA',
        content:
          'Derrubou a hipótese inicial de colocar avisos críticos dentro de um ícone de sino no topo: 80% dos participantes ignoravam o componente para obrigações acadêmicas e financeiras.',
      },
      {
        label: 'Papel da IA no processo',
        tag: 'WORKFLOW LLM',
        content:
          'Os LLMs aceleraram a triagem e clusterização semântica dos mais de 2.606 comentários abertos em categorias temáticas, mas a validação de causa-raiz (separando bugs de backend/CMS de problemas reais de hierarquia de UI) foi feita com curadoria humana linha a linha. Nenhuma tela foi gerada automaticamente por IA.',
      },
    ],
  },
  {
    id: 'bloco-04',
    number: '04',
    shortNavTitle: 'Decisões Estratégicas',
    bracketCategory: '[ DECISÕES ESTRATÉGICAS DE DESIGN ]',
    headlinePlain: 'Três escolhas estruturais que ',
    headlineTeal: 'definiram o rumo do produto.',
    readingTimeEstimate: '4 min de fala',
    summaryBlocks: [
      {
        lead: '01. Arquitetura orientada à ação:',
        body: 'Posicionamento do Mural na primeira dobra. O trade-off assumido foi disputar espaço com o conteúdo, para conter inadimplência e perda de avaliações.',
      },
      {
        lead: '02. Consistência multimarca:',
        body: 'Estruturação sobre base técnica única, com a identidade das 4 instituições mantida via design tokens.',
      },
      {
        lead: '03. Retomada cirúrgica:',
        body: 'Integração aos metadados do CMS Sirius para acessar a aula ativa direto, em 1 clique.',
      },
    ],
    tags: [
      { label: 'MURAL NA 1ª DOBRA', variant: 'outline-charcoal' },
      { label: 'BASE MULTI-TENANT', variant: 'outline-charcoal' },
      { label: 'INTEGRAÇÃO CMS SIRIUS', variant: 'outline-teal' },
    ],
    artifact: {
      id: 'artifact-04',
      chapterNum: '04',
      iconType: 'columns',
      bracketTitle: '[ ARTEFATO VISUAL // WIREFRAMES & ARQUITETURA APROVADA ]',
      boxHeader: 'COMPARATIVO VISUAL DE WIREFRAMES E ARQUITETURA DA INFORMAÇÃO:',
      description:
        'Demonstração das alternativas descartadas (avisos escondidos em sino superior e árvore extensa de conteúdos) em paralelo à hierarquia aprovada para os 3 estágios de decisão.',
      proportionBadge: '2/3 ÁREA DEDICADA À EVIDÊNCIA VISUAL',
      aspectRatioLabel: '16:10 · Comparativo Lado a Lado (Alternativas Descartadas vs. Aprovada)',
      recommendedAssetNote:
        'Espaço reservado para os wireframes comparativos reais mostrando o descarte do sino/árvore extensa e a consolidação da arquitetura aprovada.',
      inspectionChecklist: [
        'Alternativa descartada A: Avisos críticos ocultos em popover de sino no header',
        'Alternativa descartada B: Árvore extensa de módulos/temas expandida diretamente na Home',
        'Arquitetura aprovada: Mural na 1ª dobra + Retomada direta via CMS Sirius + Painel de Provas',
      ],
    },
    deepDiveTitle: 'Trade-offs explícitos e alternativas descartadas',
    deepDiveSubtitle: 'O raciocínio por trás de cada decisão estrutural',
    designPrinciple: 'Visão sistêmica e impacto de ponta a ponta',
    deepDiveItems: [
      {
        label: 'Decisão 01 · Mural de Avisos na 1ª Dobra vs. Sino de Notificações',
        tag: 'TRADE-OFF DE ATENÇÃO',
        content:
          'Sabíamos que colocar o Mural na primeira dobra disputaria pixels preciosos com o carrossel de disciplinas. Assumimos esse trade-off deliberadamente porque o Card Sorting provou que 80% ignoravam o sino e o custo de perder um prazo de renovação ou prova era crítico tanto para o aluno quanto para a retenção da companhia.',
      },
      {
        label: 'Decisão 02 · Base Multi-Tenant Única vs. Layouts Customizados por Marca',
        tag: 'ESCALABILIDADE',
        content:
          'Em vez de permitir bifurcações estruturais entre Estácio, Wyden, Ibmec e IDOMED, definimos um esqueleto de arquitetura único governado pelos design tokens do Lift 2.0. Isso reduziu esforço de manutenção e garantiu paridade imediata de evolução entre as 4 marcas.',
      },
      {
        label: 'Decisão 03 · Atalho Direto via CMS Sirius vs. Árvore Completa na Home',
        tag: 'REDUÇÃO DE CLIQUES',
        content:
          'Descartamos exibir a árvore completa de unidades na Home (que gerava ruído visual para os 77% que estudam uma matéria por vez) e negociamos com engenharia o consumo direto dos metadados de progresso do CMS Sirius para abrir a aula ativa em 1 clique.',
      },
    ],
  },
  {
    id: 'bloco-05',
    number: '05',
    shortNavTitle: 'Materialização e Craft',
    bracketCategory: '[ MATERIALIZAÇÃO E CRAFT ]',
    headlinePlain: 'Qualidade técnica, estados de interface e ',
    headlineTeal: 'estreia do Lift 2.0.',
    readingTimeEstimate: '3–4 min de fala',
    summaryBlocks: [
      {
        lead: 'Hierarquia e Ritmo:',
        body: 'Intervenção direta no Figma ajustando proporções e alturas na primeira dobra para preservar a visão do carrossel em notebooks menores.',
      },
      {
        lead: 'Design System:',
        body: 'Homologação de variantes no Lift 2.0 com auditoria pontual de contraste WCAG nas tags de status.',
      },
      {
        lead: 'Trabalho com a Squad:',
        body: 'Parceria técnica com Pedro Breda, Thaina Martin e Ramon Bucard nos estados de hover, loading e reorganização do menu por cliques reais.',
      },
    ],
    tags: [
      { label: 'TOKENS LIFT 2.0', variant: 'outline-charcoal' },
      { label: 'AUDITORIA WCAG', variant: 'outline-charcoal' },
      { label: 'CO-AUTORIA E REVISÃO NO FIGMA', variant: 'outline-teal' },
    ],
    artifact: {
      id: 'artifact-05',
      chapterNum: '05',
      iconType: 'swatch',
      bracketTitle: '[ ARTEFATO VISUAL // WORKSPACE DO FIGMA & LIFT 2.0 ]',
      boxHeader: 'COMPOSIÇÃO DO ESPAÇO DE TRABALHO NO FIGMA:',
      items: [
        '1. O mesmo componente do Mural de Avisos aplicado nas 4 marcas via tokens;',
        '2. Detalhamento das especificações de espaçamento (8pt grid) da primeira dobra;',
        '3. Matriz de estados de UI (hover, focus, loading) do painel de provas.',
      ],
      proportionBadge: '2/3 ÁREA DEDICADA À EVIDÊNCIA VISUAL',
      aspectRatioLabel: '16:10 · Inspeção Técnica no Figma (Tokens, 8pt Grid & Matriz de Estados)',
      recommendedAssetNote:
        'Espaço reservado para a captura do workspace real do Figma evidenciando os componentes em 4 temas (Lift 2.0), redlines de 8pt grid e matriz de estados.',
      inspectionChecklist: [
        'Mural de Avisos instanciado nos temas Estácio, Wyden, Ibmec e IDOMED via design tokens',
        'Especificação de alturas e espaçamentos (8pt grid) garantindo visibilidade do carrossel em 1366x768',
        'Matriz completa de estados interativos (default, hover, focus ring acessível, skeleton loading e empty state)',
      ],
    },
    deepDiveTitle: 'Atuação individual e coautoria com a squad',
    deepDiveSubtitle: 'O que foi atuação individual de Staff IC e o que foi trabalho colaborativo com a squad',
    designPrinciple: 'Protagonismo e colaboração',
    ownershipNote: {
      personalLeadership:
        'Atuação direta no arquivo do Figma calibrando proporções verticais e ritmo do grid de 8pt na primeira dobra (para que o Mural não empurrasse o Carrossel de Disciplinas para fora de telas de notebooks menores de 1366×768), além da homologação de variantes do Lift 2.0 e auditoria de contraste WCAG nas tags semânticas de status.',
      squadCoauthorship:
        'Coautoria técnica e revisões pareadas com os designers Pedro Breda, Thaina Martin e Ramon Bucard no detalhamento de micro-estados (hover, focus, skeleton loading), tratamento de casos de borda e reorganização da navegação lateral baseada na telemetria de cliques reais.',
    },
    deepDiveItems: [
      {
        label: 'Calibragem de Viewport em Notebooks Menores',
        tag: 'CRAFT & ERGONOMIA',
        content:
          'Grande parte dos estudantes acessa a Web em notebooks com resolução vertical limitada (768px). Redesenhei o adensamento de paddings e alturas dos cards do Mural para garantir que o título e o topo do Carrossel de Disciplinas permanecessem visíveis ainda na primeira dobra.',
      },
      {
        label: 'Estreia em Produção do Design System Lift 2.0',
        tag: 'DESIGN SYSTEM',
        content:
          'A Nova Home foi o primeiro produto de alta escala a estrear o Lift 2.0 em produção. Homologamos tokens semânticos de superfície, tipografia e feedback e corrigimos desvios de contraste AA/WCAG em tags de status avaliativo.',
      },
      {
        label: 'Reorganização do Menu orientando-se por Cliques Reais',
        tag: 'TELEMETRIA + UI',
        content:
          'Em parceria com Pedro Breda, Thaina Martin e Ramon Bucard, utilizamos o mapa de calor e cliques reais para reordenar os itens do menu lateral e refinar todos os estados transitórios de carregamento.',
      },
    ],
  },
  {
    id: 'bloco-06',
    number: '06',
    shortNavTitle: 'Resultado Final',
    bracketCategory: '[ RESULTADO FINAL // A SOLUÇÃO ]',
    headlinePlain: 'Experiência consolidada em produção nas ',
    headlineTeal: 'quatro marcas.',
    readingTimeEstimate: '3 min de fala',
    summaryBlocks: [
      {
        lead: 'Mural de Avisos Transacional:',
        body: 'Alertas contextuais com redirecionamento imediato para renovação de matrícula, negociação financeira via SSO (Recupera) e envio de documentos.',
      },
      {
        lead: 'Continuidade de Aprendizagem:',
        body: 'Carrossel de disciplinas com barra de progresso sincronizada e retomada exata no módulo ou atividade em curso.',
      },
      {
        lead: 'Previsibilidade Avaliativa:',
        body: 'Painel unificado com filtros de avaliações pendentes e concluídas, integrado a cards condicionais do ENADE e ENAMED.',
      },
    ],
    tags: [
      { label: 'GATILHOS TRANSACIONAIS', variant: 'outline-charcoal' },
      { label: 'ACESSO DIRETO À AULA', variant: 'outline-charcoal' },
      { label: 'REGRAS ENADE/ENAMED', variant: 'outline-teal' },
    ],
    artifact: {
      id: 'artifact-06',
      chapterNum: '06',
      iconType: 'grid',
      bracketTitle: '[ ARTEFATO VISUAL // MOSAICO DE FLUXOS EM PRODUÇÃO ]',
      boxHeader: 'MOSAICO DE CAPTURAS DE TELA DETALHANDO OS 3 FLUXOS PRINCIPAIS:',
      items: [
        '1. Card de renovação e boleto no Mural com botão de redirect;',
        '2. Carrossel de matérias ativo com barra de progresso calibrada;',
        '3. Painel de provas filtrado com card parametrizado do ENADE.',
      ],
      proportionBadge: '2/3 ÁREA DEDICADA À EVIDÊNCIA VISUAL',
      aspectRatioLabel: '16:10 · Mosaico Técnico dos 3 Fluxos em Produção',
      recommendedAssetNote:
        'Espaço reservado para o mosaico com os recortes reais em produção dos 3 fluxos: Mural Transacional, Carrossel Sincronizado e Painel de Provas/ENADE.',
      inspectionChecklist: [
        'Fluxo 1: Card transacional de Renovação / SSO Recupera com CTA direto sem re-login manual',
        'Fluxo 2: Card de disciplina exibindo percentual real sincronizado e CTA de retomada imediata',
        'Fluxo 3: Painel de avaliações com alternância Pendentes/Concluídas e card condicional ENADE/ENAMED',
      ],
    },
    deepDiveTitle: 'Detalhamento funcional dos três pilares entregues',
    deepDiveSubtitle: 'Como a arquitetura virou fluxos em produção',
    deepDiveItems: [
      {
        label: 'Pilar 1 · Gatilhos Transacionais com SSO',
        tag: 'MURAL DE AVISOS',
        content:
          'Em vez de avisos meramente informativos, cada card no Mural opera como um atalho transacional: o aluno resolve pendências de renovação de matrícula, envio de documentação ou negociação de débitos via SSO direto com o portal Recupera.',
      },
      {
        label: 'Pilar 2 · Sincronização de Progresso e Retomada',
        tag: 'CARROSSEL DE DISCIPLINAS',
        content:
          'A barra de progresso nos cards foi recalibrada junto à engenharia para refletir o avanço real no CMS Sirius, o que devolveu confiabilidade ao indicador e permite retomar exatamente o módulo ou atividade em curso.',
      },
      {
        label: 'Pilar 3 · Governança de Avaliações e Exames Regulatórios',
        tag: 'PAINEL DE PROVAS',
        content:
          'Filtros claros separam avaliações pendentes de concluídas, o que reduz a ansiedade em semanas de prova. Para alunos elegíveis ao ENADE ou ENAMED, a interface injeta automaticamente cards condicionais parametrizados com instruções e prazos oficiais.',
      },
    ],
  },
  {
    id: 'bloco-07',
    number: '07',
    shortNavTitle: 'Impacto e Resultados',
    bracketCategory: '[ IMPACTO E RESULTADOS ]',
    headlinePlain: 'Indicadores auditados e ',
    headlineTeal: 'distinção responsável de causalidade.',
    readingTimeEstimate: '4 min de fala',
    summaryBlocks: [
      {
        lead: 'Satisfação Web (90,0% CSAT):',
        body: 'Superou em +5 p.p. a meta anual de 85,0% (Hotjar, 1.520 respostas/ciclo em Mar/2026). Consistente com a simplificação da entrada, atuando em conjunto com o início de semestre.',
      },
      {
        lead: 'Engajamento no Mural (34,5% CTR):',
        body: '140.496 estudantes interagiram em 407.021 ativos na Home (telemetria GID), tornando-se a 2ª maior ação real da plataforma.',
      },
      {
        lead: 'Tração Transacional:',
        body: 'Origem de 74% dos acessos ao novo portal do Renova e 195 mil cliques em movimentação de grade (+37% vs. ciclo anterior).',
      },
    ],
    tags: [
      { label: '90,0% CSAT (HOTJAR)', variant: 'filled-teal' },
      { label: '34,5% CTR (140K ALUNOS)', variant: 'outline-charcoal' },
      { label: '74% TRÁFEGO RENOVA', variant: 'outline-charcoal' },
    ],
    artifact: {
      id: 'artifact-07',
      chapterNum: '07',
      iconType: 'chart-line',
      bracketTitle: '[ ARTEFATO VISUAL // DASHBOARDS HOTJAR & RELATÓRIO GID ]',
      boxHeader: 'GRÁFICOS OFICIAIS AUDITADOS DE NEGÓCIO E EXPERIÊNCIA:',
      items: [
        '1. Série histórica de evolução do CSAT na Web extraída do painel Hotjar;',
        '2. Funil de conversão e distribuição de cliques por categoria de aviso emitido pela Gerência de Inteligência de Dados (GID).',
      ],
      proportionBadge: '2/3 ÁREA DEDICADA À EVIDÊNCIA VISUAL',
      aspectRatioLabel: '16:10 · Dashboards Oficiais (Hotjar + Relatório GID)',
      recommendedAssetNote:
        'Espaço reservado para os recortes oficiais auditados do painel Hotjar (90,0% CSAT) e do relatório da Gerência de Inteligência de Dados (GID); sem gráficos recreativos inventados.',
      inspectionChecklist: [
        'Recorte oficial do Hotjar (Mar/2026, n = 1.520 respostas/ciclo) registrando 90,0% CSAT contra meta de 85,0%',
        'Tabela/funil da Gerência de Inteligência de Dados (GID): 140.496 alunos interagindo entre 407.021 ativos (34,5% CTR)',
        'Registro de origem de tráfego: 74% dos acessos ao portal Renova e 195 mil cliques em movimentação de grade (+37%)',
      ],
    },
    deepDiveTitle: 'Leitura analítica de impacto: fatos observados vs. contexto de negócio',
    deepDiveSubtitle: 'Como separo fato observado de hipótese causal',
    deepDiveItems: [
      {
        label: 'Por que distinguimos correlação de causalidade no CSAT (90,0%)',
        tag: 'RIGOR METODOLÓGICO',
        content:
          'O salto para 90,0% de CSAT na Web (+5 p.p. acima da meta anual de 85,0%, medido no Hotjar com 1.520 respostas no ciclo de Mar/2026) é um fato auditado. Ainda assim, em apresentações executivas, destaco que esse indicador é consistente com a redução drástica de atrito na nova Home, mas atua em conjunto com a sazonalidade favorável de início de semestre.',
      },
      {
        label: 'Telemetria Comportamental Direta (34,5% CTR no Mural)',
        tag: 'EVIDÊNCIA DIRETA (GID)',
        content:
          'Diferente de pesquisas declaratórias, o CTR de 34,5% medido pela Gerência de Inteligência de Dados (140.496 estudantes únicos que clicaram entre 407.021 ativos na Home) comprova diretamente a eficácia do posicionamento na primeira dobra. O Mural virou a 2ª maior ação real de toda a plataforma.',
      },
      {
        label: 'Conversão em Serviços Críticos (74% Renova & +37% Grade)',
        tag: 'RESULTADO DE NEGÓCIO',
        content:
          'A Nova Home passou a originar 74% de todos os acessos ao novo portal do Renova e impulsionou 195 mil cliques em movimentação de grade (+37% frente ao ciclo anterior), provando que design de arquitetura de informação move alavancas financeiras e operacionais.',
      },
    ],
  },
  {
    id: 'bloco-08',
    number: '08',
    shortNavTitle: 'Aprendizados e Mobile',
    bracketCategory: '[ APRENDIZADOS E PRÓXIMOS PASSOS ]',
    headlinePlain: 'Diagnóstico técnico da WebView e ',
    headlineTeal: 'direcionamento da arquitetura móvel.',
    readingTimeEstimate: '3–4 min de fala',
    summaryBlocks: [
      {
        lead: 'Adoção vs. Performance:',
        body: 'O rollout da Home embedada no App Alunos alcançou 83% de adoção rápida (600,3 mil ativos), mas registrou CSAT móvel de 4,0 (71% de satisfação).',
      },
      {
        lead: 'Diagnóstico e Influência:',
        body: '86% das queixas relacionavam-se à latência da WebView e quebra de contexto na navegação. Elaborei um parecer técnico com dados de suporte e telemetria para demonstrar à diretoria os limites do modelo híbrido.',
      },
      {
        lead: 'O Que Faria Diferente e Futuro:',
        body: 'Teria antecipado testes de carga no app antes da escala total. O diagnóstico garantiu aprovação executiva para reconstruir a Home com componentes 100% nativos.',
      },
    ],
    tags: [
      { label: '600,3K ALUNOS NO APP', variant: 'outline-charcoal' },
      { label: '86% QUEIXAS EM WEBVIEW', variant: 'outline-amber' },
      { label: 'APROVAÇÃO DE APP NATIVO', variant: 'outline-teal' },
    ],
    artifact: {
      id: 'artifact-08',
      chapterNum: '08',
      iconType: 'smartphone',
      bracketTitle: '[ ARTEFATO VISUAL // ARQUITETURA WEBVIEW VS ROADMAP NATIVO ]',
      boxHeader: 'EVIDÊNCIA TÉCNICA DE INFLUÊNCIA EM ENGENHARIA:',
      description:
        'Diagrama da ponte técnica (App nativo vs. camada WebView) contraposto ao gráfico de divergência de satisfação Web (90%) vs. Mobile (71%) e o plano de evolução para componentes nativos.',
      proportionBadge: '2/3 ÁREA DEDICADA À EVIDÊNCIA VISUAL',
      aspectRatioLabel: '16:10 · Diagrama de Arquitetura Híbrida vs. Nativa + Divergência CSAT',
      recommendedAssetNote:
        'Espaço reservado para o artefato técnico do parecer executivo: ponte App Nativo ↔ WebView, divergência 90% Web vs. 71% Mobile e roadmap de migração nativa.',
      inspectionChecklist: [
        'Mapeamento técnico da camada WebView embedada no App Alunos (600,3 mil ativos, 83% adoção)',
        'Isolamento dos 86% de relatos negativos ligados a latência de carregamento e perda de estado/navegação',
        'Plano aprovado pela diretoria para reconstrução da Home em componentes 100% nativos',
      ],
    },
    deepDiveTitle: 'Quando o sucesso na Web expõe um gargalo no Mobile',
    deepDiveSubtitle: 'Como transformei uma queda de indicador móvel em decisão arquitetural junto à diretoria',
    designPrinciple: 'Profundidade de contexto e resolução real',
    deepDiveItems: [
      {
        label: 'O Contraste: 90,0% CSAT na Web vs. 71% (nota 4,0) no App Alunos',
        tag: 'SINAL DE ALERTA',
        content:
          'Enquanto a experiência Web batia recorde de satisfação, a mesma interface entregue via WebView dentro do App Alunos atingiu rápida adoção (83%, 600,3 mil alunos ativos), porém estacionou em 71% de satisfação.',
      },
      {
        label: 'Investigação Técnica e Parecer Executivo',
        tag: 'INFLUÊNCIA EM ENGENHARIA',
        content:
          'Em vez de tratar a nota como um problema cosmético de UI, cruzei os chamados de suporte e feedbacks qualitativos com a telemetria móvel: 86% das queixas decorriam da latência de inicialização da WebView, transições lentas de autenticação e quebra de contexto ao alternar entre telas nativas e web.',
      },
      {
        label: 'Autocrítica: o que eu faria diferente',
        tag: 'APRENDIZADO REAL',
        content:
          'Teria exigido testes de estresse e performance em dispositivos móveis de entrada (low-end Android em redes instáveis) antes de liberar o rollout para 100% da base no aplicativo. Essa lição mudou meu protocolo de validação pré-escala.',
      },
      {
        label: 'Desfecho Estratégico',
        tag: 'DECISÃO EXECUTIVA',
        content:
          'O parecer técnico apresentado à diretoria de Produto e Engenharia encerrou a discussão sobre "ajustes paliativos na WebView" e destravou orçamento e priorização para reconstruir a Home do App Alunos com componentes 100% nativos.',
      },
    ],
  },
  {
    id: 'bloco-09',
    number: '09',
    shortNavTitle: 'Encerramento e Síntese',
    bracketCategory: '[ ENCERRAMENTO // SÍNTESE ]',
    headlinePlain: 'Conexão entre evidências, ',
    headlineTeal: 'decisões práticas e impacto em escala.',
    readingTimeEstimate: '2–3 min de fala + Q&A',
    summaryBlocks: [
      {
        lead: 'Direcionamento Estratégico:',
        body: 'Transformação de pesquisas dispersas em uma tese clara de produto voltada à autogestão e redução de esforço mental.',
      },
      {
        lead: 'Pensamento Sistêmico e Craft:',
        body: 'Coautoria com a squad no Lift 2.0, com acessibilidade e paridade em quatro marcas e centenas de milhares de alunos.',
      },
      {
        lead: 'Maturidade Técnica:',
        body: 'Uso de dados para validar a eficácia na Web e coragem analítica para reorientar a rota tecnológica no Mobile.',
      },
    ],
    tags: [
      { label: 'MARIO YOSHIO KANEGAE SILVEIRA', variant: 'outline-charcoal' },
      { label: 'STAFF PRODUCT DESIGN', variant: 'outline-charcoal' },
      { label: 'ESPAÇO PARA DISCUSSÃO', variant: 'filled-teal' },
    ],
    artifact: {
      id: 'artifact-09',
      chapterNum: '09',
      iconType: 'compass',
      bracketTitle: '[ ARTEFATO VISUAL // ROADMAP FUTURO & PLANO DE ESTUDOS ]',
      boxHeader: 'VISÃO CONCEITUAL DE EVOLUÇÃO CONTÍNUA DO ECOSSISTEMA:',
      description:
        'Encadeamento estratégico entre a Nova Home consolidada, a arquitetura móvel nativa em desenvolvimento e o futuro Plano de Estudos inteligente integrado.',
      proportionBadge: '2/3 ÁREA DEDICADA À EVIDÊNCIA VISUAL',
      aspectRatioLabel: '16:10 · Horizonte Estratégico do Ecossistema SAVA',
      recommendedAssetNote:
        'Espaço reservado para o diagrama de horizonte estratégico: Fundação Web Consolidada → Migração Mobile 100% Nativa → Plano de Estudos Inteligente.',
      inspectionChecklist: [
        'Horizonte 1 (Consolidado): Nova Home Web + Lift 2.0 operando nas 4 marcas (90,0% CSAT)',
        'Horizonte 2 (Em Execução): Reconstrução da Home Mobile em arquitetura 100% nativa',
        'Horizonte 3 (Próxima Fronteira): Evolução da autogestão para o Plano de Estudos inteligente e adaptativo',
      ],
    },
    deepDiveTitle: 'Síntese da atuação como Staff Product Designer',
    deepDiveSubtitle: 'Três dimensões do case para discutir na entrevista',
    designPrinciple: 'Visão de futuro com foco no agora',
    deepDiveItems: [
      {
        label: '1. Ambiguidade → Tese de Produto Acionável',
        tag: 'ESTRATÉGIA',
        content:
          'Conectar 2.606 feedbacks abertos, estudos no Dovetail e Card Sorting para reposicionar uma página legada de lista de matérias (/disciplinas) como o principal canal transacional e acadêmico da YDUQS.',
      },
      {
        label: '2. Arquitetura Multimarca & Craft no Detalhe',
        tag: 'SISTEMA & EXECUÇÃO',
        content:
          'Equilibrar governança em escala (4 instituições sobre o Lift 2.0, conformidade WCAG e integração com o CMS Sirius) com intervenção direta no Figma para proteger a ergonomia da primeira dobra em telas reais.',
      },
      {
        label: '3. Liderança Orientada a Evidências e Influência Técnica',
        tag: 'IMPACTO & GOVERNANÇA',
        content:
          'Separar fatos observados de hipóteses causais na leitura dos 90,0% de CSAT e 34,5% de CTR na Web, e usar dados de suporte e telemetria (86% de queixas em WebView) para influenciar a diretoria rumo à arquitetura móvel nativa.',
      },
    ],
  },
];
