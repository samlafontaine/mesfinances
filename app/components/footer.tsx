import { Mail, LinkedinIcon, Twitter, Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <section>
      <footer className="mt-20">
        <div className="flex flex-row items-center justify-between">
          <div className="flex h-5 items-center space-x-2 text-sm">
            <p className="prose prose-neutral text-sm dark:text-white/80">
              2024
            </p>
            <Separator orientation="vertical" />
            <p className="prose prose-neutral text-sm dark:text-white/80">
              Mes Finances. Tous droits réservés.
            </p>
          </div>
          <div className="flex flex-row items-center">
            <a
              className="prose prose-neutral text-sm text-neutral-600 dark:text-white p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              href="mailto:sam@samlafontaine.com"
            >
              <Mail strokeWidth={1.25} className="h-4 w-4" />
            </a>
            <a
              className="prose prose-neutral text-sm text-neutral-600 dark:text-white p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              href="https://twitter.com/samlafontaine_"
            >
              <Twitter strokeWidth={1.25} className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
