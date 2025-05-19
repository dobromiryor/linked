import { LAST_YEAR } from "@/constants/last-year.const";
import type { Company } from "@/interfaces/company.interface";

/**
 * @param company - The company to get the profit margin for
 * @param year - The year to get the profit margin for (default: last year)
 * @returns The profit margin for the company in the given year
 */

export const getProfitMargin = (
  company: Company,
  year: number = LAST_YEAR
): number => {
  const yearData = company.financialData.find(
    ({ year: dataYear }) => dataYear === year
  );

  if (!yearData) {
    return 0;
  }

  const { netIncome, revenue } = yearData;

  return (netIncome / revenue) * 100;
};
