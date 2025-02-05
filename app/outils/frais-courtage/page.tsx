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

export default function CourtierCalculator() {
  const [prixAchat, setPrixAchat] = useState<number>(400000);
  const [prixVente, setPrixVente] = useState<number>(500000);
  const [fraisCourtage, setFraisCourtage] = useState<number>(5);

  const generatePrixVenteRange = (prixVente: number): number[] => {
    const range = [];
    const middle = prixVente;
    for (let i = -4; i <= 4; i++) {
      range.push(middle + i * 25000);
    }
    return range;
  };

  const generateFraisCourtageRange = (fraisCourtage: number): number[] => {
    const range = [];
    const middle = fraisCourtage;
    for (let i = -4; i <= 4; i++) {
      range.push(middle + i * 0.25);
    }
    return range;
  };

  const calculateFrais = (prix: number, taux: number): number => {
    return (prix * taux * 1.15) / 100;
  };

  const prixRange = generatePrixVenteRange(prixVente);
  const fraisRange = generateFraisCourtageRange(fraisCourtage);

  const formatNumberForMobile = (number: number) => {
    const roundedToThousand = Math.round(number / 1000);
    return `${roundedToThousand.toLocaleString("fr-CA")}K`;
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="w-full flex flex-col items-center mb-12">
        <h1 className="text-2xl md:text-3xl tracking-tighter md:leading-snug font-semibold mb-2 text-center">
          Calculatrice de frais de courtage 🏠
        </h1>
        <p className="prose prose-neutral dark:prose-invert text-center">
          Calculez les frais de courtage selon différents scénarios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="prixAchat">Prix payé à l&apos;achat ($)</Label>
          <Input
            id="prixAchat"
            type="number"
            value={prixAchat || ""}
            onChange={(e) => setPrixAchat(Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prixVente">Prix estimé de vente ($)</Label>
          <Input
            id="prixVente"
            type="number"
            value={prixVente || ""}
            onChange={(e) => setPrixVente(Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fraisCourtage">Frais de courtage (%)</Label>
          <Input
            id="fraisCourtage"
            type="number"
            step="0.25"
            value={fraisCourtage || ""}
            onChange={(e) => setFraisCourtage(Number(e.target.value))}
          />
        </div>
      </div>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-bold"></TableCell>
              {fraisRange.map((taux) => (
                <TableCell key={taux} className="text-right font-bold">
                  {taux <= 0 ? "-" : `${taux.toFixed(2)}%`}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {prixRange.map((prix) => (
              <TableRow key={prix}>
                <TableCell className="font-bold">
                  <span className="hidden md:inline">
                    {prix <= 0 ? "-" : `${prix.toLocaleString("fr-CA")} $`}
                  </span>
                  <span className="md:hidden">
                    {prix <= 0 ? "-" : formatNumberForMobile(prix)}
                  </span>
                </TableCell>
                {fraisRange.map((taux) => (
                  <TableCell
                    key={`${prix}-${taux}`}
                    className={`text-right ${
                      prix === prixVente && taux === fraisCourtage
                        ? "bg-primary/10 font-bold"
                        : ""
                    }`}
                  >
                    {prix <= 0 || taux <= 0 ? (
                      "-"
                    ) : (
                      <>
                        <span className="hidden md:inline">
                          {Math.ceil(calculateFrais(prix, taux)).toLocaleString(
                            "fr-CA",
                          )}{" "}
                          $
                        </span>
                        <span className="md:hidden">
                          {formatNumberForMobile(calculateFrais(prix, taux))}
                        </span>
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Pour une propriété vendue à{" "}
        <span className="font-semibold">
          {prixVente.toLocaleString("fr-CA")} $
        </span>
        , les frais de courtage à{" "}
        <span className="font-semibold">{fraisCourtage}%</span>, incluant les
        taxes de vente de 15%, seraient de{" "}
        <span className="font-semibold">
          {Math.ceil(calculateFrais(prixVente, fraisCourtage)).toLocaleString(
            "fr-CA",
          )}{" "}
          $
        </span>
        . Compte tenu d&apos;un prix d&apos;achat de{" "}
        <span className="font-semibold">
          {prixAchat.toLocaleString("fr-CA")} $
        </span>
        , ce montant représente{" "}
        <span className="font-semibold">
          {(
            (calculateFrais(prixVente, fraisCourtage) /
              (prixVente - prixAchat)) *
            100
          ).toFixed(1)}
          %
        </span>{" "}
        du gain en capital.
      </div>
    </div>
  );
}
