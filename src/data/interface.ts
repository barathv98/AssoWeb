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
