import { create } from "zustand";

interface Project {
  name: string;
  uuid: string;
  hexColor: string;
}

export interface ProjectsState {
  projects: Array<Project>;
  setProjects: (val: Array<Project>) => void;
  hydrate: (data: Partial<ProjectsState>) => void;
}

export const useProjectsStore = create<ProjectsState>()((set) => ({
  projects: [],
  setProjects: (val) => set(() => ({ projects: val })),
  hydrate: (data) => set((state) => ({ ...state, ...data })),
}));
