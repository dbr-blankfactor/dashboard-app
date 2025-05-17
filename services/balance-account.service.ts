import { getMockedBalance } from "@/mocks/balance-account-mock";
import { AccountBalance, BalancePayload } from "@/types/accounts-balance";

interface fetchCustomerAccountProps {
  token: string;
  payload: BalancePayload;
}

const USE_MOCK: boolean = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export async function fetchBalanceAccount({
  token,
  payload,
}: fetchCustomerAccountProps): Promise<AccountBalance> {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 500));
    return getMockedBalance(payload);
  }

  const baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const amplifyKey: string = process.env.NEXT_PUBLIC_AMPLIFY_KEY!;

  const res: Response = await fetch(`${baseUrl}/customer/accounts/balance`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Amplify-Key": amplifyKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }

  return res.json();
}
