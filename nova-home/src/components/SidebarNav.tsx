import React from 'react';
import { ChapterData } from '../data/caseData';

interface SidebarNavProps {
  chapters: ChapterData[];
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  chapters,
  activeChapterId,
  onSelectChapter,
  mobileOpen,
  onCloseMobile,
}) => {
  const renderNavContent = () => (
    <nav aria-label="Navegação de capítulos do case study" className="flex flex-col">
      <div>
        <ul className="space-y-0.5">
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeChapterId;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectChapter(chapter.id);
                    onCloseMobile();
                  }}
                  className={`w-full text-left px-2.5 py-2 transition-colors flex items-center gap-2.5 border-l-2 cursor-pointer ${
                    isActive
                      ? 'border-[#167982] bg-[#E6E5DC]/70 text-[#202426]'
                      : 'border-transparent text-[#5C6266] hover:text-[#202426] hover:bg-[#E6E5DC]/40'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-[#167982]' : 'text-[#8C9092]'
                    }`}
                  >
                    {chapter.number}
                  </span>
                  <span
                    className={`text-[13px] leading-tight truncate ${
                      isActive ? 'font-bold text-[#202426]' : 'font-medium'
                    }`}
                  >
                    {chapter.shortNavTitle}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );

  return (
    <>
      {/* Sidebar Desktop Fixa */}
      <aside className="hidden xl:block w-[210px] shrink-0">
        <div className="sticky top-[56px] max-h-[calc(100vh-70px)] overflow-y-auto pr-3 py-8 border-r border-[#C7C6BD]/80">
          {renderNavContent()}
        </div>
      </aside>

      {/* Drawer Mobile / Tablet */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 xl:hidden bg-[#202426]/70 backdrop-blur-[1px] flex"
          onClick={onCloseMobile}
        >
          <div
            className="w-[290px] max-w-[85vw] bg-[#EEEDE5] h-full p-5 border-r-2 border-[#202426] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#202426]">
              <span className="font-mono text-xs font-bold uppercase text-[#202426]">
                NAVEGAÇÃO DO CASE
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="font-mono text-xs uppercase px-2 py-1 bg-[#202426] text-white cursor-pointer"
              >
                Fechar
              </button>
            </div>
            {renderNavContent()}
          </div>
        </div>
      )}
    </>
  );
};
