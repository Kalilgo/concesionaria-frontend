'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createInquiry } from '@/lib/api/inquiries';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import type { Vehicle } from '@/types';
import { Phone, Mail, Send, Wrench } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  vehicle: Vehicle;
}

export function CTAContacto({ vehicle }: Props) {
  const { sendMessage } = useWhatsApp();
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });

  const mutation = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      toast.success('Consulta enviada correctamente');
      setForm({ nombre: '', email: '', telefono: '', mensaje: '' });
    },
    onError: () => toast.error('Error al enviar la consulta'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...form, mensaje: `Consulta sobre ${vehicle.marca} ${vehicle.modelo}: ${form.mensaje}`, vehicleId: vehicle.id });
  };

  const vehicleInfo = `${vehicle.marca} ${vehicle.modelo} ${vehicle.anio} - $${vehicle.precio.toLocaleString('es-AR')}`;
  
  const handleWhatsApp = (tipo: 'vehiculo' | 'mecanica') => {
    if (tipo === 'vehiculo') {
      sendMessage(`Hola! Estoy interesado en el ${vehicleInfo}. ¿Podemos conversar?`);
    } else {
      sendMessage(`Hola! Necesito información sobre servicios de mecánica y taller.`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleWhatsApp('vehiculo')}
          className="bg-green-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition font-medium"
        >
          <Phone className="h-5 w-5" /> Consultar
        </button>
        <button
          onClick={() => handleWhatsApp('mecanica')}
          className="bg-slate-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition font-medium"
        >
          <Wrench className="h-5 w-5" /> Mecánica
        </button>
      </div>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">o envía una consulta</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <input
          type="email"
          placeholder="Tu email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <input
          type="tel"
          placeholder="Tu teléfono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <textarea
          placeholder="Tu mensaje..."
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 h-24 resize-none"
          required
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-700 transition disabled:opacity-50"
        >
          <Mail className="h-5 w-5" /> {mutation.isPending ? 'Enviando...' : 'Enviar Consulta'}
        </button>
      </form>
    </div>
  );
}
