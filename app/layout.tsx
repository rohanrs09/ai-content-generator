import type { Metadata } from "next";
import { Inter,Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { UsageProvider } from "./context/UsageContext";
import { ThemeProvider } from "./context/ThemeContext";
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <UsageProvider>
            <ClerkProvider>
              {children}
              <Toaster position="top-right" />
            </ClerkProvider>
          </UsageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
