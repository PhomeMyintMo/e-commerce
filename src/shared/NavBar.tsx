import { useCart } from "@/contexts/CartContext";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Menu,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getCategories } from "@/apis/CategoriesApi";
import { useQuery } from "@tanstack/react-query";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [selectCategory, setSelectCategory] = useState<any>(null);
  const [menuLevel, setMenuLevel] = useState<
    "main" | "categories" | "subcategories"
  >("main");
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <header className="top-0 sticky z-10 shadow-lg px-4 bg-neutral-50">
      <div className="flex justify-between items-center py-4">
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-secondary"
          >
            Home
          </button>
          <button
            onClick={() => {
              setSelectCategory(null);
              navigate("/products");
            }}
            className={`cursor-pointer hover:text-secondary px-2 py-2 ${
              selectCategory === null ? "text-slate-900" : "hover:bg-secondary"
            }`}
          >
            Shop
          </button>

          <div className="relative group inline-block">
            {/* Parent button */}
            <button className="flex items-center gap-1 py-2 cursor-pointer hover:text-secondary">
              Products
              <span className="text-xs bg-slate-400 rounded px-2 py-0.5">
                Categories
              </span>
            </button>

            {/* Dropdown (mega menu) */}
            <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50 w-[700px] p-6">
              <div className="grid grid-cols-3 gap-8">
                {data?.map((category: any) => (
                  <div key={category.id}>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {category.name}
                    </h3>
                    <ul className="space-y-1">
                      {category.subcategories?.map((sub: any) => (
                        <li key={sub.id}>
                          <button className="text-sm text-gray-600 hover:text-primary transition">
                            {sub.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
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
          <p className="flex text-primary items-center justify-center font-semibold text-2xl">
            FemmeStyle
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-row gap-4">
          <Link
            className={`p-2 rounded-lg cursor-pointer
      ${
        location.pathname.startsWith("/wishlist")
          ? "bg-secondary"
          : "hover:bg-secondary"
      }`}
            to="/wishlist"
          >
            <Heart size={24} strokeWidth={1} className="" />
          </Link>

          <Link
            className={`p-2 relative rounded-lg cursor-pointer 
      ${
        location.pathname.startsWith("/cart")
          ? "bg-secondary"
          : "hover:bg-secondary"
      }`}
            to="/cart"
          >
            <ShoppingCart size={24} strokeWidth={1} className="" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
          className={`p-2 rounded-lg cursor-pointer ${location.pathname.startsWith("/login") ? "bg-secondary" : "hover::bg-secondary"}` } 
          to="/login"
          >
          <UserRound size={24} strokeWidth={1}/>
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 items-center bg-blue-50 rounded-b-lg shadow-inner">
          {menuLevel === "main" && (
            <div className="flex flex-col gap-4 mt-2 w-full items-start">
              <button>Home</button>

              <button>Shop</button>

              <button
                className="flex items-center  gap-2 cursor-pointer"
                onClick={() => setMenuLevel("categories")}
              >
                Products
                <span className="text-xs bg-slate-400 rounded px-2 py-0.5">
                  Categories
                </span>
                <span>
                  <ChevronRight size={16} strokeWidth={1} />
                </span>
              </button>

              <button
              className="flex items-center gap-2 cursor-pointer"
              >
                <UserRound size={16} strokeWidth={1}/>
                <span>Login</span>
              </button>
            </div>
          )}

          {menuLevel === "categories" && (
            <div className="flex flex-col gap-4 mt-2 w-full">
              <button
                onClick={() => setMenuLevel("main")}
                className="cursor-pointer flex flex-row gap-2 items-center justify-center hover:font-semibold"
              >
                <ChevronLeft size={16} strokeWidth={1} />
                <span>Back</span>
              </button>
              <h3 className="text-lg font-medium">Products</h3>
              {data?.map((category: any) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setMenuLevel("subcategories");
                    setSelectCategory(category);
                  }}
                  className="flex justify-between cursor-pointer hover:text-primary"
                >
                  <span>{category.name}</span>
                  <ChevronRight size={16} strokeWidth={1} />
                </button>
              ))}
            </div>
          )}

          {menuLevel === "subcategories" && (
            <div className="flex flex-col gap-4 mt-2 w-full">
              <button
                onClick={() => setMenuLevel("categories")}
                className="cursor-pointer flex flex-row gap-2 items-center justify-center hover:font-semibold"
              >
                <ChevronLeft size={16} strokeWidth={1} />
                <span>Back</span>
              </button>
              <h3 className="text-lg font-medium">{selectCategory.name}</h3>
              {selectCategory.subcategories?.map((subcategory: any) => (
                <button
                  key={subcategory.id}
                  className="flex items-start cursor-pointer hover:text-primary"
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          )}

        </div>
      )}
    </header>
  );
};

export default NavBar;
