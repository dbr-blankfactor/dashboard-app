import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DepositMap } from "@/components/deposit/deposit-map";
import { Info } from "lucide-react";

export function DepositMapCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Deposit Map</CardTitle>
        <Info className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[240px]">
          <DepositMap />
        </div>
      </CardContent>
    </Card>
  );
}
