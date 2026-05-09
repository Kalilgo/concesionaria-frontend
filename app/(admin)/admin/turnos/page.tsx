'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getAppointments, confirmAppointment, deleteAppointment, createAppointment } from '@/lib/api/appointments';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Check, X, Plus, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function TurnosPage() {
  const [showForm, setShowForm] = useState(false);
  const { data: appointments, refetch, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(),
  });

  const confirmMutation = useMutation({
    mutationFn: confirmAppointment,
    onSuccess: () => { toast.success('Turno confirmado'); refetch(); },
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Cancelar este turno?')) return;
    try {
      await deleteAppointment(id);
      toast.success('Turno cancelado');
      refetch();
    } catch { toast.error('Error'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Turnos</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition">
          <Plus className="h-5 w-5" /> Nuevo Turno
        </button>
      </div>

      {showForm && <AppointmentForm onClose={() => setShowForm(false)} onSuccess={() => { setShowForm(false); refetch(); }} />}

      {isLoading ? (
        <p>Cargando...</p>
      ) : appointments && appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((apt) => (
            <div key={apt.id} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${apt.confirmado ? 'border-green-500' : 'border-yellow-500'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">{apt.nombre}</p>
                  <p className="text-sm text-gray-600">{apt.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${apt.confirmado ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {apt.confirmado ? 'Confirmado' : 'Pendiente'}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {format(new Date(apt.fecha), 'dd/MM/yyyy')} - {apt.hora}</p>
                <p><strong>Vehículo:</strong> {apt.vehiculo}</p>
                <p><strong>Tel:</strong> {apt.telefono}</p>
                {apt.comentarios && <p><strong>Notas:</strong> {apt.comentarios}</p>}
              </div>
              <div className="flex gap-2 mt-4">
                {!apt.confirmado && (
                  <button onClick={() => confirmMutation.mutate(apt.id)} className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-1 text-sm">
                    <Check className="h-4 w-4" /> Confirmar
                  </button>
                )}
                <button onClick={() => handleDelete(apt.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-1 text-sm">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">No hay turnos</p>
      )}
    </div>
  );
}

function AppointmentForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', fecha: '', hora: '', vehiculo: '', comentarios: '' });

  const mutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => { toast.success('Turno creado'); onSuccess(); },
    onError: () => toast.error('Error al crear turno'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...form, fecha: new Date(form.fecha).toISOString() });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <h2 className="text-lg font-semibold mb-4">Nuevo Turno</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="border rounded-lg px-3 py-2" required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border rounded-lg px-3 py-2" required />
        <input placeholder="Teléfono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className="border rounded-lg px-3 py-2" required />
        <input placeholder="Vehículo" value={form.vehiculo} onChange={(e) => setForm({ ...form, vehiculo: e.target.value })} className="border rounded-lg px-3 py-2" required />
        <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} className="border rounded-lg px-3 py-2" required />
        <input type="time" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} className="border rounded-lg px-3 py-2" required />
        <textarea placeholder="Comentarios" value={form.comentarios} onChange={(e) => setForm({ ...form, comentarios: e.target.value })} className="col-span-2 border rounded-lg px-3 py-2" />
        <div className="col-span-2 flex gap-4">
          <button type="submit" disabled={mutation.isPending} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50">
            {mutation.isPending ? 'Creando...' : 'Crear Turno'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
