import { COMPANY_NAME_PREFIXES } from "@/constants/company-name-prefixes.const";
import { COMPANY_NAME_SUFFIXES } from "@/constants/company-name-suffixes.const";
import { COMPANY_SIZES } from "@/constants/company-sizes.const";
import { COMPANY_TYPES } from "@/constants/company-types.const";
import { COUNTRIES } from "@/constants/countries.const";
import { FOUNDED_YEAR_MAX } from "@/constants/founded-year-max.const";
import { FOUNDED_YEAR_MIN } from "@/constants/founded-year-min.const";
import { INCOME_VARIATION } from "@/constants/income-variation.const";
import { INDUSTRIES } from "@/constants/industries.const";
import { LAST_YEAR } from "@/constants/last-year.const";
import { MAX_REVENUE } from "@/constants/max-revenue.const";
import { MIN_REVENUE } from "@/constants/min-revenue.const";
import { NUMBER_OF_COMPANIES } from "@/constants/number-of-companies.const";
import type { Company, CompanyMockData } from "@/interfaces/company.interface";
import type { CompanyDetailsMockData } from "@/interfaces/compnay-details.interface";
import type { FinancialDataMockData } from "@/interfaces/financial-data.interface";

let companyIdCounter = 0;
const incrementCompanyIdCounter = () => ++companyIdCounter;

const getRandomElement = <T>(array: readonly T[]) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const companies: CompanyMockData[] = [];

export const companyDetails: CompanyDetailsMockData[] = [];

export const financialData: FinancialDataMockData[] = [];

/* Generate companies */
for (let i = 0; i < NUMBER_OF_COMPANIES; i++) {
  const companyId = incrementCompanyIdCounter();
  const foundedYear = getRandomNumber(FOUNDED_YEAR_MIN, FOUNDED_YEAR_MAX);
  const companyCountry = getRandomElement(COUNTRIES);
  const companyCity = getRandomElement(companyCountry.cities);

  companies.push({
    id: companyId,
    name: `${getRandomElement(COMPANY_NAME_PREFIXES)} ${getRandomElement(
      COMPANY_NAME_SUFFIXES
    )}`,
    country: companyCountry.name,
    industry: getRandomElement(INDUSTRIES),
    foundedYear,
  });

  companyDetails.push({
    companyId,
    companyType: getRandomElement(COMPANY_TYPES),
    size: getRandomElement(COMPANY_SIZES),
    ceoName: `${getRandomElement(companyCountry.firstNames)} ${getRandomElement(
      companyCountry.lastNames
    )}`,
    headquarters: companyCity,
  });

  /* Generate financial data for each company from founded year to current year */
  for (let year = foundedYear; year <= LAST_YEAR; year++) {
    const revenue = getRandomNumber(MIN_REVENUE, MAX_REVENUE);
    const netIncome = getRandomNumber(
      Math.floor(revenue * -INCOME_VARIATION),
      Math.floor(revenue * INCOME_VARIATION)
    );

    financialData.push({
      companyId,
      year,
      revenue,
      netIncome,
    });
  }
}

export const getJoinedCompanyData = (): Company[] =>
  companies.map((company) => {
    const details = companyDetails.find(
      (detail) => detail.companyId === company.id
    )!;

    const finances = financialData.filter(
      (data) => data.companyId === company.id
    );

    return {
      ...company,
      companyDetails: details,
      financialData: finances,
    };
  });
