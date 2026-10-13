// src/components/GitHubSection.tsx
import React from 'react';
import { Star, ArrowUpRight, Calendar, Code } from 'lucide-react';
import snapshotData from '../data/generated/github-snapshot.json';
import { GithubIcon } from './icons/BrandIcons';

export const GitHubSection: React.FC = () => {
  const { username, repositories, fetchedAt } = snapshotData;

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
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
      aria-labelledby="github-heading"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D6B574]/35 shadow-xs mb-3">
            <GithubIcon className="w-3.5 h-3.5 fill-[#263238]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B646B]">
              Open-Source Footprint
            </span>
          </div>
          <h2
            id="github-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#263238] tracking-tight leading-tight"
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#263238] hover:bg-[#1E272C] transition-all shadow-md group shrink-0"
        >
          <GithubIcon className="w-4 h-4 fill-white" />
          <span>Follow on GitHub</span>
          <ArrowUpRight className="w-4 h-4 text-[#D6B574] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publicRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pearl-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between group transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-medium text-[#5B646B] flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#D6B574]" />
                  {repo.language || 'Multi-language'}
                </span>
                <div className="flex items-center gap-3 text-xs text-[#5B646B]">
                  {repo.stargazersCount > 0 && (
                    <span className="flex items-center gap-1 text-[#B89246]">
                      <Star className="w-3.5 h-3.5 fill-[#D6B574] text-[#D6B574]" />
                      {repo.stargazersCount}
                    </span>
                  )}
                  <ArrowUpRight className="w-4 h-4 text-[#5B646B] group-hover:text-[#263238] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-serif font-bold text-[#263238] group-hover:text-[#B89246] transition-colors line-clamp-1 mb-2">
                {repo.name}
              </h3>
              <p className="text-xs text-[#5B646B] leading-relaxed line-clamp-2 mb-4">
                {repo.description || 'Verified engineering repository by Arthik Dwivedi.'}
              </p>
            </div>

            <div className="pt-3 border-t border-black/[0.04] flex items-center justify-between text-[11px] text-[#5B646B] font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D6B574]" />
                Updated {formatDate(repo.updatedAt)}
              </span>
              <span className="text-emerald-700 font-semibold">Public</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-[#5B646B]">
        <span>Snapshot verified via GitHub REST API • Last synchronized: {new Date(fetchedAt).toLocaleDateString()}</span>
      </div>
    </section>
  );
};
