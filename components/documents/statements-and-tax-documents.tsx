"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatementDocument } from "@/types/document-statement";
import { ChevronDownIcon } from "@/components/ui/custom-icons";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useState } from "react";

const statements: StatementDocument[] = [
  {
    period: "2025-03",
    type: "Monthly Statement",
    account: "*****39180",
  },
  {
    period: "2025-02",
    type: "Monthly Statement",
    account: "*****39180",
  },
  {
    period: "2025-01",
    type: "Monthly Statement",
    account: "*****39180",
  },
  {
    period: "2024-12",
    type: "Annual Tax (1099-INT)",
    account: "*****39180",
  },
  {
    period: "2024-12",
    type: "Monthly Statement",
    account: "*****39180",
  },
  {
    period: "2024-11",
    type: "Monthly Statement",
    account: "*****39180",
  },
  {
    period: "2024-10",
    type: "Monthly Statement",
    account: "*****39180",
  },
  {
    period: "2024-09",
    type: "Monthly Statement",
    account: "*****39180",
  },
  {
    period: "2024-08",
    type: "Monthly Statement",
    account: "*****39180",
  },
  {
    period: "2024-07",
    type: "Monthly Statement",
    account: "*****39180",
  },
  {
    period: "2024-06",
    type: "Monthly Statement",
    account: "*****39180",
  },
  {
    period: "2024-05",
    type: "Monthly Statement",
    account: "*****39180",
  },
];

export function StatementsAndTaxDocuments() {
  const [itemsPerPage, setItemsPerPage] = useState("12");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Statements & Tax Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <StatementsTableHeader />
            <tbody>
              {statements.map((doc, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3">{doc.period}</td>
                  <td className="py-3">{doc.type}</td>
                  <td className="py-3">{doc.account}</td>
                  <td className="py-3">
                    <Button
                      variant="link"
                      className="text-teal-500 h-auto p-0 flex items-center"
                    >
                      <FileText className="mr-1 h-4 w-4" />
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
}

function StatementsTableHeader() {
  return (
    <thead>
      <tr className="border-b text-sm text-gray-500">
        <th className="text-left py-2 font-normal">
          <div className="flex items-center">
            Period
            <ChevronDownIcon className="ml-1 h-3 w-3 text-teal-400" />
          </div>
        </th>
        <th className="text-left py-2 font-normal">
          <div className="flex items-center">
            Type
            <ChevronDownIcon className="ml-1 h-3 w-3 text-teal-400" />
          </div>
        </th>
        <th className="text-left py-2 font-normal">Accounts</th>
        <th className="text-left py-2 font-normal">View</th>
      </tr>
    </thead>
  );
}
