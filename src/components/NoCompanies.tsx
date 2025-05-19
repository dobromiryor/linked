import { useCompanyStore } from "@/store/company.store";

const Card = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </>
  );
};

export const NoCompanies = () => {
  const isLoading = useCompanyStore((state) => state.isLoading);

  return (
    <div className="flex-1 flex flex-col gap-2 items-center justify-center h-full p-2 md:p-4">
      {isLoading ? (
        <Card
          title="Loading companies..."
          description="Hang tight while we load the companies."
        />
      ) : (
        <Card
          title="No companies found!"
          description="Try adjusting your filters or search query."
        />
      )}
    </div>
  );
};
