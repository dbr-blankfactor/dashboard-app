"use client";

import {
  BalanceChartProps,
  BalanceDataPoint,
  NetFlowDataPoint,
} from "@/types/balance-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const balanceData: BalanceDataPoint[] = [
  { month: "Jan", available: 0.3, pending: 0.2, total: 0.5 },
  { month: "Feb", available: 0.5, pending: 0.3, total: 0.8 },
  {
    month: "Mar",
    available: 0.4,
    pending: 0.4,
    total: 0.8,
    highlight: true,
    value: "$956,001",
  },
  { month: "Apr", available: 0.6, pending: 0.3, total: 0.9 },
  { month: "May", available: 0.8, pending: 0.4, total: 1.2 },
  { month: "Jun", available: 1.2, pending: 0.5, total: 1.7 },
];

const netFlowsData: NetFlowDataPoint[] = [
  { month: "Jan", value: 0.2 },
  { month: "Feb", value: 0.4, highlight: true, amount: "$355,101" },
  { month: "Mar", value: -0.1 },
  { month: "Apr", value: 0.1 },
  { month: "May", value: -0.2 },
  { month: "Jun", value: -0.1 },
];

export function BalanceHistory() {
  const [period, setPeriod] = useState("6 MONTHS");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2  w-[665px]">
        <CardTitle className="text-xl">Balance History</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <DropdownButton value={period} onChange={setPeriod} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="available">
          <TabsList className="mb-4">
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="total">Total</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="h-[220px]">
            <BalanceChart data={balanceData} dataKey="available" />
          </TabsContent>

          <TabsContent value="pending" className="h-[220px]">
            <BalanceChart data={balanceData} dataKey="pending" />
          </TabsContent>

          <TabsContent value="total" className="h-[220px]">
            <BalanceChart data={balanceData} dataKey="total" />
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-4">Net Flows</h3>
          <div className="h-[150px]">
            <NetFlowsChart data={netFlowsData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BalanceChart({ data, dataKey }: BalanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis
          tickFormatter={(value) => `$${value}M`}
          axisLine={false}
          tickLine={false}
          domain={[0, "auto"]}
        />
        <Tooltip
          formatter={(value: number) => [
            `$${(value * 1000000).toLocaleString()}`,
            "",
          ]}
          labelFormatter={(label) => `${label}`}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#16a34a"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
        {data.map((entry, index) =>
          entry.highlight ? (
            <ReferenceDot
              key={index}
              x={index}
              y={entry[dataKey] as number}
              r={6}
              fill="#fff"
              stroke="#16a34a"
              strokeWidth={2}
            />
          ) : null
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

function NetFlowsChart({ data }: { data: NetFlowDataPoint[] }) {
  const maxValue = Math.max(...data.map((item) => Math.abs(item.value)));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis
          tickFormatter={(value) => `$${value}M`}
          axisLine={false}
          tickLine={false}
          domain={[-maxValue, maxValue]}
        />
        <Tooltip
          formatter={(value: number) => [
            `$${(value * 1000000).toLocaleString()}`,
            "",
          ]}
          labelFormatter={(label) => `${label}`}
        />
        {data.map((entry, index) => (
          <CartesianGrid
            key={`grid-${index}`}
            x={0}
            y={0}
            width={1000}
            height={100}
            strokeDasharray="3 3"
          />
        ))}
        {data.map((entry, index) => (
          <rect
            key={`bar-${index}`}
            x={(index / data.length) * 100 + 9 + "%"}
            y={48}
            width="5%"
            height={65}
            fill={entry.value > 0 ? "#16a34a" : "#ef4444"}
            fillOpacity={0.7}
            rx={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function DropdownButton({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {value}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange("1 MONTH")}>
          1 MONTH
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("3 MONTHS")}>
          3 MONTHS
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("6 MONTHS")}>
          6 MONTHS
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("1 YEAR")}>
          1 YEAR
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
