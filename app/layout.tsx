import type { Metadata } from "next";
import { Inter,Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { UsageProvider } from "./context/UsageContext";
import { Toaster } from "react-hot-toast";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Gen",
  description: "AI generated content create Platform",
  icons: {
    icon: "../public/logo.svg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <UsageProvider>
  <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}
      <Toaster position="top-right" />
      </body>
    </html>
  </ClerkProvider>
  </UsageProvider>
  );
}
