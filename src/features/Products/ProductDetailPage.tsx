import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowLeft } from "lucide-react";
import { getProductDetail } from "@/apis/ProductsApi";
import { useToast } from "@/hooks/use-toast";

const ProductDetailPage: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductDetail(Number(id)),
  });
  const isLong = (data?.description?.length ?? 0) > 100;
  const visibleDescription =
    isLong && !expanded
      ? data?.description.slice(0, 100) + "..."
      : data?.description;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const hasImages = data?.images && data.images.length > 0;

  const fallbackImage =
    "https://placehold.co/600x800?text=No+Image";

  useEffect(() => {
    if (data?.images.length > 0) {
      setSelectedImage(data?.images[0].url);
    } else {
      setSelectedImage(null);
    }
  }, [data?.images]);

  return (
    <div className="p-4 space-y-6">
      <button className="flex cursor-pointer items-center gap-2" onClick={() => navigate("/products")}><ChevronLeft size={18} />Continue Shopping</button>
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="block lg:hidden px-16">
            <Carousel>
              <CarouselContent>
                {hasImages ? (
                  data?.images?.map((image: any, index: number) => (
                    <CarouselItem key={index}>
                      <img
                        src={image.url}
                        alt={data?.name}
                        className="w-full h-full object-cover"
                        onClick={() => setSelectedImage(image.url)}
                      />
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <img
                      src={fallbackImage}
                      alt="No image"
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                )
                }
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="hidden lg:flex gap-6">
            <div className="flex flex-col gap-3">
              {hasImages ? (
                data?.images?.map((image: any, index: number) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={data?.name}
                    className={`${selectedImage === image.url
                      ? "border-blue-500"
                      : "border-gray-200"
                      } max-w-24 max-h-24 object-cover border cursor-pointer`}
                    onClick={() => setSelectedImage(image.url)}
                  />
                ))
              ) : (
                <div className="w-24 h-24 border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                  No Image
                </div>
              )
              }
            </div>

            <div className="w-[500px] h-[650px] overflow-hidden">
              <img
                src={
                  selectedImage ??
                  data?.images?.[0]?.url ??
                  fallbackImage
                }
                alt={data?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-8 items-start justify-start">
          <h3 className="text-3xl font-semibold">{data?.name}</h3>
          <p className="text-xl text-gray-500 font-semibold">MMK{" "}{data?.price}</p>
          <p className="text-xl text-start text-gray-500">
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

          <hr className="my-4 border-gray-300 w-full" />
          <div className="flex flex-col space-y-4 items-start justify-start">
            <p>Choose Color:</p>
            <div className="flex gap-2">
              {[...new Set(data?.variants?.map((v: any) => v.color))].map(
                (color: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`h-8 w-8 rounded-full border cursor-pointer ${selectedColor === color
                      ? "border-secondary-foreground border-2"
                      : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ),
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-4 items-start justify-start">
            <p>Choose Size:</p>

            <span className="flex gap-2">
              {[...new Set(data?.variants?.map((v: any) => v.size))].map(
                (size: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-3 py-1 cursor-pointer ${selectedSize === size
                      ? "bg-secondary-foreground text-white"
                      : "border-gray-500"
                      }`}
                  >
                    {size}
                  </button>
                ),
              )}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value) || 1))
                }
                className="h-full w-full text-center"
              />
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus />
              </Button>
            </div>
            <button
              className="bg-gray-500 hover:bg-gray-600 border-gray-500 px-16 p-2 font-medium text-white border cursor-pointer"
              onClick={() => {
                if (!selectedColor || !selectedSize) {
                  toast({
                    description: "Please select both color and size.",
                  });
                  return;
                }

                addToCart({
                  id: data?.id,
                  title: data?.name,
                  price: data?.price,
                  image: data?.images?.[0]?.url,
                  color: selectedColor,
                  size: selectedSize,
                  quantity: quantity,
                });
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
