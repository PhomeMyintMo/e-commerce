export interface Products {
 id: number;
 name:string;
 description:string;
 price: number;
 stock:number;
 images: [];
 category: {
    id:number;
    name:string;
    description:string;
    image?:string;
 };
 subcategory: {
    id:number;
    name:string;
    description:string;
    image?:string;
    categoryId:number;
 };
 variants: Variants[]
}

export interface Variants{
   id: number;
   productId: number;
   size: number;
   color:string;
   stock:number;
}
export interface ProductResponseType{
   data: Products[]
}