import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Dashboard",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
  
        <Dashboard />

  );
}
