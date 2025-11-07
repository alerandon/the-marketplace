"use client";

import { use } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/es";
import {
  ArrowLeft,
  Package,
  Calendar,
  Tag,
  Store as StoreIcon,
  MapPin,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/hooks/products/useProduct";
import { useStore } from "@/hooks/stores/useStore";
import { ApiError } from "@/lib/api-types";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: product, isLoading: isLoadingProduct, error: productError } = useProduct(id);
  const { data: store, isLoading: isLoadingStore } = useStore(product?.storeId || "");

  const isLoading = isLoadingProduct || isLoadingStore;
  const error = productError;

  if (error) {
    const apiError = error as unknown as ApiError;
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-destructive">
            Error al cargar el producto
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
            Cargando producto...
          </span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Producto no encontrado</h1>
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

  return (
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 px-4 md:px-6 py-4 md:py-6">
        <Link href={store ? `/stores/${store.id}` : "/stores"}>
          <Button className="gap-2" size="sm">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Volver a {store?.name || "Tiendas"}</span>
            <span className="sm:hidden">Volver</span>
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Product Image Placeholder */}
          <Card className="w-full max-w-md mx-auto md:max-w-none">
            <CardContent className="p-0">
              <div className="aspect-square w-full bg-muted flex items-center justify-center rounded-lg overflow-hidden">
                <Package className="h-20 w-20 md:h-24 md:w-24 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Product Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">{product.name}</h1>
                {product.isAvailable ? (
                  <Badge className="bg-success/10 text-success border-success/20 flex-shrink-0 text-xs md:text-sm">
                    En Stock
                  </Badge>
                ) : (
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20 flex-shrink-0 text-xs md:text-sm">
                    Agotado
                  </Badge>
                )}
              </div>

              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                $ {parseFloat(product.price).toFixed(2)}
              </p>

              {product.description && (
                <p className="text-muted-foreground text-base md:text-lg">
                  {product.description}
                </p>
              )}
            </div>

            <Separator />

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3">
                {product.isAvailable ? (
                  <>
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Stock disponible</p>
                      <p className="text-sm text-muted-foreground">{product.stock} unidades</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">Sin stock</p>
                      <p className="text-sm text-muted-foreground">Producto agotado</p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">SKU</p>
                  <p className="text-sm text-muted-foreground">{product.sku}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Fecha de registro</p>
                  <p className="text-sm text-muted-foreground">
                    {dayjs(product.createdAt).format("D [de] MMMM, YYYY")}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <Separator />

{store && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <StoreIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium mb-1">Vendido por</p>
                      <Link
                        href={`/stores/${store.id}`}
                        className="text-primary hover:underline font-semibold"
                      >
                        {store.name}
                      </Link>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{store.city}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
  );
};
