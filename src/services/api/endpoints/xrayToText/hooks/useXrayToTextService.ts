
// hooks/useXrayToTextService.ts
import { useRef, useState, useEffect, useCallback} from 'react';
import { XrayToTextService } from '../XrayToTextService';
import { XrayToTextReport } from '../types/xrayToText.types';

export const useXrayToTextService = () => {
  const getToken = async (): Promise<string | null> => {
    // Implement token retrieval logic here if needed
    return null;
  };

  const serviceRef = useRef(new XrayToTextService(getToken));
  const [report, setReport] = useState<string | null>(null);
  const [streamData, setStreamData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async (formData: FormData): Promise<void> => {
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
  };

  const streamReport = useCallback(async (formData: FormData) => {
    setLoading(true);
    setStreamData([]);
    setError(null);
    
    try {
      await serviceRef.current.streamReport(
        formData,
        (msg: string) => {
          setStreamData(prev => [...prev, msg]);
        },
        () => {
          setLoading(false);
        },
        (err: string) => {
          setLoading(false);
          setError(err);
        }
      );
    } catch (error) {
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  }, []);

  useEffect(() => {
    return () => {
      setStreamData([]);
      setReport(null);
      setError(null);
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