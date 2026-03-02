"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
  {
    title: "O que é o Linkslie e como ele funciona?",
    description:
      "O Linkslie é uma plataforma que permite criar portfólios profissionais e páginas de links de maneira rápida e simples. Com templates personalizáveis e uma interface intuitiva, você pode organizar e exibir seu trabalho de forma eficiente.",
  },
  {
    title: "A plataforma oferece algum teste gratuito?",
    description:
      "Sim! Você pode experimentar o Linkslie gratuitamente por 15 dias. Durante esse período, terá acesso a todas as funcionalidades para decidir se deseja continuar com a assinatura.",
  },
  {
    title: "Preciso ter conhecimento técnico para usar o Linkslie?",
    description:
      "Não, nenhum conhecimento técnico é necessário! A plataforma foi projetada para ser fácil de usar, permitindo que qualquer pessoa crie e personalize seu portfólio e links com facilidade.",
  },
  {
    title: "O que acontece se eu decidir cancelar minha assinatura?",
    description:
      "Você pode cancelar sua assinatura a qualquer momento. Seu portfólio e página de links permanecerão ativos até o final do período já pago, mas as funcionalidades premium serão desativadas após isso.",
  },
  {
    title: "Posso divulgar meu portfólio em plataformas sociais?",
    description:
      "Sim! Você pode compartilhar facilmente seu portfólio e página de links nas redes sociais, utilizando um link personalizado gerado pela plataforma.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className=" w-full max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Dúvidas <span className="text-[#4200cd]">frequentes</span>
        </h2>
        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
          Tudo o que você precisa saber sobre o Linkslie. Se tiver outras dúvidas, entre em contato com nosso suporte.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {faqItems.map((item, index) => (
          <FAQItem
            key={index}
            title={item.title}
            description={item.description}
            isOpen={openIndex === index}
            onClick={() => toggleItem(index)}
          />
        ))}
      </div>
    </section>
  );
}

function FAQItem({
  title,
  description,
  isOpen,
  onClick,
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`w-full overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? "border-[#4200cd] bg-white shadow-lg shadow-[#4200cd]/5"
          : "border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300"
      }`}
      initial={false}
      animate={{
        backgroundColor: isOpen ? "#ffffff" : "#f8fafc", 
      }}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 p-5 md:p-6 text-left focus:outline-none"
      >
        <span className={`font-bold text-lg transition-colors ${isOpen ? "text-[#4200cd]" : "text-slate-900"}`}>
          {title}
        </span>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isOpen ? "bg-[#4200cd]/10 text-[#4200cd]" : "bg-slate-200 text-slate-500"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-6 md:px-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 mt-2">
              {description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}