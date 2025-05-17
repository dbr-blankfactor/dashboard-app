export interface CustomeAccounts {
  message: string;
  data: AccountData[];
}

export interface AccountData {
  account_number: string;
  account_group: number;
  is_with_fed: null;
  is_with_nra: null;
  is_with_state: null;
  unmodified_positions: null;
  modified_positions: null;
}
