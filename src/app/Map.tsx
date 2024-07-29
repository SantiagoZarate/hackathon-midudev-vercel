"use client";

import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";

interface Props {
  accessToken: string;
}

export function Map({ accessToken }: Props) {
  const Map = ReactMapboxGl({
    accessToken,
    interactive: false,
    renderWorldCopies: false,
    logoPosition: "top-left",
  });
  const zoom = [8];

  return (
    <div className="h-96 w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
      <Map
        className="w-full h-full"
        style="mapbox://styles/mapbox/streets-v8"
        zoom={[8]}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
    </div>
  );
}
