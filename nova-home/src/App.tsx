import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import {
  CASE_METADATA,
  CHAPTERS,
  KEY_METRICS_SUMMARY,
  ArtifactSpec,
  TagBadge,
  NarrativeBlock,
} from './data/caseData';
import { TopBar } from './components/TopBar';
import { SidebarNav } from './components/SidebarNav';
import { ArtifactSlot } from './components/ArtifactSlot';
import { LightboxModal } from './components/LightboxModal';
import {
  loadAllArtifactImageUrls,
  saveArtifactBlobs,
  deleteArtifactBlobs,
} from './data/imageStore';

const renderTagBadge = (tag: TagBadge, idx: number) => {
  const baseClasses =
    'font-mono text-[11px] font-bold uppercase tracking-[0.04em] px-2.5 py-1.5 inline-block leading-none';
  switch (tag.variant) {
    case 'outline-charcoal':
      return (
        <span
          key={idx}
          className={`${baseClasses} bg-white text-[#202426] border border-[#202426]`}
        >
          {tag.label}
        </span>
      );
    case 'filled-teal':
      return (
        <span
          key={idx}
          className={`${baseClasses} bg-[#167982] text-white border border-[#167982]`}
        >
          {tag.label}
        </span>
      );
    case 'outline-teal':
      return (
        <span
          key={idx}
          className={`${baseClasses} bg-[#DCEBEB] text-[#105B62] border border-[#167982]`}
        >
          {tag.label}
        </span>
      );
    case 'outline-amber':
      return (
        <span
          key={idx}
          className={`${baseClasses} bg-[#F5EFE2] text-[#8B5E1A] border border-[#8B5E1A]`}
        >
          {tag.label}
        </span>
      );
  }
};

const renderNarrativeBody = (block: NarrativeBlock) => {
  if (!block.codeInline) {
    return <span>{block.body}</span>;
  }
  const parts = block.body.split(block.codeInline);
  return (
    <>
      {parts[0]}
      <code className="font-mono text-[13px] bg-[#E2E1D8] text-[#202426] px-1.5 py-0.5 rounded-[2px]">
        {block.codeInline}
      </code>
      {parts.slice(1).join(block.codeInline)}
    </>
  );
};

