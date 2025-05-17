export interface DepositInstructionsData {
  message: string;
  data: DataDepositInstructions;
}

export interface DataDepositInstructions {
  bank_name: string;
  bank_address: string;
  routing_number: string;
  account_number: string;
  account_name: string;
  credit_account: string;
}

export interface DepositInstructionsPayload {
  account_group: number;
  account_number: string;
}
