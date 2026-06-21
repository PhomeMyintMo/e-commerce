import { getCategories } from '@/apis/CategoriesApi'
import Products from '@/features/Products/Products';
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const Header: React.FC = () => {
  const [selectCategory, setSelectCategory] = useState<number | null>(null);


  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });


  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error: {error.message}</div>

  return (
  <>
  <div className="max-w-6xl mx-auto px-4"> 
    <div className="flex flex-wrap gap-4 justify-center mt-4 mb-4">
      <button
        onClick={() => setSelectCategory(null)}
        className={`cursor-pointer px-4 py-2 ${
          selectCategory === null
            ? "bg-blue-400 text-white"
            : "hover:bg-gray-200"
        }`}
      >
        All
      </button>
      {data?.map((category: any) => (
        <button
          key={category.id}
          onClick={() => setSelectCategory(category.id)}
          className={` cursor-pointer px-4 py-2 ${
            selectCategory === category.id
              ? "bg-blue-400 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>

    {/* <div>
      <video
      src={femmestyle}
      autoPlay
      loop
      muted
      playsInline
      className='w-full h-full object-cover'
      />
    </div> */}

    {/* <Products categoryId={selectCategory} /> */}
  </div>
  </>
  )
}

export default Header
