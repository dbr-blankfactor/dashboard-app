"use client";

import { redirect } from "next/navigation";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#1a2233] text-white">
      <>{redirect("/home")}</>
    </div>
  );
}
