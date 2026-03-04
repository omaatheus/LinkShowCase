import { Github, Linkedin, Twitter, Instagram, Plus, ExternalLink } from "lucide-react";
import EditSocialLinks from "./edit-social-links";
import Link from "next/link";
import { ProfileData } from "@/app/server/get-profile-data";
import { formatUrl } from "@/app/lib/utils";
import { getDownloadURLFromPath } from "@/app/lib/firebase";
import EditUserCard from "./edit-user-card";
import { auth } from "@/app/lib/auth";

export default async function UserCard({
  profileData,
  isOwner,
}: {
  profileData?: ProfileData;
  isOwner?: boolean;
}) {
  const session = await auth();
  const isSessionOn = profileData?.userId === session?.user?.id;
  const canEdit = isOwner && isSessionOn;
  const profileImageUrl = await getDownloadURLFromPath(profileData?.imagePath) || "/profile.png";

  const icones = [Github, Linkedin, Twitter, Instagram, Plus];

  console.log(profileImageUrl);

  const SocialButton = ({ 
    href, 
    Icon, 
    label, 
    hoverColorClass 
  }: { 
    href: string; 
    Icon: any; 
    label: string;
    hoverColorClass: string;
  }) => (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visitar perfil no ${label}`}
      title={label}
      className={`p-3 rounded-2xl bg-white text-gray-600 shadow-sm border border-gray-100 transition-all duration-300 flex items-center justify-center hover:-translate-y-1 hover:shadow-md hover:bg-white ${hoverColorClass}`}
    >
      <Icon size={22} strokeWidth={1.5} />
    </Link>
  );

  

  return (
    <div className="w-full max-w-[348px] flex flex-col gap-6 items-center p-6 border border-white/20 bg-[#E3E9F0] rounded-[32px] text-black shadow-xl relative overflow-hidden">
      
      {canEdit && (
        <div className="absolute top-4 right-4 z-50">
           <EditUserCard 
  isSubscribed={session?.user?.isSubscribed ?? false}  profileData={profileData} initialImage={profileImageUrl} />

        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

      {/* Foto de Perfil */}
      <div className="relative size-48 group z-10">
        <div className="size-48 rounded-full p-1 bg-white shadow-lg overflow-hidden">
             <img
              src={
                profileImageUrl ||
                "/profile.png"
              }
              alt={profileData?.name || "User profile"}
              className="rounded-full object-cover w-full h-full"
            />
        </div>
      </div>

      {/* Informações Textuais */}
      <div className="flex flex-col gap-3 w-full text-center z-10 relative">
        <div className="flex items-center justify-center gap-2 relative">
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight min-w-0">
            {profileData?.name || "Matheus Silva"}
          </h3>
        </div>
        <p className="text-gray-600 font-medium leading-relaxed">
          {profileData?.description || "Eu faço produtos para a Internet"}
        </p>
      </div>

      {/* Links Sociais */}
      <div className="flex flex-col gap-4 w-full items-center mt-2 mb-2">
        {/* Divisor Visual para o Label */}
        <div className="flex items-center gap-3 w-full max-w-[200px]">
          <div className="h-[1px] bg-gray-300/50 flex-1 rounded-full"></div>
          <span className="uppercase text-[10px] font-bold text-gray-400 tracking-widest">
            Social
          </span>
          <div className="h-[1px] bg-gray-300/50 flex-1 rounded-full"></div>
        </div>

        <div className="flex gap-3 flex-wrap justify-center items-center">
          {profileData?.socialMedias?.github && (
            <SocialButton 
              href={profileData.socialMedias.github} 
              Icon={Github} 
              label="GitHub"
              hoverColorClass="hover:text-black hover:border-black/20"
            />
          )}
          {profileData?.socialMedias?.instagram && (
            <SocialButton 
              href={profileData.socialMedias.instagram} 
              Icon={Instagram} 
              label="Instagram"
              hoverColorClass="hover:text-pink-600 hover:border-pink-200"
            />
          )}
          {profileData?.socialMedias?.twitter && (
            <SocialButton 
              href={profileData.socialMedias.twitter} 
              Icon={Twitter} 
              label="Twitter"
              hoverColorClass="hover:text-sky-500 hover:border-sky-200"
            />
          )}
          {profileData?.socialMedias?.linkedin && (
            <SocialButton 
              href={profileData.socialMedias.linkedin} 
              Icon={Linkedin} 
              label="LinkedIn"
              hoverColorClass="hover:text-blue-600 hover:border-blue-200"
            />
          )}
          
          {/* Fallback visual aprimorado quando não há dados */}
          {!profileData?.socialMedias &&
            icones.slice(0, 3).map((Icon, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white/40 text-gray-400 border border-transparent">
                <Icon size={22} strokeWidth={1.5} />
              </div>
            ))}

          {/* Botão de Edição com a mesma animação base */}
          {canEdit && (
            <div className="transition-transform duration-300 hover:-translate-y-1">
              <EditSocialLinks socialMedias={profileData?.socialMedias} />
            </div>
          )}
        </div>
      </div>

      {/* Links Personalizados (Botões Grandes) */}
      <div className="flex flex-col gap-3 w-full mt-2">
        {[profileData?.link1, profileData?.link2, profileData?.link3].map(
          (link, index) =>
            link?.url && link.title ? (
              <Link
                key={index}
                href={formatUrl(link.url)}
                target="_blank"
                className="group w-full"
              >
                <button className="w-full bg-[#1e1e1e] hover:bg-black text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between transform hover:-translate-y-1">
                  <span className="truncate">{link.title}</span>
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
            ) : null
        )}
        
        {/* Aviso amigável se for dono e não tiver links */}
        {canEdit && 
         !profileData?.link1?.url && 
         !profileData?.link2?.url && 
         !profileData?.link3?.url && (
            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 text-sm">
                Edite seu perfil para adicionar links personalizados aqui.
            </div>
        )}
      </div>
    </div>
  );
}