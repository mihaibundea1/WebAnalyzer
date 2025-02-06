// services/api/core/interceptors/ResponseInterceptor.ts
import { AxiosInstance, AxiosError } from 'axios';
import { CustomError } from '../types/api.types';

export class ResponseInterceptor {
  public static apply(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (!error.response) {
          return Promise.reject(
            new CustomError('Please check your internet connection', 'NETWORK_ERROR')
          );
        }

        switch (error.response.status) {
          case 401:
            console.error('Unauthorized access');
            break;
          case 403:
            console.error('Forbidden access');
            break;
        }

        return Promise.reject(error);
      }
    );
  }
}
