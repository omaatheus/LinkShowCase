"use client";

import { useState } from "react";
import { Lock, Sparkles, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import FooterFree from "@/app/components/landing-page/ui/footerfree";

export interface ThemeConfig {
  bgColor: string;
  cardColor: string;
  fontColor: string;
}

interface DesignEditorProps {
  profileId: string;
  isSubscribed: boolean;
  initialTheme?: ThemeConfig;
  userCard: React.ReactNode; 
  projectCards: React.ReactNode; 
}

export default function DesignEditor({
  profileId,
  isSubscribed,
  initialTheme,
  userCard,
  projectCards,
}: DesignEditorProps) {
  const [liveTheme, setLiveTheme] = useState<ThemeConfig>({
    bgColor: initialTheme?.bgColor || "#f3f4f6",
    cardColor: initialTheme?.cardColor || "#ffffff",
    fontColor: initialTheme?.fontColor || "#1f2937",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleColorChange = (key: keyof ThemeConfig, value: string) => {
    setLiveTheme((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveTheme = async () => {
    if (!isSubscribed) return;
    setIsSaving(true);
    try {
      // TODO: Server Action aqui
      console.log("Salvando tema:", liveTheme);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const previewStyle = {
    "--theme-bg": liveTheme.bgColor,
    "--theme-card": liveTheme.cardColor,
    "--theme-text": liveTheme.fontColor,
  } as React.CSSProperties;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-white">
      
      {/* =========================================
          LADO ESQUERDO: PAINEL DE CONTROLE (UI Limpa)
      ========================================= */}
      <div className="w-full lg:w-[35%] xl:w-[30%] p-8 overflow-y-auto border-r border-gray-200 bg-gray-50/30 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Design</h1>
          <p className="text-sm text-gray-500 mt-1">Personalize as cores da sua página.</p>
        </div>

        <div className="relative bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-6">
          
          {/* OVERLAY PRO */}
          {!isSubscribed && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px] rounded-2xl">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <Lock className="size-6 text-[#4200cd]" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Exclusivo no Pro</h4>
                <p className="text-xs text-gray-500 mb-4 px-2">
                  Desbloqueie cores customizadas.
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

          {/* INPUTS DE COR (Visual de SaaS Moderno) */}
          <div className={`flex flex-col gap-5 ${!isSubscribed ? "opacity-40 pointer-events-none select-none" : ""}`}>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Fundo da Página</label>
              <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.bgColor}</span>
                <input
                  type="color"
                  value={liveTheme.bgColor}
                  onChange={(e) => handleColorChange("bgColor", e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Fundo dos Cards</label>
              <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.cardColor}</span>
                <input
                  type="color"
                  value={liveTheme.cardColor}
                  onChange={(e) => handleColorChange("cardColor", e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Cor do Texto</label>
              <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-500 font-mono px-2 uppercase">{liveTheme.fontColor}</span>
                <input
                  type="color"
                  value={liveTheme.fontColor}
                  onChange={(e) => handleColorChange("fontColor", e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
              </div>
            </div>

          </div>
        </div>

        <button
          onClick={handleSaveTheme}
          disabled={!isSubscribed || isSaving}
          className="mt-6 w-full bg-[#1e1e1e] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-black transition-colors disabled:opacity-50 shadow-sm"
        >
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>

      {/* =========================================
          LADO DIREITO: PREVIEW TELA CHEIA (Desktop View)
      ========================================= */}
      <div className="hidden lg:flex flex-col flex-1 bg-gray-100 items-center p-6 lg:p-10 relative">
        
        {/* Header do Preview indicando que é um Preview de Desktop */}
        <div className="w-full max-w-6xl mb-4 flex items-center gap-2 text-gray-500">
          <LayoutTemplate size={18} />
          <span className="text-sm font-medium">Live Preview</span>
        </div>

        {/* CONTAINER DO PREVIEW (Simula a janela do navegador aberta) */}
        <div className="w-full max-w-6xl h-full rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white flex flex-col">
          
          <div 
            style={previewStyle}
            className="w-full h-full bg-[var(--theme-bg,var(--background-primary,#f3f4f6))] overflow-x-hidden overflow-y-auto custom-scrollbar relative transition-colors duration-300 text-[var(--theme-text,inherit)] pointer-events-none select-none"
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

            {/* AQUI É ONDE A MÁGICA ACONTECE: Layout flex-row idêntico à sua ProfilePage real */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16 flex flex-col xl:flex-row gap-12 xl:gap-20">
              
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

            {!isSubscribed && (
              <div className="relative z-10 w-full pb-8 flex justify-center">
                <FooterFree />
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}