export function App() {
  const [activeChapterId, setActiveChapterId] = useState<string>(CHAPTERS[0].id);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [presentationMode, setPresentationMode] = useState<boolean>(false);
  const [expandAllDeepDives, setExpandAllDeepDives] = useState<boolean>(false);
  const [openDeepDives, setOpenDeepDives] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CHAPTERS.map((c) => [c.id, false]))
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [lightboxArtifact, setLightboxArtifact] = useState<ArtifactSpec | null>(null);
  // Cada artefato pode ter várias imagens (carrossel). Mantemos uma lista de URLs por id.
  const [customImages, setCustomImages] = useState<Record<string, string[]>>({});
  // Espelho dos blobs em memória (fonte da verdade para re-salvar no IndexedDB).
  const customBlobsRef = useRef<Record<string, Blob[]>>({});

  useEffect(() => {
    document.title =
      'Nova Home do SAVA — Case Staff Product Designer | Mario Yoshio Kanegae Silveira';
  }, []);

  // Restaura as imagens persistidas no IndexedDB ao abrir o site (sobrevive a reload/offline).
  useEffect(() => {
    let revoked = false;
    loadAllArtifactImageUrls()
      .then((urls) => {
        if (!revoked) setCustomImages(urls);
      })
      .catch((err) => {
        console.warn('Não foi possível restaurar imagens salvas localmente:', err);
      });
    return () => {
      revoked = true;
    };
  }, []);

  const activeChapter = useMemo(
    () => CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0],
    [activeChapterId]
  );

  const scrollToChapter = useCallback((chapterId: string) => {
    const el = document.getElementById(chapterId);
    if (el) {
      const yOffset = -72;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveChapterId(chapterId);
    }
  }, []);

  // Monitorar progresso de leitura e seção ativa
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      let currentId = CHAPTERS[0].id;
      for (const chapter of CHAPTERS) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            currentId = chapter.id;
          }
        }
      }
      setActiveChapterId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Atalhos de teclado: P (Modo Apresentação), J (Próximo Bloco), K (Bloco Anterior)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxArtifact) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setPresentationMode((prev) => !prev);
      } else if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        const idx = CHAPTERS.findIndex((c) => c.id === activeChapterId);
        if (idx < CHAPTERS.length - 1) {
          scrollToChapter(CHAPTERS[idx + 1].id);
        }
      } else if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        const idx = CHAPTERS.findIndex((c) => c.id === activeChapterId);
        if (idx > 0) {
          scrollToChapter(CHAPTERS[idx - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeChapterId, lightboxArtifact, scrollToChapter]);

  const handleToggleExpandAll = () => {
    const nextState = !expandAllDeepDives;
    setExpandAllDeepDives(nextState);
    setOpenDeepDives(Object.fromEntries(CHAPTERS.map((c) => [c.id, nextState])));
  };

  const toggleSingleDeepDive = (chapterId: string) => {
    setOpenDeepDives((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Adiciona uma ou mais imagens ao carrossel do artefato (acumula, não substitui).
  // Recebe os arquivos originais para poder persistir os blobs no IndexedDB.
  const handleAddCustomImages = (artifactId: string, files: File[]) => {
    if (files.length === 0) return;
    const newUrls = files.map((file) => URL.createObjectURL(file));

    setCustomImages((prev) => ({
      ...prev,
      [artifactId]: [...(prev[artifactId] || []), ...newUrls],
    }));

    const nextBlobs = [...(customBlobsRef.current[artifactId] || []), ...files];
    customBlobsRef.current[artifactId] = nextBlobs;
    saveArtifactBlobs(artifactId, nextBlobs).catch((err) =>
      console.warn('Não foi possível salvar as imagens localmente:', err)
    );
  };

  // Remove uma imagem específica do carrossel pelo índice
  const handleRemoveCustomImageAt = (artifactId: string, index: number) => {
    setCustomImages((prev) => {
      const list = prev[artifactId] || [];
      const removedUrl = list[index];
      if (removedUrl) URL.revokeObjectURL(removedUrl);
      const nextList = list.filter((_, i) => i !== index);
      const copy = { ...prev };
      if (nextList.length === 0) {
        delete copy[artifactId];
      } else {
        copy[artifactId] = nextList;
      }
      return copy;
    });

    const blobs = (customBlobsRef.current[artifactId] || []).filter((_, i) => i !== index);
    if (blobs.length === 0) {
      delete customBlobsRef.current[artifactId];
      deleteArtifactBlobs(artifactId).catch((err) =>
        console.warn('Não foi possível atualizar as imagens salvas:', err)
      );
    } else {
      customBlobsRef.current[artifactId] = blobs;
      saveArtifactBlobs(artifactId, blobs).catch((err) =>
        console.warn('Não foi possível atualizar as imagens salvas:', err)
      );
    }
  };

  // Remove todas as imagens do artefato (restaura o placeholder técnico)
  const handleClearCustomImages = (artifactId: string) => {
    setCustomImages((prev) => {
      (prev[artifactId] || []).forEach((url) => URL.revokeObjectURL(url));
      const copy = { ...prev };
      delete copy[artifactId];
      return copy;
    });

    delete customBlobsRef.current[artifactId];
    deleteArtifactBlobs(artifactId).catch((err) =>
      console.warn('Não foi possível remover as imagens salvas:', err)
    );
  };

  const currentLightboxIndex = useMemo(() => {
    if (!lightboxArtifact) return -1;
    return CHAPTERS.findIndex((c) => c.artifact.id === lightboxArtifact.id);
  }, [lightboxArtifact]);

  return (
    <div id="topo" className="min-h-screen bg-[#EEEDE5] text-[#202426] flex flex-col">
      <TopBar
        scrollProgress={scrollProgress}
        activeChapter={activeChapter}
        presentationMode={presentationMode}
        onTogglePresentationMode={() => setPresentationMode((prev) => !prev)}
        expandAllDeepDives={expandAllDeepDives}
        onToggleExpandAllDeepDives={handleToggleExpandAll}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 flex-1 flex gap-8">
        {/* Menu Lateral de Capítulos (oculto em Modo Apresentação) */}
        {!presentationMode && (
          <SidebarNav
            chapters={CHAPTERS}
            activeChapterId={activeChapterId}
            onSelectChapter={scrollToChapter}
            mobileOpen={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Conteúdo Principal */}
        <main className="flex-1 min-w-0 py-8 sm:py-12">
          {/* ABERTURA EDITORIAL ENXUTA */}
          <section aria-label="Sumário Executivo do Case" className="pb-12 border-b border-[#202426]">
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-[#167982] font-bold mb-3">
              ESTÁCIO · WYDEN · IBMEC · IDOMED // LIFT 2.0
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#202426] max-w-4xl">
              {CASE_METADATA.title}:{' '}
              <span className="text-[#167982]">{CASE_METADATA.subtitle}.</span>
            </h1>
            <p className="mt-4 text-base sm:text-[16.5px] leading-[1.6] text-[#43494C] max-w-3xl">
              {CASE_METADATA.contextSummary}
            </p>

            {/* 4 Indicadores-Chave Diretos */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[#C7C6BD]">
              {KEY_METRICS_SUMMARY.map((m, i) => (
                <div key={i} className="border-l-2 border-[#167982] pl-3.5">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202426]">
                    {m.value}
                  </span>
                  <p className="mt-1 text-sm font-bold text-[#202426]">{m.label}</p>
                  <p className="mt-0.5 text-xs text-[#5C6266] leading-snug">{m.sublabel}</p>
                </div>
              ))}
            </div>
          </section>

          {/* OS 9 BLOCOS DO CASE STUDY (SEM REQUADROS PESADOS, FOCO NA NARRATIVA E IMAGEM VAZADA) */}
          <div className="divide-y divide-[#C7C6BD]">
            {CHAPTERS.map((chapter) => {
              const isDeepDiveOpen = !!openDeepDives[chapter.id];

              return (
                <article
                  key={chapter.id}
                  id={chapter.id}
                  aria-labelledby={`heading-${chapter.id}`}
                  className="scroll-mt-16 py-12 sm:py-16"
                >
                  {/* Grid Principal: 1/3 Coluna Narrativa (4 cols) + 2/3 Evidência Visual Vazada (8 cols) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Coluna Esquerda (1/3): Numeral Vazado + Categoria + Headline + Parágrafos + Tags */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full">
                      <div>
                        {/* Numeral Vazado 01..09 + Categoria entre colchetes */}
                        <div className="flex items-baseline gap-3 pb-4 border-b border-[#B8B7AE]">
                          <span
                            className="chapter-numeral-outline text-[44px] sm:text-[52px]"
                            aria-hidden="true"
                          >
                            {chapter.number}
                          </span>
                          <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.08em] text-[#202426]">
                            {chapter.bracketCategory}
                          </span>
                        </div>

                        {/* Título Principal com Destaque em Teal (#167982) */}
                        <h2
                          id={`heading-${chapter.id}`}
                          className="mt-5 text-[24px] sm:text-[27px] leading-[1.22] font-extrabold tracking-[-0.02em] text-[#202426]"
                        >
                          {chapter.headlinePlain}
                          <span className="text-[#167982]">{chapter.headlineTeal}</span>
                          {chapter.headlineSuffix || ''}
                        </h2>

                        {/* Blocos de Texto Estruturados (O Cenário / O Problema / A Visão / etc.) */}
                        <div className="mt-5 space-y-4 text-[14.5px] leading-[1.62] text-[#353A3D]">
                          {chapter.summaryBlocks.map((block, bIdx) => (
                            <p key={bIdx}>
                              <strong className="font-bold text-[#202426]">{block.lead}</strong>{' '}
                              {renderNarrativeBody(block)}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Rodapé da Coluna Esquerda: Linha divisória + Badges Técnicos do PDF */}
                      <div className="mt-8 pt-4 border-t border-[#C7C6BD]">
                        <div className="flex flex-wrap gap-2">
                          {chapter.tags.map((tag, tIdx) => renderTagBadge(tag, tIdx))}
                        </div>

                        {/* Etiqueta discreta: princípio de design do iFood que esta decisão evidencia */}
                        {chapter.designPrinciple && (
                          <p className="mt-3 flex items-center gap-1.5 font-mono text-[10.5px] text-[#8C9092] tracking-[0.03em]">
                            <span className="text-[#167982]" aria-hidden="true">
                              ✻
                            </span>
                            <span>
                              conecta com:{' '}
                              <span className="text-[#5C6266] lowercase">
                                {chapter.designPrinciple}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Coluna Direita (2/3): Artefato Visual (Vazado quando com imagem) */}
                    <div className="lg:col-span-8 flex flex-col">
                      <ArtifactSlot
                        artifact={chapter.artifact}
                        customImageUrls={customImages[chapter.artifact.id]}
                        onOpenLightbox={(art) => setLightboxArtifact(art)}
                        onAddCustomImages={handleAddCustomImages}
                        onRemoveCustomImageAt={handleRemoveCustomImageAt}
                        onClearCustomImages={handleClearCustomImages}
                        presentationMode={presentationMode}
                      />
                    </div>
                  </div>

                  {/* Gatilho Discreto de Aprofundamento Técnico (Recolhido por padrão) */}
                  <div className="mt-6 pt-3">
                    <button
                      type="button"
                      onClick={() => toggleSingleDeepDive(chapter.id)}
                      aria-expanded={isDeepDiveOpen}
                      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#5C6266] hover:text-[#167982] transition-colors cursor-pointer"
                    >
                      <span className="inline-flex items-center justify-center w-4 h-4 border border-[#B8B7AE] text-[#202426] font-mono text-[11px] leading-none">
                        {isDeepDiveOpen ? '−' : '+'}
                      </span>
                      <span>{chapter.deepDiveTitle}</span>
                    </button>

                    {isDeepDiveOpen && (
                      <div className="mt-4 space-y-4">
                        {chapter.ownershipNote && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-3 border-y border-[#C7C6BD]">
                            <div className="border-l-2 border-l-[#167982] pl-3.5">
                              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#167982]">
                                LIDERANÇA INDIVIDUAL (STAFF IC)
                              </span>
                              <p className="mt-1 text-[13.5px] leading-[1.58] text-[#202426]">
                                {chapter.ownershipNote.personalLeadership}
                              </p>
                            </div>
                            <div className="border-l-2 border-l-[#202426] pl-3.5">
                              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#202426]">
                                COAUTORIA TÉCNICA COM A SQUAD
                              </span>
                              <p className="mt-1 text-[13.5px] leading-[1.58] text-[#43494C]">
                                {chapter.ownershipNote.squadCoauthorship}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                          {chapter.deepDiveItems.map((item, dIdx) => (
                            <div key={dIdx} className="border-l border-[#B8B7AE] pl-4">
                              <h3 className="text-sm font-bold text-[#202426] leading-snug">
                                {item.label}
                              </h3>
                              <p className="mt-1.5 text-[13.5px] leading-[1.58] text-[#43494C]">
                                {item.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* RODAPÉ FINAL DE ENCERRAMENTO E DISCUSSÃO */}
          <footer className="border-t border-[#202426] pt-8 pb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.06em] text-[#5C6266]">
              {CASE_METADATA.author} · STAFF PRODUCT DESIGNER
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-mono text-xs uppercase tracking-[0.05em] px-3 py-1.5 border border-[#202426] text-[#202426] hover:bg-[#202426] hover:text-white transition-colors cursor-pointer"
              >
                ↑ Topo
              </button>
            </div>
          </footer>
        </main>
      </div>

      {/* Lightbox Modal para Inspeção de Artefatos */}
      <LightboxModal
        artifact={lightboxArtifact}
        customImageUrls={lightboxArtifact ? customImages[lightboxArtifact.id] : undefined}
        onClose={() => setLightboxArtifact(null)}
        onPrev={
          currentLightboxIndex > 0
            ? () => setLightboxArtifact(CHAPTERS[currentLightboxIndex - 1].artifact)
            : undefined
        }
        onNext={
          currentLightboxIndex >= 0 && currentLightboxIndex < CHAPTERS.length - 1
            ? () => setLightboxArtifact(CHAPTERS[currentLightboxIndex + 1].artifact)
            : undefined
        }
        onAddCustomImages={handleAddCustomImages}
        onRemoveCustomImageAt={handleRemoveCustomImageAt}
        onClearCustomImages={handleClearCustomImages}
      />
    </div>
  );
}

export default App;
