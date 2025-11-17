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
}

const projects: Project[] = [
  {
    id: 1,
    title: "Mini E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    image: "/assets/projects/glossy-affair.png",
    tags: ["ReactJs", "Stripe", "PostgreSQL", 'Supabase Auth'],
    liveUrl: "https://glossy-affair.mandc2025.org",
    githubUrl: "https://github.com/DubemUmeh",
    category: "web",
    fullDescription: "A comprehensive e-commerce platform built for modern online retail of lip glosses.",
    features: ["Secure payment processing", "Real-time inventory tracking", "Customer dashboard", "Admin analytics panel"],
    challenge: "Building a scalable system that could handle high traffic during sales events.",
    solution: "Implemented Supabase Auth and PostgreSql rendering with ReactJs and optimized database queries.",
  },
  {
    id: 2,
    title: "Wedding Website",
    description: "Collaborative project management tool for teams",
    image: "/assets/projects/wedding.png",
    tags: ["React", "Node.js", "MongoDB", 'Cloudinary'],
    liveUrl: "https://mandc2025.org",
    githubUrl: "https://github.com/DubemUmeh",
    category: "web",
    fullDescription: "A powerful Responsive wedding website, showcase event details, RSVP form, a RECAP page that showcases the highlight of the celebration.",
    features: ["Cloudinary image upload", "MongoDB fast url delivery", "RSVP form attendance"],
    challenge: "Ensuring real-time image optimization across multiple devices.",
    solution: "Cloudinary image deliverability, optimization and responsiveness.",
  },
  {
    id: 3,
    title: "Bulk Mailing Platform v1",
    description: "Easy mail delivering to multiple addresses at one click",
    image: "/assets/projects/bulky.png",
    tags: ["ReactJs", "Node.js", "PostgreSQL"],
    liveUrl: "https://bulky.dev.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription: "A secure mailing platform that accepts SMTP details and allows mailing multiple addresses at once",
    features: ["Multiple SMTP injection", "Token/Passkey generating", "Unique passkey to identify SMTP to use integration"],
    challenge: "Ensuring data security, Securing SMTP details against sql injection attack, Unique identifying SMTPs with passkeys",
    solution: "Implemented data encryption and passkey based access control.",
  },
  {
    id: 4,
    title: "Hydraulic Fittings Site",
    description: "Your one stop to your hose and hydraulic fittings",
    image: "/assets/projects/joetech.png",
    tags: ["Next.Js", 'TypeScript', "PostgreSql", 'Framer-Motion', "Cloudinary"],
    liveUrl: "https://dev.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription: "A professional responsive site/E-Commerce built for hydraulic fittings.",
    features: ["Equipment search & filters", "Virtual tours", "Agent messaging", 'Admin Dashboard for shop items'],
    challenge: "No challenges was recorded",
    solution: "",
  },
  {
    id: 5,
    title: "Wedding Anniversary Website",
    description: "A Silver Jubilee wedding anniversary",
    image: "/assets/projects/wedding-anniversary.png",
    tags: ["NextJs", "Framer-motion", "TypeScript", 'GSAP', 'Cloudinary', 'Neon PostgreSql'],
    liveUrl: "https://anniversary.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription: "A beautifully crafted wedding anniversary site showcase the wonderful journey of the lovely couple with their children.",
    features: ["Interactive Hero layout component", "Wishes page and Add wish form", "Gallery page displaying wonderful family moments and adventures", "Admin dashboard with protective sign-in page, wishes and gallery management"],
    challenge: "Hero animation cross browser integration.",
    solution: "Implemented a 'hasAnimationSupport' hero animation component for incompatible browsers.",
  },
  {
    id: 6,
    title: "Account Market Site",
    description: "A SPA for purchasing social media accounts",
    image: "/assets/projects/account-market.png",
    tags: ["ReactJs", "Framer-Motion", 'TailwindCss', 'Jivo Chats Message API'],
    liveUrl: "https://account-market-dubem-umehs-projects.vercel.app",
    githubUrl: "https://github.com/dubemUmeh",
    category: "web",
    fullDescription: "Buying social media accounts is now more easy with account market, created for easy site navigation and site description",
    features: ["Interactive Hero layout component", 'Accounts availability', 'Agent Messaging'],
    challenge: "None was encountered.",
    solution: "",
  },
  {
    id: 7,
    title: "Bulk Mailing App",
    description: "Easy mail delivering to multiple addresses at one click",
    image: "/assets/projects/bulky-app.png",
    tags: ["Coming Soon"],
    liveUrl: "https://dev.mandc2025.org",
    githubUrl: "https://github.com/dubemUmeh",
    category: "mobile",
    fullDescription: "A secure mailing App that accepts SMTP details and allows mailing multiple addresses at once",
    features: ["Multiple SMTP injection", "Token/Passkey generating", "Unique passkey to identify SMTP to use integration", "Web Mail integration", "Custom Mail Server"],
    challenge: "Coming Soon",
    solution: "",
  },
];


const posts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    excerpt: "Best practices for structuring large-scale React applications with maintainable architecture and optimal performance.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    category: "REACT",
    date: "MAR 15, 2024",
    readTime: "8 MIN",
    slug: "building-scalable-react-applications",
  },
  {
    id: 2,
    title: "Next.js 14: What's New and Why It Matters",
    excerpt: "Exploring the latest features in Next.js 14, including server actions, partial prerendering, and improved developer experience.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    category: "NEXT.JS",
    date: "MAR 10, 2024",
    readTime: "6 MIN",
    slug: "nextjs-14-whats-new",
  },
  {
    id: 3,
    title: "TypeScript Tips for Better Code Quality",
    excerpt: "Advanced TypeScript patterns and techniques to write more type-safe, maintainable code in your projects.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
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
  content: "Dubem transformed our vision into reality with exceptional skill and professionalism. The e-commerce platform he built exceeded all our expectations.",
  },
  {
  id: 2,
  name: "Charles Umeh",
  role: "CEO, IT Choice Tech",
  image: "",
  content: "Working with Dubem was a game changer for our project. His attention to detail, technical expertise, and ability to deliver on time made the entire process seamless.",
  },
  {
  id: 3,
  name: "Mr Joe",
  role: "CEO, Joetech Hydraulics",
  image: "",
  content: "One of the most talented developers I've worked with. Dubem's code quality is exceptional, and his problem-solving abilities are second to none",
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

export { projects, type Project, posts, testimonials }