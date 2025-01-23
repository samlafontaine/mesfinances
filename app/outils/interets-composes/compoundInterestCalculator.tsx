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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export default function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [contribution, setContribution] = useState<number>(100);
  const [contributionFrequency, setContributionFrequency] = useState<
    "mensuel" | "annuel"
  >("mensuel");
  const [interestRate, setInterestRate] = useState<number>(5);
  const [years, setYears] = useState<number>(10);

  const calculateGrowth = () => {
    const data = [];
    let balance = initialAmount;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyContribution =
      contributionFrequency === "mensuel" ? contribution : contribution / 12;

    for (let year = 0; year <= years; year++) {
      data.push({
        year,
        balance: Math.round(balance),
      });

      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }
    }

    return data;
  };

  const data = calculateGrowth();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">
        Calculatrice d&apos;intérêts composés
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="initial">Montant de départ ($)</Label>
            <Input
              id="initial"
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contribution">Contribution ($)</Label>
            <Input
              id="contribution"
              type="number"
              value={contribution}
              onChange={(e) => setContribution(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Fréquence de contribution</Label>
            <Select
              value={contributionFrequency}
              onValueChange={(value: "mensuel" | "annuel") =>
                setContributionFrequency(value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner la fréquence" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="mensuel">Mensuel</SelectItem>
                <SelectItem value="annuel">Annuel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Taux d&apos;intérêt annuel (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Horizon de placement (années)</Label>
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>
        </Card>

        <Card className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                label={{
                  value: "Années",
                  position: "insideBottom",
                  offset: -20,
                }}
              />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Montant",
                ]}
                labelFormatter={(label) => `Année ${label}`}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
