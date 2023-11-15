import axios from "axios";
import { sendGetCustomHeader, sendPost, sendPostCustomHeader } from "./Http.service";
import { UserDetail } from "../data/interface";

export const requestOTP = async (params: any): Promise<any> => {
	const endpoint = `sign-in`;
	const response = await sendPost(endpoint, { ...params });
	return response?.data;
};

export const verifyOTP = async (params: any): Promise<any> => {
    const endpoint = `otp-verify`;
	const response = await sendPost(endpoint, { ...params });
	return response?.data;
};

export const verifyToken = async (): Promise<any> => {
    const endpoint = `me`;
    const response = await sendGetCustomHeader(endpoint); 
    return response?.data;
};

export const updateCart = async (params: any): Promise<any> => {
	const endpoint = `cart/update`;
	const response = await sendPostCustomHeader(endpoint, { ...params });
	return response?.data;
};

export const removeCart = async (params: any): Promise<any> => {
	const endpoint = `cart/remove`;
	const response = await sendPostCustomHeader(endpoint, { ...params });
	return response?.data;
};

export const getCart = async (): Promise<any> => {
	const endpoint = `cart`;
	const response = await sendGetCustomHeader(endpoint);
	return response?.data?.cart;
};

export const sendEmail = async (params: any): Promise<any> => {
	const endpoint = `email`;
	const response = await sendPostCustomHeader(endpoint, { ...params });
	return response?.data;
};

export const getUserDetail = async (): Promise<UserDetail> => {
	const endpoint = `user-detail`;
	const response = await sendGetCustomHeader(endpoint);
	return response?.data?.userDetail;
};

export const getPODetails = async (pincode: string): Promise<any> => {
	const endpoint = `https://api.postalpincode.in/pincode/${pincode}`;
	const response = await axios.get(endpoint);
	return response?.data?.[0]?.PostOffice?.[0];
};

export const placeOrder = async (params: any): Promise<any> => {
	const endpoint = `order`;
	const response = await sendPostCustomHeader(endpoint, { ...params });
	return response?.data;
}
