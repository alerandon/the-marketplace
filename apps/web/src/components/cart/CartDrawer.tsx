import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import CartItem from "./CartItem";

const CartDrawer = () => {
  const { items, getTotalItems, getSubtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const totalItems = getTotalItems();
  const subtotal = getSubtotal();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Carrito de Compras</SheetTitle>
            {items.length > 0 && (
              <Button
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                Vaciar carrito
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                Tu carrito está vacío
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Agrega productos para comenzar tu compra
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4 pt-4">
            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total de productos</span>
                <span className="font-medium">{totalItems}</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Subtotal</span>
                <span className="text-primary">S/ {subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full h-12 text-lg">
              Procesar Compra
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
