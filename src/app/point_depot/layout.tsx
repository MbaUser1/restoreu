"USE CLIENT";
import React, { useState, ReactNode } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface LayoutProps {
  children: ReactNode;
  pageName?: string; // Optional page name for Breadcrumbs
}

export default function Layout({ children, pageName }: LayoutProps) {
  return (
    <div className="flex flex-col gap-10">
      {pageName && <Breadcrumb pageName={pageName} />}
      {children}
    </div>
  );
}
