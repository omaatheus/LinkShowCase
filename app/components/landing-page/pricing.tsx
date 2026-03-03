import Button from "./ui/button";
import { TRIAL_DAYS, MONTHLY_PRICE, ANNUALLY_PRICE, QUARTERLY_PRICE} from "@/app/lib/config";

export default function Pricing() {
  return (
    <div className="my-[150px] flex flex-col items-center gap-14 px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
        <h3 className="text-4xl font-bold text-black">
          Um valor acessível para todos
        </h3>
        <p className="text-content-body text-xl">
          Junte-se à comunidade de criadores profissionais que já estão elevando
          sua presença online. Teste gratuitamente por{" "}
          <strong className="text-[#5000b9]">{TRIAL_DAYS} dias</strong>, sem
          compromisso!
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-9 w-full">
        {/* Plano Mensal */}
        <div className="w-full max-w-[304px] p-8 flex flex-col gap-7 rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col text-left">
            <span className="text-black font-bold text-2xl">Mensal</span>
            <span className="text-content-body">Apenas</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-black font-bold text-[48px]">R${MONTHLY_PRICE}</span>
            <span className="text-content-headline text-xl">/mês</span>
          </div>
        </div>

        {/* Plano Trimestral 
        <div className="w-full max-w-[304px] p-8 flex flex-col gap-7 rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col text-left">
            <span className="text-black font-bold text-2xl">Trimestral</span>
            <span className="text-content-body">Apenas</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-black font-bold text-[48px]">R${QUARTERLY_PRICE}</span>
            <span className="text-content-headline text-xl">/trim</span>
          </div>
        </div>*/}

        {/* Plano Anual */}
        <div className="flex flex-col w-full max-w-[304px]">
          <div className="flex justify-center items-center rounded-t-2xl py-2 bg-[linear-gradient(90deg,#5000b9_0%,#7e038a_100%)]">
            <span className="uppercase text-white font-bold text-sm tracking-wider">Recomendado</span>
          </div>
          <div className="p-[2px] bg-[linear-gradient(90deg,#5000b9_0%,#7e038a_100%)] rounded-b-2xl flex-1">
            <div className="w-full h-full bg-background-secondary p-8 flex flex-col gap-7 rounded-b-[14px]">
              <div className="flex flex-col text-left">
                <span className="text-black font-bold text-2xl">Anual</span>
                <span className="text-content-body">Apenas</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-black font-bold text-[48px]">R${ANNUALLY_PRICE}</span>
                <span className="text-content-headline text-xl">/ano</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}