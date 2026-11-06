import React from 'react';
import { CASE_METADATA, ChapterData } from '../data/caseData';

interface TopBarProps {
  scrollProgress: number;
  activeChapter: ChapterData;
  presentationMode: boolean;
  onTogglePresentationMode: () => void;
  expandAllDeepDives: boolean;
  onToggleExpandAllDeepDives: () => void;
  onOpenMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  scrollProgress,
  activeChapter,
  presentationMode,
  onTogglePresentationMode,
  expandAllDeepDives,
  onToggleExpandAllDeepDives,
  onOpenMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#EEEDE5]/95 backdrop-blur-xs border-b border-[#202426]">
      {/* Barra de progresso de leitura no topo */}
      <div className="w-full h-[3px] bg-[#D6D5CC] overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-[#167982] transition-[width] duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Esquerda: Nome do Autor + Botão Mobile */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="xl:hidden font-mono text-xs uppercase px-2.5 py-1.5 border border-[#202426] text-[#202426] bg-white hover:bg-[#202426] hover:text-white transition-colors cursor-pointer"
            aria-label="Abrir índice de capítulos"
          >
            Índice [{activeChapter.number}/09]
          </button>

          <a
            href="#topo"
            className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.06em] uppercase text-[#202426] hover:text-[#167982] transition-colors"
          >
            {CASE_METADATA.author}
          </a>
        </div>

        {/* Centro/Direita: Indicador de Bloco Atual + Controles de Apresentação */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 font-mono text-xs tracking-[0.06em] uppercase text-[#43494C]">
            <span className="text-[#202426] font-semibold">
              {activeChapter.number} · {activeChapter.shortNavTitle}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={onToggleExpandAllDeepDives}
              className={`font-mono text-[11px] uppercase tracking-[0.04em] px-2.5 py-1 border transition-colors cursor-pointer ${
                expandAllDeepDives
                  ? 'border-[#167982] bg-[#E0ECEC] text-[#105B62] font-semibold'
                  : 'border-[#B8B7AE] bg-white/80 text-[#43494C] hover:border-[#202426] hover:text-[#202426]'
              }`}
              title="Expandir ou recolher todas as notas de aprofundamento"
            >
              {expandAllDeepDives ? 'Ocultar Notas' : 'Expandir Notas'}
            </button>

            <button
              type="button"
              onClick={onTogglePresentationMode}
              className={`font-mono text-[11px] uppercase tracking-[0.04em] px-3 py-1 border transition-colors flex items-center gap-1.5 cursor-pointer ${
                presentationMode
                  ? 'border-[#167982] bg-[#167982] text-white font-semibold'
                  : 'border-[#202426] bg-white text-[#202426] hover:bg-[#202426] hover:text-white'
              }`}
              title="Ocultar menu lateral (Tecla P)"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  presentationMode ? 'bg-white' : 'bg-[#167982]'
                }`}
              />
              <span>{presentationMode ? 'Sair Foco' : 'Modo Foco'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
