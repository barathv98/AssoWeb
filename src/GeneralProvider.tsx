import React, { createContext, Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import { CartItems } from './data/interface';

interface GeneralContextType {
	cart: CartItems;
	setCart: Dispatch<SetStateAction<CartItems>>;
	orderTotal: number;
	setOrderTotal: Dispatch<SetStateAction<number>>;
	showSnackbar: string;
	setShowSnackbar: Dispatch<SetStateAction<string>>;
}

const defaultContext = {
	cart: JSON.parse(localStorage.getItem('asso_cart') || "[]"),
	setCart: () => {},
	orderTotal: 0,
	setOrderTotal: () => {},
	showSnackbar: '',
	setShowSnackbar: () => {},
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

	useEffect(() => {
		let totalValue: number = 0;
		for (let i = 0; i < cart.length; i++) {
			totalValue += (cart[i].price * cart[i].quantity);
		}
		setOrderTotal(totalValue);
		
	}, [cart]);

	const GeneralProviderValue = useMemo(
		(): GeneralContextType => ({
			cart,
			setCart,
			orderTotal,
			setOrderTotal,
			showSnackbar,
			setShowSnackbar,
		}),
		[
			cart,
			setCart,
			orderTotal,
			setOrderTotal,
			showSnackbar,
			setShowSnackbar,
		]
	);

	return <Context.Provider value={GeneralProviderValue}>{children}</Context.Provider>;
};

export default Context;
