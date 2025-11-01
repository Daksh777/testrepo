export type PreferencesMetData = {
  abode: string;
  amenity_community: number;
  amenity_foodbev: number;
  background_noise: number;
  culture_entertain: number;
  flood_safety: number;
  green_spaces: number;
  hpi4: number;
  nearby_nature: number;
  rail_London_service: number;
  rail_general_service: number;
  rent4: number;
  school_quality: number;
  street_safety: number;
  walk_bike: number;
  water_quality: number;
};

type Weights = {
  street_safety: number;
  flood_safety: number;
  rail_London_service: number;
  rail_general_service: number;
  amenity_community: number;
  amenity_foodbev: number;
  green_spaces: number;
  nearby_nature: number;
  culture_entertain: number;
  background_noise: number;
  walk_bike: number;
};

type Filters = {
  hpi4_min: number;
  hpi4_max: number;
  rent4_min: number;
  rent4_max: number;
};

type GeographicFilters = {
  country?: string;
  region?: string;
  preference?: string;
};

export type UserPreferences = {
  weights: Weights;
  filters: Filters;
  geographic_filters: GeographicFilters;
};
