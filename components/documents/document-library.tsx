"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LibraryDocument } from "@/types/document-statement";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const libraryDocuments: LibraryDocument[] = [
  { name: "Terms & Conditions", date: "2024-12-31" },
  { name: "Fee Schedule", date: "2024-11-11" },
  { name: "Integration Authorization", date: "2024-10-11" },
  { name: "Wire Disclosure", date: "2024-01-11" },
  { name: "Web & API Terms", date: "2024-01-11" },
];

export function DocumentLibrary() {

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Document Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <LibraryTableHeader />
            <tbody>
              {libraryDocuments.map((doc, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3">{doc.name}</td>
                  <td className="py-3">{doc.date}</td>
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
      </CardContent>
    </Card>
  );
}

function LibraryTableHeader() {
  return (
    <thead>
      <tr className="border-b text-sm text-gray-500">
        <th className="text-left py-2 font-normal">Document Name</th>
        <th className="text-left py-2 font-normal">Version Date</th>
        <th className="text-left py-2 font-normal">View</th>
      </tr>
    </thead>
  );
}
