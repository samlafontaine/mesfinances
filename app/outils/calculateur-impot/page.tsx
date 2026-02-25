"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// --- Constantes fiscales 2025 ---

const TAX_YEAR = 2025;

const FEDERAL_BRACKETS = [
  { min: 0, max: 57375, rate: 0.15 },
  { min: 57375, max: 114750, rate: 0.205 },
  { min: 114750, max: 158468, rate: 0.26 },
  { min: 158468, max: 220000, rate: 0.29 },
  { min: 220000, max: Infinity, rate: 0.33 },
];

const FEDERAL_BASIC_PERSONAL = 16129;
const QUEBEC_ABATEMENT_RATE = 0.165;

const QUEBEC_BRACKETS = [
  { min: 0, max: 53255, rate: 0.14 },
  { min: 53255, max: 106495, rate: 0.19 },
  { min: 106495, max: 129590, rate: 0.24 },
  { min: 129590, max: Infinity, rate: 0.2575 },
];

const QUEBEC_BASIC_PERSONAL = 18571;

// Cotisations salariales
const QPP_RATE = 0.064;
const QPP_MAX_EARNINGS = 71300;
const QPP_EXEMPTION = 3500;

const EI_RATE = 0.0127;
const EI_MAX_EARNINGS = 65000;

const QPIP_RATE = 0.00494;
const QPIP_MAX_EARNINGS = 98000;

// --- Fonctions de calcul ---

function calculateBracketTax(
  taxableIncome: number,
  brackets: { min: number; max: number; rate: number }[],
) {
  const breakdown: { label: string; amount: number; rate: number; tax: number }[] = [];
  let totalTax = 0;

  for (const bracket of brackets) {
    const taxableInBracket = Math.max(
      0,
      Math.min(taxableIncome, bracket.max) - bracket.min,
    );
    if (taxableInBracket > 0) {
      const tax = taxableInBracket * bracket.rate;
      totalTax += tax;
      breakdown.push({
        label:
          bracket.max === Infinity
            ? `${bracket.min.toLocaleString("fr-CA")} $ et plus`
            : `${bracket.min.toLocaleString("fr-CA")} $ – ${bracket.max.toLocaleString("fr-CA")} $`,
        amount: taxableInBracket,
        rate: bracket.rate,
        tax,
      });
    }
  }

  return { totalTax, breakdown };
}

function calculatePayroll(revenuEmploi: number) {
  const qppEarnings = Math.min(revenuEmploi, QPP_MAX_EARNINGS);
  const qpp = Math.max(0, (qppEarnings - QPP_EXEMPTION) * QPP_RATE);

  const eiEarnings = Math.min(revenuEmploi, EI_MAX_EARNINGS);
  const ei = eiEarnings * EI_RATE;

  const qpipEarnings = Math.min(revenuEmploi, QPIP_MAX_EARNINGS);
  const qpip = qpipEarnings * QPIP_RATE;

  return { qpp, ei, qpip, total: qpp + ei + qpip };
}

function getMarginalRate(taxableIncome: number) {
  let fedRate = 0;
  for (const b of FEDERAL_BRACKETS) {
    if (taxableIncome > b.min) fedRate = b.rate;
  }
  let qcRate = 0;
  for (const b of QUEBEC_BRACKETS) {
    if (taxableIncome > b.min) qcRate = b.rate;
  }
  return fedRate * (1 - QUEBEC_ABATEMENT_RATE) + qcRate;
}

// --- Helpers ---

const fmt = (n: number) =>
  Math.round(n).toLocaleString("fr-CA") + " $";

const pct = (n: number) => (n * 100).toFixed(1) + " %";

// --- Composant ---

