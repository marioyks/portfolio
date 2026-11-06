# Plano de Implementação — Case Study Web | Nova Home do SAVA (Staff Product Designer — iFood)

## 1. Visão Geral e Objetivo

Construir uma aplicação web single-page editorial e interativa em React + TypeScript + Tailwind CSS v4 para a apresentação ao vivo (25–30 minutos) do case **"Nova Home do SAVA — De uma lista de disciplinas a uma experiência de autogestão acadêmica"**, conduzida por **Mario Yoshio Kanegae Silveira** na entrevista para **Staff Product Designer na iFood**.

A aplicação traduzirá fielmente a direção visual, os textos, as métricas auditadas e os recortes de responsabilidade do PDF de referência (`Case de Liderança em Design: Nova Home da SAVA`), combinando narrativa executiva, rigor metodológico, transparência sobre autoria/causalidade e recursos de condução ao vivo.

---

## 2. Direção Visual, Tipografia e Sistema de Tokens

### Paleta de Cores (Fiel ao PDF de Referência)
- **Background Principal (`--bg-canvas`)**: `#EEEDE5` (Off-white / bege técnico editorial)
- **Superfícies de Artefato / Cards (`--bg-surface`)**: `#F7F6F2` e `#FFFFFF` (Branco puro e superfície elevada sutil)
- **Texto Principal (`--text-primary`)**: `#202426` (Carvão profundo)
- **Texto Secundário / Corpo (`--text-secondary`)**: `#4A4F52`
- **Texto Muted / Metadados (`--text-muted`)**: `#747A7E`
- **Destaque Principal (`--accent-teal`)**: `#167982` (Teal institucional do case)
- **Destaque Teal Suave (`--accent-teal-tint`)**: `rgba(22, 121, 130, 0.10)`
- **Alerta Técnico / Atenção (`--accent-amber`)**: `#8B5E1A` com fundo `#F6EFE2` (usado no Bloco 08 para `86% QUEIXAS EM WEBVIEW`)
- **Bordas e Divisores (`--border-hairline`)**: `#C9C8C0` (linhas finas de `1px`) e `#202426` (bordas de tags técnicas)

### Tipografia (`src/index.css` via Google Fonts)
- **Títulos e Cabeçalhos (`--font-sans`)**: `'Plus Jakarta Sans'` / `'Inter'` (pesos 600, 700, 800, tracking justo `-0.025em`, com destaque cromático em `#167982` nos trechos-chave de cada capítulo).
- **Metadados, Numeração, Tags e Especificações (`--font-mono`)**: `'JetBrains Mono'` / `'IBM Plex Mono'` (caixa alta com colchetes `[ CONTEXTO E DESAFIO ]`, badges técnicos, denominadores de métricas e placeholders de evidências).
- **Numerais de Capítulo (`01` a `09`)**: Tipografia monoespaçada/geométrica em tamanho display (`48px–64px`) com estilo vazado (`-webkit-text-stroke: 1.5px #202426`, preenchimento transparente), idêntico ao PDF original.

### Princípios Estéticos
- Grid editorial estruturado com linhas divisórias de `1px solid #C9C8C0`, cantos retos ou micro-arredondados (`2px–4px`), sem sombras pesadas, sem gradientes decorativos e sem visual genérico de SaaS.
- Distinção visual explícita por meio de selos editoriais padronizados para:
  - **Atuação Individual** vs. **Direcionamento / Liderança** vs. **Coautoria com a Squad**
  - **Resultado Observado (Auditado)** vs. **Hipótese / Contribuição Causal** vs. **Visão Conceitual Futura**

---

## 3. Arquitetura de Navegação e Recursos de Apresentação ao Vivo

1. **Barra de Progresso de Leitura (Topo Fixo)**:
   - Indicador horizontal de `2px` em `#167982` refletindo o progresso de rolagem da página.
   - Header técnico compacto exibindo: `MARIO YOSHIO KANEGAE SILVEIRA`, o capítulo ativo (`CASE STAFF PRODUCT DESIGNER // BLOCO 0X`), atalhos de teclado e botão de **Modo Apresentação**.

