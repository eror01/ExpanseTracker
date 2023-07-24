import { ReactElement } from "react";
import { dashboard, expenses, transactions, trend } from "./icons";

interface IMenuItems {
  id: number;
  title: string;
  icon: ReactElement;
  link: string;
}

export const menuItems: IMenuItems[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "View Transactions",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Incomes",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Expenses",
    icon: expenses,
    link: "/dashboard",
  },
];
