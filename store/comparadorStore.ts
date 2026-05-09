import { create } from 'zustand';

export const useComparadorStore = create<{
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}>((set) => ({
  ids: [],
  add: (id) => set((state) => ({ ids: [...state.ids, id].slice(0, 3) })),
  remove: (id) => set((state) => ({ ids: state.ids.filter((i) => i !== id) })),
  clear: () => set({ ids: [] }),
}));
