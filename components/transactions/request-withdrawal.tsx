import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Info, Lock, Receipt } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function RequestWithdrawal() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 mb-5">
        <CardTitle className="text-xl">Request a Withdrawal</CardTitle>
        <Info className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-[120px_1fr] items-center gap-2">
            <div className="text-sm text-gray-500">Source Account</div>
            <div className="relative">
              <Input value="Operating - ****9180" readOnly className="pr-10" />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="text-sm text-gray-500">External Account</div>
            <div className="relative">
              <Input value="JPMorgan - **1049i" readOnly className="pr-10" />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="text-sm text-gray-500">Amount</div>
            <Input placeholder="$354,650.00" />

            <div className="text-sm text-gray-500">Date</div>
            <div className="relative">
              <Input placeholder="__/__/____" />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div></div>
            <Button className="w-full bg-teal-500 hover:bg-teal-600">
              <Receipt className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
