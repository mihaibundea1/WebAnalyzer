// services/api/core/utils/headers.utils.ts
import { RawAxiosRequestHeaders } from 'axios';

export const createApiHeaders = async (
  getToken: () => Promise<string | null>,
  isFormData: boolean = false
): Promise<RawAxiosRequestHeaders> => {
  try {
    const token = await getToken();
    const headers: RawAxiosRequestHeaders = {
      'Authorization': token ? `Bearer ${token}` : '',
      'Accept': 'application/json',
    };

    // Only set Content-Type for JSON requests
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    return headers;
  } catch (error) {
    console.error('Error getting API headers:', error);
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }
};
