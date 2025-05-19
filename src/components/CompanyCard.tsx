import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Company } from "@/interfaces/company.interface";
import { formatCurrency } from "@/lib/format-currency.util";
import { cn } from "@/lib/utils";
import { Calendar, Factory, MapPinIcon, Users, Wallet } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
}

export const CompanyCard = ({ company, onClick }: CompanyCardProps) => {
  return (
    <Card onClick={onClick} className="justify-between">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-lg truncate">
          <p className="truncate">{company.name}</p>
          <Badge variant="secondary">
            {company.companyDetails.companyType}
          </Badge>
        </CardTitle>
        <CardDescription>
          <Item
            icon={MapPinIcon}
            label={`${company.companyDetails.headquarters}, ${company.country}`}
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Item icon={Factory} label={company.industry} />
        <Item icon={Calendar} label={company.foundedYear.toString()} />
        <Item icon={Users} label={company.companyDetails.size} />
        <Item
          icon={Wallet}
          label={formatCurrency(company.financialData[0].revenue)}
        />
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        CEO: {company.companyDetails.ceoName}
      </CardFooter>
    </Card>
  );
};

const Item = ({
  icon: Icon,
  label,
  className,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <Icon className="size-4 shrink-0" />
      <span className="text-sm truncate">{label}</span>
    </div>
  );
};
