import { FC, useCallback, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';
import useAnalytics from '../../useAnalytics';
import useGeneral from '../../useGeneral';
import { useRequestRemoveCart } from '../../useRequest';
import { MixpanelEvent, primaryColor, rupee } from '../../utils/constants';
import useDeviceDetect from '../../utils/hooks/useDeviceDetect';
import styles from './styles.module.scss';

interface CartDetailsProps {}
const CartDetails: FC<CartDetailsProps> = () => {
	const { isMobileTablet } = useDeviceDetect();
	const navigate = useNavigate();
	const { cart, setCart, getCartQuery, orderTotal, isAuthenticated } = useGeneral();
	const { trackEvent } = useAnalytics();

	const { removeCart } = useRequestRemoveCart({
		onSuccess: (res: any) => {
			setCart(res.cart);
		},
	});

	const removeItem = useCallback(
		(itemId: number) => {
			removeCart({ productId: itemId });
			trackEvent(MixpanelEvent.CART_ITEM_REMOVE_CLICK, {});
		},
		[removeCart, trackEvent]
	);

	useEffect(() => {
		getCartQuery.getCart();
		trackEvent(MixpanelEvent.CART_DETAILS_VIEW, {});
		// eslint-disable-next-line
	}, []);

	if (!isAuthenticated) return <div className={styles.unAuthenticatedCart}>Please login to check your cart</div>;

	if (getCartQuery.isLoading)
		return (
			<div className={styles.loadingCart}>
				<PuffLoader color={primaryColor} />
				Loading...
			</div>
		);

	return (
		<div className={styles.cart}>
			<div className={styles.title}>Your Shopping Cart</div>
			{cart?.length ? (
				<div>
					<div className={styles.rowHeading}>
						{!isMobileTablet && <div className={styles.widthSlNo}>Sl. No.</div>}
						<div className={`${styles.widthBook} ${isMobileTablet ? styles.alignStart : ''}`}>Book Name</div>
						{!isMobileTablet && (
							<>
								<div className={styles.width18}>Quantity</div>
								<div className={styles.width18}>Rate / Copy</div>
							</>
						)}
						<div className={`${isMobileTablet ? `${styles.width40} ${styles.alignEnd}` : styles.width18}`}>Amount</div>
					</div>
					{cart.map((item, index) => {
						return (
							item.id > 1000 && (
								<div className={`${styles.rowHeading} ${styles.itemRow}`} key={index}>
									{!isMobileTablet && <div className={styles.widthSlNo}>{index + 1}</div>}
									<div className={`${styles.widthBook} ${styles.bookRow}`}>
										<div className={styles.bookName}>
											{item.billingName}
											{item.question && ' + Questions'}
											{isMobileTablet && (
												<div className={styles.quantityRow}>
													Qty: {item.quantity} x ₹{item.price}
												</div>
											)}
										</div>
										<div className={styles.deleteIcon} onClick={() => removeItem(item.id)}>
											<RiDeleteBin6Line color="#757575" />
										</div>
									</div>
									{!isMobileTablet && (
										<>
											<div className={styles.width18}>{item.quantity}</div>
											<div className={styles.width18}>{rupee.format(item.price)}</div>
										</>
									)}
									<div
										className={`${styles.weight500} ${
											isMobileTablet ? `${styles.width30} ${styles.alignEnd}` : styles.width18
										}`}
									>
										{rupee.format(item.price * item.quantity)}
									</div>
								</div>
							)
						);
					})}
					{cart.map((item, index) => {
						return (
							item.id < 1000 && (
								<div className={`${styles.rowHeading} ${styles.itemRow}`} key={index}>
									{!isMobileTablet && <div className={styles.widthSlNo}>{index + 1}</div>}
									<div className={`${styles.widthBook} ${styles.bookRow}`}>
										<div className={styles.bookName}>
											{item.billingName}
											{item.question && ' + Questions'}
											{isMobileTablet && (
												<div className={styles.quantityRow}>
													Qty: {item.quantity} x ₹{item.price}
												</div>
											)}
										</div>
										<div className={styles.deleteIcon} onClick={() => removeItem(item.id)}>
											<RiDeleteBin6Line color="#757575" />
										</div>
									</div>
									{!isMobileTablet && (
										<>
											<div className={styles.width18}>{item.quantity}</div>
											<div className={styles.width18}>{rupee.format(item.price)}</div>
										</>
									)}
									<div
										className={`${styles.weight500} ${
											isMobileTablet ? `${styles.width30} ${styles.alignEnd}` : styles.width18
										}`}
									>
										{rupee.format(item.price * item.quantity)}
									</div>
								</div>
							)
						);
					})}
					<div className={`${styles.rowHeading} ${styles.totalRow}`}>
						<div className={`${isMobileTablet ? `${styles.widthBook} ${styles.alignStart}` : styles.width18}`}>
							Total Amount
						</div>
						<div
							className={`${styles.font18} ${styles.weight500} ${
								isMobileTablet ? `${styles.width40} ${styles.alignEnd}` : styles.width18
							}`}
						>
							{rupee.format(orderTotal)}
						</div>
					</div>
					<div className={`${styles.rowHeading} ${styles.checkoutRow}`}>
						<div className={styles.text}>Please review the items and click the button to checkout</div>
						<button
							className={styles.checkoutButton}
							onClick={() => {
								navigate('/place-order');
								trackEvent(MixpanelEvent.CART_CHECKOUT_CLICK, {});
							}}
						>
							PROCEED TO CHECKOUT
						</button>
					</div>
				</div>
			) : (
				<>
					<div>No items found</div>
					<div>Please proceed to add items</div>
				</>
			)}
		</div>
	);
};

export default CartDetails;
