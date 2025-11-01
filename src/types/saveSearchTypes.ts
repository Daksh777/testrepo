import { UserPreferences } from "./preferencesType";
import { NearbyLocation } from "./types";

export interface SavedSearch {
  id: string;
  user: string;
  name: string;
  search_parameters: UserPreferences;
  search_results: NearbyLocation[];
  created_at: string;
  updated_at: string;
}

export interface SavedSearchListRes {
  count: number;
  next: null | number;
  previous: null | number;
  results: SavedSearch[];
}

export interface CreateSavedSearchPayload {
  name: string;
  search_parameters: UserPreferences;
  search_results: NearbyLocation[];
}

export interface RenameSavedSearchPayload {
  name: string;
}

export interface RenamePayload {
  id: string;
  payload: RenameSavedSearchPayload;
}