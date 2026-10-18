// src/components/GitHubSection.tsx
import React, { useRef } from 'react';
import { Star, ArrowUpRight, Calendar, Code } from 'lucide-react';
import snapshotData from '../data/generated/github-snapshot.json';
import { projects } from '../data/projects';
import { GithubIcon } from './icons/BrandIcons';
import { useScrollReveal } from '../lib/useScrollReveal';

export const GitHubSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const { username, repositories } = snapshotData;

  const publicRepos = repositories.filter(
    (r) => r.name !== 'ARTHIK22' && r.name !== 'portfolio'
  );

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <section
      id="github"
      ref={sectionRef}
      data-nav-theme="light"
      className="github-section"
      aria-labelledby="github-heading"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" data-scroll-reveal>
        <div>
              <div className="github-eyebrow">
            <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              Open-Source Footprint
            </span>
          </div>
          <h2
            id="github-heading"
            className="github-title"
          >
            Building in Public
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5B646B]">
            Public repositories and live code under{' '}
            <span className="font-semibold text-[#263238]">@{username}</span>
          </p>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pill-link github-follow group shrink-0"
          data-hover-text="Follow on GitHub"
        >
          <GithubIcon className="w-4 h-4 fill-white" />
          <span>Follow on GitHub</span>
          <ArrowUpRight className="w-4 h-4 text-[#D6B574] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="github-grid">
        {publicRepos.map((repo) => {
          const description = String(repo.description ?? '').trim()
            || projects.find((project) => project.repositoryUrl === repo.htmlUrl)?.description;

          return (
          <a
            key={repo.id}
            data-scroll-reveal
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="github-card group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="github-language">
                  <Code className="w-3.5 h-3.5" aria-hidden="true" />
                  {repo.language || 'Multi-language'}
                </span>
                <div className="github-card-meta">
                  <span className="github-stars" aria-label={`${repo.stargazersCount} stars`}><Star aria-hidden="true" />{repo.stargazersCount}</span>
                  <ArrowUpRight aria-hidden="true" />
                </div>
              </div>

              <h3 className="github-repo-name">
                {repo.name}
              </h3>
              {description && <p className="github-repo-description">{description}</p>}
            </div>

            <div className="github-card-footer">
              <span>
                <Calendar aria-hidden="true" />
                Updated {formatDate(repo.updatedAt)}
              </span>
              <span>PUBLIC</span>
            </div>
          </a>
          );
        })}
      </div>

    </section>
  );
};
