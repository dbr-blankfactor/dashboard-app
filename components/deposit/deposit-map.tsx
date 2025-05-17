"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const deposits = [
  {
    name: "Wisconsin National Bank, NA",
    city: "Westshire",
    state: "WI",
    id: "#55501",
    balance: "$231,000.12",
    coordinates: [-89.4012, 43.0731],
    value: 100,
  },
  { coordinates: [-122.4194, 37.7749], value: 30 },
  { coordinates: [-74.006, 40.7128], value: 45 },
  { coordinates: [-84.388, 33.749], value: 25 },
  { coordinates: [-87.6298, 41.8781], value: 60 },
  { coordinates: [-95.3698, 29.7604], value: 35 },
  { coordinates: [-80.1918, 25.7617], value: 20 },
  { coordinates: [-118.2437, 34.0522], value: 50 },
  { coordinates: [-104.9903, 39.7392], value: 15 },
  { coordinates: [-93.265, 44.9778], value: 40 },
];

const sizeScale = scaleLinear().domain([0, 100]).range([5, 15]);

const colorScale = scaleLinear<string>()
  .domain([0, 50, 100])
  .range(["#a5f3fc", "#06b6d4", "#0e7490"]);

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export function DepositMap() {
  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{ scale: 800 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#f1f5f9"
              stroke="#cbd5e1"
              strokeWidth={0.5}
            />
          ))
        }
      </Geographies>
      {deposits.map((deposit, index) => (
        <Marker
          key={index}
          coordinates={deposit.coordinates as [number, number]}
        >
          <circle
            r={sizeScale(deposit.value)}
            fill={colorScale(deposit.value)}
            stroke="#fff"
            strokeWidth={1}
            style={{ cursor: "pointer" }}
          />
        </Marker>
      ))}
    </ComposableMap>
  );
}
