import React from "react";
import femmestyle from "../../assets/femmestyle.mp4";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/apis/ProductsApi";
import { getCategories } from "@/apis/CategoriesApi";
import { Link, useNavigate } from "react-router-dom";
import { isNewProduct } from "@/lib/helper";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/contexts/WishListContext";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

const HomePage: React.FC = () => {
  const { wishlist, addToWishlist, removeFavoriteItem } = useWishlist();

  const navigate = useNavigate();
  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  const { data: categoryData } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });

  const newProducts = productData?.data?.filter((p: any) => {
    const result = isNewProduct(p.createdAt);
    return result;
  });

  const latestProducts = newProducts?.slice(0, 3);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="overflow-hidden">
      <div className="relative">
        <video
          src={femmestyle}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-primary">
            A Season of Renewel
          </h1>
          <h4 className="text-2xl mb-16 font-semibold">Welcome Autumn!</h4>
          <Link to="/products" className="flex text-lg md:text-xl cursor-pointer hover:text-primary items-center justify-center font-semibold underline underline-offset-8">
            Shop now
          </Link>
        </div>
      </div>

      {/* new products */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 mt-16 mb-16">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              New Products
            </h2>
            <h4 className="text-gray-600 mt-1">
              The latest looks, created with passion.
            </h4>
          </div>

          <div>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-sm font-medium text-black hover:text-gray-700 transition"
            >
              <span className="border-b border-transparent group-hover:border-black transition">
                View All Products
              </span>

              {/* Animated Arrow */}
              <ChevronRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll */}
  <div className="w-full overflow-x-auto py-4">
    <div className="flex gap-6 min-w-max px-1">
      {latestProducts.map((product: any) => (
        <div
          key={product.id}
          className="min-w-[250px] sm:min-w-[300px] flex-shrink-0"
        >
          <ProductCard
            product={product}
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            removeFavoriteItem={removeFavoriteItem}
            navigate={navigate}
          />
        </div>
      ))}
    </div>
  </div>
 
</div>

      {/* category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-4">
        {categoryData?.data?.map((category: any, index: number) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            className="relative group overflow-hidden shadow-md cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              <h3 className="text-white text-3xl font-semibold drop-shadow-md group-hover:scale-105 transition-transform">
                {category.name}
              </h3>
              <h4 className="text-white text-lg">{category.description}</h4>
              <button
                className="text-white text-sm font-semibold underline underline-offset-8 cursor-pointer hover:text-primary mt-8"
                onClick={() => navigate(`/products/category/${category.id}`)}
              >
                SHOP NOW
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
