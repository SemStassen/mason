import { create } from "zustand";

interface Project {
  uuid: string;
  name: string;
  hexColor: string;
}

export interface ProjectsState {
  projects: Array<Project>;
  hydrate: (data: Partial<ProjectsState>) => void;
}

export const useProjectsStore = create<ProjectsState>()((set) => ({
  projects: [],
  hydrate: (data) => set((state) => ({ ...state, ...data })),
}));
