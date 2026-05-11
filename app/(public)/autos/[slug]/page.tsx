'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getVehicleBySlug } from '@/lib/api/vehicles';
import { getColorHex, formatPrecio } from '@/lib/utils';
import { Galeria } from '@/components/ficha/Galeria';
import { FichaTecnica } from '@/components/ficha/FichaTecnica';
import { CTAContacto } from '@/components/ficha/CTAContacto';
import { ArrowLeft, Share2, Heart, Star, Shield, Clock, CheckCircle, Calendar, Gauge, Fuel, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function VehicleDetailPage() {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  
  const { data: vehicle, isLoading } = useQuery({
    queryKey: ['vehicle', params.slug],
    queryFn: () => getVehicleBySlug(params.slug as string),
    enabled: !!params.slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Star className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehículo no encontrado</h2>
        <p className="text-gray-500 mb-6">El vehículo que buscas no está disponible</p>
        <Link href="/autos" className="btn-primary">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  let imagenes: string[] = [];
  try {
    imagenes = typeof vehicle.imagenes === 'string' ? JSON.parse(vehicle.imagenes) : vehicle.imagenes || [];
  } catch {
    imagenes = [];
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container-app">
        <div className="mb-6">
          <Link 
            href="/autos" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition bg-white px-4 py-2 rounded-lg shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Galeria imagenes={imagenes} />
            
            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-primary font-medium mb-1">{vehicle.marca}</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {vehicle.modelo} {vehicle.anio}
                  </h1>
                  <p className="text-3xl font-bold text-primary mt-2">{formatPrecio(vehicle.precio)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-xl transition ${isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {vehicle.descripcion && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h2>
                  <p className="text-gray-600 leading-relaxed">{vehicle.descripcion}</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-start justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <p className="text-xs font-medium text-primary uppercase tracking-wide">Año</p>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{vehicle.anio}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-start justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge className="h-4 w-4 text-primary" />
                    <p className="text-xs font-medium text-primary uppercase tracking-wide">Kilometraje</p>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{vehicle.kilometros.toLocaleString()} km</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-start justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Fuel className="h-4 w-4 text-primary" />
                    <p className="text-xs font-medium text-primary uppercase tracking-wide">Combustible</p>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{vehicle.combustible}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-start justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Settings className="h-4 w-4 text-primary" />
                    <p className="text-xs font-medium text-primary uppercase tracking-wide">Transmisión</p>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{vehicle.transmision}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Características</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicle.color && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: getColorHex(vehicle.color) }} />
                      <span>{vehicle.color}</span>
                    </div>
                  )}
                  {vehicle.caracteristicas?.split(',').map((char, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">{char.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Precio</p>
                <p className="text-3xl md:text-4xl font-bold text-primary break-words">
                  ${vehicle.precio.toLocaleString('es-AR')} <span className="text-lg text-gray-500 font-normal">ARS</span>
                </p>
              </div>

<CTAContacto vehicle={vehicle} />
               
               <div className="mt-6 pt-6 border-t border-gray-100">
                 <div className="bg-primary/5 rounded-xl p-4">
                   <p className="font-medium text-gray-900">¿Necesitás ayuda?</p>
                   <p className="text-sm text-gray-500 mt-1">Escribinos por cualquier consulta sobre este auto</p>
                 </div>
               </div>
            </div>

            <div className="bg-white rounded-2xl shadow-soft p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Garantía Incluida</p>
                    <p className="text-sm text-gray-500">12 meses de cobertura</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Entrega Inmediata</p>
                    <p className="text-sm text-gray-500">Listo para retirar</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Certificación</p>
                    <p className="text-sm text-gray-500">Vehículo verificado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}