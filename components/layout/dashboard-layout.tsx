"use client";

import { Sidebar } from "./sidebar/sidebar";
import { Navbar } from "./navbar/navbar";
import { Button } from "../ui/button";
import type React from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex  flex-1 ">
        <Sidebar />
        <main className="flex-1 overflow-y-auto  pr-[40px] bg-white">
          {children}
        </main>
      </div>
      <footer className="p-4 text-xs text-center text-gray-500 border-t sticky bottom-0 z-50 bg-white">
        <p>
          INDX Processing, LLC - Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla eu dignissim erat, quis varius augue. Nunc a
          ipsum ac magna tincidunt condimentum. Fusce convallis lectus tellus,
          quis tincidunt velit tempor.
        </p>
        <div>
          <Button variant="outline" size="sm">
            <a href="/auth/logout">Sign Out</a>
          </Button>
        </div>
      </footer>
    </div>
  );
}
