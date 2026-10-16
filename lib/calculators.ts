export type SipResult = {
  futureValue: number;
  investedAmount: number;
  estimatedGrowth: number;
};

export function calculateSip(
  monthlyContribution: number,
  annualReturnPercent: number,
  months: number,
): SipResult | null {
  if (
    !Number.isFinite(monthlyContribution) ||
    monthlyContribution < 0 ||
    !Number.isFinite(annualReturnPercent) ||
    annualReturnPercent < 0 ||
    annualReturnPercent > 100 ||
    !Number.isInteger(months) ||
    months < 1 ||
    months > 1200
  ) {
    return null;
  }

  const monthlyRate = annualReturnPercent / 100 / 12;
  const investedAmount = monthlyContribution * months;
  const futureValue =
    monthlyRate === 0
      ? investedAmount
      : monthlyContribution *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  if (!Number.isFinite(futureValue)) return null;

  return {
    futureValue,
    investedAmount,
    estimatedGrowth: futureValue - investedAmount,
  };
}

export type LumpSumResult = {
  futureValue: number;
  investedAmount: number;
  estimatedGrowth: number;
};

export function calculateLumpSum(
  investmentAmount: number,
  annualReturnPercent: number,
  years: number,
): LumpSumResult | null {
  if (
    !Number.isFinite(investmentAmount) ||
    investmentAmount < 0 ||
    !Number.isFinite(annualReturnPercent) ||
    annualReturnPercent < 0 ||
    annualReturnPercent > 100 ||
    !Number.isFinite(years) ||
    years <= 0 ||
    years > 100
  ) {
    return null;
  }

  const futureValue =
    investmentAmount * Math.pow(1 + annualReturnPercent / 100, years);
  if (!Number.isFinite(futureValue)) return null;

  return {
    futureValue,
    investedAmount: investmentAmount,
    estimatedGrowth: futureValue - investmentAmount,
  };
}

export function calculateCagr(
  startingValue: number,
  endingValue: number,
  years: number,
): number | null {
  if (
    !Number.isFinite(startingValue) ||
    startingValue <= 0 ||
    !Number.isFinite(endingValue) ||
    endingValue <= 0 ||
    !Number.isFinite(years) ||
    years <= 0 ||
    years > 100
  ) {
    return null;
  }

  const cagr = (Math.pow(endingValue / startingValue, 1 / years) - 1) * 100;
  return Number.isFinite(cagr) ? cagr : null;
}

export type BrokerageResult = {
  turnover: number;
  estimatedBrokerage: number;
  grossProfitOrLoss: number;
  estimatedProfitOrLossAfterBrokerage: number;
};

export function calculateBrokerage(
  buyPrice: number,
  sellPrice: number,
  quantity: number,
  brokeragePercent: number,
): BrokerageResult | null {
  if (
    !Number.isFinite(buyPrice) ||
    buyPrice <= 0 ||
    !Number.isFinite(sellPrice) ||
    sellPrice <= 0 ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    !Number.isFinite(brokeragePercent) ||
    brokeragePercent < 0 ||
    brokeragePercent > 100
  ) {
    return null;
  }

  const turnover = (buyPrice + sellPrice) * quantity;
  const estimatedBrokerage = (turnover * brokeragePercent) / 100;
  const grossProfitOrLoss = (sellPrice - buyPrice) * quantity;
  const estimatedProfitOrLossAfterBrokerage =
    grossProfitOrLoss - estimatedBrokerage;

  if (
    !Number.isFinite(turnover) ||
    !Number.isFinite(estimatedBrokerage) ||
    !Number.isFinite(estimatedProfitOrLossAfterBrokerage)
  ) {
    return null;
  }

  return {
    turnover,
    estimatedBrokerage,
    grossProfitOrLoss,
    estimatedProfitOrLossAfterBrokerage,
  };
}

export type MarginResult = {
  requiredMargin: number;
  effectiveLeverage: number;
};

export function calculateMargin(
  positionValue: number,
  marginPercent: number,
): MarginResult | null {
  if (
    !Number.isFinite(positionValue) ||
    positionValue <= 0 ||
    !Number.isFinite(marginPercent) ||
    marginPercent <= 0 ||
    marginPercent > 100
  ) {
    return null;
  }

  return {
    requiredMargin: (positionValue / 100) * marginPercent,
    effectiveLeverage: 100 / marginPercent,
  };
}

