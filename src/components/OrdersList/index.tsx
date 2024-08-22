import { useCallback, useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { ReactComponent as BookIcon } from "../../assets/icons/book.svg";
import { useRequestGetOrdersList } from "../../useRequest";
import { primaryColor } from "../../utils/constants";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import OrderDetails from "../OrderDetails";
import styles from './styles.module.scss';

const OrdersListPage = () => {
    const { isMobile } = useDeviceDetect();
    const [orders, setOrders] = useState<any>([]);
    const [showDetailsPopup, setShowDetailsPopup] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const { getOrdersList, isLoading: loadingOrders } = useRequestGetOrdersList({
        onSuccess: (res: any) => {
            setOrders(res.orderList)
        }
    });

    const onClosePopup = useCallback(() => {
        setSelectedOrder(null);
        setShowDetailsPopup(false);
        // eslint-disable-next-line
    }, []);

    const onClickDetails = useCallback((order: any) => {
        setSelectedOrder(order);
        setShowDetailsPopup(true);
    }, []);

    useEffect(() => {
        getOrdersList();
        // eslint-disable-next-line
    }, []);

    if (loadingOrders)
		return (
			<div className={styles.loadingOrders}>
				<PuffLoader color={primaryColor} />
				Loading...
			</div>
		);
    
    if (!orders?.length)
        return (
            <div className={styles.emptyList}>
                <div className={styles.title}>Orders list</div>
                <div className={styles.content}>No orders yet</div>
            </div>
        );

    return (
        <div className={styles.ordersListComponent}>
            <div className={styles.title}>Orders list</div>
            <div className={styles.ordersList}>
                {orders?.map((order: any) => {
                    return (
                        <div className={styles.orderCard} key={order.orderId}>
                            <div className={styles.icon}>
                                <BookIcon />
                            </div>
                            {isMobile ?
                                <div className={styles.detailsMobile}>
                                    <div>
                                        <div className={styles.largerText}>{order.orderItems.length} {order.orderItems.length > 1 ? 'items' : 'item'} ordered</div>
                                        <div className={styles.smallerText}>Total cost: ₹ {order.totalValue}</div>
                                    </div>
                                    <div className={styles.detailsLink} onClick={() => onClickDetails(order)}>View Details</div>
                                </div>
                            :
                                <div className={styles.details}>
                                    <div className={styles.items}>
                                        {order.orderItems.length} {order.orderItems.length > 1 ? 'items' : 'item'} ordered
                                    </div>
                                    <div className={styles.cost}>
                                        <div>Total cost: ₹ {order.totalValue}</div>
                                        <div className={styles.detailsLink} onClick={() => onClickDetails(order)}>View Details</div>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
            {showDetailsPopup && <OrderDetails showPopup={showDetailsPopup} closePopup={onClosePopup} order={selectedOrder} />}
        </div>
    );
};

export default OrdersListPage;
