import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import snapshotData from '../data/generated/github-snapshot.json';
import { GithubIcon } from './icons/BrandIcons';

export const GitHubSection: React.FC = () => (
  <section id="github" data-nav-theme="light" className="github-section" aria-labelledby="github-heading">
    <div className="github-index"><span>OPEN SOURCE</span><span>PUBLIC PROFILE</span></div>
    <div className="github-content">
      <div className="github-copy">
        <p className="eyebrow">CODE, NOTES, ITERATIONS</p>
        <h2 id="github-heading">The work<br /><em>lives on GitHub.</em></h2>
        <p>A snapshot of my public account, where the projects above and their source code are maintained.</p>
        <a className="text-link" href={`https://github.com/${snapshotData.username}`} target="_blank" rel="noopener noreferrer">
          <GithubIcon aria-hidden="true" />Visit @{snapshotData.username}<ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="github-stat" aria-label={`${snapshotData.totalPublicRepos} public repositories`}>
        <strong>{String(snapshotData.totalPublicRepos).padStart(2, '0')}</strong>
        <span>public repositories</span>
        <small>Snapshot · {new Date(snapshotData.fetchedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</small>
      </div>
    </div>
  </section>
);
