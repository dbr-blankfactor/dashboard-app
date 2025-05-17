import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/custom-select";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "../ui/custom-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";

export default function TransferAddressBook() {
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Instant Transfer Address Book</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-blue-50 hover:bg-blue-100 text-gray-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <User className="mr-2 h-4 w-4" />
            My Info
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="text-left py-2 font-normal">
                  <div className="flex items-center">
                    Public Id
                    <ChevronDownIcon className="h-4 w-4 ml-1 text-teal-500" />
                  </div>
                </th>
                <th className="text-left py-2 font-normal">
                  <div className="flex items-center">
                    Name
                    <ChevronDownIcon className="h-4 w-4 ml-1 text-teal-500" />
                  </div>
                </th>
                <th className="text-left py-2 font-normal">
                  <div className="flex items-center">
                    Status
                    <ChevronDownIcon className="h-4 w-4 ml-1 text-teal-500" />
                  </div>
                </th>
                <th className="text-right py-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#m3n3trade",
                  name: "M3N3 Trading, LLC",
                  status: "Active",
                },
                {
                  id: "#liquify100",
                  name: "Liquify Protocol, Inc.",
                  status: "Active",
                },
                {
                  id: "#bitdroppp",
                  name: "Bit Drops for Me, Inc.",
                  status: "Active",
                },
                {
                  id: "#hashcoin70v4",
                  name: "HC Development, Corp.",
                  status: "Deleted",
                },
                {
                  id: "#digikey111",
                  name: "Digital Keys, LLP",
                  status: "Active",
                },
                {
                  id: "#firstblockSDR",
                  name: "1st Block Asset Mgmt, LLC",
                  status: "Active",
                },
              ].map((entry, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 text-blue-600">{entry.id}</td>
                  <td className="py-3">{entry.name}</td>
                  <td className="py-3">{entry.status}</td>
                  <td className="py-3 text-right">
                    <Button
                      variant="link"
                      className="text-blue-600 h-auto p-0 mr-4"
                    >
                      Check Status
                    </Button>
                    <Button variant="link" className="text-red-600 h-auto p-0">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center mt-4">
          <div className="flex items-center">
            <Select defaultValue="6">
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
              </SelectContent>
            </Select>
            <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">
              per page
            </span>
          </div>

          <div className="flex items-center justify-center w-5/6 gap-2">
            <Button variant="ghost" size="icon" disabled>
              <ChevronLeftIcon className="h-4 w-4 text-teal-500" />
            </Button>
            <span className="text-sm">Page 1 of 4</span>
            <Button variant="ghost" size="icon">
              <ChevronRightIcon className="h-4 w-4 text-teal-500" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
