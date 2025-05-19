import { useCompanyStore } from "@/store/company.store";

export const Loading = () => {
  const isLoading = useCompanyStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="size-4 rounded-full animate-spin border-2 border-primary border-b-transparent" />
  );
};
