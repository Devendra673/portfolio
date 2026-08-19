export interface Project {
  title: string;
  domain: string;
  /** e.g. "Solo project", "Team project", "Solo project · MCA thesis" */
  role: string;
  description: string;
  highlights: string[];
  challenge: string;
  tech: string[];
  liveUrl?: string;
  sourceUrl?: string;
  accent: string;
  /** Preview screenshot revealed on card hover. Files live in /public/projects/. */
  image?: { src: string; alt: string };
  /** Featured projects occupy a larger tile in the bento grid. */
  featured?: boolean;
}

/**
 * Proficiency tiers, borrowed from the confidence-tier vocabulary used in
 * SecureHall-RAG (HIGH / MODERATE / LOW). Reusing that language here keeps the
 * design system rooted in my own work rather than being decorative.
 */
export type SkillLevel = "core" | "strong" | "familiar";

export const skillLevelMeta: Record<
  SkillLevel,
  { label: string; description: string }
> = {
  core: { label: "Core", description: "Daily driver, used in production work" },
  strong: { label: "Strong", description: "Shipped features with it" },
  familiar: { label: "Familiar", description: "Working knowledge" },
};

export type SkillGroup =
  | "language"
  | "frontend"
  | "backend"
  | "ai"
  | "infra";

export const skillGroupMeta: Record<SkillGroup, { label: string }> = {
  language: { label: "Languages" },
  frontend: { label: "Frontend" },
  backend: { label: "Backend" },
  ai: { label: "AI / ML" },
  infra: { label: "Infra" },
};

export interface SkillNode {
  id: string;
  label: string;
  group: SkillGroup;
  level: SkillLevel;
}

/** Nodes for the skills constellation. */
export const skillNodes: SkillNode[] = [
  // Languages
  { id: "python", label: "Python", group: "language", level: "core" },
  { id: "ts", label: "TypeScript", group: "language", level: "core" },
  { id: "js", label: "JavaScript", group: "language", level: "core" },
  { id: "sql", label: "SQL", group: "language", level: "strong" },
  { id: "cpp", label: "C++", group: "language", level: "familiar" },
  { id: "java", label: "Java", group: "language", level: "familiar" },

  // Frontend
  { id: "react", label: "React", group: "frontend", level: "core" },
  { id: "next", label: "Next.js", group: "frontend", level: "core" },
  { id: "tailwind", label: "Tailwind", group: "frontend", level: "core" },
  { id: "zustand", label: "Zustand", group: "frontend", level: "familiar" },

  // Backend
  { id: "fastapi", label: "FastAPI", group: "backend", level: "core" },
  { id: "flask", label: "Flask", group: "backend", level: "strong" },
  { id: "node", label: "Node.js", group: "backend", level: "familiar" },
  { id: "sqlite", label: "SQLite", group: "backend", level: "strong" },
  { id: "postgres", label: "PostgreSQL", group: "backend", level: "familiar" },

  // AI / ML
  { id: "rag", label: "RAG", group: "ai", level: "core" },
  { id: "faiss", label: "FAISS", group: "ai", level: "core" },
  { id: "bm25", label: "BM25", group: "ai", level: "strong" },
  { id: "sklearn", label: "scikit-learn", group: "ai", level: "strong" },
  { id: "whisper", label: "Whisper", group: "ai", level: "strong" },
  { id: "nli", label: "NLI / DeBERTa", group: "ai", level: "strong" },
  { id: "bedrock", label: "AWS Bedrock", group: "ai", level: "strong" },
  { id: "ollama", label: "Ollama", group: "ai", level: "strong" },
  { id: "sbert", label: "Sentence Transformers", group: "ai", level: "strong" },

  // Infra
  { id: "docker", label: "Docker", group: "infra", level: "strong" },
  { id: "git", label: "Git", group: "infra", level: "core" },
  { id: "aws", label: "AWS", group: "infra", level: "familiar" },
  { id: "esp32", label: "ESP32", group: "infra", level: "familiar" },
];

