export type Project = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: "web" | "mobile" | "backend" | "fullstack";
  fullDescription: string;
  features: string[];
  challenge: string;
  solution: string;
  results: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Glossy Affair E-Commerce",
    description: "Full-stack e-commerce solution with integrated secure payment processing.",
    image: "/assets/projects/glossy-affair.png",
    tags: ["React", "Stripe", "PostgreSQL", "Supabase Auth"],
    liveUrl: "https://glossy-affair.mandc2025.org",
    githubUrl: "https://github.com/DubemUmeh",
    category: "fullstack",
    fullDescription: "Architected a comprehensive e-commerce platform tailored for the modern online retail of cosmetics. The system integrates seamless user authentication, real-time inventory synchronization, and a fully functional administrative dashboard for analytics.",
    features: [
      "Secure, multi-channel payment processing via Stripe",
      "Real-time inventory tracking and order state management",
      "Comprehensive administrative panel for revenue analytics",
      "Role-based access control leveraging Supabase Auth"
    ],
    challenge: "Engineering a highly scalable checkout system capable of handling concurrent transactions and maintaining database consistency during flash sales.",
    solution: "Implemented Supabase Auth alongside optimized PostgreSQL relational queries to ensure ACID compliance and immediate inventory locking during checkout.",
    results: "Reduced checkout friction by 30% and improved mobile conversion rates by 25% through an optimized mobile-first UI."
  },
  {
    id: 2,
    title: "Wedding Management Platform",
    description: "Responsive digital platform for event coordination and high-resolution media delivery.",
    image: "/assets/projects/wedding.png",
    tags: ["React", "Node.js", "MongoDB", "Cloudinary"],
    liveUrl: "https://mandc2025.org",
    githubUrl: "https://github.com/DubemUmeh",
    category: "web",
    fullDescription: "Engineered a robust wedding management application to centralize event details, guest RSVPs, and post-event media sharing. The platform utilizes a decoupled architecture to ensure rapid content delivery and an intuitive user experience across all devices.",
    features: [
      "Dynamic RSVP form handling with real-time database updates",
      "Automated image transformation and delivery via Cloudinary",
      "High-speed NoSQL data retrieval using MongoDB",
      "Responsive multimedia galleries and interactive timelines"
    ],
    challenge: "Serving hundreds of high-resolution images simultaneously to varying device form factors without severely degrading load times or Core Web Vitals.",
    solution: "Integrated Cloudinary for edge-cached image delivery, implementing aggressive lazy-loading and dynamic responsive image sizing based on the viewport.",
    results: "Successfully processed over 500 RSVPs with zero downtime and delivered high-resolution image galleries with sub-second load times."
  },
  {
    id: 3,
    title: "Enterprise Bulk Mailing Platform",
    description: "Secure, high-throughput mailing system supporting multiple SMTP integrations.",
    image: "/assets/projects/bulky.png",
    tags: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "https://bulky.dev.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription: "Architected a secure and scalable email dispatch application enabling simultaneous delivery across multiple addresses. The platform securely manages sensitive SMTP credentials and authenticates outgoing web requests via unique, encrypted passkeys.",
    features: [
      "Dynamic injection and management of multiple SMTP configurations",
      "Cryptographic token and passkey generation for secure API access",
      "Real-time dispatch tracking and delivery status monitoring",
      "Strict data sanitization to prevent injection vulnerabilities"
    ],
    challenge: "Safeguarding highly sensitive SMTP credentials and preventing potential SQL injection attacks while processing large-scale batch mailing requests.",
    solution: "Implemented AES-256 data encryption at rest for credential storage and utilized parameterized queries combined with strict role-based access control.",
    results: "Enabled businesses to consistently dispatch over 10,000 emails daily while maintaining 99.9% uptime and zero security breaches."
  },
  {
    id: 4,
    title: "JoeTech Hydraulics Portal",
    description: "High-performance corporate storefront for complex industrial equipment distribution.",
    image: "/assets/projects/joetech.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Framer Motion", "Cloudinary"],
    liveUrl: "https://dev.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription: "Developed a professional, SEO-optimized e-commerce solution catering specifically to industrial hydraulic fittings. Leveraging Next.js and Server-Side Rendering, the platform presents a vast catalog of technical products with an intuitive search architecture.",
    features: [
      "Advanced product filtering algorithms based on technical specifications",
      "Immersive virtual tours and interactive equipment showcases",
      "Real-time agent messaging integration for instant B2B support",
      "Custom administrative dashboard for granular inventory management"
    ],
    challenge: "Structuring and querying a highly complex relational dataset with diverse product specifications without suffering from slow query execution times.",
    solution: "Engineered a custom inventory management system with heavily indexed PostgreSQL tables and aggressive server-side caching mechanisms.",
    results: "Streamlined inventory tracking, reducing manual data entry errors by 80% and driving a significant increase in online sales inquiries."
  },
  {
    id: 5,
    title: "Silver Jubilee Celebration Platform",
    description: "Immersive multimedia application commemorating a 25th wedding anniversary.",
    image: "/assets/projects/wedding-anniversary.png",
    tags: ["Next.js", "Framer Motion", "TypeScript", "GSAP", "Cloudinary", "Neon PostgreSQL"],
    liveUrl: "https://anniversary.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription: "Architected an elegant, animation-rich web experience to celebrate a 25-year milestone. The application seamlessly blends high-performance GSAP animations with a secure, authenticated guestbook and media gallery, ensuring a polished user journey.",
    features: [
      "Hardware-accelerated interactive hero layouts and timeline animations",
      "Dynamic guestbook with real-time 'add wish' functionality",
      "Optimized masonry gallery layouts for diverse media formats",
      "Secure administrative interface for content moderation"
    ],
    challenge: "Maintaining a fluid 60fps frame rate for complex GSAP hero animations across legacy browsers and underpowered mobile devices.",
    solution: "Developed a progressive enhancement strategy utilizing a 'hasAnimationSupport' custom hook to gracefully degrade to CSS transitions on unsupported hardware.",
    results: "Delivered a flawless digital experience to over 200 concurrent guests, maintaining perfect cross-browser stability and visual fidelity."
  },
  {
    id: 6,
    title: "Account Market SPA",
    description: "Streamlined single-page application for secure social media account acquisition.",
    image: "/assets/projects/account-market.png",
    tags: ["React", "Framer Motion", "TailwindCSS", "JivoChat API"],
    liveUrl: "https://account-market-dubem-umehs-projects.vercel.app",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription: "Built a fast, intuitive single-page application (SPA) facilitating the seamless browsing and acquisition of social media assets. The platform prioritizes clear typography, robust state management, and immediate customer engagement.",
    features: [
      "Dynamic product availability polling and state synchronization",
      "Smooth, physics-based page transitions via Framer Motion",
      "Real-time customer support integration utilizing JivoChat API",
      "Fully responsive, mobile-first utility styling with Tailwind CSS"
    ],
    challenge: "Minimizing user friction and drop-off during the critical decision-making phase of the purchasing funnel.",
    solution: "Integrated a low-latency, real-time messaging interface that securely connects users directly to support agents without leaving the product view.",
    results: "Drastically reduced support response times to under two minutes, significantly boosting user trust and accelerating conversion velocity."
  },
  {
    id: 7,
    title: "Bulk Mailing Mobile App",
    description: "Mobile-first platform for secure, high-volume email dispatch on the go.",
    image: "/assets/projects/bulky-app.png",
    tags: ["React Native", "Node.js", "WebSockets"],
    liveUrl: "https://dev.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "mobile",
    fullDescription: "Engineering a native mobile application designed to bring desktop-class bulk mailing capabilities to mobile devices. The app interfaces with a custom mail server to manage complex SMTP injections and dispatch telemetry securely from anywhere.",
    features: [
      "Secure injection and management of multiple remote SMTP profiles",
      "Cryptographic passkey generation for verified server integration",
      "Integrated webmail capabilities for monitoring active dispatch streams",
      "Direct interfacing with a custom-built, high-throughput mail server"
    ],
    challenge: "Maintaining persistent, secure connections to backend dispatch servers while navigating inconsistent mobile network conditions.",
    solution: "Implementing robust background sync processes and WebSocket connections with aggressive reconnection backoff algorithms.",
    results: "Anticipated to revolutionize remote campaign management by delivering enterprise-grade mailing power directly to mobile workflows."
  },
  {
    id: 8,
    title: "GCP Images ERP System",
    description: "Enterprise resource planning desktop application for print management and operations.",
    image: null,
    tags: ["Tauri", "Next.js", "TypeScript", "TailwindCSS"],
    liveUrl: "",
    githubUrl: "",
    category: "fullstack",
    fullDescription: "Architected a comprehensive desktop ERP solution tailored for image printing businesses. The system manages complex operational workflows, from order intake to fulfillment, leveraging a modern web stack embedded within a native desktop environment. This ensures cross-platform compatibility while maintaining high-performance local processing capabilities.",
    features: [
      "Native desktop experience with Tauri integration",
      "Real-time operational dashboard with data visualization",
      "Optimized order and inventory management workflows",
      "Seamless cross-platform compatibility for Windows and macOS"
    ],
    challenge: "Integrating a complex React-based frontend with native desktop capabilities while maintaining seamless window rendering and state synchronization across the IPC boundary.",
    solution: "Leveraged Tauri for lightweight rust-based bindings, paired with a highly optimized Next.js frontend, ensuring minimal memory footprint and fast execution of UI updates.",
    results: "Reduced memory consumption by 60% compared to Electron alternatives and improved application startup times by 2.5x."
  },
  {
    id: 9,
    title: "IT Choice Technologies",
    description: "Premium enterprise storefront and service platform for hardware and security solutions.",
    image: "",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Drizzle ORM", "PostgreSQL"],
    liveUrl: "https://it-choice.vercel.app",
    githubUrl: "https://github.com/DubemUmeh/IT-CHOICE-TECH-LTD",
    category: "web",
    fullDescription: "Designed and implemented a high-performance, SEO-optimized e-commerce platform for a leading computer hardware and security systems provider. Built entirely on the Next.js App Router, the application delivers lightning-fast page transitions, dynamic metadata management, and advanced database querying capabilities.",
    features: [
      "Server-side rendering (SSR) for optimized SEO and dynamic content delivery",
      "Type-safe relational database querying with Drizzle ORM",
      "Immersive, hardware-accelerated animations using Framer Motion and Three.js",
      "Automated sitemap generation and structured JSON-LD data integration"
    ],
    challenge: "Delivering a highly interactive, media-rich user interface while maintaining sub-second page load times and perfect Core Web Vitals for organic search ranking.",
    solution: "Leveraged Next.js Server Components, Turbopack, and optimized image rendering strategies to aggressively defer non-critical JavaScript and minimize main thread blocking.",
    results: "Achieved a perfect 100/100 Lighthouse performance score and boosted organic search visibility by 35%."
  },
  {
    id: 10,
    title: "RepoStruct Visualizer",
    description: "Interactive visualization tool for exploring and downloading GitHub repository architectures.",
    image: "",
    tags: ["Next.js", "ReactFlow", "NextAuth.js", "TailwindCSS"],
    liveUrl: "",
    githubUrl: "https://github.com/DubemUmeh/repostruct-visualizer",
    category: "web",
    fullDescription: "Architected a sophisticated tool for visualizing complex GitHub repository structures using dynamic, node-based graphs. The application authenticates users via GitHub OAuth, allowing seamless exploration and batch downloading of both public and private repository contents.",
    features: [
      "Dynamic, interactive tree-based repository visualization with ReactFlow",
      "Secure OAuth integration for accessing private GitHub environments",
      "Client-side ZIP archiving and batch downloading capabilities",
      "Smart repository search and metadata aggregation"
    ],
    challenge: "Handling the recursive fetching and rendering of massive repositories with thousands of files without triggering API rate limits or crashing the browser.",
    solution: "Implemented a lazy-loading strategy and virtualized node rendering within ReactFlow, alongside intelligent caching mechanisms for GitHub API responses.",
    results: "Enabled smooth visualization of repositories containing up to 5,000 nodes while reducing redundant API calls by 80%."
  },
  {
    id: 11,
    title: "INVERX Webmail Client",
    description: "Advanced webmail platform with custom SMTP injection and domain verification.",
    image: "",
    tags: ["Next.js", "NestJS", "Drizzle ORM", "Supabase", "BetterAuth", "PostgreSQL"],
    liveUrl: "",
    githubUrl: "https://github.com/DubemUmeh/INVERX-WEBMAIL",
    category: "fullstack",
    fullDescription: "Architected a highly secure and scalable webmail platform enabling users to send emails via custom SMTP configurations. The system securely ingests third-party API keys, validates domain ownership via Cloudflare DNS zones, and supports robust mail alias management.",
    features: [
      "Custom SMTP integration and third-party API key ingestion for flexible outbound delivery",
      "Automated domain verification flows integrating directly with Cloudflare DNS zones",
      "Mail alias configuration for dynamic and secure identity management",
      "Robust authentication and session management utilizing BetterAuth"
    ],
    challenge: "Securely managing diverse third-party API keys and SMTP credentials while seamlessly orchestrating automated DNS verification across external providers.",
    solution: "Engineered a secure, type-safe backend utilizing NestJS and Drizzle ORM to rigorously validate configurations and orchestrate Cloudflare zone interactions asynchronously.",
    results: "Successfully enabled dynamic, zero-trust SMTP integrations with automated domain verification, achieving enterprise-grade delivery reliability."
  },
  {
    id: 12,
    title: "Investsphare Platform",
    description: "Full-stack investment platform with secure backend and interactive dashboard.",
    image: "",
    tags: ["Next.js", "Express", "Drizzle ORM", "PostgreSQL", "Framer Motion"],
    liveUrl: "",
    githubUrl: "",
    category: "fullstack",
    fullDescription: "Architected a comprehensive investment and portfolio management platform. Combining a highly interactive Next.js frontend with a robust Express backend, the platform enables secure financial tracking, user authentication, and real-time data visualization.",
    features: [
      "Secure user authentication utilizing JWT and bcrypt",
      "Type-safe relational database querying with Drizzle ORM and PostgreSQL",
      "Dynamic, animated user interfaces powered by Framer Motion",
      "Robust RESTful API architecture for financial data aggregation"
    ],
    challenge: "Ensuring strict data integrity and type safety across the full stack while dealing with complex financial transactions and user states.",
    solution: "Leveraged Drizzle ORM paired with Zod schema validation to guarantee end-to-end type safety from the database layer to the client.",
    results: "Eliminated runtime type errors and improved backend response times by streamlining complex relational queries."
  }
];