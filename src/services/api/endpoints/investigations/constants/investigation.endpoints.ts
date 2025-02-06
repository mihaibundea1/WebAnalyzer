// services/api/endpoints/investigation/constants/investigation.endpoints.ts

export const INVESTIGATION_ENDPOINTS = {
  BASE: '/investigations',
  GET: (investigation_id: string | number) => `/${investigation_id}`,
  CREATE: '/',
  DELETE: (investigation_id: string | number) => `/${investigation_id}`,
} as const;
