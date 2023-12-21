"use client";
import * as prismic from "@prismicio/client";
import Link from "next/link";

import { createClient } from "../../../prismicio";
import { Layout } from "../../../components/Layout";
import { Bounded } from "../../../components/Bounded";
import App from "./App";
import React from 'react';


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