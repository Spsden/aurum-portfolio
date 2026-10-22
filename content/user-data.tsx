import { Project } from "@/types/project.t";
import { TraitsPage } from "@/types/traints.t";

export const BETA = false;

export const USER_DATA = {
  name: "Kanak Maheshwari",

  prefix: "Hi, I'm Kanak",

  jobTitle: "Backend & AI Engineer",

  org: "WorkTrace AI",

  location: "Sydney, NSW, Australia",

  email: "kanak26102002@gmail.com",

  phone: "+61 435 827 747",

  github: "https://github.com/KanakMaheshwari",

  linkedin: "https://www.linkedin.com/in/kanak420/",

  twitter: "",

  instagram: "",

  facebook: "",

  resume: "/KanakResume-general-final.pdf",
};

export const TAG_LINES = {
  // check for hero.tsx for impl
  heroSection: {
    sentence:
      "Backend & AI Engineer building distributed services, retrieval pipelines, and production-ready LLM applications.",

    highlight: [
      "Backend",
      "AI",
      "distributed",
      "retrieval",
      "pipelines,",
      "production-ready",
      "LLM",
      "applications.",
    ],
  },

  subText: {
    pre: `Master of Information Technology (AI) graduate from UNSW Sydney, with industry experience across backend engineering, asynchronous data pipelines, and production-oriented AI products.`,

    post: "Based in Sydney, Australia",
  },
};

export const IMAGES_PATH = {
  small_profile: "/profile/km.png",
};

export const TRAITS_PAGE: TraitsPage[] = [
  {
    date: "Sept 2025 – Present",
    heading: "Tutor at UNSW",
    intro:
      "As a Tutor at UNSW Sydney, I run tutorials and support undergraduate and postgraduate students through core computer science concepts, from algorithms and data structures to C programming.",
    subIntro: "Here are the key areas where I contribute:",
    image: "/backgrounds/exp.jpg",
    items: [
      {
        title: "Teaching core computer science",
        body: "Conducted tutorials covering algorithms, data structures, and C programming, guiding students through fundamental concepts with practical, worked examples.",
      },
      {
        title: "Assessment and code feedback",
        body: "Evaluated assignments and provided constructive feedback on code optimization, time and space complexity analysis, and programming best practices.",
      },
      {
        title: "Mentoring and debugging support",
        body: "Mentor students in debugging, software design principles, and systematic problem-solving through interactive tutorials and one-on-one support.",
      },
    ],
  },
  {
    date: "Dec 2025 – Feb 2026",
    heading: "Intern at Octane Software Solutions",
    intro:
      "At Octane Software Solutions I worked on AI-powered models and automation workflows, applying Python and IBM AI technologies to practical enterprise business processes.",
    subIntro: "Here are the key areas where I contributed:",
    image: "/backgrounds/card2.jpg",
    items: [
      {
        title: "AI-powered automation",
        body: "Developed AI models and automation workflows that support practical business processes and improve operational efficiency.",
      },
      {
        title: "Enterprise AI tooling",
        body: "Applied Python and IBM AI technologies to develop and test intelligent solutions, gaining hands-on experience with enterprise AI and automation tools.",
      },
      {
        title: "Team-based delivery",
        body: "Collaborated within a technical team to develop, test, and refine AI-driven solutions while strengthening debugging, problem-solving, and software development skills.",
      },
    ],
  },
  {
    date: "Feb 2024 – Apr 2024",
    heading: "Intern at PwC",
    intro:
      "At PwC India I built a machine learning solution that analysed employee datasets and generated data-driven employee benefit recommendations for consulting teams.",
    subIntro: "Here are the key areas where I contributed:",
    image: "/backgrounds/skets.jpg",
    items: [
      {
        title: "Machine learning for benefits analysis",
        body: "Developed a machine learning solution to analyse employee datasets and generate data-driven employee benefit recommendations.",
      },
      {
        title: "Data pipelines and feature engineering",
        body: "Built data preprocessing and feature engineering pipelines using Python, Pandas, SQL, and Excel to prepare enterprise datasets for model training.",
      },
      {
        title: "Model evaluation and visualisation",
        body: "Evaluated model performance through data analysis and visualisation, supporting informed business decision-making alongside consulting teams.",
      },
    ],
  },
];

export const EDUCATION = [
  {
    id: "unsw-mit-ai",
    degree: "Master of Information Technology",
    field: "Artificial Intelligence",
    institution: "University of New South Wales (UNSW Sydney)",
    location: "Sydney, Australia",
    period: "Aug 2026",
    status: "Completed",
    description:
      "Postgraduate study in Information Technology with a specialisation in Artificial Intelligence.",
  },
  {
    id: "vit-btech-cse-aiml",
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering — AI & Machine Learning",
    institution: "VIT Bhopal University",
    location: "Bhopal, India",
    period: "May 2024",
    status: "Completed",
    description:
      "Undergraduate engineering degree focused on artificial intelligence and machine learning.",
  },
] as const;

