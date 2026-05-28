export const getAllProducts = async (categoryId?:number, subcategoryId?:number) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/products?categoryId=${categoryId}&subcategoryId=${subcategoryId}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products.");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getProductDetail = async (productId: number) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/products/${productId}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch product detail.");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
