import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { Navbar } from "./components/nav";
import { Footer } from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "./providers";

const font = Schibsted_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mesfinances.co"),
  title: {
    default:
      "Mes Finances - Outils, calculatrices et ressources pour finances personnelles",
    template: "%s | Mes Finances",
  },
  description:
    "Outils, calculatrices et ressources pour t'aider à prendre de meilleures décisions financières.",
  openGraph: {
    title: "Mes Fiances",
    description:
      "Outils, calculatrices et ressources pour t'aider à prendre de meilleures décisions financières.",
    url: "https://mesfinances.co",
    siteName: "Mes Finances",
    locale: "fr_CA",
    type: "website",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Mes Finances - Outils pour finances personnelles",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Mes Finances",
    card: "summary_large_image",
    images: ["/opengraph.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <body className="antialiased">
        <div className="max-w-4xl mb-4 md:mb-12 flex flex-col md:flex-row mx-4 md:mt-8 lg:mx-auto">
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Analytics />
            <SpeedInsights />
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
