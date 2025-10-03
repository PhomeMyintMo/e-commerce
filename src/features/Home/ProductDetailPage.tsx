import { getProductDetail } from "@/apis/ProductsApi";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: number;
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({
  open,
  setOpen,
  productId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { data } = useQuery({
    queryKey: ["producs", productId],
    queryFn: () => getProductDetail(Number(productId)),
  });
  const isLong = data?.description.length > 30;
  const visibleDescription =
    isLong && !expanded
      ? data?.description.slice(0, 100) + "..."
      : data?.description;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (data?.images && data?.images.length > 0) {
      setSelectedImage(data?.images?.[0]);
    } else {
      setSelectedImage(null);
    }
  }, [productId, data?.images.length]);

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent
          className="w-[90%] max-w-sm md:max-w-lg 
               max-h-[90vh] overflow-y-auto p-4"
        >
          <div className="mb-2">
            <X
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
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
          <p className=" font-medium">{data?.title}</p>
          <div className="flex justify-between">
            <p className="font-semibold">${data?.price}</p>
            <button
              className="bg-blue-600 px-2 rounded-xl text-white text-sm hover:bg-blue-700 cursor-pointer"
              onClick={() =>
                addToCart({
                  id: data?.id,
                  title: data?.title,
                  price: data?.price,
                  image: data?.images?.[0],
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
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductDetailPage;
