"use client";

import { fetchDepositInstructions } from "@/services/deposit-instructions.service";
import { getMockedDepositInstructions } from "@/mocks/deposit-instruction-mock";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, EyeOff, Info } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DataDepositInstructions,
  DepositInstructionsPayload,
} from "@/types/deposit-instructions";

export default function DepositInstructions() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorHandler, setErrorHandler] = useState<string | null>(null);
  const [depositTransactions, setDepositTransactions] =
    useState<DataDepositInstructions | null>(null);

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
    if (!token) {
      return;
    }

    const getData = async () => {
      setLoading(true);
      setErrorHandler(null);

      const { data } = getMockedDepositInstructions();
      setDepositTransactions(data);

      try {
        const payload: DepositInstructionsPayload = {
          account_group: 1,
          account_number: "123asdf",
        };

        const res = await fetchDepositInstructions(payload, token);
        setDepositTransactions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [token]);

  const [showNumber, setShowNumber] = useState(false);
  const maskedNumber = `*****${depositTransactions?.account_number.slice(-4)}`;

  const toggleNumberVisibility = () => {
    setShowNumber(!showNumber);
  };
  return (
    <Card className="w-[419px] h-[266px] bg-[#FDFDFD] shadow-[0px_4px_4px_0px_#00000024] rounded-[6px] font-montserrat font-medium p-[30px]">
      <CardHeader className="flex flex-row items-center justify-between  space-y-0 p-[0px] pb-[30px]">
        <CardTitle className="text-base font-semibold">
          Deposit Instructions (Wire)
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-[24px] w-[24px] text-[#92C8C6]" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] bg-[#92C8C6] text-justify p-[12px] rounded-[6px] -translate-x-[10px]">
              <p className=" font-montserrat text-[12px] text-[#414141]">
                All deposits to your INDX account must be made via domestic wire
                transfer from your External Account account on record with INDX.
                All ACHs will be rejected.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-6">
          <div className="grid grid-cols-[144px_1fr]">
            <div className="h-[26px] text-xs font-medium text-[#7E7E7E]">
              Bank Name
            </div>
            <div className="text-xs text-[#414141]">
              {depositTransactions?.bank_name}
            </div>

            <div className="h-[26px] text-xs font-medium text-[#7E7E7E]">
              Bank Address
            </div>
            <div className="text-xs text-[#414141]">
              {depositTransactions?.bank_address}
            </div>

            <div className="h-[26px] text-xs font-medium text-[#7E7E7E]">
              Routing Number
            </div>
            <div className="text-xs text-[#414141]">
              {depositTransactions?.routing_number}
            </div>

            <div className="h-[26px] text-xs font-medium text-[#7E7E7E]">
              Account Number
            </div>
            <div className="text-xs text-[#414141]">
              {depositTransactions?.account_number}
            </div>

            <div className="h-[26px]  text-xs font-medium text-[#7E7E7E]">
              Account Name
            </div>
            <div className="text-xs text-[#414141]">
              {depositTransactions?.account_name}
            </div>

            <div className="h-[26px]  text-xs font-medium text-[#7E7E7E]">
              For Further Credit
            </div>
            <div className="flex items-center gap-[5px]">
              <label className="text-xs text-[#414141] min-w-[63px]">
                {showNumber
                  ? depositTransactions?.account_number
                  : maskedNumber}
              </label>
              {showNumber ? (
                <EyeOff
                  className="h-[15px] w-[15px] text-[#92C8C6] cursor-pointer"
                  onClick={toggleNumberVisibility}
                />
              ) : (
                <Eye
                  className="h-[15px] w-[15px] text-[#92C8C6] cursor-pointer"
                  onClick={toggleNumberVisibility}
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
      {loading && (
        <div>
          <p></p>
        </div>
      )}
      {errorHandler && (
        <div>
          <p>Error to fetch</p>
        </div>
      )}
    </Card>
  );
}
