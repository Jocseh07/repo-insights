import { Bot, CreditCard, LayoutDashboard, Presentation } from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    required: false,
  },
  {
    title: "Q&A",
    href: "/qa",
    icon: Bot,
    required: true,
  },
  // {
  //   title: "Billing",
  //   href: "/billing",
  //   icon: CreditCard,
  // },
];
