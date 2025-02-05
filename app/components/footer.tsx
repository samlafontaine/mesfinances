import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function Footer() {
  return (
    <section>
      <footer className="mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex h-5 items-center space-x-2 text-sm">
            <p className="prose prose-neutral text-sm dark:text-white/80">
              {new Date().getFullYear()}
            </p>
            <Separator orientation="vertical" />
            <p className="prose prose-neutral text-sm dark:text-white/80">
              Mes Finances. Tous droits réservés.
            </p>
          </div>
          <div>
            <Link
              href="https://buymeacoffee.com/mesfinances"
              className="prose prose-neutral text-sm dark:text-white/80 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Soutiens le projet
            </Link>
          </div>
        </div>
      </footer>
    </section>
  );
}
