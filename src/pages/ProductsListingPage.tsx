import ProductListing from "../components/ProductListing";
import { booksList } from "../data/booksList";

const ProductsListingPage = () => {
    let productList;
        productList = booksList
    return (
        <ProductListing  productList={productList} />
    );
};

export default ProductsListingPage;
