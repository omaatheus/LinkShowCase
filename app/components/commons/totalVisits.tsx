import { TrendingUp, LogOut, Lock } from "lucide-react";
import { manageAuth } from "@/app/actions/manage-auth";
import { auth } from "@/app/lib/auth";
import PortalButton from "./portal-buttons";

export async function TotalVisits({
  totalVisits = 0,
  showBar = false,
  isSubscribed
}: {
  totalVisits: number;
  showBar?: boolean;
  isSubscribed: boolean;
}) {
  const session = await auth();

  return (
    <div className="w-min whitespace-nowrap flex items-center gap-5 bg-background-primary/80 backdrop-blur-md border border-border-secondary px-5 py-3 rounded-full shadow-xl hover:shadow-2xl hover:border-accent-purple/20 transition-all duration-300">
      
      <div className="flex items-center gap-3">
        {/* Ícone com fundo decorativo */}
        <div className="p-2 bg-accent-purple/10 rounded-full text-accent-purple">
            <TrendingUp color="#4200cd" size={20} />
        </div>
      
        <div className="flex flex-col leading-tight">
          <span className="text-xs font-bold uppercase text-content-body/50 tracking-wide">
              Visitas Totais
          </span>
          {isSubscribed ? (
            <span className="text-xl font-bold text-content-heading">
                {totalVisits}
            </span>
          ) : (
            <span className="text-sm font-bold text-content-body/50 flex items-center gap-2 mt-1">
              <Lock size={16} className="text-gray-400" /> Apenas Pro
            </span>
          )}
        </div>
      </div>
      {showBar && (
        <div className="flex items-center gap-4 pl-5 border-l border-border-secondary/50">
          
          {session?.user.isSubscribed && <PortalButton />}
          
          <form action={manageAuth}>
            <button className="flex items-center gap-2 text-sm font-medium text-content-body hover:text-red-500 transition-colors group">
                <span className="hidden md:inline">Sair</span>
                <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}