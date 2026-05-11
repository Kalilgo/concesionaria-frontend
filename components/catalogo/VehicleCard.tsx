'use client';

import Link from 'next/link';
import { formatPrecio } from '@/lib/utils';
import type { Vehicle } from '@/types';
import { Star, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

const WHATSAPP_NUMBER = '5491162004150';

interface Props {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  
  let imagenes: string[] = [];
  try {
    imagenes = typeof vehicle.imagenes === 'string' ? JSON.parse(vehicle.imagenes) : vehicle.imagenes || [];
  } catch {
    imagenes = [];
  }
  const imagen = imagenes[0] || '';

  return (
    <Link 
      href={`/autos/${vehicle.slug}`} 
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <ImageWithFallback 
          src={imagen} 
          alt={`${vehicle.marca} ${vehicle.modelo}`} 
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-2 left-2 flex gap-1.5">
          {vehicle.destacado && (
            <span className="bg-[#3487F6] text-white text-[10px] font-bold px-2 py-0.5 rounded">
              DESTACADO
            </span>
          )}
          {vehicle.kilometros === 0 && (
            <span className="bg-[#00A650] text-white text-[10px] font-bold px-2 py-0.5 rounded">
              0 KM
            </span>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition shadow-sm"
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">
          {vehicle.marca} {vehicle.modelo}
        </h3>
        
        <p className="text-xl font-bold text-gray-900 mb-2">
          {formatPrecio(vehicle.precio)}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 mb-2">
          <span>{vehicle.anio}</span>
          <span className="w-px h-4 bg-gray-300" />
          <span>{vehicle.kilometros.toLocaleString()} km</span>
          <span className="w-px h-4 bg-gray-300" />
          <span>{vehicle.combustible}</span>
          <span className="w-px h-4 bg-gray-300" />
          <span>{vehicle.transmision}</span>
        </div>

        {vehicle.color && (
          <p className="text-sm text-gray-500 mb-2">
            Color: {vehicle.color}
          </p>
        )}

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola, me interesa el ${vehicle.marca} ${vehicle.modelo} ${vehicle.anio}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#3487F6] hover:bg-[#2978CC] text-white text-sm font-semibold py-2 px-3 rounded-lg transition mt-2 border-t border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageCircle className="h-4 w-4" />
          Contactar al vendedor
        </a>
      </div>
    </Link>
  );
}