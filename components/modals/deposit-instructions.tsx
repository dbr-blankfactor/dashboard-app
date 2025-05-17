"use client";

import { ModalProps } from "@/types/modal-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export function DepositInstructionsModal({ isOpen, onClose }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Deposit Instructions
            </DialogTitle>
            <button
              onClick={onClose}
              className=" flex items-center justify-center w-[30px] h-[30px] bg-[#92C8C68C] rounded-[6px]"
            >
              <X className="w-[24px] h-[24px] text-[#2D807C]" />
            </button>
          </div>
        </DialogHeader>
        <div className="p-6 pt-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                To deposit to your account, originate a wire from your External
                Bank account on record with us (JPMorgan - **10491) to your
                account at the location below.
              </p>

              <div>
                <p className="text-sm font-medium mb-1">Important Notes:</p>
                <p className="text-sm text-gray-700">
                  Do not send ACH transfers - they will be rejected and
                  returned. For your protection, the wire must be originated
                  from the account noted above, otherwise it may be returned.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <BankDetailRow label="Bank Name" value="CIBC Bank, USA" />
              <BankDetailRow
                label="Bank Address"
                value="100 West Street, Chicago, IL 55555"
              />
              <BankDetailRow label="Routing Number" value="021555555" />
              <BankDetailRow label="Account Number" value="55555-00000" />
              <BankDetailRow label="Account Name" value="SC Trust Co." />
              <BankDetailRow label="For Further Credit" value="5414-9101" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface BankDetailRowProps {
  label: string;
  value: string;
}

function BankDetailRow({ label, value }: BankDetailRowProps) {
  return (
    <div className="grid grid-cols-[150px_1fr] gap-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
