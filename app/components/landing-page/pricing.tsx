import { signIn } from "@/app/lib/auth";
import Button from "./ui/button";
import { TRIAL_DAYS, MONTHLY_PRICE, ANNUALLY_PRICE } from "@/app/lib/config";
import { manageAuth } from "@/app/actions/manage-auth";

export default function Pricing() {
  return (
    <div className="my-[150px] flex flex-col items-center gap-14 px-4">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
        <h3 className="text-4xl font-bold text-black">
          Um valor acessível para todos
        </h3>
        <p className="text-content-body text-xl">
          Junte-se à comunidade de criadores profissionais que já estão elevando
          sua presença online. Comece com nosso plano{" "}
          <strong className="text-[#5000b9]">100% gratuito</strong> e evolua no
          seu ritmo!
        </p>
      </div>

      {/* Cards de Preço */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 lg:gap-8 w-full">
        {/* 1. Plano Gratuito */}
        <div className="w-full max-w-[304px] p-8 flex flex-col gap-7 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col text-left">
            <span className="text-black font-bold text-2xl">Gratuito</span>
            <span className="text-content-body">Para começar</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-black font-bold text-[48px]">R$0</span>
            <span className="text-content-headline text-xl">/mês</span>
          </div>
          <div className="mt-auto pt-4">
            <form action={manageAuth}>
              {" "}
              <Button className="w-full variant-outline">Começar Grátis</Button>
            </form>
          </div>
        </div>

        {/* 2. Plano PRO Mensal */}
        <div className="w-full max-w-[304px] p-8 flex flex-col gap-7 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col text-left">
            <span className="text-black font-bold text-2xl">PRO Mensal</span>
            <span className="text-content-body">Apenas</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-black font-bold text-[48px]">
              R${MONTHLY_PRICE}
            </span>
            <span className="text-content-headline text-xl">/mês</span>
          </div>
          <div className="mt-auto pt-4">
            <Button className="w-full">Assinar Mensal</Button>
          </div>
        </div>

        {/* 3. Plano PRO Anual (Recomendado) */}
        <div className="flex flex-col w-full max-w-[304px] hover:shadow-xl transition-shadow duration-300 rounded-2xl relative mt-4 lg:mt-0 lg:-translate-y-4">
          <div className="flex justify-center items-center rounded-t-2xl py-2 bg-[linear-gradient(90deg,#5000b9_0%,#7e038a_100%)]">
            <span className="uppercase text-white font-bold text-sm tracking-wider">
              Recomendado
            </span>
          </div>
          <div className="p-[2px] bg-[linear-gradient(90deg,#5000b9_0%,#7e038a_100%)] rounded-b-2xl flex-1 flex flex-col">
            <div className="w-full h-full bg-background-secondary p-8 flex flex-col gap-7 rounded-b-[14px] flex-1">
              <div className="flex flex-col text-left">
                <span className="text-black font-bold text-2xl">PRO Anual</span>
                <span className="text-content-body">Apenas</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-black font-bold text-[48px]">
                  R${ANNUALLY_PRICE}
                </span>
                <span className="text-content-headline text-xl">/ano</span>
              </div>
              <div className="mt-auto pt-4">
                <Button className="w-full bg-[#5000b9] text-white hover:bg-[#7e038a]">
                  Assinar Anual
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
