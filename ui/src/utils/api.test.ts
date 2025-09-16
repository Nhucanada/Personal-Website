import { apiClient, greetingApi, healthApi } from './api';

// Mock fetch globally
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API Utils', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('apiClient', () => {
    describe('get method', () => {
      test('should make successful GET request', async () => {
        const mockData = { message: 'success' };
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        } as Response);

        const result = await apiClient.get('/test-endpoint');

        expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/test-endpoint');
        expect(result).toEqual({ data: mockData });
      });

      test('should handle HTTP errors', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 404,
        } as Response);

        const result = await apiClient.get('/not-found');

        expect(result).toEqual({ error: 'HTTP error! status: 404' });
      });

      test('should handle network errors', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const result = await apiClient.get('/test-endpoint');

        expect(result).toEqual({ error: 'Network error' });
      });

      test('should handle unknown errors', async () => {
        mockFetch.mockRejectedValueOnce('Unknown error');

        const result = await apiClient.get('/test-endpoint');

        expect(result).toEqual({ error: 'Unknown error' });
      });
    });

    describe('post method', () => {
      test('should make successful POST request with body', async () => {
        const mockData = { id: 1 };
        const requestBody = { name: 'test' };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        } as Response);

        const result = await apiClient.post('/test-endpoint', requestBody);

        expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/test-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        expect(result).toEqual({ data: mockData });
      });

      test('should make POST request without body', async () => {
        const mockData = { success: true };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        } as Response);

        const result = await apiClient.post('/test-endpoint');

        expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/test-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: undefined,
        });
        expect(result).toEqual({ data: mockData });
      });

      test('should handle POST request errors', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 500,
        } as Response);

        const result = await apiClient.post('/test-endpoint', { data: 'test' });

        expect(result).toEqual({ error: 'HTTP error! status: 500' });
      });
    });
  });

  describe('greetingApi', () => {
    describe('getGreeting', () => {
      test('should get greeting without name', async () => {
        const mockResponse = { message: 'Hello, Guest!' };
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await greetingApi.getGreeting();

        expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/greeting');
        expect(result).toEqual(mockResponse);
      });

      test('should get greeting with name', async () => {
        const mockResponse = { message: 'Hello, John!' };
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await greetingApi.getGreeting('John');

        expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/greeting?name=John');
        expect(result).toEqual(mockResponse);
      });

      test('should encode special characters in name', async () => {
        const mockResponse = { message: 'Hello, John & Jane!' };
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await greetingApi.getGreeting('John & Jane');

        expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/greeting?name=John%20%26%20Jane');
        expect(result).toEqual(mockResponse);
      });

      test('should handle greeting API errors', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const result = await greetingApi.getGreeting('John');

        expect(result).toEqual({ error: 'Network error' });
      });
    });

    describe('postGreeting', () => {
      test('should post greeting with name', async () => {
        const mockResponse = { message: 'Hello, Alice!' };
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await greetingApi.postGreeting('Alice');

        expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/greeting', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: 'Alice' }),
        });
        expect(result).toEqual(mockResponse);
      });

      test('should handle post greeting errors', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Server error'));

        const result = await greetingApi.postGreeting('Alice');

        expect(result).toEqual({ error: 'Server error' });
      });
    });
  });

  describe('healthApi', () => {
    test('should get health status', async () => {
      const mockResponse = { status: 'UP' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await healthApi.getHealth();

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/health');
      expect(result).toEqual({ data: mockResponse });
    });

    test('should get application status', async () => {
      const mockResponse = { status: 'RUNNING', version: '1.0.0' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await healthApi.getStatus();

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/status');
      expect(result).toEqual({ data: mockResponse });
    });
  });

  describe('environment configuration', () => {
    test('should use default API URL when env var is not set', async () => {
      // Environment variable is not set in test environment
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      await apiClient.get('/test');

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/test');
    });

    test('should use custom API URL from environment', async () => {
      // Mock environment variable
      const originalEnv = process.env.REACT_APP_API_URL;
      process.env.REACT_APP_API_URL = 'https://api.example.com';

      // Re-require the module to pick up the new environment variable
      jest.resetModules();
      const { apiClient: newApiClient } = require('./api');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      await newApiClient.get('/test');

      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/test');

      // Restore original environment
      process.env.REACT_APP_API_URL = originalEnv;
    });
  });
});