// hooks/useXrayToTextService.ts
import { useRef, useState, useEffect, useCallback } from 'react';
import { XrayToTextService } from '../XrayToTextService';

export const useXrayToTextService = () => {
  const getToken = async (): Promise<string | null> => {
    // Implement token retrieval logic here if needed
    return null;
  };

  const serviceRef = useRef(new XrayToTextService(getToken));
  const [report, setReport] = useState<string | null>(null);
  const [streamData, setStreamData] = useState<string>('');  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const streamReport = useCallback(async (formData: FormData) => {
    abortControllerRef.current = new AbortController();
    const abortSignal = abortControllerRef.current.signal;

    setLoading(true);
    setStreamData('');  
    setError(null);

    try {
        await serviceRef.current.streamReport(
            formData,
            (msg: string) => {
                if (!abortSignal.aborted) {
                    console.log("Message received:", msg); // 🔴 LOGHEAZĂ MESAJELE PRIMITE
                    setStreamData(prev => prev + ' ' + msg);
                }
            },
            () => {
                console.log("Stream complete"); // 🔴 LOGHEAZĂ CÂND SE TERMINĂ STREAM-UL
                if (!abortSignal.aborted) {
                    setLoading(false);
                }
            },
            (err: string) => {
                console.error("Stream error:", err); // 🔴 LOGHEAZĂ ERORILE
                if (!abortSignal.aborted) {
                    setLoading(false);
                    setError(err);
                }
            },
            abortSignal
        );
    } catch (error) {
        console.error("Unexpected stream error:", error);
        if (!abortSignal.aborted) {
            setLoading(false);
            setError(error instanceof Error ? error.message : 'Unknown error');
        }
    }
}, []);


  const generateReport = useCallback(async (formData: FormData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const result = await serviceRef.current.generateReport(formData);
      if (result) {
        setReport(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error generating report:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset state on unmount
  useEffect(() => {
    return () => {
      setStreamData('');
      setReport(null);
      setError(null);
      setLoading(false);
    };
  }, []);

  return {
    report,
    streamData,
    loading,
    error,
    generateReport,
    streamReport,
  };
};
