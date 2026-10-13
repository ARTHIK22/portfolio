// src/data/projects.ts

export type ProjectStatus = "Complete" | "Working Prototype" | "In Progress" | "Planned";

export interface ProjectDetail {
  problem: string;
  objective: string;
  technicalApproach: string;
  architecture: string[];
  keyFeatures: string[];
  challenges: string[];
  lessonsLearned: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: ProjectStatus;
  category: "Generative AI" | "Graph & Risk Systems" | "Applied ML" | "Unsupervised Analytics" | "Agentic Systems";
  technologies: string[];
  repositoryUrl: string;
  liveDemoUrl: string | null;
  screenshotUrl: string | null;
  accentGradient: string;
  details: ProjectDetail;
}

export const projects: Project[] = [
  {
    id: "projectsense-ai",
    title: "ProjectSense AI",
    subtitle: "AI-Powered Academic Capstone Evaluation & Viva Generation",
    description:
      "Automated evaluation platform that parses student project artifacts (PDF reports, presentations, code repositories) using xAI Grok and OpenAI LLMs to generate rubric-based grading, code clone detection, and contextual viva voce questions.",
    status: "Complete",
    category: "Generative AI",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "xAI Grok API",
      "PyMuPDF",
      "ReportLab",
      "Vercel",
    ],
    repositoryUrl: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform",
    liveDemoUrl: "https://ai-power-academic-project-evaluatio.vercel.app/",
    screenshotUrl: null,
    accentGradient: "from-[#82DAD1]/20 via-[#D6B574]/15 to-[#DCD7F5]/20",
    details: {
      problem:
        "Academic committees face immense time constraints manually evaluating hundreds of diverse student engineering projects, verifying code authenticity, and formulating rigorous, customized viva examination questions.",
      objective:
        "Build a multi-tenant platform empowering educators to automatically extract multimodal content, evaluate rubrics via advanced LLMs, detect source plagiarism, and generate tailored viva questions.",
      technicalApproach:
        "Engineered an asynchronous pipeline in FastAPI combining PyMuPDF and python-docx parsing with structured xAI Grok prompts. Developed role-isolated Next.js dashboards for students, teachers, and department heads.",
      architecture: [
        "Frontend: Next.js 16 App Router with React 19 and Tailwind CSS",
        "API Gateway: FastAPI with JWT token security & rate limiting",
        "Extraction Service: PyMuPDF, python-docx, and python-pptx parsers",
        "Reasoning Engine: Structured LLM prompt pipelines for rubric matching & viva synthesis",
        "Persistence & Export: SQLAlchemy ORM with ReportLab PDF scorecard compilation",
      ],
      keyFeatures: [
        "Multimodal artifact upload (.pdf, .docx, .pptx, .zip code archives)",
        "Automated rubric breakdown scoring across technical criteria",
        "Tailored viva voce question synthesis based on code implementation nuances",
        "Teacher review interface with manual grade overrides and comment finalization",
        "Downloadable official evaluation PDF scorecards",
      ],
      challenges: [
        "Handling heterogeneous document formatting without layout corruption during text extraction.",
        "Ensuring deterministic JSON structure from LLM evaluation responses across complex grading rubrics.",
      ],
      lessonsLearned: [
        "Strict Pydantic schema validation is essential when binding high-temperature LLM outputs into transactional databases.",
        "Decoupling artifact extraction from LLM scoring significantly improves user response times.",
      ],
    },
  },
  {
    id: "hidden-dependency-discovery",
    title: "Hidden Dependency Discovery",
    subtitle: "Supply-Chain Intelligence & Explainable Risk Graph System",
    description:
      "Enterprise software supply-chain security application for planning bounded investigative research, mapping multi-tier dependency topology, verifying evidence provenance, and computing explainable multi-factor risk scores.",
    status: "Working Prototype",
    category: "Graph & Risk Systems",
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "@xyflow/react",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy 2.0",
      "Redis",
      "WebSockets",
      "Playwright",
    ],
    repositoryUrl: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence",
    liveDemoUrl: null,
    screenshotUrl: null,
    accentGradient: "from-[#D6B574]/20 via-[#C8E9D7]/20 to-[#82DAD1]/20",
    details: {
      problem:
        "Modern application ecosystems depend on thousands of transitive packages, where hidden maintainer compromise, circular dependencies, and single points of failure create invisible systemic risks.",
      objective:
        "Provide security teams with a verifiable investigation workspace to inspect deep dependency trees, trace source evidence, and calculate transparent risk scores rather than opaque threat ratings.",
      technicalApproach:
        "Designed a modular architecture with FastAPI and PostgreSQL featuring Alembic migrations, Redis caching, and real-time WebSocket state streaming to an interactive `@xyflow/react` graph canvas.",
      architecture: [
        "Interactive Canvas: React 19 with @xyflow/react and Framer Motion",
        "State & Sockets: WebSockets with authenticated bearer tokens for streaming discovery steps",
        "Backend Engine: FastAPI with bounded background discovery worker tasks",
        "Storage Layer: PostgreSQL with SQLAlchemy 2.0 relational mappings and Redis pub/sub",
        "Validation Suite: Playwright E2E browser tests and Pytest async test suite",
      ],
      keyFeatures: [
        "Investigation planning workspace with bounded background execution",
        "Interactive multi-tier graph visualizer with node clustering and transitive path highlighting",
        "Explainable multi-factor risk scoring engine factoring exposure and topological centrality",
        "Audit trail with source-backed evidence records and downloadable reports",
        "Seedable deterministic demo fixture engine for reproducible security audits",
      ],
      challenges: [
        "Managing high node-count layout performance on the client-side graph canvas without thread lock.",
        "Designing deterministic database fixtures for complex graph relationships without violating relational foreign key constraints.",
      ],
      lessonsLearned: [
        "Graph exploration UI requires debounced state synchronizations to preserve 60fps rendering during pan and zoom operations.",
        "Schema-driven migrations with Alembic are non-negotiable for evolving multi-tenant data structures.",
      ],
    },
  },
  {
    id: "neoestate-ai",
    title: "NeoEstate AI",
    subtitle: "Property Valuation & Market Analytics via Random Forest ML",
    description:
      "End-to-end real estate price valuation platform for Indian property markets. Uses a trained Scikit-Learn Random Forest Regressor to provide instant price estimations, feature importance insights, and local comparative tier analysis.",
    status: "Complete",
    category: "Applied ML",
    technologies: [
      "Python",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Flask",
      "JavaScript",
      "Gunicorn",
      "Render",
    ],
    repositoryUrl: "https://github.com/ARTHIK22/neoestate-ai",
    liveDemoUrl: "https://neoestate-ai-1.onrender.com/",
    screenshotUrl: null,
    accentGradient: "from-[#F2BFA7]/20 via-[#D6B574]/15 to-[#C8E9D7]/20",
    details: {
      problem:
        "Real estate pricing in developing metropolitan areas is often opaque, volatile, and driven by speculative estimations rather than grounded regression models.",
      objective:
        "Build a transparent, accessible machine learning valuation engine enabling homebuyers and investors to predict property value based on verified structural and geographical parameters.",
      technicalApproach:
        "Curated and preprocessed multi-feature property records, engineered categorical encodings, trained an ensemble Random Forest Regressor, and served predictions through a responsive Flask web application.",
      architecture: [
        "ML Pipeline: Scikit-Learn RandomForestRegressor with Pandas & NumPy data normalization",
        "Model Server: Python Flask REST microservice deployed on Render via Gunicorn",
        "Client UI: Responsive HTML5/CSS3/JavaScript interface with dynamic feature sliders",
        "Analytical Visuals: Feature importance ranking charts explaining pricing factors",
      ],
      keyFeatures: [
        "Instant real-time property price estimation with sub-second inference latency",
        "Multi-variable input controls (BHK, carpet area, locality, bathroom count, furnishing status)",
        "Feature importance breakdown displaying which parameters exert the greatest leverage",
        "Local market segment benchmarking and budget fit recommendations",
      ],
      challenges: [
        "Mitigating outlier skew in high-density metropolitan luxury properties.",
        "Encoding high-cardinality locality indicators without causing sparse matrix memory explosions.",
      ],
      lessonsLearned: [
        "Ensemble trees provide resilient resistance to overfitting compared to single decision trees when dealing with skewed price distributions.",
        "Clear visual feedback on why a price was predicted builds far greater user trust than raw numbers.",
      ],
    },
  },
  {
    id: "student-performance-clustering",
    title: "Student Performance Clustering",
    subtitle: "Unsupervised K-Means Analytics & Academic Persona Profiling",
    description:
      "Educational data mining platform that groups students into actionable behavioral personas using K-Means clustering. Features an algorithmic Optimal-K Advisor utilizing the Elbow Method and Silhouette Analysis.",
    status: "Complete",
    category: "Unsupervised Analytics",
    technologies: [
      "Python",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Plotly",
      "Matplotlib",
      "Seaborn",
      "Flask",
      "Vercel",
    ],
    repositoryUrl: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System",
    liveDemoUrl: "https://student-performance-clustering-syst.vercel.app/",
    screenshotUrl: null,
    accentGradient: "from-[#82DAD1]/20 via-[#DCD7F5]/20 to-[#C8E9D7]/20",
    details: {
      problem:
        "Academic institutions frequently identify struggling students only after end-of-semester exam failures, missing early intervention windows that could be detected via multivariate behavioral patterns.",
      objective:
        "Create an unsupervised analytics system to cluster students into distinct academic personas based on attendance, weekly study hours, assignment submissions, and test scores.",
      technicalApproach:
        "Implemented standardized feature scaling, automated K-Means optimization (Elbow Method + Silhouette Score calculations), persona heuristic mapping, and interactive Plotly visualization dashboards.",
      architecture: [
        "Clustering Core: Scikit-Learn KMeans with StandardScaler preprocessing",
        "Cluster Optimization: Algorithmic inertia minimization and silhouette evaluation across k ranges",
        "Visualization: Plotly interactive 3D and 2D scatter projections with Matplotlib/Seaborn summaries",
        "Application Layer: Flask server with asynchronous client interactions and Vercel hosting",
      ],
      keyFeatures: [
        "Unsupervised segmentation into High Performers, Steady Achievers, and At-Risk cohorts",
        "Optimal-K algorithmic recommendation displaying elbow curves and silhouette coefficients",
        "Interactive multidimensional cluster exploration with custom feature axes",
        "Downloadable persona summaries with targeted intervention guidance for counselors",
      ],
      challenges: [
        "Determining the mathematically optimal cluster partition without subjective bias.",
        "Translating abstract geometric cluster centroids into empathetic, actionable pedagogical profiles.",
      ],
      lessonsLearned: [
        "Unsupervised models require rigorous normalization (z-score scaling) to avoid feature domination by high-range variables like attendance percentages.",
        "Visualizing cluster boundaries interactively helps non-technical educators grasp the underlying patterns.",
      ],
    },
  },
  {
    id: "rxpilot-ai",
    title: "RxPilot AI",
    subtitle: "Prescription Understanding Agent with Uncertainty Calibration",
    description:
      "Autonomous clinical prescription understanding agent designed to extract medication dosages, schedules, and patient instructions with confidence scoring and human-in-the-loop verification loops.",
    status: "In Progress",
    category: "Agentic Systems",
    technologies: [
      "FastAPI",
      "Python",
      "Pydantic v2",
      "OpenAI API",
      "Uvicorn",
      "React 19",
      "Vite",
    ],
    repositoryUrl: "https://github.com/ARTHIK22/rxpilot-ai",
    liveDemoUrl: null,
    screenshotUrl: null,
    accentGradient: "from-[#DCD7F5]/20 via-[#F2BFA7]/15 to-[#82DAD1]/20",
    details: {
      problem:
        "Handwritten and fragmented clinical prescriptions lead to medication schedule confusion and dosage errors, yet purely automated systems risk catastrophic hallucinations if they lack verification checks.",
      objective:
        "Architect a safety-first agentic workflow that extracts prescription structures, computes per-field confidence metrics, and enforces mandatory human confirmation whenever uncertainty crosses threshold boundaries.",
      technicalApproach:
        "Formulated a multi-agent backend architecture comprising a vision analyzer agent, scheduling synthesizer, and patient guidance agent in FastAPI with Pydantic schema validation.",
      architecture: [
        "Agent Layer: Vision Agent, Schedule Synthesizer, and Patient Communication Agent",
        "API Core: FastAPI with modular endpoint routers for prescriptions, doses, and schedules",
        "Validation Engine: Pydantic v2 models enforcing strict dose and unit types",
        "Frontend: React 19 + Vite dashboard for clinician review and patient verification",
      ],
      keyFeatures: [
        "Fine-grained extraction of medication name, dose, frequency, timing, and duration",
        "Calibrated confidence scoring with explicit uncertainty flags on ambiguous handwriting",
        "Safety guardrails: mandatory human-in-the-loop triggers before schedule commitment",
        "Structured dosage timetable generation",
      ],
      challenges: [
        "Calibrating confidence metrics so that ambiguous medical abbreviations never fail silently.",
        "Coordinating multi-agent state across asynchronous verification workflows.",
      ],
      lessonsLearned: [
        "In healthcare informatics, failure visibility and explicit uncertainty are far more valuable than uncalibrated confidence.",
        "Modular agent boundaries allow independent testing and swapping of vision and reasoning models.",
      ],
    },
  },
];
