import { Location } from "@/types/evento";
import * as turf from "@turf/turf";
import { MapMouseEvent } from "mapbox-gl";
import { useRef, useState } from "react";
import { MapRef } from "react-map-gl";
import { Coordinate, GoToType } from "../types/coordinate";

const latCenter = -34.472495652359854;
const lngCenter = -58.68465843536305;

export function useMap() {
  const mapref = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [viewState, setViewState] = useState({
    latitude: latCenter,
    longitude: lngCenter,
    zoom: 11,
    pitch: 50,
  });
  const [circleRadius, setCircleRadius] = useState<{
    circle: any;
    line: any;
  } | null>(null);

  const onChangeCity = ({ lat, lng }: Coordinate) => {
    goTo({ lat, lng });
    setLocation({ lat, lng });
  };

  const onCreateRadius = async () => {
    if (!location || !mapref.current) return;

    const radius = 10;
    const center = [location.lng, location.lat];

    var circle = turf.circle(center, radius, {
      steps: 80,
      units: "kilometers",
    });

    setCircleRadius({
      circle,
      line: turf.lineString(circle.geometry.coordinates.flat()),
    });

    goTo({ lat: location.lat, lng: location.lng });
  };

  const handleUpdateLocation = (event: MapMouseEvent) => {
    const { lngLat } = event;
    setLocation({ lat: lngLat.lat, lng: lngLat.lng });
  };

  const onClearMap = () => {
    setLocation(null);
    setCircleRadius(null);
  };

  const goTo = ({ lat, lng, zoom = 11 }: GoToType) => {
    if (!mapref.current) return;

    mapref.current.flyTo({
      center: [lng, lat],
      zoom,
      duration: 3000,
    });
  };

  const onUpdatePopupInfo = (data: Location) => {
    setPopupInfo(data);
  };

  return {
    mapref,
    popupInfo,
    location,
    viewState,
    handleUpdateLocation,
    onChangeCity,
    onCreateRadius,
    circleRadius,
    setViewState,
    setPopupInfo,
    onClearMap,
    goTo,
    onUpdatePopupInfo,
  };
}
