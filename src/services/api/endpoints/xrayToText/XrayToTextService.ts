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
    onError: (err: string) => void,
    abortSignal?: AbortSignal
  ): Promise<void> {
    try {
      const endpoint = `http://localhost:5000/xray_to_text/stream-report`;
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        signal: abortSignal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let isComplete = false;

      while (!isComplete) {
        const { value, done } = await reader.read();
        if (done) {
          onComplete();
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        // Împărțim buffer-ul pe linii, eliminăm spațiile în plus
        const lines = buffer.split('\n').map(line => line.trim());
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data:')) {
            // Folosim substring(5) pentru a obține textul după "data:"
            const data = line.substring(5).trim();
            if (data === 'stream_complete') {
              isComplete = true;
              onComplete();
              break;
            }
            onMessage(data);
          } else if (line.startsWith('event:')) {
            if (line === 'event: end') {
              isComplete = true;
              onComplete();
              break;
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        onError(err instanceof Error ? err.message : String(err));
      }
    }
  }
}
