import { FC } from "react";
import Lottie from 'lottie-react';
import { Link } from "react-router-dom";
import successTickAnimation from '../../assets/icons/successTick.json';
import failureAnimation from '../../assets/icons/failure.json';
import styles from './styles.module.scss';

interface ConfirmationContentProps {
    success: boolean;
}
const ConfirmationContent: FC<ConfirmationContentProps> = ({ success }) => {
    return (
        <div className={styles.confirmationContent}>
            {success ? (
                <>
                    <div className={styles.lottieIcon}>
                        <Lottie animationData={successTickAnimation} loop={false} />
                    </div>
                    <div className={styles.textContent}>
                        <div className={styles.title}>Order Success!!</div>
                        <div className={styles.subTitle}>Thanks for ordering with us. We have received your order, our team will contact you soon</div>
                    </div>
                </>
            ) 
            : (
                <>
                    <div className={styles.lottieIcon}>
                        <Lottie animationData={failureAnimation} loop={false} />
                    </div>
                    <div className={styles.textContent}>
                        <div className={styles.title}>Order Failed</div>
                        <div className={styles.subTitle}>Please head to <Link to='/shopping-cart'>Cart</Link> page to order again</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ConfirmationContent;
