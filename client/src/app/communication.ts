import axios, { AxiosRequestConfig, InternalAxiosRequestConfig,AxiosHeaders  } from "axios";
import { ACCESS_TOKEN } from "../constants/constants";

const backendConnection = axios.create();

backendConnection.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const internalConfig = config as InternalAxiosRequestConfig<any>;
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            internalConfig.headers = new AxiosHeaders({
                ...internalConfig.headers,
                Authorization: `Bearer ${token}`,
            });
        }
        return internalConfig;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default backendConnection;

