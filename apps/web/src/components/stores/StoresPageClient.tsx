"use client";

import { Suspense } from "react";
import StoreSearch from "@/components/stores/StoreSearch";
import StoreGrid from "@/components/stores/StoreGrid";
import { useStores } from "@/hooks/useStores";
import { ApiError } from "@/lib/api-types";
import { Loader2 } from "lucide-react";

export default function StoresPageClient() {
  const { data: stores, isLoading, error } = useStores();

  if (error) {
    const apiError = error as unknown as ApiError;
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-destructive">
            Error al cargar las tiendas
          </h1>
          <p className="text-muted-foreground">
            {apiError.message || "Ocurrió un error inesperado"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Explora Nuestras Tiendas</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Encuentra las mejores tiendas cerca de ti y descubre sus productos
        </p>
      </div>

      <div className="flex justify-center">
        <Suspense fallback={<div>Cargando...</div>}>
          <StoreSearch />
        </Suspense>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">
            Cargando tiendas...
          </span>
        </div>
      ) : (
        <StoreGrid stores={stores || []} />
      )}
    </div>
  );
}
