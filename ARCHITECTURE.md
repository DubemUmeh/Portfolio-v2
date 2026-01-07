# Portfolio Architecture & Data Flow

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PORTFOLIO SYSTEM                          │
└─────────────────────────────────────────────────────────────┘

                         ┌──────────────┐
                         │   User       │
                         │  Browser     │
                         └──────┬───────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
            ┌───────▼──────┐        ┌──────▼────────┐
            │ Static Pages │        │ Dynamic Pages │
            │              │        │                │
            │ • Homepage   │        │ • /projects/[id]
            │ • Sitemap    │        │ • /blog/[slug]
            │ • Robots     │        │                │
            └──────────────┘        └────────────────┘
                    │                       │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │    Next.js App        │
                    │   (Server/Client)     │
                    └───────────┬───────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼─────┐  ┌──────▼──────┐  ┌───▼──────────┐
        │   Layout    │  │ Components  │  │   Utilities  │
        │   (SEO)     │  │  (UI)       │  │   (Config)   │
        └─────────────┘  └─────────────┘  └──────────────┘
```

---

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   DATA SOURCES                               │
└──────────────────────────────────────────────────────────────┘

           ┌─────────────────────────────────┐
           │    src/lib/data.ts              │
           │  (Single Source of Truth)       │
           │                                 │
           │  • projects array              │
           │  • posts array                 │
           │  • testimonials array          │
           └──────────┬──────────────────────┘
                      │
        ┌─────────────┼─────────────┬──────────────┐
        │             │             │              │
    ┌───▼────┐  ┌────▼────┐  ┌─────▼─────┐  ┌────▼────┐
    │ Layout │  │ Portfolio│  │   Blog    │  │ Sitemap │
    │ Metadata│ │Components │  │Components │  │Generator │
    └────────┘  └──────────┘  └───────────┘  └─────────┘
        │             │             │              │
        └─────────────┼─────────────┴──────────────┘
                      │
            ┌─────────▼──────────┐
            │   Next.js Pages    │
            │                    │
            │ Rendered HTML      │
            │ + Meta Tags        │
            │ + Schema.org Data  │
            └────────────────────┘
```

---

## Component Hierarchy

```
RootLayout (src/app/layout.tsx)
│
├── Metadata
│   ├── Title
│   ├── Description
│   ├── Open Graph
│   └── Twitter Card
│
├── Scripts
│   ├── Google Analytics
│   └── JSON-LD Schema
│
└── Pages
    ├── HomePage
    │   ├── Hero
    │   ├── About
    │   ├── Process
    │   ├── Portfolio
    │   │   └── Suspense
    │   │       └── ProjectCards
    │   │           └── Links to /projects/[id]
    │   ├── Testimonials
    │   │   └── Suspense
    │   │       └── TestimonialCards
    │   ├── Blog
    │   │   └── Suspense
    │   │       └── BlogCards
    │   │           └── Links to /blog/[slug]
    │   ├── Contact
    │   └── Footer
    │
    ├── ProjectPage (/projects/[id])
    │   ├── Breadcrumb
    │   ├── ProjectHeader
    │   ├── ProjectContent
    │   ├── RelatedLinks
    │   └── Metadata (per project)
    │
    └── BlogPage (/blog/[slug])
        ├── Breadcrumb
        ├── ArticleHeader
        ├── ArticleContent
        ├── AuthorBio
        ├── RelatedLinks
        └── Metadata (per article)
```

---

## SEO Data Flow

