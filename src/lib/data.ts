interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  fullDescription: string;
  features: string[];
  challenge: string;
  solution: string;
  results?: string; // New field for client results
}

const projects: Project[] = [
  {
    id: 1,
    title: "Mini E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    image: "/assets/projects/glossy-affair.png",
    tags: ["ReactJs", "Stripe", "PostgreSQL", "Supabase Auth"],
    liveUrl: "https://glossy-affair.mandc2025.org",
    githubUrl: "https://github.com/DubemUmeh",
    category: "web",
    fullDescription:
      "A comprehensive e-commerce platform built for modern online retail of lip glosses.",
    features: [
      "Secure payment processing",
      "Real-time inventory tracking",
      "Customer dashboard",
      "Admin analytics panel",
    ],
    challenge:
      "Building a scalable system that could handle high traffic during sales events.",
    solution:
      "Implemented Supabase Auth and PostgreSql rendering with ReactJs and optimized database queries.",
    results:
      "Reduced checkout time by 30% and improved mobile conversion rates by 25%.",
  },
  {
    id: 2,
    title: "Wedding Website",
    description:
      "A comprehensive digital platform for wedding management and event details",
    image: "/assets/projects/wedding.png",
    tags: ["React", "Node.js", "MongoDB", "Cloudinary"],
    liveUrl: "https://mandc2025.org",
    githubUrl: "https://github.com/DubemUmeh",
    category: "web",
    fullDescription:
      "A powerful, responsive wedding website that showcases event details, RSVP forms, and a RECAP page highlighting the celebration's best moments.",
    features: [
      "Cloudinary image upload",
      "MongoDB fast url delivery",
      "RSVP form attendance",
    ],
    challenge: "Ensuring real-time image optimization across multiple devices.",
    solution:
      "Cloudinary image deliverability, optimization and responsiveness.",
    results:
      "Successfully handled 500+ RSVPs and delivered high-res images with <1s load time.",
  },
  {
    id: 3,
    title: "Bulk Mailing Platform v1",
    description:
      "Effortless mail delivery to multiple addresses with a single click",
    image: "/assets/projects/bulky.png",
    tags: ["ReactJs", "Node.js", "PostgreSQL"],
    liveUrl: "https://bulky.dev.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription:
      "A secure mailing platform that accepts SMTP details and allows sending emails to multiple addresses simultaneously.",
    features: [
      "Multiple SMTP injection",
      "Token/Passkey generating",
      "Unique passkey to identify SMTP to use integration",
    ],
    challenge:
      "Ensuring data security, preventing SQL injection attacks, and securely managing unique SMTP credentials.",
    solution: "Implemented data encryption and passkey based access control.",
    results:
      "Enabled businesses to send 10k+ emails daily with 99.9% uptime and zero security breaches.",
  },
  {
    id: 4,
    title: "Hydraulic Fittings Site",
    description: "One-stop shop for hoses and hydraulic fittings",
    image: "/assets/projects/joetech.png",
    tags: [
      "Next.Js",
      "TypeScript",
      "PostgreSql",
      "Framer-Motion",
      "Cloudinary",
    ],
    liveUrl: "https://dev.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription:
      "A professional responsive site/E-Commerce built for hydraulic fittings.",
    features: [
      "Equipment search & filters",
      "Virtual tours",
      "Agent messaging",
      "Admin Dashboard for shop items",
    ],
    challenge:
      "Managing a complex inventory with diverse product specifications and technical data.",
    solution:
      "Built a custom inventory management system linked to the frontend store.",
    results:
      "Streamlined inventory tracking, reducing manual errors by 80% and increasing online sales inquiries.",
  },
  {
    id: 5,
    title: "Wedding Anniversary Website",
    description: "A Silver Jubilee wedding anniversary platform",
    image: "/assets/projects/wedding-anniversary.png",
    tags: [
      "NextJs",
      "Framer-motion",
      "TypeScript",
      "GSAP",
      "Cloudinary",
      "Neon PostgreSql",
    ],
    liveUrl: "https://anniversary.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription:
      "A beautifully crafted wedding anniversary site showcasing the wonderful journey of the couple and their family.",
    features: [
      "Interactive Hero layout component",
      "Wishes page and Add wish form",
      "Gallery page displaying wonderful family moments and adventures",
      "Admin dashboard with protective sign-in page, wishes and gallery management",
    ],
    challenge:
      "Ensuring consistent Hero animation performance across different browsers.",
    solution:
      "Implemented a 'hasAnimationSupport' hero animation component for incompatible browsers.",
    results:
      "Created a memorable digital experience visited by 200+ guests, with flawless cross-browser performance.",
  },
  {
    id: 6,
    title: "Account Market Site",
    description: "A SPA for purchasing social media accounts",
    image: "/assets/projects/account-market.png",
    tags: ["ReactJs", "Framer-Motion", "TailwindCss", "Jivo Chats Message API"],
    liveUrl: "https://account-market-dubem-umehs-projects.vercel.app",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription:
      "Buying social media accounts is now easier with Account Market, designed for intuitive navigation and clear product descriptions.",
    features: [
      "Interactive Hero layout component",
      "Accounts availability",
      "Agent Messaging",
    ],
    challenge: "None was encountered.",
    solution: "Integrated real-time chat for instant customer support.",
    results:
      "Reduced customer support response time to under 2 minutes, boosting user trust and sales.",
  },
  {
    id: 7,
    title: "Bulk Mailing App",
    description: "Effortless mail delivery to multiple addresses on mobile",
    image: "/assets/projects/bulky-app.png",
    tags: ["Coming Soon"],
    liveUrl: "https://dev.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "mobile",
    fullDescription:
      "A secure mailing mobile application that allows utilizing multiple SMTPs for bulk emailing on the go.",
    features: [
      "Multiple SMTP injection",
      "Token/Passkey generating",
      "Unique passkey to identify SMTP to use integration",
      "Web Mail integration",
      "Custom Mail Server",
    ],
    challenge: "Coming Soon",
    solution: "",
    results:
      "Anticipated to bring desktop-class mailing power to mobile devices.",
  },
];

