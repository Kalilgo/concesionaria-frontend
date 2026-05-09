'use client';

import { useState } from 'react';
import { useFiltersStore } from '@/store/filtersStore';
import { useQuery } from '@tanstack/react-query';
import { getMarcas } from '@/lib/api/vehicles';
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  onClose?: () => void;
}

export function FiltrosPanel({ onClose }: Props) {
  const { marca, minPrecio, maxPrecio, anio, transmision, combustible, setFilter, resetFilters } = useFiltersStore();
  const { data: marcas } = useQuery({ queryKey: ['marcas'], queryFn: getMarcas });
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    marca: true,
    precio: true,
    anio: true,
    caracteristicas: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const anios = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters = marca || minPrecio || maxPrecio || anio || transmision || combustible;

  const FilterContent = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-900">Filtros</h2>
        {hasActiveFilters && (
          <button 
            onClick={resetFilters} 
            className="text-sm text-primary hover:text-primary-700 flex items-center gap-1 font-medium"
          >
            <X className="h-4 w-4" /> Limpiar
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="border-b border-gray-100 pb-4">
          <button 
            onClick={() => toggleSection('marca')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-700">Marca</span>
            {expandedSections.marca ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>
          {expandedSections.marca && (
            <div className="mt-3">
              <select
                value={marca}
                onChange={(e) => setFilter('marca', e.target.value)}
                className="input-field text-sm"
              >
                <option value="">Todas las marcas</option>
                {marcas?.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          )}
        </div>

        <div className="border-b border-gray-100 pb-4">
          <button 
            onClick={() => toggleSection('anio')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-700">Año</span>
            {expandedSections.anio ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>
          {expandedSections.anio && (
            <div className="mt-3">
              <select
                value={anio || ''}
                onChange={(e) => setFilter('anio', e.target.value ? Number(e.target.value) : 0)}
                className="input-field text-sm"
              >
                <option value="">Todos los años</option>
                {anios.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          )}
        </div>

        <div className="border-b border-gray-100 pb-4">
          <button 
            onClick={() => toggleSection('precio')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-700">Precio</span>
            {expandedSections.precio ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>
          {expandedSections.precio && (
            <div className="mt-3 space-y-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  placeholder="Mínimo"
                  value={minPrecio || ''}
                  onChange={(e) => setFilter('minPrecio', Number(e.target.value))}
                  className="input-field text-sm pl-7"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  placeholder="Máximo"
                  value={maxPrecio || ''}
                  onChange={(e) => setFilter('maxPrecio', Number(e.target.value))}
                  className="input-field text-sm pl-7"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-100 pb-4">
          <button 
            onClick={() => toggleSection('caracteristicas')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-700">Características</span>
            {expandedSections.caracteristicas ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>
          {expandedSections.caracteristicas && (
            <div className="mt-3 space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Transmisión</label>
                <select
                  value={transmision || ''}
                  onChange={(e) => setFilter('transmision', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">Todas</option>
                  <option value="Automática">Automática</option>
                  <option value="Manual">Manual</option>
                  <option value="Semi-Automática">Semi-Automática</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Combustible</label>
                <select
                  value={combustible || ''}
                  onChange={(e) => setFilter('combustible', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">Todos</option>
                  <option value="Nafta">Nafta</option>
                  <option value="Diésel">Diésel</option>
                  <option value="Nafta/GNC">Nafta/GNC</option>
                  <option value="Eléctrico">Eléctrico</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {marca && (
              <span className="badge-primary flex items-center gap-1">
                {marca}
                <button onClick={() => setFilter('marca', '')}><X className="h-3 w-3" /></button>
              </span>
            )}
            {anio > 0 && (
              <span className="badge-primary flex items-center gap-1">
                {anio}
                <button onClick={() => setFilter('anio', 0)}><X className="h-3 w-3" /></button>
              </span>
            )}
            {transmision && (
              <span className="badge-primary flex items-center gap-1">
                {transmision}
                <button onClick={() => setFilter('transmision', '')}><X className="h-3 w-3" /></button>
              </span>
            )}
            {combustible && (
              <span className="badge-primary flex items-center gap-1">
                {combustible}
                <button onClick={() => setFilter('combustible', '')}><X className="h-3 w-3" /></button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-primary text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium hover:bg-primary-700 transition"
      >
        <SlidersHorizontal className="h-5 w-5" />
        Filtros
        {hasActiveFilters && (
          <span className="bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            !
          </span>
        )}
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Filtros</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100">
              <button 
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hidden lg:block bg-white p-5 rounded-2xl shadow-soft sticky top-24">
        <FilterContent />
      </div>
    </>
  );
}