```
┌─────────────────────────────────────────────────┐
│         SEO Utilities (lib/seo.ts)              │
└─────────────┬───────────────────────────────────┘
              │
    ┌─────────┼──────────┬─────────────┬──────────┐
    │         │          │             │          │
    │    ┌────▼───┐  ┌───▼────┐  ┌────▼───┐  ┌──▼────┐
    │    │Generate│  │Generate│  │Generate│  │Generate
    │    │Metadata│  │JsonLd  │  │Person  │  │Article
    │    │        │  │Schema  │  │Schema  │  │Schema
    │    └────┬───┘  └───┬────┘  └────┬───┘  └──┬────┘
    │         │          │            │         │
    │    ┌────▼──────────▼────────────▼────────▼───┐
    │    │    Applied to Pages                     │
    │    │                                         │
    │    │  • Root Layout (Person Schema)          │
    │    │  • Project Pages (Article Schema)       │
    │    │  • Blog Pages (Article Schema)          │
    │    │  • All Pages (Metadata)                 │
    │    └─────────────┬──────────────────────────┘
    │                  │
    │         ┌────────▼─────────┐
    │         │  Page HTML       │
    │         │                  │
    │         │ • Meta tags      │
    │         │ • JSON-LD        │
    │         │ • OG tags        │
    │         │ • Twitter cards  │
    │         └──────────────────┘
    │
    └─► Sent to Search Engines & Social Media
```

---

## Performance Optimization Flow

```
┌──────────────────────────────────────────────────┐
│     Performance Utilities (lib/performance.ts)   │
└──────┬───────────────────────────────────────────┘
       │
    ┌──┼──────────────┬──────────────┬─────────────┐
    │  │              │              │             │
    │  ▼              ▼              ▼             ▼
    │ Memoize     Debounce      Throttle    Lazy Load
    │ Results     Events        Frequent    Images
    │             (Scroll)      Events      & Code
    │
    └──┐
       │  Next.js Optimizations
       │  • Code Splitting
       │  • Image Optimization
       │  • Font Preloading
       │  • Resource Hints
       │
       └─► Faster Page Load
           • Reduced bundle size
           • Lazy image loading
           • Optimized resources
           • Better Core Web Vitals
```

---

## Dynamic Page Generation Flow

```
Projects/Blog Data                 Route Generation
     │                                  │
     ├─ Project 1 ──────┐              │
     ├─ Project 2 ──────┼─► [id] ──► /projects/[id] ──► Page 1
     ├─ Project 3 ──────┘              │          ──► Page 2
     │                                 │          ──► Page 3
     │
     ├─ Blog Post 1 ────┐              │
     ├─ Blog Post 2 ────┼─► [slug] ──► /blog/[slug] ──► Page A
     └─ Blog Post 3 ────┘              │              ──► Page B
                                       │              ──► Page C
                                       │
                    Sitemap Generator ─┴─► /sitemap.xml

                    Static Params Generator ─► Pre-rendered Routes
```

---

## Internal Linking Strategy

```
Homepage
├── Navigation Links
│   ├── About (/#about)
│   ├── Portfolio (/#portfolio)
│   ├── Blog (/#blog)
│   └── Contact (/#contact)
│
├── Portfolio Section
│   └── Project Cards
│       └── Links to /projects/[id] ◄──┐
│                                      │
└── Blog Section                       │
    └── Blog Cards                     │
        └── Links to /blog/[slug] ┐    │
                                  │    │
                        ┌─────────┴──┬─┴──────┐
                        │             │        │
                    ┌───▼───┐     ┌────▼──┐  ┌──▼───┐
                    │Project│     │ Blog  │  │Related
                    │Pages  │     │ Pages │  │Content
                    │       │     │       │  │
                    │ Links │     │ Links │  │
                    │ To:   │     │ To:   │  │Links to:
                    │       │     │       │  │
                    │ • Home│     │ • Home│  │• Related
                    │ • Blog│     │ • More│  │  Projects
                    │ • Other     │Articles  │
                    │  Projects   │       │  │• Related
                    │       │     │       │  │  Articles
                    └───────┘     └───────┘  └────────┘
```

---

## File Organization

