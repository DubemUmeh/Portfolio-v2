import Link from "next/link";

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  rel?: string;
}

/**
 * Internal link component that enforces proper linking patterns
 * Helps with SEO through strategic internal linking
 */
export function InternalLink({
  href,
  children,
  className,
  title,
  rel = "",
}: InternalLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      title={title}
      rel={rel}
    >
      {children}
    </Link>
  );
}

interface RelatedLinksProps {
  links: Array<{
    href: string;
    title: string;
    description?: string;
  }>;
  sectionTitle?: string;
}

/**
 * Component for displaying related links for contextual internal linking
 */
export function RelatedLinks({
  links,
  sectionTitle = "Related Pages",
}: RelatedLinksProps) {
  return (
    <section className="mt-12 pt-8 border-t border-foreground/30">
      <h3 className="text-2xl font-bold mb-6">{sectionTitle}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-neutral-700 hover:text-foreground/70 transition-colors"
            >
              <span className="font-semibold">{link.title}</span>
              {link.description && (
                <p className="text-sm text-neutral-600 mt-1">{link.description}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
