import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import AdminNavbar from "@/components/admin/AdminNavbar";

export const metadata: Metadata = {
  title: "Admin CMS | Muhammad Daniyal Khan",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07070a] text-[#f4f4f5] flex flex-col">
      {/* Top Admin Navigation Header */}
      <AdminNavbar />

      {/* Main Admin Content Container */}
      <div className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
}
