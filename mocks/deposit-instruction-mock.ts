import { DepositInstructionsData } from "@/types/deposit-instructions";

export function getMockedDepositInstructions(): DepositInstructionsData {
  const depositInstructions: DepositInstructionsData = {
    message: "Deposit instructions successfully retrieved",
    data: {
      bank_name: "JP Morgan",
      bank_address: "My Address 1123",
      routing_number: "0123123",
      account_number: "00111-1123",
      account_name: "John Doe",
      credit_account: "123123-3213123",
    },
  };

  return {
    message: "Mocked response",
    data: {
      bank_name: depositInstructions.data.bank_name,
      bank_address: depositInstructions.data.bank_address,
      routing_number: depositInstructions.data.routing_number,
      account_number: depositInstructions.data.account_number,
      account_name: depositInstructions.data.account_name,
      credit_account: depositInstructions.data.credit_account,
    },
  };
}
