"use client";

import { fetchCustomerAccount } from "@/services/customer-account.service";
import { fetchBalanceAccount } from "@/services/balance-account.service";
import { customerAccounts } from "@/mocks/customer-accounts-mock";
import { getMockedBalance } from "@/mocks/balance-account-mock";
import { maskAccountFixed } from "@/utils/mask-account-number";
import { formatCurrency } from "@/utils/format-currency";
import { AccountData } from "@/types/customer-account";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Code, User } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BalancePayload, DataBalance } from "@/types/accounts-balance";
import Image from "next/image";

export function Navbar() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountData[]>([]);
  const [balance, setBalance] = useState<DataBalance | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>("CxXbc1Pk10");

  useEffect(() => {
    async function loadToken() {
      try {
        const res = await fetch("/auth/access-token");
        const data = await res.json();
        setToken(data.token);
      } catch (err) {
        console.error("Failed to load token", err);
      }
    }

    loadToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const getDataAccount = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCustomerAccount({ token });
        setAccount(res.data);
      } catch (err) {
        setError((err as Error).message || "Unexpected error");
        setAccount([]);
      } finally {
        setLoading(false);
      }
    };
    getDataAccount();
  }, [token]);

  useEffect(() => {
    if (!token || customerAccounts.data.length === 0) return;

    const selected = customerAccounts.data.find(
      (acc) => acc.account_number === selectedAccount
    );

    if (!selected) return;

    const payload: BalancePayload = {
      account_group: selected.account_group,
      account_number: selected.account_number,
    };

    const { data } = getMockedBalance(payload);
    setBalance(data);

    const getBalance = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchBalanceAccount({ token, payload });
        setBalance(res.data);
      } catch (e) {
        setError((e as Error).message || "Unexpected error");
        setBalance(null);
      } finally {
        setLoading(false);
      }
    };
    getBalance();
  }, [token, selectedAccount, account]);

  return (
    <header className="h-[110px] w-full bg-white flex items-center p-[40px] justify-between sticky top-0 z-50 font-montserrat">
      <div className="flex items-center gap-[81px]">
        <div className="w-[94px] h-[30px]">
          <Link href="/home">
            <Image
              src="/assets/Iogo.svg"
              alt="Logo"
              className="h-full w-full block"
              width={500}
              height={500}
            />
          </Link>
        </div>
        <div className="flex items-center gap-[40px]">
          <div className="flex items-center">
            {loading && <p></p>}
            <span className="font-medium text-[#7E7E7E] text-[11px] mr-[10px]">
              ACCOUNT
            </span>
            <Select
              defaultValue={selectedAccount}
              onValueChange={setSelectedAccount}
            >
              <SelectTrigger className="w-[172px] h-[30px] bg-dropdown-gradient rounded-[6px] pl-[10px] py-[9px]  text-[12px] text-[#414141] font-semibold flex items-center gap=[7px] focus:outline-none focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
                <div className="flex items-center gap-[3px]">
                  <p>Operating -</p>
                  <SelectValue />
                </div>
                <div className="clip-custom h-[12px] w-[15px] bg-[#2D807C] translate-y-[3px]"></div>
              </SelectTrigger>
              <SelectContent>
                {customerAccounts.data.map((account) => (
                  <SelectItem
                    key={account.account_number}
                    value={account.account_number}
                  >
                    {maskAccountFixed(account.account_number)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {balance && (
            <>
              <div className="flex items-center">
                <span className="font-medium  mr-[10px] text-[#7E7E7E] text-[11px]">
                  AVAIL BAL
                </span>
                <span className="text-[12px] text-[#414141] font-semibold w-[70px]">
                  {formatCurrency(
                    balance.available_balance.amount,
                    balance.available_balance.currency
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium  mr-[10px] text-[#7E7E7E] text-[11px]">
                  PEND BAL
                </span>
                <span className="text-[13px] text-[#414141] font-semibold w-[70px]">
                  {formatCurrency(
                    balance?.pending_balance.amount,
                    balance?.pending_balance.currency
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium  mr-[10px] text-[#7E7E7E] text-[11px]">
                  TOTAL BAL
                </span>
                <span className="text-[13px] text-[#414141] font-semibold w-[70px]">
                  {formatCurrency(
                    balance.total_balance?.amount,
                    balance.available_balance.currency
                  )}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-[20px] text-[11px] text-[#414141] font-semibold  ">
        <Badge
          variant="outline"
          className="w-[69px] h-[30px] bg-[#C5E2F1] rounded-[6px] py-[0px] cursor-pointer text-[11px] text-[#414141] font-semibold"
        >
          <Code className="w-[24px] h-[24px] text-[#286483] mr-[6px]" />
          DEV
        </Badge>
        <Badge
          variant="outline"
          className="w-[76px] h-[30px] rounded-[6px] bg-[#92C8C68C] cursor-pointer text-[11px] text-[#414141] font-semibold"
        >
          <User className=" text-[#2D807C] h-[16px] w-[16px] mr-[6px]" />
          USER
        </Badge>
      </div>

      {error && (
        <div>
          <p>Error in the Fetch</p>
        </div>
      )}
    </header>
  );
}