2. **Navegação Lateral Fixa (9 Capítulos)**:
   - Índice vertical à esquerda (em desktop) com os capítulos `01` a `09`, indicador ativo sincronizado via `IntersectionObserver`, clique com rolagem suave (`scroll-behavior: smooth` respeitando `prefers-reduced-motion`) e menu gaveta/barra inferior compacta em telas menores.

3. **Modo Apresentação Ao Vivo (Focus / Zen Mode)**:
   - Alternável por botão no topo ou tecla `P` / `F`: recolhe a barra lateral, amplia a área útil do grid editorial (foco na proporção 1/3 narrativa + 2/3 evidência visual do PDF) e exibe controles discretos de avanço/recuo entre capítulos (`←` / `→` ou `J` / `K`).

4. **Lightbox de Inspeção e Upload Local de Artefatos Reais**:
   - Todo container de `[ ARTEFATO VISUAL // ... ]` pode ser aberto em **Lightbox de tela cheia** ao clicar (com fechamento via `ESC` ou clique fora) para leitura detalhada durante a entrevista.
   - Cada slot de placeholder técnico inclui também um gatilho discreto (`Inserir captura real`) que permite ao apresentador carregar/pré-visualizar arquivos de imagem locais (`FileReader` / `URL.createObjectURL`) diretamente no navegador antes da entrevista, mantendo por padrão os placeholders técnicos rigorosos sem nenhuma imagem fictícia.

---

## 4. Estrutura Detalhada dos 9 Capítulos (Conteúdo e Composição)

### Hero / Abertura Executiva
- **Identificação**: `MARIO YOSHIO KANEGAE SILVEIRA` · `CASE STAFF PRODUCT DESIGNER // ROTEIRO EXECUTIVO`
- **Conceito central**: *"De uma lista de disciplinas a uma experiência de autogestão acadêmica."*
- **Contexto sintético**: Evolução da Home do SAVA (ambiente virtual de aprendizagem da YDUQS — Estácio, Wyden, Ibmec e IDOMED), conectando pesquisa acumulada, síntese assistida por LLMs, arquitetura multimarca no Design System Lift 2.0 e impacto em escala.
- **Resumo de navegação rápida**: 9 blocos estruturados para apresentação de 25–30 min.

---

### Cap. 01 — Contexto e Desafio
- **Tag**: `01 [ CONTEXTO E DESAFIO ]`
- **Título**: *"A dispersão de informações **competia com a rotina de estudos.**"*
- **Narrativa (1/3 coluna editorial)**:
  - **O Cenário**: A porta de entrada na rota `/disciplinas` funcionava como um índice estático sem hierarquia de urgências nas quatro marcas da YDUQS.
  - **O Problema**: O estudante precisava localizar manualmente a última aula em cada matéria, enquanto prazos de provas, boletos no SIA legado e convocações do ENADE chegavam fragmentados, causando perda de datas críticas.
  - **Tags técnicas**: `ROTA LEGADA /DISCIPLINAS` · `CANAIS PULVERIZADOS` · `ATRITO DIÁRIO` (destaque teal).
- **Composição Visual (2/3 área de evidência)**:
  - Placeholder estruturado `[ ARTEFATO VISUAL // INTERFACE ANTERIOR (/DISCIPLINAS) ]` com esquema técnico de espaço reservado para a captura em tela cheia da interface antiga e **3 Callouts Numerados**:
    1. A lista passiva de matérias sem sinalização de próxima atividade;
    2. A ausência de alertas de datas limites e avaliações;
    3. O fluxo manual de múltiplos cliques para retomar o conteúdo.

---

### Cap. 02 — Outcome e Visão da Solução
- **Tag**: `02 [ OUTCOME E VISÃO DA SOLUÇÃO ]`
- **Título**: *"Autogestão acadêmica integrada **em plataforma multimarca.**"*
- **Narrativa**:
  - **A Visão**: Posicionar a entrada da sala de aula virtual como um centro ativo de autogestão que antecipa obrigações críticas e devolve foco aos estudos.
  - **A Solução**: Hub unificado combinando o Mural de Avisos com gatilhos transacionais imediatos, acesso direto à aula em andamento (*"Continue de onde parou"*), painel de provas com filtros de status e paridade multimarca com o Lift 2.0.
  - **Tags técnicas**: `ESTÁCIO · WYDEN · IBMEC · IDOMED` · `HUB DE AUTOGESTÃO` · `90,0% CSAT WEB` (selo teal preenchido).
