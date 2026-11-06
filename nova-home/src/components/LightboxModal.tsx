import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArtifactSpec } from '../data/caseData';
import { ArtifactIcon } from './ArtifactSlot';

interface LightboxModalProps {
  artifact: ArtifactSpec | null;
  customImageUrls?: string[];
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onAddCustomImages: (artifactId: string, files: File[]) => void;
  onRemoveCustomImageAt: (artifactId: string, index: number) => void;
  onClearCustomImages: (artifactId: string) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.25;

export const LightboxModal: React.FC<LightboxModalProps> = ({
  artifact,
  customImageUrls,
  onClose,
  onPrev,
  onNext,
  onAddCustomImages,
  onRemoveCustomImageAt,
  onClearCustomImages,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const images = customImageUrls || [];
  const hasImages = images.length > 0;

  // Por padrão, se houver imagem carregada, o painel lateral começa recolhido para dar 100% da tela à imagem
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  // Estado de zoom e pan (deslocamento) da imagem atual
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const panStateRef = useRef<{ dragging: boolean; startX: number; startY: number; baseX: number; baseY: number }>({
    dragging: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  });

  const resetView = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // Ao trocar de artefato, reinicia a visualização e o índice de imagem
  useEffect(() => {
    if (!artifact) return;
    resetView();
    setImageIndex(0);
    setIsSidebarOpen(!hasImages);
  }, [artifact, hasImages, resetView]);

  // Ao trocar de imagem dentro do carrossel, reinicia zoom/pan
  useEffect(() => {
    resetView();
  }, [imageIndex, resetView]);

  // Mantém o índice dentro dos limites quando imagens mudam
  useEffect(() => {
    if (imageIndex > images.length - 1) {
      setImageIndex(Math.max(0, images.length - 1));
    }
  }, [images.length, imageIndex]);

  const goPrevImage = useCallback(() => {
    if (images.length < 2) return;
    setImageIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNextImage = useCallback(() => {
    if (images.length < 2) return;
    setImageIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const zoomIn = useCallback(
    () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2))),
    []
  );
  const zoomOut = useCallback(
    () =>
      setZoom((z) => {
        const next = Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2));
        if (next === 1) setOffset({ x: 0, y: 0 });
        return next;
      }),
    []
  );

  useEffect(() => {
    if (!artifact) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Setas esquerda/direita: se há carrossel, navegam entre imagens; senão, entre artefatos
      if (e.key === 'ArrowLeft') {
        if (images.length > 1) goPrevImage();
        else if (onPrev) onPrev();
      }
      if (e.key === 'ArrowRight') {
        if (images.length > 1) goNextImage();
        else if (onNext) onNext();
      }
      if (e.key === 'i' || e.key === 'I') setIsSidebarOpen((prev) => !prev);
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetView();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artifact, onClose, onPrev, onNext, images.length, goPrevImage, goNextImage, zoomIn, zoomOut, resetView]);

  if (!artifact) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    onAddCustomImages(artifact.id, Array.from(files));
    setImageIndex(images.length);
    e.target.value = '';
  };

