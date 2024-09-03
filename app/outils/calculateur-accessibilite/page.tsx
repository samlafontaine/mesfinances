"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [income, setIncome] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [affordablePrice, setAffordablePrice] = useState<number | null>(null);
  const [formattedIncome, setFormattedIncome] = useState("");
  const [formattedDownPayment, setFormattedDownPayment] = useState("");

  const formatNumber = (num: string) => {
    const numericValue = num.replace(/[^0-9]/g, "");
    return new Intl.NumberFormat("en-US").format(parseInt(numericValue) || 0);
  };

  const calculateAffordablePrice = () => {
    const annualIncome = parseFloat(income) || 0;
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPayment = monthlyIncome * 0.28;

    const interestRateDecimal = (parseFloat(interestRate) || 0) / 100 / 12;
    const taxRateDecimal = (parseFloat(taxRate) || 0) / 100 / 12;
    const downPaymentAmount = parseFloat(downPayment) || 0;

    const numberOfPayments = 25 * 12; // 25-year mortgage

    const mortgagePortion = maxMonthlyPayment / (1 + taxRateDecimal);
    const presentValue =
      mortgagePortion *
      ((1 - Math.pow(1 + interestRateDecimal, -numberOfPayments)) /
        interestRateDecimal);

    const totalAffordablePrice = Math.round(presentValue + downPaymentAmount);
    setAffordablePrice(totalAffordablePrice);
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto text-center mb-12 hidden">
        <h1 className="text-2xl md:text-3xl tracking-tighter md:leading-snug font-semibold mb-2">
          Calculateur d'accessibilité hypothécaire 🏡
        </h1>
        <p className="prose prose-neutral dark:prose-invert">
          Calculez le prix d'une maison que vous pouvez vous permettre en
          fonction de vos revenus, de votre apport initial et de la taxe sur les
          propriétés.
        </p>
      </div>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-md md:text-2xl mb-2 font-semibold">
            Calculateur d'accessibilté hypothécaire 🏡
          </CardTitle>
          <CardDescription className="text-sm md:text-md mb-4">
            Calculez le prix d'une maison que vous pouvez vous permettre en
            fonction de vos revenus, de votre mise de fonds initiale et de la
            taxe sur les propriétés.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateAffordablePrice();
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="income">Revenu annuel ($)</Label>
              <Input
                id="income"
                type="text"
                inputMode="numeric"
                placeholder="Entrez votre revenu annuel"
                value={formattedIncome}
                onChange={(e) => {
                  const formatted = formatNumber(e.target.value);
                  setFormattedIncome(formatted);
                  setIncome(e.target.value.replace(/[^0-9]/g, ""));
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="downPayment">Mise de fonds initiale ($)</Label>
              <Input
                id="downPayment"
                type="text"
                inputMode="numeric"
                placeholder="Entrez votre mise de fonds initiale"
                value={formattedDownPayment}
                onChange={(e) => {
                  const formatted = formatNumber(e.target.value);
                  setFormattedDownPayment(formatted);
                  setDownPayment(e.target.value.replace(/[^0-9]/g, ""));
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Taux d'intérêt annuel (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                placeholder="Entrez le taux d'intérêt annuel"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">
                Taux de taxe annuel sur la propriété (%)
              </Label>
              <Input
                id="taxRate"
                type="number"
                step="0.01"
                placeholder="Entrez le taux de taxe annuel sur la propriété"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Calculer
            </Button>
          </form>
          {affordablePrice !== null && (
            <div className="mt-4 p-4 bg-secondary rounded-md">
              <p className="text-lg font-semibold">
                Avec un prêt hypothécaire fixe sur 25 ans et votre mise de fonds
                initiale, vous pouvez vous permettre une maison estimée à:{" "}
                <span className="text-primary font-black underline underline-offset-2">
                  ${affordablePrice.toLocaleString()}
                </span>
                .
              </p>
              <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />
              <p className="mt-2 text-sm prose prose-neutral dark:prose-invert leading-relaxed">
                Ce calcul est basé sur le principe que votre paiement
                hypothécaire mensuel ne dépasse pas 28% de votre revenu mensuel
                brut. Il inclut une estimation des taxes foncières mais n'inclut
                pas d'autres coûts tels que l'assurance habitation, les frais de
                copropriété, ou les dépenses d'entretien. Consultez un
                professionnel financier pour une évaluation plus précise de
                votre situation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="w-full max-w-2xl mx-auto mt-12 prose prose-neutral dark:prose-invert">
        <h2>
          Pourquoi utiliser notre calculateur d'accessibilité hypothécaire ?
        </h2>
        <p>
          Nous avons créé ce calculateur d'accessibilité hypothécaire pour aider
          les futurs propriétaires à mieux comprendre leur capacité d'achat
          immobilier. Dans un marché immobilier en constante évolution, il est
          crucial d'avoir une idée précise du prix de la maison que vous pouvez
          vous permettre avant de commencer vos recherches.
        </p>
        <p>Notre outil prend en compte plusieurs facteurs importants :</p>
        <ul>
          <li>Votre revenu annuel</li>
          <li>Votre mise de fonds initiale</li>
          <li>Le taux d'intérêt hypothécaire actuel</li>
          <li>Le taux de taxe foncière dans votre région</li>
        </ul>
        <p>
          En utilisant ces informations, notre calculateur vous donne une
          estimation réaliste du prix maximal d'une maison que vous pourriez
          acheter. Cette estimation est basée sur le principe généralement
          accepté que votre paiement hypothécaire mensuel ne devrait pas
          dépasser 28% de votre revenu mensuel brut.
        </p>
        <p>
          Comprendre votre capacité d'achat est essentiel pour plusieurs raisons
          :
        </p>
        <ol>
          <li>
            Cela vous aide à cibler vos recherches de maison de manière plus
            efficace.
          </li>
          <li>
            Vous évitez de vous engager dans un achat qui pourrait mettre en
            péril votre stabilité financière à long terme.
          </li>
          <li>
            Cela vous permet de négocier avec plus de confiance lorsque vous
            trouvez la maison de vos rêves.
          </li>
          <li>
            Vous pouvez mieux planifier vos finances et votre épargne en vue de
            votre achat immobilier.
          </li>
        </ol>
        <p>
          Il est important de noter que ce calculateur fournit une estimation et
          ne prend pas en compte tous les aspects de votre situation financière
          personnelle. Des facteurs tels que vos dettes existantes, vos autres
          dépenses mensuelles, ou les coûts d'entretien d'une maison ne sont pas
          inclus dans ce calcul. C'est pourquoi nous recommandons toujours de
          consulter un professionnel financier ou un courtier hypothécaire pour
          obtenir une évaluation plus complète de votre situation.
        </p>
        <p>
          En fin de compte, notre calculateur d'accessibilité hypothécaire est
          un excellent point de départ dans votre parcours vers la propriété. Il
          vous donne une base solide pour commencer à planifier votre achat
          immobilier de manière réaliste et responsable. Utilisez-le comme un
          guide pour vous aider à prendre des décisions éclairées et à réaliser
          votre rêve de devenir propriétaire.
        </p>
      </div>
    </>
  );
}
