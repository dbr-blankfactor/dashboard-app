import { AccountBalance, BalancePayload } from "@/types/accounts-balance";

export function getMockedBalance(payload: BalancePayload): AccountBalance {
  const { account_number } = payload;

  const balancesByAccountNumber: Record<string, AccountBalance> = {
    CxXbc1Pk10: {
      message: "Balance successfully retrieved",
      data: {
        account_number: "CxXbc1Pk10",
        available_balance: {
          amount: 1500,
          currency: "USD",
        },
        pending_balance: {
          amount: 500,
          currency: "USD",
        },
        total_balance: {
          amount: 1000,
          currency: "USD",
        },
      },
    },
    pLozi1876X: {
      message: "Balance successfully retrieved",
      data: {
        account_number: "pLozi1876X",
        available_balance: {
          amount: 2500,
          currency: "USD",
        },
        pending_balance: {
          amount: 500,
          currency: "USD",
        },
        total_balance: {
          amount: 2000,
          currency: "USD",
        },
      },
    },
    "1phxjakI91": {
      message: "Balance successfully retrieved",
      data: {
        account_number: "1phxjakI91",
        available_balance: {
          amount: 1200000.13,
          currency: "USD",
        },
        pending_balance: {
          amount: 150000.87,
          currency: "USD",
        },
        total_balance: {
          amount: 1350001.0,
          currency: "USD",
        },
      },
    },
  };

  const balance = balancesByAccountNumber[account_number];

  if (!balance) {
    throw new Error(`Mocked balance not found for account: ${account_number}`);
  }

  return {
    message :"Mocked response",
    data: {
        account_number: balance.data.account_number,
        available_balance: balance.data.available_balance,
        pending_balance: balance.data.pending_balance,
        total_balance: balance.data.total_balance
    }
  }
}