```
src/
├── app/
│   ├── layout.tsx                    ◄── Root Layout + SEO
│   ├── page.tsx                      ◄── Homepage with Suspense
│   ├── globals.css                   ◄── Global styles
│   ├── robots.ts                     ◄── /robots.txt generator
│   ├── sitemap.ts                    ◄── /sitemap.xml generator
│   │
│   ├── projects/[id]/
│   │   ├── page.tsx                  ◄── Project Detail Page
│   │   ├── layout.tsx                ◄── Project Metadata
│   │   └── not-found.tsx             ◄── 404 Page
│   │
│   ├── blog/[slug]/
│   │   ├── page.tsx                  ◄── Blog Post Page
│   │   ├── layout.tsx                ◄── Blog Metadata
│   │   └── not-found.tsx             ◄── 404 Page
│   │
│   ├── api/
│   │   └── contact/
│   │       └── route.ts              ◄── Contact API
│   │
│   └── ui/                           ◄── UI Components
│       ├── accordion.tsx
│       ├── alert.tsx
│       └── ... (other UI)
│
├── components/
│   ├── Breadcrumb.tsx                ◄── NEW: Navigation Breadcrumb
│   ├── InternalLink.tsx              ◄── NEW: Strategic Linking
│   ├── Portfolio.tsx                 ◄── REFACTORED: Cleaner
│   ├── Blog.tsx                      ◄── REFACTORED: Cleaner
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ... (other components)
│
├── hooks/
│   └── use-mobile.ts
│
└── lib/
    ├── seo.ts                        ◄── NEW: SEO Utilities
    ├── performance.ts                ◄── NEW: Performance Utils
    ├── data.ts                       ◄── Content Data
    ├── validation.ts
    ├── utils.ts
    └── email.ts

public/
├── assets/
│   └── projects/                     ◄── Project Images
│       ├── glossy-affair.png
│       ├── wedding.png
│       └── ...
└── favicon.ico

Documentation/
├── SEO_OPTIMIZATION_GUIDE.md         ◄── Comprehensive SEO Doc
├── REFACTORING_SUMMARY.md            ◄── Technical Details
├── QUICK_START.md                    ◄── Quick Reference
├── IMPLEMENTATION_CHECKLIST.md       ◄── Verification Guide
└── ARCHITECTURE.md                   ◄── This File
```

---

## Request/Response Flow

```
User Request
│
└─► Browser → /projects/1
    │
    └─► Next.js Router
        │
        ├─► Load generateStaticParams()
        │   • Get project.id = 1 from data
        │   │
        │   ├─► Render page.tsx
        │   │   • Find project with id 1
        │   │   • Display project details
        │   │   • Show related projects
        │   │   • Include breadcrumb
        │   │
        │   └─► Load layout.tsx
        │       • Generate metadata
        │       • Set title, description
        │       • Set OG tags
        │       • Create schema.org data
        │
        └─► Generate HTML
            │
            ├─► <head>
            │   ├── Meta tags
            │   ├── OG tags
            │   ├── JSON-LD script
            │   └── External scripts
            │
            ├─► <body>
            │   └── Page Content
            │       ├── Breadcrumb
            │       ├── Project Info
            │       ├── Features
            │       └── Related Links
            │
            └─► Send to Browser
                • Browser renders
                • Scripts execute
                • Images load (lazy)
                • Interactivity active
```

---

## SEO Indexing Pipeline

```
Pages Generated
    │
    ├─► Static Pages
    │   ├── Homepage
    │   ├── Sitemap
    │   └── Robots.txt
    │
    ├─► Dynamic Pages
    │   ├── /projects/[id]
    │   └── /blog/[slug]
    │
    └─► Search Engines
        │
        ├─► Find via Sitemap
        │   └── Visit /sitemap.xml
        │       • Crawl all URLs
        │       • Check lastmod
        │       • Follow priority
        │
        ├─► Check Robots.txt
        │   └── /robots.txt
        │       • Verify permission
        │       • Follow directives
        │
        ├─► Analyze Meta Tags
        │   ├── Title
        │   ├── Description
        │   ├── OG tags
        │   └── Robots meta
        │
        ├─► Process Structured Data
        │   ├── JSON-LD schemas
        │   ├── Rich snippets
        │   └── SERP display
        │
        └─► Index Page
            • Add to search results
            • Display with rich snippet
            • Track keywords
            • Monitor rankings
```

---

## Development Workflow

