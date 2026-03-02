import Footer from '@/app/components/landing-page/footer';
import Header from '@/app/components/landing-page/header';
import React from 'react';

export default function PrivacyPolicyPage() {
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
              <a href="#introducao" className="hover:text-[#4200cd] transition-colors">Introdução</a>
              <a href="#o-que-fazemos" className="hover:text-[#4200cd] transition-colors">O que o Linkslie faz?</a>
              <a href="#dados-coletados" className="hover:text-[#4200cd] transition-colors">Informações que coletamos</a>
              <a href="#como-utilizamos" className="hover:text-[#4200cd] transition-colors">Como utilizamos as informações</a>
              <a href="#compartilhamento" className="hover:text-[#4200cd] transition-colors">Compartilhamento de dados</a>
              <a href="#seus-direitos" className="hover:text-[#4200cd] transition-colors">Seus Direitos (LGPD e Globais)</a>
              <a href="#contato" className="hover:text-[#4200cd] transition-colors">Contato</a>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="md:w-3/4 bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
          <header className="mb-10 border-b pb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Aviso de Privacidade do Linkslie
            </h1>
            <p className="text-sm text-gray-500">
              Data de entrada em vigor: <span className="font-semibold text-gray-700">{lastUpdated}</span>
            </p>
          </header>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            
            <section id="introducao">
              <p>
                No <strong>Linkslie</strong>, temos o compromisso de sermos transparentes sobre como coletamos, usamos e protegemos suas informações pessoais. Este Aviso de Privacidade explica nossas práticas de dados e descreve seus direitos em relação às suas informações. Recomendamos a leitura integral para entender como lidamos com seus dados.
              </p>
            </section>

            <section id="o-que-fazemos">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">O que o Linkslie faz?</h2>
              <p>
                O Linkslie é a sua plataforma central para compartilhar seus links, redes sociais, portfólios, vídeos e outros conteúdos. Nossa plataforma ajuda você a se conectar e interagir com seu público, tornando seu conteúdo mais fácil de encontrar e gerenciar. Este Aviso aplica-se aos nossos websites e serviços relacionados (coletivamente denominados "Plataforma" ou "Serviços Linkslie").
              </p>
            </section>

            <section id="dados-coletados">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Informações que coletamos</h2>
              <p className="mb-4">As informações pessoais que podemos coletar se enquadram nas seguintes categorias:</p>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">1. Informações da Conta (Autenticação via Google)</h3>
                  <p className="text-sm mt-2">
                    Para garantir sua segurança e facilitar o acesso, o Linkslie utiliza exclusivamente a autenticação via <strong>Conta do Google (Google Auth)</strong>. Ao se cadastrar ou fazer login, solicitamos apenas o acesso estritamente necessário:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                    <li><strong>Seu endereço de e-mail principal:</strong> Usado para criar sua conta e para comunicações essenciais.</li>
                    <li><strong>Suas informações de perfil público:</strong> Como seu nome e foto de perfil, para personalizar sua página no Linkslie.</li>
                  </ul>
                  <p className="text-sm font-medium text-blue-700 mt-2 bg-blue-50 p-2 rounded">
                    Importante: Nós não solicitamos, não temos acesso e não armazenamos a sua senha. Toda a verificação de segurança é feita diretamente pelo Google.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">2. Informações que coletamos automaticamente</h3>
                  <p className="text-sm mt-1">
                    Ao usar o Linkslie, coletamos dados básicos do seu dispositivo, como endereço IP, tipo de navegador e dados de análise de uso (páginas acessadas e links clicados). Isso nos ajuda a manter a plataforma segura e a fornecer estatísticas de cliques para o seu perfil.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">3. Outras informações fornecidas por você</h3>
                  <p className="text-sm mt-1">
                    Links de redes sociais, descrições e outros conteúdos que você decide voluntariamente adicionar ao seu perfil público do Linkslie.
                  </p>
                </div>
              </div>
            </section>

            <section id="como-utilizamos">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Como utilizamos as informações que coletamos</h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#4200cd]">
                <li><strong>Para fornecer os Serviços:</strong> Criar e manter sua conta usando seu perfil do Google e prestar suporte técnico.</li>
                <li><strong>Para melhorar a Plataforma:</strong> Fornecer análises de acessos aos seus links e otimizar a experiência de uso.</li>
                <li><strong>Para garantir a segurança:</strong> Detectar fraudes, contas falsas e garantir o cumprimento de nossos Termos de Serviço.</li>
                <li><strong>Para obrigações legais:</strong> Cumprir leis aplicáveis e responder a solicitações de autoridades competentes.</li>
              </ul>
            </section>

            <section id="compartilhamento">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Como e quando compartilhamos informações</h2>
              <p className="mb-4">
                Os perfis de usuário no Linkslie são publicamente acessíveis por padrão. Fora o que você escolhe tornar público no seu perfil, podemos compartilhar seus dados de sistema com:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#4200cd]">
                <li><strong>Prestadores de Serviços:</strong> Empresas de hospedagem em nuvem e ferramentas de análise estatística que nos ajudam a operar o site.</li>
                <li><strong>Autoridades Legais:</strong> Somente quando estritamente exigido por lei ou para proteger os direitos e a segurança da nossa comunidade.</li>
              </ul>
            </section>

            <section id="seus-direitos">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quais são os seus direitos?</h2>
              <p className="mb-4">
                Em conformidade com as legislações de proteção de dados (como a LGPD no Brasil), você possui o direito de:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#4200cd] mb-4">
                <li>Acessar, corrigir, atualizar ou solicitar a exclusão de suas informações pessoais da nossa base de dados.</li>
                <li>Revogar o acesso do Linkslie à sua Conta do Google a qualquer momento diretamente pelas configurações de segurança do próprio Google.</li>
                <li>Opor-se ou restringir a forma como processamos seus dados.</li>
              </ul>
              <p>
                Para exercer a exclusão da sua conta e dados do Linkslie, entre em contato através do nosso e-mail oficial listado abaixo.
              </p>
            </section>

            <section id="contato" className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
              <h2 className="text-xl font-bold text-blue-900 mb-2">Fale Conosco</h2>
              <p className="text-blue-800 text-sm mb-4">
                Se você tiver alguma dúvida sobre este Aviso de Privacidade, as práticas do Linkslie, ou se desejar exercer seus direitos sobre seus dados, entre em contato:
              </p>
              <p className="text-blue-900 font-medium">
                Email: <a href="mailto:matheuspereiradasilv@gmail.com" className="underline hover:text-[#4200cd]">matheuspereiradasilv@gmail</a>
              </p>
            </section>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}