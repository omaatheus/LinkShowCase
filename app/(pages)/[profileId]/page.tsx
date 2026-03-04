import ProjectCard from "@/app/components/commons/projectCard";
import { TotalVisits } from "@/app/components/commons/totalVisits";
import UserCard from "@/app/components/commons/user-card/userCard";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewProject from "./new-project";
import {
  getProfileData,
  getProfileProjects,
} from "@/app/server/get-profile-data";
import { getDownloadURLFromPath } from "@/app/lib/firebase";
import { increaseProfileVisits } from "@/app/actions/increase-profile-visits";
import { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import FooterFree from "@/app/components/landing-page/ui/footerfree";

export const metadata: Metadata = {
  title: "Linkslie - Perfil",
  description:
    "Linkslie - Ajude seus seguidores a descobrir tudo o que você faz, com um simples link.",
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;

  const profileData = await getProfileData(profileId);

  if (!profileData) return notFound();

  const projects = await getProfileProjects(profileId);
  const session = await auth();
  const isOwner = profileData.userId === session?.user?.id;
  const isSubscribed = session?.user?.isSubscribed ?? false;
  const isProfileSubscribed = profileData.isSubscribed ?? false;

  if (!isOwner) {
    await increaseProfileVisits(profileId);
  }

  if (isOwner && !isProfileSubscribed) {
    profileData.totalVisits = 0;
    projects.forEach(project => {
      project.totalVisits = 0;
    });
  }

  if (isOwner && !isSubscribed) {
    profileData.totalVisits = 0;
    projects.forEach(project => {
      project.totalVisits = 0;
    });
  }
  
  const projectsWithImages = await Promise.all(
    projects.map(async (project) => {
      const imageUrl = (await getDownloadURLFromPath(project.imagePath)) || "";
      return { ...project, imageUrl };
    }),
  );

  return (
    <div className="relative min-h-screen flex flex-col bg-background-primary overflow-x-hidden">
      {/* BACKGROUND DECORATIVO */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-background-secondary/50 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-accent-green/10 rounded-full blur-3xl opacity-50" />
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12 flex flex-col lg:flex-row gap-10 lg:gap-20">
      {/* COLUNA PERFIL */}
        <div className="w-full lg:w-[30%] flex justify-center lg:justify-start">
          <div className="lg:sticky lg:top-24 flex flex-col items-center gap-4 w-full max-w-[320px]">
            
            {/* NOVO BANNER DO PLANO FREE */}
            {isOwner && !isSubscribed && (
              <Link href={`/${profileId}/upgrade`} className="w-full group">
                <div className="w-full bg-purple-50 border border-[#4200cd] shadow-sm rounded-3xl p-4 flex flex-col items-center gap-2 transition-all duration-300 hover:shadow-md hover:border-purple-300 hover:-translate-y-0.5">
                  
                  <span className="text-[#4200cd] text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="size-4 text-[#4200cd] animate-pulse" />
                    Plano Gratuito
                  </span>
                  
                  <span className="text-[#4200cd] text-xs font-bold flex items-center justify-center gap-1 transition-colors duration-300">
                    Desbloqueie o Pro 
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>

                </div>
              </Link>
            )}

            <UserCard isOwner={isOwner} profileData={profileData} />

            {isOwner && (
              <TotalVisits
                totalVisits={profileData.totalVisits}
                showBar={true}
                isSubscribed={isSubscribed}
              />
            )}
          </div>
        </div>

        {/* COLUNA PROJETOS */}
        <div className="w-full lg:w-[70%]">
          <div className="mb-6 pl-2 border-l-4 border-accent-green">
            <h2 className="text-xl font-bold text-content-heading">
              Meus Links & Projetos
            </h2>
            <p className="text-sm text-content-body">
              Explore meu conteúdo mais recente
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {isOwner && (
              <div className="w-full animate-fade-in-up">
                <NewProject 
                  profileId={profileId} 
                  isSubscribed={isSubscribed} 
                  totalProjects={projects.length} 
                />
              </div>
            )}

            {projectsWithImages.map((project) => (
              <div key={project.id} className="w-full animate-fade-in-up">
                <ProjectCard
                  project={project}
                  isOwner={isOwner}
                  img={project.imageUrl}
                  isSubscribed={isSubscribed}
                />
              </div>
            ))}
          </div>

          {!isOwner && projects.length === 0 && (
            <div className="text-center py-20 bg-background-secondary rounded-2xl border-dashed border-2 border-border-secondary opacity-70">
              <p className="text-content-body">
                Nenhum projeto publicado ainda.
              </p>
            </div>
          )}
        </div>
      </main>
      {!isProfileSubscribed && (
        <FooterFree />
      )}
    </div>
  );
}