import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useParams } from "react-router-dom";
import { getProductDetailByCategory } from "@/apis/CategoriesApi";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const ProductDetailPage: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { categoryId, id } = useParams<{ categoryId: string; id: string }>();
  const { data } = useQuery({
    queryKey: ["producs", id],
    queryFn: () => getProductDetailByCategory(Number(categoryId), Number(id)),
  });
  const isLong = data?.description.length > 100;
  const visibleDescription =
    isLong && !expanded
      ? data?.description.slice(0, 100) + "..."
      : data?.description;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if(data){
      const existing = cart.find((cartItem) => cartItem.id === data?.id);
      setQuantity(existing?.quantity || 1);
    }
  }, [data, cart]);

  const increaseQuantity = () => setQuantity((q)=> q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q-1));

  // const item = cart.find((cartItem) => cartItem.id === data?.id);

  useEffect(() => {
    if (data?.images && data?.images.length > 0) {
      setSelectedImage(data?.images?.[0]);
    } else {
      setSelectedImage(null);
    }
  }, [data?.images.length]);

  return (
    <div className="p-4">
      <div className="flex gap-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 items-center justify-center">
            {data?.images?.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={data?.title}
                className={`${
                  selectedImage === image
                    ? "border-blue-500"
                    : "border-gray-200"
                } w-24 h-24 object-cover border-1 rounded cursor-pointer`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className="">
            <img
              src={selectedImage ?? data?.images?.[0] ?? "/placeholder.png"}
              alt={data?.title}
              className="h-full w-full object-cover rounded "
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className=" font-medium">{data?.title}</p>
          <p className="font-semibold">${data?.price}</p>
          <div className="flex justify-between gap-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="h-8 w-16 text-center"
                
              />
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <button
              className=" px-2 p-1 text-sm border cursor-pointer"
              onClick={() =>
                addToCart({
                  id: data?.id,
                  title: data?.title,
                  price: data?.price,
                  image: data?.images?.[0],
                  quantity, 
                })
              }
            >
              Add to Cart
            </button>
          </div>
          <p className="text-sm">
            {visibleDescription}
            {isLong && (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="ml-2 underline text-sm"
              >
                {expanded ? "See less" : "See more"}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
