import { getCategories } from "@/apis/CategoriesApi";
import { getAllProducts } from "@/apis/ProductsApi"; // add getProductsByCategory
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ArrowDown } from "lucide-react";
import { useWishlist } from "@/contexts/WishListContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { useNavigate } from "react-router-dom"; // add useParams
import { ProductCard } from "@/components/ProductCard";
import { motion } from "motion/react";
import { useSearchParams } from "react-router-dom";

const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();

  const initialCategoryId =
    searchParams.get("categoryId") || "all";

  const initialSubCategoryId =
    searchParams.get("subcategoryId") || "all";

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string>(initialCategoryId);

  const [selectedSubCategoryId, setSelectedSubCategoryId] =
    useState<string>(initialSubCategoryId);


  const { data: categoryData = [], isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });
  const selectedCategory = categoryData.find(
    (cat: any) => String(cat.id) === selectedCategoryId
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <div className="items-center justify-center p-2 text-center">
        <div className="text-3xl font-black tracking-tight text-gray-900 mb-4">
          {selectedCategoryId === "all"
            ? "All Products"
            : selectedCategory?.name}
        </div>

        <div className="flex gap-2 justify-center text-muted-foreground">
          Choose your favorite Categories here
          <ArrowDown className="animate-bounce" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 px-6 py-8">
        <button
          onClick={() => {
            setSelectedCategoryId("all");
            setSelectedSubCategoryId("all");
          }}
          className={`
            relative overflow-hidden px-5 py-2.5
            text-sm uppercase tracking-wide transition-all duration-200
            hover:scale-[1.02] active:scale-[0.98] cursor-pointer
            ${selectedCategoryId === "all"
              ? "font-bold"
              : "text-muted-foreground hover:font-bold"
            }
          `}
        >
          <span className="">All</span>
        </button>

        {categoryData.map((category: any) => {
          const isActive = selectedCategoryId === String(category.id);

          return (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategoryId(String(category.id));
                setSelectedSubCategoryId("all");
              }}
              className={`
                relative overflow-hidden px-5 py-2.5
                text-sm uppercase tracking-wide transition-all duration-200
                hover:scale-[1.02] active:scale-[0.98] cursor-pointer
                ${isActive
                  ? "font-bold"
                  : "text-muted-foreground hover:font-bold"
                }
              `}
            >
              <span className="">{category?.name || "-"}</span>
            </button>
          );
        })}
      </div>

      {/* Subcategories */}
      {selectedCategoryId !== "all" &&
        selectedCategory?.subcategories?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 pb-8">
            <button
              onClick={() => setSelectedSubCategoryId("all")}
              className={`px-4 py-2 text-sm cursor-pointer
              ${selectedSubCategoryId === "all"
                  ? "font-bold"
                  : "text-muted-foreground"
                }`}
            >
              All
            </button>

            {selectedCategory.subcategories.map((sub: any) => (
              <button
                key={sub.id}
                onClick={() =>
                  setSelectedSubCategoryId(String(sub.id))
                }
                className={`px-4 py-2  text-sm cursor-pointer
                ${selectedSubCategoryId === String(sub.id)
                    ? "font-bold"
                    : "text-muted-foreground"
                  }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}

      <div>

        <Products
          categoryId={
            selectedCategoryId === "all"
              ? undefined
              : selectedCategoryId
          }
          subCategoryId={
            selectedSubCategoryId === "all"
              ? undefined
              : selectedSubCategoryId
          }
        />
      </div>
    </div>
  );
};

const Products: React.FC<{ categoryId?: string; subCategoryId?: string; }> = ({ categoryId, subCategoryId }) => {
  const { wishlist, addToWishlist, removeFavoriteItem } = useWishlist();
  const [sortOption, setSortOption] = useState<string>("default");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", categoryId, subCategoryId],
    queryFn: () =>
      getAllProducts(
        categoryId ? Number(categoryId) : undefined,
        subCategoryId
          ? Number(subCategoryId)
          : undefined
      ),
  });

  const sortedData = React.useMemo(() => {
    if (!data) return [];
    if (sortOption === "lowToHigh")
      return [...data].sort((a, b) => a.price - b.price);
    if (sortOption === "highToLow")
      return [...data].sort((a, b) => b.price - a.price);
    return data;
  }, [data, sortOption]);

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

      <div className="mt-10">
        {sortedData?.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-gray-900">
                  Featured Products
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Showing {sortedData.length} available products
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
              {sortedData.map((product: any, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                  className="group"
                >
                  <div className="transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl rounded-3xl">
                    <ProductCard
                      product={product}
                      wishlist={wishlist}
                      addToWishlist={addToWishlist}
                      removeFavoriteItem={removeFavoriteItem}
                      navigate={navigate}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50 py-24 px-6 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-4xl">📦</span>
            </div>

            <h3 className="text-2xl font-black tracking-tight text-gray-900">
              No Products Found
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              We couldn't find any products in this category right now. Try
              selecting another category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
