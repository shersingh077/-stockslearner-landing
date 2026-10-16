"use client";

import { useState } from "react";
import {
  calculateBrokerage,
  calculateCagr,
  calculateLumpSum,
  calculateMargin,
  calculatePositionSize,
  calculateRetirementCorpus,
  calculateSip,
} from "@/lib/calculators";

type FieldKey =
  | "sipContribution"
  | "sipReturn"
  | "sipMonths"
  | "lumpAmount"
  | "lumpReturn"
  | "lumpYears"
  | "cagrStart"
  | "cagrEnd"
  | "cagrYears"
  | "buyPrice"
  | "sellPrice"
  | "quantity"
  | "brokeragePercent"
  | "positionValue"
  | "marginPercent"
  | "accountCapital"
  | "riskPercent"
  | "entryPrice"
  | "stopLossPrice"
  | "monthlyExpenses"
  | "yearsUntilRetirement"
  | "yearsInRetirement"
  | "inflation"
  | "retirementReturn"
  | "accumulationReturn";

type CalculatorId =
  | "sip"
  | "lump-sum"
  | "cagr"
  | "brokerage"
  | "margin"
  | "position-size"
  | "retirement";

type CalculatorField = {
  key: FieldKey;
  label: string;
  min: number;
  max?: number;
  step?: number;
  unit?: string;
};

type CalculatorDefinition = {
  id: CalculatorId;
  title: string;
  description: string;
  fields: CalculatorField[];
};

const calculators: CalculatorDefinition[] = [
  {
    id: "sip",
    title: "SIP calculator",
    description:
      "Illustrate how regular monthly contributions may accumulate under a hypothetical annual return assumption.",
    fields: [
      { key: "sipContribution", label: "Monthly contribution", min: 0, unit: "₹" },
      { key: "sipReturn", label: "Assumed annual return", min: 0, max: 100, step: 0.1, unit: "%" },
      { key: "sipMonths", label: "Investment period", min: 1, max: 1200, step: 1, unit: "months" },
    ],
  },
  {
    id: "lump-sum",
    title: "Lump-sum calculator",
    description:
      "See a mathematical illustration of one investment compounded annually at an assumed rate.",
    fields: [
      { key: "lumpAmount", label: "Investment amount", min: 0, unit: "₹" },
      { key: "lumpReturn", label: "Assumed annual return", min: 0, max: 100, step: 0.1, unit: "%" },
      { key: "lumpYears", label: "Investment period", min: 0.1, max: 100, step: 0.1, unit: "years" },
    ],
  },
  {
    id: "cagr",
    title: "CAGR calculator",
    description:
      "Calculate the constant annualized growth rate between two positive values over a period.",
    fields: [
      { key: "cagrStart", label: "Starting value", min: 0.01, unit: "₹" },
      { key: "cagrEnd", label: "Ending value", min: 0.01, unit: "₹" },
      { key: "cagrYears", label: "Period", min: 0.1, max: 100, step: 0.1, unit: "years" },
    ],
  },
  {
    id: "brokerage",
    title: "Brokerage estimator",
    description:
      "Estimate percentage-based brokerage for a buy and sell transaction. Other charges and taxes are excluded.",
    fields: [
      { key: "buyPrice", label: "Buy price per share", min: 0.01, unit: "₹" },
      { key: "sellPrice", label: "Sell price per share", min: 0.01, unit: "₹" },
      { key: "quantity", label: "Quantity", min: 1, step: 1, unit: "shares" },
      { key: "brokeragePercent", label: "Brokerage rate", min: 0, max: 100, step: 0.01, unit: "%" },
    ],
  },
  {
    id: "margin",
    title: "Margin estimator",
    description:
      "Estimate the margin amount from a position value and a hypothetical margin percentage.",
    fields: [
      { key: "positionValue", label: "Position value", min: 0.01, unit: "₹" },
      { key: "marginPercent", label: "Margin percentage", min: 0.01, max: 100, step: 0.1, unit: "%" },
    ],
  },
  {
    id: "position-size",
    title: "Position-size calculator",
    description:
      "Estimate a maximum share quantity using account capital, a chosen risk percentage and an entry-to-stop distance.",
    fields: [
      { key: "accountCapital", label: "Account capital", min: 0.01, unit: "₹" },
      { key: "riskPercent", label: "Risk percentage", min: 0.01, max: 100, step: 0.1, unit: "%" },
      { key: "entryPrice", label: "Entry price", min: 0.01, unit: "₹" },
      { key: "stopLossPrice", label: "Stop-loss price", min: 0.01, unit: "₹" },
    ],
  },
  {
    id: "retirement",
    title: "Retirement calculator",
    description:
      "Illustrate a retirement corpus target and monthly contribution using inflation and return assumptions.",
    fields: [
      { key: "monthlyExpenses", label: "Current monthly expenses", min: 1, unit: "₹" },
      { key: "yearsUntilRetirement", label: "Years until retirement", min: 1, max: 70, step: 1, unit: "years" },
      { key: "yearsInRetirement", label: "Years in retirement", min: 1, max: 70, step: 1, unit: "years" },
      { key: "inflation", label: "Assumed annual inflation", min: 0, max: 25, step: 0.1, unit: "%" },
      { key: "retirementReturn", label: "Assumed annual return in retirement", min: 0, max: 50, step: 0.1, unit: "%" },
      { key: "accumulationReturn", label: "Assumed annual return before retirement", min: 0, max: 50, step: 0.1, unit: "%" },
    ],
  },
];

