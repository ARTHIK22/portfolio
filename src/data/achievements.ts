// src/data/achievements.ts

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verificationUrl?: string;
  summary: string;
}

// In adherence to strict verification requirements (Section 16),
// only externally verified hackathon awards or formal certificates are rendered.
// As no unverified claims or registrations are fabricated, this array remains empty,
// and the achievements section & navigation are purposefully omitted.
export const achievements: Achievement[] = [];
