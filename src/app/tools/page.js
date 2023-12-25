import * as prismic from "@prismicio/client";
import Link from "next/link";

import { createClient } from "../../prismicio";
import { Layout } from "../../components/Layout";
import { Bounded } from "../../components/Bounded";
import { Article } from "../../components/Article";


export default async function Page() {
  const client = createClient();
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return (
    <>
      <title>Outils financiers | Mes Finances</title>
      <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
      withProfile={false}
    >
      <Bounded size="widest">
      <h1 className="mb-3 text-3xl font-sans font-semibold tracking-tighter text-slate-800 md:text-4xl">Outils</h1>
        <ul className="grid grid-cols-1 gap-16">
        <Link href="/tools/calculatrice-hypotheque" className="font-sans tracking-tight text-slate-500">
          &rarr; Calculatrice Hypothécaire
        </Link>
        </ul>
      </Bounded>
    </Layout>
    </>
    
  );
}