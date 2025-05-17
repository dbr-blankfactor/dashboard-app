import { ChevronDownIcon } from "@/components/ui/custom-icons";

export function TableHeader() {
  return (
    <thead>
      <tr className="border-b text-sm text-gray-500">
        <th className="text-left py-2 font-normal">
          <div className="flex items-center">
            FI ID
            <ChevronDownIcon className="ml-1 h-3 w-3 text-teal-400" />
          </div>
        </th>
        <th className="text-left py-2 font-normal">
          <div className="flex items-center">
            FI Name
            <ChevronDownIcon className="ml-1 h-3 w-3 text-teal-400" />
          </div>
        </th>
        <th className="text-left py-2 font-normal">HQ City</th>
        <th className="text-left py-2 font-normal">
          <div className="flex items-center">
            HQ State
            <ChevronDownIcon className="ml-1 h-3 w-3 text-teal-400" />
          </div>
        </th>
        <th className="text-left py-2 font-normal">
          <div className="flex items-center">
            Amount
            <ChevronDownIcon className="ml-1 h-3 w-3 text-teal-400" />
          </div>
        </th>
      </tr>
    </thead>
  );
}