const posts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    excerpt:
      "Best practices for structuring large-scale React applications with maintainable architecture and optimal performance.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    category: "REACT",
    date: "MAR 15, 2024",
    readTime: "8 MIN",
    slug: "building-scalable-react-applications",
  },
  {
    id: 2,
    title: "Next.js 14: What's New and Why It Matters",
    excerpt:
      "Exploring the latest features in Next.js 14, including server actions, partial prerendering, and improved developer experience.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    category: "NEXT.JS",
    date: "MAR 10, 2024",
    readTime: "6 MIN",
    slug: "nextjs-14-whats-new",
  },
  {
    id: 3,
    title: "TypeScript Tips for Better Code Quality",
    excerpt:
      "Advanced TypeScript patterns and techniques to write more type-safe, maintainable code in your projects.",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    category: "TYPESCRIPT",
    date: "MAR 5, 2024",
    readTime: "10 MIN",
    slug: "typescript-tips",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Favor Nwankwo",
    role: "CEO, Simdi Glossy Affair",
    image: "",
    content:
      "Dubem transformed our vision into reality with exceptional skill and professionalism. The e-commerce platform he built exceeded all our expectations.",
  },
  {
    id: 2,
    name: "Charles Umeh",
    role: "CEO, IT Choice Tech",
    image: "",
    content:
      "Working with Dubem was a game changer for our project. His attention to detail, technical expertise, and ability to deliver on time made the entire process seamless.",
  },
  {
    id: 3,
    name: "Mr Joe",
    role: "CEO, Joetech Hydraulics",
    image: "",
    content:
      "One of the most talented developers I've worked with. Dubem's code quality is exceptional, and his problem-solving abilities are second to none",
  },
  // {
  // id: 4,
  // name: "David Park",
  // role: "CTO, DataFlow Systems",
  // image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  // content: "The analytics dashboard Dubem created for us is phenomenal. It handles massive datasets with ease and provides insights that have transformed our business decisions.",
  // },
  // {
  // id: 5,
  // name: "Lisa Thompson",
  // role: "Marketing Director, BrandWise",
  // image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
  // content: "Dubem doesn't just code; he understands business needs. His solutions are elegant, user-friendly, and always delivered with clear communication throughout the process.",
  // },
  // {
  // id: 6,
  // name: "James Wilson",
  // role: "VP Engineering, CloudScale",
  // image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  // content: "One of the most talented developers I've worked with. Dubem's code quality is exceptional, and his problem-solving abilities are second to none.",
  // },
];

export { projects, type Project, posts, testimonials };
