import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      {children}
      <Footer />
    </main>
  );
}

