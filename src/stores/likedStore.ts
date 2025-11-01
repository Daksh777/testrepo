import { create } from "zustand";

interface LikedStore {
  likedLocations: Record<string, boolean>;
  addLikedLocation: (nhood_id: string | number) => void;
  removeLikedLocation: (nhood_id: string | number) => void;
}

export const useLikedStore = create<LikedStore>((set) => ({
  likedLocations: {},

  addLikedLocation: (nhood_id: string | number) => {
    set((state) => ({
      likedLocations: { ...state.likedLocations, [nhood_id]: true },
    }));
  },

  removeLikedLocation: (nhood_id: string | number) => {
    set((state) => ({
      likedLocations: { ...state.likedLocations, [nhood_id]: false },
    }));
  },
}));
