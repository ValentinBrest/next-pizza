import { create } from 'zustand';

interface State {
    activeId: number;
    setActiveId: (activeId: number) => void;
}

export const useCategories = create<State>((set) => ({
    activeId: 1,
    setActiveId: (activeId) => set({ activeId }),
}));
