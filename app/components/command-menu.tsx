"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const tools = [
  {
    link: "/outils/calculateur-impot",
    title: "Calculateur d'impot",
    icon: "🧮",
    tag: "Finances personnelles",
  },
  {
    link: "/outils/fonds-urgence",
    title: "Fonds d'urgence",
    icon: "🛡️",
    tag: "Finances personnelles",
  },
  {
    link: "/outils/celi-vs-reer",
    title: "CELI vs REER",
    icon: "⚖️",
    tag: "Finances personnelles",
  },
  {
    link: "https://recurwise.com",
    title: "Gestion des abonnements",
    icon: "🔄",
    tag: "Finances personnelles",
  },
  {
    link: "/outils/rqap",
    title: "Calculateur RQAP",
    icon: "👶",
    tag: "Finances personnelles",
  },
  {
    link: "/outils/frais-courtage",
    title: "Frais de courtage",
    icon: "💼",
    tag: "Immobilier",
  },
  {
    link: "/outils/interets-composes",
    title: "Interets composes",
    icon: "📈",
    tag: "Finances personnelles",
  },
  {
    link: "/outils/calculateur-accessibilite",
    title: "Accessibilite immobiliere",
    icon: "🏠",
    tag: "Immobilier",
  },
  {
    link: "/outils/calculateur-plex",
    title: "Calculateur Plex",
    icon: "🏢",
    tag: "Immobilier",
  },
  {
    link: "/outils/acheter-vs-louer",
    title: "Acheter vs. Louer",
    icon: "🤔",
    tag: "Immobilier",
  },
  {
    link: "/outils/calculatrice-hypothecaire",
    title: "Calculatrice Hypothecaire",
    icon: "🏦",
    tag: "Immobilier",
  },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (link: string) => {
    setOpen(false);
    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      router.push(link);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Rechercher un outil..." />
      <CommandList>
        <CommandEmpty>Aucun resultat.</CommandEmpty>
        <CommandGroup heading="Outils">
          {tools.map((tool) => (
            <CommandItem
              key={tool.link}
              value={tool.title}
              onSelect={() => runCommand(tool.link)}
            >
              <span className="mr-2">{tool.icon}</span>
              {tool.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