- **Composição Visual**:
  - Placeholder panorâmico `[ ARTEFATO VISUAL // NOVA HOME WEB EM PRODUÇÃO ]` destacando a arquitetura da página e identificando visualmente os **elementos estruturantes da experiência** (Saudação Contextual, Mural de Avisos com Gatilhos Transacionais, Continuidade de Aprendizagem / Carrossel de Disciplinas, Painel de Avaliações e Personalização Multimarca via Lift 2.0).

---

### Cap. 03 — Evidências e Oportunidades
- **Tag**: `03 [ EVIDÊNCIAS E OPORTUNIDADES ]`
- **Título**: *"Pesquisa acumulada e **síntese assistida por LLMs.**"*
- **Narrativa & Módulos**:
  - **3 Módulos de Evidência (Evidência → Interpretação → Oportunidade de Design)**:
    1. **Survey de Progresso (`2.606 feedbacks` / relatos CDOP)**: Mapeou falhas na gravação do ponto de estudo → Frustração ao perder o ponto exato de parada → Oportunidade: Retomada cirúrgica sincronizada ao módulo/aula ativa.
    2. **Repositório Dovetail (`65% trabalham` e `77% focam em 1 disciplina por vez à noite`)**: Janela curta de atenção noturna pós-jornada de trabalho → Esforço cognitivo elevado para navegar em listas extensas → Oportunidade: Priorização da disciplina em curso e redução drástica de cliques.
    3. **Card Sorting (`80% ignoravam o ícone de sino`)**: Cegueira de notificação passiva no topo → Alertas acadêmicos e financeiros críticos passavam despercebidos → Oportunidade: Mural de Avisos visível na primeira dobra com gatilhos transacionais.
  - **Bloco Complementar — Aplicação Real de IA com Curadoria Humana**:
    - Uso de LLMs na categorização semântica dos 2.600+ comentários abertos, com curadoria humana rigorosa para isolar problemas reais de interface (sem automação de telas e sem inventar prompts/outputs).
  - **Tags técnicas**: `2.606 RELATOS CDOP` · `77% FOCO EM 1 DISCIPLINA` · `CLUSTERIZAÇÃO LLM + CURADORIA`.
- **Composição Visual**:
  - Composição dupla de placeholders técnicos `[ ARTEFATO VISUAL // DOVETAIL & WORKSPACE PRÁTICO DE IA ]`:
    1. Espaço reservado para Matriz do repositório Dovetail (rotina acadêmica e grupos do Card Sorting);
    2. Espaço reservado para Recorte do workspace de IA (planilha com comentários brutos, prompt semântico utilizado e tabela consolidada com anotações manuais).

---

### Cap. 04 — Decisões Estratégicas de Design
- **Tag**: `04 [ DECISÕES ESTRATÉGICAS DE DESIGN ]`
- **Título**: *"Três escolhas estruturais que **definiram o rumo do produto.**"*
- **Composição em 3 Blocos Editoriais Estruturados (Problema → Alternativas Descartadas → Decisão → Trade-off e Consequência)**:
  1. **01. Arquitetura orientada à ação (Mural na 1ª dobra)**:
     - *Alternativa descartada*: Manter avisos recolhidos no ícone de sino superior.
     - *Decisão*: Posicionamento do Mural de Avisos na primeira dobra.
     - *Trade-off assumido*: Disputar espaço vertical inicial com o conteúdo acadêmico para conter inadimplência, perda de prazos de renovação e avaliações.
  2. **02. Consistência multimarca (Base Multi-tenant + Design Tokens)**:
     - *Alternativa descartada*: Forks visuais independentes por marca com alto custo de manutenção.
     - *Decisão*: Estruturação sobre base técnica única, preservando a identidade das 4 instituições (Estácio, Wyden, Ibmec, IDOMED) via design tokens no Lift 2.0.
     - *Trade-off assumido*: Governança rigorosa de tokens semânticos em troca de escala simultânea nas 4 marcas.
  3. **03. Retomada cirúrgica (Integração CMS Sirius)**:
     - *Alternativa descartada*: Exibir árvore extensa de conteúdos ou levar apenas à capa da disciplina.
     - *Decisão*: Integração aos metadados do CMS Sirius permitindo acessar a aula ativa em 1 clique direto.
     - *Trade-off assumido*: Maior acoplamento técnico e dependência de sincronização de metadados para eliminar múltiplos cliques do aluno.
