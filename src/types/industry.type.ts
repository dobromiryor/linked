import type { INDUSTRIES, INDUSTRY_FILTER } from "@/constants/industries.const";

export type Industry = (typeof INDUSTRIES)[number];

export type IndustryFilter = (typeof INDUSTRY_FILTER)[number];
