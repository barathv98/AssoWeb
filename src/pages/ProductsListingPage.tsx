import { useParams } from "react-router-dom";
import ProductListing from "../components/ProductListing";
import { prekgBooksList } from "../data/books/prekg";
import { termBooksList } from "../data/books/termBooks";
import { tamilSeriesBooksList } from "../data/books/tamilSeries";
import { tamilWritingBooksList } from "../data/books/tamilWriting";
import { engWritingBooksList } from "../data/books/engWriting";
import { gkBooksList } from "../data/books/gk";
import { hindiBooksList } from "../data/books/hindi";
import { computerBooksList } from "../data/books/computer";
import { drawingBooksList } from "../data/books/drawing";
import ProductCategories from "../components/ProductCategories";

const ProductsListingPage = () => {
    const { product } = useParams();
    let productList;
    if (product === 'prekg')
        productList = prekgBooksList;
    else if (product === 'term-books')
        productList = termBooksList;
    else if (product === 'tamil-series')
        productList = tamilSeriesBooksList;
    else if (product === 'tamil-writing')
        productList = tamilWritingBooksList;
    else if (product === 'eng-writing')
        productList = engWritingBooksList;
    else if (product === 'gk')
        productList = gkBooksList;
    else if (product === 'hindi')
        productList = hindiBooksList;
    else if (product === 'computer')
        productList = computerBooksList;
    else if (product === 'drawing')
        productList = drawingBooksList;
    else if (product === 'books')
        return <ProductCategories />;
    return (
        <ProductListing  productList={productList} />
    );
};

export default ProductsListingPage;
