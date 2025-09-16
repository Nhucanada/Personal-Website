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