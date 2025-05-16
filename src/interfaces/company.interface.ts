import type { Industry } from "@/types/industry.type";

export interface Company {
  id: number;
  name: string;
  country: string;
  industry: Industry;
  foundedYear: number;
}
