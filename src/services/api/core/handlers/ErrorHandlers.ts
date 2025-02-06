// services/api/core/handlers/ErrorHandler.ts
import { AxiosError } from 'axios';
import { CustomError } from '@/types/api.types';

export class ErrorHandler {
  public static handle(error: AxiosError): Promise<never> {
    if (!error.response) {
      return Promise.reject(new CustomError('Network error', 'NETWORK_ERROR'));
    }

    switch (error.response.status) {
      case 401:
        // Handle unauthorized
        break;
      case 403:
        // Handle forbidden
        break;
    }

    return Promise.reject(error);
  }
}