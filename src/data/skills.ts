// src/data/skills.ts

export interface SkillRepoRef {
  name: string;
  repoName: string;
  url: string;
}

export interface Skill {
  id: string;
  name: string;
  category:
    | "Programming Languages"
    | "AI & Machine Learning"
    | "Generative AI & Agents"
    | "Data Science & Visuals"
    | "Backend Engineering"
    | "Frontend Development"
    | "Databases & ORM"
    | "DevOps & Infrastructure"
    | "Testing & Quality";
  evidence: string[];
  repositories: SkillRepoRef[];
  iconName?: string;
}

export interface SkillCategoryGroup {
  name: Skill["category"];
  description: string;
  skills: Skill[];
}

export const skills: Skill[] = [
  // Programming Languages
  {
    id: "python",
    name: "Python",
    category: "Programming Languages",
    evidence: ["Core language for ML modeling, FastAPI/Flask services, and backend pipelines."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
      { name: "RxPilot AI", repoName: "rxpilot-ai", url: "https://github.com/ARTHIK22/rxpilot-ai" },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Programming Languages",
    evidence: ["Strict type system utilized across Next.js and Vite React frontends."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming Languages",
    evidence: ["Dynamic DOM manipulation, visualization scripts, and client-side interactions."],
    repositories: [
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
      { name: "RxPilot AI", repoName: "rxpilot-ai", url: "https://github.com/ARTHIK22/rxpilot-ai" },
    ],
  },
  {
    id: "sql",
    name: "SQL",
    category: "Programming Languages",
    evidence: ["Relational queries, transactional migrations, and schema definitions in PostgreSQL and SQLite."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },
  {
    id: "html-css",
    name: "HTML5 & CSS3",
    category: "Programming Languages",
    evidence: ["Semantic responsive interfaces, custom glassmorphism styles, and CSS variables."],
    repositories: [
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },

  // AI & Machine Learning
  {
    id: "scikit-learn",
    name: "Scikit-Learn",
    category: "AI & Machine Learning",
    evidence: ["RandomForestRegressor for pricing models, KMeans clustering, StandardScaler preprocessing."],
    repositories: [
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },
  {
    id: "random-forest",
    name: "Random Forest Regressor",
    category: "AI & Machine Learning",
    evidence: ["Ensemble supervised regression model trained on property features with hyperparameter tuning."],
    repositories: [
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
    ],
  },
  {
    id: "kmeans",
    name: "K-Means Clustering",
    category: "AI & Machine Learning",
    evidence: ["Unsupervised centroid clustering partitioning multidimensional student metrics."],
    repositories: [
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },
  {
    id: "silhouette-elbow",
    name: "Elbow Method & Silhouette Analysis",
    category: "AI & Machine Learning",
    evidence: ["Inertia curves and silhouette coefficient calculations to find optimal cluster k."],
    repositories: [
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },
  {
    id: "feature-engineering",
    name: "Feature Engineering & Scaling",
    category: "AI & Machine Learning",
    evidence: ["Feature importance ranking, correlation filtering, and categorical encoding."],
    repositories: [
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },

  // Generative AI & Agents
  {
    id: "openai-api",
    name: "OpenAI API",
    category: "Generative AI & Agents",
    evidence: ["Integration for structured project assessment and medical prescription synthesis."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
      { name: "RxPilot AI", repoName: "rxpilot-ai", url: "https://github.com/ARTHIK22/rxpilot-ai" },
    ],
  },
  {
    id: "xai-grok",
    name: "xAI Grok API",
    category: "Generative AI & Agents",
    evidence: ["Automated rubric scoring, technical review synthesis, and viva questions generator."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },
  {
    id: "agent-architecture",
    name: "Autonomous Multi-Agent Architecture",
    category: "Generative AI & Agents",
    evidence: ["Decomposed specialized agents (Vision Agent, Schedule Agent, Patient Agent) with verification handoffs."],
    repositories: [
      { name: "RxPilot AI", repoName: "rxpilot-ai", url: "https://github.com/ARTHIK22/rxpilot-ai" },
    ],
  },
  {
    id: "prompt-engineering",
    name: "Structured Prompt Engineering",
    category: "Generative AI & Agents",
    evidence: ["Deterministic JSON schema generation for academic rubrics and clinical extractions."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
      { name: "RxPilot AI", repoName: "rxpilot-ai", url: "https://github.com/ARTHIK22/rxpilot-ai" },
    ],
  },

  // Data Science & Visuals
  {
    id: "pandas",
    name: "Pandas",
    category: "Data Science & Visuals",
    evidence: ["DataFrame manipulation, dataset cleansing, statistical aggregations, and CSV transformations."],
    repositories: [
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "Data Science & Visuals",
    evidence: ["Vectorized array calculations, distance metrics, and mathematical operations."],
    repositories: [
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },
  {
    id: "plotly",
    name: "Plotly",
    category: "Data Science & Visuals",
    evidence: ["Interactive multi-variable scatter charts, elbow curves, and 3D centroid plots."],
    repositories: [
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },
  {
    id: "matplotlib-seaborn",
    name: "Matplotlib & Seaborn",
    category: "Data Science & Visuals",
    evidence: ["Exploratory distributions, heatmaps, and cohort persona charts."],
    repositories: [
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },

  // Backend Engineering
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend Engineering",
    evidence: ["High-performance asynchronous REST endpoints, dependency injection, and OpenAPI schemas."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "RxPilot AI", repoName: "rxpilot-ai", url: "https://github.com/ARTHIK22/rxpilot-ai" },
    ],
  },
  {
    id: "flask",
    name: "Flask",
    category: "Backend Engineering",
    evidence: ["Microframework serving ML inference models, template rendering, and REST endpoints."],
    repositories: [
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },
  {
    id: "websockets",
    name: "WebSockets",
    category: "Backend Engineering",
    evidence: ["Real-time bidirectional event streaming with token authorization for discovery pipelines."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
    ],
  },
  {
    id: "pydantic",
    name: "Pydantic v2",
    category: "Backend Engineering",
    evidence: ["Strict data validation, nested settings configuration, and serialization."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "RxPilot AI", repoName: "rxpilot-ai", url: "https://github.com/ARTHIK22/rxpilot-ai" },
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },
  {
    id: "uvicorn-gunicorn",
    name: "Uvicorn & Gunicorn",
    category: "Backend Engineering",
    evidence: ["ASGI and WSGI production server process management and worker clustering."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },

  // Frontend Development
  {
    id: "react",
    name: "React 19",
    category: "Frontend Development",
    evidence: ["Modern component composition, hooks architecture, and concurrent UI rendering."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
      { name: "RxPilot AI", repoName: "rxpilot-ai", url: "https://github.com/ARTHIK22/rxpilot-ai" },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js 16 (App Router)",
    category: "Frontend Development",
    evidence: ["Server components, nested layouts, and route handlers."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },
  {
    id: "vite",
    name: "Vite",
    category: "Frontend Development",
    evidence: ["Fast ESM bundler configuration, HMR, and production rollups."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "RxPilot AI", repoName: "rxpilot-ai", url: "https://github.com/ARTHIK22/rxpilot-ai" },
    ],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend Development",
    evidence: ["Utility-first responsive design, custom palettes, and modern styling tokens."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },
  {
    id: "xyflow",
    name: "@xyflow/react (React Flow)",
    category: "Frontend Development",
    evidence: ["Interactive multi-tier dependency topology canvas with custom node renderers."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
    ],
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    category: "Frontend Development",
    evidence: ["Component entry transitions, modal spring physics, and layout animations."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
    ],
  },

  // Databases & ORM
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Databases & ORM",
    evidence: ["Relational schemas, foreign-key cascade integrity, and binary async driver connectivity (`psycopg`)."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },
  {
    id: "sqlite",
    name: "SQLite",
    category: "Databases & ORM",
    evidence: ["Embedded relational database and async queries via aiosqlite."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },
  {
    id: "sqlalchemy",
    name: "SQLAlchemy 2.0",
    category: "Databases & ORM",
    evidence: ["Declarative model mapping, typed query sessions, and eager relation joins."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },
  {
    id: "alembic",
    name: "Alembic",
    category: "Databases & ORM",
    evidence: ["Database migration scripts, version histories, and schema upgrades."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },
  {
    id: "redis",
    name: "Redis",
    category: "Databases & ORM",
    evidence: ["In-memory caching and session key storage for asynchronous tasks."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
    ],
  },

  // Document & Multimodal Processing
  {
    id: "document-processing",
    name: "PyMuPDF & python-docx",
    category: "DevOps & Infrastructure",
    evidence: ["Parsing student project reports, extracting headings, and analyzing slides (python-pptx)."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
    ],
  },

  // DevOps & Infrastructure
  {
    id: "git-github",
    name: "Git & GitHub",
    category: "DevOps & Infrastructure",
    evidence: ["Branching, code auditing, commit histories, and repository releases."],
    repositories: [
      { name: "All Repositories", repoName: "ARTHIK22", url: "https://github.com/ARTHIK22" },
    ],
  },
  {
    id: "docker-devcontainers",
    name: "Docker & DevContainers",
    category: "DevOps & Infrastructure",
    evidence: ["Container definitions (`.devcontainer/devcontainer.json`) for reproducible dev environments."],
    repositories: [
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
    ],
  },
  {
    id: "cloud-deployments",
    name: "Vercel & Render Deployment",
    category: "DevOps & Infrastructure",
    evidence: ["Configured deployment specifications (`vercel.json`, `render.yaml`) for web and backend."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
      { name: "NeoEstate AI", repoName: "neoestate-ai", url: "https://github.com/ARTHIK22/neoestate-ai" },
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },

  // Testing & Quality
  {
    id: "pytest",
    name: "Pytest & Pytest-AsyncIO",
    category: "Testing & Quality",
    evidence: ["Automated unit and API endpoint test suites."],
    repositories: [
      { name: "ProjectSense AI", repoName: "AI-Powered-Academic-Project-Evaluation-Platform", url: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform" },
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
      { name: "Student Clustering", repoName: "-Student-Performance-Clustering-System", url: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System" },
    ],
  },
  {
    id: "playwright",
    name: "Playwright E2E Testing",
    category: "Testing & Quality",
    evidence: ["End-to-end browser interaction specs verifying critical user discovery journeys."],
    repositories: [
      { name: "Hidden Dependency", repoName: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence", url: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence" },
    ],
  },
];

export const skillCategories: { name: Skill["category"]; description: string }[] = [
  { name: "AI & Machine Learning", description: "Supervised regression, unsupervised clustering, and valuation algorithms" },
  { name: "Generative AI & Agents", description: "Multimodal LLM pipelines, autonomous agents, and rubric evaluation" },
  { name: "Programming Languages", description: "Core languages for systems, machine learning, and interactive frontends" },
  { name: "Backend Engineering", description: "Asynchronous APIs, real-time WebSockets, microservices, and validation" },
  { name: "Frontend Development", description: "Spatial UI, graph canvases, component architecture, and modern toolchains" },
  { name: "Data Science & Visuals", description: "Exploratory data mining, interactive charts, and mathematical modeling" },
  { name: "Databases & ORM", description: "Relational persistence, migrations, caching, and transactional safety" },
  { name: "DevOps & Infrastructure", description: "Containerized environments, cloud hosting, and version control" },
  { name: "Testing & Quality", description: "E2E browser testing, async integration tests, and unit verification" },
];
