import { getCategories } from "@/apis/CategoriesApi";
import { getAllProducts } from "@/apis/ProductsApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ArrowDown} from "lucide-react";
import { useWishlist } from "@/contexts/WishListContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="mx-auto p-4">
      <div className="items-center justify-center p-2">
        <div className="text-2xl font-medium mb-4">
          All Products Uncategorized
        </div>
        <div className="flex gap-2 justify-center">Choose your favorite Categories here<span><ArrowDown /></span></div>
      </div>
      <div className="flex gap-2 justify-center">
        {categoryData.map((category: any) => (
          <div key={category.id} className="">
            <img
              src={category.image}
              alt={category.name}
              className={`w-16 h-16 object-cover transition-transform duration-500 hover:scale-110 cursor-pointer`}
              onClick={() => navigate(`/products/${category.id}`)}
            />
            <div className=" text-xs mt-2">{category.name}</div>
          </div>
        ))}
      </div>
      <div className="">
        <Products />
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const { wishlist, addToWishlist, removeFavoriteItem } = useWishlist();
  const [sortOption, setSortOption] = useState<string>("default");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts()
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="mx-auto px-4 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <BreadcrumbComponent />
        </div>

        <Select onValueChange={(value) => setSortOption(value)}>
          <SelectTrigger className="w-full md:w-[220px] rounded-xl border-gray-300 shadow-sm">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="lowToHigh">Lowest to Highest</SelectItem>
            <SelectItem value="highToLow">Highest to Lowest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {data.map((product: any) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              addToWishlist={addToWishlist}
              removeFavoriteItem={removeFavoriteItem}
              navigate={navigate}
            />
          )
        })}
      </div>
    </div>
  );
};

export default CategoryList;