export const PROJECTS: Project[] = [
  {
    id: "worktrace-ai",
    title: "WorkTrace AI",
    subtitle: "AI-Powered Workflow Intelligence Platform",
    description:
      "An AI-powered workflow intelligence platform that captures real-world work activity and reconstructs it into structured, reviewable standard operating procedures.",
    bullets: [
      "Engineered an Electron desktop application to capture screen activity, user input events, and optional microphone audio for reconstructing real-world workflows.",
      "Built a FastAPI backend with authentication, tenant isolation, chunk-upload validation, workflow session management, and privacy sanitisation.",
      "Developed an asynchronous AI processing pipeline to analyse captured evidence, generate pointer annotations, align workflow steps, and produce structured SOPs.",
      "Integrated Whisper-based audio transcription to combine spoken context with visual workflow evidence during reconstruction.",
      "Built workflow review interfaces for processing status, transcripts, workflow metrics, generated SOPs, and annotated workflow steps.",
    ],
    image: "/backgrounds/cardbg1.jpg",
    imageAlt: "WorkTrace AI workflow intelligence platform",
    techs: [
      "Electron",
      "React",
      "Python",
      "FastAPI",
      "Whisper",
      "Docker",
      "TypeScript",
    ],
  },
  {
    id: "nltoregex",
    title: "NLtoRegex",
    subtitle: "Natural Language to Regex Platform",
    description:
      "A distributed backend platform that translates natural language instructions into executable regular-expression workflows at scale.",
    bullets: [
      "Designed and developed a distributed backend platform for large-scale data transformation using Django and RESTful APIs.",
      "Engineered asynchronous processing pipelines with Celery and Redis to handle long-running file processing tasks efficiently.",
      "Integrated Large Language Models (LLMs) to translate natural language instructions into executable regular-expression workflows.",
      "Developed scalable REST APIs for file uploads, job scheduling, execution tracking, and result retrieval.",
      "Containerized backend services using Docker to enable reproducible development and deployment across distributed environments.",
    ],
    image: "/backgrounds/card2.jpg",
    imageAlt: "NLtoRegex natural language to regex platform",
    techs: [
      "Python",
      "Django",
      "Celery",
      "Redis",
      "LLMs",
      "Docker",
      "REST APIs",
    ],
  },
  {
    id: "todays-news",
    title: "Today's News",
    subtitle: "AI News Aggregation & RAG Application",
    description:
      "A high-performance news platform that aggregates, summarises, and makes large news corpora semantically searchable.",
    bullets: [
      "Developed a high-performance FastAPI backend for intelligent news aggregation, processing, and retrieval.",
      "Built an automated pipeline to extract, clean, categorize, summarize, and store news articles from multiple sources.",
      "Designed scalable APIs enabling semantic search, AI-powered summarization, and conversational interactions over news content.",
      "Integrated SQLite for structured data storage and implemented RAG using FAISS for efficient vector similarity search.",
    ],
    image: "/backgrounds/card3.jpg",
    imageAlt: "Today's News AI aggregation application",
    techs: [
      "Python",
      "FastAPI",
      "FAISS",
      "RAG",
      "SQLite",
      "LangChain",
    ],
  },
  {
    id: "quoriopilot",
    title: "QurioPilot",
    subtitle: "AI-Powered Learning Platform",
    description:
      "An AI-powered learning platform with personalised paths, generated quizzes, and conversational tutoring. Second place at the UNSW CSESoc Hackathon.",
    bullets: [
      "Engineered FastAPI backend services powering AI-driven personalized learning workflows.",
      "Integrated locally hosted LLaMA models through Ollama to deliver real-time conversational AI capabilities.",
      "Designed scalable APIs connecting the React frontend with AI inference services and personalized learning modules.",
      "Developed interactive learning features including AI-generated quizzes, adaptive learning paths, and educational mini-games.",
      "Deployed backend services on Render and frontend applications on Vercel for end-to-end delivery.",
    ],
    image: "/backgrounds/card4.jpg",
    imageAlt: "QurioPilot AI learning platform",
    techs: [
      "Python",
      "FastAPI",
      "React",
      "Ollama",
      "LLaMA",
      "Vercel",
      "Render",
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    title: "2nd Place — UNSW CSESoc Hackathon",
    body: "Built QurioPilot, an AI-powered learning platform, and placed second at the UNSW CSESoc Hackathon.",
  },
  {
    title: "Football Team Captain",
    body: "Captained the football team for two consecutive years and led the side to first place.",
  },
  {
    title: "State-Level Swimmer",
    body: "Competed as a state-level swimmer alongside full-time engineering studies.",
  },
] as const;

export const FOOTER_DATA = {
  title: "Oh, hello.",

  description:
    "Feel free to reach out about backend engineering, AI systems, or just a friendly hello.",

  email: USER_DATA.email,
  socials: [
    ...(USER_DATA.github ? [{ name: "GitHub", url: USER_DATA.github }] : []),
    ...(USER_DATA.linkedin
      ? [{ name: "LinkedIn", url: USER_DATA.linkedin }]
      : []),
    ...(USER_DATA.resume ? [{ name: "Resume", url: USER_DATA.resume }] : []),
  ],
  image: "/backgrounds/footer.jpg",
};
