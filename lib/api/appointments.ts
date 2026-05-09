import type { Appointment, CreateAppointmentInput } from '@/types';

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

export async function getAppointments(confirmedOnly?: boolean) {
  const query = confirmedOnly !== undefined ? `?confirmedOnly=${confirmedOnly}` : '';
  const data = await fetchAPI<{ data: Appointment[] }>(`/appointments${query}`);
  return data.data;
}

export async function createAppointment(appointment: CreateAppointmentInput) {
  const data = await fetchAPI<{ data: Appointment }>('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointment),
  });
  return data.data;
}

export async function confirmAppointment(id: string) {
  const data = await fetchAPI<{ data: Appointment }>(`/appointments/${id}/confirm`, { method: 'PATCH' });
  return data.data;
}

export async function deleteAppointment(id: string) {
  await fetchAPI<void>(`/appointments/${id}`, { method: 'DELETE' });
}

export async function getAppointmentsStats() {
  const data = await fetchAPI<{ data: { total: number; confirmed: number; pending: number } }>('/appointments/stats');
  return data.data;
}
