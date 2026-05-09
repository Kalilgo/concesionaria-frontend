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
