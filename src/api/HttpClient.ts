// src/api/HttpClient.ts
export default class HttpClient {
    baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    async request(endpoint: string, options: RequestInit) {
      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
  
    // Metode specifice pentru diferite endpoint-uri:
    get(endpoint: string) {
      return this.request(endpoint, { method: 'GET' });
    }
  
    post(endpoint: string, body: any) {
      return this.request(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }
  
    // Poți adăuga metode pentru PUT, DELETE, etc.
  }
  