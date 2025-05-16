import {
  CH_FIRST_NAMES,
  CN_FIRST_NAMES,
  DE_FIRST_NAMES,
  EN_FIRST_NAMES,
  ES_FIRST_NAMES,
  FR_FIRST_NAMES,
  IN_FIRST_NAMES,
  IT_FIRST_NAMES,
  JP_FIRST_NAMES,
  KR_FIRST_NAMES,
  NL_FIRST_NAMES,
  PT_FIRST_NAMES,
  SE_FIRST_NAMES,
} from "@/constants/first-names.const";
import {
  CH_LAST_NAMES,
  CN_LAST_NAMES,
  DE_LAST_NAMES,
  EN_LAST_NAMES,
  ES_LAST_NAMES,
  FR_LAST_NAMES,
  IN_LAST_NAMES,
  IT_LAST_NAMES,
  JP_LAST_NAMES,
  KR_LAST_NAMES,
  NL_LAST_NAMES,
  PT_LAST_NAMES,
  SE_LAST_NAMES,
} from "@/constants/last-names.const";

interface Country {
  name: string;
  cities: string[];
  firstNames: string[];
  lastNames: string[];
}

export const COUNTRIES: Country[] = [
  {
    name: "USA",
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    firstNames: EN_FIRST_NAMES,
    lastNames: EN_LAST_NAMES,
  },
  {
    name: "Canada",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Edmonton"],
    firstNames: EN_FIRST_NAMES,
    lastNames: EN_LAST_NAMES,
  },
  {
    name: "UK",
    cities: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool"],
    firstNames: EN_FIRST_NAMES,
    lastNames: EN_LAST_NAMES,
  },
  {
    name: "Australia",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    firstNames: EN_FIRST_NAMES,
    lastNames: EN_LAST_NAMES,
  },
  {
    name: "Sweden",
    cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Linköping"],
    firstNames: SE_FIRST_NAMES,
    lastNames: SE_LAST_NAMES,
  },
  {
    name: "Netherlands",
    cities: ["Amsterdam", "Rotterdam", "Utrecht", "Eindhoven", "Groningen"],
    firstNames: NL_FIRST_NAMES,
    lastNames: NL_LAST_NAMES,
  },
  {
    name: "France",
    cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux"],
    firstNames: FR_FIRST_NAMES,
    lastNames: FR_LAST_NAMES,
  },
  {
    name: "Germany",
    cities: ["Berlin", "Hamburg", "Munich", "Cologne", "Dortmund"],
    firstNames: DE_FIRST_NAMES,
    lastNames: DE_LAST_NAMES,
  },
  {
    name: "Italy",
    cities: ["Rome", "Milan", "Naples", "Turin", "Genoa"],
    firstNames: IT_FIRST_NAMES,
    lastNames: IT_LAST_NAMES,
  },
  {
    name: "Switzerland",
    cities: ["Zurich", "Geneva", "Basel", "Lausanne", "Luzern"],
    firstNames: CH_FIRST_NAMES,
    lastNames: CH_LAST_NAMES,
  },
  {
    name: "Spain",
    cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Valencia"],
    firstNames: ES_FIRST_NAMES,
    lastNames: ES_LAST_NAMES,
  },
  {
    name: "Portugal",
    cities: ["Lisbon", "Porto", "Coimbra", "Vila Real", "Guimaraes"],
    firstNames: PT_FIRST_NAMES,
    lastNames: PT_LAST_NAMES,
  },
  {
    name: "Brazil",
    cities: [
      "Sao Paulo",
      "Rio de Janeiro",
      "Belo Horizonte",
      "Salvador",
      "Fortaleza",
    ],
    firstNames: PT_FIRST_NAMES,
    lastNames: PT_LAST_NAMES,
  },
  {
    name: "Japan",
    cities: ["Tokyo", "Osaka", "Fukuoka", "Nagoya", "Kobe"],
    firstNames: JP_FIRST_NAMES,
    lastNames: JP_LAST_NAMES,
  },
  {
    name: "South Korea",
    cities: ["Seoul", "Busan", "Daegwallyeong", "Incheon", "Daejeon"],
    firstNames: KR_FIRST_NAMES,
    lastNames: KR_LAST_NAMES,
  },
  {
    name: "China",
    cities: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
    firstNames: CN_FIRST_NAMES,
    lastNames: CN_LAST_NAMES,
  },
  {
    name: "India",
    cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
    firstNames: IN_FIRST_NAMES,
    lastNames: IN_LAST_NAMES,
  },
];
