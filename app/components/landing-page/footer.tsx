import React from "react";
import { Mail, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#2c2c2c] text-slate-300 py-16 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col justify-between h-full">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-12">
          <div className="text-sm font-medium text-slate-400">
            Links em todo lugar.
          </div>

          <div className="flex justify-center">
            {/* Lembre-se de trocar o src para a logo correta do Linkslie */}
            <img
              src="/logo.svg"
              alt="Logo Linkslie"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          </div>

          <nav>
            <ul className="flex items-center gap-6 text-sm font-medium">
              <li>
                <a href="#" className="hover:text-[#4200cd] transition-colors">
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#faq"
                  className="hover:text-[#4200cd] transition-colors"
                >
                  Dúvidas
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white max-w-4xl leading-tight">
            Sua presença digital,
            <span className="text-[#4200cd]">{` Conectada`}</span>
          </h2>

          <div className="flex items-center gap-4">
            <SocialButton
              icon={<Mail size={20} />}
              href="mailto:matheuspereiradasilv@gmail.com?subject=Contato%20Suporte%20Linkslie&body=Olá,%20gostaria%20de%20entrar%20em%20contato%20com%20o%20suporte."
            />
            <SocialButton
              icon={<Instagram size={20} />}
              href="https://www.instagram.com/uselinkslie/"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5 text-sm text-slate-500">
          <div className="text-center md:text-left">
            <p className="text-slate-500">
              &copy; {new Date().getFullYear()} Powered by{" "}
              <a
                href="https://instagram.com/sejafluxo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#27cdff] hover:text-[#006888] transition-colors text-white hover:underline"
              >
                Fluxo
              </a>{" "}
              —{" "}
              <a
                href="https://instagram.com/sejafluxo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#27cdff] hover:text-[#006888] transition-colors text-white hover:underline"
              >
                @sejafluxo
              </a>
            </p>

            {/* Links de Privacidade e Termos adicionados aqui */}
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
              <a
                href="/privacidade"
                className="hover:text-[#4200cd] transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="/termos"
                className="hover:text-[#4200cd] transition-colors"
              >
                Termos de Uso
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <a
              href="mailto:matheuspereiradasilv@gmail.com"
              className="hover:text-[#4200cd] transition-colors"
            >
              matheuspereiradasilv@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialButton: React.FC<{ icon: React.ReactNode; href: string }> = ({
  icon,
  href,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-white/5 rounded-full text-slate-300 hover:bg-white/10 hover:text-white hover:scale-110 transition-all duration-300 border border-white/5"
    >
      {icon}
    </a>
  );
};

export default Footer;
