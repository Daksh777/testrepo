export type NearbyLocation = {
  name: string;
  city: string;
  country: string;
  match: number;
  bng_x: number;
  bng_y: number;
  rank: number;
  nhood_id: number;
  lad24nm: string;
  utla22nm: string;
  rank_score: number;
  ofsPmode: string;
  ofsSmode: string;
};

export type LocationPreferences = {
  preference: Record<string, boolean>;
  country: Record<string, boolean>;
  region: Record<string, boolean>;
  location: Record<string, string>;
};

export interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type Plan = {
  id: number;
  name: string;
  price: number;
  no_of_searches: number;
  no_of_neighborhood_profiles: number;
  additional_report_price: string;
};
