import { useCart } from "@/contexts/CartContext";
import { ChevronDown, Heart, Menu, ShoppingCart, X } from "lucide-react";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getCategories } from '@/apis/CategoriesApi'
import { useQuery } from '@tanstack/react-query'


const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [selectCategory, setSelectCategory] = useState<number | null>(null);


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <header className="top-0 sticky z-10 shadow-lg px-4 bg-neutral-50 ">
      <div className="flex justify-between items-center py-4">
        <div className="hidden md:flex">
          {/* <button
        onClick={() => setSelectCategory(null)}
        className={`cursor-pointer px-4 py-2 ${
          selectCategory === null
            ? "bg-blue-400 text-white"
            : "hover:bg-gray-200"
        }`}
      >
        All
      </button> */}
          {data?.map((category: any) => (
            <button
              key={category.id}
              onClick={() => setSelectCategory(category.id)}
              className={`cursor-pointer px-4 py-2 flex items-center gap-1 ${selectCategory === category.id ? 
                "text-pink-400" : "hover:text-pink-400"
                }`}
            >
              <span>{category.name}</span>
              <ChevronDown size={12} strokeWidth={1}/>
            </button>
          ))}
          <div className="">
            {
              data?.subcategories?.map((subcategory:any)=>{
                <button>
                  {subcategory.name}
                </button>
              })
            }
          </div>
        </div>
        {/* middle */}
        <div className="flex md:-translate-x-1/2">
          <button
            className="md:hidden cursor-pointer "
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X strokeWidth={1} /> : <Menu strokeWidth={1} />}
          </button>
          <p className="flex text-primary items-center justify-center font-semibold text-2xl">FemmeStyle</p>
        </div>

        {/* Right */}
        <div className="flex flex-row gap-4">
          <Link
            className={`p-2 rounded-lg cursor-pointer
      ${location.pathname.startsWith("/wishlist")
                ? "bg-pink-200"
                : "hover:bg-pink-200"
              }`}
            to="/wishlist"
          >
            <Heart size={24} strokeWidth={1} className="text-pink-400"/>
          </Link>

          <Link
            className={`p-2 relative rounded-lg cursor-pointer 
      ${location.pathname.startsWith("/cart")
                ? "bg-pink-200"
                : "hover:bg-pink-200"
              }`}
            to="/cart"
          >
            <ShoppingCart size={24} strokeWidth={1} className="text-pink-400"/>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 items-center bg-blue-50 rounded-b-lg shadow-inner">
          <div className="flex flex-col gap-4 mt-2 w-full">
            {data?.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectCategory(category.id)}
                className={` cursor-pointer px-4 py-2 ${selectCategory === category.id
                  ? "bg-blue-400 text-white"
                  : "hover:bg-gray-200"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
