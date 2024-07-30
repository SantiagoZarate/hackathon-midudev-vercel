import { MapMouseEvent } from "mapbox-gl";
import { useMemo, useRef, useState } from "react";
import { MapRef, Marker } from "react-map-gl";
import { Location } from "@/types/evento";
import * as turf from "@turf/turf";
import { getHoteles, getPlaces } from "@/api/location";
import { HotelIcon } from "lucide-react";
import { MapPinIcon } from "@/components/icons/MapPinIcon";

interface Coordinate {
  lat: number;
  lng: number;
}

const latCenter = -34.472495652359854;
const lngCenter = -58.68465843536305;

export function useMap() {
  const mapref = useRef<MapRef>(null);
  const [hoteles, setHoteles] = useState<Location[]>([]);
  const [places, setPlaces] = useState<Location[]>([]);
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [viewState, setViewState] = useState({
    latitude: latCenter,
    longitude: lngCenter,
    zoom: 11,
    pitch: 50,
  });
  const [isPending, setIsPending] = useState(false);

  const [circleRadius, setCircleRadius] = useState<{
    circle: any;
    line: any;
  } | null>(null);

  const onChangeCity = ({ lat, lng }: Coordinate) => {
    if (!mapref.current) return;
    mapref.current.flyTo({ center: [lng, lat], zoom: 11, duration: 3000 });
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

    mapref.current.flyTo({
      center: [location.lng, location.lat],
      zoom: 11,
      duration: 3000,
    });

    setIsPending(true);
    getHoteles().then((res) => {
      setHoteles(res);
    });
    getPlaces()
      .then((res) => {
        setPlaces(res);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const handleUpdateLocation = (event: MapMouseEvent) => {
    const { lngLat } = event;
    setLocation({ lat: lngLat.lat, lng: lngLat.lng });
  };

  const onClearMap = () => {
    setLocation(null);
    setHoteles([]);
    setCircleRadius(null);
  };

  const hotelPins = useMemo(
    () =>
      hoteles.map((hotel) => (
        <Marker
          key={`marker-${hotel.nombre}`}
          longitude={hotel.coordenadas.lng}
          latitude={hotel.coordenadas.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(hotel);
          }}
        >
          <HotelIcon />
        </Marker>
      )),
    [hoteles]
  );

  const placesPins = useMemo(
    () =>
      places.map((place) => (
        <Marker
          key={`marker-${place.nombre}`}
          longitude={place.coordenadas.lng}
          latitude={place.coordenadas.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(place);
          }}
        >
          <MapPinIcon />
        </Marker>
      )),
    [places]
  );

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
    hotelPins,
    placesPins,
    onClearMap,
    isPending,
  };
}
