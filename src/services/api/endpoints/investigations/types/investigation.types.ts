export interface Investigation {
  id: number;
  userId: number;
  imagePath: string;
  diagnostic?: string | null;
  description?: string | null;
  doctorId?: number | null;
  createdAt: string; // ISO string format (UTC datetime)
  updatedAt: string; // ISO string format (UTC datetime)
}

export function serializeInvestigation(data: any): Investigation {
  return {
    id: data.id,
    userId: data.user_id,
    imagePath: data.image_path,
    diagnostic: data.diagnostic ?? null,
    description: data.description ?? null,
    doctorId: data.doctor_id ?? null,
    createdAt: new Date(data.created_at).toISOString(),
    updatedAt: new Date(data.updated_at).toISOString(),
  };
}
