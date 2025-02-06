// services/api/core/interceptors/RequestInterceptor.ts
import { AxiosInstance, AxiosHeaders } from 'axios';
import { createApiHeaders } from '../utils/headers.utils';

export class RequestInterceptor {
  public static apply(
    axiosInstance: AxiosInstance,
    getToken: () => Promise<string | null>
  ): void {
    axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          // Build the standard headers using our utility
          const headers = await createApiHeaders(getToken);
          const axiosHeaders = new AxiosHeaders(config.headers || {});

          // If the request data is FormData, remove the JSON Content-Type header
          if (config.data instanceof FormData) {
            delete headers['Content-Type'];
          }

          Object.entries(headers).forEach(([key, value]) => {
            axiosHeaders.set(key, value);
          });

          config.headers = axiosHeaders;
          return config;
        } catch (error) {
          console.error('Error in request interceptor:', error);
          return config;
        }
      },
      (error) => Promise.reject(error)
    );
  }
}
