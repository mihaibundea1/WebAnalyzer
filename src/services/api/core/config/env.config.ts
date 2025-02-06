// services/api/core/config/env.config.ts
interface AppConfig {
    apiUrl: string;
  }
  
  const ENV = {
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
  } as const;
  
  const getValidatedEnvVar = (obj: Record<string, string | undefined>, key: string) => {
    const value = obj[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  };
  
  export const Config: AppConfig = {
    apiUrl: getValidatedEnvVar(ENV, 'apiUrl'),
  };