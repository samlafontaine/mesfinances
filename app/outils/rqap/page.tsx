"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export default function RQAPCalculator() {
  const [salaireAnnuel, setSalaireAnnuel] = useState<number>(50000);
  const [regime, setRegime] = useState<"base" | "particulier">("base");
  const [typePrestation, setTypePrestation] = useState<
    "maternite" | "paternite"
  >("maternite");

  // RQAP benefit calculation based on official Quebec tables
  const calculateRQAPBenefits = (
    salaire: number,
    regime: "base" | "particulier",
    type: "maternite" | "paternite",
  ) => {
    // Maximum insurable earnings for 2025
    const maxInsurableEarnings = 98000;
    const salaireInsurable = Math.min(salaire, maxInsurableEarnings);
    const salaireHebdomadaire = salaireInsurable / 52;

    if (type === "maternite") {
      if (regime === "base") {
        return {
          semaines: 18,
          pourcentage: 70,
          montantHebdomadaire: salaireHebdomadaire * 0.7,
          montantTotal: salaireHebdomadaire * 0.7 * 18,
        };
      } else {
        return {
          semaines: 15,
          pourcentage: 75,
          montantHebdomadaire: salaireHebdomadaire * 0.75,
          montantTotal: salaireHebdomadaire * 0.75 * 15,
        };
      }
    } else {
      // paternite
      if (regime === "base") {
        return {
          semaines: 5,
          pourcentage: 70,
          montantHebdomadaire: salaireHebdomadaire * 0.7,
          montantTotal: salaireHebdomadaire * 0.7 * 5,
        };
      } else {
        return {
          semaines: 3,
          pourcentage: 75,
          montantHebdomadaire: salaireHebdomadaire * 0.75,
          montantTotal: salaireHebdomadaire * 0.75 * 3,
        };
      }
    }
  };

  const calculateParentales = (
    salaire: number,
    regime: "base" | "particulier",
  ) => {
    // Maximum insurable earnings for 2025
    const maxInsurableEarnings = 98000;
    const salaireInsurable = Math.min(salaire, maxInsurableEarnings);
    const salaireHebdomadaire = salaireInsurable / 52;

    if (regime === "base") {
      return {
        semaines: 32,
        premierePhase: {
          semaines: 7,
          pourcentage: 70,
          montantHebdomadaire: salaireHebdomadaire * 0.7,
          montantTotal: salaireHebdomadaire * 0.7 * 7,
        },
        deuxiemePhase: {
          semaines: 25,
          pourcentage: 55,
          montantHebdomadaire: salaireHebdomadaire * 0.55,
          montantTotal: salaireHebdomadaire * 0.55 * 25,
        },
        prestationsAdditionnelles: {
          semaines: 4,
          pourcentage: 55,
          montantHebdomadaire: salaireHebdomadaire * 0.55,
          montantTotal: salaireHebdomadaire * 0.55 * 4,
        },
      };
    } else {
      return {
        semaines: 25,
        premierePhase: {
          semaines: 25,
          pourcentage: 75,
          montantHebdomadaire: salaireHebdomadaire * 0.75,
          montantTotal: salaireHebdomadaire * 0.75 * 25,
        },
        prestationsAdditionnelles: {
          semaines: 3,
          pourcentage: 75,
          montantHebdomadaire: salaireHebdomadaire * 0.75,
          montantTotal: salaireHebdomadaire * 0.75 * 3,
        },
      };
    }
  };

  const currentBenefits = calculateRQAPBenefits(
    salaireAnnuel,
    regime,
    typePrestation,
  );
  const parentalesBenefits = calculateParentales(salaireAnnuel, regime);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="w-full flex flex-col items-center mb-12">
        <h1 className="text-2xl md:text-3xl tracking-tighter md:leading-snug font-semibold mb-2 text-center">
          Calculateur RQAP 👶
        </h1>
        <p className="prose prose-neutral dark:prose-invert text-center">
          Calculez vos prestations RQAP selon votre salaire et le régime choisi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="salaireAnnuel">Salaire annuel ($)</Label>
          <Input
            id="salaireAnnuel"
            type="number"
            value={salaireAnnuel || ""}
            onChange={(e) => setSalaireAnnuel(Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="regime">Régime</Label>
          <Select
            value={regime}
            onValueChange={(value: "base" | "particulier") => setRegime(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un régime" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="base">Régime de base</SelectItem>
              <SelectItem value="particulier">Régime particulier</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="typePrestation">Type de prestation</Label>
          <Select
            value={typePrestation}
            onValueChange={(value: "maternite" | "paternite") =>
              setTypePrestation(value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maternite">Maternité</SelectItem>
              <SelectItem value="paternite">Paternité</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Prestations{" "}
          {typePrestation === "maternite" ? "de maternité" : "de paternité"}
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Détail</TableHead>
              <TableHead className="text-right">Semaines</TableHead>
              <TableHead className="text-right">Pourcentage</TableHead>
              <TableHead className="text-right">Montant/semaine</TableHead>
              <TableHead className="text-right">Montant total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                {typePrestation === "maternite" ? "Maternité" : "Paternité"}
              </TableCell>
              <TableCell className="text-right">
                {currentBenefits.semaines}
              </TableCell>
              <TableCell className="text-right">
                {currentBenefits.pourcentage}%
              </TableCell>
              <TableCell className="text-right">
                {Math.round(currentBenefits.montantHebdomadaire).toLocaleString(
                  "fr-CA",
                )}{" "}
                $
              </TableCell>
              <TableCell className="text-right font-semibold">
                {Math.round(currentBenefits.montantTotal).toLocaleString(
                  "fr-CA",
                )}{" "}
                $
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Prestations parentales partageables
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phase</TableHead>
              <TableHead className="text-right">Semaines</TableHead>
              <TableHead className="text-right">Pourcentage</TableHead>
              <TableHead className="text-right">Montant/semaine</TableHead>
              <TableHead className="text-right">Montant total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regime === "base" ? (
              <>
                <TableRow>
                  <TableCell className="font-medium">
                    7 premières semaines
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.premierePhase.semaines}
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.premierePhase.pourcentage}%
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(
                      parentalesBenefits.premierePhase.montantHebdomadaire,
                    ).toLocaleString("fr-CA")}{" "}
                    $
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(
                      parentalesBenefits.premierePhase.montantTotal,
                    ).toLocaleString("fr-CA")}{" "}
                    $
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    25 semaines suivantes
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.deuxiemePhase?.semaines}
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.deuxiemePhase?.pourcentage}%
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.deuxiemePhase?.montantHebdomadaire
                      ? Math.round(
                          parentalesBenefits.deuxiemePhase.montantHebdomadaire,
                        ).toLocaleString("fr-CA")
                      : "-"}{" "}
                    $
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.deuxiemePhase?.montantTotal
                      ? Math.round(
                          parentalesBenefits.deuxiemePhase.montantTotal,
                        ).toLocaleString("fr-CA")
                      : "-"}{" "}
                    $
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Prestations additionnelles
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.prestationsAdditionnelles.semaines}
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.prestationsAdditionnelles.pourcentage}%
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(
                      parentalesBenefits.prestationsAdditionnelles
                        .montantHebdomadaire,
                    ).toLocaleString("fr-CA")}{" "}
                    $
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(
                      parentalesBenefits.prestationsAdditionnelles.montantTotal,
                    ).toLocaleString("fr-CA")}{" "}
                    $
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell className="font-medium">
                    Prestations parentales
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.premierePhase.semaines}
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.premierePhase.pourcentage}%
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(
                      parentalesBenefits.premierePhase.montantHebdomadaire,
                    ).toLocaleString("fr-CA")}{" "}
                    $
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(
                      parentalesBenefits.premierePhase.montantTotal,
                    ).toLocaleString("fr-CA")}{" "}
                    $
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Prestations additionnelles
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.prestationsAdditionnelles.semaines}
                  </TableCell>
                  <TableCell className="text-right">
                    {parentalesBenefits.prestationsAdditionnelles.pourcentage}%
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(
                      parentalesBenefits.prestationsAdditionnelles
                        .montantHebdomadaire,
                    ).toLocaleString("fr-CA")}{" "}
                    $
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(
                      parentalesBenefits.prestationsAdditionnelles.montantTotal,
                    ).toLocaleString("fr-CA")}{" "}
                    $
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="font-semibold mb-2">Note importante :</h3>
        <p className="text-sm text-muted-foreground">
          Ce calculateur fournit une estimation basée sur les tableaux officiels
          du RQAP. <strong>Note importante :</strong> Le salaire maximum
          assurable pour 2025 est de 98 000 $. Si votre salaire dépasse ce
          montant, les prestations sont calculées sur 98 000 $ seulement. Les
          montants réels peuvent varier selon votre situation spécifique.
          Consultez le site officiel du{" "}
          <a
            href="https://www.rqap.gouv.qc.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            RQAP
          </a>{" "}
          pour des calculs précis.
        </p>
      </div>
    </div>
  );
}
