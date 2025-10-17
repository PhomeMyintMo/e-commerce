import React, { useState } from "react";
import femmestyle from "../../assets/femmestyle.mp4";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/apis/ProductsApi";
import type { ProductResponseType } from "../Products/type";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCategories } from "@/apis/CategoriesApi";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery<ProductResponseType>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  const { data: categoryData } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });

  const newProducts = productData?.filter((p: any) => p.isNew);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
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
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-pink-400">
            A Season of Renewel
          </h1>
          <h4 className="text-2xl mb-16 font-semibold">Welcome Autumn!</h4>
          <h6 className="flex text-lg md:text-xl cursor-pointer items-center justify-center font-semibold underline underline-offset-8">
            Shop now
          </h6>
        </div>
      </div>

      {/* new products */}
      <ScrollArea>
        <div className="">
          <div className="mb-4">
            <h2 className="text-xl font-medium">New Products</h2>
            <h4>The latest looks, created with passion.</h4>
          </div>
          <div className="flex gap-8 items-center justify-center">
            {newProducts?.map((product: any) => (
              <div className="px-16 ">
                <img
                  src={product.category.image}
                  className="w-40 h-40 border-2"
                />
                <h3 className="font-medium">{product.category.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" className="text-slate-950" />
      </ScrollArea>

      {/* category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16 mt-4">
        {categoryData?.map((category: any) => (
          <div
            key={category.id}
            className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Centered text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              <h3 className="text-white text-3xl font-semibold drop-shadow-md group-hover:scale-105 transition-transform">
                {category.name}
              </h3>
              <h4 className="text-white text-lg">{category.description}</h4>
              <button className="text-white text-sm font-semibold underline underline-offset-8 cursor-pointer hover:text-primary mt-8" onClick={()=>navigate("/products")}>SHOP NOW</button>
            </div>
          </div>
        ))}
      </div>

      {/* <Products categoryId={selectCategory} /> */}
    </div>
  );
};

export default HomePage;
