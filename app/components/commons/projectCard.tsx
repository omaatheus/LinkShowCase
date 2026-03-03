"use client";

import { deleteProject } from "@/app/actions/deleteProject";
import { increaseProjectVisits } from "@/app/actions/increase-project-visits";
import { formatUrl } from "@/app/lib/utils";
import { ProjectData } from "@/app/server/get-profile-data";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import EditProjectModal from "./EditProjectModal"; 

export default function ProjectCard({
  project,
  isOwner,
  img,
  name,
  description
}: {
  project?: ProjectData;
  isOwner: boolean;
  img: string;
  name?: string;
  description?: string
}) {
  const { profileId } = useParams();
  const formattedUrl = formatUrl(project?.projectUrl || "");
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Novo estado
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleClick() {
    if (!profileId || !project?.id || isOwner) return;
    await increaseProjectVisits(profileId as string, project.id);
  }

  async function handleDeleteProject() {
    if (!profileId || !project?.id) return;
    try {
      await deleteProject(profileId as string, project.id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  if (!isOwner) {
    return (
      <Link href={formattedUrl} target="_blank" onClick={handleClick} className="w-full block">
        <div className="w-full max-w-[600px] h-auto min-h-[132px] flex gap-4 sm:gap-5 bg-background-secondary p-3 sm:p-4 rounded-[20px] border border-transparent hover:border-border-secondary transition-all">
          <div className="size-20 sm:size-24 rounded-md overflow-hidden flex-shrink-0">
            <img src={img} alt="Link" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col">
              <span className="text-black font-bold break-words">
                {name || project?.projectName}
              </span>
              <span className="text-content-body text-sm break-words mt-1">
                {description || project?.projectDescription}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
    <>
      <div className="w-full">
        <div className="w-full max-w-[600px] h-auto min-h-[132px] flex gap-4 sm:gap-5 bg-background-secondary p-3 sm:p-4 rounded-[20px] border border-transparent hover:border-border-secondary transition-all relative">
          <div className="size-20 sm:size-24 rounded-md overflow-hidden flex-shrink-0">
            <img src={img} alt="Link" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col gap-1 w-full justify-center">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col">
                <span className="uppercase text-xs font-bold text-[#5000b9]">
                  {project?.totalVisits || 0} cliques
                </span>
              </div>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1 rounded-lg hover:bg-black/5 transition-colors text-gray-600"
                  aria-label="Opções do projeto"
                >
                  <MoreVertical size={20} />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-10 origin-top-right animate-in fade-in zoom-in-95 duration-100">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsEditModalOpen(true); // Abre o modal de edição
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors flex items-center gap-2"
                    >
                      <Pencil size={14} />
                      Editar
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleDeleteProject();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col -mt-1">
              <span className="text-black font-bold break-words">
                {name || project?.projectName}
              </span>
              <span className="text-content-body text-sm break-words mt-0.5">
                {description || project?.projectDescription}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Renderiza o Modal de Edição */}
      {project && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          project={project}
          profileId={profileId as string}
          currentImg={img}
        />
      )}
    </>
  );
}}