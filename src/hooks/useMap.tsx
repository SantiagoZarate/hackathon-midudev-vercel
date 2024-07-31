import { MapMouseEvent } from "mapbox-gl";
import { useMemo, useRef, useState } from "react";
import { MapRef, Marker } from "react-map-gl";
import { Event, Location } from "@/types/evento";
import * as turf from "@turf/turf";
import { getEvents, getHoteles, getPlaces } from "@/api/location";
import { HotelIcon } from "lucide-react";
import { MapPinIcon } from "@/components/icons/MapPinIcon";
import { Coordinate, GoToType } from "../types/coordinate";

const latCenter = -34.472495652359854;
const lngCenter = -58.68465843536305;

export function useMap() {
  const mapref = useRef<MapRef>(null);
  const [hoteles, setHoteles] = useState<Location[]>([]);
  const [places, setPlaces] = useState<Location[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
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

    setIsPending(true);
    getHoteles().then((res) => {
      setHoteles(res);
    });
    getEvents().then((res) => {
      setEvents(res);
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
    setPlaces([]);
    setEvents([]);
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

  const goTo = ({ lat, lng, zoom = 11 }: GoToType) => {
    if (!mapref.current) return;

    mapref.current.flyTo({
      center: [lng, lat],
      zoom,
      duration: 3000,
    });
  };

  const removePlace = (name: string) => {
    setPlaces((prevState) => prevState.filter((p) => p.nombre !== name));
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
    hotelPins,
    placesPins,
    onClearMap,
    isPending,
    hoteles,
    places,
    events,
    removePlace,
    goTo,
  };
}
