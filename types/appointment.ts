export interface Appointment {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  vehiculo: string;
  comentarios: string | null;
  confirmado: boolean;
  createdAt: string;
  updatedAt: string;
  vehicleId: string | null;
}

export interface CreateAppointmentInput {
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  vehiculo: string;
  comentarios?: string;
  vehicleId?: string;
}