- **Composição Visual**:
  - Placeholder `[ ARTEFATO VISUAL // WIREFRAMES & ARQUITETURA APROVADA ]` para comparativo visual de wireframes e arquitetura da informação (alternativas descartadas vs. hierarquia aprovada para os 3 estágios de decisão).

---

### Cap. 05 — Materialização e Craft
- **Tag**: `05 [ MATERIALIZAÇÃO E CRAFT ]`
- **Título**: *"Qualidade técnica, estados de interface e **estreia do Lift 2.0.**"*
- **Distinção explícita de papéis e autoria**:
  - **[INTERVENÇÃO DIRETA — INDIVIDUAL] Hierarquia e Ritmo**: Intervenção direta no Figma ajustando proporções e alturas na primeira dobra (`8pt grid`) para preservar a visão do carrossel de disciplinas em notebooks menores (resoluções 1366×768 / 1440×900).
  - **[LIDERANÇA TÉCNICA & AUDITORIA — INDIVIDUAL] Design System Lift 2.0**: Homologação de variantes no Lift 2.0 com auditoria pontual de contraste WCAG nas tags de status.
  - **[COAUTORIA COM A SQUAD] Trabalho Colaborativo**: Parceria técnica com **Pedro Breda, Thaina Martin e Ramon Bucard** nos estados de `hover`, `loading` (`focus`/`skeleton`) e reorganização do menu guiada por cliques reais.
- **Composição Visual**:
  - Placeholder estruturado `[ ARTEFATO VISUAL // WORKSPACE DO FIGMA & LIFT 2.0 ]` subdividido em:
    1. Antes e depois de ajustes de proporção/altura na primeira dobra (`8pt grid`);
    2. Comparação do mesmo componente do Mural de Avisos aplicado às 4 marcas (`Estácio`, `Wyden`, `Ibmec`, `IDOMED`) via tokens;
    3. Matriz de estados de interface (`default`, `hover`, `focus`, `loading`) do painel de provas e auditoria WCAG em tags de status.

---

### Cap. 06 — Resultado Final // A Solução
- **Tag**: `06 [ RESULTADO FINAL // A SOLUÇÃO ]`
- **Título**: *"Experiência consolidada em **produção nas quatro marcas.**"*
- **Apresentação dos 3 Fluxos em Produção**:
  1. **Mural de Avisos Transacional**: Alertas contextuais com redirecionamento imediato para renovação de matrícula, negociação financeira via SSO (Recupera) e envio de documentos.
  2. **Continuidade de Aprendizagem**: Carrossel de disciplinas com barra de progresso sincronizada e retomada exata no módulo ou atividade em curso.
  3. **Previsibilidade Avaliativa**: Painel unificado com filtros de avaliações pendentes e concluídas, integrado a cards condicionais do ENADE e ENAMED.
- **Tags técnicas**: `GATILHOS TRANSACIONAIS` · `ACESSO DIRETO À AULA` · `REGRAS ENADE/ENAMED`.
- **Composição Visual**:
  - Mosaico técnico `[ ARTEFATO VISUAL // MOSAICO DE FLUXOS EM PRODUÇÃO ]` com 3 slots de captura real inspecionáveis em lightbox e legendas funcionais:
    1. Card de renovação e boleto no Mural com botão de redirect;
    2. Carrossel de matérias ativo com barra de progresso calibrada;
    3. Painel de provas filtrado com card parametrizado do ENADE.

---

