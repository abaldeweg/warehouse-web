import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';
import { useAuth } from '../useAuth';
import Cookies from 'js-cookie';
import axios from 'axios';

vi.mock('js-cookie', () => {
  const mockCookies = {
    get: vi.fn(),
    set: vi.fn(),
  };
  return {
    __esModule: true,
    default: mockCookies,
    ...mockCookies,
  };
});

vi.mock('axios', () => {
  const mockAxios = {
    create: vi.fn(() => {
      const mockRequest = vi.fn();
      return {
        request: mockRequest,
      };
    }),
  };
  return {
    __esModule: true,
    default: mockAxios,
  };
});

describe('useAuth', () => {
  it('should return false when user is not authenticated', async () => {
    Cookies.get.mockImplementation((key: string): string | undefined => {
      if (key === 'token') return undefined;
      if (key === 'refresh_token') return undefined;
    });

    const { isUserAuthenticated } = useAuth();
    const result = await isUserAuthenticated();

    expect(result).toBeFalsy();
  });

  it('should fetch user data when token is available', async () => {
    Cookies.get.mockImplementation((key: string): string | undefined => {
      if (key === 'token') return 'valid-token';
    });

    const mockResponse = { data: { id: 1, name: 'Test User' } };
    const mockAxiosInstance = {
      request: vi.fn().mockResolvedValueOnce(mockResponse),
    };
    (axios.create as Mock).mockImplementation(() => mockAxiosInstance);

    const { isUserAuthenticated } = useAuth();
    const result = await isUserAuthenticated();

    expect(result).toBeTruthy();
  });

  it('should refresh token when token is expired but refresh token is available', async () => {
    let token: string | undefined = undefined;
    Cookies.get.mockImplementation((key: string): string | undefined => {
      if (key === 'token') return token;
      if (key === 'refresh_token') return 'valid-refresh-token';
    });
    Cookies.set.mockImplementation((key: string, value: string) => {
      if (key === 'token') token = value;
    });

    const mockTokenResponse = {
      data: {
        token: 'new-token',
        refresh_token: 'new-refresh-token',
      },
    };
    const mockUserResponse = { data: { id: 1, name: 'Test User' } };

    const mockRequest = vi.fn((config) => {
      if (config.method === 'post' && config.url === '/api/token/refresh') {
        return Promise.resolve(mockTokenResponse);
      }
      if (config.method === 'get' && config.url === '/api/me') {
        return Promise.resolve(mockUserResponse);
      }
      return Promise.reject(new Error('Unknown request'));
    });
    const mockAxiosInstance = { request: mockRequest };
    (axios.create as Mock).mockImplementation(() => mockAxiosInstance);

    const { isUserAuthenticated } = useAuth();
    const result = await isUserAuthenticated();

    expect(Cookies.set).toHaveBeenCalledWith('token', 'new-token', { expires: 7 });
    expect(Cookies.set).toHaveBeenCalledWith('refresh_token', 'new-refresh-token', { expires: 30 });
    expect(result).toBeTruthy();
  });
});
