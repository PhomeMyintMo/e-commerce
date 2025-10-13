import React, { useState } from "react";
import femmestyle from "../../assets/femmestyle.mp4";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/apis/ProductsApi";

const HomePage: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  const newProducts = data?.filter((p: any) => p.isNew);

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
          <h6 className="flex text-xl cursor-pointer items-center justify-center font-semibold underline underline-offset-8">
            Shop now
          </h6>
        </div>
      </div>

      <div className="">
        <div>
          <h2 className="text-xl font-medium">New Products</h2>
          <h4>The latest looks, created with passion.</h4>
        </div>
        {newProducts.map((product: any) => (
          <div>
            <img src={product.category.image}/>
            <h3>{product.category.name}</h3>
          </div>
        ))}
      </div>
      {/* <Products categoryId={selectCategory} /> */}
    </div>
  );
};

export default HomePage;
