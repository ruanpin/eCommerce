export interface ColorSet {
  color: string;
  color_code: string
}

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
    showPrice?: number,
    category_name?: string,
    price?: number
  }

export type CartItem = Omit<Product, 'id'> & {
    id: number;
    quantity: number;
    color: string;
    size: string;
    product_id: number;
    color_code: string;
    checked: number
}

export interface OrderSnapshot {
  productId: number;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  imgs: string[]
}

export interface Order {
  id: number;
  user_id: number;
  total_price: string;
  status: string;
  created_at: string;
  snapshot: OrderSnapshot[];
}
