"USE CLIENT";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthContext from "@/context/session";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: ReactNode;
  pageName?: string; // Optional page name for Breadcrumbs
}

export default function Layout({ children, pageName }: LayoutProps) {

  return (
    <AuthContext>
      <DefaultLayout>
        <Toaster />
        <div className="flex flex-col gap-10">
          {pageName && <Breadcrumb pageName={pageName} />}
          {children}
        </div>
      </DefaultLayout>
    </AuthContext>
  );
}
