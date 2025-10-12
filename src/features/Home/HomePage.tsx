import React, {useState} from "react";
import femmestyle from "../../assets/femmestyle.mp4";
import Products from "../Products/Products";

const HomePage: React.FC = () => {
    const [selectCategory, setSelectCategory] = useState<number | null>(null);
  
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
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-pink-400">A Season of Renewel</h1>
        <h4 className="text-2xl mb-16 font-semibold">Welcome Autumn!</h4>
        <h6 className="flex text-xl cursor-pointer items-center justify-center  font-semibold underline underline-offset-8">Shop now</h6>
      </div>
      </div>


        <Products categoryId={selectCategory} />
    </div>
  );
};

export default HomePage;