'use client';

import { useQuery } from '@tanstack/react-query';
import { getVehicles } from '@/lib/api/vehicles';
import { getInquiriesStats } from '@/lib/api/inquiries';
import { getAppointmentsStats } from '@/lib/api/appointments';
import { Car, MessageSquare, Calendar, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { data: vehicles } = useQuery({ queryKey: ['vehicles'], queryFn: () => getVehicles() });
  const { data: inquiries } = useQuery({ queryKey: ['inquiries-stats'], queryFn: () => getInquiriesStats() });
  const { data: appointments } = useQuery({ queryKey: ['appointments-stats'], queryFn: () => getAppointmentsStats() });

  const stats = [
    { label: 'Vehículos', value: vehicles?.length || 0, icon: Car, color: 'bg-blue-500' },
    { label: 'Consultas', value: inquiries?.total || 0, icon: MessageSquare, color: 'bg-green-500' },
    { label: 'Turnos', value: appointments?.total || 0, icon: Calendar, color: 'bg-purple-500' },
    { label: 'Sin Leer', value: inquiries?.unread || 0, icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">{label}</span>
              <div className={`${color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-4">Vehículos Recientes</h2>
          {vehicles && vehicles.length > 0 ? (
            <div className="space-y-4">
              {vehicles.slice(0, 5).map((v) => (
                <div key={v.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{v.marca} {v.modelo}</p>
                    <p className="text-sm text-gray-500">{v.anio}</p>
                  </div>
                  <p className="text-primary font-medium">${v.precio.toLocaleString('es-AR')}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay vehículos registrados</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-4">Resumen</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Consultas sin leer</span>
              <span className="font-medium text-orange-500">{inquiries?.unread || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Turnos confirmados</span>
              <span className="font-medium text-green-500">{appointments?.confirmed || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Turnos pendientes</span>
              <span className="font-medium text-yellow-500">{appointments?.pending || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
