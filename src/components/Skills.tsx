// src/components/Skills.tsx
import React, { useState } from 'react';
import { Wrench, ExternalLink, Check, CheckCircle2 } from 'lucide-react';
import { skills, skillCategories, Skill } from '../data/skills';
import { GithubIcon } from './icons/BrandIcons';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].name);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[0]);

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D6B574]/35 shadow-xs mb-3">
          <Wrench className="w-3.5 h-3.5 text-[#B89246]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B646B]">
            Repository-Verified Technology Stack
          </span>
        </div>
        <h2
          id="skills-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#263238] tracking-tight leading-tight"
        >
          Tools I Build With
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5B646B] leading-relaxed">
          Every technology, library, and framework shown below has been directly verified through dependency
          manifests, imports, and source implementations across my public GitHub repositories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#5B646B] mb-2 px-1">
            Technology Categories
          </p>
          {skillCategories.map((cat) => {
            const count = skills.filter((s) => s.category === cat.name).length;
            const isSelected = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  const firstOfCat = skills.find((s) => s.category === cat.name);
                  if (firstOfCat) setSelectedSkill(firstOfCat);
                }}
                className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between border ${
                  isSelected
                    ? 'glass-panel-elevated bg-white border-[#D6B574] text-[#263238] shadow-sm font-semibold'
                    : 'bg-white/50 hover:bg-white/80 border-[#D6B574]/20 text-[#5B646B]'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm">{cat.name}</div>
                  <div className="text-[11px] font-normal text-[#5B646B]/80 mt-0.5 line-clamp-1">
                    {cat.description}
                  </div>
                </div>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#D6B574]/20 text-[#263238]' : 'bg-black/[0.04] text-[#5B646B]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D6B574]/35 bg-white/85 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#D6B574]/20">
              <h3 className="text-lg font-serif font-bold text-[#263238]">{activeCategory}</h3>
              <span className="text-xs text-[#5B646B] font-mono">
                {filteredSkills.length} Verified Tools
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkill?.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-[#263238] text-white border-[#263238] shadow-sm scale-[1.02]'
                        : 'bg-[#FFFDF8] hover:bg-white text-[#263238] border-[#D6B574]/30 hover:border-[#D6B574]/60'
                    }`}
                  >
                    <span>{skill.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#D6B574]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedSkill && (
            <div className="pearl-card p-6 sm:p-7 rounded-3xl border border-[#D6B574]/40 bg-[#FFFDF8] shadow-md animate-fadeIn">
              <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-[#D6B574]/20">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#82DAD1]/20 border border-[#82DAD1]/40">
                    <CheckCircle2 className="w-4 h-4 text-[#368F83]" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-[#263238]">
                      {selectedSkill.name}
                    </h4>
                    <span className="text-[11px] uppercase tracking-wider text-[#D6B574] font-semibold">
                      {selectedSkill.category}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-[#5B646B] font-mono">
                  {selectedSkill.repositories.length} Project Evidence Ref{selectedSkill.repositories.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#5B646B] mb-1">
                  Implementation Context
                </p>
                <p className="text-xs sm:text-sm text-[#263238] leading-relaxed">
                  {selectedSkill.evidence.join(' ')}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#5B646B] mb-2.5">
                  Used In Verified Repositories:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedSkill.repositories.map((repo, idx) => (
                    <a
                      key={idx}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white hover:bg-[#FFFDF8] border border-[#D6B574]/30 hover:border-[#D6B574] transition-all flex items-center justify-between group shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <GithubIcon className="w-3.5 h-3.5 fill-[#5B646B] group-hover:fill-[#263238]" />
                        <span className="text-xs font-semibold text-[#263238] group-hover:text-[#B89246]">
                          {repo.name}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#5B646B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
