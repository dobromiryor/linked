export const COMPANY_SIZES = [
  "Startup",
  "Small",
  "Medium",
  "Large",
  "Enterprise",
] as const;

export const COMPANY_SIZE_FILTER = ["all", ...COMPANY_SIZES] as const;
