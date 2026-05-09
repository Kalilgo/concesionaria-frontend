import type { Inquiry, CreateInquiryInput } from '@/types';

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

export async function getInquiries(unreadOnly?: boolean) {
  const query = unreadOnly ? '?unreadOnly=true' : '';
  const data = await fetchAPI<{ data: Inquiry[] }>(`/inquiries${query}`);
  return data.data;
}

export async function createInquiry(inquiry: CreateInquiryInput) {
  const data = await fetchAPI<{ data: Inquiry }>('/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiry),
  });
  return data.data;
}

export async function markInquiryAsRead(id: string) {
  const data = await fetchAPI<{ data: Inquiry }>(`/inquiries/${id}/read`, { method: 'PATCH' });
  return data.data;
}

export async function deleteInquiry(id: string) {
  await fetchAPI<void>(`/inquiries/${id}`, { method: 'DELETE' });
}

export async function getInquiriesStats() {
  const data = await fetchAPI<{ data: { total: number; unread: number } }>('/inquiries/stats');
  return data.data;
}