export default function CalculateurImpot() {
  const [revenuEmploi, setRevenuEmploi] = useState<number>(75000);
  const [autresRevenus, setAutresRevenus] = useState<number>(0);
  const [cotisationsReer, setCotisationsReer] = useState<number>(0);

  // Calculs
  const revenuTotal = revenuEmploi + autresRevenus;
  const revenuImposable = Math.max(0, revenuTotal - cotisationsReer);

  // Fédéral
  const federal = calculateBracketTax(revenuImposable, FEDERAL_BRACKETS);
  const creditPersonnelFed = FEDERAL_BASIC_PERSONAL * 0.15;
  const impotFedAvantAbattement = Math.max(0, federal.totalTax - creditPersonnelFed);
  const abattementQc = impotFedAvantAbattement * QUEBEC_ABATEMENT_RATE;
  const impotFederal = Math.max(0, impotFedAvantAbattement - abattementQc);

  // Québec
  const quebec = calculateBracketTax(revenuImposable, QUEBEC_BRACKETS);
  const creditPersonnelQc = QUEBEC_BASIC_PERSONAL * 0.14;
  const impotQuebec = Math.max(0, quebec.totalTax - creditPersonnelQc);

  // Cotisations salariales
  const payroll = calculatePayroll(revenuEmploi);

  // Totaux
  const totalImpots = impotFederal + impotQuebec;
  const totalDeductions = totalImpots + payroll.total;
  const revenuNet = revenuTotal - totalDeductions;
  const tauxEffectif = revenuTotal > 0 ? totalImpots / revenuTotal : 0;
  const tauxMarginal = getMarginalRate(revenuImposable);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="w-full flex flex-col items-center mb-12">
        <h1 className="text-2xl md:text-3xl tracking-tighter md:leading-snug font-semibold mb-2 text-center">
          Calculateur d&apos;impôt sur le revenu 💰
        </h1>
        <p className="prose prose-neutral dark:prose-invert text-center">
          Estimez vos impôts provinciaux (Québec) et fédéraux pour {TAX_YEAR}.
        </p>
      </div>

      {/* Entrées */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="revenuEmploi">Revenu d&apos;emploi annuel ($)</Label>
          <Input
            id="revenuEmploi"
            type="number"
            value={revenuEmploi || ""}
            onChange={(e) => setRevenuEmploi(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="autresRevenus">Autres revenus ($)</Label>
          <Input
            id="autresRevenus"
            type="number"
            value={autresRevenus || ""}
            onChange={(e) => setAutresRevenus(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cotisationsReer">Cotisations REER ($)</Label>
          <Input
            id="cotisationsReer"
            type="number"
            value={cotisationsReer || ""}
            onChange={(e) => setCotisationsReer(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Résumé */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Résumé</h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Revenu total</TableCell>
              <TableCell className="text-right">{fmt(revenuTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Déductions REER
              </TableCell>
              <TableCell className="text-right">
                - {fmt(cotisationsReer)}
              </TableCell>
            </TableRow>
            <TableRow className="border-t-2">
              <TableCell className="font-semibold">Revenu imposable</TableCell>
              <TableCell className="text-right font-semibold">
                {fmt(revenuImposable)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Impôt fédéral</TableCell>
              <TableCell className="text-right">{fmt(impotFederal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Impôt Québec</TableCell>
              <TableCell className="text-right">{fmt(impotQuebec)}</TableCell>
            </TableRow>
            <TableRow className="border-t-2">
              <TableCell className="font-semibold">Total des impôts</TableCell>
              <TableCell className="text-right font-semibold">
                {fmt(totalImpots)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Cotisations salariales (RRQ, AE, RQAP)
              </TableCell>
              <TableCell className="text-right">
                {fmt(payroll.total)}
              </TableCell>
            </TableRow>
            <TableRow className="border-t-2">
              <TableCell className="font-semibold">
                Total des retenues
              </TableCell>
              <TableCell className="text-right font-semibold">
                {fmt(totalDeductions)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Taux d&apos;imposition effectif
              </TableCell>
              <TableCell className="text-right">{pct(tauxEffectif)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Taux d&apos;imposition marginal
              </TableCell>
              <TableCell className="text-right">{pct(tauxMarginal)}</TableCell>
            </TableRow>
            <TableRow className="border-t-2 bg-primary/5">
              <TableCell className="font-bold text-lg">
                Revenu net après impôt
              </TableCell>
              <TableCell className="text-right font-bold text-lg">
                {fmt(revenuNet)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Détail fédéral */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Détail — Impôt fédéral
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Palier</TableHead>
              <TableHead className="text-right">Montant imposable</TableHead>
              <TableHead className="text-right">Taux</TableHead>
              <TableHead className="text-right">Impôt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {federal.breakdown.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{row.label}</TableCell>
                <TableCell className="text-right">{fmt(row.amount)}</TableCell>
                <TableCell className="text-right">
                  {(row.rate * 100).toFixed(1)} %
                </TableCell>
                <TableCell className="text-right">{fmt(row.tax)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="border-t">
              <TableCell colSpan={3} className="font-medium">
                Sous-total
              </TableCell>
              <TableCell className="text-right">
                {fmt(federal.totalTax)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="font-medium">
                Crédit personnel de base ({fmt(FEDERAL_BASIC_PERSONAL)} × 15 %)
              </TableCell>
              <TableCell className="text-right">
                - {fmt(creditPersonnelFed)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="font-medium">
                Abattement du Québec (16,5 %)
              </TableCell>
              <TableCell className="text-right">
                - {fmt(abattementQc)}
              </TableCell>
            </TableRow>
            <TableRow className="border-t-2">
              <TableCell colSpan={3} className="font-semibold">
                Impôt fédéral net
              </TableCell>
              <TableCell className="text-right font-semibold">
                {fmt(impotFederal)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Détail Québec */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Détail — Impôt du Québec
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Palier</TableHead>
              <TableHead className="text-right">Montant imposable</TableHead>
              <TableHead className="text-right">Taux</TableHead>
              <TableHead className="text-right">Impôt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quebec.breakdown.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{row.label}</TableCell>
                <TableCell className="text-right">{fmt(row.amount)}</TableCell>
                <TableCell className="text-right">
                  {(row.rate * 100).toFixed(1)} %
                </TableCell>
                <TableCell className="text-right">{fmt(row.tax)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="border-t">
              <TableCell colSpan={3} className="font-medium">
                Sous-total
              </TableCell>
              <TableCell className="text-right">
                {fmt(quebec.totalTax)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="font-medium">
                Crédit personnel de base ({fmt(QUEBEC_BASIC_PERSONAL)} × 14 %)
              </TableCell>
              <TableCell className="text-right">
                - {fmt(creditPersonnelQc)}
              </TableCell>
            </TableRow>
            <TableRow className="border-t-2">
              <TableCell colSpan={3} className="font-semibold">
                Impôt du Québec net
              </TableCell>
              <TableCell className="text-right font-semibold">
                {fmt(impotQuebec)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Cotisations salariales */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Cotisations salariales</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cotisation</TableHead>
              <TableHead className="text-right">Taux</TableHead>
              <TableHead className="text-right">Maximum</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">RRQ (Régime de rentes du Québec)</TableCell>
              <TableCell className="text-right">6,4 %</TableCell>
              <TableCell className="text-right">{fmt(QPP_MAX_EARNINGS)}</TableCell>
              <TableCell className="text-right">{fmt(payroll.qpp)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Assurance-emploi (AE)</TableCell>
              <TableCell className="text-right">1,27 %</TableCell>
              <TableCell className="text-right">{fmt(EI_MAX_EARNINGS)}</TableCell>
              <TableCell className="text-right">{fmt(payroll.ei)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">RQAP</TableCell>
              <TableCell className="text-right">0,494 %</TableCell>
              <TableCell className="text-right">{fmt(QPIP_MAX_EARNINGS)}</TableCell>
              <TableCell className="text-right">{fmt(payroll.qpip)}</TableCell>
            </TableRow>
            <TableRow className="border-t-2">
              <TableCell colSpan={3} className="font-semibold">
                Total des cotisations
              </TableCell>
              <TableCell className="text-right font-semibold">
                {fmt(payroll.total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Note */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="font-semibold mb-2">Note importante :</h3>
        <p className="text-sm text-muted-foreground">
          Ce calculateur fournit une estimation des impôts pour l&apos;année{" "}
          {TAX_YEAR} basée sur les taux d&apos;imposition standards du Québec et
          du Canada. Il ne prend pas en compte tous les crédits d&apos;impôt
          possibles, les déductions spécifiques ou les situations particulières.
          Les résultats sont à titre indicatif seulement et ne constituent pas
          des conseils fiscaux. Pour une évaluation précise, consultez un
          comptable ou fiscaliste.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Inclus dans le calcul :</strong> Paliers d&apos;imposition
          fédéraux et provinciaux, montants personnels de base, abattement
          fédéral du Québec (16,5 %), RRQ, assurance-emploi et RQAP.
        </p>
      </div>
    </div>
  );
}
