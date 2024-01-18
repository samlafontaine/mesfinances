import "../styles/globals.css";
import { Inter, Libre_Baskerville } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@prismicio/next";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr-ca"
      className={`${inter.className}`}
    >

      <body className="overflow-x-hidden antialiased">
        <main>
          {children}
          <Analytics />
          <SpeedInsights />
          <PrismicPreview repositoryName={repositoryName} />
        </main>
      </body>
    </html>
  );
}
