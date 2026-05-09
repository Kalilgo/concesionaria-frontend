import { useState, useMemo } from 'react';
import { useFiltersStore } from '@/store/filtersStore';

export function useVehicleFilters(vehicles: { marca: string; anio: number; precio: number; combustible: string; transmision: string; disponible: boolean; destacado: boolean }[]) {
  const filters = useFiltersStore();
  const [sortBy, setSortBy] = useState<'precio-asc' | 'precio-desc' | 'anio-desc'>('anio-desc');

  return useMemo(() => {
    let filtered = vehicles.filter((v) => {
      if (filters.marca && v.marca !== filters.marca) return false;
      if (filters.minPrecio && v.precio < filters.minPrecio) return false;
      if (filters.maxPrecio && v.precio > filters.maxPrecio) return false;
      if (filters.anio && v.anio !== filters.anio) return false;
      if (filters.combustible && v.combustible !== filters.combustible) return false;
      if (filters.transmision && v.transmision !== filters.transmision) return false;
      if (filters.disponible && !v.disponible) return false;
      if (filters.destacado && !v.destacado) return false;
      return true;
    });

    switch (sortBy) {
      case 'precio-asc': filtered.sort((a, b) => a.precio - b.precio); break;
      case 'precio-desc': filtered.sort((a, b) => b.precio - a.precio); break;
      case 'anio-desc': filtered.sort((a, b) => b.anio - a.anio); break;
    }

    return { filtered, sortBy, setSortBy };
  }, [vehicles, filters, sortBy]);
}
