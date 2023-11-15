import { useEffect } from "react";
import Products from "../components/Products";

const ProductsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Products />
        </>
    );
};

export default ProductsPage;
