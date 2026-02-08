import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NextAuthProvider from "@/components/providers/NextAuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nestor | Modern Real-Estate Booking Platform",
  description: "Secure property booking by slot/plot/floor/row. Phase-based tracking: Booking, Development, Allotment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable}`}>
        <NextAuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
