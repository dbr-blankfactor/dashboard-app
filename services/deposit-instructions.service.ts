import { getMockedDepositInstructions } from "@/mocks/deposit-instruction-mock";
import {
  DepositInstructionsData,
  DepositInstructionsPayload,
} from "@/types/deposit-instructions";

const USE_MOCK: boolean = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export async function fetchDepositInstructions(
  payload: DepositInstructionsPayload,
  token: string
): Promise<DepositInstructionsData> {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 500));
    return getMockedDepositInstructions();
  }
  const baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const amplifyKey: string = process.env.NEXT_PUBLIC_AMPLIFY_KEY!;

  const res: Response = await fetch(
    `${baseUrl}/customer/accounts/deposit-instructions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Amplify-Key": amplifyKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }

  return res.json();
}
