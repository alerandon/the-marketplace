import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import StoreHeader from "@/components/stores/StoreHeader";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getStoreById, getProductsByStoreId } from "@/lib/mockData";

const PRODUCTS_PER_PAGE = 6;

export default async function StoreDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const search = await searchParams;

  const store = getStoreById(id);
  if (!store) notFound();

  const showOnlyInStock = search?.inStock === "true";
  const currentPage = Number(search?.page) || 1;

  const allProducts = getProductsByStoreId(id);
  const filteredProducts = allProducts.filter((product) => {
    if (showOnlyInStock && !product.isAvailable) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(search as Record<string, string>);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <Link href="/stores">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a Tiendas
          </Button>
        </Link>

        <StoreHeader store={store} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Productos ({filteredProducts.length})
            </h2>
            <ProductFilters showOnlyInStock={showOnlyInStock} />
          </div>

          <ProductGrid products={paginatedProducts} />

          {totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={createPageURL(currentPage - 1)}
                      className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""
                        }`}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href={createPageURL(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href={createPageURL(currentPage + 1)}
                      className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""
                        }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
