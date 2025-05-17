export interface AccountBalance {
  message: string;
  data: DataBalance;
}

export interface DataBalance {
  account_number: string;
  available_balance: Balance;
  pending_balance: Balance;
  total_balance: Balance;
}

export interface Balance {
  amount: number;
  currency: string;
}

export interface BalancePayload {
  account_group: number;
  account_number: string;
}
