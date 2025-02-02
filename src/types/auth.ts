// src/types/auth.ts
export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    name: string;
    confirmPassword: string;
  }
  
  export interface AuthError {
    message: string;
    field?: string;
  }