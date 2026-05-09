import { create } from 'zustand';

interface FiltersState {
  marca: string;
  minPrecio: number;
  maxPrecio: number;
  anio: number;
  combustible: string;
  transmision: string;
  disponible: boolean;
  destacado: boolean;
  setFilter: <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => void;
  resetFilters: () => void;
}

const initialFilters = {
  marca: '',
  minPrecio: 0,
  maxPrecio: 0,
  anio: 0,
  combustible: '',
  transmision: '',
  disponible: true,
  destacado: false,
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...initialFilters,
  setFilter: (key, value) => set({ [key]: value }),
  resetFilters: () => set(initialFilters),
}));
