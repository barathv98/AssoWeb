import React, { createContext, Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import { CartItems, UserDetail } from './data/interface';
import { getCart } from './services/Api.service';
import { useRequestGetCart } from './useRequest';

interface GeneralContextType {
	cart: CartItems;
	setCart: Dispatch<SetStateAction<CartItems>>;
	getCartQuery: any;
	orderTotal: number;
	setOrderTotal: Dispatch<SetStateAction<number>>;
	showSnackbar: string;
	setShowSnackbar: Dispatch<SetStateAction<string>>;
	isAuthenticated: boolean;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
	showLoginModal: boolean;
	setShowLoginModal: Dispatch<SetStateAction<boolean>>;
	showMyAccountModal: boolean;
	setShowMyAccountModal: Dispatch<SetStateAction<boolean>>;
	userDetail: UserDetail;
	setUserDetail: Dispatch<SetStateAction<UserDetail>>;
}

const defaultContext = {
	cart: [],
	setCart: () => {},
	getCartQuery: () => {},
	orderTotal: 0,
	setOrderTotal: () => {},
	showSnackbar: '',
	setShowSnackbar: () => {},
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	showLoginModal: false,
	setShowLoginModal: () => {},
	showMyAccountModal: false,
	setShowMyAccountModal: () => {},
	userDetail: {} as UserDetail,
	setUserDetail: () => {},
};

const Context = createContext<GeneralContextType>(defaultContext);

interface GeneralProviderProps {
	children: React.ReactNode;
}

export const GeneralProvider: FC<GeneralProviderProps> = ({ children }) => {
	const [cart, setCart] = useState<CartItems>(
		defaultContext.cart
	);

	const [orderTotal, setOrderTotal] = useState<number>(
		defaultContext.orderTotal
	);

	const [showSnackbar, setShowSnackbar] = useState<string>(
		defaultContext.showSnackbar
	);

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		defaultContext.isAuthenticated
	);

	const [showLoginModal, setShowLoginModal] = useState<boolean>(
		defaultContext.showLoginModal
	);

	const [showMyAccountModal, setShowMyAccountModal] = useState<boolean>(
		defaultContext.showMyAccountModal
	);

	const [userDetail, setUserDetail] = useState<UserDetail>(
		defaultContext.userDetail
	);

	const getCartQuery = useRequestGetCart({
        onSuccess: (response: CartItems) => {
            setCart(response);
        },
    });

	useEffect(() => {
		let totalValue: number = 0;
		for (let i = 0; i < cart?.length; i++) {
			totalValue += (cart[i].price * cart[i].quantity);
		}
		setOrderTotal(totalValue);
	}, [cart]);

	const GeneralProviderValue = useMemo(
		(): GeneralContextType => ({
			cart,
			setCart,
			getCartQuery,
			orderTotal,
			setOrderTotal,
			showSnackbar,
			setShowSnackbar,
			isAuthenticated,
			setIsAuthenticated,
			showLoginModal,
			setShowLoginModal,
			showMyAccountModal,
			setShowMyAccountModal,
			userDetail,
			setUserDetail,
		}),
		[
			cart,
			setCart,
			getCartQuery,
			orderTotal,
			setOrderTotal,
			showSnackbar,
			setShowSnackbar,
			isAuthenticated,
			setIsAuthenticated,
			showLoginModal,
			setShowLoginModal,
			showMyAccountModal,
			setShowMyAccountModal,
			userDetail,
			setUserDetail,
		]
	);

	return <Context.Provider value={GeneralProviderValue}>{children}</Context.Provider>;
};

export default Context;
