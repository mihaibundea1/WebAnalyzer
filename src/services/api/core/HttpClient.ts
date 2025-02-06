// services/api/core/HttpClient.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { Config } from './config/env.config';
import { RequestInterceptor } from './interceptors/RequestInterceptor';
import { ResponseInterceptor } from './interceptors/ResponseInterceptor';
import { ApiResponse, CustomAxiosError } from './types/api.types';

export class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;

  private constructor(getToken: () => Promise<string | null>) {
    this.axiosInstance = axios.create({
      baseURL: Config.apiUrl,
      timeout: 10000,
    });

    RequestInterceptor.apply(this.axiosInstance, getToken);
    ResponseInterceptor.apply(this.axiosInstance);
  }

  public static getInstance(getToken?: () => Promise<string | null>): HttpClient {
    if (!HttpClient.instance && getToken) {
      HttpClient.instance = new HttpClient(getToken);
    }
    return HttpClient.instance;
  }

  private getErrorMessage(error: CustomAxiosError): string {
    if (error.response?.data) {
      return error.response.data.message || 'An unknown error occurred';
    }
    return error.message || 'Network error occurred';
  }

  public async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request(config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const err = error as CustomAxiosError;
      return {
        data: null,
        error: this.getErrorMessage(err),
        status: err.response?.status || 500,
      };
    }
  }
}
