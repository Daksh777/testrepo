import { create } from "zustand";

interface BreadCrumbStore {
  breadCrumbs: Record<string, object>;
  setBreadCrumbs: (key: string, value: object) => void;
}

export const useBreadCrumbStore = create<BreadCrumbStore>((set) => ({
  breadCrumbs: {},
  setBreadCrumbs: (key: string, value: object) =>
    set((state) => ({
      breadCrumbs: { ...state.breadCrumbs, [key]: value },
    })),
}));
