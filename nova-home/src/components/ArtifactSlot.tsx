import React, { useEffect, useRef, useState } from 'react';
import { ArtifactSpec } from '../data/caseData';

interface ArtifactSlotProps {
  artifact: ArtifactSpec;
  customImageUrls?: string[];
  onOpenLightbox: (artifact: ArtifactSpec) => void;
  onAddCustomImages: (artifactId: string, files: File[]) => void;
  onRemoveCustomImageAt: (artifactId: string, index: number) => void;
  onClearCustomImages: (artifactId: string) => void;
  presentationMode?: boolean;
}

export const ArtifactIcon: React.FC<{ type: ArtifactSpec['iconType']; className?: string }> = ({
  type,
  className = 'w-11 h-11 text-[#8C9092]',
}) => {
  switch (type) {
    case 'search-minus':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
             fillRule="evenodd"
            clipRule="evenodd"
            d="M21 6C12.7157 6 6 12.7157 6 21C6 29.2843 12.7157 36 21 36C24.4146 36 27.5625 34.8591 30.0866 32.9388L39.5732 42.4254C40.3543 43.2065 41.6206 43.2065 42.4017 42.4254C43.1827 41.6444 43.1827 40.378 42.4017 39.597L32.915 30.1103C34.8495 27.5829 36 24.4264 36 21C36 12.7157 29.2843 6 21 6ZM14 19.25C13.0335 19.25 12.25 20.0335 12.25 21C12.25 21.9665 13.0335 22.75 14 22.75H28C28.9665 22.75 29.75 21.9665 29.75 21C29.75 20.0335 28.9665 19.25 28 19.25H14Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'monitor':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 7C5.79086 7 4 8.79086 4 11V31C4 33.2091 5.79086 35 8 35H20V39H15C13.8954 39 13 39.8954 13 41C13 42.1046 13.8954 43 15 43H33C34.1046 43 35 42.1046 35 41C35 39.8954 34.1046 39 33 39H28V35H40C42.2091 35 44 33.2091 44 31V11C44 8.79086 42.2091 7 40 7H8ZM9 12H39V28H9V12Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'brain':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M22 8C17.5 8 14.5 10.8 14.2 14.5C11.2 15.4 9 18.2 9 21.6C9 24.3 10.4 26.7 12.5 28C12.1 29.2 12 30.5 12.3 31.8C13.1 35.8 16.8 39 21.2 39H22.5V8H22Z"
            fill="currentColor"
          />
          <path
            d="M26 8C30.5 8 33.5 10.8 33.8 14.5C36.8 15.4 39 18.2 39 21.6C39 24.3 37.6 26.7 35.5 28C35.9 29.2 36 30.5 35.7 31.8C34.9 35.8 31.2 39 26.8 39H25.5V8H26Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'columns':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 8C6.79086 8 5 9.79086 5 12V36C5 38.2091 6.79086 40 9 40H39C41.2091 40 43 38.2091 43 36V12C43 9.79086 41.2091 8 39 8H9ZM11 14H22V34H11V14ZM26 14H37V34H26V14Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'swatch':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 6C7.34315 6 6 7.34315 6 9V37C6 40.3137 8.68629 43 12 43C15.3137 43 18 40.3137 18 37V9C18 7.34315 16.6569 6 15 6H9ZM10 11H14V17H10V11ZM10 21H14V27H10V21ZM12 38.5C12.8284 38.5 13.5 37.8284 13.5 37C13.5 36.1716 12.8284 35.5 12 35.5C11.1716 35.5 10.5 36.1716 10.5 37C10.5 37.8284 11.1716 38.5 12 38.5Z"
            fill="currentColor"
          />
          <path
            d="M21 15.5L28.5 8C30 6.5 32.5 6.5 34 8L39 13C40.5 14.5 40.5 17 39 18.5L21 36.5V15.5Z"
            fill="currentColor"
          />
          <path
            d="M22.5 39H39C40.6569 39 42 37.6569 42 36V31H29.5L22.5 38V39Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'grid':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 8C6.79086 8 5 9.79086 5 12V36C5 38.2091 6.79086 40 9 40H39C41.2091 40 43 38.2091 43 36V12C43 9.79086 41.2091 8 39 8H9ZM10 13H22V22H10V13ZM26 13H38V22H26V13ZM10 26H22V35H10V26ZM26 26H38V35H26V26Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'chart-line':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M8 9C8 7.89543 7.10457 7 6 7C4.89543 7 4 7.89543 4 9V39C4 40.6569 5.34315 42 7 42H42C43.1046 42 44 41.1046 44 40C44 38.8954 43.1046 38 42 38H8V9Z"
            fill="currentColor"
          />
          <path
            d="M13.5 29.5L21.5 21.5L28 27L40.5 14.5"
            stroke="currentColor"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'smartphone':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 5C12.7909 5 11 6.79086 11 9V39C11 41.2091 12.7909 43 15 43H33C35.2091 43 37 41.2091 37 39V9C37 6.79086 35.2091 5 33 5H15ZM16 10H32V34H16V10ZM24 40.5C25.1046 40.5 26 39.6046 26 38.5C26 37.3954 25.1046 36.5 24 36.5C22.8954 36.5 22 37.3954 22 38.5C22 39.6046 22.8954 40.5 24 40.5Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'compass':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44ZM31.8 16.2L20.2 20.2L16.2 31.8L27.8 27.8L31.8 16.2ZM24 26C25.1046 26 26 25.1046 26 24C26 22.8954 25.1046 22 24 22C22.8954 22 22 22.8954 22 24C22 25.1046 22.8954 26 24 26Z"
            fill="currentColor"
          />
        </svg>
      );
  }
};