### Cap. 07 — Impacto e Resultados
- **Tag**: `07 [ IMPACTO E RESULTADOS ]`
- **Título**: *"Indicadores auditados e **distinção responsável de causalidade.**"*
- **Painel de Métricas Auditadas (com Período, Denominador e Fonte)**:
  1. **Satisfação Web — `90,0% CSAT`**:
     - *Comparativo*: Superou em `+5 p.p.` a meta anual de `85,0%` (Gráfico de barra comparativa horizontal simples e exato: 90,0% alcançado vs. 85,0% meta).
     - *Período, Denominador e Fonte*: Mar/2026 · `1.520 respostas/ciclo` · Fonte: **Hotjar**.
     - *Nota de Causalidade Responsável*: Resultado observado consistente com a simplificação da entrada, atuando em conjunto com o início de semestre (sem reivindicar causalidade isolada única).
  2. **Engajamento no Mural — `34,5% CTR`**:
     - *Volume*: `140.496 estudantes` interagiram entre `407.021 ativos na Home` (barra de proporção exata `140.496 / 407.021`).
     - *Fonte*: **Telemetria GID (Gerência de Inteligência de Dados)** — tornando-se a 2ª maior ação real da plataforma.
  3. **Tração Transacional — `74%` e `195 mil cliques (+37%)`**:
     - *Volume*: Origem de `74% dos acessos` ao novo portal do Renova e `195 mil cliques` em movimentação de grade (`+37% vs. ciclo anterior`).
     - *Fonte*: **Relatório GID / Telemetria Transacional**.
- **Quadro Editorial de Separação**:
  - Coluna A: **Resultados Observados (Telemetria & Pesquisa Auditada)**
  - Coluna B: **Hipóteses de Contribuição Causal & Fatores Coexistentes (Sazonalidade de Semestre / Campanhas)**
- **Composição Visual**:
  - Placeholder `[ ARTEFATO VISUAL // DASHBOARDS HOTJAR & RELATÓRIO GID ]` para inserção das capturas oficiais: (1) Série histórica de evolução do CSAT na Web extraída do painel Hotjar; (2) Funil de conversão e distribuição de cliques por categoria de aviso emitido pela GID.

---

### Cap. 08 — Aprendizados e Próximos Passos
- **Tag**: `08 [ APRENDIZADOS E PRÓXIMOS PASSOS ]`
- **Título**: *"Diagnóstico técnico da WebView e **direcionamento da arquitetura móvel.**"*
- **Narrativa**:
  - **Adoção vs. Performance**: O rollout da Home embedada no App Alunos alcançou `83% de adoção rápida` (`600,3 mil ativos`), mas registrou CSAT móvel de `4,0` (`71% de satisfação`), divergindo dos `90%` na Web.
  - **Diagnóstico e Influência (Atuação Individual)**: `86% das queixas` relacionavam-se à latência da WebView e quebra de contexto na navegação. Elaboração de parecer técnico com dados de suporte e telemetria para demonstrar à diretoria os limites do modelo híbrido.
  - **Aprendizado e Próximos Passos**: Teria antecipado testes de carga no app antes da escala total. O diagnóstico garantiu aprovação executiva para reconstruir a Home com componentes 100% nativos (em direcionamento/desenvolvimento — sem afirmar conclusão de migração).
- **Tags técnicas**: `600,3K ALUNOS NO APP` · `86% QUEIXAS EM WEBVIEW` (selo âmbar de alerta) · `APROVAÇÃO DE APP NATIVO` (selo teal).
- **Composição Visual**:
  - Comparativo visual **Web (`90% CSAT`) vs. App WebView (`71% CSAT` / Nota 4,0)** + Diagrama arquitetural simplificado da ponte técnica (**Camada WebView Híbrida com latência/quebra de sessão vs. Arquitetura de Componentes Nativos Aprovada**) + Linha narrativa em 4 etapas: *Problema em Escala → Diagnóstico Técnico → Influência Executiva → Próximos Passos*.
  - Slot de placeholder `[ ARTEFATO VISUAL // ARQUITETURA WEBVIEW VS ROADMAP NATIVO ]`.

---

