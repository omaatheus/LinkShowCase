"use client";
import { updateProject } from "@/app/actions/edit-project";
import Button from "@/app/components/landing-page/ui/button";
import Modal from "@/app/components/landing-page/ui/modal";
import TextArea from "@/app/components/landing-page/ui/textarea";
import TextInput from "@/app/components/landing-page/ui/textinput";
import { compressFiles, handleImageInput, triggerImageInput } from "@/app/lib/utils";
import { ProjectData } from "@/app/server/get-profile-data";
import { ArrowUpFromLine, X, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EditProjectModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  project: ProjectData;
  profileId: string;
  currentImg: string;
}

export default function EditProjectModal({ isOpen, setIsOpen, project, profileId, currentImg }: EditProjectModalProps) {
  const [projectName, setProjectName] = useState(project.projectName || "");
  const [projectDescription, setProjectDescription] = useState(project.projectDescription || "");
  const [projectUrl, setProjectUrl] = useState(project.projectUrl || "");
  const [projectImage, setProjectImage] = useState<string | null>(currentImg);
  const [imageChanged, setImageChanged] = useState(false);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState({
    projectName: "",
    projectUrl: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      setProjectName(project.projectName || "");
      setProjectDescription(project.projectDescription || "");
      setProjectUrl(project.projectUrl || "");
      setProjectImage(currentImg);
      setImageChanged(false);
      setErrors({ projectName: "", projectUrl: "" });
    }
  }, [isOpen, project, currentImg]);

  const hasChanges = 
    projectName.trim() !== (project.projectName || "") ||
    projectDescription.trim() !== (project.projectDescription || "") ||
    projectUrl.trim() !== (project.projectUrl || "") ||
    imageChanged;

  const validateForm = () => {
    let isValid = true;
    const newErrors = { projectName: "", projectUrl: "" };

    if (!projectName.trim()) {
      newErrors.projectName = "O título é obrigatório";
      isValid = false;
    }

    if (!projectUrl.trim()) {
      newErrors.projectUrl = "A URL é obrigatória";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  async function handleUpdateProject() {
    if (!validateForm()) return;

    setIsUpdating(true);
    const formData = new FormData();
    formData.append("projectId", project.id);
    formData.append("profileId", profileId);
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectUrl", projectUrl);

    if (imageChanged) {
      const imagesInput = document.getElementById(`editImageInput-${project.id}`) as HTMLInputElement;
      if (imagesInput.files?.length) {
        const compressedFile = await compressFiles(Array.from(imagesInput.files));
        formData.append("file", compressedFile[0]);
      }
    }

    try {
      await updateProject(formData);
      
      startTransition(() => {
        setIsOpen(false);
        setIsUpdating(false);
        router.refresh();
      });
    } catch (error) {
      console.error(error);
      setIsUpdating(false);
    }
  }

  const handleInputChange = (field: keyof typeof errors, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    if (field === "projectName") setProjectName(value);
    if (field === "projectUrl") setProjectUrl(value);
  };

  return (
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
              <h2 className="text-2xl font-bold text-content-heading">Editar Link</h2>
              <button onClick={() => setIsOpen(false)} className="text-content-body hover:text-content-heading transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-semibold text-content-heading">Capa do Link</label>
                <button 
                  className="w-full h-full min-h-[220px] rounded-xl bg-background-tertiary border-2 border-dashed border-border-secondary hover:border-accent-green/50 transition-all flex flex-col items-center justify-center overflow-hidden group gap-4 relative"
                  onClick={() => triggerImageInput(`editImageInput-${project.id}`)}
                >
                  {projectImage && (
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
                  )}
                </button>

                <input
                  type="file"
                  id={`editImageInput-${project.id}`}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const imgPreview = handleImageInput(e);
                    if (imgPreview) {
                      setProjectImage(imgPreview);
                      setImageChanged(true);
                    }
                  }}
                />
              </div>

              <div className="flex flex-col gap-6"> 
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-sm font-bold text-content-heading">Título</label>
                  <TextInput
                    placeholder="Digite o nome do link"
                    value={projectName}
                    onChange={(e) => handleInputChange("projectName", e.target.value)}
                    className={`${errors.projectName ? "border-red-500" : ""}`}
                  />
                  {errors.projectName && (
                    <span className="absolute -bottom-5 left-0 text-red-500 text-xs font-medium flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.projectName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-sm font-bold text-content-heading">URL</label>
                  <TextInput
                    type="url"
                    placeholder="https://seusite.com"
                    value={projectUrl}
                    onChange={(e) => handleInputChange("projectUrl", e.target.value)}
                    className={`${errors.projectUrl ? "border-red-500" : ""}`}
                  />
                  {errors.projectUrl && (
                    <span className="absolute -bottom-5 left-0 text-red-500 text-xs font-medium flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.projectUrl}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-content-heading">Descrição</label>
                  <TextArea
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
                            onClick={handleUpdateProject} 
                            disabled={!hasChanges} 
                            className="px-8 py-3 rounded-xl font-bold shadow-lg shadow-violet-200 transition-all flex items-center gap-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:opacity-100"
                            isLoading={isUpdating}
                          >
                            {isUpdating ? "Salvando" : "Salvar"}
                          </Button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}