"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scaleLinear } from "d3-scale";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

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
  const [selectedDeposit, setSelectedDeposit] = React.useState(deposits[0]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Deposit Map</CardTitle>
        <div className="text-lg text-gray-500">
          Positions reallocated: 2025-01-04
        </div>
      </CardHeader>
      <CardContent className="relative p-0">
        <div className="flex items-center">
          <div className="w-[calc(100%-260px)] h-[500px]">
            <ComposableMap
              projection="geoAlbersUsa"
              projectionConfig={{ scale: 1000 }}
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
                  onClick={() => setSelectedDeposit(deposit)}
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
          </div>

          <div className="w-[260px] p-4 text-end mr-3">
            <div className="text-xs text-gray-500">FI NAME</div>
            <div className="font-medium">
              {selectedDeposit.name || "Wisconsin National Bank, NA"}
            </div>

            <div className="mt-2 text-xs text-gray-500">FI HQ CITY, ST</div>
            <div className="font-medium">
              {selectedDeposit.city || "Westshire"},{" "}
              {selectedDeposit.state || "WI"}
            </div>

            <div className="mt-2 text-xs text-gray-500">FI REG ID</div>
            <div className="font-medium">{selectedDeposit.id || "#55501"}</div>

            <div className="mt-2 text-xs text-gray-500">BALANCE</div>
            <div className="font-medium">
              {selectedDeposit.balance || "$231,000.12"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
