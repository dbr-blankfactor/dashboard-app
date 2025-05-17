export interface Transaction {
  transaction_id: string;
  amount: number;
  type: "Send" | "Deposit" | "Withdrawal";
  status: "Pending" | "Done" | "Approve";
  settled_at: string;
  counterparty: string;
}

export interface TransactionFilters {
  transaction_id?: string;
  counterparty?: string;
  type?: string;
  settled_from?: string;
  settled_to?: string;
}

export interface TransactionSearchPayload {
  account_group: number;
  account_number: string;
  pagination: { limit: number; offset: number };
  sorting: { field: string; sort: "asc" | "desc" }[];
  filters: {
    field: string;
    operator: "eq" | "gte" | "lte";
    value: string;
  }[];
}

export interface TransactionResponse {
  message: string;
  data: Transaction[];
  pagination: { total: number; offset: number; limit: number };
}

export interface UseTransactionHistoryOptions {
  accountNumber: string;
  accountGroup: number;
  filters: TransactionFilters;
  offset: number;
  limit: number;
  token: string;
}
