import Header from "@/app/components/landing-page/header";
import PlanButtons from "./plan-buttons";
import { Metadata } from "next";
import { getProfileData } from "@/app/server/get-profile-data";
import { auth } from "@/app/lib/auth";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Linkslie - Upgrade",
  description: "Linkslie - Ajude seus seguidores a descobrir tudo o que você faz, com um simples link."
}

export default async function UpgradePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  
  const session = await auth();
  const profileData = await getProfileData(profileId);

  if (!profileData) return notFound();

  const isOwner = profileData.userId === session?.user?.id;

  if (!isOwner) {
    redirect(`/${profileId}`);
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pb-20 p-6 flex flex-col items-center justify-center gap-12 pt-20">
        
        {/* Seção de Copywriting Persuasivo */}
        <div className="flex flex-col items-center gap-6 text-center max-w-3xl mx-auto">
          <span className="text-[#5000b9] font-bold uppercase tracking-widest text-sm bg-[#5000b9]/10 py-1 px-3 rounded-full">
            Chegou a hora de evoluir
          </span>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
            Pare de limitar seus resultados. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#5000b9_0%,#7e038a_100%)]">
              Destrave todo o seu potencial.
            </span>
          </h2>
          
          <p className="text-content-body text-lg md:text-xl max-w-2xl">
            O plano gratuito te trouxe até aqui, mas sua presença online merece um destaque premium. 
            Tenha acesso ilimitado a análises avançadas, customização completa e remova as limitações. 
            Tudo isso por um valor menor que um lanche.
          </p>
        </div>

        {/* Componente de Preços */}
        <div className="w-full flex justify-center mt-4">
          <PlanButtons />
        </div>

      </div>
    </>
  );
}