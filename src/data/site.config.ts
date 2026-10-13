// src/data/site.config.ts

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  heroKicker: string;
  headlineLine1: string;
  headlineLine2: string;
  introduction: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  profiles: {
    github: string;
    linkedin: string;
    leetcode: string;
    hackerrank: string;
    geeksforgeeks: string;
    instagram: string;
    email: string | null;
  };
  navItems: NavItem[];
  verifiedTechnicalInterests: string[];
}

export const siteConfig: SiteConfig = {
  name: "Arthik Dwivedi",
  role: "AI/ML Engineer | AI Developer | B.Tech Student",
  heroKicker: "AI/ML ENGINEER IN THE MAKING",
  headlineLine1: "Engineering Intelligence.",
  headlineLine2: "Building What Comes Next.",
  introduction:
    "I'm Arthik Dwivedi, an AI/ML student passionate about building intelligent applications, exploring machine learning, and transforming real-world problems into practical technology solutions.",
  primaryCta: {
    label: "Explore My Projects",
    href: "#projects",
  },
  secondaryCta: {
    label: "Let's Connect",
    href: "#contact",
  },
  profiles: {
    github: "https://github.com/ARTHIK22",
    linkedin: "https://www.linkedin.com/in/arthik-dwivedi",
    leetcode: "https://leetcode.com/u/8417996304/",
    hackerrank: "https://www.hackerrank.com/profile/at_dvd123",
    geeksforgeeks: "https://www.geeksforgeeks.org/profile/atdvdk0dh?tab=activity",
    instagram: "https://www.instagram.com/_arthik_22/",
    email: null, // Omitted per instructions: do not invent email
  },
  navItems: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "GitHub", href: "#github" },
    { label: "Contact", href: "#contact" },
  ],
  verifiedTechnicalInterests: [
    "Machine Learning & Unsupervised Systems",
    "Generative AI & LLM Rubric Evaluation",
    "Dependency Graph & Supply Chain Intelligence",
    "FastAPI & Full-Stack Systems",
  ],
};
