'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createInquiry } from '@/lib/api/inquiries';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Mensaje enviado correctamente');
    },
    onError: () => toast.error('Error al enviar el mensaje'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container-app relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactanos</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estamos para ayudarte a encontrar tu próximo auto
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Dirección</h3>
                      <p className="text-gray-600">Av. Libertador 1234, Buenos Aires, Argentina</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Teléfono</h3>
                      <p className="text-gray-600">+54 11 1234-5678</p>
                      <a href="tel:+541112345678" className="text-primary text-sm hover:underline">
                        Llamar ahora
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@concesionaria.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Horario de Atención</h3>
                      <p className="text-gray-600">Lun - Vie: 9:00 - 18:00</p>
                      <p className="text-gray-600">Sábados: 9:00 - 13:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Otras formas de contactarnos</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a 
                    href="https://wa.me/5491112345678" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition"
                  >
                    <MessageCircle className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp</p>
                      <p className="text-sm text-gray-500">Chateá con nosotros</p>
                    </div>
                  </a>
                  <Link 
                    href="/autos" 
                    className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                  >
                    <Calendar className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium text-gray-900">Turno Online</p>
                      <p className="text-sm text-gray-500">Reservá tu visita</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="h-10 w-10 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h2>
                  <p className="text-gray-600 mb-6">
                    Gracias por contactarnos. Te responderemos a la brevedad.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ nombre: '', email: '', telefono: '', mensaje: '' });
                    }}
                    className="btn-secondary"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Envianos un Mensaje</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="input-label">Nombre completo</label>
                      <input
                        type="text"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        className="input-field"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="input-label">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="input-field"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="input-label">Teléfono</label>
                        <input
                          type="tel"
                          value={form.telefono}
                          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                          className="input-field"
                          placeholder="+54 11 1234 5678"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="input-label">Mensaje</label>
                      <textarea
                        value={form.mensaje}
                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                        className="input-field h-32 resize-none"
                        placeholder="¿En qué podemos ayudarte?"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2"
                    >
                      {mutation.isPending ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Enviar Mensaje
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}