# Estrutura de Conteúdo — Site do Case "Nova Home do SAVA"

> Documento de referência para revisão de um PPT correspondente.
> Reflete fielmente o conteúdo publicado no site (fonte: `src/data/caseData.ts`).
> Autor: **Mario Yoshio Kanegae Silveira** — Case para **Staff Product Designer (iFood)**.
> Formato pensado para apresentação ao vivo de 25–30 min.

---

## Identidade e Metadados do Case

- **Autor:** MARIO YOSHIO KANEGAE SILVEIRA
- **Cabeçalho de papel:** CASE STAFF PRODUCT DESIGNER
- **Título:** Nova Home do SAVA
- **Subtítulo:** De uma lista de disciplinas a uma experiência de autogestão acadêmica
- **Marcas atendidas (YDUQS):** Estácio · Wyden · Ibmec · IDOMED
- **Design System:** Lift 2.0 (estreia em produção nesta Home)

**Resumo de contexto (abertura):**
Redesign estrutural da porta de entrada do ambiente virtual de aprendizagem (SAVA) da YDUQS para 4 marcas de ensino (Estácio, Wyden, Ibmec e IDOMED), unificando avisos transacionais críticos, retomada cirúrgica de aula em 1 clique, previsibilidade de avaliações e fundação do Design System Lift 2.0.

**Quick facts (abertura):**
| Rótulo | Valor | Detalhe |
|---|---|---|
| Papel & Escopo | Product Design Lead / Staff IC | Estratégia, Arquitetura, Pesquisa, Craft no Figma & Influência Executiva |
| Ecossistema Multimarca | 4 Instituições YDUQS | Estácio · Wyden · Ibmec · IDOMED (centenas de milhares de alunos ativos) |
| Sistema & Paridade | Estreia do Lift 2.0 | Base multi-tenant via design tokens e auditoria de contraste WCAG |
| Impacto Auditado (Web) | 90,0% CSAT · 34,5% CTR | +5 p.p. acima da meta anual (Hotjar) e 140.496 alunos engajados no Mural |

---

## Indicadores-Chave do Sumário Executivo (4 cards de abertura)

1. **90,0% — CSAT na Nova Home Web**
   - Meta anual: 85,0% (+5 p.p. acima da meta · Hotjar Mar/2026 · 1.520 respostas/ciclo)
   - Natureza: Fato Observado (Hotjar)
   - Causalidade: resultado consistente com a simplificação da entrada, atuando em conjunto com o início do semestre letivo.
2. **34,5% — CTR no Mural de Avisos**
   - 140.496 estudantes interagiram entre 407.021 ativos na Home (telemetria GID)
   - Natureza: Telemetria Auditada (GID)
   - Causalidade: 2ª maior ação real da plataforma logo após o lançamento.
3. **74% — Origem de Acessos ao Portal Renova**
   - + 195 mil cliques em movimentação de grade (+37% vs. ciclo anterior)
   - Natureza: Telemetria Auditada (GID)
   - Causalidade: comprova o papel da Home como centro de autogestão transacional.
4. **83% / 71% — Adoção App (600,3k) vs. CSAT Mobile (4,0)**
   - 86% das queixas ligadas à latência da WebView e quebra de contexto na navegação
   - Natureza: Diagnóstico Mobile
   - Causalidade: parecer técnico expôs os limites do modelo híbrido e garantiu aprovação para reconstrução 100% nativa.

---

## Os 9 Blocos do Case

Cada bloco segue a mesma anatomia no site:
**Categoria · Título (com destaque) · Narrativa (blocos "lead + corpo") · Tags técnicas · Artefato visual · Nota de aprofundamento (deep-dive).**

---

### Bloco 01 — Contexto e Desafio
- **Categoria:** [ CONTEXTO E DESAFIO ]
- **Título:** A dispersão de informações **competia com a rotina de estudos.**
- **Tempo de fala estimado:** 2–3 min

