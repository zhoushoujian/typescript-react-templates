import axios from 'axios';
import { axiosInterceptorsConfig } from '@/utils/common';

export const request: any = axios.create({ baseURL: `/` });
axiosInterceptorsConfig(request);
