import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <section>
      <footer className="mt-20">
        <div className="flex flex-row items-center justify-between">
          <div className="flex h-5 items-center space-x-2 text-sm">
            <p className="prose prose-neutral text-sm dark:text-white/80">
              {new Date().getFullYear()}
            </p>
            <Separator orientation="vertical" />
            <p className="prose prose-neutral text-sm dark:text-white/80">
              Mes Finances. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
