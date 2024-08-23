import { useEffect } from "react";
import CartAddress from "../components/CartAddress";

const PlaceOrderPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <CartAddress />
    );
};

export default PlaceOrderPage;
