import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useParams } from "react-router-dom";
import { getProductDetailByCategory} from "@/apis/CategoriesApi";

const ProductDetailPage: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const {categoryId, id} = useParams<{categoryId:string, id:string}>();
  const { data } = useQuery({
    queryKey: ["producs", id],
    queryFn: () => getProductDetailByCategory(Number(categoryId), Number(id))
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
  }, [ data?.images.length]);

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 items-center justify-center">
          {data?.images?.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              alt={data?.title}
              className={`${
                selectedImage === image ? "border-blue-500" : "border-gray-200"
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
    </div>
  );
};

export default ProductDetailPage;
