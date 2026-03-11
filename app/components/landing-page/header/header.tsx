import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { getProfileId } from "@/app/server/get-profile-data";
import HeaderActions from "./header-actions";

export default async function Header() {
  const session = await auth();
  let profileId = null;
  if (session?.user?.id) {
    profileId = await getProfileId(session.user.id);
  }
  return (
    <header className="w-full bg-white border-b border-gray-100 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="/logo.svg" 
            alt="Linkslie Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain" 
          />
          <h3 className="text-black text-xl sm:text-2xl font-bold tracking-tight">
            Linkslie
          </h3>
        </Link>

        <HeaderActions isAuthenticated={!!session} profileId={profileId} />

      </div>
    </header>
  );
}