import TransferAddressBook from "@/components/transactions/transfer-address-book";
import DepositInstructions from "@/components/transactions/deposit-instructions";
import TransactionHistory from "@/components/transactions/transaction-history";
import RequestWithdrawal from "@/components/transactions/request-withdrawal";
import SendInstantTransfer from "@/components/transactions/send-instant-transfer";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionHistory />
          <TransferAddressBook />
        </div>
        <div className="space-y-6">
          <SendInstantTransfer />
          <DepositInstructions />
          <RequestWithdrawal />
        </div>
      </div>
    </div>
  );
}
