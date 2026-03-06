"use client";

import { useState } from "react";
import { Lock, Sparkles, LayoutTemplate, ChevronDown } from "lucide-react";
import Link from "next/link";
import FooterFree from "@/app/components/landing-page/ui/footerfree";
import Button from "@/app/components/landing-page/ui/button";
import { footer } from "framer-motion/client";

export interface ThemeConfig {
  // 1. Página
  bgColor: string;
  pageTitleColor: string;
  pageSubtitleColor: string;
  // 2. Cartão de Perfil
  cardColor: string;
  userCardTitleColor: string;
  userCardDescColor: string;
  userCardSocialTitleColor: string;
  userCardIconColor: string;
  userCardLinkBtnColor: string;
  userCardLinkTextColor: string;
  // 3. Projetos
  projectCardTextColor: string;
  projectCardDescColor: string;
  // 4. Visitas
  visitsIconColor: string;
  visitsTitleColor: string;
  visitsValueColor: string;
}

interface DesignEditorProps {
  profileId: string;
  isSubscribed: boolean;
  initialTheme?: ThemeConfig;
  userCard: React.ReactNode; 
  projectCards: React.ReactNode; 
  totalVisits: React.ReactNode;
}

export default function DesignEditor({
  profileId,
  isSubscribed,
  initialTheme,
  userCard,
  projectCards,
  totalVisits,
}: DesignEditorProps) {
  const [liveTheme, setLiveTheme] = useState<ThemeConfig>({
  bgColor: initialTheme?.bgColor || "#f3f4f6",
  pageTitleColor: initialTheme?.pageTitleColor || "#1f2937",
  pageSubtitleColor: initialTheme?.pageSubtitleColor || "#1f2937",
  cardColor: initialTheme?.cardColor || "#E3E9F0",
  userCardTitleColor: initialTheme?.userCardTitleColor || "#111827",
  userCardDescColor: initialTheme?.userCardDescColor || "#4B5563",
  userCardSocialTitleColor: initialTheme?.userCardSocialTitleColor || "#9CA3AF",
  userCardIconColor: initialTheme?.userCardIconColor || "#4B5563",
  userCardLinkBtnColor: initialTheme?.userCardLinkBtnColor || "#1e1e1e",
  userCardLinkTextColor: initialTheme?.userCardLinkTextColor || "#ffffff",
  projectCardTextColor: initialTheme?.projectCardTextColor || "#000000",
  projectCardDescColor: initialTheme?.projectCardDescColor || "#4B5563",
  visitsIconColor: initialTheme?.visitsIconColor || "#4200cd",
  visitsTitleColor: initialTheme?.visitsTitleColor || "#6b7280",
  visitsValueColor: initialTheme?.visitsValueColor || "#111827",
});

  const [isSaving, setIsSaving] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);

  // Controle de quais seções estão abertas no acordeão
  const [openSections, setOpenSections] = useState({
    page: true,
    userCard: false,
    projectCards: false,
    totalVisits: false,
    footer: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleColorChange = (key: keyof ThemeConfig, value: string) => {
    setLiveTheme((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveTheme = async () => {
    if (!isSubscribed) return;
    setIsSaving(true);
    try {
      // TODO: Server Action aqui
      console.log("Salvando tema:", liveTheme, "Ocultar Footer:", hideFooter);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const previewStyle = {
  "--theme-bg": liveTheme.bgColor,
  "--theme-page-title": liveTheme.pageTitleColor,
  "--theme-page-subtitle": liveTheme.pageSubtitleColor,
  "--theme-card-bg": liveTheme.cardColor,
  "--theme-uc-title": liveTheme.userCardTitleColor,
  "--theme-uc-desc": liveTheme.userCardDescColor,
  "--theme-uc-social-title": liveTheme.userCardSocialTitleColor,
  "--theme-uc-icon": liveTheme.userCardIconColor,
  "--theme-uc-link-btn": liveTheme.userCardLinkBtnColor,
  "--theme-uc-link-text": liveTheme.userCardLinkTextColor,
  "--theme-pc-text": liveTheme.projectCardTextColor,
  "--theme-pc-desc": liveTheme.projectCardDescColor,
  "--theme-tv-icon": liveTheme.visitsIconColor,
  "--theme-tv-title": liveTheme.visitsTitleColor,
  "--theme-tv-val": liveTheme.visitsValueColor,
} as React.CSSProperties;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-white">
      
      {/* =========================================
          LADO ESQUERDO: PAINEL DE CONTROLE
      ========================================= */}
      <div className="w-full lg:w-[35%] xl:w-[30%] p-8 overflow-y-auto border-r border-gray-200 bg-gray-50/30 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Design</h1>
          <p className="text-sm text-gray-500 mt-1">Personalize as cores da sua página.</p>
        </div>

        <div className="relative flex flex-col gap-4">
          
          {/* OVERLAY PRO */}
          {!isSubscribed && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[3px] rounded-2xl">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <Lock className="size-6 text-[#4200cd]" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Exclusivo no Pro</h4>
                <p className="text-xs text-gray-500 mb-4 px-2">
                  Desbloqueie cores customizadas e remova a marca d'água.
                </p>
                <Link
                  href={`/${profileId}/upgrade`}
                  className="flex items-center gap-2 bg-[#4200cd] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-purple-800 transition-colors shadow-sm"
                >
                  <Sparkles className="size-4" />
                  Fazer Upgrade
                </Link>
              </div>
            </div>
          )}

          <div className={`flex flex-col gap-4 ${!isSubscribed ? "opacity-40 pointer-events-none select-none" : ""}`}>
            
            {/* TOGGLE: Ocultar Marca D'água (Fora da Sanfona) */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">Ocultar marca d'água</span>
                <span className="text-xs text-gray-500 mt-0.5">Remove o rodapé gratuito</span>
              </div>
              <button
                type="button"
                onClick={() => setHideFooter(!hideFooter)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  hideFooter ? "bg-[#4200cd]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    hideFooter ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* 1. SEÇÃO: Configurações da Página */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection("page")}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-bold text-gray-800">Página</span>
                <ChevronDown className={`size-4 text-gray-500 transition-transform duration-200 ${openSections.page ? "rotate-180" : ""}`} />
              </button>
              
              {openSections.page && (
                <div className="p-4 pt-0 flex flex-col gap-5 border-t border-gray-100 mt-2">
                  {/* Inputs de Cor (Mantidos originais) */}
                  <div className="flex items-center justify-between mt-2">
                    <label className="text-sm font-semibold text-gray-700">Fundo da Página</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.bgColor}</span>
                      <input type="color" value={liveTheme.bgColor} onChange={(e) => handleColorChange("bgColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Cor do Título</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.pageTitleColor}</span>
                      <input type="color" value={liveTheme.pageTitleColor} onChange={(e) => handleColorChange("pageTitleColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Cor do Subtítulo</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.pageSubtitleColor}</span>
                      <input type="color" value={liveTheme.pageSubtitleColor} onChange={(e) => handleColorChange("pageSubtitleColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. SEÇÃO: Configurações do User Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection("userCard")}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-bold text-gray-800">Cartão de Perfil</span>
                <ChevronDown className={`size-4 text-gray-500 transition-transform duration-200 ${openSections.userCard ? "rotate-180" : ""}`} />
              </button>
              
              {openSections.userCard && (
                <div className="p-4 pt-0 flex flex-col gap-5 border-t border-gray-100 mt-2">
                   {/* Inputs de Cor (Mantidos originais) */}
                  <div className="flex items-center justify-between mt-2">
                    <label className="text-sm font-semibold text-gray-700">Fundo do Cartão</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.cardColor}</span>
                      <input type="color" value={liveTheme.cardColor} onChange={(e) => handleColorChange("cardColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Cor do Título</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.userCardTitleColor}</span>
                      <input type="color" value={liveTheme.userCardTitleColor} onChange={(e) => handleColorChange("userCardTitleColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Cor da Descrição</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.userCardDescColor}</span>
                      <input type="color" value={liveTheme.userCardDescColor} onChange={(e) => handleColorChange("userCardDescColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Título Redes Sociais</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.userCardSocialTitleColor}</span>
                      <input type="color" value={liveTheme.userCardSocialTitleColor} onChange={(e) => handleColorChange("userCardSocialTitleColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Ícones</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.userCardIconColor}</span>
                      <input type="color" value={liveTheme.userCardIconColor} onChange={(e) => handleColorChange("userCardIconColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Botões de Link</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.userCardLinkBtnColor}</span>
                      <input type="color" value={liveTheme.userCardLinkBtnColor} onChange={(e) => handleColorChange("userCardLinkBtnColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Texto do Link</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.userCardLinkTextColor}</span>
                      <input type="color" value={liveTheme.userCardLinkTextColor} onChange={(e) => handleColorChange("userCardLinkTextColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. SEÇÃO: Configurações dos Project Cards */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection("projectCards")}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-bold text-gray-800">Links & Projetos</span>
                <ChevronDown className={`size-4 text-gray-500 transition-transform duration-200 ${openSections.projectCards ? "rotate-180" : ""}`} />
              </button>
              
              {openSections.projectCards && (
                <div className="p-4 pt-0 flex flex-col gap-5 border-t border-gray-100 mt-2">
                   {/* Inputs de Cor (Mantidos originais) */}
                  <div className="flex items-center justify-between mt-2">
                    <label className="text-sm font-semibold text-gray-700">Texto do Cartão</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.projectCardTextColor}</span>
                      <input type="color" value={liveTheme.projectCardTextColor} onChange={(e) => handleColorChange("projectCardTextColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Texto da Descrição</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.projectCardDescColor}</span>
                      <input type="color" value={liveTheme.projectCardDescColor} onChange={(e) => handleColorChange("projectCardDescColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 4. SEÇÃO: Configurações de Total Visits */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection("totalVisits")}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-bold text-gray-800">Total de Visitas</span>
                <ChevronDown className={`size-4 text-gray-500 transition-transform duration-200 ${openSections.totalVisits ? "rotate-180" : ""}`} />
              </button>
              
              {openSections.totalVisits && (
                <div className="p-4 pt-0 flex flex-col gap-5 border-t border-gray-100 mt-2">
                   {/* Inputs de Cor (Mantidos originais) */}
                  <div className="flex items-center justify-between mt-2">
                    <label className="text-sm font-semibold text-gray-700">Cor do Icone</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.visitsIconColor}</span>
                      <input type="color" value={liveTheme.visitsIconColor} onChange={(e) => handleColorChange("visitsIconColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Titulo</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.visitsTitleColor}</span>
                      <input type="color" value={liveTheme.visitsTitleColor} onChange={(e) => handleColorChange("visitsTitleColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Valor</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.visitsValueColor}</span>
                      <input type="color" value={liveTheme.visitsValueColor} onChange={(e) => handleColorChange("visitsValueColor", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        <Button 
          onClick={handleSaveTheme}
          disabled={!isSubscribed || isSaving}
          isLoading={isSaving}
          variant="primary"
          className="mt-6 w-full text-white px-6 py-3.5 rounded-xl font-semibold transition-colors disabled:opacity-50 shadow-sm"
        >
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <div className="hidden lg:flex flex-col flex-1 bg-gray-100 items-center p-6 lg:p-10 relative">
        
        {/* Header do Preview */}
        <div className="w-full max-w-6xl mb-4 flex items-center gap-2 text-gray-500">
          <LayoutTemplate size={18} />
          <span className="text-sm font-medium">Que legal! seu perfil ficará assim</span>
        </div>

        {/* CONTAINER DO PREVIEW */}
        <div className="w-full max-w-6xl h-full rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white flex flex-col">
          
          <div 
            style={previewStyle}
            className="w-full h-full flex flex-col bg-[var(--theme-bg,var(--background-primary,#f3f4f6))] overflow-x-hidden overflow-y-auto custom-scrollbar relative transform transition-colors duration-300 text-[var(--theme-text,inherit)] pointer-events-none select-none"
          >
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar { width: 8px; }
              .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
              .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.15); border-radius: 10px; }
            `}</style>

            {/* BACKGROUND DECORATIVO */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
              <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-black/5 to-transparent" />
            </div>

            {/* CONTEÚDO PRINCIPAL (Reduzi o py-16 para pt-12 pb-6 para expor mais elementos) */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-12 pb-6 flex flex-col xl:flex-row gap-12 xl:gap-20">
              
              {/* COLUNA ESQUERDA: PERFIL */}
              <div className="w-full xl:w-[35%] flex justify-center xl:justify-end">
                <div className="xl:sticky xl:top-8 flex flex-col items-center gap-4 w-full max-w-[348px]">
                  {userCard}
                </div>
              </div>

              {/* COLUNA DIREITA: PROJETOS */}
              <div className="w-full xl:w-[65%] flex flex-col">
                <div className="mb-8 pl-4 border-l-4 border-accent-green">
                  <h2 className="text-2xl font-bold text-[var(--theme-text,#1f2937)] transition-colors duration-300">
                    Meus Links & Projetos
                  </h2>
                  <p className="text-sm opacity-80 text-[var(--theme-text,#1f2937)] transition-colors duration-300 mt-1">
                    Explore meu conteúdo mais recente
                  </p>
                </div>

                <div className="flex flex-col gap-5 w-full max-w-2xl">
                  {projectCards}
                </div>
              </div>
            </main>

            {/* SESSÃO DO RODAPÉ E VISITAS (Removido o mt-auto e centralizado) */}
            <div className="relative z-20 w-full flex flex-row items-center pb-10">
              {/* Total Visits: Centralizado */}
              <div className="w-full flex justify-center mb-6">
                {totalVisits}
              </div>

              {/* Footer: Só aparece se o hideFooter for false */}
              {!hideFooter && (
                <div className="w-full flex justify-center">
                  <FooterFree />
                </div>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}