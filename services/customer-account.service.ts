import { CustomeAccounts } from "@/types/customer-account";

interface fetchCustomerAccountProps {
  token: string;
}

export async function fetchCustomerAccount({
  token,
}: fetchCustomerAccountProps): Promise<CustomeAccounts> {
  const baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const amplifyKey: string = process.env.NEXT_PUBLIC_AMPLIFY_KEY!;

  const res: Response = await fetch(`${baseUrl}/customer/accounts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Amplify-Key": amplifyKey,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }

  return res.json();
}
