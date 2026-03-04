"use client";

import {
  ArrowUpFromLine,
  User,
  Link as LinkIcon,
  AlertCircle,
  Lock, // <-- Importamos o Lock aqui
} from "lucide-react";
import { startTransition, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  compressFiles,
  handleImageInput,
  triggerImageInput,
} from "@/app/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { ProfileData } from "@/app/server/get-profile-data";
import { saveProfile } from "@/app/actions/save-profile";
import addCustomLinks from "@/app/actions/add-custom-links";
import Modal from "../../landing-page/ui/modal";
import Button from "../../landing-page/ui/button";
import TextArea from "../../landing-page/ui/textarea";

export default function EditUserCard({
  profileData,
  initialImage,
  isSubscribed, 
}: {
  profileData?: ProfileData;
  initialImage?: string;
  isSubscribed: boolean;
}) {
  const router = useRouter();
  const { profileId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "links">("profile");

  // Estados de Erro
  const [errors, setErrors] = useState<{ name?: string; pic?: string }>({});

  // Estados do Perfil
  const [profilePic, setProfilePic] = useState<string | null>(
    initialImage || "",
  );
  const [yourName, setYourName] = useState(profileData?.name || "");
  const [yourDescription, setYourDescription] = useState(
    profileData?.description || "",
  );

  // Estados dos Links
  const [link1, setLink1] = useState(
    profileData?.link1 || { title: "", url: "" },
  );
  const [link2, setLink2] = useState(
    profileData?.link2 || { title: "", url: "" },
  );
  const [link3, setLink3] = useState(
    profileData?.link3 || { title: "", url: "" },
  );

  const maxBioLength = 150;
  const currentBioLength = yourDescription.length;
  const isBioLimitReached = currentBioLength >= maxBioLength;

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxBioLength) {
      setYourDescription(text);
    }
  };

  async function handleSave() {
    setErrors({});
    const newErrors: { name?: string; pic?: string } = {};
    let hasError = false;

    if (!yourName.trim()) {
      newErrors.name = "O nome é obrigatório.";
      hasError = true;
      setActiveTab("profile");
    }

    if (!profilePic && !profileData?.imagePath) {
      newErrors.pic = "A foto de perfil é obrigatória.";
      hasError = true;
      setActiveTab("profile");
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    if (!profileId) return;

    const imagesInput = document.getElementById(
      "profile-pic-input",
    ) as HTMLInputElement;
    const formData = new FormData();
    formData.append("profileId", profileId as string);
    formData.append("yourName", yourName);
    formData.append("yourDescription", yourDescription);

    if (imagesInput && imagesInput.files && imagesInput.files.length > 0) {
      const compressedFile = await compressFiles(Array.from(imagesInput.files));
      formData.append("profilePic", compressedFile[0]);
    }

    const finalLink1 = link1;
    const finalLink2 = isSubscribed ? link2 : { title: "", url: "" };
    const finalLink3 = isSubscribed ? link3 : { title: "", url: "" };

    try {
      await Promise.all([
        saveProfile(formData),
        addCustomLinks({
          profileId: profileId as string,
          link1: finalLink1,
          link2: finalLink2,
          link3: finalLink3,
        }),
      ]);

      startTransition(() => {
        setIsModalOpen(false);
        setIsSaving(false);
        router.refresh();
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSaving(false);
    }
  }

  const isFormValid = yourName.trim().length > 0 && !!(profilePic || profileData?.imagePath);

  const hasChanges = 
    yourName !== (profileData?.name || "") ||
    yourDescription !== (profileData?.description || "") ||
    profilePic !== (initialImage || "") ||
    link1.title !== (profileData?.link1?.title || "") ||
    link1.url !== (profileData?.link1?.url || "") ||
    link2.title !== (profileData?.link2?.title || "") ||
    link2.url !== (profileData?.link2?.url || "") ||
    link3.title !== (profileData?.link3?.title || "") ||
    link3.url !== (profileData?.link3?.url || "");

  const isSaveButtonDisabled = isSaving || !isFormValid || !hasChanges;
  const tabVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.2 } },
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-white/20 hover:bg-white/40 rounded-full transition-all text-black backdrop-blur-sm"
      >
        <User size={18} />
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <div className="bg-white rounded-[24px] w-full md:w-[520px] h-[700px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
          {/* HEADER  */}
          <div className="shrink-0 flex items-center justify-between p-6 border-b border-gray-100 bg-white z-20">
            <h2 className="text-xl font-bold text-gray-800">Editar Cartão</h2>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {(["profile", "links"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-white shadow-sm text-violet-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "profile" ? "Perfil" : "Links"}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT  */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <AnimatePresence mode="wait">
              {/* --- ABA PERFIL --- */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-6 pb-4"
                >
                  {/* Upload de Imagem */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`relative group w-32 h-32 rounded-2xl border-4 ${errors.pic ? "border-red-400" : "border-gray-50"} overflow-hidden shadow-sm transition-colors shrink-0`}
                    >
                      {profilePic || profileData?.imagePath ? (
                        <img
                          src={profilePic || "/profile.png"} 
                          alt="Profile"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <User size={48} />
                        </div>
                      )}
                      <button
                        onClick={() => triggerImageInput("profile-pic-input")}
                        className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]"
                      >
                        <ArrowUpFromLine size={20} className="mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">
                          Alterar
                        </span>
                      </button>
                    </div>
                    <input
                      id="profile-pic-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        setErrors({ ...errors, pic: undefined });
                        setProfilePic(handleImageInput(e));
                      }}
                    />
                    {errors.pic && (
                      <span className="text-red-500 text-xs font-medium flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.pic}
                      </span>
                    )}
                  </div>

                  {/* Input Nome */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="your-name"
                      className="text-sm font-semibold text-gray-700 ml-1"
                    >
                      Seu Nome <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="your-name"
                      type="text"
                      placeholder="Como você quer ser chamado?"
                      value={yourName}
                      onChange={(e) => {
                        setErrors({ ...errors, name: undefined });
                        setYourName(e.target.value);
                      }}
                      className={`w-full p-4 bg-gray-50 rounded-2xl border outline-none transition-all ${
                        errors.name
                          ? "border-red-300 focus:border-red-500 bg-red-50/50"
                          : "border-transparent focus:border-violet-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)]"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs font-medium ml-1">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Input Bio */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end ml-1">
                      <label
                        htmlFor="your-description"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Bio
                      </label>
                    </div>
                    
                    <TextArea
                        id="project-description"
                        placeholder="Breve descrição..."
                        className="h-28 resize-none"
                        value={yourDescription}
                        onChange={handleBioChange}
                        maxLength={150} 
                    />
                  </div>
                </motion.div>
              )}

              {/* --- ABA LINKS --- */}
              {activeTab === "links" && (
                <motion.div
                  key="links"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-4 pb-4"
                >
                  <div className="p-4 bg-violet-50 rounded-xl mb-2">
                    <p className="text-sm text-violet-700 font-medium">
                      Adicione botões destacados para seus projetos, portfólio
                      ou produtos.
                    </p>
                  </div>

                  {[
                    { state: link1, set: setLink1, label: "Botão 1", isLocked: false },
                    { state: link2, set: setLink2, label: "Botão 2", isLocked: !isSubscribed }, 
                    { state: link3, set: setLink3, label: "Botão 3", isLocked: !isSubscribed },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`group border rounded-2xl p-4 transition-all relative overflow-hidden ${
                        item.isLocked
                          ? "border-dashed border-gray-200 bg-gray-50/50"
                          : "border-gray-100 bg-white hover:border-violet-200 hover:shadow-sm"
                      }`}
                    >
                      {/* OVERLAY DE BLOQUEIO */}
                      {item.isLocked && (
                        <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[1.5px] flex flex-col items-center justify-center gap-2 transition-all">
                          <div className="p-2 bg-violet-100 rounded-full">
                            <Lock size={18} className="text-violet-700" />
                          </div>
                          <span className="text-sm font-bold text-gray-800">Link bloqueado</span>
                          <button
                            onClick={() => {
                              setIsModalOpen(false);
                              router.push(`/${profileId}/upgrade`);
                            }}
                            className="text-xs text-violet-700 font-bold hover:underline"
                          >
                            Desbloqueie no plano Pro &rarr;
                          </button>
                        </div>
                      )}

                      <div className={`flex items-center gap-2 mb-3 font-semibold text-xs uppercase tracking-wider ${
                          item.isLocked ? "text-gray-400" : "text-gray-500 group-hover:text-violet-600 transition-colors"
                        }`}
                      >
                        <LinkIcon size={14} /> {item.label}
                      </div>
                      <div className="grid gap-3">
                        <input
                          type="text"
                          placeholder="Título (ex: Meu Site)"
                          value={item.state.title}
                          onChange={(e) =>
                            item.set({ ...item.state, title: e.target.value })
                          }
                          disabled={item.isLocked}
                          className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-violet-100 transition-all disabled:opacity-50"
                        />
                        <input
                          type="text"
                          placeholder="URL (https://...)"
                          value={item.state.url}
                          onChange={(e) =>
                            item.set({ ...item.state, url: e.target.value })
                          }
                          disabled={item.isLocked}
                          className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-violet-100 transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER */}
          <div className="shrink-0 p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3 justify-end z-20">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors text-sm"> 
                Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isSaveButtonDisabled} 
              className="px-8 py-3 rounded-xl font-bold shadow-lg shadow-violet-200 transition-all flex items-center gap-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:opacity-100"
              isLoading={isSaving}
            >
              {isSaving ? "Processando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}