export interface Products{
    id: string | number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    subcategoryId: number;
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: [];
    isNew?: boolean;
}

export interface ProductResponseType extends Array<Products>{}