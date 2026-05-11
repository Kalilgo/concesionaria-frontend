'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface Props {
  imagenes: string[];
}

export function Galeria({ imagenes }: Props) {
  const [current, setCurrent] = useState(0);

  let images: string[] = [];
  try {
    images = typeof imagenes === 'string' ? JSON.parse(imagenes) : imagenes || [];
  } catch {
    images = [];
  }

  const currentImage = images[current] || '';

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-96 bg-gray-100">
        <ImageWithFallback src={currentImage} alt="Vehicle" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-contain" />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto">
          {images.map((img, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`relative h-20 w-24 flex-shrink-0 rounded-lg overflow-hidden ${i === current ? 'ring-2 ring-primary' : ''}`}>
              <ImageWithFallback src={img} alt={`Thumbnail ${i + 1}`} fill sizes="96px" className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
