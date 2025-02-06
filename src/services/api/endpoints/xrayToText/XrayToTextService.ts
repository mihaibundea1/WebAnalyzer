// XrayToTextService.ts
import { BaseApiService } from '../../core/BaseApiService';
import { XRAY_TO_TEXT_ENDPOINTS } from './constants/endpoints';

export class XrayToTextService extends BaseApiService {
  constructor(getToken?: () => Promise<string | null>) {
    super(XRAY_TO_TEXT_ENDPOINTS.BASE, getToken);
  }

  async generateReport(formData: FormData): Promise<string | null> {
    const response = await this.post<string>(
      XRAY_TO_TEXT_ENDPOINTS.GENERATE_REPORT, 
      formData
    );
    return response.data;
  }

  async streamReport(
    formData: FormData,
    onMessage: (msg: string) => void,
    onComplete: () => void,
    onError: (err: string) => void
  ): Promise<void> {
    try {
      // const url = `${this.baseEndpoint}${XRAY_TO_TEXT_ENDPOINTS.STREAM_REPORT}`;
      const url = `localhost:5000/xray_to_text/stream-report`;

      const headers: HeadersInit = {};
      
      // Uncomment when JWT is needed
      // const token = await this.getToken();
      // if (token) {
      //   headers.Authorization = `Bearer ${token}`;
      // }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { value, done } = await reader.read();
        
        if (done) {
          onComplete();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === 'stream_complete') {
              onComplete();
              break;
            }
            onMessage(data);
          }
        }
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    }
  }
}
