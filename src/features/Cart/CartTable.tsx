import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const CartTable: React.FC = () => {
  const { cart, addToCart, removeCartItem, decreaseCartItem } = useCart();
  const SubTotalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = cart.length > 0 ? 20 : 0;

  const Total = SubTotalAmount + shippingFee;

  const {toast} = useToast();

  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex flex-row gap-8">
      <Button className="cursor-pointer bg-slate-200 px-2 hover:bg-slate-300" onClick={()=> navigate("/")}><ArrowLeft className="text-black" /></Button>
      <h1 className="font-bold text-2xl mb-4">Your Cart</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {cart.length > 0 ? (
        <div className="flex-1 overflow-x-auto md:overflow-visible">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Item</TableHead>
                <TableHead></TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <span className="font-bold">$</span>
                    {item.price}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
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
                          addToCart({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            image: item.image,
                          })
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold">$</span>
                    {item.price * item.quantity}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        removeCartItem(item.id);

                      }}
                      className="cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        ): (
          <div className="">
            <h1 className="font-medium text-lg">Your cart is empty.</h1>
            <p className="text-sm py-4">Go back to product page and add items to the cart.</p>
            </div>
        )}


        <div className="w-full lg:w-1/4 md:w-1/3 text-white">
          <div className="bg-slate-500 rounded-xl py-4">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <Separator />
            <div>
              Total : <span className="font-semibold">$</span>
              {SubTotalAmount}
            </div>
            <div>
              Shipping Fee : <span className="font-semibold">$</span>{shippingFee}
            </div>
            <div>
              Subtotal : <span className="font-semibold">$</span>
              {Total}
            </div>
            <Button className="mt-4 cursor-pointer bg-blue-600" onClick={() => toast({
                "title" : "CheckOut",
                "description" : "Checkout successfully.",
                variant: "default"
            })}
            disabled ={Total <= 0}
            >CheckOut</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
