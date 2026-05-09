export interface Vehicle {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  kilometros: number;
  combustible: string;
  transmision: string;
  color: string;
  descripcion: string;
  caracteristicas: string;
  slug: string;
  imagenes: string[];
  disponible: boolean;
  destacado: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehicleInput {
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  kilometros: number;
  combustible: string;
  transmision: string;
  color: string;
  descripcion: string;
  caracteristicas: string;
  slug: string;
  imagenes?: string[];
  disponible?: boolean;
  destacado?: boolean;
}
