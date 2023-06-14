import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { isTokenExpired, RefreshAccessToken } from './token';

function getToken(): string | null {
  const token = localStorage.getItem('token');
  return token !== null ? token : null;
}

// 요청 인터셉터 (클라이언트 → 서버)
axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = getToken();

    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (서버 → 클라이언트)
axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (isTokenExpired()) await RefreshAccessToken();

      const accessToken = getToken();

      if (error.config && error.config.headers) {
        error.config.headers.Authorization = `Bearer ${accessToken}`;

        const response = await axios.request(error.config);
        return response;
        console.log(response);
      }
    }
    return Promise.reject(error);
  }
);

interface RequestParams<T> {
  endpoint: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  params?: string;
  data?: any;
  requiresToken?: boolean;
}

async function request<T>({ endpoint, method, params = '', data, requiresToken = true }: RequestParams<T>): Promise<T> {
  const apiUrl = params ? `${endpoint}/${params}` : endpoint;

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  if (requiresToken && !getToken()) {
    throw new Error('로그인이 필요한 요청입니다.');
  }
  if (requiresToken) {
    headers.Authorization = `Bearer ${getToken()}`;
  }
  try {
    const response = await axios.request<T>({
      url: apiUrl,
      method,
      headers,
      data,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status } = error.response;
      throw new Error(status);
    } else {
      throw new Error('요청이 실패하였습니다.');
    }
  }
}

const get = <T>(endpoint: string, params = '', requiresToken = true): Promise<T> =>
  request<T>({ endpoint, method: 'GET', params, requiresToken });

const post = <T>(endpoint: string, params = '', data: any, requiresToken = true): Promise<T> =>
  request<T>({ endpoint, method: 'POST', params, data, requiresToken });

const patch = <T>(endpoint: string, params = '', data: any, requiresToken = true): Promise<T> =>
  request<T>({ endpoint, method: 'PATCH', params, data, requiresToken });

const del = <T>(endpoint: string, params = '', data: any = {}, requiresToken = true): Promise<T> =>
  request<T>({ endpoint, method: 'DELETE', params, data, requiresToken });

export { get, post, patch, del as delete };
