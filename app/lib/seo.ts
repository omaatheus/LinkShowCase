import { Metadata } from "next";

export function getSEOTags({
  appName,
  appDescription,
  keywords,
  appDomain,
  canonicalUrlRelative,
  extraTags,
  locale,
}: {
  appName: string;
  appDescription: string;
  keywords: string[];
  appDomain: string;
  canonicalUrlRelative: string;
  extraTags?: Metadata;
  locale?: string;
}): Metadata {
  return {
    title: appName,
    description: appDescription,
    keywords: keywords.join(", "),
    applicationName: appName,
    metadataBase: new URL(appDomain),

    openGraph: {
      title: appName,
      description: appDescription,
      url: appDomain,
      siteName: appName,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${appDomain}/og-image.png`, 
          width: 1200,
          height: 630,
          alt: `Preview do ${appName}`,
        },
      ],
    },

    twitter: {
      title: appName,
      description: appDescription,
      card: "summary_large_image",
      creator: "@oma_theuss",
      images: [`${appDomain}/og-image.png`],
    },

    alternates: {
      canonical: canonicalUrlRelative,
      languages: {
        pt: canonicalUrlRelative,
      },
    },

    ...extraTags,
  };
}