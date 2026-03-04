import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function FooterFree() {
  return (

        <footer className="relative z-10 w-full py-8 mt-auto flex justify-center items-center">
          <Link
            href="/"
            target="_blank"
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-background-secondary/40 border border-border-secondary/50 backdrop-blur-md shadow-sm transition-all hover:bg-background-secondary hover:scale-105"
          >
            <Sparkles className="size-4 text-[#4200cd]" />
            <span className="text-sm font-medium text-content-body group-hover:text-content-heading transition-colors">
              Feito por <strong className="text-[#4200cd]">Linkslie</strong>, Link em todo Lugar
            </span>
          </Link>
        </footer>
  )}