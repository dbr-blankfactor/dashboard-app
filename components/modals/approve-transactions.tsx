import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModalProps } from "@/types/modal-types";
import { AlertTriangle, X } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ApproveTransactions({ isOpen, onClose }: ModalProps) {
  const transactionsModal = [
    {
      id: "vhwj",
      CreatedBy: "Self - JP Morgan",
      lastTime: "2025-01-04 18:11:40",
      type: "Send",
      status: "Click to approve",
      counterparty: "Biscayne Trading",
      amount: -1499100.0,
    },
    {
      id: "3hCk",
      CreatedBy: "Pathfinder",
      lastTime: "2025-01-04 12:44:11",
      type: "Dep",
      status: "Needs approval",
      counterparty: "Self - JP Morgan",
      amount: 250000.0,
    },
    {
      id: "p001",
      CreatedBy: "Patrick",
      lastTime: "2025-01-03 16:11:78",
      type: "Withdrawal",
      status: "approved",
      counterparty: "Self - JP Morgan",
      amount: -1499100.0,
    },
    {
      id: "vh31",
      CreatedBy: "Clearinghouse",
      lastTime: "2025-01-03 02:11:11",
      type: "Withdrawal",
      status: "approved",
      counterparty: "Clearinghouse",
      amount: 8756.0,
    },
    {
      id: "q551",
      CreatedBy: "S4 Markets",
      lastTime: "2025-01-02 11:30:32",
      type: "Withdrawal",
      status: "approved",
      counterparty: "S4 Markets",
      amount: 6001.32,
    },
  ];
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[1040px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Approve Transactions
            </DialogTitle>
            <button
              onClick={onClose}
              className=" flex items-center justify-center w-[30px] h-[30px] bg-[#92C8C68C] rounded-[6px]"
            >
              <X className="w-[24px] h-[24px] text-[#2D807C]" />
            </button>
          </div>
        </DialogHeader>
        <div className="p-6 pt-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                The following transactions are pending approval from a secondary
                source. Once a transaction is approved, it will be processed as
                soon as possible.
              </p>

              <div>
                <p className="text-sm font-medium mb-1">Important Notes:</p>
                <p className="text-sm text-gray-700">
                  If you were the originator of the transaction, and it requires
                  dual authorization you will notice the Approve action is
                  inactive. Please request another person at your organization,
                  who has the necessary priviledges, to approve your
                  transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
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
                  {transactionsModal.map((tx) => (
                    <tr key={tx.id} className="border-t">
                      <td className="py-2 text-blue-600">*{tx.id}</td>
                      <td className="py-2">{tx.CreatedBy}</td>
                      <td className="py-2">{tx.lastTime.replace(" ", " ")}</td>
                      <td className="py-2">{tx.type}</td>
                      <td
                        className={`py-2 ${
                          tx.status === "approved"
                            ? "text-[#92C8C6]"
                            : "text-red-600"
                        }`}
                      >
                        {tx.status}
                      </td>
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
      </DialogContent>
    </Dialog>
  );
}
