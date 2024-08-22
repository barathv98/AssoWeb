import { FC } from "react";
import Modal from "../../common/components/Modal";
import styles from './styles.module.scss';

interface OrderDetailsProps {
    showPopup: boolean;
    closePopup: () => void;
    order: any;
}
const OrderDetails: FC<OrderDetailsProps> = (props) => {
    const { showPopup, closePopup, order } = props;

    return (
        <Modal
            openState={showPopup}
            title="Order Details"
            onCloseModal={closePopup}
            isClosable
            cssClass={styles.modal}
            fullScreenOnMobile
            content={
                <>
                <div className={styles.itemsList}>
                    {order.orderItems.map((item: any) => {
                        return (
                            <div className={styles.itemRow} key={item.id}>
                                <div className={styles.name}>{item.billingName} {item.question ? '+ Questions' : ''}</div>
                                <div className={styles.quantity}>{item.quantity} x ₹ {item.price}</div>
                                <div className={styles.cost}>₹ {item.quantity * item.price}</div>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.ruler} />
                <div className={`${styles.itemRow} ${styles.totalValue}`}>
                    <div className={styles.name} />
                    <div className={styles.quantity}>Total cost</div>
                    <div className={styles.cost}>₹ {order.totalValue}</div>
                </div>
                </>
            }
        />
    );
};

export default OrderDetails;
