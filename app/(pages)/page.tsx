
import FAQ from "../components/landing-page/faq";
import Footer from "../components/landing-page/footer";
import Header from "@/app/components/landing-page/header/header";
import Hero from "../components/landing-page/hero";
import Pricing from "../components/landing-page/pricing";
import VideoExplanation from "../components/landing-page/videoExplanation";
import { trackServerEvent } from "../lib/mixpanel";
import { Metadata } from "next";
import { getSEOTags } from "../lib/seo";
import UserCard from "../components/commons/user-card/userCard";
import { TotalVisits } from "../components/commons/totalVisits";
import ProjectCard from "../components/commons/projectCard";

export const metadata: Metadata = getSEOTags({
  appName: "Linkslie",
  appDescription:
    "Linkslie - Ajude seus seguidores a descobrir tudo o que você faz, com um simples link.",
  keywords: ["Linkslie", "projetos", "redes sociais", "link"],
  appDomain: "https://linkslie.com/",
  canonicalUrlRelative: "/",
});

export default function Home() {

  trackServerEvent("page_view", {
    page: "home",
  })

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <Header />
        <Hero 
          userCard={<UserCard />}
          totalVisits={<TotalVisits totalVisits={3470} isSubscribed={true}/>}
          projectCards={
            <ProjectCard
              isOwner={false}
              name="Avanço tecnológico"
              description="Descrição detalhada"
              img="/project1.png"
            />
          }
        />
        {/* <VideoExplanation /> */}
        <Pricing/>
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
