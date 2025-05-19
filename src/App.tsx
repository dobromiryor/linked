import { CompanyOverview } from "@/components/CompanyOverview";
import { Header } from "@/components/NavigationBar";
import { Pagination } from "@/components/Pagination";

export default function App() {
  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <main className="flex-1 overflow-hidden">
        <CompanyOverview />
      </main>
      <Pagination />
    </div>
  );
}
