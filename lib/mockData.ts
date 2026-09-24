export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  techStack: string[];
  shortDescription: string;
  problem: string;
  approach: string;
  outcome: string;
  features: string[];
  links: { github: string | null; live: string | null };
  coverImageUrl?: string;
  screenshotUrls?: string[];
  featured: boolean;
  order: number;
  status: 'published' | 'draft';
}

export interface OssTool {
  id: string;
  name: string;
  type: 'npm' | 'cli' | 'chrome-extension';
  description: string;
  githubUrl: string;
  liveUrl?: string;
  npmPackageName?: string;
  storeUrl?: string;
  downloads?: string;
  stars?: number;
  order: number;
  status: 'published' | 'draft';
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  location: string;
  bullets: string[];
  linkedProjectSlugs?: string[];
  order: number;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  headlineStats: { label: string; value: string }[];
  bio: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
  };
  resumeUrl: string;
}

export const INITIAL_SITE_CONFIG: SiteConfig = {
  name: "Sudipto Satpati",
  role: "Full-Stack Software Engineer",
  tagline: "I build production systems — and the open-source tools that make building them faster.",
  headlineStats: [
    { label: "Infra cost cut via AWS migration", value: "35%" },
    { label: "Open-source packages & tools shipped", value: "5+" },
    { label: "Page performance boost delivered", value: "20%" },
  ],
  bio: "Full-stack engineer with hands-on expertise building enterprise multi-warehouse systems, real-time sync platforms, serverless backend migrations, and high-performance open-source developer tooling.",
  email: "sudiptosatpatiofficial@gmail.com",
  phone: "9547680410",
  location: "Kolkata, India",
  socials: {
    github: "https://github.com/SudiptoSatpati",
    linkedin: "https://www.linkedin.com/in/sudiptosatpati",
    leetcode: "https://leetcode.com/u/sudiptosatpati/",
  },
  resumeUrl: "/resume.pdf",
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "scidms",
    slug: "scidms",
    title: "SCIDMS — Supply Chain Inventory & Distribution Management System",
    category: "Web Platform (Enterprise)",
    techStack: ["Angular 14", "Spring Boot", "Java 17", "PostgreSQL", "RxJS", "Spring Security", "JWT", "SCSS"],
    shortDescription: "Enterprise-grade multi-warehouse inventory and distribution platform featuring 6-tier RBAC, real-time dashboard analytics, and automated order fulfillment.",
    problem: "Fragmented multi-warehouse operations led to high order fulfillment delays and lack of real-time inventory tracking across distributed centers.",
    approach: "Architected a decoupled Angular 14 frontend backed by Java 17 Spring Boot microservices. Implemented 6-tier fine-grained RBAC with Spring Security JWT and reactive real-time telemetry dashboards.",
    outcome: "Streamlined inventory tracking, automated dispatch ledgers, and enabled public digital delivery verification across enterprise warehouse networks.",
    features: [
      "6-Tier Fine-Grained RBAC",
      "Real-time Analytics Dashboard",
      "Stock Receipt & Dispatch Ledgers",
      "Automated Order Fulfillment Engine",
      "Public Digital Delivery Verification"
    ],
    links: {
      github: "https://github.com/SudiptoSatpati",
      live: null,
    },
    featured: true,
    order: 1,
    status: "published",
  },
  {
    id: "docsync",
    slug: "docsync",
    title: "DocSync — Real-time Collaborative Document Editor",
    category: "Web Platform (Real-time Systems)",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Node.js", "Express.js", "Socket.io", "MongoDB", "Redis"],
    shortDescription: "Google Docs–style collaborative editor enabling live document synchronization, operational transformation, presence tracking, and version history.",
    problem: "Concurrent editing in distributed documents required sub-100ms latency conflict resolution and instant presence updates without overwhelming server resources.",
    approach: "Utilized WebSocket (Socket.io) for bidirectional operational transformation, Redis for session presence caching & document snapshot buffer, and MongoDB for persistent version history.",
    outcome: "Achieved smooth concurrent editing for multiple simultaneous sessions with instant synchronization and zero document state corruption.",
    features: [
      "Live Operational Sync via WebSockets",
      "Redis-Powered User Presence & Cursor Tracking",
      "Full Document Version History",
      "Rich Text Formatting & Export Controls"
    ],
    links: {
      github: "https://github.com/SudiptoSatpati",
      live: "https://github.com/SudiptoSatpati",
    },
    featured: true,
    order: 2,
    status: "published",
  },
  {
    id: "prepify-ai",
    slug: "prepify-ai",
    title: "Prepify.AI — AI-Powered Interview Preparation Platform",
    category: "AI Product",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Gemini AI", "Vapi AI"],
    shortDescription: "An AI-powered web app for interactive mock interview simulation with real-time voice feedback, Gemini AI evaluation, and comprehensive scoring analytics.",
    problem: "Traditional interview prep lacks real-time conversational voice interaction and actionable, personalized feedback tailored to candidate experience level.",
    approach: "Integrated Vapi AI for low-latency voice streaming input/output paired with Google Gemini AI for dynamic question generation, candidate speech analysis, and rubric-based scoring.",
    outcome: "Delivered interactive mock technical interviews with instant detailed speech, response quality, and structural analytics.",
    features: [
      "Real-time Voice Conversation via Vapi AI",
      "Adaptive Question Generation with Gemini AI",
      "Comprehensive AI Performance Reports",
      "Domain-specific Tech Interview Tracks"
    ],
    links: {
      github: "https://github.com/SudiptoSatpati",
      live: "https://github.com/SudiptoSatpati",
    },
    featured: true,
    order: 3,
    status: "published",
  }
];