**Narrativa:**
- **O Cenário:** A porta de entrada na rota `/disciplinas` funcionava como um índice estático sem hierarquia de urgências nas quatro marcas da YDUQS.
- **O Problema:** O estudante precisava localizar manualmente a última aula em cada matéria, enquanto prazos de provas, boletos no SIA legado e convocações do ENADE chegavam fragmentados, causando perda de datas críticas.

**Tags:** `ROTA LEGADA /DISCIPLINAS` · `CANAIS PULVERIZADOS` · `ATRITO DIÁRIO` (destaque)

**Artefato visual:** [ ARTEFATO VISUAL // INTERFACE ANTERIOR (/DISCIPLINAS) ]
Captura em tela cheia da interface antiga com 3 callouts:
1. A lista passiva de matérias sem sinalização de próxima atividade;
2. A ausência de alertas de datas limites e avaliações;
3. O fluxo manual de múltiplos cliques para retomar o conteúdo.

**Deep-dive — Anatomia do problema no ecossistema YDUQS:**
- **Fricção para o Estudante:** sem memória visual do último ponto de estudo, o aluno gastava os primeiros minutos navegando por árvores de disciplinas só para reencontrar onde parou.
- **Risco para o Negócio e Retenção:** obrigações críticas (renovação, boletos no SIA legado, documentos, ENADE/ENAMED) dependiam de comunicações externas ou menus secundários pouco visitados.
- **Complexidade Multimarca:** qualquer evolução precisava atender simultaneamente 4 instituições sem duplicar bases de código.

---

### Bloco 02 — Outcome e Visão da Solução
- **Categoria:** [ OUTCOME E VISÃO DA SOLUÇÃO ]
- **Título:** Autogestão acadêmica integrada em **plataforma multimarca.**
- **Tempo de fala estimado:** 2 min

**Narrativa:**
- **A Visão:** Posicionar a entrada da sala de aula virtual como um centro ativo de autogestão que antecipa obrigações críticas e devolve foco aos estudos.
- **A Solução:** Hub unificado combinando o Mural de Avisos com gatilhos transacionais imediatos, acesso direto à aula em andamento ("Continue de onde parou"), painel de provas com filtros de status e paridade multimarca com o Lift 2.0.

**Tags:** `ESTÁCIO · WYDEN · IBMEC · IDOMED` · `HUB DE AUTOGESTÃO` · `90,0% CSAT WEB` (destaque)

**Artefato visual:** [ ARTEFATO VISUAL // NOVA HOME WEB EM PRODUÇÃO ]
Captura panorâmica em alta resolução destacando a integração entre Saudação Contextual, Mural de Avisos, Carrossel de Disciplinas e Painel de Avaliações.

**Deep-dive — De lista passiva a centro ativo de decisão:**
- **1. Antecipação Transacional (Mural de Avisos / 1ª dobra):** centraliza avisos urgentes com ação imediata (renovação, negociação financeira via SSO Recupera, documentação pendente).
- **2. Retomada Cirúrgica de Conteúdo (1 clique):** conecta o card da disciplina aos metadados do CMS Sirius, levando ao ponto exato da aula.
- **3. Previsibilidade Avaliativa e Regulatória:** provas pendentes/realizadas + cards parametrizados para ENADE e ENAMED conforme elegibilidade.

---

### Bloco 03 — Evidências e Oportunidades
- **Categoria:** [ EVIDÊNCIAS E OPORTUNIDADES ]
- **Título:** Pesquisa acumulada e **síntese assistida por LLMs.**
- **Tempo de fala estimado:** 3–4 min

**Narrativa:**
- **As Evidências:** Survey de progresso (2.606 feedbacks) mapeou falhas na gravação do ponto de estudo. O Dovetail revelou que 65% trabalham e 77% focam em 1 disciplina por vez à noite; o Card Sorting provou que 80% ignoravam o ícone de sino.
- **Aplicação Real de IA:** uso de LLMs na categorização semântica dos 2.606+ comentários abertos, com curadoria humana rigorosa para isolar problemas reais de interface (sem automação de telas).

**Tags:** `2.606 RELATOS CDOP` · `77% FOCO EM 1 DISCIPLINA` · `CLUSTERIZAÇÃO LLM + CURADORIA`

**Artefato visual:** [ ARTEFATO VISUAL // DOVETAIL & WORKSPACE PRÁTICO DE IA ]
Composição dupla:
1. Matriz do repositório Dovetail (rotina acadêmica e grupos do Card Sorting);
2. Recorte do workspace de IA (planilha com comentários brutos, prompt semântico e tabela consolidada com anotações manuais).

**Deep-dive — Triangulação de pesquisa e uso pragmático de IA:**
- **Survey de Progresso / CDOP (2.606 feedbacks):** dor latente no "Continue de onde parou" (CDOP) — falhas de sincronização minavam a confiança.
- **Repositório Dovetail (rotina real):** 65% conciliam trabalho e faculdade (acesso noturno, janela curta); 77% preferem focar em 1 disciplina por vez.
- **Card Sorting (80% ignoravam o sino):** derrubou a hipótese de colocar avisos críticos dentro do ícone de sino no topo.
- **Papel Real de IA (sem hype):** LLMs aceleraram a triagem/clusterização dos 2.606+ comentários; a validação de causa-raiz foi feita com curadoria humana linha a linha. Nenhuma tela gerada por IA.

---

### Bloco 04 — Decisões Estratégicas de Design
- **Categoria:** [ DECISÕES ESTRATÉGICAS DE DESIGN ]
- **Título:** Três escolhas estruturais que **definiram o rumo do produto.**
- **Tempo de fala estimado:** 4 min

**Narrativa (3 decisões):**
- **01. Arquitetura orientada à ação:** Mural na primeira dobra, assumindo o trade-off de disputar espaço com o conteúdo para conter inadimplência e perda de avaliações.
- **02. Consistência multimarca:** base técnica única, preservando a identidade das 4 instituições via design tokens.
- **03. Retomada cirúrgica:** integração aos metadados do CMS Sirius para acessar a aula ativa em 1 clique.

**Tags:** `MURAL NA 1ª DOBRA` · `BASE MULTI-TENANT` · `INTEGRAÇÃO CMS SIRIUS`

**Artefato visual:** [ ARTEFATO VISUAL // WIREFRAMES & ARQUITETURA APROVADA ]
Comparativo das alternativas descartadas (sino superior; árvore extensa de conteúdos) vs. hierarquia aprovada para os 3 estágios de decisão.

**Deep-dive — Trade-offs explícitos e alternativas descartadas:**
- **Decisão 01 · Mural na 1ª dobra vs. Sino:** trade-off de atenção assumido deliberadamente porque 80% ignoravam o sino e o custo de perder renovação/prova era crítico.
- **Decisão 02 · Base Multi-Tenant vs. Layouts por marca:** esqueleto único governado por tokens do Lift 2.0, reduzindo manutenção e garantindo paridade entre as 4 marcas.
- **Decisão 03 · Atalho via CMS Sirius vs. Árvore completa:** consumo direto dos metadados de progresso para abrir a aula ativa em 1 clique.

---

### Bloco 05 — Materialização e Craft
- **Categoria:** [ MATERIALIZAÇÃO E CRAFT ]
- **Título:** Qualidade técnica, estados de interface e **estreia do Lift 2.0.**
- **Tempo de fala estimado:** 3–4 min

**Narrativa:**
- **Hierarquia e Ritmo:** intervenção direta no Figma ajustando proporções e alturas na primeira dobra para preservar a visão do carrossel em notebooks menores.
- **Design System:** homologação de variantes no Lift 2.0 com auditoria pontual de contraste WCAG nas tags de status.
- **Trabalho com a Squad:** parceria técnica com Pedro Breda, Thaina Martin e Ramon Bucard nos estados de hover, loading e reorganização do menu por cliques reais.

**Tags:** `TOKENS LIFT 2.0` · `AUDITORIA WCAG` · `CO-AUTORIA E REVISÃO NO FIGMA`

**Distinção de autoria (nota de ownership):**
- **Liderança individual (Staff IC):** atuação direta no Figma calibrando proporções verticais e ritmo do grid de 8pt na primeira dobra (para o Mural não empurrar o Carrossel para fora em telas 1366×768), homologação de variantes do Lift 2.0 e auditoria de contraste WCAG nas tags de status.
- **Coautoria com a squad:** revisões pareadas com Pedro Breda, Thaina Martin e Ramon Bucard no detalhamento de micro-estados (hover, focus, skeleton loading), casos de borda e reorganização da navegação lateral via telemetria de cliques.

**Artefato visual:** [ ARTEFATO VISUAL // WORKSPACE DO FIGMA & LIFT 2.0 ]
1. O mesmo componente do Mural aplicado nas 4 marcas via tokens;
2. Especificações de espaçamento (8pt grid) da primeira dobra;
3. Matriz de estados de UI (hover, focus, loading) do painel de provas.

**Deep-dive — Liderança mão na massa e coautoria transparente:**
- **Calibragem de viewport em notebooks menores (768px):** adensamento de paddings/alturas dos cards do Mural para manter título e topo do Carrossel visíveis na 1ª dobra.
- **Estreia do Lift 2.0 em produção:** 1º produto de alta escala a estrear o sistema; homologação de tokens semânticos e correção de desvios de contraste AA/WCAG.
- **Reorganização do menu por cliques reais:** mapa de calor e cliques reais (com Pedro Breda, Thaina Martin e Ramon Bucard) para reordenar o menu lateral e refinar estados transitórios.

---

### Bloco 06 — Resultado Final // A Solução
- **Categoria:** [ RESULTADO FINAL // A SOLUÇÃO ]
- **Título:** Experiência consolidada em produção nas **quatro marcas.**
- **Tempo de fala estimado:** 3 min

**Narrativa (3 pilares entregues):**
- **Mural de Avisos Transacional:** alertas contextuais com redirecionamento imediato para renovação de matrícula, negociação financeira via SSO (Recupera) e envio de documentos.
- **Continuidade de Aprendizagem:** carrossel de disciplinas com barra de progresso sincronizada e retomada exata no módulo/atividade em curso.
- **Previsibilidade Avaliativa:** painel unificado com filtros de avaliações pendentes/concluídas, integrado a cards condicionais do ENADE e ENAMED.

**Tags:** `GATILHOS TRANSACIONAIS` · `ACESSO DIRETO À AULA` · `REGRAS ENADE/ENAMED`

**Artefato visual:** [ ARTEFATO VISUAL // MOSAICO DE FLUXOS EM PRODUÇÃO ]
1. Card de renovação e boleto no Mural com botão de redirect;
2. Carrossel de matérias ativo com barra de progresso calibrada;
3. Painel de provas filtrado com card parametrizado do ENADE.

**Deep-dive — Detalhamento funcional dos três pilares:**
- **Pilar 1 · Gatilhos Transacionais com SSO:** cada card do Mural é um atalho transacional (renovação, documentação, negociação via SSO Recupera).
- **Pilar 2 · Sincronização de Progresso:** barra de progresso recalibrada junto à engenharia para refletir o avanço real no CMS Sirius.
- **Pilar 3 · Governança de Avaliações e Exames:** filtros de pendentes/concluídas + cards condicionais parametrizados de ENADE/ENAMED para alunos elegíveis.

---

### Bloco 07 — Impacto e Resultados
- **Categoria:** [ IMPACTO E RESULTADOS ]
- **Título:** Indicadores auditados e **distinção responsável de causalidade.**
- **Tempo de fala estimado:** 4 min

**Narrativa (métricas auditadas):**
- **Satisfação Web (90,0% CSAT):** superou em +5 p.p. a meta anual de 85,0% (Hotjar, 1.520 respostas/ciclo em Mar/2026). Consistente com a simplificação da entrada, atuando em conjunto com o início de semestre.
- **Engajamento no Mural (34,5% CTR):** 140.496 estudantes interagiram em 407.021 ativos na Home (telemetria GID), 2ª maior ação real da plataforma.
- **Tração Transacional:** origem de 74% dos acessos ao novo portal do Renova e 195 mil cliques em movimentação de grade (+37% vs. ciclo anterior).

**Tags:** `90,0% CSAT (HOTJAR)` · `34,5% CTR (140K ALUNOS)` · `74% TRÁFEGO RENOVA`

**Artefato visual:** [ ARTEFATO VISUAL // DASHBOARDS HOTJAR & RELATÓRIO GID ]
1. Série histórica de evolução do CSAT na Web (painel Hotjar);
2. Funil de conversão e distribuição de cliques por categoria de aviso (GID).
> Sem gráficos recreativos inventados — apenas recortes oficiais auditados.

**Deep-dive — Fatos observados vs. contexto de negócio:**
- **Correlação vs. causalidade no CSAT (90,0%):** fato auditado; destacado como consistente com a redução de atrito, mas atuando junto à sazonalidade de início de semestre.
- **Telemetria comportamental direta (34,5% CTR):** evidência direta (GID) — 140.496 cliques únicos entre 407.021 ativos, 2ª maior ação real da plataforma.
- **Conversão em serviços críticos (74% Renova & +37% grade):** 195 mil cliques em movimentação de grade; design de arquitetura de informação movendo alavancas financeiras/operacionais.

---

### Bloco 08 — Aprendizados e Próximos Passos
- **Categoria:** [ APRENDIZADOS E PRÓXIMOS PASSOS ]
- **Título:** Diagnóstico técnico da WebView e **direcionamento da arquitetura móvel.**
- **Tempo de fala estimado:** 3–4 min

**Narrativa:**
- **Adoção vs. Performance:** rollout da Home embedada no App Alunos alcançou 83% de adoção rápida (600,3 mil ativos), mas CSAT móvel de 4,0 (71% de satisfação).
- **Diagnóstico e Influência:** 86% das queixas ligadas à latência da WebView e quebra de contexto. Parecer técnico com dados de suporte e telemetria demonstrou à diretoria os limites do modelo híbrido.
- **O Que Faria Diferente e Futuro:** teria antecipado testes de carga no app antes da escala total; o diagnóstico garantiu aprovação executiva para reconstruir a Home com componentes 100% nativos.

**Tags:** `600,3K ALUNOS NO APP` · `86% QUEIXAS EM WEBVIEW` (alerta) · `APROVAÇÃO DE APP NATIVO`

**Artefato visual:** [ ARTEFATO VISUAL // ARQUITETURA WEBVIEW VS ROADMAP NATIVO ]
Diagrama da ponte técnica (App nativo vs. camada WebView) contraposto à divergência de satisfação Web (90%) vs. Mobile (71%) e ao plano de evolução nativa.

**Deep-dive — Maturidade na adversidade:**
- **Contraste 90% Web vs. 71% Mobile (nota 4,0):** mesma interface via WebView no App Alunos — adoção rápida (83%, 600,3 mil ativos) mas satisfação estacionada em 71%.
- **Investigação técnica e parecer executivo:** cruzamento de chamados de suporte + telemetria — 86% das queixas por latência de inicialização da WebView, transições lentas de autenticação e quebra de contexto.
- **Autocrítica (o que faria diferente):** exigiria testes de estresse em dispositivos de entrada (low-end Android em redes instáveis) antes do rollout total.
- **Desfecho estratégico:** o parecer encerrou a discussão de "ajustes paliativos" e destravou orçamento para reconstruir a Home do App em componentes 100% nativos.

---

### Bloco 09 — Encerramento // Síntese e Discussão
- **Categoria:** [ ENCERRAMENTO // SÍNTESE ]
- **Título:** Conexão entre evidências, **decisões práticas e impacto em escala.**
- **Tempo de fala estimado:** 2–3 min + Q&A

**Narrativa (pilares de liderança Staff):**
- **Direcionamento Estratégico:** transformação de pesquisas dispersas em uma tese clara de produto voltada à autogestão e redução de esforço mental.
- **Pensamento Sistêmico e Craft:** coautoria com a squad no Lift 2.0, garantindo acessibilidade e paridade em 4 marcas com centenas de milhares de alunos.
- **Maturidade Técnica:** uso de dados para validar a eficácia na Web e coragem analítica para reorientar a rota tecnológica no Mobile.

**Tags:** `MARIO YOSHIO KANEGAE SILVEIRA` · `STAFF PRODUCT DESIGN` · `ESPAÇO PARA DISCUSSÃO`

**Artefato visual:** [ ARTEFATO VISUAL // ROADMAP FUTURO & PLANO DE ESTUDOS ]
Horizonte estratégico: Nova Home consolidada → arquitetura móvel nativa em desenvolvimento → futuro Plano de Estudos inteligente integrado.

**Deep-dive — Síntese de atuação em nível Staff Product Designer:**
- **1. Ambiguidade → Tese de Produto Acionável:** conectar 2.606 feedbacks, Dovetail e Card Sorting para reposicionar a página legada `/disciplinas` como principal canal transacional e acadêmico.
- **2. Arquitetura Multimarca & Craft no Detalhe:** equilibrar governança em escala (4 instituições sobre o Lift 2.0, WCAG, CMS Sirius) com intervenção direta no Figma.
- **3. Liderança Orientada a Evidências:** separar fatos observados de hipóteses causais (90,0% CSAT, 34,5% CTR) e usar telemetria (86% de queixas em WebView) para influenciar a diretoria rumo à arquitetura móvel nativa.

**Horizontes de evolução (distinção explícita):**
- **Horizonte 1 — Consolidado em produção:** Nova Home Web + Lift 2.0 nas 4 marcas (90,0% CSAT, 34,5% CTR).
- **Horizonte 2 — Direcionamento aprovado / em execução:** reconstrução da Home Mobile em arquitetura 100% nativa.
- **Horizonte 3 — Visão conceitual futura (não entregue):** Plano de Estudos Inteligente integrado e adaptativo.

---

## Glossário de Números para Conferência (fidelidade do PPT)

| Número | Significado | Fonte |
|---|---|---|
| 90,0% | CSAT na Nova Home Web | Hotjar (Mar/2026) |
| 85,0% | Meta anual de CSAT | Interno |
| +5 p.p. | Diferença sobre a meta | Hotjar |
| 1.520 | Respostas/ciclo do CSAT | Hotjar |
| 34,5% | CTR no Mural de Avisos | GID |
| 140.496 | Estudantes que interagiram no Mural | GID |
| 407.021 | Ativos na Home | GID |
| 74% | Origem de acessos ao portal Renova | GID |
| 195 mil | Cliques em movimentação de grade | GID |
| +37% | Variação de cliques vs. ciclo anterior | GID |
| 2.606 | Feedbacks da Survey CDOP | Pesquisa |
| 65% | Estudantes que trabalham | Dovetail |
| 77% | Focam em 1 disciplina por vez | Dovetail |
| 80% | Ignoravam o ícone de sino | Card Sorting |
| 600,3 mil | Ativos no App Alunos | Telemetria móvel |
| 83% | Adoção da Home no App | Telemetria móvel |
| 71% / 4,0 | CSAT móvel (satisfação / nota) | CSAT móvel |
| 86% | Queixas ligadas à WebView | Suporte + telemetria |

**Nomes próprios a conferir:** Mario Yoshio Kanegae Silveira · Estácio · Wyden · Ibmec · IDOMED · Lift 2.0 · CMS Sirius · SIA · Recupera/Renova · Hotjar · GID (Gerência de Inteligência de Dados) · Dovetail · ENADE · ENAMED · CDOP · Pedro Breda · Thaina Martin · Ramon Bucard.

**Princípios editoriais a preservar no PPT:**
- Nenhuma imagem fictícia, gráfico inventado ou prompt/output de IA artificial.
- Separar sempre **fato observado** de **hipótese de causalidade**.
- Distinguir **atuação individual (Staff IC)** de **coautoria com a squad**.
- Distinguir **entregue** vs. **em curso** vs. **conceito futuro**.
