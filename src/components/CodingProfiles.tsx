import React from 'react';
import { ArrowUpRight, Share2 } from 'lucide-react';
import { developerProfiles } from '../data/profiles';

export const CodingProfiles: React.FC = () => (
  <section id="profiles" data-nav-theme="light" className="profiles-section" aria-labelledby="profiles-heading">
    <div className="profiles-heading">
      <p className="eyebrow"><Share2 aria-hidden="true" /> ELSEWHERE</p>
      <h2 id="profiles-heading">Find me <em>online.</em></h2>
      <p>Coding accounts and the professional profiles I keep current.</p>
    </div>
    <div className="profiles-list">
      {developerProfiles.map((profile, index) => (
        <a key={profile.id} href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${profile.platform} profile: ${profile.handle}`}>
          <span className="profile-number">0{index + 1}</span>
          <span className="profile-platform">{profile.platform}</span>
          <span className="profile-handle">{profile.handle}</span>
          <span className="profile-description">{profile.description}</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
      ))}
    </div>
  </section>
);
