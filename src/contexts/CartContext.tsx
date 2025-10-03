import { createContext, useContext, useState } from "react";

interface CartItem {
id: number;
title: string;
price: number;
image: string;
quantity: number;
}

interface CartContextType {
    cart: CartItem[],
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    decreaseCartItem : (id: number) => void;
    removeCartItem: (id: number) => void;
    clearCart: ()=> void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider : React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: Omit<CartItem, "quantity">) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === item.id);
            if(existing){
                return prev.map((p) => p.id === item.id ? {...p, quantity: p.quantity+1} : p);
            }
            return [...prev, {...item, quantity : 1}];
        })
    };

    const decreaseCartItem = (id: number) => {
        setCart((prev) => {
            return prev.map((p) => p.id === id ? {...p, quantity: Math.max(p.quantity -1 , 1)} : p); 
        });
    }
 
    const removeCartItem = (id: number) => {
        setCart((prev) => prev.filter((p)=> p.id !== id));
    };
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeCartItem, clearCart, decreaseCartItem }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
