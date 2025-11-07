"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import StoreHeader from "@/components/stores/StoreHeader";
import ProductFilters from "@/components/products/ProductFilters";
import ProductSearch from "@/components/products/ProductSearch";
import ProductGrid from "@/components/products/ProductGrid";
import PaginatedList from "@/components/common/PaginatedList";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/stores/useStore";
import { useStoreProducts } from "@/hooks/stores/useStoreProducts";
import { ApiError } from "@/lib/api-types";

interface StoreDetailClientProps {
  id: string;
  showOnlyInStock: boolean;
  currentPage: number;
  searchQuery?: string;
  searchParams?: Record<string, string>;
}

export default function StoreDetailClient({
  id,
  showOnlyInStock,
  currentPage,
  searchQuery,
  searchParams,
}: StoreDetailClientProps) {
  const { data: store, isLoading: isLoadingStore, error: storeError } = useStore(id);
  const {
    data: allProducts,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useStoreProducts(id, {
    page: currentPage,
    q: searchQuery,
    inStock: showOnlyInStock ? true : undefined,
  });

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
          <p className="text-muted-foreground text-lg">
            {apiError.message || "Ocurrió un error inesperado"}
          </p>
          {apiError.statusCode && (
            <p className="text-sm text-muted-foreground">
              Código de error: {apiError.statusCode}
            </p>
          )}
          {apiError.error && (
            <p className="text-xs text-muted-foreground font-mono">
              {apiError.error}
            </p>
          )}
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

  const products = allProducts?.items || [];
  const hasPrevPage = allProducts?.hasPrev || false;
  const hasNextPage = allProducts?.hasNext || false;
  const totalItems = allProducts?.totalItems || 0;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="space-y-4 md:space-y-6">
        <Link href="/stores">
          <Button className="gap-2" size="sm">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Volver a Tiendas</span>
            <span className="sm:hidden">Volver</span>
          </Button>
        </Link>

        <StoreHeader store={store} />

        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl md:text-2xl font-bold">
                Productos ({products.length})
              </h2>
              <ProductFilters showOnlyInStock={showOnlyInStock} />
            </div>

            <ProductSearch placeholder="Buscar productos en esta tienda..." />
          </div>

          <ProductGrid products={products} />

          <PaginatedList
            currentPage={currentPage}
            totalItems={totalItems}
            hasPrev={hasPrevPage}
            hasNext={hasNextPage}
            onPageChange={createPageURL}
          />
        </div>
      </div>
    </div>
  );
}
