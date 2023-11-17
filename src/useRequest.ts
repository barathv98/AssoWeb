import { useMutation } from 'react-query';
import {
	getCart,
	getPODetails,
	getUserDetail,
	placeOrder,
	removeCart,
	requestOTP,
	sendEmail,
	updateCart,
	verifyOTP,
	verifyToken,
} from './services/Api.service';

export const useRequestRequestOTP = ({ onSuccess, onError, params }: any): any => {
	const { mutate: requestOTPFn, isLoading } = useMutation(() => requestOTP(params), {
		onSuccess,
		onError,
	});

	return { requestOTP: requestOTPFn, isLoading };
};

export const useRequestVerifyOTP = ({ onSuccess, onError, params }: any): any => {
	const { mutate: verifyOTPFn, isLoading } = useMutation(() => verifyOTP(params), {
		onSuccess,
		onError,
	});

	return { verifyOTP: verifyOTPFn, isLoading };
};

export const useRequestVerifyToken = ({ onSuccess }: any): any => {
	const { mutate: verifyTokenFn } = useMutation(verifyToken, { onSuccess });

	return { verifyToken: verifyTokenFn };
};

export const useRequestUpdateCart = ({ onSuccess }: any): any => {
	const { mutate: updateCartFn } = useMutation(updateCart, { onSuccess });

	return { updateCart: updateCartFn };
};

export const useRequestRemoveCart = ({ onSuccess }: any): any => {
	const { mutate: removeCartFn } = useMutation(removeCart, { onSuccess });

	return { removeCart: removeCartFn };
};

export const useRequestGetCart = ({ onSuccess }: any): any => {
	const { mutate: getCartFn, isLoading } = useMutation(getCart, { onSuccess });

	return { getCart: getCartFn, isLoading };
};

export const useRequestSendEmail = ({ onSuccess, onError, params }: any): any => {
	const { mutate: sendEmailFn, isLoading } = useMutation(() => sendEmail(params), {
		onSuccess,
		onError,
	});

	return { sendEmail: sendEmailFn, isLoading };
};

export const useRequestGetUserDetail = ({ onSuccess }: any): any => {
	const { mutate: getUserDetailFn, isLoading } = useMutation(getUserDetail, { onSuccess });

	return { getUserDetail: getUserDetailFn, isLoading };
};

export const useRequestGetPODetails = ({ onSuccess, params }: any): any => {
	const { mutate: getPODetailsFn, isLoading } = useMutation(() => getPODetails(params), {
		onSuccess,
	});

	return { getPODetails: getPODetailsFn, isLoading };
};

export const useRequestPlaceOrder = ({ onSuccess, onError, params }: any): any => {
	const { mutate: placeOrderFn, isLoading } = useMutation(() => placeOrder(params), {
		onSuccess,
		onError,
	});

	return { placeOrder: placeOrderFn, isLoading };
};
