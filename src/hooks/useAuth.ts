// src/hooks/useAuth.ts

import { useState } from 'react';
import HttpClient from '../api/HttpClient';

// Creează o instanță a HttpClient cu URL-ul de bază al API-ului
const apiClient = new HttpClient('https://api.exemplu.com');

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  const login = async (credentials: LoginCredentials) => {
    // Apelează endpoint-ul de login
    const data = await apiClient.post('/login', credentials);
    setUser(data.user);
    // Stochează token-ul, etc.
    return data;
  };

  const register = async (registerData: RegisterData) => {
    // Apelează endpoint-ul de înregistrare
    const data = await apiClient.post('/register', registerData);
    setUser(data.user);
    // Poți adăuga și logica suplimentară, de exemplu, stocarea token-ului
    return data;
  };

  return { user, login, register };
};
