import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAnalytics from '../../../useAnalytics';
import useGeneral from '../../../useGeneral';
import { MixpanelEvent } from '../../../utils/constants';
import styles from './styles.module.scss';

const PopupContent = () => {
	const { setIsAuthenticated, setShowMyAccountModal, setCart } = useGeneral();
	const { trackEvent } = useAnalytics();
	const navigate = useNavigate();

	const onClickOrders = useCallback(() => {
		navigate('/orders-list');
		setShowMyAccountModal(false);
	}, [navigate, setShowMyAccountModal]);

	const onClickLogout = useCallback(() => {
		trackEvent(MixpanelEvent.LOGOUT_CLICK, {});
		setIsAuthenticated(false);
		Cookies.remove('token', { path: '/' });
		setShowMyAccountModal(false);
		setCart([]);
		window.location.reload();
	}, [setIsAuthenticated, setShowMyAccountModal, setCart, trackEvent]);

	return (
		<div className={styles.popupContent}>
			<div className={styles.contentRow} onClick={onClickOrders}>My Orders</div>
			<div className={styles.contentRow} onClick={onClickLogout}>
				Logout
			</div>
		</div>
	);
};

export default PopupContent;
