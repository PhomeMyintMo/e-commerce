import { getProductsByCategory } from "@/apis/CategoriesApi";
import { getAllProducts } from "@/apis/ProductsApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ProductDetailPage from "./ProductDetailPage";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishListContext";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Products: React.FC<{ categoryId: number | null }> = ({ categoryId }) => {
  const [open, setOpen] = useState(false);
  const [selectedProductById, setSelectedProductById] = useState<number | null>(
    null
  );
  const { wishlist, addToWishlist, removeFavoriteItem } = useWishlist();
  const [inputTitle, setInputTitle] = useState<string>("");
  const [searchBox, setSearchBox] = useState<string>("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", searchBox, categoryId],
    queryFn: () =>
      categoryId === null
        ? getAllProducts(searchBox)
        : getProductsByCategory(Number(categoryId)),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchBox(inputTitle);
    }
  };

  const clearSearch = () => {
    setInputTitle("");
  };

  const filterProducts = data?.filter((product: any) => product.title.toLowerCase().includes(inputTitle.toLowerCase()));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
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
          {
            inputTitle && (
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 "
              onClick={clearSearch}
              >
                 ✕
              </button>
            )
          }
        </div>
      </div>
      <div className="flex flex-wrap justify-center md:flex-wrap gap-4 mt-4 p-4 ">
        {filterProducts.map((product: any) => {
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
                  onClick={() => {
                    if (product.id !== undefined) {
                      setSelectedProductById(product.id);
                      setOpen(true);
                    }
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}

        {selectedProductById !== null && (
          <ProductDetailPage
            open={open}
            setOpen={setOpen}
            productId={selectedProductById}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
