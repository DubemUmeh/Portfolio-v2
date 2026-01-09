import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  robots?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  articleAuthor?: string;
  articleCategory?: string;
  articleTags?: string[];
}

const SITE_CONFIG = {
  name: "Dubem Umeh - Full-Stack Software Developer",
  description:
    "Portfolio of Dubem Umeh, a Creative full-stack software developer specializing in modern web technologies. Building scalable applications with great user experiences.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://umeh.vercel.app",
  twitterHandle: "@dubem_umeh",
  linkedinUrl: "https://linkedin.com/in/dubem-umeh",
  githubUrl: "https://github.com/DubemUmeh",
  email: "hello@umeh.site",
};

/**
 * Generate comprehensive metadata for pages
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogTitle,
    ogDescription,
    ogImage,
    canonical,
    robots = "index, follow",
    author = "Dubem Umeh",
    publishedDate,
    modifiedDate,
    articleAuthor,
    articleCategory,
    articleTags = [],
  } = config;

  const fullTitle = title.includes("Dubem Umeh")
    ? title
    : `${title} | Dubem Umeh - Full-Stack Developer`;

  const defaultOgImage = `${SITE_CONFIG.siteUrl}/og-image.png`;
  const canonicalUrl = canonical || SITE_CONFIG.siteUrl;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [
      ...keywords,
      "full-stack developer",
      "web development",
      "software engineering",
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
    ],
    authors: [{ name: author }],
    creator: author,
    publisher: "Dubem Umeh",
    robots,
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    openGraph: {
      title: ogTitle || fullTitle,
      description: ogDescription || description,
      url: canonicalUrl,
      type: articleAuthor ? "article" : "website",
      images: [
        {
          url: ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: ogTitle || fullTitle,
        },
      ],
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle || fullTitle,
      description: ogDescription || description,
      images: [ogImage || defaultOgImage],
      creator: SITE_CONFIG.twitterHandle,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };

  if (articleAuthor || publishedDate || modifiedDate) {
    const otherMetadata: Record<string, string | number | (string | number)[]> =
      {};
    if (articleAuthor) otherMetadata["article:author"] = articleAuthor;
    if (publishedDate) otherMetadata["article:published_time"] = publishedDate;
    if (modifiedDate) otherMetadata["article:modified_time"] = modifiedDate;
    if (articleCategory) otherMetadata["article:section"] = articleCategory;
    if (articleTags.length > 0)
      otherMetadata["article:tags"] = articleTags.join(", ");

    metadata.other = otherMetadata;
  }

  return metadata;
}

/**
 * Generate JSON-LD structured data for different content types
 */
export function generateJsonLd(
  type: "WebSite" | "Person" | "Article" | "BreadcrumbList" | "Product",
  data: Record<string, unknown>
): string {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
  };

  return JSON.stringify({
    ...baseStructure,
    ...data,
  });
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ label: string; url: string }>
) {
  return generateJsonLd("BreadcrumbList", {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_CONFIG.siteUrl}${item.url}`,
    })),
  });
}

/**
 * Generate person schema for homepage
 */
export function generatePersonSchema() {
  return generateJsonLd("Person", {
    name: "Dubem Umeh",
    url: SITE_CONFIG.siteUrl,
    email: SITE_CONFIG.email,
    jobTitle: "Full-Stack Software Developer",
    knowsAbout: [
      "Full-Stack Development",
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
    ],
    sameAs: [SITE_CONFIG.githubUrl, SITE_CONFIG.linkedinUrl],
    image: `${SITE_CONFIG.siteUrl}/avatar.jpg`,
  });
}

/**
 * Generate article schema
 */
export function generateArticleSchema(
  title: string,
  description: string,
  slug: string,
  publishedDate: string,
  modifiedDate: string,
  author: string = "Dubem Umeh",
  image?: string
) {
  return generateJsonLd("Article", {
    headline: title,
    description,
    image: image || `${SITE_CONFIG.siteUrl}/og-image.png`,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Person",
      name: author,
      url: SITE_CONFIG.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.siteUrl}/logo.png`,
      },
    },
    url: `${SITE_CONFIG.siteUrl}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.siteUrl}/blog/${slug}`,
    },
  });
}

export const SITE_URL = SITE_CONFIG.siteUrl;
export const SITE_NAME = SITE_CONFIG.name;
export default SITE_CONFIG;
