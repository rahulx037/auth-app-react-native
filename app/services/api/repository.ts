import { API_BASE_URL } from '@/app/utils/constants';
import axios ,{ AxiosResponse } from "axios";

// Create an Axios instance with default options
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;