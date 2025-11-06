"use client";

import { use, useState } from "react";
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
  ShoppingCart,
  Minus,
  Plus,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/hooks/useProduct";
import { useStore } from "@/hooks/useStore";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { ApiError } from "@/lib/api-types";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { id } = use(params);

  const { data: product, isLoading: isLoadingProduct, error: productError } = useProduct(id);
  const { data: store, isLoading: isLoadingStore } = useStore(product?.storeId || "");

  const isLoading = isLoadingProduct || isLoadingStore;
  const error = productError;

  const decrementQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    if (!product || quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (!product.isAvailable) {
      toast({
        title: "Producto no disponible",
        description: "Este producto está agotado",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, quantity);
    toast({
      title: "Agregado al carrito",
      description: `${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} de ${product.name}`,
    });
    setQuantity(1);
  };

  if (error) {
    const apiError = error as unknown as ApiError;
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-destructive">
            Error al cargar el producto
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
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href={store ? `/stores/${store.id}` : "/stores"}>
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a {store?.name || "Tiendas"}
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image Placeholder */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-square bg-muted flex items-center justify-center rounded-lg">
                <Package className="h-24 w-24 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                {product.isAvailable ? (
                  <Badge className="bg-success/10 text-success border-success/20 flex-shrink-0">
                    En Stock
                  </Badge>
                ) : (
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20 flex-shrink-0">
                    Agotado
                  </Badge>
                )}
              </div>

              <p className="text-4xl font-bold text-primary mb-2">
                S/ {parseFloat(product.price).toFixed(2)}
              </p>

              {product.description && (
                <p className="text-muted-foreground text-lg">
                  {product.description}
                </p>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
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

            {product.isAvailable && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Cantidad:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      className="h-8 w-8"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="w-12 text-center font-medium text-lg">
                      {quantity}
                    </span>

                    <Button
                      className="h-8 w-8"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    (máx: {product.stock})
                  </span>
                </div>

                <Button
                  className="w-full gap-2 h-12 text-lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Agregar al carrito
                </Button>
              </div>
            )}

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
