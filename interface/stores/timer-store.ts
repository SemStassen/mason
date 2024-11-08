import { create } from "zustand";

interface TimerState {
  currentTime: string;
  updateCurrentTime: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  currentTime: new Date().toISOString(),
  updateCurrentTime: () => set({ currentTime: new Date().toISOString() }),
}));
