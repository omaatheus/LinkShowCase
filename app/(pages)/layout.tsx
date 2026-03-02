import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

import { Red_Hat_Display } from "next/font/google";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const gaId: any = process.env.GAID

  return (
    <html lang="pt-br">
      <body
        className={`${redHatDisplay.className} bg-background-primary text-content-body antialiased min-h-screen flex flex-col`}>

          {children}

      </body>
      <GoogleAnalytics gaId={gaId} />
    </html>
  );
}
