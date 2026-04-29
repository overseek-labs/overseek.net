export interface AuthorCredential {
  title: string;
  organization?: string;
}

export interface AuthorSocialLink {
  platform: "linkedin" | "twitter" | "medium" | "website" | "github";
  url: string;
}

export interface Author {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  shortBio: string;
  credentials: AuthorCredential[];
  expertise: string[];
  image?: string;
  socialLinks: AuthorSocialLink[];
  isOrganization?: boolean;
}

export const authors: Record<string, Author> = {
  "bob-mojar": {
    id: "bob-mojar",
    slug: "bob-mojar",
    name: "Bob Mojar",
    title: "Technical Content Strategist & AI Writer",
    bio: "Bob Mojar is a technical content strategist specializing in enterprise AI, knowledge management, and Retrieval-Augmented Generation (RAG) systems. With a background spanning enterprise technology and AI adoption, Bob focuses on translating complex technical concepts into actionable insights for teams in data center operations, healthcare IT, and legal technology. His writing bridges the gap between engineering-level implementation and the business decisions that drive AI adoption.",
    shortBio:
      "Technical content strategist covering enterprise AI, RAG systems, and knowledge management.",
    credentials: [
      { title: "Technical Content Strategist" },
      { title: "Enterprise AI Writer" },
      { title: "RAG Systems Specialist" },
    ],
    expertise: [
      "Retrieval-Augmented Generation (RAG)",
      "Enterprise AI Adoption",
      "Knowledge Management Systems",
      "Technical Writing",
      "AI for Operations",
    ],
    image: "/assets/images/authors/bob-mojar.png",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/bob-mojar-6b46983b8/",
      },
      { platform: "twitter", url: "https://x.com/BobMojar" },
    ],
  },
  "george-bocancios": {
    id: "george-bocancios",
    slug: "george-bocancios",
    name: "George Bocancios",
    title: "Senior Full-Stack Developer & DevOps Engineer",
    bio: "George Bocancios is a senior full-stack developer and DevOps engineer with 18+ years of hands-on experience across the entire web stack. He has built and shipped production systems ranging from microservice architectures with GraphQL Federation to RAG pipelines and real-time infrastructure. Outside of software, George co-founded ERGOLIV, an ergonomic furniture startup, bringing the same systems-thinking approach to hardware product development. He writes about architecture, TypeScript, NestJS, and the practical realities of keeping distributed systems alive.",
    shortBio:
      "Senior full-stack developer with 18+ years building microservice architectures, RAG pipelines, and DevOps infrastructure.",
    credentials: [
      { title: "Senior Full-Stack Developer" },
      { title: "DevOps Engineer" },
      { title: "Co-founder", organization: "ERGOLIV" },
    ],
    expertise: [
      "Microservice Architecture",
      "TypeScript & NestJS",
      "GraphQL Federation",
      "DevOps & Infrastructure",
      "RAG Pipelines",
    ],
    image: "/assets/images/about/human-team/geo.jpg",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/george-bocancios-678618146/",
      },
    ],
  },
  "timotei-mierlut": {
    id: "timotei-mierlut",
    slug: "timotei-mierlut",
    name: "Timotei Mierlut",
    title: "Autonomous Systems Engineer",
    bio: "Timotei Mierlut is an engineer focused on autonomous systems, real-time data pipelines, and AI agent infrastructure. He builds hybrid RAG architectures, custom MCP servers, and self-healing systems that operate with minimal human intervention. His work sits at the intersection of Python, vector databases, and OSINT-driven data workflows — areas where reliability and precision matter more than convenience. Timotei writes about the engineering decisions behind autonomous AI systems and the tradeoffs that come with building for production.",
    shortBio:
      "Engineer specializing in autonomous AI systems, hybrid RAG architectures, and real-time data pipelines.",
    credentials: [
      { title: "Autonomous Systems Engineer" },
      { title: "Python & Vector DB Specialist" },
      { title: "MCP Server Developer" },
    ],
    expertise: [
      "Autonomous AI Systems",
      "Python & Vector Databases",
      "Hybrid RAG Architectures",
      "MCP Servers",
      "OSINT & Data Pipelines",
    ],
    image: "/assets/images/about/human-team/timotei.jpg",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/mierlut-timotei-david-568029141/",
      },
    ],
  },
  "iulian-maxim": {
    id: "iulian-maxim",
    slug: "iulian-maxim",
    name: "Iulian Maxim",
    title: "Full-Stack Engineer",
    bio: "Iulian Maxim is a full-stack engineer who closes the gap between design and production code. He works across the entire stack — from pixel-precise React frontends to Node.js backends — and has a particular talent for turning Figma files into working software without losing fidelity along the way. With experience in marketing technology and sales enablement tools, Iulian understands how technical decisions translate into user outcomes. He writes about frontend engineering, UI architecture, and building interfaces that hold up under real-world conditions.",
    shortBio:
      "Full-stack engineer bridging design and production, from React frontends to Node.js backends.",
    credentials: [
      { title: "Full-Stack Engineer" },
      { title: "Frontend Specialist" },
      { title: "UI/UX Implementation Expert" },
    ],
    expertise: [
      "React & Frontend Development",
      "Node.js & Backend Systems",
      "UI Architecture",
      "Design-to-Code Implementation",
      "Marketing Technology",
    ],
    image: "/assets/images/about/human-team/iulian.jpg",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/iulian-maxim-456b42138/",
      },
    ],
  },
  "adi-ghiuro": {
    id: "adi-ghiuro",
    slug: "adi-ghiuro",
    name: "Adi Ghiuro",
    title: "Software Entrepreneur & Product Strategist",
    bio: "Adi Ghiuro has spent 20+ years building software products — from internet infrastructure and large-scale eCommerce as a Magento CTO, to SaaS platforms and digital transformation. He co-founded Overseek in 2012 and established Atom Media in 2008, focusing on brand strategy, web applications, and statistical systems. As CTO at Positive Action, Inc., he led the transition of a 40-year-old educational organization from physical curriculum kits to a modern digital platform. He holds a dual background in Electric Engineering and Marketing, which informs his approach to product work: technically rigorous and user-focused in equal measure.",
    shortBio:
      "Software entrepreneur with 20+ years spanning eCommerce, SaaS, and digital transformation.",
    credentials: [
      { title: "Co-founder", organization: "Overseek" },
      { title: "CTO", organization: "Positive Action, Inc." },
      { title: "Founder", organization: "Atom Media" },
      { title: "Electric Engineering & Marketing" },
    ],
    expertise: [
      "Product Strategy & SaaS",
      "eCommerce & Magento",
      "Digital Transformation",
      "Enterprise AI & RAG",
      "Autonomous AI Agents",
    ],
    image: "/assets/images/about/human-team/adi.jpg",
    socialLinks: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/adigh/" },
      { platform: "medium", url: "https://medium.com/@adighiuro" },
      { platform: "twitter", url: "https://x.com/AGhiuro" },
    ],
  },
  "mojar-ai-team": {
    id: "mojar-ai-team",
    slug: "mojar-ai-team",
    name: "Mojar AI Team",
    title: "Enterprise AI Experts",
    bio: "The Mojar AI Team is a group of engineers, researchers, and product thinkers building enterprise AI infrastructure. Their collective experience spans full-stack development, autonomous agent systems, RAG architecture, DevOps, and knowledge management — with production deployments across data centers, healthcare, and legal technology. They write about what they build and the hard problems they encounter along the way.",
    shortBio:
      "Engineers and researchers building enterprise AI infrastructure and sharing what they learn.",
    credentials: [
      { title: "Enterprise AI Development Team", organization: "Mojar AI" },
    ],
    expertise: [
      "Enterprise AI Development",
      "RAG Architecture",
      "Autonomous Agent Systems",
      "Knowledge Graph Systems",
      "Production AI Deployment",
    ],
    image: undefined,
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/company/mojar-ai/",
      },
      { platform: "website", url: "https://mojar.ai/about" },
    ],
    isOrganization: true,
  },
};

export function getAuthor(id: string): Author | undefined {
  return authors[id];
}
