import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Inter, Montserrat } from "next/font/google";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INDX Financial Dashboard",
  description: "Financial dashboard for INDX",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <Auth0Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <DashboardLayout>
              {children}
            </DashboardLayout>
          </ThemeProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
