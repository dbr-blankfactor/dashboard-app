import {
  TransactionResponse,
  TransactionSearchPayload,
} from "@/types/transaction-history";
import { TransactionHistoryRoutes } from "@/api/routes/transaction-history";
import { getMockedTransactions } from "@/mocks/transactions-history-mock";

const USE_MOCK: boolean = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export async function fetchTransactions(
  payload: TransactionSearchPayload,
  token: string
): Promise<TransactionResponse> {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 500));
    return getMockedTransactions(payload);
  }

  const baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const amplifyKey: string = process.env.NEXT_PUBLIC_AMPLIFY_KEY!;
  const transactionHistory: string = TransactionHistoryRoutes.search;

  const res: Response = await fetch(`${baseUrl}${transactionHistory}`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "X-Amplify-Key": amplifyKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text: string = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }

  return res.json();
}
