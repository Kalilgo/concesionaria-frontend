'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrecio } from '@/lib/utils';
import type { Vehicle } from '@/types';
import { Gauge, Fuel, Settings, Star, Heart } from 'lucide-react';
import { useState } from 'react';

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
  const imagen = imagenes[0] || 'https://images.unsplash.com/photo-1494976388531-105120391436?w=800';

  return (
    <Link 
      href={`/autos/${vehicle.slug}`} 
      className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image 
          src={imagen} 
          alt={`${vehicle.marca} ${vehicle.modelo}`} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {vehicle.destacado && (
            <span className="bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Star className="h-3 w-3 fill-white" />
              Destacado
            </span>
          )}
          {vehicle.kilometros === 0 && (
            <span className="bg-success text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              0km
            </span>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition shadow-md"
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <span className="text-lg font-bold">{formatPrecio(vehicle.precio)}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-sm text-primary font-medium">{vehicle.marca}</p>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">
              {vehicle.modelo}
            </h3>
          </div>
          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-lg">
            {vehicle.anio}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500 mt-3 mb-4">
          <span className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4" />
            {(vehicle.kilometros || 0).toLocaleString()} km
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Fuel className="h-4 w-4" />
            {vehicle.combustible}
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Settings className="h-4 w-4" />
            {vehicle.transmision}
          </span>
        </div>

        {vehicle.color && (
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            <div 
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: getColorHex(vehicle.color) }}
            />
            <span className="text-sm text-gray-500">{vehicle.color}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

function getColorHex(color: string): string {
  const colors: Record<string, string> = {
    'Blanco': '#FFFFFF',
    'Negro': '#1a1a1a',
    'Plata': '#C0C0C0',
    'Gris': '#808080',
    'Azul': '#3B82F6',
    'Rojo': '#EF4444',
    'Verde': '#10B981',
    'Amarillo': '#F59E0B',
    'Naranja': '#F97316',
    'Beige': '#F5F5DC',
    'Bordó': '#800020',
  };
  return colors[color] || '#808080';
}