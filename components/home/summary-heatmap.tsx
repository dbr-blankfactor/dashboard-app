"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

const heatmapData = [
  { date: "2025-01-04", activity: [1, 0, 0, 2, 0, 1, 0] },
  { date: "2025-01-03", activity: [2, 0, 1, 0, 0, 0, 1] },
  { date: "2025-01-02", activity: [0, 1, 2, 0, 1, 0, 0] },
  { date: "2025-01-01", activity: [0, 0, 1, 2, 0, 1, 0] },
  { date: "2024-12-31", activity: [1, 2, 0, 0, 1, 0, 0] },
  { date: "2024-12-30", activity: [0, 1, 0, 2, 0, 0, 1] },
  { date: "2024-12-29", activity: [2, 0, 1, 0, 1, 0, 0] },
  { date: "2024-12-28", activity: [0, 2, 1, 0, 0, 1, 0] },
  { date: "2024-12-27", activity: [1, 0, 0, 2, 0, 0, 1] },
  { date: "2024-12-26", activity: [0, 1, 2, 0, 1, 0, 0] },
];

const tooltipData = {
  id: "38vucy983jv0-223jkc",
  time: "2024-12-31 02:24:24",
  type: "Instant Receive",
  party: "BitLock Trading",
  amount: "+$3,444,016.27",
};

export function SummaryHeatmap() {
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Summary Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-x-1 gap-y-1">
          {/* Primera fila vacía para alinear con las fechas */}
          <div className="col-span-8"></div>

          {heatmapData.map((day, rowIndex) => (
            <React.Fragment key={day.date}>
              <div className="text-xs text-gray-500 pr-2">{day.date}</div>
              {day.activity.map((value, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="aspect-square rounded-sm cursor-pointer"
                  style={{
                    backgroundColor:
                      value === 0
                        ? "#f1f5f9"
                        : value === 1
                        ? "#a5f3fc"
                        : value === 2
                        ? "#06b6d4"
                        : "#0e7490",
                    width: "24px",
                    height: "24px",
                  }}
                  onClick={() =>
                    setSelectedCell({ row: rowIndex, col: colIndex })
                  }
                />
              ))}
            </React.Fragment>
          ))}
        </div>

        {selectedCell && (
          <div className="mt-4 bg-gray-900 text-white p-3 rounded-md text-sm">
            <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
              <div className="text-gray-400">ID</div>
              <div>{tooltipData.id}</div>

              <div className="text-gray-400">TIME</div>
              <div>{tooltipData.time}</div>

              <div className="text-gray-400">TYPE</div>
              <div>{tooltipData.type}</div>

              <div className="text-gray-400">PARTY</div>
              <div>{tooltipData.party}</div>

              <div className="text-gray-400">AMT</div>
              <div className="text-green-400">{tooltipData.amount}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
