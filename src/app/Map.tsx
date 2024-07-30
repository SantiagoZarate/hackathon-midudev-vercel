"use client";

import { RightArrowMicroIcon } from "@/components/icons/RightArrowMicroIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMap } from "@/hooks/useMap";
import "mapbox-gl/dist/mapbox-gl.css";
import MapBox, { Marker, NavigationControl, Popup } from "react-map-gl";
import { CircleRadius } from "./CircleRadius";
import cities from "../api/cities.json";

interface Props {
  accessToken: string;
  // locations: APIResponse;
}

export function Map({ accessToken }: Props) {
  const {
    location,
    mapref,
    popupInfo,
    viewState,
    circleRadius,
    handleUpdateLocation,
    onChangeCity,
    onCreateRadius,
    setPopupInfo,
    setViewState,
    hotelPins,
    onClearMap,
    placesPins,
    isPending,
  } = useMap();

  return (
    <section className="grid grid-cols-4 gap-4">
      <div className="col-span-3 relative h-96 w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {isPending && (
          <div className="absolute inset-0 bg-black/70 animate-pulse z-50" />
        )}
        <MapBox
          ref={mapref}
          {...viewState}
          onMove={(e) => setViewState(e.viewState)}
          mapboxAccessToken={accessToken}
          dragRotate={false}
          scrollZoom={true}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          // renderWorldCopies={false}
          interactive={true}
          style={{ height: "100%", width: "100%" }}
          onClick={(e) => {
            handleUpdateLocation(e);
          }}
        >
          {circleRadius && <CircleRadius data={circleRadius} />}
          {location && (
            <Marker
              longitude={location.lng}
              latitude={location.lat}
              color="red"
              draggable
            />
          )}
          {placesPins}
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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>America</AccordionTrigger>
          <AccordionContent>
            <section className="grid grid-cols-2 gap-2">
              {cities.america.map((country) => (
                <button
                  onClick={() =>
                    onChangeCity({
                      lat: country.latitud,
                      lng: country.longitud,
                    })
                  }
                  className="group relative rounded-lg h-10 overflow-hidden"
                >
                  <div className="absolute z-10 inset-0 bg-gradient-to-r from-blue-600 to-transparent flex gap-1 items-center px-4">
                    {country.pais}
                    <span className="group-hover:opacity-100 group-hover:translate-x-0 transition opacity-0 -translate-x-2">
                      <RightArrowMicroIcon />
                    </span>
                  </div>
                  <img
                    className="group-hover:scale-[103%] duration-300 transition object-cover w-full h-full"
                    src="./images/france.webp"
                    alt=""
                  />
                </button>
              ))}
            </section>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Europe</AccordionTrigger>
          <AccordionContent>
            <section className="grid grid-cols-2 gap-4">
              {cities.europe.map((country) => (
                <button
                  onClick={() =>
                    onChangeCity({
                      lat: country.latitud,
                      lng: country.longitud,
                    })
                  }
                  className="group relative rounded-lg h-10 overflow-hidden"
                >
                  <div className="absolute z-10 inset-0 bg-gradient-to-r from-blue-600 to-transparent flex gap-1 items-center px-4">
                    {country.pais}
                    <span className="group-hover:opacity-100 group-hover:translate-x-0 transition opacity-0 -translate-x-2">
                      <RightArrowMicroIcon />
                    </span>
                  </div>
                  <img
                    className="group-hover:scale-[103%] duration-300 transition object-cover w-full h-full"
                    src="./images/france.webp"
                    alt=""
                  />
                </button>
              ))}
            </section>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Asia</AccordionTrigger>
          <AccordionContent>
            <section className="grid grid-cols-2 gap-4">
              {cities.asia.map((country) => (
                <button
                  onClick={() =>
                    onChangeCity({
                      lat: country.latitud,
                      lng: country.longitud,
                    })
                  }
                  className="group relative rounded-lg h-10 overflow-hidden"
                >
                  <div className="absolute z-10 inset-0 bg-gradient-to-r from-blue-600 to-transparent flex gap-1 items-center px-4">
                    {country.pais}
                    <span className="group-hover:opacity-100 group-hover:translate-x-0 transition opacity-0 -translate-x-2">
                      <RightArrowMicroIcon />
                    </span>
                  </div>
                  <img
                    className="group-hover:scale-[103%] duration-300 transition object-cover w-full h-full"
                    src="./images/france.webp"
                    alt=""
                  />
                </button>
              ))}
            </section>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* <section className="grid grid-cols-4 gap-1">
        {cities.map((city) => (
          <button
            key={city.ciudad}
            className="border border-neutral-800 rounded-lg text-xs py-1 hover:bg-neutral-800"
            onClick={() =>
              onChangeCity({ lat: city.latitud, lng: city.longitud })
            }
          >
            {city.ciudad}
          </button>
        ))}
      </section> */}
      {/* <button
        className="border border-neutral-800 rounded-lg py-2 disabled:opacity-50"
        onClick={() => onCreateRadius()}
        disabled={location === null || isPending}
      >
        Generate circle radius
      </button>
      <button
        className="border border-neutral-800 rounded-lg py-2"
        onClick={onClearMap}
      >
        clear
      </button> */}
      {/* <AnimatePresence>
        {isPending && (
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0.2 }}
            exit={{ scale: 0 }}
            className="w-full"
          >
            holaaa
          </motion.div>
        )}
      </AnimatePresence> */}
    </section>
  );
}
