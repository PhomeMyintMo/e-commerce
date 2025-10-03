
export const getAllProducts = async (title?: string) => {
    try{
        const result = await fetch(`http://localhost:5000/products?title=${title}`);
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