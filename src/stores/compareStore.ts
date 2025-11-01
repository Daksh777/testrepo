import { NearbyLocation } from "@/types/types";
import { create } from "zustand";

interface CompareStore {
  selectedLocations: NearbyLocation[];
  addLocation: (location: NearbyLocation) => void;
  removeLocation: (location: NearbyLocation) => void;
  resetLocations: () => void;
}

const useCompareStore = create<CompareStore>((set) => ({
  selectedLocations: [],
  addLocation: (location) =>
    set((state) => ({
      selectedLocations: [...state.selectedLocations, location],
    })),
  removeLocation: (location) =>
    set((state) => ({
      selectedLocations: state.selectedLocations.filter(
        (loc) => JSON.stringify(loc) !== JSON.stringify(location)
      ),
    })),
  resetLocations: () => set({ selectedLocations: [] }),
}));

export default useCompareStore;
