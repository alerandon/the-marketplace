import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const { product, quantity } = item;
  const price = parseFloat(product.price);
  const itemTotal = price * quantity;

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold truncate">{product.name}</h4>
        <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
        <p className="text-sm font-medium text-primary mt-1">
          S/ {price.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <Button
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>

          <span className="w-8 text-center font-medium">{quantity}</span>

          <Button
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stock}
          >
            <Plus className="h-3 w-3" />
          </Button>

          <Button
            className="h-8 w-8 text-destructive"
            onClick={() => onRemove(product.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>

        <p className="text-sm font-bold">S/ {itemTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
