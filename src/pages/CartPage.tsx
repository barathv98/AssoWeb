import { useEffect } from "react";
import CartDetails from "../components/CartDetails";

const CartPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <CartDetails />
    );
};

export default CartPage;