export const ArtifactSlot: React.FC<ArtifactSlotProps> = ({
  artifact,
  customImageUrls,
  onOpenLightbox,
  onAddCustomImages,
  onRemoveCustomImageAt,
  onClearCustomImages,
  presentationMode = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const images = customImageUrls || [];
  const hasImages = images.length > 0;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Mantém o índice ativo dentro dos limites quando imagens são adicionadas/removidas
  useEffect(() => {
    if (activeIndex > images.length - 1) {
      setActiveIndex(Math.max(0, images.length - 1));
    }
  }, [images.length, activeIndex]);

  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    onAddCustomImages(artifact.id, Array.from(files));
    setActiveIndex(images.length); // salta para a primeira imagem recém-adicionada
    e.target.value = '';
  };

  return (
    <div
      className={`relative flex flex-col justify-center flex-1 w-full h-full group ${
        hasImages
          ? 'bg-transparent border-0 p-0'
          : 'artifact-blueprint-grid border border-dashed border-[#A8A79E] min-h-[400px] lg:min-h-[460px] p-6 sm:p-8'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Vincular capturas reais para ${artifact.bracketTitle}`}
      />

      {/* Controles flutuantes discretos (aparecem no hover quando há imagem carregada) */}
      <div
        className={`absolute top-3 right-3 z-20 flex items-center gap-1.5 transition-opacity ${
          hasImages
            ? 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'
            : 'opacity-80 group-hover:opacity-100'
        }`}
      >
        {!presentationMode && (
          <>
            {hasImages ? (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-mono text-[10.5px] uppercase tracking-[0.04em] px-2.5 py-1 bg-[#EEEDE5]/95 border border-[#202426] text-[#202426] hover:bg-[#202426] hover:text-white transition-colors cursor-pointer"
                  title="Adicionar mais imagens ao carrossel"
                >
                  + Imagem
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveCustomImageAt(artifact.id, activeIndex)}
                  className="font-mono text-[10.5px] uppercase tracking-[0.04em] px-2 py-1 bg-[#EEEDE5]/95 border border-[#8B5E1A] text-[#8B5E1A] hover:bg-[#F5EFE2] transition-colors cursor-pointer"
                  title="Remover a imagem atual do carrossel"
                >
                  Remover
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-mono text-[10.5px] uppercase tracking-[0.04em] px-2.5 py-1 border border-[#B8B7AE] text-[#43494C] bg-[#EEEDE5]/90 hover:bg-white hover:border-[#202426] hover:text-[#202426] transition-colors cursor-pointer"
              >
                + Anexar Prints
              </button>
            )}
          </>
        )}

        <button
          type="button"
          onClick={() => onOpenLightbox(artifact)}
          className="font-mono text-[10.5px] uppercase tracking-[0.04em] px-2.5 py-1 border border-[#202426] text-[#202426] bg-[#EEEDE5]/95 hover:bg-[#202426] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Abrir em tela cheia para inspeção detalhada"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M3 8V3H8M17 8V3H12M3 12V17H8M17 12V17H12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Ampliar</span>
        </button>
      </div>

      {/* Quando há imagem carregada: carrossel vazado nas bordas (sem requadro) */}
      {hasImages ? (
        <div className="relative w-full h-full flex-1 flex flex-col items-center justify-center bg-transparent -mx-2 sm:mx-0">
          <div
            onClick={() => onOpenLightbox(artifact)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(artifact);
              }
            }}
            aria-label={`Ampliar captura em tela cheia: ${artifact.bracketTitle} (${activeIndex + 1} de ${images.length})`}
            className="w-full flex-1 flex items-center justify-center cursor-zoom-in min-h-0"
          >
            <img
              src={images[activeIndex]}
              alt={`${artifact.bracketTitle} — imagem ${activeIndex + 1} de ${images.length}`}
              className="w-full h-auto max-h-[720px] object-contain block"
            />
          </div>

          {/* Navegação do carrossel: setas + contador + dots (só com 2+ imagens) */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Imagem anterior"
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-[#EEEDE5]/90 border border-[#202426] text-[#202426] hover:bg-[#202426] hover:text-white transition-colors cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Próxima imagem"
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-[#EEEDE5]/90 border border-[#202426] text-[#202426] hover:bg-[#202426] hover:text-white transition-colors cursor-pointer"
              >
                →
              </button>

              <div className="mt-3 flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold text-[#43494C] tracking-[0.04em]">
                  {activeIndex + 1} / {images.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Ir para a imagem ${idx + 1}`}
                      aria-current={idx === activeIndex}
                      className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                        idx === activeIndex
                          ? 'bg-[#167982]'
                          : 'bg-[#C7C6BD] hover:bg-[#8C9092]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Placeholder técnico enxuto */
        <div
          onClick={() => onOpenLightbox(artifact)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenLightbox(artifact);
            }
          }}
          aria-label={`Ampliar especificações do artefato ${artifact.bracketTitle}`}
          className="my-auto py-4 flex flex-col items-center justify-center text-center cursor-pointer focus:outline-2 focus:outline-[#167982]"
        >
          <div className="mb-3 transition-transform duration-200 group-hover:scale-105">
            <ArtifactIcon type={artifact.iconType} className="w-10 h-10 text-[#8C9092]" />
          </div>

          <h4 className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.08em] text-[#202426] uppercase mb-4 px-2">
            {artifact.bracketTitle}
          </h4>

          <div className="w-full max-w-[520px] text-left">
            {artifact.items && artifact.items.length > 0 ? (
              <ul className="space-y-1.5 text-[13.5px] leading-[1.55] text-[#43494C] text-center">
                {artifact.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-[13.5px] leading-[1.6] text-[#43494C] text-center">
                {artifact.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
