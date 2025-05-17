"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExclusionData } from "@/types/deposit-positions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Plus } from "lucide-react";
import { useState } from "react";

const exclusions: ExclusionData[] = [
  {
    id: "3555",
    name: "Silverside Banks",
    date: "2024-12-31",
  },
  {
    id: "1433",
    name: "Fresh Ink Bank",
    date: "2024-11-11",
  },
  {
    id: "99910",
    name: "CUBED Bank",
    date: "2024-10-11",
  },
  {
    id: "4131",
    name: "Fourth First Bank",
    date: "2024-01-11",
  },
];

export function FinancialInstitutionExclusions() {
  const [institutionId, setInstitutionId] = useState("");

  const handleAddExclusion = () => {
    setInstitutionId("");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">
          Financial Institution Exclusions
        </CardTitle>
        <Info className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ExclusionForm
            institutionId={institutionId}
            onInstitutionIdChange={setInstitutionId}
            onAddExclusion={handleAddExclusion}
          />

          <ExclusionsList exclusions={exclusions} />
        </div>
      </CardContent>
    </Card>
  );
}

interface ExclusionFormProps {
  institutionId: string;
  onInstitutionIdChange: (value: string) => void;
  onAddExclusion: () => void;
}

function ExclusionForm({
  institutionId,
  onInstitutionIdChange,
  onAddExclusion,
}: ExclusionFormProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1">
        <Input
          placeholder="Enter Financial Institution ID"
          value={institutionId}
          onChange={(e) => onInstitutionIdChange(e.target.value)}
        />
      </div>
      <Button
        className="bg-teal-500 hover:bg-teal-600"
        onClick={onAddExclusion}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Exclusion
      </Button>
    </div>
  );
}

interface ExclusionsListProps {
  exclusions: ExclusionData[];
}

function ExclusionsList({ exclusions }: ExclusionsListProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">
        Existing Requested Exclusions
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th className="text-left py-2 font-normal">FI ID</th>
              <th className="text-left py-2 font-normal">FI Name</th>
              <th className="text-left py-2 font-normal">Date Added</th>
              <th className="text-right py-2 font-normal">Edit</th>
            </tr>
          </thead>
          <tbody>
            {exclusions.map((exclusion, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{exclusion.id}</td>
                <td className="py-3">{exclusion.name}</td>
                <td className="py-3">{exclusion.date}</td>
                <td className="py-3 text-right">
                  <Button
                    variant="link"
                    className="text-red-600 h-auto p-0"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