export const INITIAL_OSS_TOOLS: OssTool[] = [
  {
    id: "import-cleaner",
    name: "Import Cleaner",
    type: "npm",
    description: "Scans and automatically removes unused JavaScript/TypeScript imports for cleaner codebases.",
    githubUrl: "https://github.com/SudiptoSatpati",
    liveUrl: "https://www.npmjs.com/package/import-cleaner",
    npmPackageName: "import-cleaner",
    downloads: "1.2k/wk",
    stars: 48,
    order: 1,
    status: "published",
  },
  {
    id: "env-guard-v2",
    name: "ENV Guard V2",
    type: "npm",
    description: "Detects missing or unused environment variables across dev/prod setups and generates detailed config reports.",
    githubUrl: "https://github.com/SudiptoSatpati",
    liveUrl: "https://www.npmjs.com/package/env-guard-v2",
    npmPackageName: "env-guard-v2",
    downloads: "850/wk",
    stars: 32,
    order: 2,
    status: "published",
  },
  {
    id: "api-tester",
    name: "API Tester CLI",
    type: "cli",
    description: "CLI utility for testing REST APIs directly from the terminal with syntax-highlighted responses & JSON validation.",
    githubUrl: "https://github.com/SudiptoSatpati",
    liveUrl: "https://github.com/SudiptoSatpati",
    npmPackageName: "api-tester-cli",
    downloads: "640/wk",
    stars: 29,
    order: 3,
    status: "published",
  },
  {
    id: "quick-qr-generator",
    name: "Quick QR Generator",
    type: "chrome-extension",
    description: "Instantly creates customizable QR codes for the current active webpage via a lightweight Chrome popup interface.",
    githubUrl: "https://github.com/SudiptoSatpati",
    storeUrl: "https://chrome.google.com/webstore",
    stars: 18,
    order: 4,
    status: "published",
  },
  {
    id: "secure-password-manager",
    name: "Secure Password Manager",
    type: "chrome-extension",
    description: "AES-256 encrypted browser credential manager featuring zero-knowledge local storage and auto-fill support.",
    githubUrl: "https://github.com/SudiptoSatpati",
    storeUrl: "https://chrome.google.com/webstore",
    stars: 24,
    order: 5,
    status: "published",
  }
];

export const INITIAL_EXPERIENCE: ExperienceItem[] = [
  {
    id: "tcs",
    company: "Tata Consultancy Services",
    role: "Systems Engineer",
    startDate: "2026-06",
    endDate: null,
    location: "Kolkata, India",
    bullets: [
      "Trained in Java Full Stack Development through the TCS Initial Learning Program (ILP), with hands-on experience in Core Java, Spring Boot, Angular, PostgreSQL, SQL, TypeScript, RxJS, and Spring Security.",
      "Built an enterprise-grade multi-warehouse inventory and distribution platform (SCIDMS) using Angular 14, Spring Boot, Java 17, and PostgreSQL, implementing end-to-end inventory and order management workflows.",
      "Architected fine-grained 6-tier RBAC security models to streamline user permissions across distributed logistics networks."
    ],
    linkedProjectSlugs: ["scidms"],
    order: 1,
  },
  {
    id: "aponiar",
    company: "Aponiar Solution Pvt Ltd",
    role: "Junior Software Developer",
    startDate: "2025-02",
    endDate: "2026-04",
    location: "Kolkata, India",
    bullets: [
      "Migrated backend architecture from Node.js monolith to AWS Serverless (Lambda + API Gateway), improving scalability and cutting infrastructure costs by 35%.",
      "Designed and implemented major UI features in Next.js + React, boosting page performance by 20%.",
      "Contributed to a large-scale React framework library, developing reusable UI modules such as Forms, Accordions, Grids, and Code Editors.",
      "Integrated AG Grid, CKEditor, Formik, and Shadcn UI, enabling config-driven and reusable UI structures across products.",
      "Engineered a Notification Template System allowing dynamic creation, live preview, and automated delivery of email & in-app alerts."
    ],
    order: 2,
  }
];

export const SKILLS_DATA = [
  {
    category: "Frontend",
    skills: ["Angular", "React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Redux Toolkit", "Zustand", "Tailwind CSS", "AG Grid", "RxJS"]
  },
  {
    category: "Backend & Cloud",
    skills: ["Spring Boot", "Core Java (17)", "Node.js", "Express.js", "AWS Lambda (Serverless)", "Firebase (BaaS)", "RESTful APIs", "WebSocket (Socket.io)"]
  },
  {
    category: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firestore"]
  },
  {
    category: "Tools & DevOps",
    skills: ["Git & GitHub", "Postman", "NPM / CLI Tooling", "AWS Console", "Figma", "Docker Basics"]
  },
  {
    category: "Languages",
    skills: ["Java", "TypeScript", "JavaScript", "Python", "C"]
  }
];
