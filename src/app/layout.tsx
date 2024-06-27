import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/authProvider";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
// import {QueryClientProvider,QueryClient} from '@tanstack/react-query'

const inter = Inter({ subsets: ["latin"] });
// const queryClient = new QueryClient()
export const metadata: Metadata = {
  title: "Anonymous Message",
  description: "a Next.js web application designed for anonymous messaging and seamless user experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <AuthProvider>
        <body className={inter.className}>
          <Navbar/>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
     
    </html>
  );
}
