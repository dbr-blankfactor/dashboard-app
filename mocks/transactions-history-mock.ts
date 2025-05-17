import {
  Transaction,
  TransactionResponse,
  TransactionSearchPayload,
} from "@/types/transaction-history";

export function getMockedTransactions(
  payload: TransactionSearchPayload
): TransactionResponse {
  const total: number = 48;
  const start: number = payload.pagination.offset;
  const end: number = start + payload.pagination.limit;

  const mockData: Transaction[] = Array.from({ length: total }, (_, i) => ({
    transaction_id: `*mock${i}`,
    amount: i % 2 === 0 ? -1499100 : 250000,
    type: ["Send", "Deposit", "Withdrawal"][i % 3] as Transaction["type"],
    status: ["Pending", "Done", "Approve"][i % 3] as Transaction["status"],
    settled_at: `2025-01-${String((i % 28) + 1).padStart(2, "0")}T12:00:00Z`,
    counterparty: i % 2 === 0 ? "Self - JP Morgan" : "Biscayne Trading",
  }));

  return {
    message: "Mocked response",
    data: mockData.slice(start, end),
    pagination: {
      total,
      offset: payload.pagination.offset,
      limit: payload.pagination.limit,
    },
  };
}
