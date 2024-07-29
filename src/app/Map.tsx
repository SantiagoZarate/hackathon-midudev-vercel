"use client";

import { HotelIcon } from "@/components/icons/HotelIcon";
import { MapPinIcon } from "@/components/icons/MapPinIcon";
import { APIResponse, Location } from "@/types/evento";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo, useRef, useState } from "react";
import MapBox, {
  Layer,
  MapMouseEvent,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from "react-map-gl";
import cities from "../api/cities.json";

interface Props {
  accessToken: string;
  locations: APIResponse;
}

interface Coordinate {
  lat: number;
  lng: number;
}

const latCenter = -34.472495652359854;
const lngCenter = -58.68465843536305;

export function Map({ accessToken, locations }: Props) {
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
    if (!mapref.current) return;
    mapref.current.flyTo({ center: [lng, lat], zoom: 11, duration: 3000 });
    setLocation({ lat, lng });
  };

  const onCreateRadius = () => {
    if (!location || !mapref.current) return;

    const radius = 5;
    const center = [location.lng, location.lat];
    const options = {
      steps: 80,
      units: undefined,
      properties: { foo: "bar" },
    };

    var circle = turf.circle(center, radius, options);

    setCircleRadius({
      circle,
      line: turf.lineString(circle.geometry.coordinates.flat()),
    });

    mapref.current.flyTo({
      center: [location.lng, location.lat],
      zoom: 11,
      duration: 3000,
    });
  };

  const handleUpdateLocation = (event: MapMouseEvent) => {
    const { lngLat } = event;
    setLocation({ lat: lngLat.lat, lng: lngLat.lng });
  };

  const hotelPins = useMemo(
    () =>
      locations.hoteles.map((hotel) => (
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
    []
  );

  const zonePins = useMemo(
    () =>
      locations.zonas_de_interes.map((zona) => (
        <Marker
          key={`marker-${zona.nombre}`}
          longitude={zona.coordenadas.lng}
          latitude={zona.coordenadas.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(zona);
          }}
        >
          <MapPinIcon />
        </Marker>
      )),
    []
  );

  return (
    <>
      <div className="h-96 w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <MapBox
          ref={mapref}
          {...viewState}
          onMove={(e) => setViewState(e.viewState)}
          mapboxAccessToken={accessToken}
          dragRotate={false}
          scrollZoom={true}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          renderWorldCopies={false}
          interactive={true}
          style={{ height: "100%", width: "100%" }}
          onClick={(e) => {
            handleUpdateLocation(e);
          }}
        >
          {circleRadius && (
            <>
              <Source id="my-data" type="geojson" data={circleRadius.circle!}>
                <Layer
                  id="point-90-hi"
                  type="fill"
                  paint={{
                    "fill-color": "hsla(0deg,0%,0%,0.4)",
                  }}
                />
              </Source>
              <Source id="my-ata" type="geojson" data={circleRadius.line}>
                <Layer
                  id="point-9-hi"
                  type="line"
                  paint={{
                    "line-color": "hsl(0deg,0%,80%)",
                    "line-width": 1,
                    "line-dasharray": [8, 8],
                  }}
                />
              </Source>
            </>
          )}
          {location && (
            <Marker
              longitude={location.lng}
              latitude={location.lat}
              color="red"
              draggable
            />
          )}
          {zonePins}
          {hotelPins}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={popupInfo.coordenadas.lng}
              latitude={popupInfo.coordenadas.lat}
              onClose={() => setPopupInfo(null)}
              className="flex flex-col gap-2 text-neutral-900"
            >
              <p className="font-bold">{popupInfo.nombre}</p>
              <p className="text-xs">{popupInfo.descripcion}</p>
            </Popup>
          )}
          <NavigationControl />
        </MapBox>
      </div>
      <section className="grid grid-cols-4 gap-1">
        {cities.map((city) => (
          <button
            className="border border-neutral-800 rounded-lg text-xs py-1 hover:bg-neutral-800"
            onClick={() =>
              onChangeCity({ lat: city.latitud, lng: city.longitud })
            }
          >
            {city.ciudad}
          </button>
        ))}
      </section>
      <button
        className="border border-neutral-800 rounded-lg py-2"
        onClick={() => {}}
      >
        click
      </button>
      <button
        className="border border-neutral-800 rounded-lg py-2 disabled:opacity-50"
        onClick={() => onCreateRadius()}
        disabled={location === null}
      >
        Generate circle radius
      </button>
    </>
  );
}
