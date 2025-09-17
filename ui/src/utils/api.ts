const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface GreetingResponse {
  message?: string;
  error?: string;
}

export const apiClient = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },
};

export const greetingApi = {
  async getGreeting(name?: string): Promise<GreetingResponse> {
    const endpoint = name ? `/api/greeting?name=${encodeURIComponent(name)}` : '/api/greeting';
    const response = await apiClient.get<GreetingResponse>(endpoint);

    if (response.error) {
      return { error: response.error };
    }

    return response.data || {};
  },

  async postGreeting(name: string): Promise<GreetingResponse> {
    const response = await apiClient.post<GreetingResponse>('/api/greeting', { name });

    if (response.error) {
      return { error: response.error };
    }

    return response.data || {};
  },
};

export const healthApi = {
  async getHealth() {
    return apiClient.get('/api/health');
  },

  async getStatus() {
    return apiClient.get('/api/status');
  },
};

// Profile data types
export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
  type: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  relevantCourses: string[];
  achievements: string[];
  gpa?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  bio: string;
  description: string;
  languages: {
    language: string;
    proficiency: string;
  }[];
  contact: {
    email: string;
    mcgillEmail: string;
    linkedin: string;
    github: string;
    location: string;
  };
}

export interface Skills {
  technicalSkills: string[];
  categories: Record<string, string[]>;
  proficiencyLevels: Record<string, string[]>;
}

// Profile API functions
export const profileApi = {
  async getExperiences(): Promise<ApiResponse<Experience[]>> {
    return apiClient.get<Experience[]>('/api/profile/experiences');
  },

  async getExperienceById(id: number): Promise<ApiResponse<Experience>> {
    return apiClient.get<Experience>(`/api/profile/experiences/${id}`);
  },

  async getEducation(): Promise<ApiResponse<Education[]>> {
    return apiClient.get<Education[]>('/api/profile/education');
  },

  async getEducationById(id: number): Promise<ApiResponse<Education>> {
    return apiClient.get<Education>(`/api/profile/education/${id}`);
  },

  async getProjects(): Promise<ApiResponse<Project[]>> {
    return apiClient.get<Project[]>('/api/profile/projects');
  },

  async getFeaturedProjects(): Promise<ApiResponse<Project[]>> {
    return apiClient.get<Project[]>('/api/profile/projects/featured');
  },

  async getProjectById(id: number): Promise<ApiResponse<Project>> {
    return apiClient.get<Project>(`/api/profile/projects/${id}`);
  },

  async getPersonalInfo(): Promise<ApiResponse<PersonalInfo>> {
    return apiClient.get<PersonalInfo>('/api/profile/info');
  },

  async getSkills(): Promise<ApiResponse<Skills>> {
    return apiClient.get<Skills>('/api/profile/skills');
  },

  async getTechnicalSkillsList(): Promise<ApiResponse<string[]>> {
    return apiClient.get<string[]>('/api/profile/skills/list');
  },
};
