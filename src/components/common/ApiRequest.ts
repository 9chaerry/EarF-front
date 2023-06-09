import axios from 'axios';

interface RequestParams<T> {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: string;
  data?: any;
  requiresToken?: boolean;
}

function getToken(): string | null {
  const token = localStorage.getItem('token');
  return token !== null ? token : null;
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

const put = <T>(endpoint: string, params = '', data: any, requiresToken = true): Promise<T> =>
  request<T>({ endpoint, method: 'PUT', params, data, requiresToken });

const del = <T>(endpoint: string, params = '', data: any = {}, requiresToken = true): Promise<T> =>
  request<T>({ endpoint, method: 'DELETE', params, data, requiresToken });

export { get, post, put, del as delete };