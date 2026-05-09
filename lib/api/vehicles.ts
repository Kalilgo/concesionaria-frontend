import type { Vehicle, CreateVehicleInput } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }
  if (res.status === 204) return {} as T;
  return res.json();
}

export async function getVehicles(filters?: Record<string, string | number | boolean>) {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== '') params.append(k, String(v));
    });
  }
  const query = params.toString() ? `?${params.toString()}` : '';
  const data = await fetchAPI<{ data: Vehicle[] }>(`/vehicles${query}`);
  return data.data;
}

export async function getVehicleBySlug(slug: string) {
  const data = await fetchAPI<{ data: Vehicle }>(`/vehicles/slug/${slug}`);
  return data.data;
}

export async function getVehicleById(id: string) {
  const data = await fetchAPI<{ data: Vehicle }>(`/vehicles/${id}`);
  return data.data;
}

export async function getMarcas(): Promise<string[]> {
  const data = await fetchAPI<{ data: string[] }>('/vehicles/marcas');
  return data.data;
}

export async function createVehicle(vehicle: CreateVehicleInput) {
  const data = await fetchAPI<{ data: Vehicle }>('/vehicles', {
    method: 'POST',
    body: JSON.stringify(vehicle),
  });
  return data.data;
}

export async function updateVehicle(id: string, vehicle: Partial<CreateVehicleInput>) {
  const data = await fetchAPI<{ data: Vehicle }>(`/vehicles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(vehicle),
  });
  return data.data;
}

export async function deleteVehicle(id: string) {
  await fetchAPI<void>(`/vehicles/${id}`, { method: 'DELETE' });
}
