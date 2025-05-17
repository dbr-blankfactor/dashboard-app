"use client";

import { DepositInstructionsModal } from "@/components/modals/deposit-instructions";
import { RecentTransactions } from "@/components/home/recent-transactions";
import ApproveTransactions from "@/components/modals/approve-transactions";
import { BalanceHistory } from "@/components/home/balance-history";
import { SummaryHeatmap } from "@/components/home/summary-heatmap";
import { QuickActions } from "@/components/home/quick-actions";
import { DepositMap } from "@/components/home/deposit-map";
import { useState } from "react";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState<null | "Approved" | "Deposit">(null);
  const openModal = (modalType: "Approved" | "Deposit" | null) => {
    setIsOpen(modalType);
  };
  const closeModal = () => {
    setIsOpen(null);
  };

  return (
    <div className="flex gap-[30px]">
      <div className="flex flex-col gap-[30px]">
        <BalanceHistory />
        <DepositMap />
      </div>
      <div className="flex flex-col gap-[30px]">
        <QuickActions hasPendingTransfers={true} openModal={openModal} />
        <RecentTransactions />
        <SummaryHeatmap />
      </div>
      <DepositInstructionsModal
        isOpen={isOpen === "Deposit"}
        onClose={closeModal}
      />
      <ApproveTransactions
        isOpen={isOpen === "Approved"}
        onClose={closeModal}
      />
    </div>
  );
}
