import {
  getCategories,
  getProductsByCategory,
} from "@/apis/CategoriesApi";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { useWishlist } from "@/contexts/WishListContext";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart } from "lucide-react";

const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { wishlist, addToWishlist, removeFavoriteItem } = useWishlist();
  const [sortOption, setSortOption] = useState<string>("default");
  const navigate = useNavigate();

  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });
  if (isLoading) return <div>Loading...</div>;
  if (!categoryData) return <div>No category found</div>;

  const { data: productDetailData } = useQuery({
    queryKey: ["productDetail", categoryId],
    queryFn: () => getProductsByCategory(Number(categoryId)),
  });

  const filterCategory = categoryData.find(
    (category: any) => category.id=== Number(categoryId)
  );
  console.log("category id:", typeof(categoryData[0].id))
  if (!filterCategory) return <div>No category data found.</div>;

  const filterProducts = productDetailData?.filter((product: any) =>
    product.title.toLowerCase()
  );

  const sortedProducts = [...(filterProducts || [])];
  if (sortOption === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="p-4">
      {/* category image */}
      <div className="flex justify-center">
        <div className="">
          <img
            src={filterCategory.image}
            alt={filterCategory.name}
            className="w-24 h-24 object-cover"
          />
          <h4>{filterCategory.name}</h4>
        </div>
      </div>

      {/* filter and breadcrumb */}
      <div className="flex justify-between mt-4">
        <div className="flex items-center justify-center">
          <BreadcrumbComponent />
        </div>
        <div className="">
          <Select onValueChange={(value) => setSortOption(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price Sorted By: " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="lowToHigh">Lowest to Highest</SelectItem>
              <SelectItem value="highToLow">Highest to Lowest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap justify-center md:flex-wrap gap-4 mt-4">
        {sortedProducts.map((product: any) => {
          const isFavorite = wishlist.some(
            (item: any) => item.id === product.id
          );
          return (
            <div key={product.id} className="border rounded p-2 w-80">
              <div className="">
                <img
                  src={product.images?.[0] || "https://placehold.co/600x400"}
                  alt={product.title}
                  className="h-full w-full object-cover rounded cursor-pointer"
                  onClick={() => navigate(`/products/${categoryId}/${product.id}`)}
                />
              </div>
              <div className="flex justify-between mt-4">
                <p className="font-semibold">{product.title}</p>
                <button
                  onClick={() =>
                    isFavorite
                      ? removeFavoriteItem(product.id)
                      : addToWishlist({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.images?.[0],
                      })
                  }
                >
                  <Heart
                    className="right-2 bottom-8 stroke-1 text-gray-500 cursor-pointer hover:fill-red-500 hover:text-gray-500"
                    fill={isFavorite ? "red" : "none"}
                    color={isFavorite ? "red" : "currentColor"} 
                  />
                </button>
              </div>
              <div className="flex justify-between items-center mt-2 mb-2">
                <p className="text-gray-500">${product.price}</p>
              </div>
              <div className="flex gap-2">
                {product?.colors?.map((color: any, index: number) => (
                  <span
                    key={index}
                    style={{ backgroundColor: color.hex }}
                    className="w-6 h-6 rounded-full inline-block border border-gray-300"
                  ></span>
                ))}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
