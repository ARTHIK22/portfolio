// scripts/fetch-github.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, '../src/data/generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'github-snapshot.json');

const USERNAME = 'ARTHIK22';

async function fetchGithubSnapshot() {
  console.log(`[GitHub Snapshot] Fetching public repository data for ${USERNAME}...`);

  const headers = {
    'User-Agent': 'Aurora-Intelligence-Build',
    'Accept': 'application/vnd.github.v3+json',
  };

  // Optionally support GITHUB_TOKEN if present in environment, but do NOT fail without it
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers });
    
    if (!res.ok) {
      console.warn(`[GitHub Snapshot] Warning: API returned ${res.status} ${res.statusText}`);
      if (fs.existsSync(OUTPUT_FILE)) {
        console.log(`[GitHub Snapshot] Preserving existing cached snapshot at ${OUTPUT_FILE}`);
        return;
      }
      throw new Error(`GitHub API request failed with status ${res.status}`);
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      throw new Error('Unexpected GitHub API response structure');
    }

    const snapshot = {
      username: USERNAME,
      fetchedAt: new Date().toISOString(),
      totalPublicRepos: repos.length,
      repositories: repos.map(r => ({
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        description: r.description,
        htmlUrl: r.html_url,
        homepage: r.homepage,
        language: r.language,
        stargazersCount: r.stargazers_count,
        forksCount: r.forks_count,
        openIssuesCount: r.open_issues_count,
        updatedAt: r.updated_at,
        createdAt: r.created_at,
        pushedAt: r.pushed_at,
        isFork: r.fork,
        topics: r.topics || [],
      })),
    };

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(snapshot, null, 2), 'utf-8');
    console.log(`[GitHub Snapshot] Successfully wrote ${snapshot.repositories.length} repos to ${OUTPUT_FILE}`);
  } catch (error) {
    console.warn(`[GitHub Snapshot] Could not fetch live data: ${error.message}`);
    if (fs.existsSync(OUTPUT_FILE)) {
      console.log(`[GitHub Snapshot] Preserving cached snapshot.`);
    } else {
      console.log(`[GitHub Snapshot] Creating fallback static snapshot.`);
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      }
      const fallbackSnapshot = {
        username: USERNAME,
        fetchedAt: new Date().toISOString(),
        totalPublicRepos: 7,
        repositories: [
          {
            id: 1,
            name: "AI-Powered-Academic-Project-Evaluation-Platform",
            fullName: "ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform",
            description: "Automated AI rubric-based academic project evaluation platform",
            htmlUrl: "https://github.com/ARTHIK22/AI-Powered-Academic-Project-Evaluation-Platform",
            homepage: "https://ai-power-academic-project-evaluatio.vercel.app/",
            language: "TypeScript",
            stargazersCount: 0,
            forksCount: 0,
            openIssuesCount: 0,
            updatedAt: "2026-09-10T08:06:44Z",
            createdAt: "2026-09-10T08:06:44Z",
            pushedAt: "2026-09-10T08:06:44Z",
            isFork: false,
            topics: ["ai", "fastapi", "nextjs", "education"]
          },
          {
            id: 2,
            name: "Hidden-Dependency-Discovery-Supply-Chain-Intelligence",
            fullName: "ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence",
            description: "Enterprise software supply-chain dependency intelligence & risk calculation platform",
            htmlUrl: "https://github.com/ARTHIK22/Hidden-Dependency-Discovery-Supply-Chain-Intelligence",
            homepage: null,
            language: "Python",
            stargazersCount: 0,
            forksCount: 0,
            openIssuesCount: 0,
            updatedAt: "2026-10-03T11:14:22Z",
            createdAt: "2026-10-03T11:14:22Z",
            pushedAt: "2026-10-03T11:14:22Z",
            isFork: false,
            topics: ["fastapi", "react", "graph", "supply-chain"]
          },
          {
            id: 3,
            name: "neoestate-ai",
            fullName: "ARTHIK22/neoestate-ai",
            description: "Intelligent Property Price Predictor using Random Forest Regression",
            htmlUrl: "https://github.com/ARTHIK22/neoestate-ai",
            homepage: "https://neoestate-ai-1.onrender.com/",
            language: "HTML",
            stargazersCount: 2,
            forksCount: 0,
            openIssuesCount: 0,
            updatedAt: "2026-09-26T17:39:53Z",
            createdAt: "2026-05-09T10:46:39Z",
            pushedAt: "2026-09-26T17:39:50Z",
            isFork: false,
            topics: ["machine-learning", "flask", "random-forest"]
          },
          {
            id: 4,
            name: "-Student-Performance-Clustering-System",
            fullName: "ARTHIK22/-Student-Performance-Clustering-System",
            description: "Unsupervised K-Means clustering and educational persona analytics platform",
            htmlUrl: "https://github.com/ARTHIK22/-Student-Performance-Clustering-System",
            homepage: "https://student-performance-clustering-syst.vercel.app/",
            language: "Python",
            stargazersCount: 0,
            forksCount: 0,
            openIssuesCount: 0,
            updatedAt: "2026-09-20T12:00:00Z",
            createdAt: "2026-09-20T12:00:00Z",
            pushedAt: "2026-09-20T12:00:00Z",
            isFork: false,
            topics: ["machine-learning", "kmeans", "clustering", "flask"]
          },
          {
            id: 5,
            name: "rxpilot-ai",
            fullName: "ARTHIK22/rxpilot-ai",
            description: "AI-powered Prescription Understanding Agent with human-in-the-loop verification",
            htmlUrl: "https://github.com/ARTHIK22/rxpilot-ai",
            homepage: null,
            language: "JavaScript",
            stargazersCount: 0,
            forksCount: 0,
            openIssuesCount: 0,
            updatedAt: "2026-09-24T05:35:51Z",
            createdAt: "2026-09-24T05:22:04Z",
            pushedAt: "2026-09-24T05:35:47Z",
            isFork: false,
            topics: ["fastapi", "ai-agents", "healthcare"]
          }
        ]
      };
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fallbackSnapshot, null, 2), 'utf-8');
    }
  }
}

fetchGithubSnapshot();
