export const COMPANY_TYPES = [
  "Public",
  "Private",
  "Non-profit",
  "Subsidiary",
  "Startup",
] as const;

export const COMPANY_TYPE_FILTER = ["all", ...COMPANY_TYPES] as const;