```
Developer
    │
    ├─► New Project
    │   └─► Edit src/lib/data.ts
    │       ├── Add project object
    │       └── Auto generates:
    │           ├── /projects/[id]
    │           ├── Sitemap entry
    │           ├── Metadata
    │           └── Social cards
    │
    ├─► New Blog Post
    │   └─► Edit src/lib/data.ts
    │       ├── Add post object
    │       └── Auto generates:
    │           ├── /blog/[slug]
    │           ├── Sitemap entry
    │           ├── Article schema
    │           └── Social cards
    │
    ├─► Deploy
    │   ├─► npm run build
    │   ├─► Deploy to host
    │   └─► Submit sitemap to Google
    │
    └─► Monitor
        ├── Google Search Console
        ├── Analytics
        ├── Core Web Vitals
        └── Rankings
```

---

## Database/Content Management

```
Currently: File-based (src/lib/data.ts)
    │
    ├── For Small Scale ✓ (Current State)
    │   └── Works great for:
    │       • < 100 projects
    │       • < 100 blog posts
    │       • Regular manual updates
    │       • Simple structure
    │
    └── Future: CMS Integration (if needed)
        └── Options:
            • Strapi (Headless CMS)
            • Sanity (Structured CMS)
            • Contentful (API CMS)
            • Notion (Free, Simple)
            • Prisma + Database
            
            Benefits:
            • Visual editing
            • Multiple users
            • Versioning
            • Real-time updates
            • Easy scaling
```

---

## Performance Optimization Pipeline

```
Raw Assets
    │
    ├─► Images
    │   ├── WebP Conversion
    │   ├── AVIF Generation
    │   ├── Responsive Sizes
    │   └── Lazy Loading
    │
    ├─► JavaScript
    │   ├── Code Splitting
    │   ├── Tree Shaking
    │   ├── Minification
    │   └── Compression
    │
    ├─► CSS
    │   ├── Tailwind Purge
    │   ├── Minification
    │   └── Critical Path
    │
    └─► HTML
        ├── Minification
        ├── Resource Hints
        └── Preloading
        
            │
            └─► Optimized Bundle
                │
                └─► Delivered to Browser
                    │
                    └─► Faster Load Times
                        • Smaller transfers
                        • Quicker rendering
                        • Better performance
```

---

## Security Layers

```
Request
    │
    ├─► Browser Security
    │   ├── X-Frame-Options
    │   ├── X-Content-Type-Options
    │   └── Referrer-Policy
    │
    ├─► DNS Security
    │   ├── DNS-Prefetch-Control
    │   └── HTTPS Only
    │
    ├─► Content Security
    │   ├── CSP Headers
    │   ├── Input Validation
    │   └── Output Escaping
    │
    ├─► API Security
    │   ├── Rate Limiting
    │   ├── Authentication
    │   └── Validation
    │
    └─► Response
        └── Safe to User
```

---

## Monitoring & Analytics Flow

```
User Interactions
    │
    ├─► Google Analytics 4
    │   ├── Page views
    │   ├── User behavior
    │   ├── Conversions
    │   └── Events
    │
    ├─► Search Console
    │   ├── Search queries
    │   ├── Impressions
    │   ├── Clicks
    │   └── Rankings
    │
    ├─► PageSpeed Insights
    │   ├── Core Web Vitals
    │   ├── Performance score
    │   ├── Opportunities
    │   └── Diagnostics
    │
    └─► Dashboard Reports
        ├── Traffic trends
        ├── Keyword rankings
        ├── User experience
        └── Conversion rates
```

---

## Technology Stack

```
Frontend
├── Next.js 14+          (Framework)
├── React 18+            (UI Library)
├── TypeScript           (Type Safety)
├── Tailwind CSS         (Styling)
├── Framer Motion        (Animations)
└── Lucide React         (Icons)

Build & Deploy
├── Vercel              (Hosting)
├── npm                 (Package Manager)
├── ESLint              (Linting)
└── PostCSS             (CSS Processing)

SEO & Analytics
├── Google Analytics    (Traffic)
├── Google Search Console (Indexing)
├── Schema.org          (Structured Data)
└── Open Graph          (Social Sharing)
```

---

**Last Updated**: January 7, 2026
**Version**: 1.0.0
