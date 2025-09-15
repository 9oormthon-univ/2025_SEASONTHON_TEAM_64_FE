import apiClient from '../apiClient';
import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from '@tanstack/react-query';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type RequestConfig<T> = {
  params?: Record<string, any>;
  data?: T;
  headers?: Record<string, string>;
};

class ApiBuilder<T = any, R = any> {
  private endpoint: string;
  private method: ApiMethod = 'GET';
  private config: RequestConfig<T> = {};

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  static create<T, R>(endpoint: string) {
    return new ApiBuilder<T, R>(endpoint);
  }

  setMethod(method: ApiMethod) {
    this.method = method;
    return this;
  }

  setParams(params: Record<string, any>) {
    this.config.params = params;
    return this;
  }

  setData(data: T) {
    this.config.data = data;
    return this;
  }

  setHeaders(headers: Record<string, string>) {
    this.config.headers = headers;
    return this;
  }

  async execute(): Promise<AxiosResponse<R>> {
    const requestConfig: AxiosRequestConfig = {
      method: this.method,
      url: this.endpoint,
      ...this.config,
    };
    return apiClient(requestConfig);
  }

  getQueryFn() {
    return async () => {
      const response = await this.execute();
      return response.data;
    };
  }

  getMutationFn() {
    return async (data: T) => {
      this.setData(data);
      const response = await this.execute();
      return response.data;
    };
  }
}

/**
 * useApiQuery — React Query 모든 옵션 지원
 */
export function useApiQuery<T, R, TError = Error>(
  apiBuilder: ApiBuilder<T, R>,
  queryKey: QueryKey,
  options?: UseQueryOptions<R, TError, R>,
) {
  return useQuery<R, TError>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: apiBuilder.getQueryFn(),
    ...options,
  });
}

/**
 * useApiMutation — React Query 모든 옵션 지원
 */
export function useApiMutation<T, R, TError = Error>(
  apiBuilder: ApiBuilder<T, R>,
  options?: UseMutationOptions<R, TError, T>,
) {
  return useMutation<R, TError, T>({
    mutationFn: apiBuilder.getMutationFn(),
    ...options,
  });
}

export default ApiBuilder;
