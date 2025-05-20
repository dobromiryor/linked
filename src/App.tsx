import { CompanyDetails } from "@/components/CompanyDetails";
import { CompanyOverview } from "@/components/CompanyOverview";
import { Header } from "@/components/NavigationBar";
import { Pagination } from "@/components/Pagination";
import { useCompanyStore } from "@/store/company.store";

export default function App() {
  const selectedCompany = useCompanyStore((state) => state.selectedCompany);

  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <main className="flex-1 overflow-hidden">
        {selectedCompany ? <CompanyDetails /> : <CompanyOverview />}
      </main>
      {!selectedCompany && <Pagination />}
    </div>
  );
}
