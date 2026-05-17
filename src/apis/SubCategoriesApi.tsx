export const getSubCategories = async () => {
    try {
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/api/subcategories`
        );
        if (!result.ok) {
            throw new Error("Failed to fetch subcategories.");
        }
        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getSubCategoryById = async (subCategoryId: number) => {
    try {
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/api/subcategories/${subCategoryId}`
        );
        if (!result.ok) {
            throw new Error("Failed to fetch subcategory.");
        }

        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};