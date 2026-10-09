export type FilingStatus = "single" | "married";

interface Bracket {
  upTo: number;
  rate: number;
}

const BRACKETS_2026: Record<FilingStatus, Bracket[]> = {
  single: [
    { upTo: 12_400, rate: 0.1 },
    { upTo: 50_400, rate: 0.12 },
    { upTo: 105_700, rate: 0.22 },
    { upTo: 201_775, rate: 0.24 },
    { upTo: 256_225, rate: 0.32 },
    { upTo: 640_600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  married: [
    { upTo: 24_800, rate: 0.1 },
    { upTo: 100_800, rate: 0.12 },
    { upTo: 211_400, rate: 0.22 },
    { upTo: 403_550, rate: 0.24 },
    { upTo: 512_450, rate: 0.32 },
    { upTo: 768_700, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

const STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 16_100,
  married: 32_200,
};

const SOCIAL_SECURITY_WAGE_BASE_2026 = 184_500;

export const QUARTERLY_DUE_DATES_2026 = ["2026-04-15", "2026-06-15", "2026-09-15", "2027-01-15"] as const;

export interface QuarterlyEstimate {
  netIncome: number;
  seTax: number;
  incomeTax: number;
  annualTotal: number;
  perQuarter: number;
  effectiveRate: number;
}

function progressiveTax(taxable: number, status: FilingStatus): number {
  let tax = 0;
  let floor = 0;
  for (const bracket of BRACKETS_2026[status]) {
    if (taxable <= floor) break;
    tax += (Math.min(taxable, bracket.upTo) - floor) * bracket.rate;
    floor = bracket.upTo;
  }
  return tax;
}

export function estimateQuarterly(income: number, expenses: number, status: FilingStatus): QuarterlyEstimate {
  const netIncome = Math.max(income - expenses, 0);
  const seBase = netIncome * 0.9235;
  const seTax =
    seBase < 400 ? 0 : Math.min(seBase, SOCIAL_SECURITY_WAGE_BASE_2026) * 0.124 + seBase * 0.029;
  const taxable = Math.max(netIncome - seTax / 2 - STANDARD_DEDUCTION_2026[status], 0);
  const incomeTax = progressiveTax(taxable, status);
  const annualTotal = Math.round(seTax + incomeTax);
  return {
    netIncome,
    seTax: Math.round(seTax),
    incomeTax: Math.round(incomeTax),
    annualTotal,
    perQuarter: Math.round(annualTotal / 4),
    effectiveRate: netIncome > 0 ? annualTotal / netIncome : 0,
  };
}
