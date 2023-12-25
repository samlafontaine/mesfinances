
import * as prismic from "@prismicio/client";
import Link from "next/link";

import { createClient } from "../../../prismicio";
import { Layout } from "../../../components/Layout";
import { Bounded } from "../../../components/Bounded";
import App from "./App";
import React from 'react';

export const metadata = {
  title: 'Calculatrice Hypothécaire | Mes Finances',
  description: "Voyez combien d'intérêts et de capital vous remboursez à chaque mois. Cette calculatrice est basée sur un taux d'intérêt annuel et des remboursements mensuels.",
  openGraph: {
    title: 'Calculatrice Hypothécaire | Mes Finances',
    description: "Voyez combien d'intérêts et de capital vous remboursez à chaque mois. Cette calculatrice est basée sur un taux d'intérêt annuel et des remboursements mensuels.",
    url: 'https://nextjs.org',
    siteName: 'Mesfinances.co',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function Page() {
  const client = createClient();
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
      withProfile={false}
    >
      <Bounded size="widest">
      <Link href="/tools" className="font-sans tracking-tight text-slate-500">
          &larr; Voir les autres outils
        </Link>
      <App />
      </Bounded>
    </Layout>
  );
}