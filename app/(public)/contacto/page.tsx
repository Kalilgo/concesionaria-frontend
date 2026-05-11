'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createInquiry } from '@/lib/api/inquiries';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar, Wrench, Car } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ContactoPage() {
  const [servicio, setServicio] = useState('');
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setServicio(params.get('servicio') || '');
  }, []);

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
    const mensajeConServicio = form.mensaje 
      ? `[${servicio || 'consulta general'}] ${form.mensaje}`
      : `[${servicio || 'consulta general'}] Usuario contacted desde la web`;
    mutation.mutate({ ...form, mensaje: mensajeConServicio });
  };

  const servicios = [
    { id: 'turno', label: 'Turno Taller', icon: Calendar, desc: 'Solicitá un turno para service o reparación' },
    { id: 'compra', label: 'Comprar Auto', icon: Car, desc: 'Quiero información sobre un auto' },
    { id: 'general', label: 'Otro', icon: MessageCircle, desc: 'Otra consulta' },
  ];

  const servicioActual = servicios.find(s => s.id === servicio) || servicios[2];

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container-app relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">¿En qué podemos ayudarte?</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Escribinos y te respondemos a la brevedad
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Seleccioná un servicio</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {servicios.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setServicio(s.id)}
                      className={`p-4 rounded-xl text-left transition ${
                        servicio === s.id 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <s.icon className={`h-6 w-6 mb-2 ${servicio === s.id ? 'text-white' : 'text-primary'}`} />
                      <p className={`font-medium ${servicio === s.id ? 'text-white' : 'text-gray-900'}`}>
                        {s.label}
                      </p>
                      <p className={`text-sm ${servicio === s.id ? 'text-white/70' : 'text-gray-500'}`}>
                        {s.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Dirección</h3>
                      <p className="text-gray-600">Reconquista 61</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Teléfono</h3>
                      <p className="text-gray-600">+54 9 11 6200-4150</p>
                      <a href="tel:+5491162004150" className="text-primary text-sm hover:underline">
                        Llamar ahora
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Horario de Atención</h3>
                      <p className="text-gray-600">Lun - Sáb: 8:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Otras formas de contactarnos</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a 
                    href="https://wa.me/5491162004150" 
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
                    <Car className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium text-gray-900">Ver Catálogo</p>
                      <p className="text-sm text-gray-500">Browse nuestros autos</p>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {servicioActual.label}
                  </h2>
                  <p className="text-gray-500 mb-6">
                    {servicioActual.desc}
                  </p>
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
                        placeholder="Escribí tu mensaje..."
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