export interface AddClothes {
  name: string;
  color: string[];
  season: ("winter" | "spring" | "summer" | "fall")[];
  image?: string;
  brand?: string;
  size: "s" | "m" | "l" | "xl" | "2xl" | "3xl";
}

export type Season = "winter" | "spring" | "fall" | "summer";

export type Size = "s" | "m" | "l" | "xl" | "2xl" | "3xl";
