import { FC, useCallback } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import useGeneral from "../../useGeneral";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from './styles.module.scss';
import { useRequestRemoveCart } from "../../useRequest";
import { rupee } from "../../utils/constants";

interface CartDetailsProps {}
const CartDetails: FC<CartDetailsProps> = () => {
    const { isMobileTablet } = useDeviceDetect();
    const { cart, setCart, getCartQuery, orderTotal, isAuthenticated } = useGeneral();

    const { removeCart } = useRequestRemoveCart({
        onSuccess: (res: any) => {
            setCart(res.cart);
        },
    });

    const removeItem = useCallback((itemId: number) => {
        removeCart({ itemId: itemId });
    }, [removeCart]);

    const navigatePlaceOrderPage = useCallback(() => {
        window.location.href = '/place-order';
    }, []);

    if (!isAuthenticated) return <div className={styles.unAuthenticatedCart}>Please login to check your cart</div>

    if (getCartQuery.isLoading) return <div className={styles.loadingCart}><PuffLoader color="#2d9bf0" />Loading...</div>

    return (
        <div className={styles.cart}>
            <div className={styles.title}>Your Shopping Cart</div>
            {cart?.length ?
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
                                <div className={styles.bookName}>
                                    {item.billingName}
                                    {item.question && ' + Questions'}
                                    {item.cd && ' + CD'}
                                    {isMobileTablet && <div className={styles.quantityRow}>Qty: {item.quantity} x ₹{item.price}</div>}
                                </div>
                                <div className={styles.deleteIcon} onClick={() => removeItem(item.id)}>
                                    <RiDeleteBin6Line color="#757575" />
                                </div>
                            </div>
                            {!isMobileTablet && 
                                <>
                                    <div className={styles.width18}>{item.quantity}</div>
                                    <div className={styles.width18}>{rupee.format(item.price)}</div>
                                </>
                            }
                            <div className={`${styles.weight500} ${isMobileTablet ? `${styles.width30} ${styles.alignEnd}` : styles.width18}`}>{rupee.format(item.price * item.quantity)}</div>
                        </div>
                    );
                })}
                <div className={`${styles.rowHeading} ${styles.totalRow}`}>
                    <div className={`${isMobileTablet ? `${styles.widthBook} ${styles.alignStart}` : styles.width18}`}>Total Amount</div>
                    <div className={`${styles.font18} ${styles.weight500} ${isMobileTablet ? `${styles.width40} ${styles.alignEnd}` : styles.width18}`}>{rupee.format(orderTotal)}</div>
                </div>
                <div className={`${styles.rowHeading} ${styles.checkoutRow}`}>
                    <div className={styles.text}>Please review the items and click the button to checkout</div>
                    <button
                        className={styles.checkoutButton}
                        onClick={navigatePlaceOrderPage}
                    >
                        PROCEED TO CHECKOUT
                    </button>
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