export type PositionSizeResult = {
  riskAmount: number;
  quantity: number;
  positionValue: number;
};

export function calculatePositionSize(
  accountCapital: number,
  riskPercent: number,
  entryPrice: number,
  stopLossPrice: number,
): PositionSizeResult | null {
  if (
    !Number.isFinite(accountCapital) ||
    accountCapital <= 0 ||
    !Number.isFinite(riskPercent) ||
    riskPercent <= 0 ||
    riskPercent > 100 ||
    !Number.isFinite(entryPrice) ||
    entryPrice <= 0 ||
    !Number.isFinite(stopLossPrice) ||
    stopLossPrice <= 0 ||
    entryPrice === stopLossPrice
  ) {
    return null;
  }

  const riskAmount = (accountCapital * riskPercent) / 100;
  const riskPerShare = Math.abs(entryPrice - stopLossPrice);
  const quantity = Math.floor(riskAmount / riskPerShare);
  const positionValue = quantity * entryPrice;

  if (quantity < 1 || !Number.isFinite(positionValue)) return null;

  return { riskAmount, quantity, positionValue };
}

export type RetirementResult = {
  monthlyExpenseAtRetirement: number;
  targetCorpus: number;
  monthlyContribution: number;
};

export function calculateRetirementCorpus(
  currentMonthlyExpenses: number,
  yearsUntilRetirement: number,
  yearsInRetirement: number,
  annualInflationPercent: number,
  annualReturnDuringRetirementPercent: number,
  annualAccumulationReturnPercent: number,
): RetirementResult | null {
  const inputs = [
    currentMonthlyExpenses,
    yearsUntilRetirement,
    yearsInRetirement,
    annualInflationPercent,
    annualReturnDuringRetirementPercent,
    annualAccumulationReturnPercent,
  ];

  if (
    inputs.some((value) => !Number.isFinite(value)) ||
    currentMonthlyExpenses <= 0 ||
    yearsUntilRetirement < 1 ||
    yearsUntilRetirement > 70 ||
    yearsInRetirement < 1 ||
    yearsInRetirement > 70 ||
    annualInflationPercent < 0 ||
    annualInflationPercent > 25 ||
    annualReturnDuringRetirementPercent < 0 ||
    annualReturnDuringRetirementPercent > 50 ||
    annualAccumulationReturnPercent < 0 ||
    annualAccumulationReturnPercent > 50
  ) {
    return null;
  }

  const inflationRate = annualInflationPercent / 100;
  const retirementReturnRate = annualReturnDuringRetirementPercent / 100;
  const monthlyExpenseAtRetirement =
    currentMonthlyExpenses * Math.pow(1 + inflationRate, yearsUntilRetirement);
  const firstYearRetirementExpense = monthlyExpenseAtRetirement * 12;
  const years = yearsInRetirement;
  const targetCorpus =
    retirementReturnRate === inflationRate
      ? (firstYearRetirementExpense * years) / (1 + retirementReturnRate)
      : (firstYearRetirementExpense / (retirementReturnRate - inflationRate)) *
        (1 -
          Math.pow(
            (1 + inflationRate) / (1 + retirementReturnRate),
            years,
          ));

  const monthsUntilRetirement = yearsUntilRetirement * 12;
  const monthlyAccumulationRate = annualAccumulationReturnPercent / 100 / 12;
  const monthlyContribution =
    monthlyAccumulationRate === 0
      ? targetCorpus / monthsUntilRetirement
      : (targetCorpus * monthlyAccumulationRate) /
        (Math.pow(1 + monthlyAccumulationRate, monthsUntilRetirement) - 1);

  if (
    !Number.isFinite(monthlyExpenseAtRetirement) ||
    !Number.isFinite(targetCorpus) ||
    !Number.isFinite(monthlyContribution)
  ) {
    return null;
  }

  return {
    monthlyExpenseAtRetirement,
    targetCorpus,
    monthlyContribution,
  };
}
