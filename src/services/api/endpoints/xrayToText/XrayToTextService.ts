import { BaseApiService } from '../../core/BaseApiService';
import { XRAY_TO_TEXT_ENDPOINTS } from './constants/endpoints';
import { XrayToTextReport } from './types/xrayToText.types';

/**
 * The XrayToTextService is responsible for calling your Flask endpoints.
 * 
 * Note: JWT integration is provided via getToken() in BaseApiService.
 * For now, JWT usage is commented out in the fetch-based streamReport method.
 */
export class XrayToTextService extends BaseApiService {
  constructor(getToken?: () => Promise<string | null>) {
    super(XRAY_TO_TEXT_ENDPOINTS.BASE, getToken);
  }

  /**
   * Calls the generate-report endpoint.
   * Expects a FormData payload containing the file and indication.
   */
  async generateReport(formData: FormData): Promise<XrayToTextReport | null> {
    const response = await this.post<XrayToTextReport>(XRAY_TO_TEXT_ENDPOINTS.GENERATE_REPORT, formData);
    return response.data;
  }

  /**
   * Calls the stream-report endpoint and streams the response.
   * Since SSE with POST isn’t natively supported by EventSource,
   * we use fetch and the ReadableStream API to process the stream.
   *
   * @param formData - The FormData payload (including the file and optional indication)
   * @param onMessage - Callback for each chunk received
   * @param onComplete - Callback when the stream completes
   * @param onError - Callback when an error occurs
   */
  async streamReport(
    formData: FormData,
    onMessage: (msg: string) => void,
    onComplete: () => void,
    onError: (err: string) => void
  ): Promise<void> {
    try {
      const url = `${this.baseEndpoint}${XRAY_TO_TEXT_ENDPOINTS.STREAM_REPORT}`;

      const headers: HeadersInit = {
        // Uncomment the next line when you want to enable JWT:
        // 'Authorization': `Bearer ${await this.getToken()}`,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.body) {
        onError('No response body');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // You might want to parse SSE events from the chunk.
          // For simplicity, we call onMessage with the raw chunk.
          onMessage(chunk);
        }
      }

      onComplete();
    } catch (err) {
      onError(String(err));
    }
  }
}
