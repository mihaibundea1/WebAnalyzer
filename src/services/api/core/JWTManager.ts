// services/api/core/JWTManager.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosHeaders } from 'axios';
import { createApiHeaders } from './utils/headers.utils';

export class JWTManager {
  private static instance: JWTManager;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  // Private constructor to prevent external instantiation
  private constructor() {}

  // Get the singleton instance
  public static getInstance(): JWTManager {
    if (!JWTManager.instance) {
      JWTManager.instance = new JWTManager();
    }
    return JWTManager.instance;
  }

  /**
   * Loads tokens from persistent storage.
   */
  public async loadTokens(): Promise<void> {
    this.accessToken = await AsyncStorage.getItem('accessToken');
    this.refreshToken = await AsyncStorage.getItem('refreshToken');
  }

  /**
   * Saves tokens both in memory and in persistent storage.
   */
  public async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  }

  /**
   * Returns the current access token.
   */
  public getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * Returns the current refresh token.
   */
  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  /**
   * Clears tokens from memory and persistent storage.
   */
  public async clearTokens(): Promise<void> {
    this.accessToken = null;
    this.refreshToken = null;
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  }

  /**
   * Refreshes the access token using the refresh token.
   * Assumes your backend refresh endpoint is '/refresh'
   * and that the response contains a new access token under 'access_token'.
   */
  public async refreshAccessToken(): Promise<string | null> {
    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }
    try {
      const response = await axios.post(
        '/refresh',
        {},
        {
          headers: {
            'Authorization': `Bearer ${this.refreshToken}`,
          },
        }
      );
      const newAccessToken = response.data.access_token;
      if (newAccessToken) {
        this.accessToken = newAccessToken;
        await AsyncStorage.setItem('accessToken', newAccessToken);
      }
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      await this.clearTokens();
      return null;
    }
  }

  /**
   * Attaches an Axios request interceptor to automatically include the access token
   * in the Authorization header. If the request payload is a FormData instance,
   * the interceptor will remove the JSON Content-Type header so that the browser
   * can set the correct multipart boundary.
   */
  public attachInterceptor(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.request.use(
      async (config) => {
        // Build headers using our headers utility.
        const headersObj = await createApiHeaders(async () => this.accessToken);
        // Create an AxiosHeaders instance from existing config.headers (or empty object)
        const axiosHeaders = new AxiosHeaders(config.headers || {});
        
        // Merge in the headers from our utility
        Object.entries(headersObj).forEach(([key, value]) => {
          axiosHeaders.set(key, value);
        });

        // If the payload is FormData, remove the Content-Type header.
        if (config.data instanceof FormData) {
          axiosHeaders.delete('Content-Type');
        }

        // Always attach the current access token.
        if (this.accessToken) {
          axiosHeaders.set('Authorization', `Bearer ${this.accessToken}`);
        }
        config.headers = axiosHeaders;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}
