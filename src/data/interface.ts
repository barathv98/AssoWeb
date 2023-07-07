export interface Book {
    id: number;
    name: string;
    description: string;
    price: number;
    question: boolean;
    questionPrice: number;
    cd: boolean;
    cdPrice: number;
    badgeText: string;
    imgName: string;
}

export interface BooksList {
    categoryId: number;
    categoryName: string;
    categoryBooks: Array<Book>;
}

export type BooksLists = Array<BooksList>;

export interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    question: boolean;
    cd: boolean;
    price: number;
}

export type CartItems = Array<OrderItem>;
