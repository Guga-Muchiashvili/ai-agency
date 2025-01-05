import NavBar from "@/components/NavBarComponent/NavBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh", padding: "10px" }}>
      <NavBar />
      <main style={{ padding: "1px", flex: "1" }}>{children}</main>
    </div>
  );
}
