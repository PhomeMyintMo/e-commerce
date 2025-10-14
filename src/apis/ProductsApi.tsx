
export const getAllProducts = async () => {
    try{
        const result = await fetch(`http://localhost:5000/products`);
        console.log("products:", result);
        return result.json();
    }catch(error){
        throw new Error("Failed to fetch products.");
    }
}

export const getProductDetail = async (productId: number) => {
    try{
        const result = await fetch(`http://localhost:5000/products/${productId}`);
        return result.json();
    }catch(error){
        throw new Error("Failed to fetch product detail.");
    }
}