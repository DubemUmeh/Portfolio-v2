import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { generateMetadata as generateSEOMetadata, generatePersonSchema, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Dubem Umeh - Full-Stack Software Developer",
  description: "Creative full-stack software developer specializing in modern web technologies. Building scalable applications with great user experiences.",
  keywords: [
    "full-stack developer",
    "Dubem",
    "Umeh",
    "Dubem Umeh",
    "Dubem Umeh github",
    "Dubem Umeh portfolio",
    "Website developer",
    "Website developer in Nigeria",
    "Website developer in Ghana",
    "web developer",
    "React developer",
    "Next.js developer",
    "software engineer",
    "Nigeria",
    "portfolio",
    "web development",
  ],
  ogTitle: "Dubem Umeh - Full-Stack Developer & Software Engineer",
  ogDescription: "Explore my portfolio of full-stack web applications and digital solutions built with modern technologies.",
  ogImage: "https://umeh.site/og-image.png",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = generatePersonSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS prefetch for third-party services */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />

        {/* JSON-LD Structured Data */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personSchema }}
          suppressHydrationWarning
        />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FN9CY0406L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FN9CY0406L');
          `}
        </Script>

        {/* Favicon and app icons */}
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
