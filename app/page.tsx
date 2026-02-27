"use client";
import { useEffect, useState } from "react";
import Thumbnail from "./components/thumbnail";
import { Newsletter } from "./components/newsletter";

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

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

  const filteredThumbnails =
    selectedTags.size === 0
      ? thumbnailData
      : thumbnailData.filter((item) => selectedTags.has(item.tag));

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

      <div className="flex flex-wrap justify-center gap-2 mb-8">
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

      <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800/50">
        {filteredThumbnails.map((item, index) => (
          <Thumbnail key={index} {...item} views={viewCounts[item.link] || 0} />
        ))}
      </div>
      <Newsletter />
    </div>
  );
}
