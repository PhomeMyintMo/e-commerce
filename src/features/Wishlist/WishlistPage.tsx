import { ProductCard } from '@/components/ProductCard';
import { useWishlist } from '@/contexts/WishListContext'
import {ChevronLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const WishlistPage: React.FC = () => {

  const {
    wishlist,
    addToWishlist,
    removeFavoriteItem
  } = useWishlist();

  const navigate = useNavigate();

  return (
    <div className='p-4'>

      <h1 className="font-semibold text-3xl mb-8 flex justify-center items-center">
        Your Favorites
      </h1>


      {wishlist.length > 0 ? (
        <>      <button className="flex cursor-pointer items-center gap-2" onClick={() => navigate("/products")}><ChevronLeft size={18} />Continue Shopping</button>


          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>

            {wishlist.map((item: any) => (

              <ProductCard
                key={item.id}
                product={item}
                wishlist={wishlist}
                addToWishlist={addToWishlist}
                removeFavoriteItem={removeFavoriteItem}
                navigate={navigate}
              />

            ))}

          </div>
        </>

      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="font-medium text-lg">          
            0 items in your wish list.
          </h1>
          <p className="text-sm py-4">Go back to <span className="font-semibold underline underline-offset-2 text-blue-500 cursor-pointer hover:scale-110" onClick={() => navigate("/products")}>product page</span>  and add items to your favorites.</p>
        </div>


      )}
    </div>
  )
}

export default WishlistPage;