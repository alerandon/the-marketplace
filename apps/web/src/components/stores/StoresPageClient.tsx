"use client";

import { Suspense } from "react";
import StoreSearch from "@/components/stores/StoreSearch";
import StoreGrid from "@/components/stores/StoreGrid";
import PaginatedList from "@/components/common/PaginatedList";
import { useStores } from "@/hooks/stores/useStores";
import { ApiError } from "@/lib/api-types";
import { Loader2 } from "lucide-react";

interface StoresPageClientProps {
  currentPage: number;
  searchParams?: Record<string, string>;
}

export default function StoresPageClient({
  currentPage,
  searchParams,
}: StoresPageClientProps) {
  const searchQuery = searchParams?.q;
  const { data: stores, isLoading, error } = useStores({
    page: currentPage,
    q: searchQuery
  });

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  if (error) {
    const apiError = error as unknown as ApiError;
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-destructive">
            Error al cargar las tiendas
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
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 md:py-8 space-y-6 md:space-y-8">
      <div className="text-center space-y-3 md:space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold px-2">Explora Nuestras Tiendas</h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
          Encuentra las mejores tiendas cerca de ti y descubre sus productos
        </p>
      </div>

      <div className="flex justify-center">
        <Suspense fallback={<div>Cargando...</div>}>
          <StoreSearch />
        </Suspense>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8 md:py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground text-sm md:text-base">
            Cargando tiendas...
          </span>
        </div>
      ) : (
        <>
          <StoreGrid stores={stores?.items || []} />

          {stores && (
            <PaginatedList
              currentPage={currentPage}
              totalItems={stores.totalItems}
              hasPrev={stores.hasPrev}
              hasNext={stores.hasNext}
              onPageChange={createPageURL}
            />
          )}
        </>
      )}
    </div>
  );
}
