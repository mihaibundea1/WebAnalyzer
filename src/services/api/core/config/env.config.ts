// services/api/core/config/env.config.ts
interface AppConfig {
    apiUrl: string;
  }
  
  const ENV = {
    apiUrl: 'localhost:5000',
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