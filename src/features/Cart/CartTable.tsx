import React from "react";
import { useCart, type CartItem } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Minus, Plus, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast";


const CartTable: React.FC = () => {
  const { cart, addToCart, removeCartItem, decreaseCartItem, increaseCartItem } = useCart();
  const SubTotalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log("cart", cart)
  const shippingFee = cart.length > 0 ? 20 : 0;

  const Total = SubTotalAmount + shippingFee;

  const { toast } = useToast();

  const navigate = useNavigate();

  const handleRemove = (item: CartItem) => {
    const removedItem = item;
    removeCartItem(item.id);
    toast({
      description: "Item removed from cart.",
       action: (
      <ToastAction altText="Undo" onClick={() => addToCart(removedItem)} className="flex gap-1">
        <Undo2 size={14}/>Undo
      </ToastAction>
    ),
    })
  }
  

  return (
    <div className="p-4 space-y-3">
      <h1 className="font-semibold text-3xl mb-8 flex justify-center items-center">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-4">
        {cart.length > 0 ? (
          <div className="flex-1 space-y-4">
            <button className="flex cursor-pointer items-center gap-2" onClick={() => navigate("/products")}><ChevronLeft size={18} />Continue Shopping</button>

            {cart.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-b p-4"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <span className="font-semibold">{index + 1}</span>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover shrink-0"
                  />

                  <div className="flex items-start flex-col">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <div className="font-semibold text-muted-foreground">Ks{" "}{item.price}</div>
                    <div className="text-sm">Color: {item.color ?? "-"}</div>
                    <div className="text-sm">Size: {item.size ?? "-"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decreaseCartItem(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <Input
                    type="number"
                    value={item.quantity}
                    className="h-8 w-16 text-center"
                    readOnly
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      increaseCartItem(item.id)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-muted-foreground">
                  Total:{" "}
                  <span className="font-semibold">
                    Ks{" "}{item.price * item.quantity}
                  </span>
                </p>

                <Button
                  variant="ghost"
                  onClick={() => handleRemove(item)}
                  className="cursor-pointer"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="font-medium text-lg">Your cart is empty.</h1>
            <p className="text-sm py-4">Go back to <span className="font-semibold underline underline-offset-2 text-blue-500 cursor-pointer hover:scale-110" onClick={() => navigate("/products")}>product page</span>  and add items to the cart.</p>
          </div>
        )}


        <div className="w-full lg:w-1/4 md:w-1/3">
          <div className="rounded-2xl border bg-card shadow-sm p-6 sticky top-4">

            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <Separator className="mb-4" />

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold">
                  MMK {SubTotalAmount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping Fee</span>
                <span className="font-medium">
                  MMK {shippingFee}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-base">
                <span className="font-semibold">Subtotal</span>
                <span className="text-lg font-bold">
                  MMK {Total}
                </span>
              </div>
            </div>

            <Button
              className="w-full mt-6 h-11 rounded-xl cursor-pointer"
              onClick={() =>
                toast({
                  title: "Checkout",
                  description: "Checkout successfully.",
                  variant: "default",
                })
              }
              disabled={Total <= 0}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
