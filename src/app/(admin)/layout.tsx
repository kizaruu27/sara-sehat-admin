import type { Metadata } from "next";
import SideBar from "@/components/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Sarasehat Admin",
  description: "Admin Platform for Sarasehat",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SideBar>{children}</SideBar>;
}
