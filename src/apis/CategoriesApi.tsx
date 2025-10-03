
export const getCategories = async () => {
    try{
        const result = await fetch('http://localhost:5000/categories');
        return result.json();
    }catch(error){
        throw new Error("Failed to fetch categories.");
    }
}

export const getProductsByCategory = async (categoryId: number) => {
    try{
        const result = await fetch(`http://localhost:5000/products?categoryId=${categoryId}`);
        return result.json();
    }catch(error){
        throw new Error("Failed to fetch products by category.");
    }
}