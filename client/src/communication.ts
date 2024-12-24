import axios, { AxiosRequestConfig, InternalAxiosRequestConfig,AxiosHeaders  } from "axios";

const backendConnection = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true, // Include cookies in requests
});

export default backendConnection;

