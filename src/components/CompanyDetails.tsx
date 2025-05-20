import { CompanyChart } from "@/components/CompanyChart";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LAST_YEAR } from "@/constants/last-year.const";
import { formatCurrency } from "@/lib/format-currency.util";
import { getProfitMargin } from "@/lib/get-profit-margin.util";
import { useCompanyStore } from "@/store/company.store";
import { useMemo } from "react";

export const CompanyDetails = () => {
  const selectedCompany = useCompanyStore((state) => state.selectedCompany);

  const financialData = useMemo(
    () =>
      selectedCompany?.financialData.find((data) => data.year === LAST_YEAR),
    [selectedCompany]
  );

  const financialDataWithProfitMargin = useMemo(
    () =>
      selectedCompany?.financialData
        .sort((a, b) => a.year - b.year)
        .map((data) => ({
          ...data,
          profitMargin: getProfitMargin(selectedCompany!, data.year),
        })),
    [selectedCompany]
  );

  if (!selectedCompany || !financialData || !financialDataWithProfitMargin)
    return null;

  return (
    <div className="flex-1 flex h-full overflow-y-auto">
      <div className="container mx-auto flex-1 flex flex-col p-2 md:p-4 gap-2 md:gap-4">
        <Tabs defaultValue="overview" className="flex-1">
          <TabsList heading={selectedCompany.name}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
          </TabsList>
          <TabsContent
            value="overview"
            className="flex-none shrink grid auto-cols-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4"
          >
            <Item
              label="Type"
              value={selectedCompany.companyDetails.companyType}
            />
            <Item
              label="Headquarters"
              value={`${selectedCompany.companyDetails.headquarters}, ${selectedCompany.country}`}
            />
            <Item
              label="Founded"
              value={selectedCompany.foundedYear.toString()}
            />
            <Item label="Industry" value={selectedCompany.industry} />
            <Item label="CEO" value={selectedCompany.companyDetails.ceoName} />
            <Item label="Size" value={selectedCompany.companyDetails.size} />
          </TabsContent>
          <TabsContent
            value="financials"
            className="flex flex-col gap-2 md:gap-4"
          >
            <div className="grid auto-cols-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              <Item
                label="Revenue"
                value={formatCurrency(financialData.revenue)}
                footer={`Data from ${financialData.year}`}
              />
              <Item
                label="Net Income"
                value={formatCurrency(financialData.netIncome)}
                footer={`Data from ${financialData.year}`}
              />
              <Item
                label="Profit Margin"
                value={`${getProfitMargin(selectedCompany).toFixed()}%`}
                footer={`Data from ${financialData.year}`}
              />
            </div>

            <CompanyChart data={financialDataWithProfitMargin} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const Item = ({
  label,
  value,
  footer,
}: {
  label: string;
  value: string;
  footer?: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-light">
          {label}
        </CardTitle>
        <CardDescription className="text-2xl font-semibold text-foreground">
          {value}
        </CardDescription>
      </CardHeader>
      {footer ? (
        <CardFooter className="text-xs text-muted-foreground">
          {footer}
        </CardFooter>
      ) : null}
    </Card>
  );
};
