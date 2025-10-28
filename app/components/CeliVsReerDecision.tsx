"use client";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type YesNo = "yes" | "no" | null;

export default function CeliVsReerDecision() {
  const [hasEmployerMatch, setHasEmployerMatch] = useState<YesNo>(null);
  const [hasDebt, setHasDebt] = useState<YesNo>(null);
  const [debtType, setDebtType] = useState<"high" | "low" | null>(null);
  const [hasEmergencyFund, setHasEmergencyFund] = useState<YesNo>(null);
  const [income, setIncome] = useState<number | "">(60000);
  const [expectHigherIncomeLater, setExpectHigherIncomeLater] =
    useState<YesNo>(null);

  const resetFrom = (level: number) => {
    if (level <= 1) {
      setHasDebt(null);
      setDebtType(null);
      setHasEmergencyFund(null);
      setIncome(60000);
      setExpectHigherIncomeLater(null);
    }
    if (level <= 2) {
      setDebtType(null);
      setHasEmergencyFund(null);
      setIncome(60000);
      setExpectHigherIncomeLater(null);
    }
    if (level <= 3) {
      setHasEmergencyFund(null);
      setIncome(60000);
      setExpectHigherIncomeLater(null);
    }
    if (level <= 4) {
      setIncome(60000);
      setExpectHigherIncomeLater(null);
    }
    if (level <= 5) {
      setExpectHigherIncomeLater(null);
    }
  };

  const recommendation = useMemo(() => {
    // Employer match always first
    if (hasEmployerMatch === "yes") {
      return {
        title: "Profite du REER avec contrepartie de l'employeur",
        detail:
          "Cotise au REER jusqu'au maximum de la contrepartie – c'est de l'argent gratuit.",
      };
    }

    // Debts
    if (hasDebt === "yes") {
      if (debtType === "high") {
        return {
          title: "Rembourse ta dette à haut intérêt d'abord",
          detail:
            "Les intérêts de carte de crédit dépassent largement les rendements attendus. Priorise le remboursement, ensuite épargne.",
        };
      }
      // low-interest (e.g., mortgage) → move on to emergency fund
    }

    if (hasEmergencyFund === "no") {
      return {
        title: "Constitue un fonds d'urgence",
        detail:
          "Mets en place 3 à 6 mois de dépenses dans un compte facilement accessible avant d'investir.",
      };
    }

    if (income === "" || Number(income) <= 0) {
      return null;
    }

    const numericIncome = Number(income);

    // Income-based guidance inspired by common guidance
    if (numericIncome < 50000) {
      return {
        title: "Priorise le CELI",
        detail:
          "À revenu plus faible, l'économie d'impôt du REER est limitée. Le CELI offre une flexibilité et une croissance à l'abri de l'impôt.",
      };
    }

    if (numericIncome >= 100000) {
      return {
        title: "Priorise le REER",
        detail:
          "À revenu élevé, l'économie d'impôt immédiate du REER est généralement plus avantageuse. Complète avec le CELI ensuite.",
      };
    }

    // Middle incomes
    if (expectHigherIncomeLater === "yes") {
      return {
        title: "Priorise le CELI (puis REER plus tard)",
        detail:
          "Si tu t'attends à un revenu plus élevé plus tard, garde de la marge REER pour l'utiliser quand ta tranche d'imposition sera plus haute.",
      };
    }

    if (expectHigherIncomeLater === "no") {
      return {
        title: "Priorise le REER",
        detail:
          "Si ton revenu sera similaire ou plus faible à la retraite, l'économie d'impôt du REER maintenant peut être optimale.",
      };
    }

    return null;
  }, [
    hasEmployerMatch,
    hasDebt,
    debtType,
    hasEmergencyFund,
    income,
    expectHigherIncomeLater,
  ]);

  return (
    <Card className="p-4 md:p-6 space-y-6">
      <div className="text-left space-y-2">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
          CELI vs REER — arbre de décision
        </h2>
        <p className="text-sm text-muted-foreground">
          Suis les étapes pour obtenir une recommandation personnalisée.
        </p>
      </div>

      {/* Step 1: Employer match */}
      <div className="space-y-2">
        <Label>Ton employeur offre-t-il une contrepartie REER?</Label>
        <div className="flex gap-2">
          <Button
            variant={hasEmployerMatch === "yes" ? "default" : "outline"}
            onClick={() => {
              setHasEmployerMatch("yes");
              resetFrom(1);
            }}
          >
            Oui
          </Button>
          <Button
            variant={hasEmployerMatch === "no" ? "default" : "outline"}
            onClick={() => {
              setHasEmployerMatch("no");
              resetFrom(1);
            }}
          >
            Non
          </Button>
        </div>
      </div>

      {hasEmployerMatch === "no" && (
        <div className="space-y-3">
          {/* Step 2: Debt */}
          <div className="space-y-2">
            <Label>As-tu des dettes?</Label>
            <div className="flex gap-2">
              <Button
                variant={hasDebt === "yes" ? "default" : "outline"}
                onClick={() => {
                  setHasDebt("yes");
                  resetFrom(2);
                }}
              >
                Oui
              </Button>
              <Button
                variant={hasDebt === "no" ? "default" : "outline"}
                onClick={() => {
                  setHasDebt("no");
                  resetFrom(2);
                }}
              >
                Non
              </Button>
            </div>
          </div>

          {hasDebt === "yes" && (
            <div className="space-y-2">
              <Label>Quel type de dette?</Label>
              <div className="flex gap-2">
                <Button
                  variant={debtType === "high" ? "default" : "outline"}
                  onClick={() => {
                    setDebtType("high");
                    resetFrom(3);
                  }}
                >
                  Taux élevé (ex.: cartes de crédit)
                </Button>
                <Button
                  variant={debtType === "low" ? "default" : "outline"}
                  onClick={() => {
                    setDebtType("low");
                    resetFrom(3);
                  }}
                >
                  Taux faible (ex.: hypothèque)
                </Button>
              </div>
            </div>
          )}

          {(hasDebt === "no" || debtType === "low") && (
            <div className="space-y-2">
              <Label>As-tu un fonds d'urgence (3 à 6 mois)?</Label>
              <div className="flex gap-2">
                <Button
                  variant={hasEmergencyFund === "yes" ? "default" : "outline"}
                  onClick={() => {
                    setHasEmergencyFund("yes");
                    resetFrom(4);
                  }}
                >
                  Oui
                </Button>
                <Button
                  variant={hasEmergencyFund === "no" ? "default" : "outline"}
                  onClick={() => {
                    setHasEmergencyFund("no");
                    resetFrom(4);
                  }}
                >
                  Non
                </Button>
              </div>
            </div>
          )}

          {hasEmergencyFund === "yes" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ton revenu annuel imposable</Label>
                <Input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Penses-tu gagner plus dans 3 à 5 ans?</Label>
                <div className="flex gap-2">
                  <Button
                    variant={
                      expectHigherIncomeLater === "yes" ? "default" : "outline"
                    }
                    onClick={() => setExpectHigherIncomeLater("yes")}
                  >
                    Oui
                  </Button>
                  <Button
                    variant={
                      expectHigherIncomeLater === "no" ? "default" : "outline"
                    }
                    onClick={() => setExpectHigherIncomeLater("no")}
                  >
                    Non
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {recommendation && (
        <Card className="p-4 bg-primary/5 border-primary/30">
          <div className="space-y-1">
            <div className="font-semibold">Recommandation</div>
            <div className="text-lg">{recommendation.title}</div>
            <div className="text-sm text-muted-foreground">
              {recommendation.detail}
            </div>
          </div>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        Ceci n'est pas un conseil financier. Utilise ce guide comme point de
        départ et ajuste selon ta situation. Source d'inspiration: arbre de
        décision populaire de Wealthsimple.
      </p>
    </Card>
  );
}
