import {
  LayoutDashboard,
  ArrowLeftRight,
  FileText,
  Headset,
  Landmark,
} from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    href: "/home",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Deposit Positions",
    href: "/deposit",
    icon: Landmark,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Support",
    href: "/support",
    icon: Headset,
  },
];
