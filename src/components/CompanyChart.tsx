import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { FinancialDataMockData } from "@/interfaces/financial-data.interface";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  year: {
    label: "Year",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  netIncome: {
    label: "Net Income",
    color: "var(--chart-2)",
  },
  profitMargin: {
    label: "Profit Margin",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

type FinancialData = FinancialDataMockData & {
  profitMargin: number;
};

interface CompanyChartProps {
  data: FinancialData[];
}

export const CompanyChart = ({ data }: CompanyChartProps) => {
  return (
    <Card className="flex-1">
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={data}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillNetIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-netIncome)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-netIncome)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillProfitMargin" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-profitMargin)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-profitMargin)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" labelKey="year" />}
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              stackId="a"
            />
            <Area
              dataKey="netIncome"
              type="natural"
              fill="url(#fillNetIncome)"
              stroke="var(--color-netIncome)"
              stackId="a"
            />
            <Area
              dataKey="profitMargin"
              type="natural"
              fill="url(#fillProfitMargin)"
              stroke="var(--color-profitMargin)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
