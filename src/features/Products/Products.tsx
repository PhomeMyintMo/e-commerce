import { getCategories} from "@/apis/CategoriesApi";
import { getAllProducts } from "@/apis/ProductsApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ArrowDown, Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishListContext";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });

  // const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // const handleCategoryClick = (category:any) => {
  //   setSelectedCategoryId(category.id);
  //   navigate(`/products/${category.name}`);
  // }

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="mx-auto p-4">
      <div className="items-center justify-center p-2">
      <div className="text-2xl font-medium mb-4">
        All Products Uncategorized
      </div>
      <div className="flex gap-2 justify-center">Choose your favorite Categories here<span><ArrowDown/></span></div>
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
    const {categoryId} = useParams<{categoryId: string}>();
  const { wishlist, addToWishlist, removeFavoriteItem } = useWishlist();
  const [inputTitle, setInputTitle] = useState<string>("");
  // const [searchBox, setSearchBox] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts()
  });

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputTitle(e.target.value);
  // };

  // const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     setSearchBox(inputTitle);
  //   }
  // };

  // const clearSearch = () => {
  //   setInputTitle("");
  // };

  // const filterProducts = data?.filter((product: any) =>
  //   product.title.toLowerCase().includes(inputTitle.toLowerCase())
  // );

  // const sortedProducts = [...(filterProducts || [])];
  // if (sortOption === "lowToHigh") {
  //   sortedProducts.sort((a, b) => a.price - b.price);
  // } else if (sortOption === "highToLow") {
  //   sortedProducts.sort((a, b) => b.price - a.price);
  // }

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
        const isFavorite = wishlist.some(
          (item: any) => item.id === product.id
        );

        return (
          <div
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div 
            className="relative bg-gray-100 aspect-[4/5] overflow-hidden cursor-pointer"
            onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.images?.[0]?.url ? (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-gray-400 text-sm">
                    No Image Available
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() =>
                  isFavorite
                    ? removeFavoriteItem(product.id)
                    : addToWishlist({
                        id: product.id,
                        title: product.name,
                        price: product.price,
                        image: product.images?.[0],
                      })
                }
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition"
              >
                <Heart
                  className="h-5 w-5"
                  fill={isFavorite ? "red" : "none"}
                  color={isFavorite ? "red" : "#444"}
                />
              </button>

              {product.stock === 0 && (
                <div className="absolute top-3 left-3 bg-background text-foreground/70 text-xs px-3 py-1 rounded-full font-medium">
                  Out of Stock
                </div>
              )}
            </div>

            <div className="flex flex-col items-start gap-3 p-4">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                {product.category?.name}
              </p>

              <h2 className="font-semibold text-gray-800 line-clamp-2">
                {product.name}
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-muted-foreground">
                  Ks{" "}{product.price.toLocaleString()}
                </span>
              </div>

              {product.variants?.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  {[
                    ...new Set(
                      product.variants.map(
                        (variant: any) => variant.color
                      )
                    ),
                  ].map((color: any, index: number) => (
                    <div
                      key={index}
                      className="h-5 w-5 rounded-full border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              )}

              {/* {product.variants?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    ...new Set(
                      product.variants.map(
                        (variant: any) => variant.size
                      )
                    ),
                  ].map((size: any, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )} */}

            </div>
          </div>
        );
      })}
    </div>
  </div>
);
};

export default CategoryList;
