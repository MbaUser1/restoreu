import DashboardPD from "@/components/Dashboard/DashboardPD";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Ceci est le Dashboard des utilisateurs ",
};

export default function Home() {
  return <DashboardPD />;
}
