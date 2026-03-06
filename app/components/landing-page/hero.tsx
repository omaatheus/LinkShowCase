"use client";
import { motion, Variants } from "framer-motion";
import CreateNow from "./ui/create-now";

export default function Hero({
  texts,
  userCard,
  totalVisits,
  projectCards,
}: {
  texts?: {
    title: string;
    description: string;
  };
  userCard: React.ReactNode;     
  totalVisits: React.ReactNode;  
  projectCards: React.ReactNode;  
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 overflow-hidden">
      
      <motion.div 
        className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
          {texts?.title || (
            <>
              Ajude seus seguidores a descobrir tudo o que você faz,{" "}
              <span className="text-[#4B2DBB]">com um simples link.</span>
            </>
          )}
        </motion.h1>
        
        <motion.h2 variants={itemVariants} className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
          {texts?.description || (
            <>
              Crie sua própria página de projetos e compartilhe eles com o mundo.
              <br className="hidden sm:block" /> Acompanhe o engajamento com Analytics detalhado.
            </>
          )}
        </motion.h2>
        
        <motion.div variants={itemVariants} className="mt-10 w-full flex justify-center lg:justify-start">
          <CreateNow />
        </motion.div>
      </motion.div>

      {/* Coluna da Direita */}
      <motion.div 
        className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        <div className="relative flex flex-col items-center w-full max-w-sm">
          
          <div className="relative w-full">
            <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
              {userCard} 
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-5 -right-2 md:-bottom-6 md:-right-6 z-10"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {totalVisits} 
            </motion.div>
          </div>

          <div className="w-full flex flex-col gap-3 md:gap-4 mt-10">
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              {projectCards} 
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}