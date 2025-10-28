"use client";
import CeliVsReerDecision from "@/app/components/CeliVsReerDecision";

export default function Page() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="w-full flex flex-col items-center mb-4">
        <h1 className="text-2xl md:text-3xl tracking-tighter md:leading-snug font-semibold mb-2 text-center">
          CELI vs REER — arbre de décision
        </h1>
        <p className="prose prose-neutral dark:prose-invert text-center">
          Réponds aux questions pour obtenir une recommandation personnalisée.
        </p>
      </div>
      <CeliVsReerDecision />
    </div>
  );
}
