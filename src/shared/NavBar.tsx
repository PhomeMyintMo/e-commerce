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
import { getSubCategories } from "@/apis/SubCategoriesApi";
import { useWishlist } from "@/contexts/WishListContext";
import LoginPage from "@/features/Auth/LoginPage";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  const totalItems = cart.length;
  const [selectCategory, setSelectCategory] = useState<any>(null);
  const [menuLevel, setMenuLevel] = useState<
    "main" | "categories" | "subcategories"
  >("main");
  const navigate = useNavigate();

  const {
    data: subCategoriesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: () => getSubCategories(),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  console.log(categoriesData?.data)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
    <header className="top-0 sticky z-10 shadow-lg px-4 bg-neutral-50">
      <div className="flex justify-between items-center py-4">
        <div className="hidden md:flex gap-4">
          <Link
            to="/"
            className={`px-4 py-2 transition-colors duration-200 border-b-2
    ${
      location.pathname === "/"
        ? "border-black text-black font-semibold"
        : "border-transparent text-gray-500 hover:text-black hover:border-gray-300"
    }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`px-4 py-2 transition-colors duration-200 border-b-2
    ${
      location.pathname.startsWith("/products")
        ? "border-black text-black font-semibold"
        : "border-transparent text-gray-500 hover:text-black hover:border-gray-300"
    }`}
          >
            Shop
          </Link>

          <div className="relative group inline-block">
            <button className="flex items-center gap-1 py-2 cursor-pointer hover:text-black font-semi-bold text-gray-500">
              Products
              <span className="text-xs bg-slate-400 rounded px-2 py-0.5">
                Categories
              </span>
            </button>

          
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
              <div className="w-[700px] bg-white border rounded-xl shadow-xl p-6">
                <div className="grid grid-cols-3 gap-8">
                  {categoriesData?.data?.map((category: any) => {
                    {
                      /* 2. Find all subcategories that belong to this specific category */
                    }
                    const filteredSubs = subCategoriesData?.data?.filter(
                      (sub: any) => sub.categoryId === category.id,
                    );

                    return (
                      <div key={category.id} className="space-y-3">
                        <h3 className="font-semibold text-sm text-gray-900 border-b pb-1.5">
                          {category.name}
                        </h3>

                        <ul className="space-y-2">
                          {filteredSubs && filteredSubs.length > 0 ? (
                            filteredSubs.map((sub: any) => (
                              <li key={sub.id}>
                                <Link to={`/products?categoryId=${category.id}&subcategoryId=${sub.id}`} className="text-sm text-gray-500 hover:text-black hover:translate-x-1 transition-all duration-150 block w-full text-left">
                                  {sub.name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li className="text-xs italic text-gray-400">
                              No items available
                            </li>
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
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
            className={`p-2 relative rounded-lg cursor-pointer
      ${
        location.pathname.startsWith("/wishlist")
          ? "bg-secondary"
          : "hover:bg-secondary"
      }`}
            to="/wishlist"
          >
            <Heart size={24} strokeWidth={1} className="" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-foreground/50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
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
          <div className={`p-2 rounded-lg cursor-pointer`} onClick={() => setModalOpen(true)}>
            <UserRound size={24} strokeWidth={1} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 items-center bg-blue-50 rounded-b-lg shadow-inner">
          {menuLevel === "main" && (
            <div className="flex flex-col gap-4 mt-2 w-full items-start">
              <button onClick={() => navigate("/")}>Home</button>

              <button onClick={() => navigate("/products")}>Shop</button>

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

              <button className="flex items-center gap-2 cursor-pointer">
                <UserRound size={16} strokeWidth={1} />
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
              {categoriesData?.map((category: any) => (
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
    <LoginPage
    isOpen={modalOpen}
    onClose={() => setModalOpen(false)}
    />
    </>
  );
};

export default NavBar;
