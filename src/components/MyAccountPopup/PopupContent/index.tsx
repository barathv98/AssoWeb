import Cookies from 'js-cookie';
import { useCallback } from 'react';
import useGeneral from '../../../useGeneral';
import styles from './styles.module.scss';

const PopupContent = () => {
	const { setIsAuthenticated, setShowMyAccountModal, setCart } = useGeneral();

	const onClickLogout = useCallback(() => {
		setIsAuthenticated(false);
		Cookies.remove('token', { path: '/' });
		setShowMyAccountModal(false);
		setCart([]);
		window.location.reload();
	}, [setIsAuthenticated, setShowMyAccountModal, setCart]);

	return (
		<div className={styles.popupContent}>
			<div className={styles.contentRow} onClick={onClickLogout}>
				Logout
			</div>
		</div>
	);
};

export default PopupContent;
