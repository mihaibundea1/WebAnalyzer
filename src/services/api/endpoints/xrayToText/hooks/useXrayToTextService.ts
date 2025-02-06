import { useRef, useState, useEffect } from 'react';
import { XrayToTextService } from '../XrayToTextService';
import { XrayToTextReport } from '../types/xrayToText.types';
// Uncomment and adjust the following import if you eventually want to use your JWT manager
// import { JWTManager } from '../../core/JWTManager';

export const useXrayToTextService = () => {
  // For now, we’re not using JWT; otherwise, provide a getToken function.
  const getToken = async (): Promise<string | null> => {
    // Example: return (await JWTManager.getInstance().getAccessToken()) || null;
    return null;
  };

  const serviceRef = useRef(new XrayToTextService(getToken));
  const [report, setReport] = useState<XrayToTextReport | null>(null);
  const [streamData, setStreamData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const generateReport = async (formData: FormData): Promise<void> => {
    setLoading(true);
    const rep = await serviceRef.current.generateReport(formData);
    if (rep) {
      setReport(rep);
    }
    setLoading(false);
  };

  const streamReport = async (formData: FormData): Promise<void> => {
    setLoading(true);
    // Clear previous stream data
    setStreamData([]);

    await serviceRef.current.streamReport(
      formData,
      (msg: string) => {
        // Append each message received from the stream.
        setStreamData((prev) => [...prev, msg]);
      },
      () => {
        setLoading(false);
      },
      (err: string) => {
        console.error('Stream error:', err);
        setLoading(false);
      }
    );
  };

  // (Optional) Auto-load or other effects can be added here.
  useEffect(() => {
    // For example, you could auto-clear previous data on mount.
  }, []);

  return {
    report,
    streamData,
    loading,
    generateReport,
    streamReport,
  };
};
