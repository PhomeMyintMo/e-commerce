import { useCart } from "@/contexts/CartContext";
// import { useWishlist } from "@/contexts/WishListContext";
import { Heart, Menu, ShoppingCart, UserRound, X } from "lucide-react";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="top-0 sticky z-10 shadow-lg px-4 bg-slate-200 mb-2">
      <div className="flex justify-between items-center py-4">
        {/* Left side */}
        <div className="flex gap-4">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
          <p className="flex items-center font-semibold text-lg">React Shop</p>
        </div>

        <div className="flex flex-row gap-4">
          <Link
            className={`p-2 rounded-lg cursor-pointer 
      ${
        location.pathname.startsWith("/wishlist")
          ? "bg-slate-400"
          : "hover:bg-slate-400"
      }`}
            to="/wishlist"
          >
            <Heart size={24} />
          </Link>

          <Link
            className={`p-2 relative rounded-lg cursor-pointer 
      ${
        location.pathname.startsWith("/cart")
          ? "bg-slate-400"
          : "hover:bg-slate-400"
      }`}
            to="/cart"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 items-center">
          <div className="flex gap-4">
            <UserRound className="border rounded-full border-black" />
            Account
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
