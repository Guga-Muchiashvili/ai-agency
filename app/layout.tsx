import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/common/context/QueryClientProvider";

export const metadata: Metadata = {
  title: "ModelAgency",
  description: "platform for agency managment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black" suppressHydrationWarning>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
