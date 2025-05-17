"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DepositPositionData } from "@/types/deposit-positions";
import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "../ui/pagination";
import { Input } from "@/components/ui/input";
import { TableHeader } from "./table-header";
import { useState } from "react";

const depositPositions: DepositPositionData[] = [
  {
    id: "4441",
    name: "Regulator Bank",
    city: "Rowayton",
    state: "CT",
    amount: 245000,
  },
  {
    id: "456",
    name: "Crosby Bank",
    city: "Jasper Hills",
    state: "NY",
    amount: 200000,
  },
  {
    id: "91811",
    name: "Valhalla Bank",
    city: "Berkshire Township",
    state: "MA",
    amount: 55000,
  },
  {
    id: "31571",
    name: "Scout Bank",
    city: "Washington",
    state: "NJ",
    amount: 65000,
  },
  {
    id: "98174",
    name: "East Cape Bank",
    city: "Wellington",
    state: "FL",
    amount: 150000,
  },
  {
    id: "312",
    name: "Hells Bay Credit Union",
    city: "Beaver City",
    state: "OR",
    amount: 90000,
  },
  {
    id: "1338",
    name: "Everglades Bank",
    city: "Bulldog Way",
    state: "GA",
    amount: 100000,
  },
  {
    id: "8878",
    name: "Sea Hunter Bank",
    city: "Bluffton",
    state: "SC",
    amount: 222000,
  },
  {
    id: "2212",
    name: "Ocean Bank",
    city: "Hatteras",
    state: "NC",
    amount: 100000,
  },
  {
    id: "66715",
    name: "Viking Bank",
    city: "Surfside",
    state: "FL",
    amount: 50000,
  },
  {
    id: "3331",
    name: "SeaVee Bank",
    city: "Laguna Beach",
    state: "CA",
    amount: 150000,
  },
  {
    id: "7777",
    name: "Front Runner Bank",
    city: "Berens",
    state: "WI",
    amount: 100000,
  },
  {
    id: "456",
    name: "Crosby Bank",
    city: "Jasper Hills",
    state: "NY",
    amount: 200000,
  },
  {
    id: "91811",
    name: "Valhalla Bank",
    city: "Berkshire Township",
    state: "MA",
    amount: 55000,
  },
  {
    id: "31571",
    name: "Scout Bank",
    city: "Washington",
    state: "NJ",
    amount: 65000,
  },
  {
    id: "98174",
    name: "East Cape Bank",
    city: "Wellington",
    state: "FL",
    amount: 150000,
  },
  {
    id: "312",
    name: "Hells Bay Credit Union",
    city: "Beaver City",
    state: "OR",
    amount: 90000,
  },
  {
    id: "1338",
    name: "Everglades Bank",
    city: "Bulldog Way",
    state: "GA",
    amount: 100000,
  },
];

export function DepositPositionsTable() {
  const [itemsPerPage, setItemsPerPage] = useState("18");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Deposit Positions</CardTitle>
        <Button variant="outline" size="sm" className="h-8">
          <Download className="mr-2 h-4 w-4" />
          CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <DateSelector />
          <div className="text-sm text-gray-500">
            Deposit position updates are posted once per business day as of
            16:00 ET
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {depositPositions.map((bank, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3">{bank.id}</td>
                  <td className="py-3">{bank.name}</td>
                  <td className="py-3">{bank.city}</td>
                  <td className="py-3">{bank.state}</td>
                  <td className="py-3">${bank.amount.toLocaleString()}.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          currentPage={1}
          totalPages={10}
        />
      </CardContent>
    </Card>
  );
}

function DateSelector() {
  return (
    <div className="relative">
      <Input placeholder="__/__/____" className="w-[120px] pl-3 pr-10" />
      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  );
}
