import { create } from "zustand";

export const useStore = create((set) => ({
  introLoaded: false,
  setIntroLoaded: () => set({ introLoaded: true }),
}));
