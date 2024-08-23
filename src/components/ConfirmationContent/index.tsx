import Lottie from 'lottie-react';
import { FC, useEffect } from 'react';
import failureAnimation from '../../assets/icons/failure.json';
import successTickAnimation from '../../assets/icons/successTick.json';
import useAnalytics from '../../useAnalytics';
import { MixpanelEvent } from '../../utils/constants';
import styles from './styles.module.scss';

interface ConfirmationContentProps {
	success: boolean;
	closePopup: () => void;
}
const ConfirmationContent: FC<ConfirmationContentProps> = ({ success, closePopup }) => {
	const { trackEvent } = useAnalytics();

	useEffect(() => {
		if (success) trackEvent(MixpanelEvent.ORDER_SUCCESS_VIEW, {});
		else trackEvent(MixpanelEvent.ORDER_FAILED_VIEW, {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.confirmationContent}>
			{success ? (
				<>
					<div className={styles.lottieIcon}>
						<Lottie animationData={successTickAnimation} loop={false} />
					</div>
					<div className={styles.textContent}>
						<div className={styles.title}>Order Success!!</div>
						<div className={styles.subTitle}>
							Thanks for ordering with us. We have received your order, our team will contact you soon
						</div>
						<button
							className={styles.backBtn}
							onClick={() => {
								window.location.href = '/';
								trackEvent(MixpanelEvent.ORDER_HOME_RETURN_CLICK, {});
							}}
						>
							Back to Homepage
						</button>
					</div>
				</>
			) : (
				<>
					<div className={styles.lottieIcon}>
						<Lottie animationData={failureAnimation} loop={false} />
					</div>
					<div className={styles.textContent}>
						<div className={styles.title}>Order Failed</div>
						<div className={styles.subTitle}>Please head to Cart page to order again</div>
						<button
							className={styles.backBtn}
							onClick={() => {
								closePopup();
								trackEvent(MixpanelEvent.ORDER_CART_RETURN_CLICK, {});
							}}
						>
							Back to Ordering
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ConfirmationContent;
