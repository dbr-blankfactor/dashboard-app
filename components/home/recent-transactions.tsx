import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

const transactions = [
  {
    id: "vhwj",
    settledTime: "2025-01-04 18:11:40",
    type: "Send",
    counterparty: "Biscayne Trading",
    amount: -1499100.0,
  },
  {
    id: "3hCk",
    settledTime: "2025-01-04 12:44:11",
    type: "Dep",
    counterparty: "Self - JP Morgan",
    amount: 250000.0,
  },
  {
    id: "p001",
    settledTime: "2025-01-03 16:11:78",
    type: "With",
    counterparty: "Self - JP Morgan",
    amount: -1499100.0,
  },
  {
    id: "vh31",
    settledTime: "2025-01-03 02:11:11",
    type: "Recv",
    counterparty: "Clearinghouse",
    amount: 8756.0,
  },
  {
    id: "q551",
    settledTime: "2025-01-02 11:30:32",
    type: "Recv",
    counterparty: "S4 Markets",
    amount: 6001.32,
  },
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Transactions</CardTitle>
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 hover:bg-amber-50"
        >
          <AlertTriangle className="mr-1 h-3 w-3" />
          [3] transactions need approval
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm font-medium">Latest Transactions</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs">
                <th className="pb-2 font-normal text-left">ID</th>
                <th className="pb-2 font-normal text-left">Settled Time</th>
                <th className="pb-2 font-normal text-left">Type</th>
                <th className="pb-2 font-normal text-left">Counterparty</th>
                <th className="pb-2 font-normal text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t">
                  <td className="py-2 text-blue-600">*{tx.id}</td>
                  <td className="py-2">{tx.settledTime.replace(" ", " ")}</td>
                  <td className="py-2">{tx.type}</td>
                  <td className="py-2">{tx.counterparty}</td>
                  <td
                    className={`py-2 text-right ${
                      tx.amount < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {tx.amount < 0 ? "-" : "+"}$
                    {Math.abs(tx.amount).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
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
