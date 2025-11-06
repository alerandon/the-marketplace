"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
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
import { useStore } from "@/hooks/useStore";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { ApiError } from "@/lib/api-types";

const PRODUCTS_PER_PAGE = 6;

interface StoreDetailClientProps {
  id: string;
  showOnlyInStock: boolean;
  currentPage: number;
  searchParams?: Record<string, string>;
}

export default function StoreDetailClient({
  id,
  showOnlyInStock,
  currentPage,
  searchParams,
}: StoreDetailClientProps) {
  const { data: store, isLoading: isLoadingStore, error: storeError } = useStore(id);
  const {
    data: allProducts,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useStoreProducts(id);

  const isLoading = isLoadingStore || isLoadingProducts;
  const error = storeError || productsError;

  if (error) {
    const apiError = error as unknown as ApiError;
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-destructive">
            Error al cargar la tienda
          </h1>
          <p className="text-muted-foreground">
            {apiError.message || "Ocurrió un error inesperado"}
          </p>
          <Link href="/stores">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a Tiendas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">
            Cargando información...
          </span>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Tienda no encontrada</h1>
          <Link href="/stores">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a Tiendas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const filteredProducts = (allProducts || []).filter((product) => {
    if (showOnlyInStock && !product.isAvailable) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
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
                      className={`${
                        currentPage === 1 ? "pointer-events-none opacity-50" : ""
                      }`}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href={createPageURL(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href={createPageURL(currentPage + 1)}
                      className={`${
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
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
