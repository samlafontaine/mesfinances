"use client";
import React, { useState } from 'react';
import { Heading } from "../../../components/Heading";

const MortgageCalculator = () => {
    const [mortgageAmount, setMortgageAmount] = useState('');
    const handleMortgageAmountChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9.]/g, '');
        if (value !== '' && !value.startsWith('$')) {
            value = value + '$';
        }
        setMortgageAmount(value);
    };
    const [interestRate, setInterestRate] = useState('');
    const handleInterestRateChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9.]/g, '');
        if (value !== '' && !value.endsWith('%')) {
            value = value + '%';
        }
        setInterestRate(value);
    };
    const [years, setYears] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [resultList, setResultList] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const calculate = () => {
        const mortgage = parseFloat(mortgageAmount);
        const interestRateDecimal = parseFloat(interestRate) / 100;
        const monthlyInterestRate = interestRateDecimal / 12;
        const periods = years * 12;
        const monthlyPaymentCalc =
            (mortgage * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, periods)) /
            (Math.pow(1 + monthlyInterestRate, periods) - 1);
        setMonthlyPayment(monthlyPaymentCalc.toFixed(2));

        const resultListItems = [];
        let remainingMortgage = mortgage;
        for (let i = 0; i < periods; i++) {
            const interestPayment = remainingMortgage * monthlyInterestRate;
            const principalPayment = monthlyPaymentCalc - interestPayment;
            resultListItems.push({
                month: i + 1,
                principal: principalPayment,
                interest: interestPayment,
                mortgageRemaining: remainingMortgage - principalPayment
            });
            remainingMortgage -= principalPayment;
        }
        setResultList(resultListItems);
        setShowResults(true);
    };

    const reload = () => {
        setMortgageAmount('');
        setInterestRate('');
        setYears('');
        setMonthlyPayment(0);
        setResultList([]);
        setShowResults(false);
    };

    return (
        <>
        <div className="text-center font-sans">
            <h1 className="mb-3 mt-8 text-2xl font-sans font-semibold tracking-tighter text-slate-800 md:text-4xl">Calculez votre échéancier de remboursement de prêt hypothécaire</h1>
            <div className='flex justify-center'>
            <p className='mb-3 mt-3 font-sans text-slate-400 text-lg w-3/4'>Voyez combien d'intérêts et de capital vous remboursez à chaque mois. Cette calculatrice est basée sur un taux d'intérêt annuel et des remboursements mensuels.</p>
            </div>
            <div className="text-center">
                <div className="flex justify-center space-x-4 mb-8 mt-8">
                    <div className="col-sm-4">
                        <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6 font-sans"
                            placeholder="Hypothèque"
                            value={mortgageAmount}
                            onChange={handleMortgageAmountChange}
                        />
                    </div>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6 font-sans"
                            placeholder="Taux d'intérêt"
                            value={interestRate}
                            onChange={handleInterestRateChange}
                        />
                    </div>
                    <div className="col-sm-4">
                        <input
                            type="number"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6 font-sans"
                            placeholder="Années"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="text-center mb-6">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full font-sans mr-1" onClick={calculate}>
                    Calculer
                </button>
                <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full font-sans" onClick={reload}>
                    Rafraîchir
                </button>
            </div>

            {showResults && (
                <div className="text-center">
                    <span className="text-center text-xl font-sans">Paiement mensuel: <span className="font-sans underline decoration-blue-500">{monthlyPayment}$</span></span> <br /><br />
                    <div>
                        <table className="w-full">
                        <thead className="not-prose relative bg-slate-100 rounded-xl overflow-hidden dark:bg-slate-800/25">
                            <tr>
                                <th className="font-sans border border-slate-300">Mois</th>
                                <th className="font-sans border border-slate-300">Capital Payé</th>
                                <th className="font-sans border border-slate-300">Intérêts payés</th>
                                <th className="font-sans border border-slate-300">Hypothèque Restante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultList.map((item, index) => (
                                <tr key={index}>
                                    <td className="font-sans border border-slate-300">Mois {index + 1}</td>
                                    <td className="font-sans border border-slate-300">{item.principal.toFixed(2)}</td>
                                    <td className="font-sans border border-slate-300">{item.interest.toFixed(2)}</td>
                                    <td className="font-sans border border-slate-300">{item.mortgageRemaining.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
        </>
        
    );
};

export default MortgageCalculator;