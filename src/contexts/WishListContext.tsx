import { createContext, useContext, useState } from "react";

interface FavoriteItem {
id: number;
title: string;
price: number;
image: string;
}

interface WishlistContextType {
    wishlist: FavoriteItem[],
    addToWishlist: (item: FavoriteItem) => void;
    removeFavoriteItem: (id: number) => void;
    clearWishlist: ()=> void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider : React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [wishlist, setWishlist] = useState<FavoriteItem[]>([]);

    const addToWishlist = (item: FavoriteItem) => {
        setWishlist((prev) => {
        if (prev.some((p) => p.id === item.id)) return prev; 
        return [...prev, item];
        });
    };
 
    const removeFavoriteItem = (id: number) => {
        setWishlist((prev) => prev.filter((p)=> p.id !== id));
    };
    const clearWishlist = () => setWishlist([]);

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFavoriteItem, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = (): WishlistContextType => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
