import { DashboardProvider } from '@/app/globcontext';
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./Header";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body >
        <Header />
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </body>
    </html>
  );
}
