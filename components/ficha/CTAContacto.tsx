'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createInquiry } from '@/lib/api/inquiries';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import type { Vehicle } from '@/types';
import { Phone, Mail, Send } from 'lucide-react';
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

  return (
    <div className="space-y-4">
      <button
        onClick={() => sendMessage(`Hola! Estoy interesado en el ${vehicle.marca} ${vehicle.modelo} ${vehicle.anio}. ¿Podemos conversar?`)}
        className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition"
      >
        <Phone className="h-5 w-5" /> WhatsApp
      </button>

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
          className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition disabled:opacity-50"
        >
          <Mail className="h-5 w-5" /> {mutation.isPending ? 'Enviando...' : 'Enviar Consulta'}
        </button>
      </form>
    </div>
  );
}
