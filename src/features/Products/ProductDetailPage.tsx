import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetailByCategory } from "@/apis/CategoriesApi";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const existing = cart.find((cartItem) => cartItem.id === data?.id);
      setQuantity(existing?.quantity || 1);
    }
  }, [data, cart]);

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  useEffect(() => {
    if (data?.images && data?.images.length > 0) {
      setSelectedImage(data?.images?.[0]);
    } else {
      setSelectedImage(null);
    }
  }, [data?.images.length]);

  return (
    <div className="p-4">
    <div className='flex mb-4'><Button className="cursor-pointer bg-slate-300 hover:bg-slate-400" onClick={() => navigate(-1)}><ArrowLeft className="text-black" /></Button></div>
      <div className="flex flex-col lg:flex-row gap-16">

        {/* IMAGE SECTION — RESPONSIVE */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">

          {/* MOBILE — carousel */}
          <div className="block lg:hidden px-16">
            <Carousel>
              <CarouselContent>
                {data?.images?.map((image: string, index: number) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={data?.title}
                      className="w-full h-full object-cover "
                      onClick={() => setSelectedImage(image)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* DESKTOP — side thumbnails + big image */}
          <div className="hidden lg:flex gap-6">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {data?.images?.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={data?.title}
                  className={`${selectedImage === image
                    ? "border-blue-500"
                    : "border-gray-200"
                    } max-w-24 max-h-24 object-cover border cursor-pointer`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>

            {/* Large Image */}
            <div className="">
              <img
                src={selectedImage ?? data?.images?.[0] ?? "/placeholder.png"}
                alt={data?.title}
                className="min-w-full object-cover"
              />
            </div>
          </div>

        </div>


        <div className="flex flex-col space-y-8 items-start justify-start">
          <h3 className="text-3xl font-semibold">{data?.title}</h3>
          <p className="text-xl text-gray-500 font-semibold">${data?.price}</p>
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
          <p className="text-gray-500">Size: <span className="ml-2">{data?.size.join(',')}</span></p>
          <p className="text-gray-500">
            Color: <span className="ml-2">{data?.colors?.map((color: any) => color.name).join(',')}</span>
          </p>
          <p className="text-gray-500">Material:<span className="ml-2">{data?.material}</span></p>
          <hr className="my-4 border-gray-300 w-full" />
          <div className="flex flex-col space-y-4 items-start justify-start">
            <p>Choose Color:</p>
            <div className="flex gap-2">
              {data?.colors?.map((color: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color.hex)}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selectedColor === color.hex ? "border-secondary" : "border-gray-300"
                    }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4 items-start justify-start">
            <p>Choose Size:</p>
            <span className="flex gap-2">
              {data?.size?.map((size: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-2 cursor-pointer ${selectedSize === size ? "bg-secondary" : "border-gray-500"}`}
                >
                  {size}
                </button>
              ))}
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
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="h-full w-full text-center"

              />
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
              >
                <Plus />
              </Button>
            </div>
            <button
              className="bg-gray-500 hover:bg-gray-600 border-gray-500 px-16 p-2 font-medium text-white border cursor-pointer"
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

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
