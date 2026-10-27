export interface Project {
  id: "career" | "calaware" | "uno" | "vision";
  title: string;
  category: string;
  description: string;
  contribution: string;
  technologies: readonly string[];
  repository: string;
  demo?: string;
  image?: {
    path: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
}

export const profile = {
  name: "Chih Lin Chien",
  role: "Software developer",
  location: "Champaign, Illinois",
  email: "brianjienop49792399@gmail.com",
  github: "https://github.com/brianjien",
  linkedin: "https://www.linkedin.com/in/chih-lin-chien-517944207/",
  languages: "Mandarin (native), English (proficient)",
  introduction:
    "I’m a Master of Computer Science student at UIUC. I work on web applications, real-time systems, and computer vision. My coursework includes a literature review on bias in LLM résumé screening.",
  about: [
    "I studied computer science at Feng Chia University and San Francisco State University before starting my master’s at the University of Illinois Urbana-Champaign.",
    "At Moldex3D, I wrote Cypress tests for a web application. In my projects, I’ve worked on frontend interfaces, backend integrations, and computer vision. You can find the code and project details in the links above.",
  ],
  personal:
    "Outside class, I’ve played badminton with university clubs in Taiwan and San Francisco.",
} as const;

export const projects = [
  {
    id: "career",
    title: "Career Tracker",
    category: "Web application · React & Flask",
    description:
      "A dashboard for finding jobs, tracking applications, and organizing recruiting tasks. Includes eligibility signals for international students.",
    contribution:
      "React frontend, Flask API, and MySQL storage, with application pipelines, sprint planning, and recruiting analytics.",
    technologies: ["React", "Flask", "MySQL", "Google OAuth"],
    repository: "https://github.com/brianjien/career-tracker-dashboard",
    demo: "https://internship-tracker.wasmer.app",
    image: {
      path: "images/career-dashboard.jpg",
      alt: "Career Tracker dashboard showing a demo workspace with application statistics, a weekly sprint, and upcoming recruiting tasks.",
      caption:
        "Career Tracker dashboard. The screenshot uses a demo workspace with sample data.",
      width: 1265,
      height: 712,
    },
  },
  {
    id: "calaware",
    title: "CalAwareNow",
    category: "Team project · Frontend lead",
    description:
      "A student team project for looking up health, weather, wildfire, and safety information by California county.",
    contribution:
      "I led the frontend, built responsive pages with HTML and CSS, and helped connect Node.js services with Google Cloud.",
    technologies: ["JavaScript", "Node.js", "MySQL", "Google Cloud"],
    repository: "https://github.com/brianjien/CSC648-CalAwareNow",
  },
  {
    id: "uno",
    title: "Multiplayer UNO",
    category: "Course project · Real-time multiplayer",
    description:
      "A two-player browser game with shared rooms and synchronized game state.",
    contribution:
      "I worked on Socket.IO gameplay updates, PostgreSQL storage, and the login and registration pages.",
    technologies: ["JavaScript", "Socket.IO", "PostgreSQL"],
    repository: "https://github.com/brianjien/CSC667-UNO",
  },
  {
    id: "vision",
    title: "Traffic-Light Detection",
    category: "Course project · Computer vision",
    description:
      "A traffic-light detector using MATLAB, Python, and YOLO. Video is split into frames before detection and light-state classification.",
    contribution:
      "I worked on data preprocessing, model training, and labeling video frames.",
    technologies: ["MATLAB", "Python", "YOLO", "CNNs"],
    repository: "https://github.com/brianjien/Identify-Traffic-Lights",
    image: {
      path: "images/traffic-detection.png",
      alt: "Traffic-light detection project output with bounding boxes identifying two green traffic lights in a street scene.",
      caption:
        "A frame from the project video, with detected traffic lights marked in yellow.",
      width: 1640,
      height: 924,
    },
  },
] as const satisfies readonly Project[];

export const research = {
  title: "Bias and fairness in LLM résumé screening",
  category: "Coursework · Literature review · UIUC",
  summary:
    "For a course project at UIUC, I reviewed how LLMs evaluate résumés and where demographic bias can enter the process. The report covers studies on gender, race, national origin, disability, and intersectional bias in automated hiring.",
  contribution:
    "I compared auditing methods and fairness definitions across three screening approaches, organized mitigation strategies into a four-stage pipeline, and proposed acceptance criteria for future screening systems.",
  findings: [
    "Removing names can leave proxy signals in career gaps, vocabulary, and location, according to the studies reviewed.",
    "Bias patterns differ across embedding retrieval, prompt-based scoring, and pairwise ranking, and across demographic groups.",
    "Mitigation choices depend on access to model weights, computation, and fairness–accuracy trade-offs. The review discusses combining methods and re-auditing after model updates.",
  ],
  methods:
    "The review compares embedding retrieval, prompt-based scoring, and pairwise ranking. It brings together counterfactual audits, group fairness measures, and representation-privacy analysis.",
  pipeline: [
    {
      stage: "Data curation",
      description: "Balanced datasets, synthetic audit data, and label checks.",
    },
    {
      stage: "Pre-processing",
      description: "Embedding debiasing and proxy-term reweighting.",
    },
    {
      stage: "In-processing",
      description:
        "Adversarial objectives and representation-privacy penalties.",
    },
    {
      stage: "Post-processing",
      description:
        "Prompt calibration, feature attribution, and output audits.",
    },
  ],
  note: "Benchmark results discussed in the report come from the cited studies. The combined pipeline is a proposal for future implementation and evaluation.",
  report: {
    path: "documents/llm-resume-bias-report.pdf",
    label: "Read course report (PDF)",
  },
  slides: {
    path: "documents/llm-resume-bias-slides.pptx",
    label: "Download slides (PPTX)",
    filename: "Chih-Lin-Chien-LLM-Resume-Bias.pptx",
  },
} as const;

export const education = [
  {
    school: "University of Illinois Urbana-Champaign",
    degree: "Master of Computer Science",
    dates: "2026 — 2027 · expected",
  },
  {
    school: "San Francisco State University",
    degree: "B.S. Computer Science · Magna Cum Laude",
    dates: "2022 — 2024",
  },
  {
    school: "Feng Chia University",
    degree: "B.S. Computer Science",
    dates: "2020 — 2024",
  },
] as const;

export const experience = {
  company: "Moldex3D",
  role: "Website Test Automation Development Intern",
  dates: "Jul 2025 — Jan 2026",
  description:
    "Wrote and maintained JavaScript tests with Cypress, investigated software issues, and worked on test coverage for the web application.",
} as const;

export const skills = [
  {
    title: "Web & applications",
    items: "HTML, CSS, JavaScript, React, Node.js, Socket.IO, Swift",
  },
  {
    title: "Data & computer vision",
    items: "Python, MATLAB, SQL, MySQL, PostgreSQL, YOLO",
  },
  {
    title: "Languages & tools",
    items: "Git, GitHub, Cypress, Google Cloud, Java, C, C++",
  },
] as const;
