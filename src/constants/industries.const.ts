export const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Energy",
  "Automotive",
  "Telecommunications",
  "Pharmaceuticals",
  "Consulting",
  "Education",
  "Real Estate",
  "Media",
  "Logistics",
  "Aerospace",
] as const;

export const INDUSTRY_FILTER = ["all", ...INDUSTRIES] as const;
