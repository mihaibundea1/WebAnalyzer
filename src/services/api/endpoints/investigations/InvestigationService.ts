// services/api/endpoints/investigation/InvestigationService.ts
import { BaseApiService } from '../../core/BaseApiService';
import { ApiResponse } from '../../core/types/api.types';
import { INVESTIGATION_ENDPOINTS } from './constants/investigation.endpoints';
import { Investigation } from './types/investigation.types';

export class InvestigationService extends BaseApiService {
  constructor(getToken?: () => Promise<string | null>) {
    // The base URL for this service will be INVESTIGATION_ENDPOINTS.BASE
    super(INVESTIGATION_ENDPOINTS.BASE, getToken);
  }

  async getInvestigations(): Promise<Investigation[] | null> {
    try {
      // GET request to '/investigations/'
      const response: ApiResponse<Investigation[]> = await this.get(INVESTIGATION_ENDPOINTS.CREATE);
      return response.data || null;
    } catch (error) {
      console.error('Error fetching investigations:', error);
      return null;
    }
  }

  async getInvestigation(investigationId: number): Promise<Investigation | null> {
    try {
      // GET request to '/investigations/<investigationId>'
      const response: ApiResponse<Investigation> = await this.get(
        INVESTIGATION_ENDPOINTS.GET(investigationId)
      );
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching investigation ${investigationId}:`, error);
      return null;
    }
  }

  async createInvestigation(formData: FormData): Promise<Investigation | null> {
    try {
      // POST request to '/investigations/'
      const response: ApiResponse<Investigation> = await this.post(
        INVESTIGATION_ENDPOINTS.CREATE,
        formData
      );
      return response.data || null;
    } catch (error) {
      console.error('Error creating investigation:', error);
      return null;
    }
  }

  async deleteInvestigation(investigationId: number): Promise<boolean> {
    try {
      // DELETE request to '/investigations/<investigationId>'
      await this.delete(INVESTIGATION_ENDPOINTS.DELETE(investigationId));
      return true;
    } catch (error) {
      console.error(`Error deleting investigation ${investigationId}:`, error);
      return false;
    }
  }
}
