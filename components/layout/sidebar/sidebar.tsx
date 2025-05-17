"use client";

import { navItems } from "@/constants/nav-items";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] h-full flex-shrink-0 border-none bg-white flex flex-col pl-[40px]  sticky top-[110px]">
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 py-2 rounded-md transition-colors",
                  pathname === item.href
                    ? "text-[#414141] font-medium"
                    : "text-[#7E7E7ECC] hover:text-slate-900 font-semibold"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-montserrat text-xs font-medium">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
