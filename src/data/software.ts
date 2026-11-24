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
    title: 'Barline',
    description:
      '2025 CodeJam Best UI/UX Winner. A 3D interactive AI-powered virtual bartender built in 36 hours — custom liquid handling, procedural garnishing, and spatial sound via Three.js, backed by a real-time conversational agent with a custom RAG pipeline on Google Gemini.',
    tech: ['Three.js', 'Supabase', 'FastAPI', 'Gemini', 'Docker', 'AWS', 'WebSockets'],
    github: 'https://github.com/Nhucanada/Barline',
    url: 'https://devpost.com/software/barline',
    featured: true,
  },
  {
    id: 2,
    title: 'Personal Website',
    description:
      'A full-stack personal portfolio website with a split-screen selector, a photography portfolio, and a software section. Built with React, TypeScript, Material UI, and Spring Boot in a Maven multi-module monorepo.',
    tech: ['React', 'TypeScript', 'Spring Boot', 'Material-UI', 'Maven'],
    github: 'https://github.com/Nhucanada/Personal-Website',
    featured: true,
  },
  {
    id: 3,
    title: 'Java Search Engine',
    description:
      'A full search engine implementation featuring web crawling, indexing, and ranking. Includes XML parsing, graph data structures, and efficient query algorithms.',
    tech: ['Java', 'XML Parsing', 'Data Structures', 'Algorithms', 'Maven'],
    github: 'https://github.com/Nhucanada/java-search-engine',
    featured: true,
  },
  {
    id: 4,
    title: 'Guardians of the Hive',
    description:
      'A tower defense game in Java with strategic gameplay, multiple unit types with unique abilities, progressive difficulty, game physics, and AI enemy behaviour.',
    tech: ['Java', 'OOP', 'Game Dev', 'Swing GUI'],
    github: 'https://github.com/Nhucanada/guardians-of-the-hive',
    featured: false,
  },
  {
    id: 5,
    title: 'Block Painting Game',
    description:
      'An interactive puzzle game where players manipulate coloured blocks to achieve target patterns. Features multiple game modes, score tracking, and progressive difficulty.',
    tech: ['Java', 'Swing', 'Event Handling'],
    github: 'https://github.com/Nhucanada/paintinggame',
    featured: false,
  },
  {
    id: 6,
    title: 'Solitaire Cipher',
    description:
      'A Java implementation of the Solitaire cipher algorithm for secure message encryption and decryption, featuring card-deck manipulation and cryptographic operations.',
    tech: ['Java', 'Cryptography', 'Algorithms'],
    github: 'https://github.com/Nhucanada/solitairecipher',
    featured: false,
  },
];

export const experiences: WorkExperience[] = [
  {
    id: 1,
    company: 'PointClickCare',
    role: 'Software Engineering Intern (Full Stack)',
    location: 'Mississauga, ON',
    dates: 'May 2026 – Aug. 2026',
    bullets: [
      'Saved ~50 minutes per avoided build failure by engineering a self-updating SonarQube quality-gate skill that flags errors pre-build, alongside an automated Claude Code workspace bootstrap harness standardized across 23 repos.',
      'Engineered a React/TypeScript micro-frontend from scratch using Vite and module federation with typed API contracts and mock data, achieving 100% test coverage and unblocking independent frontend development.',
      'Redesigned a Java/Spring Boot clinical drill-down API using a 3-source UNION SQL query, and fixed a cross-facility data-exposure vulnerability by adding missing RBAC validation.',
      'Fixed intermittent 500 errors across financial APIs by forwarding JWT claims correctly, and stabilized CI pipelines by writing automated JDBC test-data resets.',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Java', 'Spring Boot', 'SonarQube', 'SQL', 'Module Federation'],
    type: 'internship',
  },
  {
    id: 2,
    company: 'PointClickCare',
    role: 'Software Engineering Intern (Full Stack)',
    location: 'Mississauga, ON',
    dates: 'May 2025 – Aug. 2025',
    bullets: [
      'Built 4 end-to-end React features and a Java/Spring Boot filter API for clinical dashboards used by 400+ partners, processing 1.4M+ resident records with optimized SQL queries.',
      'Developed reusable Material UI components for an internal design system, adding full state coverage, Storybook documentation, and keyboard-accessible focus management.',
      'Fixed clinical workflow logic to correctly surface past-due assessments, and load-tested 12 production Java services with k6 and Grafana to identify and fix latency bottlenecks.',
    ],
    tech: ['React', 'TypeScript', 'Java', 'Spring Boot', 'Material-UI', 'Storybook', 'k6', 'Grafana', 'SQL'],
    type: 'internship',
  },
  {
    id: 3,
    company: 'Intact Financial Corporation',
    role: 'Software Engineering Intern (DevOps Platform)',
    location: 'Montréal, QC',
    dates: 'Jan. 2025 – Apr. 2025',
    bullets: [
      'Built and owned a centralized error-handling service supporting 30+ Java services used by internal development teams.',
      'Improved CI/CD reliability by enhancing Jenkins pipelines and GitHub Actions workflows, and integrated automated vulnerability scanning to reduce manual security review overhead.',
      'Refactored and standardized 40+ legacy services to comply with updated deployment and security conventions.',
    ],
    tech: ['Java', 'Jenkins', 'GitHub Actions', 'CI/CD', 'OpenShift'],
    type: 'internship',
  },
  {
    id: 4,
    company: '360insights Inc.',
    role: 'Software Engineering Intern (MDM Platform)',
    location: 'Whitby, ON',
    dates: 'May 2024 – Dec. 2024',
    bullets: [
      'Eliminated routine manual QA by building a CI/CD testing pipeline with GitHub Actions and Python.',
      'Increased automated test coverage from 30% to 90% by authoring 100+ unit and integration tests.',
    ],
    tech: ['Python', 'GitHub Actions', 'CI/CD', 'AWS S3', 'Java', 'REST APIs'],
    type: 'internship',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Java', 'Python', 'SQL'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['React', 'Node.js', 'Spring Boot', 'FastAPI', 'Material-UI', 'Vite', 'TanStack Query', 'Three.js'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Docker', 'AWS', 'GitHub Actions', 'Jenkins', 'SonarQube', 'Supabase'],
  },
  {
    category: 'Testing & Monitoring',
    items: ['Jest', 'JUnit', 'k6', 'Grafana', 'Prometheus'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MySQL'],
  },
];
