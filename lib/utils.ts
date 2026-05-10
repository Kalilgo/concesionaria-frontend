import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrecio(precio: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio);
}

export function calcCuota(precio: number, meses: number, tasaAnual: number = 0.48): string {
  const tasaMensual = tasaAnual / 12;
  const cuota = (precio * tasaMensual * Math.pow(1 + tasaMensual, meses)) / (Math.pow(1 + tasaMensual, meses) - 1);
  return formatPrecio(Math.round(cuota));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export function getColorHex(color: string): string {
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
