"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, CheckCircle2, ArrowRight } from "lucide-react";

// --- Types ---
type Answer = string | number | null;

interface Step {
  id: string;
  question: string;
  hint?: string;
  type: "choice" | "income";
  choices?: { label: string; value: string; description?: string }[];
}

interface Recommendation {
  winner: "CELI" | "REER" | "DETTE" | "URGENCE" | "LES DEUX";
  title: string;
  detail: string;
  color: string;
  bg: string;
}

// --- Arbre de décision ---
// Retourne l'ID de la prochaine étape ou null si on a une recommandation
function getNextStep(answers: Record<string, Answer>): string | null {
  if (answers["employer"] === undefined) return "employer";
  if (answers["employer"] === "yes") return null; // → recommandation immédiate

  if (answers["debt"] === undefined) return "debt";
  if (answers["debt"] === "high") return null; // → rembourse
  if (answers["debt"] === "low" || answers["debt"] === "no") {
    if (answers["emergency"] === undefined) return "emergency";
    if (answers["emergency"] === "no") return null; // → fonds d'urgence
    if (answers["emergency"] === "yes") {
      if (answers["income"] === undefined) return "income";
      const income = Number(answers["income"]);
      if (!income) return "income";
      if (income < 50000) return null; // → CELI
      if (income >= 100000) return null; // → REER
      // revenu intermédiaire
      if (answers["future"] === undefined) return "future";
      return null; // → recommandation basée sur future
    }
  }
  return null;
}