### Cap. 09 — Encerramento // Síntese e Discussão
- **Tag**: `09 [ ENCERRAMENTO // SÍNTESE ]`
- **Título**: *"Conexão entre evidências, **decisões práticas e impacto em escala.**"*
- **Pilares de Liderança Staff**:
  1. **Direcionamento Estratégico**: Transformação de pesquisas dispersas em uma tese clara de produto voltada à autogestão e redução de esforço mental.
  2. **Pensamento Sistêmico e Craft**: Coautoria com a squad no Lift 2.0, garantindo acessibilidade e paridade em quatro marcas com centenas de milhares de alunos.
  3. **Maturidade Técnica**: Uso de dados para validar a eficácia na Web e coragem analítica para reorientar a rota tecnológica no Mobile.
- **Visão de Evolução Contínua do Ecossistema (Distinção Clara: Entregue vs. Em Curso vs. Conceito Futuro)**:
  - **Estágio 1 — Consolidado em Produção**: Nova Home Web nas 4 marcas (`90% CSAT`, `34,5% CTR`).
  - **Estágio 2 — Direcionamento Aprovado**: Evolução da arquitetura móvel para componentes nativos.
  - **Estágio 3 — Visão Conceitual Futura (Não Entregue)**: Futuro *Plano de Estudos Inteligente Integrado* — apresentado explicitamente como possibilidade de evolução conceitual.
- **Bloco Final de Identificação e Discussão**:
  - `MARIO YOSHIO KANEGAE SILVEIRA` · `STAFF PRODUCT DESIGN` · `ESPAÇO PARA DISCUSSÃO` (com perguntas-guia e pontos de aprofundamento para a conversa com a banca da iFood).

---

## 5. Estrutura de Arquivos a Criar/Atualizar

- `index.html`: Título da página (`Mario Yoshio Kanegae Silveira — Case Study | Nova Home do SAVA`), meta tags e carregamento das fontes Google (`Plus Jakarta Sans` e `JetBrains Mono`).
- `src/index.css`: Configuração Tailwind CSS v4, variáveis de tema (`#EEEDE5`, `#202426`, `#167982`), utilitários de numeral vazado (`.chapter-number-outline`), grid editorial e regras `prefers-reduced-motion`.
- `src/data/caseData.ts`: Dados estruturados e tipados dos 9 capítulos, métricas auditadas, decisões, callouts, especificações de artefatos e selos de autoria, garantindo 100% de fidelidade ao PDF.
- `src/components/ArtifactSlot.tsx`: Componente de placeholder técnico fiel ao PDF (`[ ARTEFATO VISUAL // ... ]`), com suporte a abertura em Lightbox de tela cheia e upload/substituição opcional de imagem local (`URL.createObjectURL`) para o apresentador.
- `src/components/LightboxModal.tsx`: Modal acessível (`ESC`, zoom, legenda técnica, especificações de evidência) para ampliar qualquer artefato durante a apresentação.
- `src/components/SidebarNav.tsx`: Navegação lateral fixa com os 9 capítulos, indicador de capítulo ativo, atalhos e responsividade mobile/tablet.
- `src/components/TopBar.tsx`: Barra superior com progresso de leitura, identificação do autor, indicador do bloco atual e toggle do **Modo Apresentação**.
- `src/App.tsx`: Montagem completa da página única com o cabeçalho executivo, os 9 capítulos editoriais detalhados, controles de teclado (`←`/`→`, `P`, `ESC`) e rodapé técnico.

---

## 6. Estratégia de Verificação

1. Conferir se todos os 9 capítulos, títulos, subtítulos, números (`2.606`, `65%`, `77%`, `80%`, `90,0% CSAT`, `85,0% meta`, `1.520 respostas`, `34,5% CTR`, `140.496 / 407.021`, `74% Renova`, `195 mil cliques / +37%`, `600,3 mil ativos / 83% adoção`, `71% / nota 4,0`, `86% queixas WebView`), nomes das 4 marcas (`Estácio, Wyden, Ibmec, IDOMED`) e nomes da squad (`Pedro Breda, Thaina Martin e Ramon Bucard`) correspondem exatamente ao PDF e ao briefing.
2. Verificar que nenhuma imagem fictícia, gráfico inventado ou prompt/output de IA artificial foi introduzido.
3. Validar a navegação por âncoras, destaque automático no scroll, modo de apresentação, lightbox e compilação limpa via TypeScript/Vite.
