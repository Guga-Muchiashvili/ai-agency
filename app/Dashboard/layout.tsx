import NavBar from "@/components/NavBarComponent/NavBar";
import React from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh", padding: "10px" }}>
      <NavBar />
      <Toaster />
      <main>{children}</main>
    </div>
  );
}
