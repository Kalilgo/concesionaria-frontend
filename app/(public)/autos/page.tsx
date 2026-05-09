'use client';

import { useQuery } from '@tanstack/react-query';
import { getVehicles } from '@/lib/api/vehicles';
import { VehicleCard } from '@/components/catalogo/VehicleCard';
import { FiltrosPanel } from '@/components/catalogo/FiltrosPanel';
import { SkeletonCard } from '@/components/common/SkeletonCard';
import { Search, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { useFiltersStore } from '@/store/filtersStore';

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const filters = useFiltersStore();
  
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => getVehicles(),
  });

  const filteredVehicles = vehicles?.filter(vehicle => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      if (!vehicle.marca.toLowerCase().includes(search) && 
          !vehicle.modelo.toLowerCase().includes(search)) {
        return false;
      }
    }
    if (filters.marca && vehicle.marca !== filters.marca) return false;
    if (filters.anio && vehicle.anio !== filters.anio) return false;
    if (filters.minPrecio && vehicle.precio < filters.minPrecio) return false;
    if (filters.maxPrecio && vehicle.precio > filters.maxPrecio) return false;
    if (filters.transmision && vehicle.transmision !== filters.transmision) return false;
    if (filters.combustible && vehicle.combustible !== filters.combustible) return false;
    return true;
  }) || [];

  const hasActiveFilters = filters.marca || filters.anio || filters.minPrecio || filters.maxPrecio || filters.transmision || filters.combustible;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-app">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Nuestro Catálogo
          </h1>
          <p className="text-gray-500">
            {filteredVehicles.length} vehículos disponibles
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-72 flex-shrink-0">
            <FiltrosPanel />
          </aside>
          
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-soft">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por marca o modelo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <LayoutGrid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                <span>Filtros activos:</span>
                <div className="flex flex-wrap gap-2">
                  {filters.marca && <span className="badge-primary">{filters.marca}</span>}
                  {filters.anio > 0 && <span className="badge-primary">{filters.anio}</span>}
                  {filters.transmision && <span className="badge-primary">{filters.transmision}</span>}
                  {filters.combustible && <span className="badge-primary">{filters.combustible}</span>}
                </div>
              </div>
            )}

            {isLoading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filteredVehicles.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredVehicles.map((vehicle, i) => (
                  <div 
                    key={vehicle.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron vehículos
                </h3>
                <p className="text-gray-500 mb-6">
                  Intenta con otros filtros o terms de búsqueda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}