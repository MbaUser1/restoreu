import Recherche from "@/components/Recherche/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Chart | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Chart page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const BasicChartPage: React.FC = () => {
  return (
    <>
      <Recherche />
    </>
  );
};

export default BasicChartPage;