const initialInputs: Record<FieldKey, string> = {
  sipContribution: "5000",
  sipReturn: "12",
  sipMonths: "120",
  lumpAmount: "100000",
  lumpReturn: "12",
  lumpYears: "10",
  cagrStart: "100000",
  cagrEnd: "200000",
  cagrYears: "5",
  buyPrice: "1000",
  sellPrice: "1100",
  quantity: "10",
  brokeragePercent: "0.03",
  positionValue: "100000",
  marginPercent: "20",
  accountCapital: "100000",
  riskPercent: "1",
  entryPrice: "100",
  stopLossPrice: "95",
  monthlyExpenses: "40000",
  yearsUntilRetirement: "30",
  yearsInRetirement: "25",
  inflation: "6",
  retirementReturn: "8",
  accumulationReturn: "10",
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function Calculators() {
  const [activeId, setActiveId] = useState<CalculatorId>("sip");
  const [inputs, setInputs] = useState(initialInputs);
  const activeCalculator =
    calculators.find((calculator) => calculator.id === activeId) ??
    calculators[0];

  function updateInput(key: FieldKey, value: string) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  function calculateResults() {
    if (activeCalculator.fields.some((field) => inputs[field.key].trim() === "")) {
      return null;
    }

    const value = (key: FieldKey) => Number(inputs[key]);

    switch (activeId) {
      case "sip": {
        const result = calculateSip(
          value("sipContribution"),
          value("sipReturn"),
          value("sipMonths"),
        );
        return result
          ? [
              { label: "Estimated future value", value: formatCurrency(result.futureValue) },
              { label: "Total contributions", value: formatCurrency(result.investedAmount) },
              { label: "Illustrative growth", value: formatCurrency(result.estimatedGrowth) },
            ]
          : null;
      }
      case "lump-sum": {
        const result = calculateLumpSum(
          value("lumpAmount"),
          value("lumpReturn"),
          value("lumpYears"),
        );
        return result
          ? [
              { label: "Illustrative future value", value: formatCurrency(result.futureValue) },
              { label: "Initial investment", value: formatCurrency(result.investedAmount) },
              { label: "Illustrative growth", value: formatCurrency(result.estimatedGrowth) },
            ]
          : null;
      }
      case "cagr": {
        const result = calculateCagr(
          value("cagrStart"),
          value("cagrEnd"),
          value("cagrYears"),
        );
        return result === null
          ? null
          : [{ label: "Compound annual growth rate", value: `${formatNumber(result)}%` }];
      }
      case "brokerage": {
        const result = calculateBrokerage(
          value("buyPrice"),
          value("sellPrice"),
          value("quantity"),
          value("brokeragePercent"),
        );
        return result
          ? [
              { label: "Buy + sell turnover", value: formatCurrency(result.turnover) },
              { label: "Estimated brokerage", value: formatCurrency(result.estimatedBrokerage) },
              { label: "Gross profit or loss", value: formatCurrency(result.grossProfitOrLoss) },
              { label: "After estimated brokerage", value: formatCurrency(result.estimatedProfitOrLossAfterBrokerage) },
            ]
          : null;
      }
      case "margin": {
        const result = calculateMargin(
          value("positionValue"),
          value("marginPercent"),
        );
        return result
          ? [
              { label: "Illustrative margin amount", value: formatCurrency(result.requiredMargin) },
              { label: "Position-to-margin ratio", value: `${formatNumber(result.effectiveLeverage)}×` },
            ]
          : null;
      }
      case "position-size": {
        const result = calculatePositionSize(
          value("accountCapital"),
          value("riskPercent"),
          value("entryPrice"),
          value("stopLossPrice"),
        );
        return result
          ? [
              { label: "Amount at risk", value: formatCurrency(result.riskAmount) },
              { label: "Maximum estimated quantity", value: `${formatNumber(result.quantity)} shares` },
              { label: "Estimated position value", value: formatCurrency(result.positionValue) },
            ]
          : null;
      }
      case "retirement": {
        const result = calculateRetirementCorpus(
          value("monthlyExpenses"),
          value("yearsUntilRetirement"),
          value("yearsInRetirement"),
          value("inflation"),
          value("retirementReturn"),
          value("accumulationReturn"),
        );
        return result
          ? [
              { label: "Estimated monthly expense at retirement", value: formatCurrency(result.monthlyExpenseAtRetirement) },
              { label: "Illustrative target corpus", value: formatCurrency(result.targetCorpus) },
              { label: "Illustrative monthly contribution", value: formatCurrency(result.monthlyContribution) },
            ]
          : null;
    }
  }
  }

  const results = calculateResults();

  return (
    <section className="mt-10">
      <div
        aria-label="Calculator type"
        className="flex gap-3 overflow-x-auto pb-3"
      >
        {calculators.map((calculator) => (
          <button
            key={calculator.id}
            type="button"
            aria-pressed={activeId === calculator.id}
            onClick={() => setActiveId(calculator.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeId === calculator.id
                ? "border-sky-400 bg-sky-400 text-slate-950"
                : "border-slate-700 text-slate-300 hover:border-sky-400"
            }`}
          >
            {calculator.title}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
          <h2 className="text-2xl font-bold">{activeCalculator.title}</h2>
          <p className="mt-2 leading-7 text-slate-300">
            {activeCalculator.description}
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {activeCalculator.fields.map((field) => (
              <label
                key={field.key}
                htmlFor={`calculator-${field.key}`}
                className="block text-sm font-medium text-slate-200"
              >
                {field.label}
                {field.unit && (
                  <span className="ml-1 text-slate-400">({field.unit})</span>
                )}
                <input
                  id={`calculator-${field.key}`}
                  type="number"
                  inputMode="decimal"
                  min={field.min}
                  max={field.max}
                  step={field.step ?? "any"}
                  value={inputs[field.key]}
                  onChange={(event) =>
                    updateInput(field.key, event.currentTarget.value)
                  }
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-base text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                />
              </label>
            ))}
          </div>
        </div>

        <aside
          aria-live="polite"
          className="rounded-2xl border border-sky-400/30 bg-sky-400/5 p-5 sm:p-7"
        >
          <h2 className="text-xl font-bold">Illustrative results</h2>
          {results ? (
            <dl className="mt-5 space-y-4">
              {results.map((result) => (
                <div
                  key={result.label}
                  className="flex flex-col gap-1 border-b border-slate-700 pb-3"
                >
                  <dt className="text-sm text-slate-300">{result.label}</dt>
                  <dd className="text-lg font-bold text-white">
                    {result.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-5 text-sm leading-6 text-amber-200">
              Enter valid values within the displayed limits. For position size,
              the risk budget must cover at least one share at the chosen stop
              distance.
            </p>
          )}
          <p className="mt-5 text-xs leading-5 text-slate-400">
            Results are mathematical illustrations based on your inputs. Actual
            outcomes, fees and taxes may differ; no returns are assured.
          </p>
        </aside>
      </div>
    </section>
  );
}
