import { getCategories, getProductsByCategory } from "@/apis/CategoriesApi";
import { getAllProducts } from "@/apis/ProductsApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Heart, Scale } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    1
  );

  const handleCategoryClick = (category:any) => {
    setSelectedCategoryId(category.id);
    navigate(`/products/${category.name}`);
  }

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="">
      <div className="flex gap-2 justify-center">
        {categoryData.map((category: any) => (
          <div key={category.id} className="">
            <img
              src={category.image}
              alt={category.name}
              className={`w-24 h-24 border-2 object-cover transition-transform duration-500 hover:scale-110 cursor-pointer
                ${
                  selectedCategoryId === category.id ? "scale-110" : "scale-100"
                }
                `}
              onClick={() => handleCategoryClick(category)}
            />
            <div className=" text-xs mt-2">{category.name}</div>
          </div>
        ))}
      </div>
      <div className="">
        {selectedCategoryId && <Products categoryId={selectedCategoryId} />}
      </div>
    </div>
  );
};

const Products: React.FC<{ categoryId: number | null }> = ({ categoryId }) => {
  const { wishlist, addToWishlist, removeFavoriteItem } = useWishlist();
  const [inputTitle, setInputTitle] = useState<string>("");
  const [searchBox, setSearchBox] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", searchBox, categoryId],
    queryFn: () =>
      categoryId === null
        ? getAllProducts(searchBox)
        : getProductsByCategory(Number(categoryId)),
    enabled: categoryId !== null,
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

  const filterProducts = data?.filter((product: any) =>
    product.title.toLowerCase().includes(inputTitle.toLowerCase())
  );

  const sortedProducts = [...(filterProducts || [])];
  if (sortOption === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="mx-auto">
      {/*      
      <div className="flex items-center justify-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          <Input
            placeholder="Search Products..."
            className="pl-10"
            value={inputTitle}
            onChange={handleSearchChange}
            onKeyDown={handleSearch}
          />
          {inputTitle && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 "
              onClick={clearSearch}
            >
              ✕
            </button>
          )}
        </div>
      </div> */}
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
              <div className="relative">
                <img
                  src={product.images?.[0] || "https://placehold.co/600x400"}
                  alt={product.title}
                  className="h-full w-full object-cover rounded"
                />
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
                    className="absolute right-2 bottom-8 stroke-1"
                    fill={isFavorite ? "red" : "none"}
                    color={isFavorite ? "red" : "currentColor"}
                  />
                </button>
              </div>
              <p className="font-semibold">{product.title}</p>
              <p className="text-gray-400 text-sm">{product.category.name}</p>
              <div className="flex justify-between items-center mt-2 mb-2">
                <p className="font-bold">${product.price}</p>
                <button
                  className="px-2 rounded-xl text-sm border hover:bg-blue-400 cursor-pointer"
                  onClick={() => navigate(`/products/${categoryId}/${product.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
