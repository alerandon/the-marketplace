import StoreDetailClient from "@/components/stores/StoreDetailClient";

export default async function StoreDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const search = await searchParams;

  const showOnlyInStock = search?.inStock === "true";
  const currentPage = Number(search?.page) || 1;
  const searchQuery = typeof search?.q === "string" ? search.q : undefined;

  return (
    <StoreDetailClient
      id={id}
      showOnlyInStock={showOnlyInStock}
      currentPage={currentPage}
      searchQuery={searchQuery}
      searchParams={search as Record<string, string>}
    />
  );
}
