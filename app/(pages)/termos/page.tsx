import { Footer } from '@/app/components/landing-page/footer';
import Header from '@/app/components/landing-page/header';
import React from 'react';

export default function TermsOfServicePage() {
  const lastUpdated = "10 de março de 2026"; // Atualize conforme necessário

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar Navigation - UX Amigável para textos longos */}
        <aside className="md:w-1/4 flex-shrink-0">
          <div className="sticky top-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Nesta página</h3>
            <nav className="flex flex-col space-y-3 text-sm font-medium text-gray-600">
              <a href="#bem-vindo" className="hover:text-[#4200cd] transition-colors">1. Bem-vindo ao Linkslie!</a>
              <a href="#sua-conta" className="hover:text-[#4200cd] transition-colors">2. Sua Conta e Acesso</a>
              <a href="#nome-usuario" className="hover:text-[#4200cd] transition-colors">3. Seu Nome de Usuário</a>
              <a href="#seu-conteudo" className="hover:text-[#4200cd] transition-colors">4. Seu Conteúdo e Direitos</a>
              <a href="#regras-uso" className="hover:text-[#4200cd] transition-colors">5. Regras e Condutas</a>
              <a href="#suspensao" className="hover:text-[#4200cd] transition-colors">6. Suspensão ou Encerramento</a>
              <a href="#isencoes" className="hover:text-[#4200cd] transition-colors">7. Isenções de Responsabilidade</a>
              <a href="#contato" className="hover:text-[#4200cd] transition-colors">8. Contato</a>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="md:w-3/4 bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
          <header className="mb-10 border-b pb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Termos e Condições de Uso
            </h1>
            <p className="text-sm text-gray-500">
              Data de entrada em vigor: <span className="font-semibold text-gray-700">{lastUpdated}</span>
            </p>
          </header>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            
            <section id="bem-vindo">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Bem-vindo(a) ao Linkslie!</h2>
              <p className="mb-4">
                É ótimo ter você aqui. Estes Termos e Condições ("Termos") regem o seu uso da plataforma Linkslie e de todos os serviços relacionados. Um dos nossos principais valores é buscar a simplicidade intencional, por isso, condensamos nossos termos na forma mais acessível possível.
              </p>
              <p>
                Ao criar uma conta ou usar o Linkslie, você concorda com estes Termos. Se você não concordar com alguma cláusula, pedimos que não utilize nossa plataforma. Periodicamente, podemos fazer alterações nestes Termos para refletir atualizações comerciais ou legais, e o uso contínuo da plataforma significará sua aceitação.
              </p>
            </section>

            <section id="sua-conta">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Sua Conta e Acesso (Google Auth)</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <p className="mb-3">
                  Para utilizar o Linkslie, você confirma que tem <strong>mais de 18 anos</strong> e capacidade legal para aceitar estes Termos.
                </p>
                <p className="mb-3">
                  <strong>Autenticação Simplificada:</strong> O acesso ao Linkslie é feito exclusivamente através da sua Conta do Google (Google Auth). Nós não criamos, não solicitamos e não armazenamos senhas próprias.
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#4200cd]">
                  <li>Você é inteiramente responsável por manter a segurança da sua Conta do Google.</li>
                  <li>Se você suspeitar que sua Conta do Google foi comprometida, você deve alterar sua senha diretamente no Google imediatamente.</li>
                  <li>Você não deve usar (ou permitir que outra pessoa use) a plataforma de forma que cause danos ao Linkslie ou infrinja leis e direitos de terceiros.</li>
                </ul>
              </div>
            </section>

            <section id="nome-usuario">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Seu Nome de Usuário</h2>
              <p className="mb-4">
                Ao criar sua página no Linkslie, você escolherá um nome de usuário/URL. Ele deve ser apropriado e respeitar os direitos de todos.
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#4200cd]">
                <li>Você não pode usar o nome de outra pessoa, celebridade ou marca registrada (direitos de propriedade intelectual).</li>
                <li>É proibida a prática de <em>Domain Squatting</em> (registrar nomes populares apenas para lucrar com eles ou impedir que os verdadeiros donos usem).</li>
                <li>Podemos, a nosso critério, reatribuir ou solicitar a alteração de nomes de usuário inativos por mais de 6 meses ou que infrinjam estas regras.</li>
              </ul>
            </section>

            <section id="seu-conteudo">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Seu Conteúdo e Nossos Direitos</h2>
              <p className="mb-4">
                Você é o único responsável pelos links, textos, imagens e vídeos ("Conteúdo") que adiciona ao seu perfil do Linkslie.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="border border-gray-200 p-5 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Suas Garantias</h3>
                  <p className="text-sm">Você garante que possui os direitos sobre o conteúdo que publica e que ele não viola leis de direitos autorais, não é fraudulento, enganoso ou contém vírus.</p>
                </div>
                <div className="border border-gray-200 p-5 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Nossa Licença</h3>
                  <p className="text-sm">Ao publicar, você nos concede uma licença mundial e isenta de royalties para hospedar, exibir e usar publicamente seu conteúdo na plataforma e em ações de marketing do Linkslie.</p>
                </div>
              </div>
            </section>

            <section id="regras-uso">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Regras e Padrões da Comunidade</h2>
              <p className="mb-4">Queremos que o Linkslie seja um ambiente seguro para todos os visitantes. Portanto, é estritamente proibido:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#4200cd]">
                <li>Publicar conteúdos ilegais, que promovam ódio, assédio, violência ou exploração de menores.</li>
                <li>Usar ferramentas automatizadas (bots, scripts, scrapers) para coletar dados da plataforma.</li>
                <li>Compartilhar informações pessoais sensíveis (documentos, dados financeiros) de terceiros sem consentimento explícito.</li>
                <li>Mascarar links maliciosos que levem a phishing, malware ou golpes.</li>
              </ul>
              <p className="mt-4 text-sm bg-yellow-50 text-yellow-800 p-3 rounded border border-yellow-200">
                O Linkslie não tem a obrigação de monitorar ativamente todos os perfis, mas nos reservamos o direito de remover ou restringir o acesso a qualquer conteúdo que consideremos inadequado ou que viole estas regras.
              </p>
            </section>

            <section id="suspensao">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Suspensão ou Encerramento da Conta</h2>
              <p className="mb-4">
                Se você não seguir estes Termos, temos o direito de suspender ou encerrar permanentemente sua conta a qualquer momento.
              </p>
              <p>
                Você também pode encerrar sua conta quando desejar. Ao fazer isso, não nos responsabilizamos por qualquer conteúdo ou link perdido. Para solicitar a exclusão total da conta e dos dados, basta nos enviar um e-mail através do contato oficial.
              </p>
            </section>

            <section id="isencoes">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Isenções e Limitação de Responsabilidade</h2>
              <p className="mb-4">
                <strong>O uso do Linkslie é por sua própria conta e risco.</strong> A plataforma é fornecida "NO ESTADO EM QUE SE ENCONTRA" (<em>As Is</em>) e "CONFORME DISPONÍVEL". Não oferecemos garantias de que a plataforma estará livre de interrupções, erros ou bugs.
              </p>
              <p className="mb-4">
                <strong>Serviços e Links de Terceiros:</strong> O Linkslie permite que você se conecte a outras plataformas (YouTube, Instagram, lojas online, etc). Não somos responsáveis pelo conteúdo, termos ou práticas de privacidade desses sites de terceiros.
              </p>
              <p>
                Em nenhuma circunstância o Linkslie, seus diretores ou funcionários serão responsáveis por lucros cessantes, perda de dados ou danos indiretos resultantes do seu uso da plataforma. Nossa responsabilidade máxima será limitada ao valor que você eventualmente tenha pago à plataforma nos últimos 12 meses.
              </p>
            </section>

            <section id="contato" className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
              <h2 className="text-xl font-bold text-blue-900 mb-2">8. Contato e Resolução de Disputas</h2>
              <p className="text-blue-800 text-sm mb-4">
                Se você tiver alguma dúvida sobre estes Termos, ou se sua conta foi suspensa e você deseja recorrer, entre em contato com nossa equipe. Estamos empenhados em tentar resolver qualquer problema de forma amigável antes de qualquer ação legal.
              </p>
              <p className="text-blue-900 font-medium">
                Email de Suporte e Jurídico: <a href="mailto:suportelinkslie@gmail.com" className="underline hover:text-[#4200cd]">suportelinkslie@gmail.com</a>
              </p>
            </section>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}