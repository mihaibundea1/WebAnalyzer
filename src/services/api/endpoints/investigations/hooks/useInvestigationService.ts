// services/api/endpoints/investigation/hooks/useInvestigationService.ts
import { useRef, useState, useEffect } from 'react';
import { InvestigationService } from '../InvestigationService';
import { Investigation } from '../types/investigation.types';
import { JWTManager } from '../../../core/JWTManager';

export const useInvestigationService = () => {
  const jwtManager = JWTManager.getInstance();

  // Wrap JWTManager's getAccessToken in an async function.
  const getToken = async (): Promise<string | null> => {
    // Optionally load tokens if not yet loaded
    if (!jwtManager.getAccessToken()) {
      await jwtManager.loadTokens();
    }
    return jwtManager.getAccessToken();
  };

  // Pass our getToken function to the service.
  const serviceRef = useRef(new InvestigationService(getToken));
  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [selectedInvestigation, setSelectedInvestigation] = useState<Investigation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadInvestigations = async (): Promise<void> => {
    setLoading(true);
    const data = await serviceRef.current.getInvestigations();
    if (data) {
      setInvestigations(data);
    }
    setLoading(false);
  };

  const loadInvestigation = async (id: number): Promise<void> => {
    setLoading(true);
    const investigation = await serviceRef.current.getInvestigation(id);
    if (investigation) {
      setSelectedInvestigation(investigation);
    }
    setLoading(false);
  };

  const createInvestigation = async (formData: FormData): Promise<void> => {
    setLoading(true);
    const newInvestigation = await serviceRef.current.createInvestigation(formData);
    if (newInvestigation) {
      setInvestigations(prev => [...prev, newInvestigation]);
    }
    setLoading(false);
  };

  const deleteInvestigation = async (id: number): Promise<void> => {
    setLoading(true);
    const success = await serviceRef.current.deleteInvestigation(id);
    if (success) {
      setInvestigations(prev => prev.filter(inv => inv.id !== id));
      if (selectedInvestigation?.id === id) {
        setSelectedInvestigation(null);
      }
    }
    setLoading(false);
  };

  // Initially load all investigations
  useEffect(() => {
    loadInvestigations();
  }, []);

  return {
    investigations,
    selectedInvestigation,
    loading,
    loadInvestigations,
    loadInvestigation,
    createInvestigation,
    deleteInvestigation,
  };
};
