import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = window.location.hostname !== 'localhost' ? 'https://asso-be.onrender.com' : 'https://ezpfcyiovl.execute-api.ap-south-1.amazonaws.com/dev';

export const axiosInstance = axios.create({ baseURL: BASE_URL });

const token = Cookies.get('token');

export const sendGet = async (
	endpoint: string,
	config?: AxiosRequestConfig,
	headers?: AxiosRequestHeaders,
	baseUrl?: string
) => {
	return (await axiosInstance.get(`${baseUrl || BASE_URL}/${endpoint}`, {
		...config,
		headers: {
			...headers,
		},
	})) as AxiosResponse<any>;
};

export const sendGetCustomHeader = async (
	endpoint: string,
    headers?: AxiosRequestHeaders,
	config?: AxiosRequestConfig,
	baseUrl?: string
) => {
	return (await axiosInstance.get(`${baseUrl || BASE_URL}/${endpoint}`, {
		...config,
		headers: {
			...headers,
            Authorization: `Bearer ${token}`,
		},
	})) as AxiosResponse<any>;
};

export const sendPost = async (
	endpoint: string,
	body?: any,
	config?: AxiosRequestConfig,
	headers?: AxiosRequestHeaders,
	baseUrl?: string
) => {
	return (await axiosInstance.post(`${baseUrl || BASE_URL}/${endpoint}`, body, {
		...config,
		headers: {
			...headers,
		},
	})) as AxiosResponse<any>;
};

export const sendPostCustomHeader = async (
	endpoint: string,
	body?: any,
	config?: AxiosRequestConfig,
	headers?: AxiosRequestHeaders,
	baseUrl?: string
) => {
	return (await axiosInstance.post(`${baseUrl || BASE_URL}/${endpoint}`, body, {
		...config,
		headers: {
			...headers,
			Authorization: `Bearer ${token}`,
		},
	})) as AxiosResponse<any>;
};

export const sendPut = async (
	endpoint: string,
	body?: any,
	config?: AxiosRequestConfig,
	headers?: AxiosRequestHeaders,
	baseUrl?: string
) => {
	return (await axiosInstance.put(`${baseUrl || BASE_URL}/${endpoint}`, body, {
		...config,
		headers: {
			...headers,
		},
	})) as AxiosResponse<any>;
};

export const sendDelete = async (
	endpoint: string,
	config?: AxiosRequestConfig,
	headers?: AxiosRequestHeaders,
	baseUrl?: string
) => {
	return (await axiosInstance.delete(`${baseUrl || BASE_URL}/${endpoint}`, {
		...config,
		headers: {
			...headers,
		},
	})) as AxiosResponse<any>;
};

export const sendPatch = async (
	endpoint: string,
	body?: any,
	config?: AxiosRequestConfig,
	headers?: AxiosRequestHeaders,
	baseUrl?: string
) => {
	return (await axiosInstance.patch(`${baseUrl || BASE_URL}/${endpoint}`, body, {
		...config,
		headers: {
			...headers,
		},
	})) as AxiosResponse<any>;
};
