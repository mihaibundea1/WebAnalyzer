// services/api/core/types/api.types.ts
import { AxiosError, AxiosHeaders, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiErrorResponse {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error?: string | undefined;
  status: number;
}

// Use InternalAxiosRequestConfig instead of AxiosRequestConfig for proper typing
export interface CustomAxiosError<T = unknown> extends Omit<AxiosError<ApiErrorResponse, T>, 'config'> {
  config: InternalAxiosRequestConfig;
  response?: AxiosResponse<ApiErrorResponse>;
}

export class CustomError extends Error {
  code: string;
  
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}
