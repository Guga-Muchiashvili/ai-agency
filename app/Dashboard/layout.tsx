import NavBar from "@/components/NavBarComponent/NavBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh", padding: "20px" }}>
      <NavBar />
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}
