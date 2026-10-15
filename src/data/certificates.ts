export interface CertificateRecord {
  id: string;
  title: string;
  issuer?: string;
  type?: string;
  pdfPath: string;
  date?: string;
  dateLabel?: 'Issued' | 'Completed' | 'Dated';
  trainingDuration?: string;
  grade?: string;
  previewImagePath?: string;
  verificationUrl?: string;
}

export interface ProfessionalDocumentRecord {
  id: string;
  title: string;
  issuer: string;
  type?: string;
  pdfPath: string;
  date?: string;
  dateLabel?: 'Dated';
}

// Titles and issuers below are taken from PDF text or the visible certificate page.
// Keep dates blank when a date is not printed on the certificate.
export const certificates: CertificateRecord[] = [
  {
    id: 'ai-tools-chatgpt-workshop',
    title: 'AI Tools and ChatGPT Workshop',
    issuer: 'be10x',
    pdfPath: '/certificates/ai-tools-workshop.pdf',
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    issuer: "Let's Upgrade Edutech Pvt. Ltd.",
    date: 'March 30, 2026',
    dateLabel: 'Issued',
    pdfPath: '/certificates/prompt-engineering.pdf',
  },
  {
    id: 'figma-bootcamp',
    title: 'Figma Bootcamp',
    issuer: "Let's Upgrade Edutech Pvt. Ltd.",
    date: 'January 23, 2026',
    dateLabel: 'Issued',
    pdfPath: '/certificates/figma-bootcamp.pdf',
  },
  {
    id: 'ai-code-explainer-essentials-workshop',
    title: 'AI Code Explainer Essentials Full-Stack Workshop',
    issuer: "Let's Upgrade Edutech Pvt. Ltd.",
    date: 'January 8, 2026',
    dateLabel: 'Issued',
    pdfPath: '/certificates/ai-code-explainer.pdf',
  },
  {
    id: 'n8n-automation-workshop',
    title: 'Automate Everything with n8n',
    issuer: "Let's Upgrade Edutech Pvt. Ltd.",
    date: 'May 15, 2026',
    dateLabel: 'Issued',
    pdfPath: '/certificates/n8n-automation.pdf',
  },
  {
    id: 'yuva-ai-for-all',
    title: 'YUVA AI For All',
    issuer: 'TCS iON / IndiaAI',
    date: 'February 24, 2026',
    dateLabel: 'Issued',
    pdfPath: '/certificates/yuva-ai-for-all.pdf',
  },
  {
    id: 'data-science-resume-ai',
    title: 'Build Your 2025 Winning Data Science Resume with AI',
    date: 'March 18, 2026',
    dateLabel: 'Dated',
    pdfPath: '/certificates/data-science-resume-ai.pdf',
  },
  {
    id: 'cybersecurity-analyst-job-simulation',
    title: 'Cybersecurity Analyst Job Simulation',
    issuer: 'Forage',
    date: 'November 15, 2025',
    dateLabel: 'Completed',
    pdfPath: '/certificates/cybersecurity-analyst-simulation.pdf',
  },
  {
    id: 'solutions-architecture-job-simulation',
    title: 'Solutions Architecture Job Simulation',
    issuer: 'AWS / Forage',
    date: 'November 3, 2025',
    dateLabel: 'Completed',
    pdfPath: '/certificates/solutions-architecture-simulation.pdf',
  },
  {
    id: 'advanced-software-engineering-job-simulation',
    title: 'Advanced Software Engineering Job Simulation',
    issuer: 'Forage',
    date: 'November 3, 2025',
    dateLabel: 'Completed',
    pdfPath: '/certificates/advanced-software-engineering.pdf',
  },
  {
    id: 'summer-skillup-participation',
    title: 'Summer SkillUp — Certificate of Participation',
    issuer: 'GeeksforGeeks',
    type: 'Workshop Participation',
    pdfPath: '/certificates/GeeksforGeeks — Summer SkillUp Certificate of Participation.pdf',
  },
  {
    id: 'campuscrew-100k-milestone',
    title: '100K Milestone Honor',
    issuer: 'CampusCrew',
    date: 'June 26, 2026',
    dateLabel: 'Dated',
    pdfPath: '/certificates/campuscrew-milestone.pdf',
  },
  {
    id: 'odnest-aiml-training-completion',
    title: 'AIML Training Completion',
    issuer: 'OdNest',
    date: 'April 14, 2026',
    dateLabel: 'Issued',
    pdfPath: '/certificates/odnest-aiml-training.pdf',
  },
  {
    id: 'odnest-aiml-internship-completion',
    title: 'AIML Internship Completion',
    issuer: 'OdNest',
    date: 'April 14, 2026',
    dateLabel: 'Issued',
    pdfPath: '/certificates/odnest-aiml-internship.pdf',
  },
  {
    id: 'odnest-examination-completion',
    title: 'Examination Completion',
    issuer: 'OdNest',
    date: 'April 14, 2026',
    dateLabel: 'Issued',
    pdfPath: '/certificates/odnest-examination.pdf',
  },
  {
    id: 'odnest-outstanding-performance',
    title: 'Outstanding Performance',
    issuer: 'OdNest',
    date: 'April 14, 2026',
    dateLabel: 'Issued',
    pdfPath: '/certificates/odnest-outstanding-performance.pdf',
  },
  {
    id: 'digicoders-python-aiml-summer-training',
    title: 'Python – AI/ML Summer Training',
    issuer: 'DigiCoders Technologies Pvt. Ltd.',
    type: 'Summer Training',
    date: 'July 25, 2026',
    dateLabel: 'Issued',
    trainingDuration: '45 Days (6 Weeks)',
    grade: 'A++',
    pdfPath: '/certificates/digicoder-aiml-training-certificate.pdf',
  },
];

// The letter of recommendation is a professional document, not a certificate.
export const professionalDocuments: ProfessionalDocumentRecord[] = [
  {
    id: 'odnest-letter-of-recommendation',
    title: 'Letter of Recommendation',
    issuer: 'OdNest EduTech Pvt. Ltd.',
    type: 'Professional Recommendation',
    date: '14 April 2026',
    dateLabel: 'Dated',
    pdfPath: '/certificates/OdNest — Letter of Recommendation (LOR).pdf',
  },
];
