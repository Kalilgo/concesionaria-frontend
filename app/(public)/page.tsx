'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Car, Shield, Clock, Star, MapPin, Phone, ChevronLeft, ChevronRight, Wrench, CheckCircle } from 'lucide-react';
import { getVehicles } from '@/lib/api/vehicles';
import { formatPrecio } from '@/lib/utils';
import { VehicleCard } from '@/components/catalogo/VehicleCard';

export default function HomePage() {
  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => getVehicles(),
  });

  const featuredVehicles = vehicles?.slice(0, 6) || [];

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container-app relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <Star className="h-4 w-4 text-accent fill-accent" />
                <span className="text-sm text-white/90">Más de 500 autos vendidos</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Encontrá tu próximo{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-400">
                  auto ideal
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
                Amplio stock de vehículos 0km y usados. Servicio de taller y soporte técnico.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/autos" className="btn-primary inline-flex items-center gap-2 text-base px-6 py-3.5">
                  Ver Catálogo <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/contacto" className="btn-secondary-light inline-flex items-center gap-2 text-base px-6 py-3.5">
                  Contactar
                </Link>
              </div>

              <div className="flex items-center gap-8 mt-10 pt-10 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-white">500+</p>
                  <p className="text-sm text-gray-400">Autos vendidos</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">50+</p>
                  <p className="text-sm text-gray-400">Marcas</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">98%</p>
                  <p className="text-sm text-gray-400">Clientes satisfechos</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block animate-slide-up animate-delay-200">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl opacity-30" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
                  <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1533473359761-8c4aad6c5d6d?auto=format&fit=crop&w=800&q=80"
                      alt="Auto destacado"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 gradient-overlay p-6">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <p className="font-semibold text-lg">Toyota Corolla</p>
                          <p className="text-sm text-white/80">2024 • 0km</p>
                        </div>
                        <div className="bg-accent px-4 py-2 rounded-lg font-bold">
                          $28.500.000
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {['Stock disponible', 'Taller propio', 'Garantía'].map((item, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-white text-sm font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Car, title: 'Amplio Stock', desc: 'Más de 100 vehículos', color: 'bg-blue-50 text-primary' },
              { icon: Wrench, title: 'Taller Propio', desc: 'Service y reparaciones', color: 'bg-green-50 text-emerald-600' },
              { icon: Shield, title: 'Garantía', desc: 'Cobertura total', color: 'bg-purple-50 text-purple-600' },
              { icon: Clock, title: 'Atención', desc: 'Sempre disponibles', color: 'bg-orange-50 text-orange-600' },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div 
                key={title} 
                className="group p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-soft transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${color} group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Vehículos Destacados
              </h2>
              <p className="text-gray-500">Los mejores autos seleccionados para vos</p>
            </div>
            <Link 
              href="/autos" 
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              Ver todos <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          {featuredVehicles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle, i) => (
                <div 
                  key={vehicle.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <VehicleCard vehicle={vehicle} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card-static">
                  <div className="relative h-56 bg-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                    <div className="h-5 bg-gray-200 rounded w-2/3 animate-pulse" />
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-app">
          <div className="bg-gradient-to-br from-primary to-primary-700 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ¿Necesitás ayuda para elegir?
                </h2>
                <p className="text-white/80 text-lg mb-6">
                  Nuestro equipo está listo para asesorarte y encontrar el auto perfecto según tus necesidades.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contacto" className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
                    Contactar Ahora
                  </Link>
                  <a 
                    href="tel:+541112345678" 
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-accent transition"
                  >
                    <Phone className="h-5 w-5" />
                    +54 11 1234-5678
                  </a>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Visítanos</p>
                      <p className="text-white/70 text-sm">Av. Libertador 1234, CABA</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Horario</p>
                      <p className="text-white/70 text-sm">Lun - Vie: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Nos diferenciamos por nuestro compromiso con la calidad y la satisfacción del cliente
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
{[
              {
                title: 'Atención Personalizada',
                desc: 'Te acompañamos en todo el proceso de compra.',
                icon: Clock,
              },
              {
                title: 'Soporte Post-Venta',
                desc: 'Nuestro equipo te acompaña después de la compra.',
                icon: Wrench,
              },
            ].map(({ title, desc, icon: Icon }, i) => (
              <div 
                key={title}
                className="bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-app">
          <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-pattern opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para encontrar tu próximo auto?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Explora nuestro catálogo completo y encontrá el vehículo perfecto para vos.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/autos" className="btn-primary text-base px-8 py-3.5">
                  Ver Catálogo Completo
                </Link>
                <Link href="/contacto?servicio=soporte" className="btn-secondary-light text-base px-8 py-3.5">
                  Solicitar Turno
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}