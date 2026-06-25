export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: string;
  span: "lg" | "md" | "sm";
};

export const projects: Project[] = [
  {
    id: "support-agent",
    title: "AI Customer Support Agent",
    category: "Conversational AI",
    description:
      "An autonomous support agent that resolves customer tickets end-to-end with retrieval-grounded answers, tool use, and human-in-the-loop escalation.",
    tags: ["LLM Orchestration", "RAG", "Evals"],
    accent: "var(--violet)",
    span: "lg",
  },
  {
    id: "smb-generator",
    title: "SMB Website Generator",
    category: "Generative Product",
    description:
      "Turns a few prompts into a fully deployed, brand-aware website for small businesses in under a minute.",
    tags: ["Generative UI", "Next.js", "0→1"],
    accent: "var(--cyan)",
    span: "md",
  },
  {
    id: "marketing-agent",
    title: "AI Marketing Strategy Agent",
    category: "Agentic Workflows",
    description:
      "A multi-agent system that researches markets, drafts campaigns, and ships content calendars on autopilot.",
    tags: ["Multi-Agent", "Planning", "Analytics"],
    accent: "var(--magenta)",
    span: "md",
  },
  {
    id: "security-assistant",
    title: "Security Knowledge Assistant",
    category: "Enterprise AI",
    description:
      "A secure, identity-aware copilot that answers complex security questions over private knowledge with full auditability.",
    tags: ["Identity", "Guardrails", "Enterprise"],
    accent: "var(--indigo)",
    span: "lg",
  },
];

export type TimelineItem = {
  year: string;
  title: string;
  org: string;
  description: string;
  accent: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "Now",
    title: "AI Product Leader",
    org: "Microsoft",
    description:
      "Leading 0→1 AI products from research to scaled launch — defining strategy, shipping agents, and aligning engineering, design, and GTM.",
    accent: "var(--violet)",
  },
  {
    year: "Journey",
    title: "Product Management",
    org: "Strategy & Growth",
    description:
      "Years of building customer-obsessed products — translating ambiguous problems into roadmaps, metrics, and shipped outcomes.",
    accent: "var(--indigo)",
  },
  {
    year: "Focus",
    title: "AI Product Development",
    org: "LLM Systems",
    description:
      "Designing evaluation-driven AI experiences: orchestration, retrieval, guardrails, and measurable model quality.",
    accent: "var(--cyan)",
  },
  {
    year: "Foundation",
    title: "PhD Research",
    org: "Applied Science",
    description:
      "Rigorous research training that grounds every product decision in evidence, experimentation, and first-principles thinking.",
    accent: "var(--magenta)",
  },
];

export type SkillCategory = {
  title: string;
  level: number;
  accent: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Product Management",
    level: 96,
    accent: "var(--violet)",
    skills: ["Strategy", "Roadmapping", "Discovery", "0→1", "Stakeholders"],
  },
  {
    title: "AI / LLM Systems",
    level: 92,
    accent: "var(--cyan)",
    skills: ["RAG", "Agents", "Evals", "Prompting", "Orchestration"],
  },
  {
    title: "Growth & Strategy",
    level: 88,
    accent: "var(--indigo)",
    skills: ["GTM", "Positioning", "Experimentation", "Funnels"],
  },
  {
    title: "Security & Identity",
    level: 84,
    accent: "var(--magenta)",
    skills: ["AuthN/Z", "Guardrails", "Compliance", "Threat Modeling"],
  },
  {
    title: "Data & Analytics",
    level: 90,
    accent: "var(--violet)",
    skills: ["Metrics", "SQL", "A/B Testing", "Dashboards"],
  },
];

export const socials = {
  email: "hello@anjusingh.ai",
  linkedin: "https://www.linkedin.com/",
  resume: "/resume.pdf",
};
