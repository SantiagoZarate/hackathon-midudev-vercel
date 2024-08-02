import { Source, Layer } from "react-map-gl";

interface Props {
  data: {
    circle: any;
    line: any;
  };
}

export function CircleRadius({ data }: Props) {
  return (
    <>
      <Source id="my-data" type="geojson" data={data.circle!}>
        <Layer
          id="point-90-hi"
          type="fill"
          paint={{
            "fill-color": "hsla(0deg,0%,0%,0.4)",
          }}
        />
      </Source>
      <Source id="my-ata" type="geojson" data={data.line}>
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
  );
}
