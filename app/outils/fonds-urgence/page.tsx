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
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// --- Helpers ---
const fmt = (n: number) => Math.round(n).toLocaleString("fr-CA") + " $";

// --- Composant ---
export default function FondsUrgence() {
  // Dépenses mensuelles
  const [loyer, setLoyer] = useState<number>(1500);
  const [epicerie, setEpicerie] = useState<number>(600);
  const [transport, setTransport] = useState<number>(400);
  const [assurances, setAssurances] = useState<number>(200);
  const [telecom, setTelecom] = useState<number>(150);
  const [electricite, setElectricite] = useState<number>(100);
  const [autres, setAutres] = useState<number>(200);

  // Situation personnelle
  const [emploi, setEmploi] = useState<"stable" | "contractuel" | "autonome">(
    "stable",
  );
  const [personnesACharge, setPersonnesACharge] = useState<"0" | "1-2" | "3+">(
    "0",
  );
  const [proprietaire, setProprietaire] = useState<"non" | "oui">("non");

  // Ajustement manuel
  const [moisManuel, setMoisManuel] = useState<number | null>(null);

  // Calcul total dépenses
  const depensesTotal =
    loyer + epicerie + transport + assurances + telecom + electricite + autres;

  // Calcul mois recommandé
  const moisBase =
    emploi === "stable" ? 3 : emploi === "contractuel" ? 6 : 9;
  const bonusCharge =
    personnesACharge === "0" ? 0 : personnesACharge === "1-2" ? 1 : 2;
  const bonusProprio = proprietaire === "oui" ? 1 : 0;
  const moisRecommande = Math.min(12, moisBase + bonusCharge + bonusProprio);

  const moisUtilise = moisManuel !== null ? moisManuel : moisRecommande;
  const montantCible = depensesTotal * moisUtilise;
  const epargneMensuelle12Mois = montantCible / 12;

  // Explication de la recommandation
  const getExplication = () => {
    const parts: string[] = [];
    if (emploi === "stable") parts.push("emploi stable (3 mois de base)");
    else if (emploi === "contractuel")
      parts.push("emploi contractuel (6 mois de base)");
    else parts.push("travailleur autonome (9 mois de base)");

    if (bonusCharge > 0)
      parts.push(
        `${bonusCharge} mois additionnel${bonusCharge > 1 ? "s" : ""} pour personnes à charge`,
      );
    if (bonusProprio > 0) parts.push("1 mois additionnel pour propriétaire");

    return parts.join(" + ");
  };

  const depenses = [
    {
      id: "loyer",
      label: "Loyer / Hypothèque",
      value: loyer,
      setter: setLoyer,
    },
    { id: "epicerie", label: "Épicerie", value: epicerie, setter: setEpicerie },
    {
      id: "transport",
      label: "Transport (auto, essence, etc.)",
      value: transport,
      setter: setTransport,
    },
    {
      id: "assurances",
      label: "Assurances (auto, habitation, vie)",
      value: assurances,
      setter: setAssurances,
    },
    {
      id: "telecom",
      label: "Téléphone et internet",
      value: telecom,
      setter: setTelecom,
    },
    {
      id: "electricite",
      label: "Électricité et chauffage",
      value: electricite,
      setter: setElectricite,
    },
    {
      id: "autres",
      label: "Autres dépenses essentielles",
      value: autres,
      setter: setAutres,
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="w-full flex flex-col items-center mb-12">
        <h1 className="text-2xl md:text-3xl tracking-tighter md:leading-snug font-semibold mb-2 text-center">
          Calculateur de fonds d&apos;urgence 🛟
        </h1>
        <p className="prose prose-neutral dark:prose-invert text-center">
          Détermine le montant idéal de ton fonds d&apos;urgence selon tes
          dépenses et ta situation.
        </p>
      </div>

      {/* Dépenses mensuelles */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Dépenses mensuelles essentielles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {depenses.map((dep) => (
            <div key={dep.id} className="space-y-2">
              <Label htmlFor={dep.id}>{dep.label} ($)</Label>
              <Input
                id={dep.id}
                type="number"
                value={dep.value || ""}
                onChange={(e) => dep.setter(Number(e.target.value))}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-secondary rounded-md flex justify-between items-center">
          <span className="font-semibold">Total mensuel</span>
          <span className="text-lg font-bold">{fmt(depensesTotal)}</span>
        </div>
      </Card>

      {/* Situation personnelle */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Ta situation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="emploi">Stabilité d&apos;emploi</Label>
            <Select
              value={emploi}
              onValueChange={(v: "stable" | "contractuel" | "autonome") => {
                setEmploi(v);
                setMoisManuel(null);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stable">
                  Emploi stable (salarié permanent)
                </SelectItem>
                <SelectItem value="contractuel">
                  Contractuel / temporaire
                </SelectItem>
                <SelectItem value="autonome">Travailleur autonome</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="personnes">Personnes à charge</Label>
            <Select
              value={personnesACharge}
              onValueChange={(v: "0" | "1-2" | "3+") => {
                setPersonnesACharge(v);
                setMoisManuel(null);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Aucune</SelectItem>
                <SelectItem value="1-2">1 à 2</SelectItem>
                <SelectItem value="3+">3 ou plus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proprio">Propriétaire</Label>
            <Select
              value={proprietaire}
              onValueChange={(v: "non" | "oui") => {
                setProprietaire(v);
                setMoisManuel(null);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="non">Non (locataire)</SelectItem>
                <SelectItem value="oui">Oui</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Résultat */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Recommandation</h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                Dépenses mensuelles totales
              </TableCell>
              <TableCell className="text-right">{fmt(depensesTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Mois recommandés
              </TableCell>
              <TableCell className="text-right">
                {moisRecommande} mois
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <p className="text-sm text-muted-foreground">
                  {getExplication()}
                </p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <div className="space-y-2">
                  <span>Nombre de mois (ajustable)</span>
                  <Input
                    type="number"
                    min={1}
                    max={24}
                    value={moisUtilise}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v >= 1 && v <= 24) setMoisManuel(v);
                    }}
                    className="w-24"
                  />
                </div>
              </TableCell>
              <TableCell className="text-right align-top">
                {moisUtilise} mois
                {moisManuel !== null && moisManuel !== moisRecommande && (
                  <button
                    onClick={() => setMoisManuel(null)}
                    className="block text-sm text-blue-600 hover:underline mt-1"
                  >
                    Revenir à la recommandation
                  </button>
                )}
              </TableCell>
            </TableRow>
            <TableRow className="border-t-2 bg-primary/5">
              <TableCell className="font-bold text-lg">
                Fonds d&apos;urgence cible
              </TableCell>
              <TableCell className="text-right font-bold text-lg">
                {fmt(montantCible)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Épargne mensuelle suggérée (objectif 12 mois)
              </TableCell>
              <TableCell className="text-right">
                {fmt(epargneMensuelle12Mois)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Note */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="font-semibold mb-2">Qu&apos;est-ce qu&apos;un fonds d&apos;urgence?</h3>
        <p className="text-sm text-muted-foreground">
          Un fonds d&apos;urgence est une réserve d&apos;argent facilement
          accessible, destinée à couvrir tes dépenses essentielles en cas
          d&apos;imprévu : perte d&apos;emploi, maladie, réparation majeure,
          etc. Il devrait être conservé dans un compte à intérêt élevé (comme un
          CELI) et ne pas être investi dans des placements à risque.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Règle générale :</strong> 3 mois pour un salarié permanent sans
          personne à charge, 6 mois pour une situation intermédiaire, et 9 à 12
          mois pour un travailleur autonome ou une famille avec plusieurs
          dépendants.
        </p>
      </div>
    </div>
  );
}
