"use client";

import { createProject } from "@/app/actions/create-project";
import Button from "@/app/components/landing-page/ui/button";
import Modal from "@/app/components/landing-page/ui/modal";
import TextArea from "@/app/components/landing-page/ui/textarea";
import TextInput from "@/app/components/landing-page/ui/textinput";
import { compressFiles, handleImageInput, triggerImageInput } from "@/app/lib/utils";
import { ArrowUpFromLine, ImagePlus, Loader2, Plus, X, AlertCircle, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewProject({ 
  profileId,
  isSubscribed,
  totalProjects
}: { 
  profileId: string;
  isSubscribed: boolean;
  totalProjects: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [projectImage, setProjectImage] = useState<string | null>(null);
  
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [errors, setErrors] = useState({
    projectName: "",
    projectUrl: "",
    projectImage: "",
  });

  const router = useRouter();

  // Verifica se o usuário atingiu o limite do Freemium
  const isLocked = !isSubscribed && totalProjects >= 1;

  useEffect(() => {
    if (!isOpen) {
        setErrors({ projectName: "", projectUrl: "", projectImage: "" });
        setProjectName("");
        setProjectDescription("");
        setProjectUrl("");
        setProjectImage(null);
    }
  }, [isOpen]);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { projectName: "", projectUrl: "", projectImage: "" };

    if (!projectName.trim()) {
      newErrors.projectName = "O título é obrigatório";
      isValid = false;
    }

    if (!projectUrl.trim()) {
      newErrors.projectUrl = "A URL é obrigatória";
      isValid = false;
    }

    const imagesInput = document.getElementById("imageInput") as HTMLInputElement;
    if (!projectImage || !imagesInput.files?.length) {
      newErrors.projectImage = "Capa obrigatória";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  async function handleCreateProject() {
    if (!validateForm()) return;

    setIsCreatingProject(true);
    
    const imagesInput = document.getElementById("imageInput") as HTMLInputElement;
    if (!imagesInput.files?.length) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    const formData = new FormData();
    formData.append("file", compressedFile[0]);
    formData.append("profileId", profileId);
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectUrl", projectUrl);

    const response = await createProject(formData);

    if (response?.error === "LIMIT_REACHED") {
      setIsCreatingProject(false);
      setIsOpen(false);
      router.push(`/${profileId}/upgrade`);
      return;
    }

    startTransition(() => {
      setIsOpen(false);
      setIsCreatingProject(false);
      router.refresh();
    });
  }

  const handleInputChange = (field: keyof typeof errors, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    if (field === "projectName") setProjectName(value);
    if (field === "projectUrl") setProjectUrl(value);
  };

  return (
    <>
      {isLocked ? (
        <button
          onClick={() => router.push(`/${profileId}/upgrade`)}
          className="group w-full max-w-[600px] h-[132px] rounded-2xl bg-background-secondary/40 border-2 border-dashed border-border-secondary hover:border-[#4200cd]/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <div className="p-2.5 rounded-full bg-background-tertiary group-hover:bg-[#4200cd]/10 transition-colors">
              <Lock className="size-6 text-content-body/50 group-hover:text-[#4200cd] transition-colors" />
          </div>
          <span className="font-medium text-content-body/80 flex flex-col items-center gap-1">
              Limite de Projetos Atingido
              <span className="text-xs text-[#4200cd] font-bold">Faça upgrade para ilimitado</span>
          </span>
        </button>
      ) : (
        <button
          onClick={handleOpenModal}
          className="group w-full max-w-[600px] h-[132px] rounded-2xl bg-background-secondary border border-transparent hover:border-border-secondary transition-all duration-300 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md cursor-pointer"
        >
          <div className="p-3 rounded-full bg-background-tertiary group-hover:bg-accent-green/10 transition-colors">
              <Plus className="size-8 text-accent-green" />
          </div>
          <span className="font-medium text-content-body">Novo Link</span>
        </button>
      )}

      {/* O Modal permanece o mesmo... */}
      <Modal closeOnClickOutside={false} isOpen={isOpen} setIsOpen={setIsOpen}>
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                    className="bg-background-primary w-full max-w-[700px] p-8 rounded-2xl flex flex-col gap-6 relative shadow-xl overflow-hidden"
                >
                
                <div className="flex items-center justify-between border-b border-border-secondary/30 pb-4">
                    <h2 className="text-2xl font-bold text-content-heading">Criar Novo Link</h2>
                    <button onClick={handleCloseModal} className="text-content-body hover:text-content-heading transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* COLUNA DA IMAGEM */}
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-sm font-semibold text-content-heading">Capa do Link</label>

                        <button 
                            className={`w-full h-full min-h-[220px] rounded-xl bg-background-tertiary border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden group gap-4 relative
                                ${errors.projectImage 
                                    ? "border-red-500 hover:border-red-600" 
                                    : "border-border-secondary hover:border-accent-green/50"
                                }`}
                            onClick={() => {
                                triggerImageInput("imageInput");
                                setErrors(prev => ({...prev, projectImage: ""}));
                            }}
                        >
                            {projectImage ? (
                                <>
                                    <img
                                        src={projectImage}
                                        alt="Project Preview"
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <span className="text-white font-medium text-sm flex items-center gap-2">
                                            <ArrowUpFromLine size={16} /> Alterar
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`p-4 rounded-full transition-colors ${errors.projectImage ? "bg-red-500/10 text-red-500" : "bg-background-primary text-content-body/60 group-hover:text-accent-green"}`}>
                                        <ImagePlus size={28} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-content-heading">Clique para upload</p>
                                        <p className="text-xs text-content-body/60 mt-1">Recomendado: 100x100</p>
                                    </div>
                                </>
                            )}
                        </button>

                        {/* MENSAGEM DE ERRO COM POSICIONAMENTO ABSOLUTO */}
                        {errors.projectImage && (
                             <span className="absolute -bottom-6 left-0 text-red-500 text-xs font-medium flex items-center gap-1">
                                <AlertCircle size={12} /> {errors.projectImage}
                             </span>
                        )}

                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                setProjectImage(handleImageInput(e));
                                setErrors(prev => ({...prev, projectImage: ""}));
                            }}
                        />
                    </div>

                    {/* COLUNA DOS TEXTOS */}
                    <div className="flex flex-col gap-6"> 
                        
                        <div className="flex flex-col gap-1.5 relative">
                            <label htmlFor="project-name" className="text-sm font-bold text-content-heading">Título</label>
                            
                            <TextInput
                                id="project-name"
                                placeholder="Digite o nome do link"
                                value={projectName}
                                onChange={(e) => handleInputChange("projectName", e.target.value)}
                                className={`${errors.projectName ? "border-red-500 focus:ring-red-500" : ""}`}
                            />
                            
                            {/* MENSAGEM DE ERRO ABSOLUTA */}
                            {errors.projectName && (
                                <span className="absolute -bottom-5 left-0 text-red-500 text-xs font-medium flex items-center gap-1">
                                    <AlertCircle size={12} /> {errors.projectName}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5 relative">
                            <label htmlFor="project-url" className="text-sm font-bold text-content-heading">URL</label>
                            
                            <TextInput
                                type="url"
                                id="project-url"
                                placeholder="https://seusite.com"
                                value={projectUrl}
                                onChange={(e) => handleInputChange("projectUrl", e.target.value)}
                                className={`${errors.projectUrl ? "border-red-500 focus:ring-red-500" : ""}`}
                            />
                            
                            {/* MENSAGEM DE ERRO ABSOLUTA */}
                            {errors.projectUrl && (
                                <span className="absolute -bottom-5 left-0 text-red-500 text-xs font-medium flex items-center gap-1">
                                    <AlertCircle size={12} /> {errors.projectUrl}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="project-description"
                                className="text-sm font-bold text-content-heading"
                            >
                                Descrição
                            </label>
                            <TextArea
                                id="project-description"
                                placeholder="Breve descrição..."
                                className="h-28 resize-none"
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                maxLength={150} 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 justify-end pt-4 border-t border-border-secondary/30">
                    <Button 
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-2 rounded-xl font-normal text-content-body hover:bg-background-tertiary transition-colors"
                        variant="ghost"
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={handleCreateProject} 
                        disabled={isCreatingProject}
                        className="min-w-[120px]"
                        isLoading={isCreatingProject}
                        variant="primary"
                    >
                        Criar Link
                    </Button>
                </div>

                </motion.div>
            )}
        </AnimatePresence>
      </Modal>
    </>
  );
}