export interface APIResponse {
  zonas_de_interes: Location[];
  hoteles: Location[];
  eventos: BaseLocation[];
}

export interface BaseLocation {
  name: string;
  description: string;
}

export interface Location extends BaseLocation {
  aproximate_distance_in_km: number;
  exact_location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Event extends BaseLocation {
  fecha: string;
}

export interface Country {
  pais: string;
  ciudad: string;
  lat: number;
  lng: number;
  imagen: string;
}