function getRecommendation(answers: Record<string, Answer>): Recommendation | null {
  if (answers["employer"] === "yes") {
    return {
      winner: "REER",
      title: "Cotise au REER jusqu'à la contrepartie employeur",
      detail:
        "La contrepartie de ton employeur est de l'argent gratuit — c'est le meilleur rendement garanti qui existe. Commence par maximiser cet avantage avant tout autre investissement.",
      color: "text-blue-700 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    };
  }

  if (answers["debt"] === "high") {
    return {
      winner: "DETTE",
      title: "Rembourse tes dettes à taux élevé d'abord",
      detail:
        "Les intérêts de carte de crédit (20 %+) dépassent largement les rendements boursiers espérés. Rembourse ces dettes avant d'investir — c'est mathématiquement plus avantageux.",
      color: "text-red-700 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
    };
  }

  if (answers["emergency"] === "no") {
    return {
      winner: "URGENCE",
      title: "Constitue un fonds d'urgence",
      detail:
        "3 à 6 mois de dépenses dans un compte CELI à intérêt élevé. C'est la base de toute bonne santé financière — sans filet de sécurité, le moindre imprévu peut forcer une vente à perte.",
      color: "text-orange-700 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
    };
  }

  const income = Number(answers["income"]);

  if (income < 50000) {
    return {
      winner: "CELI",
      title: "Priorise le CELI",
      detail:
        "À revenu plus faible, la tranche d'imposition marginale est peu élevée — la déduction REER vaut moins. Le CELI offre la même croissance à l'abri de l'impôt, avec plus de flexibilité (les retraits ne réduisent pas les prestations gouvernementales).",
      color: "text-green-700 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    };
  }

  if (income >= 100000) {
    return {
      winner: "REER",
      title: "Priorise le REER",
      detail:
        "À revenu élevé, la déduction REER te fait économiser de l'impôt à ta tranche marginale la plus haute (souvent 47 %+ au Québec). C'est un avantage fiscal puissant. Complète ensuite avec le CELI.",
      color: "text-blue-700 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    };
  }

  // Revenu intermédiaire (50k–100k)
  if (answers["future"] === "yes") {
    return {
      winner: "CELI",
      title: "Priorise le CELI pour l'instant",
      detail:
        "Si ton revenu va augmenter, garde ton espace REER pour plus tard — la déduction vaudra davantage quand tu seras dans une tranche d'imposition plus élevée. Utilise le CELI maintenant.",
      color: "text-green-700 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    };
  }

  if (answers["future"] === "no") {
    return {
      winner: "LES DEUX",
      title: "REER en priorité, puis CELI",
      detail:
        "À revenu intermédiaire stable, le REER est généralement avantageux pour l'économie d'impôt immédiate. Après avoir cotisé au REER, place le remboursement d'impôt dans ton CELI.",
      color: "text-purple-700 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
    };
  }

  return null;
}

const STEPS: Record<string, Step> = {
  employer: {
    id: "employer",
    question: "Ton employeur offre-t-il une contrepartie REER?",
    hint: "Ex. : ton employeur cotise 50 % de ce que tu mets, jusqu'à 3 % de ton salaire.",
    type: "choice",
    choices: [
      { label: "Oui", value: "yes", description: "Mon employeur égale ou contribue à mes cotisations REER" },
      { label: "Non", value: "no", description: "Je n'ai pas cet avantage" },
    ],
  },
  debt: {
    id: "debt",
    question: "As-tu des dettes?",
    hint: "Ne compte pas l'hypothèque si le taux est inférieur à ~5 %.",
    type: "choice",
    choices: [
      { label: "Oui — taux élevé", value: "high", description: "Cartes de crédit, marges à 10 %+, prêts personnels" },
      { label: "Oui — taux faible", value: "low", description: "Hypothèque, prêt auto à faible taux" },
      { label: "Non", value: "no", description: "Je suis libre de dettes" },
    ],
  },
  emergency: {
    id: "emergency",
    question: "As-tu un fonds d'urgence?",
    hint: "L'objectif : 3 à 6 mois de dépenses essentielles dans un compte facilement accessible.",
    type: "choice",
    choices: [
      { label: "Oui", value: "yes", description: "J'ai au moins 3 mois de dépenses de côté" },
      { label: "Non", value: "no", description: "Je n'ai pas encore de coussin financier" },
    ],
  },
  income: {
    id: "income",
    question: "Quel est ton revenu annuel imposable approximatif?",
    hint: "Regarde la case 26000 de ton T4, ou ton revenu d'emploi avant déductions.",
    type: "income",
  },
  future: {
    id: "future",
    question: "Penses-tu gagner significativement plus dans les 3 à 5 prochaines années?",
    hint: "Une promotion, un changement de carrière, la fin d'études — tout ce qui pourrait hausser ta tranche d'imposition.",
    type: "choice",
    choices: [
      { label: "Oui", value: "yes", description: "Mon revenu devrait augmenter pas mal" },
      { label: "Non", value: "no", description: "Mon revenu restera assez stable" },
    ],
  },
};

const STEP_ORDER = ["employer", "debt", "emergency", "income", "future"];

// --- Composant ---
export default function CeliVsReerDecision() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [incomeInput, setIncomeInput] = useState<string>("");

  const currentStepId = getNextStep(answers);
  const currentStep = currentStepId ? STEPS[currentStepId] : null;
  const recommendation = !currentStepId ? getRecommendation(answers) : null;

  const completedStepIds = STEP_ORDER.filter(
    (id) => answers[id] !== undefined && id !== currentStepId
  );
  const progressPct = currentStepId
    ? (completedStepIds.length / STEP_ORDER.length) * 100
    : 100;

  const handleChoice = (stepId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
  };

  const handleIncome = () => {
    const val = Number(incomeInput.replace(/\s/g, "").replace(",", "."));
    if (val > 0) {
      setAnswers((prev) => ({ ...prev, income: val }));
      setIncomeInput("");
    }
  };

  const goBack = () => {
    // Remove the last answered step
    const lastAnswered = [...completedStepIds].reverse()[0];
    if (lastAnswered) {
      setAnswers((prev) => {
        const next = { ...prev };
        delete next[lastAnswered];
        // also clear anything after it
        const idx = STEP_ORDER.indexOf(lastAnswered);
        STEP_ORDER.slice(idx + 1).forEach((id) => delete next[id]);
        return next;
      });
    }
  };

  const reset = () => {
    setAnswers({});
    setIncomeInput("");
  };

  const getLabelForAnswer = (stepId: string, value: Answer) => {
    if (stepId === "income") return `${Number(value).toLocaleString("fr-CA")} $`;
    const step = STEPS[stepId];
    if (step?.type === "choice") {
      return step.choices?.find((c) => c.value === value)?.label ?? String(value);
    }
    return String(value);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Answered steps recap */}
      {completedStepIds.length > 0 && (
        <div className="space-y-1">
          {completedStepIds.map((id) => (
            <div
              key={id}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle2 size={14} className="text-primary shrink-0" />
              <span>{STEPS[id].question}</span>
              <span className="ml-auto font-medium text-foreground">
                {getLabelForAnswer(id, answers[id])}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Current question */}
      {currentStep && (
        <Card className="p-5 space-y-4">
          <div className="space-y-1">
            <p className="font-semibold text-lg leading-snug">{currentStep.question}</p>
            {currentStep.hint && (
              <p className="text-sm text-muted-foreground">{currentStep.hint}</p>
            )}
          </div>

          {currentStep.type === "choice" && (
            <div className="flex flex-col gap-2">
              {currentStep.choices?.map((choice) => (
                <button
                  key={choice.value}
                  onClick={() => handleChoice(currentStep.id, choice.value)}
                  className="text-left p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-150 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{choice.label}</span>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  {choice.description && (
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {choice.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}

          {currentStep.type === "income" && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Ex. : 65 000"
                  value={incomeInput}
                  onChange={(e) => setIncomeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleIncome()}
                  className="text-lg"
                  autoFocus
                />
                <Button onClick={handleIncome} disabled={!incomeInput}>
                  Continuer
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[40000, 60000, 80000, 100000, 120000].map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, income: v }));
                    }}
                    className="px-3 py-1 text-sm rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    {v.toLocaleString("fr-CA")} $
                  </button>
                ))}
              </div>
            </div>
          )}

          {completedStepIds.length > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={14} />
              Retour
            </button>
          )}
        </Card>
      )}

      {/* Recommendation */}
      {recommendation && (
        <Card className={`p-5 border ${recommendation.bg} space-y-3`}>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
              Recommandation
            </div>
            <div className={`text-2xl font-bold ${recommendation.color}`}>
              {recommendation.winner}
            </div>
            <div className="font-semibold text-lg">{recommendation.title}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {recommendation.detail}
            </p>
          </div>

          <button
            onClick={reset}
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
          >
            Recommencer
          </button>
        </Card>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Ceci n&apos;est pas un conseil financier. Consulte un conseiller pour
        ta situation spécifique.
      </p>
    </div>
  );
}
