// src/data/profiles.ts

export interface DeveloperProfile {
  id: string;
  platform: string;
  handle: string;
  url: string;
  description: string;
  brandColor: string;
}

export const developerProfiles: DeveloperProfile[] = [
  {
    id: "github",
    platform: "GitHub",
    handle: "ARTHIK22",
    url: "https://github.com/ARTHIK22",
    description: "Open-source ML repositories, full-stack systems & experimental architectures",
    brandColor: "#263238",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    handle: "arthik-dwivedi",
    url: "https://www.linkedin.com/in/arthik-dwivedi",
    description: "Professional networking, technical discussions & engineering milestones",
    brandColor: "#0A66C2",
  },
  {
    id: "leetcode",
    platform: "LeetCode",
    handle: "8417996304",
    url: "https://leetcode.com/u/8417996304/",
    description: "Algorithmic problem-solving, data structures & computational efficiency",
    brandColor: "#FFA116",
  },
  {
    id: "hackerrank",
    platform: "HackerRank",
    handle: "at_dvd123",
    url: "https://www.hackerrank.com/profile/at_dvd123",
    description: "Competitive coding problem solutions and algorithmic benchmarks",
    brandColor: "#00EA64",
  },
  {
    id: "geeksforgeeks",
    platform: "GeeksforGeeks",
    handle: "atdvdk0dh",
    url: "https://www.geeksforgeeks.org/profile/atdvdk0dh?tab=activity",
    description: "Computer science theory, core fundamentals & coding practice",
    brandColor: "#2F8D46",
  },
  {
    id: "instagram",
    platform: "Instagram",
    handle: "_arthik_22",
    url: "https://www.instagram.com/_arthik_22/",
    description: "Creative perspectives, university milestones & developer life",
    brandColor: "#E4405F",
  },
];
