"use client";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./utils/theme-provider";
import { Providers } from "./Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Toaster position="top-center" reverseOrder={false} />
              {children}
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
