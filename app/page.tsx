"use client";
import { useState } from "react";
import Thumbnail from "./components/thumbnail";
import { Newsletter } from "./components/newsletter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const tags = ["all", "Immobilier", "Finances personnelles"];

  const thumbnailData = [
    {
      link: "https://recurwise.com",
      title: "Gestion des abonnements",
      imageSrc: "/recurwise-logo.png",
      alt: "Recurwise",
      description:
        "Recurwise est une application qui te permet de suivre tes abonnements récurrents. Ajoute tes abonnements, classe les par catégorie, vois ton total et reçois des notifications avant que tes abonnements se renouvellent.",
      year: "2025",
      tag: "Finances personnelles",
      popular: true,
    },
    {
      link: "/outils/rqap",
      title: "Calculateur RQAP",
      imageSrc: "/RQAP.png",
      alt: "Calculateur RQAP",
      description:
        "Calculateur RQAP qui te permet de calculer tes prestations RQAP selon ton salaire et le régime choisi.",
      year: "2025",
      tag: "Finances personnelles",
    },
    {
      link: "/outils/frais-courtage",
      title: "Frais de courtage",
      imageSrc: "/frais-courtage.png",
      alt: "Frais de courtage",
      description:
        "Vois divers scénarios de frais de courtage en fonction du prix de vente estimé et du taux de courtage demandé. Tu y verras aussi le pourcentage du gain en capital que représente le montant des frais de courtage.",
      year: "2025",
      tag: "Immobilier",
    },
    {
      link: "/outils/interets-composes",
      title: "Intérêts composés",
      imageSrc: "/interets-composes.png",
      alt: "Intérêts composés",
      description:
        "Une calculatrice simple qui te permet de calculer et de visualiser la valeur future d'un investissement en fonction de la fréquence des contributions, du montant de celles-ci et du taux d'intérêt annuel anticipé.",
      year: "2025",
      tag: "Finances personnelles",
    },
    {
      link: "/outils/calculateur-accessibilite",
      title: "Accessibilité immobilière",
      imageSrc: "/accessibilite.png",
      alt: "Calculateur Accessibilité",
      description:
        "Ce calculateur t'aide à calculer le prix maximal d'une propriété que tu peux te permettre en fonction de la règle selon laquelle le prix d'une propriété ne doit pas dépasser 28% des revenus annuels bruts.",
      year: "2025",
      tag: "Immobilier",
    },
    {
      link: "/outils/calculateur-plex",
      title: "Calculateur Plex",
      imageSrc: "/calculateur-plex.png",
      alt: "Calculateur Plex",
      description:
        "Vous êtes-vous déjà demandé combien ça coûte, vraiment, un immeuble à revenus? Et quel serait le potentiel projeté de revenus et de profits? C'est ce que vous pouvez calculer et estimer facilement à l'aide de ce fichier.",
      year: "2024",
      tag: "Immobilier",
    },
    {
      link: "/outils/acheter-vs-louer",
      title: "Acheter vs. Louer",
      imageSrc: "/acheter-vs-louer.png",
      alt: "Calculateur Acheter vs. Louer",
      description:
        "La question à... plusieurs centaines de milliers de dollars. Qu'est-ce qui est plus rentable, financièrement parlant – acheter une propriété pour l'habiter, ou en louer une? C'est ce à quoi ce fichier Excel peut vous aider à répondre. ",
      year: "2024",
      tag: "Immobilier",
    },
    {
      link: "/outils/calculatrice-hypothecaire",
      title: "Calculatrice Hypothécaire",
      imageSrc: "/calculatrice-hypothecaire.png",
      alt: "Calculatrice hypothécaire",
      description:
        "Une calculatrice simple et agréable à utiliser qui t'aide à comprendre à quoi ressemble ton calendrier d'amortissement hypothécaire. Tu verras aussi combien, au total, tu auras payé d'intérêts à la fin de ton prêt.",
      year: "2024",
      tag: "Immobilier",
    },
  ];

  const filteredThumbnails =
    selectedTag === "all"
      ? thumbnailData
      : thumbnailData.filter((item) => item.tag === selectedTag);

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

      <div className="mb-8">
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag === "all" ? "Tous les outils" : tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filteredThumbnails.map((item, index) => (
          <Thumbnail key={index} {...item} />
        ))}
      </div>
      <Newsletter />
    </div>
  );
}
