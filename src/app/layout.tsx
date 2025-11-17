import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dubem Umeh - Full-Stack Software Developer",
  description: "Portfolio of Dubem Umeh, a passionate full-stack software developer specializing in modern web technologies, creating exceptional digital experiences through clean code and innovative solutions.",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}