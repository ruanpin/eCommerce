export interface Variant {
    color: string;
    color_code: string;
    size: string;
    price: number;
    stock: number;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    category_id: number;
    is_new: number;
    imgs: string[],
    created_at: string;
    updated_at: string;
    variants: Variant[];
    showPrice?: number
  }