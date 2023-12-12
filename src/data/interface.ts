export interface Product {
    id: number;
    name: string;
    billingName: string;
    description: string;
    price: number;
    imgName: string;
    question?: boolean;
    questionPrice?: number;
    cd?: boolean;
    cdPrice?: number;
    badgeText?: string;
    highlights?: string;
}

export interface ProductsList {
    categoryId: number;
    categoryName: string;
    categoryBooks: Array<Product>;
}

export type ProductsLists = Array<ProductsList>;

export interface OrderItem {
    id: number;
    billingName: string;
    quantity: number;
    price: number;
    question?: boolean;
    cd?: boolean;
}

export type CartItems = Array<OrderItem>;

export interface UserDetail {
    mobile: string;
    name?: string;
    address?: string;
    city?: string;
    pincode?: string;
    district?: string;
    state?: string;
    secContactNum?: string;
    transport?: string;
}
