export interface SoftwareProject {
  id: number;
  title: string;
  description: string;
  tech: string[];
  url?: string;
  github?: string;
  featured: boolean;
}

export interface WorkExperience {
  id: number;
  company: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
  tech?: string[];
  type: 'internship' | 'work';
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const projects: SoftwareProject[] = [
  {
    id: 1,
    title: 'Personal Website',
    description:
      'A full-stack personal portfolio website built with React, TypeScript, and Spring Boot. Features responsive design, photography portfolio, and Maven multi-module build integration.',
    tech: ['React', 'TypeScript', 'Spring Boot', 'Material-UI', 'Maven'],
    github: 'https://github.com/Nhucanada/Personal-Website',
    featured: true,
  },
  {
    id: 2,
    title: 'Java Search Engine',
    description:
      'A comprehensive search engine implementation featuring web crawling, indexing, and ranking algorithms. Includes XML parsing, graph data structures, and efficient search algorithms.',
    tech: ['Java', 'XML Parsing', 'Data Structures', 'Algorithms', 'Maven'],
    github: 'https://github.com/Nhucanada/javasearchengine',
    featured: true,
  },
  {
    id: 3,
    title: 'Guardians of the Hive',
    description:
      'A tower defense game in Java featuring strategic gameplay, multiple unit types with unique abilities, and progressive difficulty. Complete with game physics and AI enemy behavior.',
    tech: ['Java', 'OOP', 'Game Dev', 'Swing GUI'],
    github: 'https://github.com/Nhucanada/Guardians-of-the-Hive',
    featured: true,
  },
  {
    id: 4,
    title: 'Block Painting Game',
    description:
      'An interactive puzzle game where players manipulate colored blocks to achieve specific goals. Features multiple game modes, score tracking, and progressive difficulty.',
    tech: ['Java', 'Swing', 'Event Handling'],
    github: 'https://github.com/Nhucanada/paintinggame',
    featured: false,
  },
  {
    id: 5,
    title: 'Solitaire Cipher',
    description:
      'A Java implementation of the Solitaire cipher algorithm for secure message encryption and decryption. Features card deck manipulation and cryptographic operations.',
    tech: ['Java', 'Cryptography', 'Algorithms'],
    github: 'https://github.com/Nhucanada/solitairecipher',
    featured: false,
  },
];

export const experiences: WorkExperience[] = [
  {
    id: 1,
    company: 'PointClickCare',
    role: 'Software Engineer Intern',
    location: 'Mississauga, ON',
    dates: 'May 2025 – Aug 2025',
    bullets: [
      'Full stack development on senior living dashboards',
      'Built enterprise healthcare software with React, TypeScript, and Java/Spring Boot',
      'Collaborated with cross-functional teams in an agile environment',
    ],
    tech: ['Java', 'Spring Boot', 'React', 'TypeScript', 'REST APIs'],
    type: 'internship',
  },
  {
    id: 2,
    company: 'Intact',
    role: 'DevOps Engineer Intern',
    location: 'Montreal, QC',
    dates: 'Jan 2025 – Apr 2025',
    bullets: [
      'Implemented CI/CD pipelines and DevOps practices for shared services',
      'Worked on infrastructure automation and deployment workflows',
      'Collaborated on shared services architecture with OpenShift and Jenkins',
    ],
    tech: ['Jenkins', 'OpenShift', 'CI/CD', 'DevOps', 'Groovy'],
    type: 'internship',
  },
  {
    id: 3,
    company: '360insights',
    role: 'Software Engineer Intern',
    location: 'Whitby, ON',
    dates: 'Sep 2024 – Dec 2024',
    bullets: [
      'Worked on agile scrum team on the Data Ingress Project',
      'Developed Java routines for data parsing and storage to AWS S3',
      'Integrated end-to-end testing into CI workflow using Testomat',
      'Investigated and resolved issues identified by users in production',
    ],
    tech: ['Java', 'AWS S3', 'Testomat', 'CI/CD', 'Agile'],
    type: 'internship',
  },
  {
    id: 4,
    company: '360insights',
    role: 'Software Engineer Intern',
    location: 'Whitby, ON',
    dates: 'May 2024 – Aug 2024',
    bullets: [
      'Worked on Master Data Management on an agile scrum team',
      'Developed REST APIs for data access with Python',
      'Grew test coverage from 30% to over 90% with 100+ unit tests',
      'Built a new CI pipeline and GitHub Actions workflow for regression testing',
      'Used AWS S3 to store API responses for extensive end-to-end testing',
    ],
    tech: ['Python', 'REST APIs', 'GitHub Actions', 'AWS S3', 'Java', 'Reltio'],
    type: 'internship',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'Groovy', 'Bash'],
  },
  {
    category: 'Frontend',
    items: ['React', 'HTML', 'CSS', 'Material-UI'],
  },
  {
    category: 'Backend',
    items: ['Spring Boot', 'REST APIs', 'Maven'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Jenkins', 'OpenShift', 'GitHub Actions', 'AWS S3', 'CI/CD'],
  },
  {
    category: 'Testing',
    items: ['JUnit', 'Jest', 'Testomat', 'Mockito'],
  },
];
