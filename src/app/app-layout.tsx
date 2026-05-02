'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/Footer";
import { Toaster } from "./ui/sonner";
import Navigation from "@/components/Navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isProjectsPage = pathname === '/projects' || '/blog';

  return (
    <>
    <Navigation />
    <div className={isProjectsPage ? 'py-25' : ''}>
      {children}
    </div>
    <Toaster />
    <Footer />
    </>
  )
}