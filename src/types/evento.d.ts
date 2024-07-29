export interface APIResponse {
  zonas_de_interes: Location[];
  hoteles: Location[];
  eventos: BaseLocation[];
}

export interface BaseLocation {
  nombre: string;
  descripcion: string;
}

export interface Location extends BaseLocation {
  distancia_aproximada_en_km: number;
  ubicacion_exacta: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
}