  // Zoom com a roda do mouse, ancorado no cursor
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!hasImages) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX - rect.left - rect.width / 2;
    const cursorY = e.clientY - rect.top - rect.height / 2;

    const direction = e.deltaY < 0 ? 1 : -1;
    const nextZoom = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, +(zoom + direction * ZOOM_STEP).toFixed(2))
    );
    if (nextZoom === zoom) return;

    if (nextZoom === 1) {
      resetView();
      return;
    }

    // Ajusta o deslocamento para manter o ponto sob o cursor estável
    const ratio = nextZoom / zoom;
    setOffset((prev) => ({
      x: cursorX - (cursorX - prev.x) * ratio,
      y: cursorY - (cursorY - prev.y) * ratio,
    }));
    setZoom(nextZoom);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    panStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      baseX: offset.x,
      baseY: offset.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const pan = panStateRef.current;
    if (!pan.dragging) return;
    setOffset({
      x: pan.baseX + (e.clientX - pan.startX),
      y: pan.baseY + (e.clientY - pan.startY),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (panStateRef.current.dragging) {
      panStateRef.current.dragging = false;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    }
  };

  const toggleZoomOnDoubleClick = () => {
    if (zoom === 1) setZoom(2);
    else resetView();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex flex-col bg-[#EEEDE5]/98 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra Superior Compacta do Lightbox */}
        <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-2.5 bg-[#EEEDE5] border-b border-[#C7C6BD]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-mono text-[11px] font-bold uppercase px-2 py-0.5 bg-[#167982] text-white tracking-[0.06em] shrink-0">
              {artifact.chapterNum}
            </span>
            <span
              id="lightbox-title"
              className="font-mono text-xs font-bold uppercase text-[#202426] tracking-[0.04em] truncate"
            >
              {artifact.bracketTitle}
            </span>
            {images.length > 1 && (
              <span className="font-mono text-[11px] font-bold text-[#167982] tracking-[0.04em] shrink-0">
                {imageIndex + 1}/{images.length}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Controles de Zoom quando há imagem carregada */}
            {hasImages && (
              <div className="flex items-center border border-[#B8B7AE] bg-white mr-1">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  className="font-mono text-xs px-2 py-1 text-[#202426] hover:bg-[#EEEDE5] disabled:opacity-40 cursor-pointer"
                  title="Diminuir zoom (-)"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={resetView}
                  className="font-mono text-[11px] px-2 py-1 text-[#202426] border-x border-[#E2E1D8] hover:bg-[#EEEDE5] cursor-pointer"
                  title="Resetar zoom para 100% (0)"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  className="font-mono text-xs px-2 py-1 text-[#202426] hover:bg-[#EEEDE5] disabled:opacity-40 cursor-pointer"
                  title="Aumentar zoom (+)"
                >
                  +
                </button>
              </div>
            )}

            {hasImages ? (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-mono text-[11px] uppercase tracking-[0.04em] px-2.5 py-1 border border-[#B8B7AE] text-[#202426] bg-white hover:border-[#202426] cursor-pointer"
                >
                  + Imagem
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveCustomImageAt(artifact.id, imageIndex)}
                  className="font-mono text-[11px] uppercase tracking-[0.04em] px-2.5 py-1 border border-[#8B5E1A] text-[#8B5E1A] bg-[#F5EFE2] hover:bg-[#eadec7] cursor-pointer"
                >
                  Remover
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-mono text-[11px] uppercase tracking-[0.04em] px-2.5 py-1 border border-[#202426] text-[#202426] bg-white hover:bg-[#F7F6F2] cursor-pointer"
              >
                + Carregar Prints Reais
              </button>
            )}

            {/* Botão para recolher/expandir a barra lateral de notas técnicas */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              aria-expanded={isSidebarOpen}
              className={`font-mono text-[11px] uppercase tracking-[0.04em] px-2.5 py-1 border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isSidebarOpen
                  ? 'border-[#167982] bg-[#E0ECEC] text-[#105B62] font-bold'
                  : 'border-[#202426] bg-white text-[#202426] hover:bg-[#F7F6F2]'
              }`}
              title="Mostrar ou recolher o guia lateral de inspeção (Atalho: tecla I)"
            >
              <span>{isSidebarOpen ? '− Recolher Notas [I]' : '+ Notas & Guia [I]'}</span>
            </button>

            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                className="font-mono text-[11px] uppercase px-2.5 py-1 border border-[#202426] bg-white hover:bg-[#202426] hover:text-white transition-colors cursor-pointer"
                title="Artefato anterior"
              >
                ‹‹
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="font-mono text-[11px] uppercase px-2.5 py-1 border border-[#202426] bg-white hover:bg-[#202426] hover:text-white transition-colors cursor-pointer"
                title="Próximo artefato"
              >
                ››
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[11px] font-bold uppercase px-3 py-1 bg-[#202426] text-white hover:bg-[#167982] transition-colors cursor-pointer"
            >
              Fechar [ESC]
            </button>
          </div>
        </div>

        {/* Corpo Principal do Lightbox: imagem totalmente vazada sem requadro */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
          <div className="relative flex-1 min-w-0 min-h-0 flex items-center justify-center">
            {hasImages ? (
              <>
                {/* Área de zoom/pan: wheel para zoom, arraste para mover */}
                <div
                  className="w-full h-full overflow-hidden flex items-center justify-center select-none touch-none"
                  onWheel={handleWheel}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  onDoubleClick={toggleZoomOnDoubleClick}
                  style={{ cursor: zoom > 1 ? (panStateRef.current.dragging ? 'grabbing' : 'grab') : 'zoom-in' }}
                  title="Role o mouse para dar zoom, arraste para mover, duplo clique para alternar"
                >
                  <img
                    src={images[imageIndex]}
                    alt={`${artifact.bracketTitle} — imagem ${imageIndex + 1} de ${images.length}`}
                    draggable={false}
                    style={{
                      transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                      transformOrigin: 'center center',
                    }}
                    className="max-w-full max-h-full object-contain block transition-transform duration-75 ease-out pointer-events-none"
                  />
                </div>

                {/* Navegação entre imagens do carrossel */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrevImage}
                      aria-label="Imagem anterior"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-[#EEEDE5]/90 border border-[#202426] text-[#202426] text-lg hover:bg-[#202426] hover:text-white transition-colors cursor-pointer"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={goNextImage}
                      aria-label="Próxima imagem"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-[#EEEDE5]/90 border border-[#202426] text-[#202426] text-lg hover:bg-[#202426] hover:text-white transition-colors cursor-pointer"
                    >
                      →
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-[#EEEDE5]/90 border border-[#C7C6BD] px-3 py-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImageIndex(idx)}
                          aria-label={`Ir para a imagem ${idx + 1}`}
                          aria-current={idx === imageIndex}
                          className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                            idx === imageIndex ? 'bg-[#167982]' : 'bg-[#C7C6BD] hover:bg-[#8C9092]'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="max-w-xl w-full flex flex-col items-center justify-center text-center p-6">
                <ArtifactIcon type={artifact.iconType} className="w-12 h-12 text-[#167982] mb-4" />
                <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.08em] text-[#202426] mb-5">
                  {artifact.bracketTitle}
                </h3>
                {artifact.items && artifact.items.length > 0 ? (
                  <ul className="space-y-2 text-sm leading-relaxed text-[#43494C]">
                    {artifact.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-[#43494C]">{artifact.description}</p>
                )}
              </div>
            )}
          </div>

          {/* Gaveta Lateral Compacta e Recolhível de Suporte Textual / Guia de Fala */}
          {isSidebarOpen && (
            <aside className="w-full lg:w-[300px] shrink-0 bg-[#F7F6F2] border-t lg:border-t-0 lg:border-l border-[#C7C6BD] p-4 sm:p-5 overflow-y-auto flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-[#C7C6BD]">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#167982]">
                    PONTOS DE DESTAQUE
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSidebarOpen(false)}
                    className="font-mono text-[10px] uppercase text-[#5C6266] hover:text-[#202426] cursor-pointer"
                  >
                    [Recolher]
                  </button>
                </div>

                <ul className="space-y-2">
                  {artifact.inspectionChecklist.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-xs leading-[1.5] text-[#43494C] py-1.5 border-b border-[#E2E1D8] last:border-b-0"
                    >
                      <span className="font-mono text-[11px] font-bold text-[#167982] shrink-0">
                        0{index + 1}.
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {hasImages && (
                <button
                  type="button"
                  onClick={() => onClearCustomImages(artifact.id)}
                  className="font-mono text-[10.5px] uppercase tracking-[0.04em] px-2.5 py-1.5 border border-[#8B5E1A] text-[#8B5E1A] bg-[#F5EFE2] hover:bg-[#eadec7] transition-colors cursor-pointer"
                  title="Remover todas as imagens e restaurar o placeholder técnico"
                >
                  Limpar todas as imagens
                </button>
              )}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};
