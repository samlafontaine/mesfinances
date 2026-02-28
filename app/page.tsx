"use client";
import { useEffect, useState } from "react";
import Thumbnail from "./components/thumbnail";
import { Newsletter } from "./components/newsletter";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/views")
      .then((res) => res.json())
      .then((data) => setViewCounts(data))
      .catch(() => {});
  }, []);

  const tags = ["Finances personnelles", "Immobilier"];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  const thumbnailData = [
    {
      link: "/outils/calculateur-impot",
      title: "Calculateur d'impôt",
      icon: "🧮",
      description: "Estime tes impôts provinciaux et fédéraux pour 2025.",
      tag: "Finances personnelles",
    },
    {
      link: "/outils/fonds-urgence",
      title: "Fonds d'urgence",
      icon: "🛡️",
      description: "Calcule le montant idéal de ton fonds d'urgence.",
      tag: "Finances personnelles",
    },
    {
      link: "/outils/celi-vs-reer",
      title: "CELI vs REER",
      icon: "⚖️",
      description: "Découvre si tu devrais cotiser à ton CELI ou ton REER.",
      tag: "Finances personnelles",
    },
    {
      link: "https://recurwise.com",
      title: "Gestion des abonnements",
      icon: "🔄",
      description: "Suis et gère tes abonnements récurrents.",
      tag: "Finances personnelles",
    },
    {
      link: "/outils/rqap",
      title: "Calculateur RQAP",
      icon: "👶",
      description: "Calcule tes prestations RQAP selon ton salaire.",
      tag: "Finances personnelles",
    },
    {
      link: "/outils/frais-courtage",
      title: "Frais de courtage",
      icon: "💼",
      description: "Estime les frais de courtage selon le prix de vente.",
      tag: "Immobilier",
    },
    {
      link: "/outils/interets-composes",
      title: "Intérêts composés",
      icon: "📈",
      description: "Visualise la croissance de tes investissements.",
      tag: "Finances personnelles",
    },
    {
      link: "/outils/calculateur-accessibilite",
      title: "Accessibilité immobilière",
      icon: "🏠",
      description: "Calcule le prix max d'une propriété que tu peux te permettre.",
      tag: "Immobilier",
    },
    {
      link: "/outils/calculateur-plex",
      title: "Calculateur Plex",
      icon: "🏢",
      description: "Estime les revenus et profits d'un immeuble à revenus.",
      tag: "Immobilier",
    },
    {
      link: "/outils/acheter-vs-louer",
      title: "Acheter vs. Louer",
      icon: "🤔",
      description: "Compare la rentabilité d'acheter vs louer.",
      tag: "Immobilier",
    },
    {
      link: "/outils/calculatrice-hypothecaire",
      title: "Calculatrice Hypothécaire",
      icon: "🏦",
      description: "Comprends ton calendrier d'amortissement hypothécaire.",
      tag: "Immobilier",
    },
  ];

  const filteredThumbnails = thumbnailData
    .filter((item) => selectedTags.size === 0 || selectedTags.has(item.tag))
    .filter((item) =>
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="slide-up text-center">
      <div className="space-y-3 md:space-y-0.5 mb-12 md:mb-20">
        <h1 className="text-4xl md:text-5xl tracking-tighter md:leading-snug font-semibold">
          Prends tes finances 💸 en main ✋
        </h1>
        <p className="md:text-xl text-black/80">
          Calculatrices, outils et ressources pour t'aider à prendre de
          meilleures décisions financières.
        </p>
      </div>

      <div className="hidden md:flex flex-wrap justify-center gap-2 mb-8">
        {tags.map((tag) => {
          const active = selectedTags.has(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                active
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white"
                  : "bg-transparent text-zinc-600 border-zinc-300 hover:border-zinc-500 dark:text-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="md:hidden mb-6 relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/></svg>
        <Input
          type="search"
          placeholder="Rechercher un outil..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-left"
        />
      </div>

      <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800/50">
        {filteredThumbnails.map((item, index) => (
          <Thumbnail key={index} {...item} views={viewCounts[item.link] || 0} />
        ))}
      </div>
      <Newsletter />
    </div>
  );
}
