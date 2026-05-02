import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href: string;
  }>;
  className?: string;
}

/**
 * Breadcrumb component for better navigation and SEO
 * Automatically includes schema.org structured data
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://umeh.vercel.app"}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        suppressHydrationWarning
      />
      <nav
        className={`flex items-center gap-2 text-sm text-neutral-500 ${className || ""}`}
        aria-label="Breadcrumb"
      >
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
            {index < items.length - 1 && <span className="text-neutral-600">/</span>}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}
