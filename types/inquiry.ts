export interface Inquiry {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  vehicleId: string | null;
  leido: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInquiryInput {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  vehicleId?: string;
}
