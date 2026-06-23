// Central content data for Delentia Labs
import type { ResearchPaper, BlogPost, TeamMember } from "./types"

export const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "FDIA Equation and Constitutional AI: From Intent to Verifiable Output",
    authors: ["Ittirit Saengow"],
    date: "2026-03-21",
    category: "systems",
    abstract: "An implementation-grounded paper explaining how the FDIA equation turns intent into a governed execution path with verification, disclosure, and enterprise controls.",
    tags: ["FDIA", "Constitutional AI", "Verification"],
    downloadUrl: "/whitepaper",
    citationText: "Saengow, I. (2026). FDIA Equation and Constitutional AI: From Intent to Verifiable Output.",
  },
  {
    id: "2",
    title: "JITNA RFC-001 v2.0: Open Protocol for Agentic AI Negotiation",
    authors: ["Ittirit Saengow", "RCT Research Desk"],
    date: "2026-03-21",
    category: "mathematics",
    abstract: "Formal protocol documentation for AI-to-AI negotiation, signed execution, replay safety, and structured intent exchange in enterprise systems.",
    tags: ["JITNA", "Protocol", "Agentic AI"],
    downloadUrl: "/protocols/jitna-rfc-001",
    citationText: "Saengow, I., & RCT Research Desk. (2026). JITNA RFC-001 v2.0: Open Protocol for Agentic AI Negotiation.",
  },
  {
    id: "3",
    title: "RCTDB v2.0 and Delta Engine: Persistent Memory with 91.5% Measured Compression (Design Floor ≥74%)",
    authors: ["Ittirit Saengow"],
    date: "2026-03-21",
    category: "ethics",
    abstract: "A technical paper describing how persistent enterprise memory, provenance tracking, and Delta Engine compression support governed AI workloads.",
    tags: ["RCTDB", "Memory", "Compression"],
    downloadUrl: "/blog/rctdb-8-dimensional-memory-architecture",
    citationText: "Saengow, I. (2026). RCTDB v2.0 and Delta Engine: Persistent Memory with 91.5% Measured Compression (Design Floor ≥74%).",
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "fdia-equation-explained",
    title: "FDIA Equation Explained: Why Verifiable AI Starts with Intent",
    author: "Ittirit Saengow",
    date: "2026-03-21",
    category: "philosophy",
    excerpt: "How the FDIA equation defines the path from intent to action and why architectural verification matters more than prompt tricks.",
    content: "See the public article archive for the maintained long-form version of this topic.",
    tags: ["FDIA", "Verification", "Architecture"],
    readTime: 5,
  },
  {
    id: "2",
    slug: "signedai-multi-llm-consensus-explained",
    title: "SignedAI Multi-LLM Consensus Explained",
    author: "RCT Research Desk",
    date: "2026-03-21",
    category: "research",
    excerpt: "A public-safe explanation of multi-model verification, disagreement logging, and why measured hallucination control matters in enterprise AI.",
    content: "See the public article archive for the maintained long-form version of this topic.",
    tags: ["SignedAI", "Consensus", "Safety"],
    readTime: 8,
  },
  {
    id: "3",
    slug: "thai-ai-platform-vision-2030",
    title: "Thailand AI Platform Vision 2030",
    author: "Ittirit Saengow",
    date: "2026-03-21",
    category: "news",
    excerpt: "Why sovereign constitutional AI infrastructure matters for Thailand and how Delentia Labs frames the path to national AI capability.",
    content: "See the public article archive for the maintained long-form version of this topic.",
    tags: ["Thailand", "AI Infrastructure", "Strategy"],
    readTime: 7,
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ittirit Saengow",
    title: "Founder, Sole Developer, and Primary Author",
    bio: "Creator of Delentia OS, FDIA equation, JITNA protocol, and the 7 Genome System. Builds the platform from Bangkok, Thailand.",
    socials: {
      github: "https://github.com/ittirit720",
      linkedin: "https://www.linkedin.com/in/ittirit-saengow/",
    },
  },
  {
    id: "2",
    name: "Delentia Research Desk",
    title: "Editorial Review and Research Operations",
    bio: "Editorial desk used for review, disclosure, and evidence framing. Core technical authorship remains attributed to Ittirit Saengow.",
    socials: {
      github: "https://github.com/ittirit720",
      linkedin: "https://www.linkedin.com/in/ittirit-saengow/",
    },
  },
]
