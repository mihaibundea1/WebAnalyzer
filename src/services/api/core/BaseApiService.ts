// services/api/core/BaseApiService.ts
import { HttpClient } from './HttpClient';
import { ApiResponse } from './types/api.types';

export abstract class BaseApiService {
  protected httpClient: HttpClient;
  protected baseEndpoint: string;

  constructor(baseEndpoint: string, getToken?: () => Promise<string | null>) {
    this.httpClient = HttpClient.getInstance(getToken);
    this.baseEndpoint = baseEndpoint;
  }

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.httpClient.request<T>({
      method: 'GET',
      url: `${this.baseEndpoint}${endpoint}`,
    });
  }

  protected async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.httpClient.request<T>({
      method: 'POST',
      url: `${this.baseEndpoint}${endpoint}`,
      data,
    });
  }

  protected async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.httpClient.request<T>({
      method: 'PUT',
      url: `${this.baseEndpoint}${endpoint}`,
      data,
    });
  }

  protected async patch<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.httpClient.request<T>({
      method: 'PATCH',
      url: `${this.baseEndpoint}${endpoint}`,
      data,
    });
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.httpClient.request<T>({
      method: 'DELETE',
      url: `${this.baseEndpoint}${endpoint}`,
    });
  }
}
