import { BooksLists } from "./interface";

export const booksList: BooksLists = [
    {
        categoryId: 1,
        categoryName: 'PreKG',
        categoryBooks: [
            {
                id: 1,
                name: 'Twinkle Series',
                description: 'asdfhasdbfmsad fsadf sadf sdaf ',
                price: 100,
                question: true,
                questionPrice: 0,
                cd: true,
                cdPrice: 0,
                badgeText: '',
                imgName: 'book.jpg',
            },
            {
                id: 2,
                name: 'Six in one',
                description: 'asdf sd f sd asd f asda fas df sad f sda fasd f sd',
                price: 150,
                question: true,
                questionPrice: 20,
                cd: true,
                cdPrice: 10,
                badgeText: '',
                imgName: 'book.jpg',
            },
            {
                id: 3,
                name: 'Six in one',
                description: '',
                price: 150,
                question: true,
                questionPrice: 20,
                cd: false,
                cdPrice: 0,
                badgeText: '',
                imgName: 'book.jpg',
            },
            {
                id: 4,
                name: 'Six in one',
                description: '',
                price: 150,
                question: true,
                questionPrice: 20,
                cd: false,
                cdPrice: 0,
                badgeText: '',
                imgName: 'book.jpg',
            }
        ]
    }
];