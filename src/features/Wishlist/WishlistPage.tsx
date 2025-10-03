import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishListContext'
import { ArrowLeft, Heart } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const WishlistPage : React.FC = () => {
  const {wishlist, removeFavoriteItem} = useWishlist();
  const navigate = useNavigate();
  return (
    <div>
      <Button className="cursor-pointer bg-slate-200 px-2 hover:bg-slate-300 flex items-start ms-8" onClick={()=> navigate("/")}><ArrowLeft className="text-black" /></Button>
        {wishlist.length > 0 ? (
          <div className='flex flex-wrap items-center justify-center md:flex-wrap gap-4 mt-4 p-4'>
            {wishlist.map((wishlist: any)=> (
              <div key={wishlist.id} className='border rounded p-2 w-80'>
                <div className='relative'>
                  <img
                  src={wishlist.image}
                  alt={wishlist.title}
                  className='h-full w-full object-cover rounded'
                  />
                  <button onClick={()=> removeFavoriteItem(wishlist.id)}>
                  <Heart className='absolute right-2 bottom-8 transition-colors duration-200 stroke-1'
                  fill="red" 
                  color='red'
                  />
                </button>
                </div>
                <p className="mt-2 text-sm font-medium">{wishlist.title}</p>
                <p className="text-gray-500">${wishlist.price}</p>
                </div>
            ))}
          </div>
        ) : (
          <div>
            0 items in your wish list.
          </div>
        )}
    </div>
  )
}

export default WishlistPage