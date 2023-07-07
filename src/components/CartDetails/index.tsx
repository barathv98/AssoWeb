import { FC } from "react";
import useGeneral from "../../useGeneral";
import { formatCurrency } from "../../utils/formatUtil";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import styles from './styles.module.scss';

interface CartDetailsProps {
    setCartDetails: (state: boolean) => void;
}
const CartDetails: FC<CartDetailsProps> = ({ setCartDetails }) => {
    const { isMobileTablet } = useDeviceDetect();
    const { cart, orderTotal } = useGeneral();
    console.log(cart);
    return (
        <div className={styles.cart}>
            <div className={styles.title}>Your Shopping Cart</div>
            {cart.length ?
            (<div>
                <div className={styles.rowHeading}>
                    {!isMobileTablet && <div className={styles.widthSlNo}>Sl. No.</div>}
                    <div className={`${styles.widthBook} ${isMobileTablet ? styles.alignStart : ''}`}>Book Name</div>
                    {!isMobileTablet && 
                        <>
                            <div className={styles.width18}>Quantity</div>
                            <div className={styles.width18}>Rate / Copy</div>
                        </>
                    }
                    <div className={`${isMobileTablet ? `${styles.width40} ${styles.alignEnd}` : styles.width18}`}>Amount</div>
                </div>
                {cart.map((item, index) => {
                    return (
                        <div className={`${styles.rowHeading} ${styles.itemRow}`} key={index}>
                            {!isMobileTablet && <div className={styles.widthSlNo}>{index + 1}</div>}
                            <div className={`${styles.widthBook} ${styles.bookRow}`}>
                                {item.name}
                                {isMobileTablet && <div className={styles.quantityRow}>Qty: {item.quantity} x ₹{item.price}</div>}
                            </div>
                            {!isMobileTablet && 
                                <>
                                    <div className={styles.width18}>{item.quantity}</div>
                                    <div className={styles.width18}>₹ {formatCurrency(item.price)}</div>
                                </>
                            }
                            <div className={`${styles.weight500} ${isMobileTablet ? `${styles.width40} ${styles.alignEnd}` : styles.width18}`}>₹ {formatCurrency(item.price * item.quantity)}</div>
                        </div>
                    );
                })}
                <div className={`${styles.rowHeading} ${styles.totalRow}`}>
                    <div className={`${isMobileTablet ? `${styles.widthBook} ${styles.alignStart}` : styles.width18}`}>Total Amount</div>
                    <div className={`${styles.weight500} ${isMobileTablet ? `${styles.width40} ${styles.alignEnd}` : styles.width18}`}>₹ {formatCurrency(orderTotal)}</div>
                </div>
                <div className={`${styles.rowHeading} ${styles.checkoutRow}`}>
                    <div className={styles.text}>Please review the items and click the button to checkout</div>
                    <button className={styles.checkoutButton} onClick={() => setCartDetails(false)}>PROCEED TO CHECKOUT</button>
                </div>
            </div>)
            : (
                <>
                    <div>No items found</div>
                    <div>Please proceed to add items</div>
                </>
            )}
        </div>
    );
};

export default CartDetails;
