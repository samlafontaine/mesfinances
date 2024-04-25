import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MortgageCalculator: React.FC = () => {
  const [mortgageAmount, setMortgageAmount] = useState<string>("");
  const handleMortgageAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, "");
    if (value !== "" && !value.startsWith("$")) {
      value = value + "$";
    }
    setMortgageAmount(value);
  };

  const [interestRate, setInterestRate] = useState<string>("");
  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, "");
    if (value !== "" && !value.endsWith("%")) {
      value = value + "%";
    }
    setInterestRate(value);
  };

  const [totalInterest, setTotalInterest] = useState<number>(0);

  const [years, setYears] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [resultList, setResultList] = useState<
    Array<{
      month: number;
      principal: number;
      interest: number;
      mortgageRemaining: number;
    }>
  >([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const calculate = () => {
    const mortgage = parseFloat(mortgageAmount);
    const interestRateDecimal = parseFloat(interestRate) / 100;
    const monthlyInterestRate = interestRateDecimal / 12;
    const periods = parseFloat(years) * 12;
    const monthlyPaymentCalc =
      (mortgage *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, periods)) /
      (Math.pow(1 + monthlyInterestRate, periods) - 1);
    setMonthlyPayment(Number(monthlyPaymentCalc.toFixed(2)));

    const resultListItems: Array<{
      month: number;
      principal: number;
      interest: number;
      mortgageRemaining: number;
    }> = [];
    let remainingMortgage = mortgage;
    let totalInterestCalc = 0;
    for (let i = 0; i < periods; i++) {
      const interestPayment = remainingMortgage * monthlyInterestRate;
      const principalPayment = monthlyPaymentCalc - interestPayment;
      totalInterestCalc += interestPayment;
      resultListItems.push({
        month: i + 1,
        principal: principalPayment,
        interest: interestPayment,
        mortgageRemaining: remainingMortgage - principalPayment,
      });
      remainingMortgage -= principalPayment;
    }
    setResultList(resultListItems);
    setShowResults(true);
    setTotalInterest(Number(totalInterestCalc.toFixed(2)));
  };

  const reload = () => {
    setMortgageAmount("");
    setInterestRate("");
    setYears("");
    setMonthlyPayment(0);
    setResultList([]);
    setShowResults(false);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4 tracking-tighter">Mortgage Calculator 🏡</h1>
      <p className="prose prose-neutral mb-8 dark:prose-invert">
        See your mortgage payment schedule
      </p>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-2 mb-8 md:grid-cols-3 md:gap-6">
          <Input
            type="text"
            placeholder="Mortgage Amount"
            value={mortgageAmount}
            onChange={handleMortgageAmountChange}
          />
          <Input
            type="text"
            placeholder="Interest Rate"
            value={interestRate}
            onChange={handleInterestRateChange}
          />
          <Input
            type="number"
            placeholder="Number of Years"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        <Button type="submit" onClick={calculate}>
          Calculate
        </Button>
        <Button variant="outline" type="submit" onClick={reload}>
          Restart
        </Button>
      </div>

      {showResults && (
        <div className="mt-8">
          <span className="flex justify-center mb-2">
            Monthly Payment:{" "}
            <span className="text-blue-800 bg-blue-100 dark:text-white dark:bg-blue-500 px-1.5 rounded ml-1">
              {" "}
              {monthlyPayment}$
            </span>
          </span>
          <span className="flex justify-center">
            Total Interest Paid:{" "}
            <span className="text-red-800 bg-red-100 dark:text-white dark:bg-red-500 px-1.5 rounded ml-1">
              {" "}
              {totalInterest}$
            </span>
          </span>
          <Table className="w-full table-auto mt-8">
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Month</TableHead>
                <TableHead className="text-center">Capital Paid</TableHead>
                <TableHead className="text-center">Interest Paid</TableHead>
                <TableHead className="text-center">
                  Mortgage Remaining
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultList.map((item, index) => (
                <TableRow>
                  <TableCell className="font-medium text-center">
                    Month {index + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.principal.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.interest.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.mortgageRemaining.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
