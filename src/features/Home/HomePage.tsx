import React, { useState } from "react";
import femmestyle from "../../assets/femmestyle.mp4";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/apis/ProductsApi";
import type { ProductResponseType } from "../Products/type";
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


  const newProducts = productData?.filter((p: any) => p.isNew === true);
  console.log("new products:", newProducts);

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
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-primary">
            A Season of Renewel
          </h1>
          <h4 className="text-2xl mb-16 font-semibold">Welcome Autumn!</h4>
          <h6 className="flex text-lg md:text-xl cursor-pointer items-center justify-center font-semibold underline underline-offset-8">
            Shop now
          </h6>
        </div>
      </div>

      {/* new products */}
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 mt-16 mb-16">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold">New Products</h2>
            <h4 className="text-gray-600">The latest looks, created with passion.</h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8">
            {newProducts?.map((product: any) => (
              <div
                key={product.id}
                className="flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
              > 
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-full aspect-square object-cover  shadow-md"
                />
                <h3 className="mt-2 font-medium text-sm sm:text-base md:text-lg">
                  {product.title}
                </h3>
              </div>
            ))}
            
          </div>
        </div>


      {/* category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-4">
        {categoryData?.map((category: any) => (
          <div
            key={category.id}
            className="relative group overflow-hidden  shadow-md cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Centered text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              <h3 className="text-white text-3xl font-semibold drop-shadow-md group-hover:scale-105 transition-transform">
                {category.name}
              </h3>
              <h4 className="text-white text-lg">{category.description}</h4>
              <button className="text-white text-sm font-semibold underline underline-offset-8 cursor-pointer hover:text-primary mt-8" onClick={() =>navigate(`/products/${category.name}`)}>SHOP NOW</button>
            </div>
          </div>
        ))}
      </div>

      {/* <Products categoryId={selectCategory} /> */}
    </div>
  );
};

export default HomePage;
