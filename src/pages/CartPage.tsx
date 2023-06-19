import { useState } from "react";
import CartDetails from "../components/CartDetails";
import CartAddress from "../components/CartAddress";

const CartPage = () => {
    const [cartDetails, setCartDetails] = useState<boolean>(true);
    return (
        <>
            {cartDetails && <CartDetails setCartDetails={setCartDetails} />}
            {!cartDetails && <CartAddress setCartDetails={setCartDetails} />}
        </>
    );
};

export default CartPage;
