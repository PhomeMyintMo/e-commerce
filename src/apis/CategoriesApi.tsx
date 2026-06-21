
export const getCategories = async () => {
    try {
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/api/categories`
        );
        if (!result.ok) {
            throw new Error("Failed to fetch categories.");
        }
        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCategoryById = async (categoryId: number) => {
    try {
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/api/categories/${categoryId}`
        );
        if (!result.ok) {
            throw new Error("Failed to fetch categories.");
        }

        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryId: number) => {
    try{
        const result = await fetch(`http://localhost:5000/products?categoryId=${categoryId}`);
        return result.json();
    }catch(error){
        throw new Error("Failed to fetch products by category.");
    }
}

export const getProductDetailByCategory = async (categoryId: number, id: number) => {
     try{
        const result = await fetch(`http://localhost:5000/products?categoryId=${categoryId}&id=${id}`);
        const data = await result.json();
        return data[0];
    }catch(error){
        throw new Error("Failed to fetch product detail by category.");
    }
}