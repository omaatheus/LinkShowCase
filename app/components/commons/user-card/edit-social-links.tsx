"use client";

import { Github, Instagram, Linkedin, Plus, Twitter, Edit, Link2, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useState, useEffect } from "react";
import Modal from "../../landing-page/ui/modal";
import TextInput from "../../landing-page/ui/textinput";
import Button from "../../landing-page/ui/button";
import createSocialLinks from "@/app/actions/create-social-links";

const SocialInputCard = ({ icon: Icon, label, placeholder, value, onChange, colorClass }: any) => (
  <div className="group relative flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
      {label}
    </label>
    <div className="flex items-center gap-3 p-2 rounded-2xl border border-gray-200 bg-gray-50/50 transition-all duration-300 focus-within:bg-white focus-within:border-gray-300 focus-within:shadow-sm hover:border-gray-300">
      <div className={`p-2.5 rounded-xl bg-white shadow-sm text-gray-400 transition-colors duration-300 ${colorClass}`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <TextInput
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  </div>
);

export default function EditSocialLinks({
  socialMedias,
}: {
  socialMedias?: {
    github?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false);

  // Valores iniciais para comparação
  const initialGithub = socialMedias?.github || "";
  const initialInstagram = socialMedias?.instagram || "";
  const initialLinkedin = socialMedias?.linkedin || "";
  const initialTwitter = socialMedias?.twitter || "";

  const [github, setGithub] = useState(initialGithub);
  const [instagram, setInstagram] = useState(initialInstagram);
  const [linkedin, setLinkedin] = useState(initialLinkedin);
  const [twitter, setTwitter] = useState(initialTwitter);

  const { profileId } = useParams();

  const hasChanges =
    github !== initialGithub ||
    instagram !== initialInstagram ||
    linkedin !== initialLinkedin ||
    twitter !== initialTwitter;

  const hasSocialLinks =
    initialGithub || initialInstagram || initialLinkedin || initialTwitter;

    useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);
  function handleCloseModal() {
    setGithub(initialGithub);
    setInstagram(initialInstagram);
    setLinkedin(initialLinkedin);
    setTwitter(initialTwitter);
    setIsModalOpen(false);
  }

  async function handleAddSocialLinks() {
    if (!profileId || !hasChanges) return;

    setIsSavingSocialLinks(true);

    await createSocialLinks({
      profileId: profileId as string,
      github,
      instagram,
      linkedin,
      twitter,
    });

    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingSocialLinks(false);
      router.refresh();
    });
  }

  const isSaveButtonDisabled = isSavingSocialLinks || !hasChanges;


  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-3 rounded-2xl bg-white text-gray-600 shadow-sm border border-gray-100 transition-all duration-300 flex items-center justify-center hover:-translate-y-1 hover:shadow-md hover:text-black group"
      >
        {hasSocialLinks ? (
          <Edit size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
        ) : (
          <Plus size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
        )}
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={handleCloseModal}>
        <div className="bg-white p-6 sm:p-8 rounded-[32px] flex flex-col gap-8 w-[90vw] max-w-[440px] max-h-[85dvh] overflow-y-auto shadow-2xl relative scrollbar-hide">
          
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />

          <div className="flex flex-col items-center text-center gap-2 relative z-10 mt-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-2 shadow-inner">
              <Link2 size={24} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {hasSocialLinks ? "Atualizar conexões" : "Adicionar redes sociais"}
            </h2>
            <p className="text-sm text-gray-500 px-4">
              Conecte seus perfis para que seus visitantes possam te encontrar em outras plataformas.
            </p>
          </div>

          <div className="flex flex-col gap-5 relative z-10">
            <SocialInputCard
              icon={Github}
              label="GitHub"
              placeholder="https://github.com/..."
              value={github}
              onChange={(e: any) => setGithub(e.target.value)}
              colorClass="group-focus-within:text-black"
            />
            <SocialInputCard
              icon={Linkedin}
              label="LinkedIn"
              placeholder="https://linkedin.com/in/..."
              value={linkedin}
              onChange={(e: any) => setLinkedin(e.target.value)}
              colorClass="group-focus-within:text-blue-600"
            />
            <SocialInputCard
              icon={Instagram}
              label="Instagram"
              placeholder="https://instagram.com/..."
              value={instagram}
              onChange={(e: any) => setInstagram(e.target.value)}
              colorClass="group-focus-within:text-pink-600"
            />
            <SocialInputCard
              icon={Twitter}
              label="Twitter (X)"
              placeholder="https://twitter.com/..."
              value={twitter}
              onChange={(e: any) => setTwitter(e.target.value)}
              colorClass="group-focus-within:text-sky-500"
            />
          </div>

          <div className="flex gap-3 justify-end items-center pt-6 border-t border-gray-100 relative z-10">
            <button
              onClick={handleCloseModal}
              disabled={isSavingSocialLinks}
              className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            
            <div className={!hasChanges ? "cursor-not-allowed" : ""}>
              
              <Button 
                            onClick={handleAddSocialLinks} 
                            disabled={isSaveButtonDisabled} 
                            className="px-8 py-3 rounded-xl font-bold shadow-lg shadow-violet-200 transition-all flex items-center gap-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:opacity-100"
                            isLoading={isSavingSocialLinks}
                          >
                            {isSavingSocialLinks ? "Salvando" : "Salvar"}
                          </Button>
            </div>
          </div>

        </div>
      </Modal>
    </>
  );
}