/**
 * Edges describe how I actually combine these tools, not arbitrary links.
 * Hovering a node lights up the path it belongs to.
 */
export const skillEdges: ReadonlyArray<readonly [string, string]> = [
  // Python stack
  ["python", "fastapi"],
  ["python", "flask"],
  ["python", "sklearn"],
  ["python", "whisper"],
  // Retrieval pipeline
  ["fastapi", "rag"],
  ["rag", "faiss"],
  ["rag", "bm25"],
  ["rag", "nli"],
  ["faiss", "sbert"],
  ["rag", "ollama"],
  ["rag", "bedrock"],
  // Frontend stack
  ["ts", "react"],
  ["react", "next"],
  ["next", "tailwind"],
  ["react", "zustand"],
  ["js", "react"],
  // Data
  ["fastapi", "sqlite"],
  ["flask", "sqlite"],
  ["sql", "postgres"],
  ["sql", "sqlite"],
  // Infra
  ["docker", "fastapi"],
  ["docker", "flask"],
  ["aws", "bedrock"],
  ["git", "docker"],
  // Hardware
  ["cpp", "esp32"],
  ["esp32", "flask"],
  // Cross links
  ["next", "fastapi"],
  ["ts", "next"],
  ["java", "sql"],
];

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const siteConfig = {
  name: "Devendra",
  title: "Full Stack Developer & AI Engineer",
  tagline: "I build intelligent systems for the web.",
  description:
    "I develop AI-powered applications across NLP, retrieval-augmented generation, IoT, and speech technologies — bridging machine learning with clean, user-facing products.",
  email: "devendradevendra562@gmail.com",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/Devendra673",
  linkedin: "https://www.linkedin.com/in/devendra-664a02306",
  location: "Bangalore, India",
  availability: "Open to full-time roles · Remote or on-site",
  /**
   * Canonical site URL, used for metadata, sitemap, robots and OG images.
   * Override with NEXT_PUBLIC_SITE_URL if the domain changes.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devendra-dev.vercel.app",
};

export const roles = [
  "Full Stack Developer",
  "AI Engineer",
  "ML Enthusiast",
  "Problem Solver",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { label: "Projects Shipped", value: 4 },
  { label: "Internships", value: 2 },
  { label: "Years Coding", value: 5 },
  { label: "AI Domains", value: 4 },
];

export const timeline = [
  {
    year: "2021",
    title: "Started BCA",
    description: "Began computer science fundamentals at AES National Degree College, Gauribidanur.",
  },
  {
    year: "2023",
    title: "First Real Projects",
    description: "Built IoT air-quality monitoring system with ML analytics and started exploring AI/NLP.",
  },
  {
    year: "2024",
    title: "Started MCA at Dr. AIT",
    description: "Moved to Bangalore. Dived deep into AI engineering — RAG systems, speech tech, and full stack development.",
  },
  {
    year: "2025",
    title: "Built AI Products",
    description: "Shipped Resume-iq, Dubify-ai (team), and SecureHall-RAG. Explored production ML pipelines.",
  },
  {
    year: "2026",
    title: "Ready for the Industry",
    description: "MCA complete. Looking for opportunities to build intelligent systems at scale.",
  },
];

export const projects: Project[] = [
  {
    title: "ResumeIQ",
    domain: "NLP / Document Intelligence",
    role: "Built during internship · Delivered to client",
    description:
      "ATS optimisation platform that scores a resume against a job description, pinpoints missing skills, and rewrites weak bullets into STAR-format impact statements. 57 API endpoints behind a Next.js front end.",
    highlights: [
      "Five-layer skill matching — exact, alias, substring, embedding, then ontology graph — over 200+ alias mappings",
      "Four independent scorers: composite fit, experience progression, BM25 keyword density, and bullet presentation quality",
      "Claude Sonnet 4.5 via AWS Bedrock for bullet rewriting, cover letters and interview prep",
      "PDF and DOCX export across four templates, plus a live ATS score that updates as you type",
    ],
    challenge:
      "Sending every request to an LLM would have made the product expensive to run and slow. I kept all scoring and skill matching deterministic and local via FAISS and embeddings, so analysis is free and instant, and reserved paid Bedrock calls for generative features only — with per-token spend tracked on a usage endpoint.",
    tech: ["FastAPI", "Next.js", "FAISS", "AWS Bedrock", "Docker"],
    accent: "from-sky-400 to-cyan-400",
    image: {
      src: "/projects/resumeiq-analyzer.png",
      alt: "ResumeIQ analyzer landing page showing a 54 percent match score and job description keyword coverage",
    },
  },
  {
    title: "IoT Air Quality Monitor",
    domain: "IoT / Machine Learning",
    role: "Solo project",
    description:
      "Air-quality monitoring platform pairing Arduino sensors with a Flask backend. Live readings feed a Random Forest model that forecasts AQI 24 hours ahead and triggers alerts before conditions degrade.",
    highlights: [
      "Random Forest trained on 15,000+ samples, 95%+ accuracy under 5-fold cross-validation",
      "Arduino sketches reading MQ-135 air quality and DHT11 temperature/humidity over serial",
      "Hardened auth layer: rate limiting, account lockout, CSRF, session and device tracking",
      "Configurable AQI thresholds with Twilio SMS and WhatsApp alerts",
    ],
    challenge:
      "A hardware project is useless if it only runs with hardware attached. The backend detects when no Arduino is present and generates realistic sensor data instead, so the dashboard and ML predictions stay fully demonstrable.",
    tech: ["Python", "Flask", "scikit-learn", "ESP32", "SQLite"],
    sourceUrl: "https://github.com/Devendra673/IOT-Air_Monitor-ML",
    accent: "from-emerald-400 to-teal-400",
    image: {
      src: "/projects/iot-login.png",
      alt: "IoT Air Quality Monitoring System sign-in screen with username or mobile number login",
    },
  },
  {
    title: "Dubify AI",
    domain: "Speech AI / Translation",
    role: "Team of 3 · Built during internship",
    description:
      "Video and audio dubbing platform covering 22+ Indian languages. Upload media, review the transcription and translation side by side, then generate a dubbed audio track and matching subtitle file.",
    highlights: [
      "Accepts MP4, MP3, WAV and AVI, with dubbing across 22+ Indian languages",
      "Side-by-side original and translated text so output can be checked before dubbing",
      "Exports a dubbed MP3 track plus a timestamped .srt subtitle file",
      "Live voice translator with selectable target language for speech-to-speech translation",
    ],
    challenge:
      "Transcription quality collapses on noisy source audio, and everything downstream inherits the error. We added a noise-reduction and audio preprocessing stage ahead of Whisper so translation and dubbing start from a clean signal.",
    tech: ["Python", "Flask", "Whisper", "Gemini AI", "FFmpeg"],
    sourceUrl: "https://github.com/Devendra673/Dubify-ai",
    accent: "from-violet-400 to-fuchsia-400",
    image: {
      src: "/projects/dubify-upload.png",
      alt: "Dubify AI upload screen accepting MP4, MP3, WAV and AVI files for translation across 22 plus Indian languages",
    },
  },
  {
    title: "SecureHall-RAG",
    domain: "RAG / Applied Security",
    role: "Solo project · MCA thesis",
    description:
      "Retrieval-augmented Q&A over corporate policy documents, built on the premise that a confident wrong answer is the real failure. Runs locally through Ollama, with a verification layer that grades its own output before showing it.",
    highlights: [
      "Advanced retrieval: RAPTOR cluster summaries for global questions, multi-hop decomposition for comparative ones, and reciprocal rank fusion across LLM-generated query variants",
      "NLI entailment scoring with four-tier soft redaction — claims are flagged by support level rather than passed or killed outright",
      "Answer confidence surfaced as HIGH / MODERATE / LOW / ABSTAIN tiers, calibrated per query category and persisted across sessions",
      "Reproducible evaluation harness: hybrid retrieval P@1 of 1.000, and semantic detection lifting the attack-block rate from 54.8% to 61.3%",
    ],
    challenge:
      "Binary hallucination filtering throws away usable answers — a claim with 60% support is neither a fact nor a lie. I replaced hard accept/reject with four-tier soft redaction: well-supported claims pass untouched, mid-range claims carry visible warning flags, and only genuine contradictions below 0.25 entailment are redacted. A sentence-type classifier skips non-claim sentences, cutting verification overhead by roughly 40%.",
    tech: ["FastAPI", "Next.js", "FAISS", "Ollama", "NLI", "BM25"],
    accent: "from-amber-400 to-orange-400",
    featured: true,
    image: {
      src: "/projects/securehall-chat.png",
      alt: "SecureHall-RAG chat interface with ten policy documents loaded in the knowledge base and suggested starter questions",
    },
  },
];

export const about = {
  statement:
    "I build intelligent systems that bridge machine learning and real users — from NLP pipelines and secure RAG to IoT platforms and speech tech.",
  subtext:
    "Python ML backends • TypeScript frontends • C++ edge firmware • Containerized deployments. I take problems from raw data to polished interfaces.",
};

/**
 * Oversized statement that scrolls horizontally between sections.
 * Split into lines so each can move at a slightly different rate.
 */
export const kineticStatement = {
  lines: ["SYSTEMS THAT KNOW", "WHEN THEY'RE WRONG"],
  caption:
    "Confidence scoring, abstention, and verification — the parts that matter once a model leaves the notebook.",
};

export const marqueeItems = [
  "TypeScript",
  "Python",
  "React",
  "Next.js",
  "FastAPI",
  "Whisper",
  "FAISS",
  "scikit-learn",
  "RAG",
  "Docker",
  "Arduino",
  "Tailwind CSS",
];

export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    role: "AI/ML Intern",
    company: "DigitalTransols AI Pvt Ltd",
    period: "Apr 2026 — Aug 2026",
    summary:
      "Built and delivered ResumeIQ, an AI-powered ATS optimisation platform, end to end — from backend architecture through deployment on the company's AWS environment, with full source handover.",
    highlights: [
      "Designed and built a FastAPI backend exposing 57 endpoints across 11 route modules",
      "Built the Next.js 16 front end, including a resume builder with live ATS scoring",
      "Integrated AWS Bedrock (Claude Sonnet 4.5) for bullet rewriting, cover letters and interview prep",
      "Kept scoring deterministic and local via FAISS so per-request LLM cost stayed near zero",
      "Deployed to the company's AWS infrastructure and handed over the full source",
    ],
    tech: [
      "Python",
      "FastAPI",
      "TypeScript",
      "Next.js",
      "AWS Bedrock",
      "FAISS",
      "Docker",
    ],
  },
  {
    role: "Gen AI Intern",
    company: "Guruvidhya IT Services Pvt Ltd",
    period: "Sep 2025 — Nov 2025",
    summary:
      "Worked in a team of three building Dubify AI, a media dubbing platform covering 22+ Indian languages — transcribing uploaded audio and video, translating it, and generating dubbed audio with matching subtitles.",
    highlights: [
      "Integrated OpenAI Whisper for transcription and Google Gemini for translation across 22+ Indian languages",
      "Built the dubbing pipeline producing a dubbed MP3 track and timestamped .srt subtitle export",
      "Added a review step showing original and translated text side by side before dubbing runs",
      "Implemented a live voice translator with selectable target language",
    ],
    tech: ["Python", "Flask", "Whisper", "Gemini AI", "gTTS", "FFmpeg"],
  },
];

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  status?: string;
}

export const education: Education[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Dr. Ambedkar Institute of Technology (Dr. AIT)",
    location: "Bangalore",
    period: "2024 — 2026",
    score: "CGPA 8.32 / 10",
    status: "Awaiting results",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "AES National Degree College",
    location: "Gauribidanur",
    period: "2021 — 2024",
    score: "CGPA 9.01 / 10",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Devendra673",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/devendra-664a02306",
    icon: "linkedin",
  },
];
