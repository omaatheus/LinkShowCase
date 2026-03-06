import ProjectCard from "@/app/components/commons/projectCard";
import { TotalVisits } from "@/app/components/commons/totalVisits";
import UserCard from "@/app/components/commons/user-card/userCard";
import FAQ from "@/app/components/landing-page/faq";
import Header from "@/app/components/landing-page/header";
import Hero from "@/app/components/landing-page/hero";
import Pricing from "@/app/components/landing-page/pricing";
import VideoExplanation from "@/app/components/landing-page/videoExplanation";
import { getTextBySlug } from "@/app/server/get-text-by-slug";
import { notFound } from "next/navigation";

import { Metadata } from "next";
import { getSEOTags } from "@/app/lib/seo"; 

type ParamsProps = {
  params: Promise<{ socialMediaSlug: string }>;
};

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const { socialMediaSlug } = await params;
  const texts = await getTextBySlug(socialMediaSlug);

  if (!texts) {
    return {};
  }

  
  const networkName = socialMediaSlug.replace("link-na-bio-para-", "");

  return getSEOTags({
    appName: texts.title,
    appDescription: texts.description,
    keywords: ["Linkslie", "link na bio", "link na bio para", networkName],
    appDomain: "https://linkslie.com",
    canonicalUrlRelative: `/recursos/${socialMediaSlug}`,
  });
}

export default async function LinkInBio({ params }: ParamsProps) {
  const { socialMediaSlug } = await params;
  const texts = await getTextBySlug(socialMediaSlug);

  if (!texts) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero 
        texts={texts}
        userCard={<UserCard />}
        totalVisits={<TotalVisits totalVisits={3470} isSubscribed={true} />}
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
      <Pricing />
      <FAQ />
    </div>
  );
}