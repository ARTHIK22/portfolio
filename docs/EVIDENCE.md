# GitHub Repository & Skills Verification Audit: ARTHIK22

**Audited Profile**: [https://github.com/ARTHIK22](https://github.com/ARTHIK22)  
**Audit Timestamp**: 2026-10-13  
**Auditor**: Principal Creative Developer & Senior Software Engineer

---

## 1. Executive Summary

This document serves as the authoritative evidence dossier for **Arthik Dwivedi**'s personal portfolio (*AURORA INTELLIGENCE*). Every project featured, technology badge rendered, and architecture detail highlighted in the portfolio is directly sourced from and verified against the public GitHub repositories under the `ARTHIK22` account.

No synthetic projects, fabricated statistics, unverified achievements, or fictitious employment records have been generated.

---

## 2. Comprehensive Repository Audit

### Repository 1: `AI-Powered-Academic-Project-Evaluation-Platform` (ProjectSense AI)

- **Repository URL**: [https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform](https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform)
- **Live Deployment**: [https://ai-power-academic-project-evaluatio.vercel.app/](https://ai-power-academic-project-evaluatio.vercel.app/)
- **Project Purpose**: An automated, rubric-driven academic project evaluation platform designed for higher education institutions. The system parses student project reports (PDF, DOCX), presentation slides (PPTX), and source code repositories, utilizing the xAI Grok and OpenAI APIs to produce criteria-based scoring, plagiarism/code-similarity detection, actionable feedback, and dynamically generated viva voce questions for educators.
- **Technologies Used & Evidence**:
  - **Frontend**: Next.js 16.3 (App Router), React 19.2.8, TypeScript 5, Tailwind CSS v4 (`frontend/package.json`).
  - **Backend**: FastAPI 0.115+, Uvicorn, Python 3.10+ (`backend/requirements.txt`, `backend/main.py`).
  - **ORM & Database**: SQLAlchemy, Alembic, PostgreSQL (`asyncpg`, `psycopg2-binary`), SQLite (`aiosqlite`) (`backend/requirements.txt`, `backend/core/database.py`).
  - **Authentication**: JWT (`python-jose`), Bcrypt password hashing (`passlib`, `bcrypt==4.0.1`) (`backend/core/security.py`).
  - **AI / LLM Integration**: OpenAI API / xAI Grok API (`backend/services/ai_evaluator.py`, `backend/services/viva_generator.py`).
  - **Document & Multimodal Processing**: PyMuPDF (`fitz`), python-docx, python-pptx, ReportLab for rubric scorecard generation (`backend/services/report_analyzer.py`, `backend/services/pdf_exporter.py`).
  - **Testing**: Pytest, Pytest-AsyncIO (`backend/tests/test_api.py`).
  - **Infrastructure**: Vercel (frontend), Render (backend) (`vercel.json`, `render.yaml`).
- **Implemented Functionality**:
  - Role-based dashboard interfaces for Students, Teachers, and Administrators.
  - Multi-file drag-and-drop submission pipeline supporting `.pdf`, `.docx`, `.pptx`, and `.zip` archives.
  - Asynchronous AI evaluation pipeline computing rubric breakdown scores.
  - Dynamic viva question generation tailored to the student's project codebase and methodology.
  - Code clone & similarity verification module.
  - Automated PDF report compilation with branded scorecards.
- **Project Status**: **Complete**
- **Evidence Supporting Status**: Live deployed on Vercel (`ai-power-academic-project-evaluatio.vercel.app`), operational endpoints in `backend/main.py`, full suite of database models (`models/user.py`, `models/project.py`, `models/rubric.py`, `models/evaluation.py`), and test suite in `backend/tests/test_api.py`.
- **Inclusion / Exclusion Decision**: **INCLUDED** (Rank #1 - Primary AI Showcase).
- **Reason**: Demonstrates full-stack AI engineering maturity, document extraction pipelines, LLM prompt engineering, and production multi-tier architecture.

---

### Repository 2: `Hidden-Dependency-Discovery-Supply-Chain-Intelligence`

- **Repository URL**: [https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence](https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence)
- **Project Purpose**: Enterprise-grade software supply chain security and dependency intelligence platform. Orchestrates bounded recursive discovery pipelines across multi-tier dependencies, verifies source-backed evidence, maps relationship graphs, and computes explainable multi-factor vulnerability and risk vectors.
- **Technologies Used & Evidence**:
  - **Frontend**: React 19.3.0, TypeScript 7, Vite 7.1.7, `@xyflow/react` 12.12.0 (React Flow dynamic graph explorer), Framer Motion 13.4, Lucide React, React Router DOM 7 (`frontend/package.json`).
  - **Backend**: FastAPI 0.115+, Uvicorn, Python 3.10+ (`backend/requirements.txt`).
  - **Database & Cache**: PostgreSQL (via `psycopg` 3.2 binary), SQLAlchemy 2.0, Alembic 1.14, Redis 5.0+ (`backend/requirements.txt`).
  - **Real-Time Communication**: WebSockets with token authentication (`backend/api`, `frontend/src/services/websocket`).
  - **Data Validation & Config**: Pydantic 2.9+, Pydantic-Settings (`backend/requirements.txt`).
  - **Security**: JWT (`python-jose`), Bcrypt (`backend/requirements.txt`).
  - **Testing**: Playwright (`@playwright/test` 1.63), Pytest 8, Pytest-AsyncIO (`package.json`, `backend/requirements.txt`).
  - **DevOps & Infrastructure**: Nginx reverse proxy, Prometheus metrics monitoring (`infrastructure/nginx/nginx.conf`, `infrastructure/monitoring/prometheus.yml`, `scripts/migrate.sh`, `scripts/seed.sh`).
- **Implemented Functionality**:
  - Bounded investigation research pipeline with progress tracking.
  - Interactive multi-tier dependency graph canvas with node clustering and filtering via `@xyflow/react`.
  - Multi-factor risk calculation engine computing exposure, centrality, and source trustworthiness.
  - User-scoped alerts, entity watchlists, and downloadable audit reports.
  - Seedable deterministic demo engine with fixture isolation and tenant boundary enforcement.
  - End-to-end integration test runner via Playwright.
- **Project Status**: **Complete** / **Working Prototype**
- **Evidence Supporting Status**: Over 521 KB of source code across 160+ files, comprehensive architectural specifications (`ARCHITECTURE.md`), integration test report (`TEST_REPORT.md`), and automated database migrations.
- **Inclusion / Exclusion Decision**: **INCLUDED** (Rank #2 - Systems & Graph Engineering Showcase).
- **Reason**: Outstanding example of architectural rigor, complex graph visual interaction, production testing, and distributed backend system design.

---

### Repository 3: `neoestate-ai` (NeoEstate AI)

- **Repository URL**: [https://github.com/ARTHIK22/neoestate-ai](https://github.com/ARTHIK22/neoestate-ai)
- **Live Deployment**: [https://neoestate-ai-1.onrender.com/](https://neoestate-ai-1.onrender.com/)
- **GitHub Stars**: 2
- **Project Purpose**: Machine learning real estate valuation engine tailored to property markets across India. Uses supervised regression to estimate property market prices from structural parameters (BHK, carpet area, locality, amenities, furnishing) and generates interactive feature importance charts and local market comparative analytics.
- **Technologies Used & Evidence**:
  - **Machine Learning**: Scikit-Learn (`RandomForestRegressor`), Pandas, NumPy (`requirements.txt`, `house_price_prediction.py`, `gen_dataset.py`).
  - **Backend**: Python 3.8+, Flask, Gunicorn (`requirements.txt`, `app.py`, `server.py`).
  - **Frontend**: Vanilla HTML5, CSS3, JavaScript, Chart.js integrations (`index.html`).
  - **Infrastructure**: Render deployment (`render.yaml`, `Procfile`).
- **Implemented Functionality**:
  - Trained Random Forest Regression model with feature preprocessing pipeline.
  - Interactive web calculator with instant valuation estimation.
  - Localized benchmark comparisons against historical market tiers.
  - Feature weight sensitivity analysis showing key value drivers.
- **Project Status**: **Complete**
- **Evidence Supporting Status**: Live cloud deployment on Render, functional Flask server, data generation script (`gen_dataset.py`), preprocessed `dataset.csv`, model training code in `house_price_prediction.py`, and verified UI screenshots in repository README.
- **Inclusion / Exclusion Decision**: **INCLUDED** (Rank #3 - Applied Machine Learning Showcase).
- **Reason**: Clear demonstration of classical supervised ML modeling, regression techniques, feature importance, and end-to-end model deployment.

---

### Repository 4: `-Student-Performance-Clustering-System`

- **Repository URL**: [https://github.com/ARTHIK22/-Student-Performance-Clustering-System](https://github.com/ARTHIK22/-Student-Performance-Clustering-System)
- **Live Deployment**: [https://student-performance-clustering-syst.vercel.app/](https://student-performance-clustering-syst.vercel.app/)
- **Project Purpose**: Unsupervised clustering analytics platform that segments students into intuitive behavioral personas (e.g., *High Performers*, *Consistent Achievers*, *At-Risk / Intervention Required*) based on attendance, weekly study hours, internal assessments, and exam outcomes. Incorporates algorithmic optimal-k guidance using Elbow and Silhouette analysis.
- **Technologies Used & Evidence**:
  - **Machine Learning**: Scikit-Learn (`KMeans`, `SilhouetteScore`), Pandas, NumPy (`requirements.txt`, `utils/clustering.py`).
  - **Data Visualization**: Plotly, Matplotlib, Seaborn (`requirements.txt`, `utils/visualization.py`).
  - **Backend & Web**: Python, Flask, Jinja2 templates, JavaScript (`app.py`, `static/app.js`, `static/styles.css`, `templates/index.html`).
  - **DevOps**: DevContainer (`.devcontainer/devcontainer.json`), Vercel deployment (`vercel.json`).
  - **Unit Testing**: Pytest (`test_clustering.py`).
- **Implemented Functionality**:
  - Unsupervised K-Means clustering engine with configurable feature selection.
  - Optimal cluster count adviser computing inertia (Elbow method) and silhouette scores across ranges of k.
  - Automated academic persona assignment and demographic cohort breakdown.
  - Interactive multi-dimensional scatter and box plots via Plotly.
- **Project Status**: **Complete**
- **Evidence Supporting Status**: Live on Vercel, automated test suite (`test_clustering.py`), Docker devcontainer specification, and clean modular utility architecture.
- **Inclusion / Exclusion Decision**: **INCLUDED** (Rank #4 - Unsupervised Learning & Visual Analytics).
- **Reason**: Demonstrates proficiency in unsupervised learning, mathematical cluster evaluation metrics, exploratory data analysis, and educational technology application.

---

### Repository 5: `rxpilot-ai` (RxPilot AI)

- **Repository URL**: [https://github.com/ARTHIK22/rxpilot-ai](https://github.com/ARTHIK22/rxpilot-ai)
- **Project Purpose**: Autonomous clinical prescription understanding agent designed to extract medication names, dosages, frequencies, and schedules from prescriptions with confidence scoring and human-in-the-loop verification loops.
- **Technologies Used & Evidence**:
  - **Backend**: FastAPI 0.141+, Uvicorn, Python 3.10+, Pydantic v2, Pydantic-Core (`backend/requirements.txt`, `backend/app/main.py`).
  - **Agents & AI**: Multi-agent architecture (`app/agents/vision_agent.py`, `app/agents/schedule_agent.py`, `app/agents/patient_agent.py`), OpenAI API integration (`app/services/llm_service.py`).
  - **Frontend**: React 19, Vite 8, Oxlint (`frontend/package.json`).
- **Implemented Functionality**:
  - Modular API endpoints for prescriptions, scheduling, doses, and patient record management.
  - Vision analyzer mock pipeline with confidence scoring (e.g. Paracetamol 96% confidence vs. low confidence flags).
  - Human verification requirement triggers for handwritten ambiguity.
- **Project Status**: **In Progress** / **Working Prototype**
- **Evidence Supporting Status**: Implemented backend agent architecture and FastAPI routes, though frontend remains in scaffolding phase and vision analyzer is currently mock-backed for local development.
- **Inclusion / Exclusion Decision**: **INCLUDED** (Rank #5 - AI Agent Architecture & Healthcare Informatics).
- **Reason**: Demonstrates forward-looking AI agentic workflows, uncertainty calibration, and modular microservice design.

---

### Repository 6: `ARTHIK22` (GitHub Profile Repository)

- **Repository URL**: [https://github.com/ARTHIK22/ARTHIK22](https://github.com/ARTHIK22/ARTHIK22)
- **Project Purpose**: Special GitHub Profile configuration repository hosting the user's public bio, skill badges, live project links, and developer identity.
- **Project Status**: Complete (Profile Configuration)
- **Inclusion / Exclusion Decision**: **EXCLUDED from Project Cards**
- **Reason**: It is a profile metadata repository rather than an interactive software application or ML library. Utilized as authoritative truth for social profiles, handles, and stated academic focus.

---

### Repository 7: `portfolio`

- **Repository URL**: [https://github.com/ARTHIK22/portfolio](https://github.com/ARTHIK22/portfolio)
- **Project Purpose**: Newly initialized remote repository (0 KB) created to host this personal portfolio.
- **Project Status**: Planned / Deployment Target
- **Inclusion / Exclusion Decision**: **EXCLUDED from Project Cards**
- **Reason**: Empty repository without code commits at audit time.

---

## 3. Verified Skills Inventory & Cross-Repository Traceability

| Technology / Tool | Verified Category | Direct Repository Evidence |
| :--- | :--- | :--- |
| **Python** | Programming Languages | `ProjectSense AI`, `Hidden-Dependency`, `NeoEstate AI`, `Student-Performance-Clustering`, `RxPilot AI` |
| **TypeScript** | Programming Languages | `ProjectSense AI` (`frontend/package.json`), `Hidden-Dependency` (`frontend/tsconfig.json`) |
| **JavaScript** | Programming Languages | `Student-Performance-Clustering`, `NeoEstate AI`, `Hidden-Dependency`, `RxPilot AI` |
| **SQL** | Programming Languages | `ProjectSense AI` (SQLite/PostgreSQL schema), `Hidden-Dependency` (PostgreSQL DDL) |
| **HTML5 & CSS3** | Programming Languages | Universal across all web frontends |
| **Scikit-Learn** | AI & Machine Learning | `NeoEstate AI` (`requirements.txt`), `Student-Performance-Clustering` (`requirements.txt`) |
| **Random Forest Regressor** | AI & Machine Learning | `NeoEstate AI` (`house_price_prediction.py`) |
| **K-Means Clustering** | AI & Machine Learning | `Student-Performance-Clustering` (`utils/clustering.py`) |
| **Silhouette Analysis & Elbow**| AI & Machine Learning | `Student-Performance-Clustering` (`utils/clustering.py`) |
| **Feature Engineering** | AI & Machine Learning | `NeoEstate AI` (`gen_dataset.py`), `Student-Performance-Clustering` |
| **OpenAI API** | GenAI & AI Agents | `ProjectSense AI` (`ai_evaluator.py`), `RxPilot AI` (`llm_service.py`) |
| **xAI Grok API** | GenAI & AI Agents | `ProjectSense AI` (`README.md`, `backend/services/ai_evaluator.py`) |
| **AI Agent Architecture** | GenAI & AI Agents | `RxPilot AI` (`vision_agent.py`, `schedule_agent.py`, `patient_agent.py`) |
| **Pandas & NumPy** | Data Science | `NeoEstate AI` (`requirements.txt`), `Student-Performance-Clustering` (`requirements.txt`) |
| **Plotly, Matplotlib, Seaborn**| Data Science | `Student-Performance-Clustering` (`requirements.txt`, `utils/visualization.py`) |
| **FastAPI** | Backend Engineering | `ProjectSense AI`, `Hidden-Dependency`, `RxPilot AI` |
| **Flask** | Backend Engineering | `NeoEstate AI` (`app.py`), `Student-Performance-Clustering` (`app.py`) |
| **Uvicorn & Gunicorn** | Backend Engineering | `ProjectSense AI`, `NeoEstate AI`, `Hidden-Dependency`, `RxPilot AI` |
| **WebSockets** | Backend Engineering | `Hidden-Dependency` (`backend/api`, `frontend/src/services/websocket`) |
| **Pydantic v2** | Backend Engineering | `Hidden-Dependency`, `RxPilot AI`, `ProjectSense AI` |
| **React 19** | Frontend Development | `ProjectSense AI`, `Hidden-Dependency`, `RxPilot AI` |
| **Next.js 16 (App Router)** | Frontend Development | `ProjectSense AI` (`frontend/package.json`) |
| **Vite** | Frontend Development | `Hidden-Dependency`, `RxPilot AI` |
| **Tailwind CSS** | Frontend Development | `ProjectSense AI` (`frontend/package.json`) |
| **@xyflow/react (React Flow)**| Frontend Development | `Hidden-Dependency` (`frontend/package.json`) |
| **Framer Motion** | Frontend Development | `Hidden-Dependency` (`frontend/package.json`) |
| **PostgreSQL & psycopg** | Databases & ORM | `Hidden-Dependency` (`requirements.txt`), `ProjectSense AI` (`requirements.txt`) |
| **SQLite & aiosqlite** | Databases & ORM | `ProjectSense AI` (`projectsense.db`, `core/database.py`) |
| **SQLAlchemy 2.0** | Databases & ORM | `Hidden-Dependency` (`requirements.txt`), `ProjectSense AI` (`core/database.py`) |
| **Alembic** | Databases & ORM | `Hidden-Dependency` (`requirements.txt`), `ProjectSense AI` (`requirements.txt`) |
| **Redis** | Databases & Caching | `Hidden-Dependency` (`backend/requirements.txt`) |
| **PyMuPDF & python-docx** | Document Processing | `ProjectSense AI` (`backend/services/report_analyzer.py`) |
| **Git & GitHub** | Developer Tools | Universal across all repositories |
| **Docker & DevContainers** | DevOps & Tooling | `Student-Performance-Clustering` (`.devcontainer`), `Hidden-Dependency` |
| **Vercel** | Deployment | `ProjectSense AI` (`frontend/vercel.json`), `Student-Performance-Clustering` (`vercel.json`) |
| **Render** | Deployment | `NeoEstate AI` (`render.yaml`), `ProjectSense AI` (`render.yaml`) |
| **Playwright & Pytest** | QA & Testing | `Hidden-Dependency` (`test:e2e`), `ProjectSense AI` (`tests/test_api.py`), `Student-Clustering` |
