"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quickActions } from "@/constants/quick-actions";
import Link from "next/link";

export type ModalType = "Deposit" | "Approved" | null;

interface QuickActionsProps {
  openModal: (modalType: ModalType) => void;
  hasPendingTransfers: boolean;
}

export function QuickActions({
  openModal,
  hasPendingTransfers,
}: QuickActionsProps) {
  return (
    <Card className="font-montserrat w-[491px] h-[240px] p-[30px] rounded-[6px] bg-[#FDFDFD] shadow-[0px_4px_20px_rgba(0,0,0,0.1)] ">
      <CardHeader className="p-[0px]">
        <CardTitle className="font-weight:600 text-[16px] text-[#414141] pb-[30px]">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-[0px]">
        <div className="space-y-[20px]">
          {quickActions.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap gap-[20px] cursor-pointer"
            >
              {row.map((action, actionIndex) => {
                const isApproveAction = action.modalType === "Approved";
                const shouldHighlight = isApproveAction && hasPendingTransfers;

                const iconClass = shouldHighlight
                  ? action.bgIconApproved || action.bgIcon
                  : action.bgIcon;
                const buttonBg = shouldHighlight
                  ? action.bgColorApproved || action.bgColor
                  : action.bgColor;

                const handleClick = () => {
                  if (action.openModal && action.modalType) {
                    openModal(action.modalType);
                  }
                };

                return (
                  <Link href={action.href || "#"} key={actionIndex}>
                    <button
                      onClick={action.openModal ? handleClick : undefined}
                      type="button"
                      className={`flex items-center gap-[8px] rounded-[4px] pb-[3px] pr-[8px] pl-[6px]  pt-[3px] h-[30px] ${buttonBg}`}
                    >
                      <div
                        className={`h-[24px] w-[24px] flex items-center justify-center`}
                      >
                        <action.icon
                          className={`h-[18px] w-[18px] block  ${iconClass}`}
                        />
                      </div>
                      <span className="text-[12px] text-[#414141] h-full flex items-center ">
                        {action.title}
                      </span>
                    </button>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
