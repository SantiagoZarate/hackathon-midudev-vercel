export interface Coordinate {
  lat: number;
  lng: number;
}

export type GoToType = Coordinate & { zoom?: number };
